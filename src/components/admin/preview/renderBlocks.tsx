import React from "react";
import { Link } from "react-router-dom";
import type { BlogBlock } from "@/types/blog";

/**
 * A faithful mirror of the public site's inline + block renderer
 * (src/pages/Blogs.tsx), so the admin "Live Preview" matches the live page.
 * Extended for the additive block/inline types the CMS can author
 * (h1, blockquote, code, hr, __underline__, ~~strike~~) which the public
 * renderer adopts at publish time (Feature 7).
 *
 * Kept as an independent copy on purpose: the public file is never imported or
 * modified, so the live site cannot be affected by admin code.
 */

// **bold**, *italic*, __underline__, ~~strike~~, [label](url). Bold before italic.
const INLINE_RE = /(\*\*[^*]+\*\*|__[^_]+__|~~[^~]+~~|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;

export function renderInline(text: string): React.ReactNode[] {
  return text
    .split(INLINE_RE)
    .filter((part) => part !== "")
    .map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("__") && part.endsWith("__") && part.length > 4) {
        return <u key={i} className="underline underline-offset-2">{part.slice(2, -2)}</u>;
      }
      if (part.startsWith("~~") && part.endsWith("~~") && part.length > 4) {
        return <s key={i} className="line-through opacity-80">{part.slice(2, -2)}</s>;
      }
      if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
        return <em key={i} className="italic">{part.slice(1, -1)}</em>;
      }
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const [, label, href] = link;
        const cls = "text-accent underline underline-offset-2 hover:text-ink active:text-ink transition-colors";
        return href.startsWith("/") ? (
          <Link key={i} to={href} className={cls}>{label}</Link>
        ) : (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{label}</a>
        );
      }
      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
}

export function renderBlock(block: BlogBlock, index: number): React.ReactNode {
  switch (block.type) {
    case "h1":
      return <h2 key={index} className="text-3xl md:text-4xl font-bold mt-12 mb-4 text-ink tracking-tight">{renderInline(block.text)}</h2>;
    case "h2":
      return <h2 key={index} className="text-2xl md:text-3xl font-semibold mt-12 mb-4 text-ink tracking-tight">{renderInline(block.text)}</h2>;
    case "h3":
      return <h3 key={index} className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-ink tracking-tight">{renderInline(block.text)}</h3>;
    case "p":
      return <p key={index} className="text-ink/80 leading-relaxed my-6 text-lg">{renderInline(block.text)}</p>;
    case "ul":
      return (
        <ul key={index} className="my-6 space-y-3 list-disc pl-6 marker:text-accent">
          {block.items.map((item, i) => (
            <li key={i} className="text-ink/80 leading-relaxed text-lg">{renderInline(item)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={index} className="my-6 space-y-3 list-decimal pl-6 marker:text-accent marker:font-semibold">
          {block.items.map((item, i) => (
            <li key={i} className="text-ink/80 leading-relaxed text-lg pl-1">{renderInline(item)}</li>
          ))}
        </ol>
      );
    case "blockquote":
      return (
        <blockquote key={index} className="my-8 border-l-4 border-accent pl-5 text-lg italic text-ink/70">
          {renderInline(block.text)}
        </blockquote>
      );
    case "code":
      return (
        <pre key={index} className="my-8 overflow-x-auto rounded-xl bg-ink px-5 py-4 text-sm text-paper">
          <code>{block.text}</code>
        </pre>
      );
    case "hr":
      return <hr key={index} className="my-10 border-t border-line" />;
    case "table":
      return (
        <div key={index} className="my-8 overflow-x-auto rounded-xl border border-line">
          <table className="w-full border-collapse text-left text-sm md:text-base">
            <thead>
              <tr className="bg-surface">
                {block.headers.map((header, i) => (
                  <th key={i} className="px-4 py-3 font-semibold text-ink border-b border-line whitespace-nowrap">{renderInline(header)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-b border-line/60 last:border-0">
                  {row.map((cell, c) => (
                    <td key={c} className={`px-4 py-3 align-top ${c === 0 ? "font-semibold text-ink" : "text-ink/80"}`}>{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "image":
      return (
        <figure key={index} className="my-8">
          <div className="flex items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
            <img
              src={block.src}
              alt={block.alt ?? ""}
              style={block.width ? { width: block.width, maxWidth: "100%" } : undefined}
              className="w-full h-auto max-h-[600px] object-contain mx-auto"
              loading="lazy"
              decoding="async"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          {block.caption && <figcaption className="mt-3 text-center text-sm text-ink/55">{block.caption}</figcaption>}
        </figure>
      );
    case "faq":
      return (
        <div key={index} className="my-8 border-t border-line">
          {block.items.map((item, i) => (
            <div key={i} className="py-5 border-b border-line">
              <h3 className="text-lg md:text-xl font-semibold text-ink mb-2">{renderInline(item.q)}</h3>
              <p className="text-ink/80 leading-relaxed text-lg">{renderInline(item.a)}</p>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}
