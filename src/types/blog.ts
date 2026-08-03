import type { Timestamp } from "@/lib/time";

export type BlogStatus = "draft" | "scheduled" | "published" | "archived";

export interface FaqItem {
  q: string;
  a: string;
}

// Rich content block model. A superset of the public site's Block union —
// h2/h3/p/ul/ol/table/image/faq render 1:1 on the live site today; h1,
// blockquote, code and hr are additive block types the editor can produce and
// the publish pipeline (Feature 7) maps onto the public renderer. Inline
// formatting lives inside the text strings as lightweight tokens:
//   **bold**  *italic*  __underline__  ~~strike~~  [label](url)
// (the first three match the public site's inline parser).
export type BlogBlock =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "code"; text: string; language?: string }
  | { type: "hr" }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "image"; src: string; alt?: string; caption?: string; width?: number }
  | { type: "faq"; items: FaqItem[] };

/** A blog document as stored in Firestore. */
export interface BlogDoc {
  id?: string;
  title: string;
  slug: string;
  excerpt: string; // maps to public "description"
  content: BlogBlock[];
  featuredImage: string; // maps to public "image"
  imageAlt: string;
  category: string;
  tags: string[];
  seoTitle: string; // maps to public "metaTitle"
  metaDescription: string;
  readTime: string;
  author: string;
  status: BlogStatus;
  // Workflow timestamps
  publishAt: Timestamp | null; // scheduled / intended go-live time (the "publish date")
  publishedAt: Timestamp | null; // when it first actually went live
  timeZone: string; // IANA zone the schedule was entered in (e.g. "Asia/Kolkata")
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  createdBy: string; // author email/uid at creation
  updatedBy: string; // author email/uid of the last edit
  version: number; // increments on each explicit save
  relatedBlogs: string[]; // slugs
  faq: FaqItem[];
  canonicalUrl: string;
  ogImage: string;
  twitterImage: string;
}

/** The editable fields of a blog (everything except server-managed metadata). */
export type BlogInput = Omit<
  BlogDoc,
  "id" | "createdAt" | "updatedAt" | "publishedAt" | "createdBy" | "updatedBy" | "version"
>;

/** A point-in-time snapshot stored under blogs/{id}/history. */
export interface BlogVersion {
  id?: string;
  version: number;
  editedBy: string;
  editedAt: Timestamp | null;
  status: BlogStatus;
  title: string;
  data: BlogInput; // the full editable payload at that version
}

export interface Category {
  id?: string;
  name: string;
  slug: string;
}

export const BLOG_STATUSES: BlogStatus[] = ["draft", "scheduled", "published", "archived"];
