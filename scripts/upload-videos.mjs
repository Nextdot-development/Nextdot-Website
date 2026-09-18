// One-off (re-runnable) upload of the site's videos to Supabase Storage.
// -------------------------------------------------------------------------
// The static host re-compresses large media, which visibly degrades the films
// on /ai-films-and-motion. Storage serves the original bytes untouched, so the
// page streams the exact encode we uploaded. Run this whenever a file in
// `video/` changes:
//
//   node scripts/upload-videos.mjs            # upload new/changed files
//   node scripts/upload-videos.mjs --force    # re-upload everything
//
// Needs the SERVICE ROLE key (writes bypass Storage policies); it is read from
// the environment or .env.local and never shipped to the browser.

import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
// The web encodes written by encode-videos.mjs, not the raw masters in video/.
const SRC_DIR = path.join(ROOT, "public", "ai-films", "videos");

// Files the AI Film & Motion page streams, mapped to their name in the bucket.
const FILES = [
  "showreel.mp4",
  "film-01.mp4",
  "film-02.mp4",
  "film-03.mp4",
  "film-04.mp4",
  "film-05.mp4",
];

function readEnv() {
  const out = {};
  for (const name of [".env.local", ".env.production", ".env"]) {
    try {
      for (const line of readFileSync(path.join(ROOT, name), "utf8").split(/\r?\n/)) {
        const t = line.trim();
        if (!t || t.startsWith("#") || !t.includes("=")) continue;
        const i = t.indexOf("=");
        const k = t.slice(0, i).trim();
        if (!(k in out)) out[k] = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
      }
    } catch { /* file may not exist */ }
  }
  return out;
}

const env = readEnv();
const pick = (...keys) => keys.map((k) => process.env[k] || env[k]).find(Boolean) || "";
const SUPA_URL = pick("VITE_SUPABASE_URL", "SUPABASE_URL").replace(/\/rest\/v1\/?$/i, "").replace(/\/+$/, "");
const SERVICE_KEY = pick("SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_SECRET_KEY");
const BUCKET = pick("VITE_SUPABASE_VIDEO_BUCKET", "SUPABASE_VIDEO_BUCKET") || "site-videos";
const FORCE = process.argv.includes("--force");

if (!SUPA_URL || !SERVICE_KEY) {
  console.error(
    "Missing credentials. Add to .env.local:\n" +
    "  VITE_SUPABASE_URL=https://<project>.supabase.co\n" +
    "  SUPABASE_SERVICE_ROLE_KEY=<service role key from Supabase → Settings → API>",
  );
  process.exit(1);
}

const headers = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` };

/** Create the bucket if it does not exist yet, public and sized for video. */
async function ensureBucket() {
  const res = await fetch(`${SUPA_URL}/storage/v1/bucket/${BUCKET}`, { headers });
  if (res.ok) return;
  const create = await fetch(`${SUPA_URL}/storage/v1/bucket`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    // No file_size_limit: the bucket inherits the project's global upload cap,
    // and asking for more than that is rejected outright.
    body: JSON.stringify({
      id: BUCKET,
      name: BUCKET,
      public: true,
      allowed_mime_types: ["video/mp4", "video/webm", "video/quicktime", "image/jpeg"],
    }),
  });
  if (!create.ok) throw new Error(`Could not create bucket ${BUCKET}: ${await create.text()}`);
  console.log(`bucket ${BUCKET} created (public)`);
}

/** Size of the object already in the bucket, or null when it is absent. */
async function remoteSize(name) {
  const res = await fetch(`${SUPA_URL}/storage/v1/object/info/public/${BUCKET}/${name}`, { headers });
  if (!res.ok) return null;
  const len = res.headers.get("content-length");
  return len ? Number(len) : Number((await res.json())?.size ?? 0) || null;
}

const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`;

await ensureBucket();

for (const name of FILES) {
  const file = path.join(SRC_DIR, name);
  let size;
  try {
    size = statSync(file).size;
  } catch {
    console.warn(`skip ${name} — not encoded yet, run \`npm run encode:videos\``);
    continue;
  }

  if (!FORCE && (await remoteSize(name)) === size) {
    console.log(`skip ${name} — already uploaded (${mb(size)})`);
    continue;
  }

  const res = await fetch(`${SUPA_URL}/storage/v1/object/${BUCKET}/${name}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": name.endsWith(".jpg") ? "image/jpeg" : "video/mp4",
      "Cache-Control": "public, max-age=31536000, immutable",
      "x-upsert": "true",
    },
    body: readFileSync(file),
  });
  if (!res.ok) throw new Error(`Upload failed for ${name}: ${res.status} ${await res.text()}`);
  console.log(`uploaded ${name} (${mb(size)})`);
}

console.log(`\nServed from ${SUPA_URL}/storage/v1/object/public/${BUCKET}/<file>`);
