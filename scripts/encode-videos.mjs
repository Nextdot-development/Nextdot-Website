// Web encodes + poster frames for the AI Film & Motion videos.
// -------------------------------------------------------------------------
// `video/` holds the masters. This script writes web-ready copies into
// public/ai-films/videos/ (which is also what `upload-videos.mjs` pushes to
// Supabase Storage), so the site never streams a raw master or a file so large
// that Storage rejects it.
//
//   node scripts/encode-videos.mjs           # encode what changed
//   node scripts/encode-videos.mjs --force   # redo everything
//
// Rules:
//  * Over MAX_BITRATE → re-encode at CRF (visually transparent, far smaller).
//  * Already lean     → copied untouched. Re-encoding a low-bitrate file only
//                       throws away more detail; it cannot add any back.
//  * Every file gets a poster JPEG so the card shows a crisp still instead of
//    a half-decoded first frame.

import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "video");
const OUT = path.join(ROOT, "public", "ai-films", "videos");
// Build stamp lives outside public/ so it never ships with the site.
const STAMP = path.join(ROOT, ".encoded-videos.json");

const FILES = ["showreel.mp4", "film-01.mp4", "film-02.mp4", "film-03.mp4", "film-04.mp4", "film-05.mp4"];

const MAX_BITRATE = 5_000_000; // above this a re-encode is worth it
const MAX_HEIGHT = 1080;       // nothing on the page is shown larger
const CRF = 20;                // visually transparent for this material
const MIN_HEIGHT = 700;        // below this the browser has to upscale, and it does it badly
const FORCE = process.argv.includes("--force");

const ffmpeg = process.env.FFMPEG_PATH || "ffmpeg";
const ffprobe = process.env.FFPROBE_PATH || "ffprobe";
const run = (bin, args) => execFileSync(bin, args, { stdio: ["ignore", "pipe", "pipe"] }).toString();
const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`;

function probe(file) {
  const out = run(ffprobe, [
    "-v", "error", "-select_streams", "v:0",
    "-show_entries", "stream=width,height", "-show_entries", "format=bit_rate,duration",
    "-of", "default=nw=1", file,
  ]);
  // ffprobe chooses the order of the format fields, so never read them positionally.
  const field = (k) => Number(new RegExp(`^${k}=(.+)$`, "m").exec(out)?.[1]) || 0;
  return { width: field("width"), height: field("height"), bitrate: field("bit_rate"), duration: field("duration") };
}

function hasAudio(file) {
  return run(ffprobe, ["-v", "error", "-select_streams", "a", "-show_entries", "stream=index", "-of", "csv=p=0", file]).trim() !== "";
}

mkdirSync(OUT, { recursive: true });
let stamp = {};
try { stamp = JSON.parse(readFileSync(STAMP, "utf8")); } catch { /* first run */ }

for (const name of FILES) {
  const src = path.join(SRC, name);
  let srcStat;
  try { srcStat = statSync(src); } catch { console.warn(`skip ${name} — not in video/`); continue; }

  const key = `${srcStat.size}:${Math.round(srcStat.mtimeMs)}`;
  if (!FORCE && stamp[name] === key) { console.log(`skip ${name} — already encoded`); continue; }

  const dest = path.join(OUT, name);
  const poster = dest.replace(/\.mp4$/i, ".jpg");
  const { width, height, bitrate, duration } = probe(src);

  if (bitrate > MAX_BITRATE) {
    // Even-numbered dimensions keep H.264 happy; -2 lets ffmpeg solve for width.
    const scale = height > MAX_HEIGHT ? ["-vf", `scale=-2:${MAX_HEIGHT}`] : [];
    const audio = hasAudio(src) ? ["-c:a", "aac", "-b:a", "128k"] : ["-an"];
    run(ffmpeg, [
      "-y", "-i", src, ...scale,
      "-c:v", "libx264", "-crf", String(CRF), "-preset", "medium",
      "-pix_fmt", "yuv420p", "-profile:v", "high", "-level", "4.1",
      ...audio, "-movflags", "+faststart", dest,
    ]);
    console.log(`encoded ${name}  ${width}x${height} ${mb(srcStat.size)} → ${mb(statSync(dest).size)}`);
  } else if (height < MIN_HEIGHT) {
    // These are shown far wider than they were mastered, so the browser upscales
    // them with a cheap filter and they go soft. Lanczos plus a light unsharp
    // pass holds the edges together. It cannot invent detail that was never
    // captured — a better master is the only real fix — but it stops the mush.
    const factor = Math.min(2, MAX_HEIGHT / height);
    const target = Math.round((height * factor) / 2) * 2;
    const audio = hasAudio(src) ? ["-c:a", "aac", "-b:a", "128k"] : ["-an"];
    run(ffmpeg, [
      "-y", "-i", src,
      "-vf", `scale=-2:${target}:flags=lanczos,unsharp=5:5:0.8:3:3:0.4`,
      "-c:v", "libx264", "-crf", String(CRF), "-preset", "slow",
      "-pix_fmt", "yuv420p", "-profile:v", "high", "-level", "4.1",
      ...audio, "-movflags", "+faststart", dest,
    ]);
    console.log(`upscaled ${name} ${width}x${height} → ${target}p  ${mb(srcStat.size)} → ${mb(statSync(dest).size)}`);
  } else {
    copyFileSync(src, dest);
    console.log(`copied  ${name}  ${width}x${height} ${mb(srcStat.size)} — already lean, left untouched`);
  }

  // 10% in, not frame one — most of these films fade up from black.
  const at = Math.max(0.5, duration * 0.1).toFixed(2);
  run(ffmpeg, ["-y", "-ss", at, "-i", dest, "-frames:v", "1", "-q:v", "3", poster]);
  stamp[name] = key;
}

writeFileSync(STAMP, `${JSON.stringify(stamp, null, 2)}\n`);
console.log("\nposters written next to each .mp4");
