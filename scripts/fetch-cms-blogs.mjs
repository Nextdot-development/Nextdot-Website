// Build-time fetch of published CMS blogs from Supabase.
// -------------------------------------------------------------------------
// The public site is static/prerendered for SEO, so we DO NOT read Supabase in
// the browser. Instead this script runs before `vite build`, pulls the
// published blogs (anon key, respecting RLS), writes them to a generated data
// file that the public Blogs page merges with its static posts, and adds their
// detail URLs to public/sitemap.xml so they get prerendered.
//
// It is intentionally fail-soft: if Supabase is unreachable or returns nothing,
// it writes an empty set and leaves the static site completely unaffected.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_FILE = path.join(ROOT, "src", "data", "cmsBlogs.generated.ts");
const SITEMAP = path.join(ROOT, "public", "sitemap.xml");
const ORIGIN = "https://nextdot.co.in";
const CMS_START = "<!-- CMS_BLOGS_START (generated — do not edit) -->";
const CMS_END = "<!-- CMS_BLOGS_END -->";

// --- env ------------------------------------------------------------------
function readEnv() {
  const out = {};
  for (const name of [".env.local", ".env.production", ".env"]) {
    try {
      for (const line of readFileSync(path.join(ROOT, name), "utf8").split(/\r?\n/)) {
        const t = line.trim();
        if (!t || t.startsWith("#") || !t.includes("=")) continue;
        const i = t.indexOf("=");
        const k = t.slice(0, i).trim();
        if (!(k in out)) out[k] = t.slice(i + 1).trim();
      }
    } catch { /* file may not exist */ }
  }
  return out;
}

const env = readEnv();
// Prefer real environment variables (GitHub Actions / CI inject secrets there),
// then fall back to the .env files (local dev). This is why CI builds can read
// Supabase even though .env.local is git-ignored and absent on the runner.
const rawUrl = process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL || "";
const SUPA_URL = rawUrl.replace(/\/rest\/v1\/?$/i, "").replace(/\/+$/, "");
const SUPA_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY || "";

// --- helpers --------------------------------------------------------------
const zonedDate = (iso, tz, opts) =>
  new Date(iso).toLocaleDateString("en-US", { timeZone: tz || "Asia/Kolkata", ...opts });

/** YYYY-MM-DD for a given instant in a timezone (for schema/OG). */
function isoDateInZone(iso, tz) {
  const p = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz || "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date(iso)).reduce((a, x) => (x.type !== "literal" ? ((a[x.type] = x.value), a) : a), {});
  return `${p.year}-${p.month}-${p.day}`;
}

/** Normalise a related-blog reference to a bare slug. Accepts a full URL
 *  (https://nextdot.co.in/blogs/xxx), a path (/blogs/xxx), or a bare slug. */
