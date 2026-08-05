// Generates /llms.txt — an LLM-friendly Markdown index of the site (llmstxt.org).
// AI models (ChatGPT, Claude, Perplexity, Google AI) use it to discover and read
// Nextdot's pages and blog posts. Built from the same data as the sitemap, so it
// auto-updates with every published blog. Runs at build time (after the static
// index + CMS fetch have been generated).
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://nextdot.co.in";
const OUT = path.join(ROOT, "public", "llms.txt");

/** Parse the `export const X = [ ... ];` array out of a generated .ts file. */
function parseArray(file) {
  try {
    const s = readFileSync(path.join(ROOT, file), "utf8");
    // Start at the first "[" AFTER the "=" so a `: {...}[]` type annotation
    // (which also contains "[") is never mistaken for the data array.
    const eq = s.indexOf("=");
    const start = s.indexOf("[", eq >= 0 ? eq : 0);
    const end = s.lastIndexOf("]");
    return start >= 0 && end > start ? JSON.parse(s.slice(start, end + 1)) : [];
  } catch {
    return [];
  }
}

const cms = parseArray("src/data/cmsBlogs.generated.ts");
const staticIdx = parseArray("src/data/staticBlogsIndex.ts");

// Merge blogs: CMS (newest, with descriptions) first, then legacy static ones
// not overridden by a CMS post of the same slug.
const cmsSlugs = new Set(cms.map((b) => b.slug));
const blogs = [
  ...cms.map((b) => ({ slug: b.slug, title: b.title, desc: b.metaDescription || b.description || "" })),
  ...staticIdx.filter((s) => !cmsSlugs.has(s.slug)).map((s) => ({ slug: s.slug, title: s.title, desc: "" })),
];

const pages = [
  ["About", "/about", "Who Nextdot is — a forward-deployed AI engineering company building production agentic systems."],
  ["What We Do", "/what-we-do", "Nextdot's services across enterprise AI, healthcare AI, compliance, and creative."],
  ["Nextdot Creative", "/creative", "AI-native creative production — content at scale, briefs, and creative pods."],
  ["AI Capability Centre", "/ai-capability-centre", "Nextdot's AI Capability Centre in Jamshedpur."],
  ["Blogs", "/blogs", "Long-form insights on enterprise AI, healthcare AI, agentic systems, compliance, and answer engine optimisation (AEO)."],
  ["Contact", "/contact", "Get in touch with Nextdot."],
];

const optional = [
  ["Privacy Policy", "/privacy-policy"],
  ["Terms of Service", "/terms-of-service"],
  ["XML Sitemap", "/sitemap.xml"],
];

const clean = (s) => String(s || "").replace(/\s+/g, " ").trim();

let out = "# Nextdot\n\n";
out +=
  "> Nextdot builds domain-engineered, enterprise-grade agentic AI systems — voice agents, healthcare AI (clinical scribes, doctor avatars, discovery), compliance operating systems, and AI-native creative — delivered by small forward-deployed engineering pods.\n\n";
out +=
  "Nextdot is an enterprise AI company focused on production systems rather than demos. This file indexes the site's key pages and full blog archive for AI models and answer engines.\n\n";

out += "## Pages\n\n";
for (const [t, p, d] of pages) out += `- [${t}](${ORIGIN}${p})${d ? ": " + clean(d) : ""}\n`;

out += "\n## Blog\n\n";
for (const b of blogs) out += `- [${clean(b.title)}](${ORIGIN}/blogs/${b.slug})${b.desc ? ": " + clean(b.desc) : ""}\n`;

out += "\n## Optional\n\n";
for (const [t, p] of optional) out += `- [${t}](${ORIGIN}${p})\n`;

writeFileSync(OUT, out, "utf8");
console.log(`[gen-llms-txt] wrote llms.txt (${pages.length} pages, ${blogs.length} blog posts)`);
