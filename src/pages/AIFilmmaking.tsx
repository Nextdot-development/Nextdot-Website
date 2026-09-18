import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SEO from "@/lib/seo";
import { publicAsset } from "@/lib/utils";
import "./AIFilmmaking.css";

const vid = (name: string) => publicAsset(`ai-films/videos/${name}`);

const Play = () => (
  <span className="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg></span>
);

const films = [
  { file: "film-01.mp4", caption: "Selected film 01", meta: "Case film · 16:9" },
  { file: "film-02.mp4", caption: "Selected film 02", meta: "Case film · 16:9" },
  { file: "film-03.mp4", caption: "Selected film 03", meta: "Case film · 9:16", cls: "fit" },
  { file: "film-04.mp4", caption: "Selected film 04", meta: "Case film · 16:9" },
  { file: "film-05.mp4", caption: "Selected film 05", meta: "Case film · 16:9", cls: "wide" },
];

export default function AIFilmmaking() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // Reveal on scroll
    const items = el.querySelectorAll(".reveal");
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); io?.unobserve(e.target); }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
      items.forEach((n) => io!.observe(n));
    } else {
      items.forEach((n) => n.classList.add("in"));
    }

    // Selected work films: click to play, one at a time
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".media.film"));
    const handlers: Array<() => void> = [];
    cards.forEach((card) => {
      const video = card.querySelector("video") as HTMLVideoElement | null;
      const overlay = card.querySelector<HTMLElement>(".film-overlay");
      if (!video || !overlay) return;
      const onClick = () => {
        cards.forEach((o) => { if (o !== card) o.querySelector("video")?.pause(); });
        video.controls = true;
        card.classList.add("playing");
        void video.play();
      };
      overlay.addEventListener("click", onClick);
      handlers.push(() => overlay.removeEventListener("click", onClick));
    });

    return () => { io?.disconnect(); handlers.forEach((off) => off()); };
  }, []);

  return (
    <div className="aifm-page" ref={root}>
      <SEO
        title="AI Film & Motion"
        description="Nextdot builds films on an AI production pipeline: high-volume, high-consistency video for brands and enterprises."
        path="/ai-films-and-motion"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "AI Film & Motion", url: "/ai-films-and-motion" }]}
      />

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="container">
            <div className="hero-copy">
              <span className="eyebrow reveal">AI Film and Motion</span>
              <h1 className="display-hero reveal">We build films on an AI production pipeline.</h1>
              <p className="display-body reveal">A decade of film and creative work, re-engineered with AI at the core. We deliver high-volume, high-consistency video for brands and enterprises that publish at the speed of the market, with the craft held to a broadcast standard.</p>
            </div>
            <div className="media lg live reveal">
              <video src={vid("showreel.mp4")} autoPlay muted loop playsInline preload="auto" aria-label="Nextdot AI film and motion showreel" />
            </div>
          </div>
        </section>

        {/* How we work */}
        <section className="section" id="process">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow reveal">Process</span>
              <h2 className="display-title reveal">How we work</h2>
              <p className="display-body reveal">Script to storyboard to voice to final cut runs through one production pipeline. The machine does the heavy lifting. Our directors own the taste. Every film we ship trains the next one, so speed and quality compound over time.</p>
              <p className="display-body reveal">We run three stages, and we can enter at any of them:</p>
            </div>

            <div className="grid grid-3 mt-grid">
              <article className="card reveal">
                <div className="card-top">
                  <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.38 3.62a2.12 2.12 0 1 1 3 3L7.37 18.64a2 2 0 0 1-.86.5l-2.87.84a.5.5 0 0 1-.62-.62l.84-2.87a2 2 0 0 1 .5-.86z" /></svg></div>
                  <span className="card-num">01</span>
                </div>
                <div><h3 className="display-card">Direct</h3><p>Concept, script, and storyboard led by people who have shipped films for regulated enterprises.</p></div>
              </article>
              <article className="card reveal">
                <div className="card-top">
                  <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></svg></div>
                  <span className="card-num">02</span>
                </div>
                <div><h3 className="display-card">Produce</h3><p>Generative and hybrid live-action assembled through our pipeline, with production-grade voice and localization built in.</p></div>
              </article>
              <article className="card reveal">
                <div className="card-top">
                  <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7z" /></svg></div>
                  <span className="card-num">03</span>
                </div>
                <div><h3 className="display-card">Deliver</h3><p>Final cut, motion, and localized versions, ready for broadcast, campaign, and daily social at once.</p></div>
              </article>
            </div>

            <div className="media lg live mt-block reveal">
              <video src={vid("walkthrough.mp4")} autoPlay muted loop playsInline preload="metadata" aria-label="Walkthrough of the Nextdot film production pipeline" />
            </div>
          </div>
        </section>

        {/* Selected Work */}
        <section className="section surface" id="work">
          <div className="container">
            <div className="section-head">
              <h2 className="display-title reveal">Selected Work</h2>
              <p className="display-body reveal">Brand, product, and campaign films across our client base.</p>
            </div>
            <div className="grid grid-2 mt-grid">
              {films.map((f, i) => (
                <div key={f.file} className={`media live film reveal${f.cls ? ` ${f.cls}` : ""}`}>
                  <video src={`${vid(f.file)}#t=0.1`} preload="metadata" muted playsInline />
                  <button className="film-overlay" type="button" aria-label={`Play selected film ${String(i + 1).padStart(2, "0")}`}>
                    <Play />
                    <span className="caption">{f.caption}</span>
                    <span className="meta">{f.meta}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What we make */}
        <section className="section" id="make">
          <div className="container">
            <div className="section-head"><h2 className="display-title reveal">What we make</h2></div>
            <div className="grid grid-make mt-grid">
              <article className="card reveal">
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 3v18M17 3v18M3 7.5h4M3 12h18M3 16.5h4M17 7.5h4M17 16.5h4" /></svg></div>
                <div><h3 className="display-card">Brand and founder films</h3><p>Story-led films that carry a company's conviction.</p></div>
              </article>
              <article className="card reveal">
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg></div>
                <div><h3 className="display-card">Product and explainer films</h3><p>Complex products made legible in ninety seconds.</p></div>
              </article>
              <article className="card reveal">
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9.94 14.06 4 20M14.06 9.94 20 4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /><circle cx="12" cy="12" r="2.5" /></svg></div>
                <div><h3 className="display-card">Generative and hybrid live-action</h3><p>Fully generated worlds, or real footage extended and finished with generative craft.</p></div>
              </article>
              <article className="card reveal">
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V4h16v3" /><path d="M9 20h6" /><path d="M12 4v16" /></svg></div>
                <div><h3 className="display-card">Motion graphics and title design</h3><p>Systems, data, and ideas in motion.</p></div>
              </article>
              <article className="card reveal">
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0" /><path d="M12 17v5" /></svg></div>
                <div><h3 className="display-card">Voice, dubbing, and localization</h3><p>One film, every Indian language, production-grade audio.</p></div>
              </article>
              <article className="card reveal">
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.22-8.56" /><path d="M21 3v6h-6" /></svg></div>
                <div><h3 className="display-card">High-volume content pipelines</h3><p>Campaign, social, and shorts at a weekly cadence.</p></div>
              </article>
            </div>
          </div>
        </section>

        {/* Stack */}
        <section className="section surface" id="stack">
          <div className="container">
            <div className="section-head">
              <h2 className="display-title reveal">The stack behind the work</h2>
              <p className="display-body reveal">We are tool-agnostic and outcome-obsessed. Our pipeline moves across the strongest generative, voice, and reasoning systems available, chosen per shot. As these tools ship new capability every month, our process absorbs it and keeps moving.</p>
            </div>

            <div className="mt-grid">
              <p className="label reveal">Partnerships</p>
              <div className="grid grid-3">
                <div className="partner reveal">
                  <div className="icon-box"><svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Anthropic logo"><path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" /></svg></div>
                  <div><strong>Anthropic</strong><span>Claude Partner Network</span></div>
                </div>
                <div className="partner reveal">
                  <div className="icon-box"><svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="ElevenLabs logo"><path d="M4.6035 0v24h4.9317V0zm9.8613 0v24h4.9317V0z" /></svg></div>
                  <div><strong>ElevenLabs</strong><span>Channel Partner</span></div>
                </div>
                <div className="partner reveal">
                  <div className="icon-box"><img src={publicAsset("ai-films/logos/sarvam.svg")} alt="Sarvam AI logo" width={24} height={24} /></div>
                  <div><strong>Sarvam AI</strong><span>Startup Program</span></div>
                </div>
              </div>
            </div>

            <div className="mt-grid">
              <p className="label reveal">Generative stack</p>
              <div className="pills reveal">
                <span className="pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20 12 4l8 16" /><path d="M8 13h8" /></svg>Kling AI</span>
                <span className="pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4v16M19 4v16M5 12h14" /></svg>HeyGen</span>
                <span className="pill"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 18c3-8 7-12 16-14-4 3-6 7-7 12-3-1-6 0-9 2z" /></svg>Higgsfield</span>
              </div>
            </div>
          </div>
        </section>

        {/* AI Capability Center */}
        <section className="section" id="capability">
          <div className="container">
            <div className="split">
              <div>
                <h2 className="display-title reveal">Made from our AI Capability Center</h2>
                <p className="display-body reveal">Our film work is shaped by people who understand story and built by people who understand systems, working side by side from our AI Capability Center. It is where a creative brief becomes a repeatable pipeline. Enterprise craft, production-grade output, from India for the world.</p>
                <Link className="btn btn-ink reveal" to="/ai-capability-centre">Visit the AI Capability Centre</Link>
              </div>
              <div className="media lg live photo reveal">
                <img src={publicAsset("ai-films/Nextdot_AU.png")} alt="Nextdot AI Capability Center signage on the office wall" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta" id="contact">
          <div className="blob blob-1" />
          <div className="container">
            <div className="cta-inner">
              <h2 className="display-title reveal">Have a film to make, or a pipeline to build?</h2>
              <p className="display-body reveal">Whether it is a single flagship film or a content engine that runs every week, we can architect it.</p>
              <div className="cta-actions reveal">
                <Link className="btn btn-white" to="/contact">Start a project</Link>
                <a className="btn btn-ghost" href="#process">See how we work</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