function toSlug(value) {
  const s = String(value || "").trim().replace(/[?#].*$/, "").replace(/\/+$/, "");
  if (!s) return "";
  const m = s.match(/\/blogs\/([^/]+)$/);
  if (m) return m[1];
  return s.split("/").filter(Boolean).pop() || "";
}

/** Map a Supabase row to the public BlogPost shape. */
function rowToPost(r) {
  // Display/sort by the intended publish date the author set (publish_at) — the
  // same value the editor's "Publish Date" field shows. published_at is only the
  // internal first-went-live stamp and must NOT drive the visible date, or a post
  // dated in the past jumps forward to whenever the build first picked it up.
  const published = r.publish_at || r.published_at || r.created_at;
  const faq = Array.isArray(r.faq) ? r.faq : [];
  const content = Array.isArray(r.content) ? r.content : [];
  // Append the FAQ as body blocks so it renders on the page AND the existing
  // FAQPage schema builder (which scans post.body) picks it up automatically.
  const body = faq.length
    ? [...content, { type: "h2", text: "Frequently asked questions" }, { type: "faq", items: faq }]
    : content;
  return {
    id: Math.floor(new Date(published).getTime() / 1000), // newer => higher (sort tiebreak)
    slug: r.slug,
    title: r.title || "",
    description: r.excerpt || "",
    metaTitle: r.seo_title || undefined,
    metaDescription: r.meta_description || undefined,
    category: r.category || "",
    label: "Blog",
    date: zonedDate(published, r.time_zone, { month: "short", day: "numeric", year: "numeric" }),
    readTime: r.read_time || undefined,
    image: r.featured_image || "",
    imageAlt: r.image_alt || undefined,
    author: r.author || undefined,
    tags: Array.isArray(r.tags) ? r.tags : [],
    publishedISO: isoDateInZone(published, r.time_zone),
    relatedBlogs: (Array.isArray(r.related_blogs) ? r.related_blogs : []).map(toSlug).filter(Boolean),
    body,
  };
}

// --- fetch ----------------------------------------------------------------
// We fetch every row the anon key is ALLOWED to read and let Row Level Security
// decide what is "live". With the public-read policy, that is: published blogs
// PLUS scheduled blogs whose publish time has already passed. So when a build
// runs after a scheduled blog's time, that blog is automatically included —
// drafts, archived, and future-scheduled posts stay hidden by RLS.
async function fetchPublished() {
  if (!SUPA_URL || !SUPA_KEY) {
    console.warn("[fetch-cms-blogs] Supabase env not set — skipping (static site unaffected).");
    return [];
  }
  const url = `${SUPA_URL}/rest/v1/blogs?select=*`;
  const res = await fetch(url, { headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` } });
  if (!res.ok) {
    console.warn(`[fetch-cms-blogs] Supabase returned HTTP ${res.status} — is the public-read policy on 'blogs' created? Skipping.`);
    return [];
  }
  const rows = await res.json();
  const posts = (Array.isArray(rows) ? rows : []).filter((r) => r.slug).map(rowToPost);
  // Newest first (the public page re-sorts too, but keep the generated file tidy).
  posts.sort((a, b) => (b.publishedISO || "").localeCompare(a.publishedISO || ""));
  return posts;
}

// --- write generated data file -------------------------------------------
function writeDataFile(posts) {
  mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  const banner =
    "// AUTO-GENERATED by scripts/fetch-cms-blogs.mjs — do not edit by hand.\n" +
    "// Published blogs pulled from Supabase at build time and merged into the\n" +
    "// static public Blogs page. No Supabase runtime code ships to the browser.\n";
  writeFileSync(OUT_FILE, `${banner}export const CMS_BLOGS = ${JSON.stringify(posts, null, 2)};\n`, "utf8");
}

// --- update sitemap -------------------------------------------------------
// Escape a literal string for safe use inside a RegExp (the markers contain
// parentheses, which are regex metacharacters).
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const MANAGED_RE = new RegExp(`${escRe(CMS_START)}[\\s\\S]*?${escRe(CMS_END)}`);

function updateSitemap(posts) {
  let xml;
  try { xml = readFileSync(SITEMAP, "utf8"); } catch { return; }

  // Slugs already present in the STATIC part (outside our managed markers).
  const withoutManaged = xml.replace(MANAGED_RE, "");
  const staticLocs = new Set([...withoutManaged.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]));

  const entries = posts
    .filter((p) => !staticLocs.has(`${ORIGIN}/blogs/${p.slug}`))
    .map(
      (p) =>
        `  <url>\n    <loc>${ORIGIN}/blogs/${p.slug}</loc>\n    <lastmod>${p.publishedISO}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    )
    .join("\n");
  const block = `${CMS_START}\n${entries}\n  ${CMS_END}`;

  const next = xml.includes(CMS_START)
    ? xml.replace(MANAGED_RE, block)
    : xml.replace(/<\/urlset>/, `${block}\n</urlset>`);
  writeFileSync(SITEMAP, next, "utf8");
}

// --- main -----------------------------------------------------------------
(async () => {
  let posts = [];
  try {
    posts = await fetchPublished();
  } catch (e) {
    console.warn("[fetch-cms-blogs] fetch failed — static site unaffected:", e.message);
  }
  writeDataFile(posts);
  updateSitemap(posts);
  console.log(`[fetch-cms-blogs] wrote ${posts.length} published CMS blog(s) into the static build.`);
})();
