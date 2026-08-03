/** Turn a title (or any string) into a clean, URL-safe slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const SITE_ORIGIN = "https://nextdot.co.in";
export const blogPublicPath = (slug: string) => `/blogs/${slug}`;
export const blogCanonicalUrl = (slug: string) => `${SITE_ORIGIN}/blogs/${slug}`;

/** Estimate reading time (~200 wpm) from plain text. */
export function estimateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}
