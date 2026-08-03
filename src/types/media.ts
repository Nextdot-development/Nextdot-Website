import type { Timestamp } from "@/lib/time";

/** An image stored in Firebase Storage, indexed in the `media` collection. */
export interface MediaItem {
  id?: string;
  url: string; // public download URL
  path: string; // storage path, e.g. "blog-images/1690000000-hero.jpg"
  name: string; // original file name
  alt: string;
  caption: string;
  size: number; // bytes
  contentType: string;
  width: number; // px (0 if unknown)
  height: number; // px (0 if unknown)
  createdAt: Timestamp | null;
}

export type MediaInput = Omit<MediaItem, "id" | "createdAt">;
