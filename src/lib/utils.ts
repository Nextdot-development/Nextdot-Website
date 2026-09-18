import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function publicAsset(path: string) {
  const cleanPath = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

/**
 * Bucket in Supabase Storage that holds the site's videos. Serving from Storage
 * is opt-in: set VITE_SUPABASE_VIDEO_BUCKET only once `npm run upload:videos`
 * has actually put the files there. Having VITE_SUPABASE_URL set (the CMS needs
 * it) must not by itself point the page at an empty bucket.
 */
const VIDEO_BUCKET = (import.meta.env.VITE_SUPABASE_VIDEO_BUCKET as string | undefined) ?? "";

/**
 * Public URL for a video file: Supabase Storage when a bucket is configured,
 * otherwise the copy shipped in `public/`.
 */
export function videoAsset(name: string) {
  const file = name.replace(/^\/+/, "");
  const rawUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? "";
  const url = rawUrl.replace(/\/rest\/v1\/?$/i, "").replace(/\/+$/, "");
  if (url && VIDEO_BUCKET) return `${url}/storage/v1/object/public/${VIDEO_BUCKET}/${file}`;
  return localVideoAsset(file);
}

/** Poster still for a video, always served locally — a JPEG is small enough. */
export function posterAsset(name: string) {
  return localVideoAsset(name.replace(/\.mp4$/i, ".jpg"));
}

/** The copy of a video shipped in `public/` — the fallback when Storage 404s. */
export function localVideoAsset(name: string) {
  return publicAsset(`ai-films/videos/${name.replace(/^\/+/, "")}`);
}
