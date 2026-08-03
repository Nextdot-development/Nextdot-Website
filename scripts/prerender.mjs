// Build-time prerendering for the Nextdot SPA.
// -------------------------------------------------------------------------
// The <SEO> component sets title / meta / canonical / OG / JSON-LD inside a
// useEffect, so any renderToString-based SSG would emit empty tags. We drive a
// real headless browser (Puppeteer) instead, let the app boot exactly as it
// does for a user, wait until the SEO effect has run and the preloader is gone,
// then serialize the live DOM to dist/<route>/index.html.
//
// The route list comes from public/sitemap.xml (source of truth) so new blog
// posts are prerendered automatically once they're added there.
//
// Exit code is non-zero if ANY route fails or still shows the default shell
// title — a silent partial success looks fixed but isn't.

import { createServer } from 'node:http';
import { readFileSync, promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITEMAP = path.join(ROOT, 'public', 'sitemap.xml');
const ORIGIN = 'https://nextdot.co.in';

// The exact <title> Vite ships in the static shell. A route is only considered
// rendered once React's SEO effect has replaced this.
const DEFAULT_TITLE = 'Nextdot | Domain Engineered AI Systems';

const CONCURRENCY = 4;         // three.js/GSAP are heavy — don't over-parallelise
const NAV_TIMEOUT = 45_000;
const RENDER_TIMEOUT = 45_000; // per-route wait for the SEO effect + preloader

// --- 1. Parse the sitemap into a route list ------------------------------
function readRoutes() {
  const xml = readFileSync(SITEMAP, 'utf8');
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  const routes = locs
    .filter((u) => u.startsWith(ORIGIN))
    .map((u) => {
      let p = u.slice(ORIGIN.length) || '/';
      if (p.length > 1) p = p.replace(/\/$/, ''); // normalise trailing slash
      return p || '/';
    });
  return [...new Set(routes)].sort((a, b) => a.localeCompare(b));
}

// --- 2. Serve dist/ with an SPA fallback to the PRISTINE shell ------------
// We deliberately read index.html once, up front, and serve that copy for every
// navigation route. Otherwise, after we write dist/index.html (the homepage
// prerender), the fallback would start serving homepage HTML for other routes.
function startServer(shellHtml) {
  const app = express();
  // Real files (JS, CSS, images, sitemap...) but never auto-serve index.html.
  app.use(express.static(DIST, { index: false, redirect: false }));
  app.get('*', (_req, res) => {
    res.set('Content-Type', 'text/html; charset=utf-8').send(shellHtml);
  });
  return new Promise((resolve) => {
    const server = createServer(app);
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

// --- 3. Render one route -------------------------------------------------
async function renderRoute(browser, baseUrl, route) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1366, height: 900 });

    // Skip the huge marketing videos — they never affect the serialized DOM,
    // and one route is 75MB+ otherwise. Everything else loads normally.
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.resourceType() === 'media') req.abort();
      else req.continue();
    });

    await page.goto(`${baseUrl}${route}`, {
      waitUntil: 'domcontentloaded',
      timeout: NAV_TIMEOUT,
    });

    // Real signal: the SEO effect has run (title changed away from the shell
    // default AND a non-empty meta description exists AND canonical is set),
    // and the preloader overlay (the only z-[100] element) has unmounted.
    await page.waitForFunction(
      (defaultTitle) => {
        const title = document.title;
        if (!title || title === defaultTitle) return false;
        const desc = document.querySelector('meta[name="description"]');
        if (!desc || !desc.getAttribute('content')) return false;
        const canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical || !canonical.getAttribute('href')) return false;
        const preloader = document.querySelector('[class*="z-[100]"]');
        return !preloader;
      },
      // Poll on a fixed interval, NOT requestAnimationFrame (the default).
      // The homepage/about three.js render loops saturate rAF, which starves a
      // rAF-based poll and causes spurious timeouts on the heaviest pages.
      { timeout: RENDER_TIMEOUT, polling: 250 },
      DEFAULT_TITLE
    );

    const title = await page.title();
    const html = '<!doctype html>\n' + (await page.evaluate(() => document.documentElement.outerHTML));

    const outPath =
      route === '/'
        ? path.join(DIST, 'index.html')
        : path.join(DIST, route.replace(/^\//, ''), 'index.html');
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, html, 'utf8');

    const descLen = await page.evaluate(() => {
      const d = document.querySelector('meta[name="description"]');
      return d ? (d.getAttribute('content') || '').length : 0;
    });

    return { route, title, descLen, ok: true };
  } catch (err) {
    return { route, title: null, descLen: 0, ok: false, error: err.message };
  } finally {
    await page.close();
  }
}

