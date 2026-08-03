import { X, Calendar, Clock } from "lucide-react";
import { renderBlock } from "./renderBlocks";
import type { BlogBlock, FaqItem } from "@/types/blog";

export interface PreviewData {
  title: string;
  category: string;
  excerpt: string;
  featuredImage: string;
  imageAlt: string;
  readTime: string;
  author: string;
  dateLabel: string;
  content: BlogBlock[];
  faq: FaqItem[];
  tags: string[];
  related: { slug: string; title: string }[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  data: PreviewData;
}

/** Renders the blog exactly as the public detail page presents it. */
export function BlogPreviewModal({ open, onClose, data }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ink/50">
      <div className="flex items-center justify-between border-b border-line bg-paper px-5 py-3">
        <span className="text-sm font-semibold text-ink/60">Live Preview — how this looks on the public site</span>
        <button onClick={onClose} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm font-medium text-ink hover:border-accent">
          <X size={15} /> Close
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-paper text-ink">
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-accent">{data.category || "Category"}</div>
            <h1 className="fluid-display-title mb-5 font-semibold tracking-tight">{data.title || "Untitled blog"}</h1>
            <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-ink/60">
              <span className="inline-flex items-center gap-1.5"><Calendar size={14} /> {data.dateLabel}</span>
              <span className="text-line">|</span>
              <span className="inline-flex items-center gap-1.5"><Clock size={14} /> {data.readTime || "1 min read"}</span>
              {data.author && (<><span className="text-line">|</span><span>{data.author}</span></>)}
            </div>
            {data.excerpt && <p className="text-xl leading-relaxed text-ink/70">{data.excerpt}</p>}
          </div>

          {data.featuredImage && (
            <div className="mb-12 flex items-center justify-center overflow-hidden rounded-3xl border border-line bg-surface shadow-sm">
              <img
                src={data.featuredImage}
                alt={data.imageAlt || data.title}
                className="mx-auto h-auto max-h-[600px] w-full object-contain"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          )}

          <article className="mx-auto max-w-3xl">
            {data.content.length === 0 ? (
              <p className="py-12 text-center text-ink/40">No content yet — start writing in the editor.</p>
            ) : (
              data.content.map((block, i) => renderBlock(block, i))
            )}

            {data.related.length > 0 && (
              <nav aria-label="Related in this series" className="mt-16 border-t border-line pt-8">
                <h2 className="mb-5 text-2xl font-semibold tracking-tight text-ink md:text-3xl">Related in this series</h2>
                <ul className="my-2 list-disc space-y-3 pl-6 marker:text-accent">
                  {data.related.map((r) => (
                    <li key={r.slug} className="text-lg leading-relaxed text-ink/80">
                      <span className="text-accent underline underline-offset-2">{r.title}</span>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {data.faq.length > 0 && (
              <>
                {renderBlock({ type: "h2", text: "Frequently asked questions" }, -1)}
                {renderBlock({ type: "faq", items: data.faq }, -2)}
              </>
            )}

            {data.tags.length > 0 && (
              <div className="mt-12 border-t border-line pt-8">
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink/60">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </article>
        </section>
      </div>
    </div>
  );
}
