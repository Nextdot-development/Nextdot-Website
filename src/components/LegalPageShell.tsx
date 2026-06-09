import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export type LegalSection = {
  id: string;
  label: string;
};

type LegalPageShellProps = {
  title: string;
  effectiveDate: string;
  description: string;
  sections: LegalSection[];
  children: React.ReactNode;
};

export function LegalPageShell({ title, effectiveDate, description, sections, children }: LegalPageShellProps) {
  return (
    <div className="bg-paper min-h-screen text-ink">
      <section className="relative pt-28 md:pt-36 pb-12 md:pb-16 overflow-hidden border-b border-line">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-blue-400/5 blur-[120px]" />
          <div className="absolute top-24 -left-24 w-80 h-80 rounded-full bg-black/5 blur-[140px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-ink transition-colors group"
          >
            <ArrowUpRight size={16} className="rotate-180 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
            Back to Home
          </Link>

          <div className="mt-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-4 py-2 text-xs font-mono tracking-[0.24em] uppercase text-ink/55 backdrop-blur-sm">
              Legal / Enterprise
            </div>
            <h1 className="mt-6 fluid-display-title font-display font-medium tracking-tight text-ink">
              {title}
            </h1>
            <p className="mt-5 text-base md:text-lg text-ink/65 leading-relaxed max-w-2xl">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-ink/60">
              <span className="rounded-full border border-line bg-white/70 px-4 py-2">Effective Date</span>
              <span className="rounded-full border border-line bg-white/70 px-4 py-2 font-medium text-ink">{effectiveDate}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[240px_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
            <aside className="lg:sticky lg:top-28 self-start">
              <div className="rounded-2xl border border-line bg-white/70 backdrop-blur-sm p-5 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
                <p className="text-xs font-mono tracking-[0.2em] uppercase text-ink/45 mb-4">On this page</p>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block rounded-lg px-3 py-2 text-sm text-ink/60 hover:text-ink hover:bg-surface/70 transition-colors"
                    >
                      {section.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <article className="min-w-0 rounded-3xl border border-line bg-white/80 backdrop-blur-sm shadow-[0_12px_40px_rgba(15,23,42,0.04)] overflow-hidden">
              <div className="border-b border-line bg-surface/50 px-5 sm:px-8 py-5 sm:py-6">
                <p className="text-sm text-ink/60 leading-relaxed">Please read carefully. The content below defines the terms that govern use of this website and related communications.</p>
              </div>
              <div className="px-5 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-12">
                <div className="max-w-3xl mx-auto prose prose-lg prose-neutral prose-headings:font-display prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-ink prose-p:text-ink/75 prose-p:leading-8 prose-li:text-ink/75 prose-li:leading-8 prose-a:text-ink prose-a:underline-offset-4 hover:prose-a:text-ink/80 prose-strong:text-ink">
                  {children}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