// --- 3b. Remove stale prerendered blog folders ---------------------------
// Defense-in-depth: `vite build` empties dist, but if prerender is ever run on
// its own, a previously-rendered detail folder for a now-deleted CMS blog could
// linger. Delete any dist/blogs/<slug> directory whose route is not in the
// current sitemap, so a deleted blog can never survive in the output.
async function pruneStaleBlogFolders(routes) {
  const blogDir = path.join(DIST, 'blogs');
  const keep = new Set(
    routes.filter((r) => r.startsWith('/blogs/')).map((r) => r.slice('/blogs/'.length))
  );
  let entries;
  try {
    entries = await fs.readdir(blogDir, { withFileTypes: true });
  } catch {
    return; // dist/blogs doesn't exist yet — nothing to prune
  }
  let removed = 0;
  for (const e of entries) {
    if (e.isDirectory() && !keep.has(e.name)) {
      await fs.rm(path.join(blogDir, e.name), { recursive: true, force: true });
      console.log(`  pruned stale blog folder: /blogs/${e.name}`);
      removed++;
    }
  }
  if (removed) console.log(`Pruned ${removed} stale blog folder(s).\n`);
}

// --- 4. Bounded concurrency worker pool ----------------------------------
async function runPool(items, size, worker) {
  const results = [];
  let i = 0;
  const runners = Array.from({ length: Math.min(size, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await worker(items[idx]);
    }
  });
  await Promise.all(runners);
  return results;
}

// --- main ----------------------------------------------------------------
async function main() {
  // Guard: the build must have run first.
  const shellPath = path.join(DIST, 'index.html');
  let shellHtml;
  try {
    shellHtml = await fs.readFile(shellPath, 'utf8');
  } catch {
    console.error(`\n✗ ${shellPath} not found. Run "vite build" before prerendering.`);
    process.exit(1);
  }

  const routes = readRoutes();
  await pruneStaleBlogFolders(routes);
  console.log(`\nPrerendering ${routes.length} routes from sitemap.xml …\n`);

  const server = await startServer(shellHtml);
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });
  } catch (err) {
    console.error('\n✗ Failed to launch Puppeteer/Chromium:', err.message);
    console.error('  Chromium may not have downloaded. Not falling back to SSR (it would emit empty meta tags).');
    server.close();
    process.exit(1);
  }

  const results = await runPool(routes, CONCURRENCY, (route) => renderRoute(browser, baseUrl, route));

  // Retry any failures once, serially (no contention), before declaring defeat.
  // A route that fails even alone is a real failure; a route that only failed
  // under parallel load recovers here.
  const retryIdx = results.map((r, i) => (r.ok ? -1 : i)).filter((i) => i >= 0);
  if (retryIdx.length) {
    console.log(`\nRetrying ${retryIdx.length} route(s) serially …`);
    for (const i of retryIdx) {
      results[i] = await renderRoute(browser, baseUrl, routes[i]);
    }
  }

  await browser.close();
  server.close();

  // Report
  const pad = (s, n) => String(s).padEnd(n);
  console.log(pad('ROUTE', 48) + pad('TITLE', 52) + 'DESC');
  console.log('-'.repeat(108));
  for (const r of results.sort((a, b) => a.route.localeCompare(b.route))) {
    if (r.ok) {
      console.log(pad(r.route, 48) + pad((r.title || '').slice(0, 50), 52) + r.descLen);
    } else {
      console.log(pad(r.route, 48) + pad('✗ FAILED: ' + (r.error || '').slice(0, 40), 52) + '-');
    }
  }

  const failed = results.filter((r) => !r.ok);
  const defaulted = results.filter((r) => r.ok && r.title === DEFAULT_TITLE);
  console.log('\n' + '-'.repeat(108));
  console.log(`Rendered ${results.length - failed.length}/${results.length} routes.`);

  if (failed.length || defaulted.length) {
    if (failed.length) console.error(`✗ ${failed.length} route(s) failed to render.`);
    if (defaulted.length)
      console.error(`✗ ${defaulted.length} route(s) still show the default shell title.`);
    process.exit(1);
  }

  console.log('✓ All routes prerendered with unique titles.\n');
}

main().catch((err) => {
  console.error('\n✗ Prerender crashed:', err);
  process.exit(1);
});
