import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Gauge, RefreshCw, Network } from "lucide-react";
import aiCreativeVideo from "../../video/ai creative.mp4";
import SEO from '@/lib/seo';

export default function NextdotCreative() {
  const services = [
    {
      title: "Video Production & Ad Films",
      description: "Brand films, ad campaigns, corporate content, social video. Concept to delivery.",
      tags: ["Brand films", "Ad campaigns", "Corporate & product videos", "Social formats"]
    },
    {
      title: "Motion Graphics & Animation",
      description: "2D, 3D, motion design. For content that needs to move to land.",
      tags: ["2D & 3D animation", "Motion design", "Explainers", "Animated social assets"]
    },
    {
      title: "Social Media Management",
      description: "Full-cycle social strategy, content, community, and reporting. Consistent brand presence across every platform.",
      tags: ["Instagram", "LinkedIn", "Facebook", "X", "Platform content strategy"]
    },
    {
      title: "YouTube Channel Management",
      description: "Channel strategy, SEO, scripting, production, and analytics. For brands building something durable on the platform.",
      tags: ["Channel strategy", "Video SEO", "Production support", "Thumbnail & metadata", "Analytics"]
    },
    {
      title: "Influencer & Creator Marketing",
      description: "Creator ecosystems built to run not one-off activations. Identification, briefing, execution, and measurement.",
      tags: ["Creator strategy", "Campaign management", "Micro & macro networks", "Performance tracking"]
    },
    {
      title: "Performance Marketing",
      description: "Google, Meta, programmatic. Creative-led, data-governed, built around outcomes not spend management.",
      tags: ["Google & Meta Ads", "CPO / CPA campaigns", "Creative testing", "Budget optimisation"]
    },
    {
      title: "Content & Creative Production",
      description: "Copy, design, photography, asset production at volume, without the drop in quality. AI-assisted where it helps.",
      tags: ["Copywriting", "Graphic design", "Photography direction", "Multi-platform assets"]
    },
    {
      title: "Digital Growth & Strategy",
      description: "Content, paid, SEO, and conversion connected into one operating plan. Not a deck. An execution.",
      tags: ["SEO", "Funnel design", "Growth strategy", "Analytics & attribution"]
    },
    {
      title: "Fractional CTO / CPO",
      description: "Technology and product leadership for teams that need senior judgment without full-time overhead.",
      tags: ["Fractional CPO", "Tech strategy", "Product roadmap", "Team structuring"]
    },
    {
      title: "Learning Experience Design",
      description: "Courses built for working professionals using proven adult learning principles, structured curricula, and engagement systems that drive completion.",
      tags: ["Adult Learning", "7Cs Framework", "Knowledge Pods", "Gamification"]
    },
    {
      title: "AI-Led Production Engine",
      description: "Scale medical learning with AI avatars, motion graphics, multilingual delivery, and expert-reviewed healthcare content.",
      tags: ["AI Avatars", "Motion Graphics", "Multilingual", "Medical Vetting"]
    },
    {
      title: "Healthcare Knowledge Center",
      description: "Domain-led healthcare storytelling powering learning programs, campaign assets, and editorial content at scale.",
      tags: ["Medical Content", "Campaign Assets", "Editorial Systems", "Healthcare Experts"]
    }
  ];

  // Carousel state
  const CAROUSEL_DOTS = 3;
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeDot, setActiveDot] = useState(0);

  const syncCarousel = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
    setActiveDot(max > 0 ? Math.round((el.scrollLeft / max) * (CAROUSEL_DOTS - 1)) : 0);
  }, []);

  const slide = useCallback((dir: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'right' ? el.clientWidth : -el.clientWidth, behavior: 'smooth' });
  }, []);

  const scrollToDot = useCallback((dot: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: (dot / (CAROUSEL_DOTS - 1)) * max, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener('scroll', syncCarousel, { passive: true });
    syncCarousel();
    return () => el.removeEventListener('scroll', syncCarousel);
  }, [syncCarousel]);

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-blue-500/30">
      <SEO
        title="Nextdot Creative"
        description="Video production, motion graphics, brand films, and performance creative rebuilt as a production system."
        path="/creative"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Nextdot Creative", url: "/creative" }]}
      />
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-400/10 blur-[120px]"></div>
          <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-300/10 blur-[100px]"></div>
        </div>

        <div className="relative z-10 w-full md:flex md:gap-8 lg:gap-10 md:items-start px-6 md:pl-12 md:pr-0">
          {/* Connecting Lines */}
          <div className="absolute -top-48 left-4 md:left-6 w-px h-48 bg-gradient-to-b from-transparent to-blue-500 hidden md:block" />
          <div className="absolute top-0 left-4 md:left-6 w-2 h-2 -ml-[3px] rounded-full bg-blue-500 hidden md:block shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          <div className="absolute top-0 left-4 md:left-6 w-px h-full bg-line hidden md:block" />

          <div className="w-full md:w-[30%] md:max-w-[480px] md:shrink-0">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="fluid-display-hero font-display font-medium tracking-tight text-ink mb-8"
            >
              Creative, rebuilt as a system
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="fluid-display-body text-ink/60 mb-8"
            >
              We started in creative and digital. That work just got smarter.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="fluid-display-body text-ink/60"
            >
              Same craft. A different operating model.
            </motion.p>
          </div>

          <div className="relative m-0 p-0 w-full md:flex-1 md:min-w-0 mt-8 md:mt-0 aspect-video overflow-hidden rounded-[24px] md:rounded-r-none bg-surface">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="block m-0 p-0 w-full h-full object-cover"
            >
              <source src={aiCreativeVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Hero Context Section — Redesigned */}
      <section className="py-24 md:py-32 bg-paper border-t border-line overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          {/* Row 1: Headline + Dark Statement Card */}
          <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-10 xl:gap-20 items-start mb-16 md:mb-24">

            {/* Left: eyebrow + headline + body */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <span className="text-accent text-[10px] font-mono tracking-widest uppercase mb-6 block">
                // A decade of craft
              </span>
              <h2 className="fluid-display-title font-display font-medium text-ink leading-[1.1] mb-8">
                Creative, content, campaigns - we've done the work at scale, long before AI became a talking point.
              </h2>
              <div className="flex items-start gap-4 mt-8 pt-8 border-t border-line/60">
                <div className="w-1 h-full min-h-[60px] bg-accent/30 rounded-full shrink-0 mt-1" />
                <p className="text-base md:text-lg text-ink/60 leading-relaxed">
                  Nextdot has spent over a decade running creative and digital systems — brand communication, content pipelines, performance campaigns, and production — across industries and markets.
                </p>
              </div>
            </motion.div>

            {/* Right: dark statement card */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
              className="lg:pt-10"
            >
              <div className="bg-ink rounded-3xl p-8 md:p-10 relative overflow-hidden group">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/[0.03] to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/50 text-[10px] font-mono tracking-widest uppercase mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    Our position
                  </span>
                  <p className="text-white text-xl md:text-2xl font-display font-medium leading-snug mb-8">
                    We are not an agency adapting to AI.{" "}
                    <span className="text-white/45">
                      We are a company restructuring around it.
                    </span>
                  </p>
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-white/30 text-xs font-mono tracking-widest uppercase">What's changed</span>
                    <div className="flex gap-2">
                      {["Faster systems", "Tighter loops", "Better output"].map((tag) => (
                        <span key={tag} className="text-[10px] text-white/40 font-mono px-2 py-1 rounded-full border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Row 2: What that means — 3 numbered cards */}
          <div className="mb-16 md:mb-20">
            <p className="text-[10px] font-mono tracking-widest uppercase text-ink/40 mb-8">
              What that means in practice
            </p>
            <div className="grid md:grid-cols-3 gap-4 md:gap-5">
              {[
                { num: "01", text: "Production cycles compressed from weeks to days", icon: <Gauge size={22} strokeWidth={1.5} /> },
                { num: "02", text: "Creative tested continuously, not campaign by campaign", icon: <RefreshCw size={22} strokeWidth={1.5} /> },
                { num: "03", text: "Systems that generate, adapt, and optimise output at scale", icon: <Network size={22} strokeWidth={1.5} /> },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: idx * 0.08 }}
                  className="bg-surface border border-line rounded-2xl p-7 md:p-8 flex flex-col gap-8 group hover:border-ink/20 active:border-ink/20 hover:shadow-[0_8px_28px_rgba(2,6,23,0.07)] active:shadow-[0_8px_28px_rgba(2,6,23,0.07)] transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-paper border border-line flex items-center justify-center text-ink/40 group-hover:text-accent group-active:text-accent group-hover:border-accent/30 group-active:border-accent/30 transition-colors duration-300">
                      {item.icon}
                    </div>
                    <span className="text-3xl font-display font-semibold text-ink/10 group-hover:text-ink/20 group-active:text-ink/20 transition-colors duration-300 select-none leading-none">
                      {item.num}
                    </span>
                  </div>
                  <p className="text-ink font-medium text-base md:text-lg leading-snug">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Row 3: Closing statement bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="border-t border-line pt-10 md:pt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
          >
            <p className="fluid-display-title font-display font-medium text-ink leading-tight">
              The foundation is the same.{" "}
              <span className="text-ink/35">The way it runs is not.</span>
            </p>
            <div className="shrink-0 w-12 h-12 rounded-full border border-line flex items-center justify-center text-ink/30 hover:border-ink/30 active:border-ink/30 hover:text-ink/60 active:text-ink/60 transition-colors cursor-default">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="py-24 bg-paper border-t border-line overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header row with desktop arrows */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex items-end justify-between mb-12"
          >
            <h2 className="fluid-display-title font-display text-ink">What we do.</h2>

            <div className="hidden sm:flex items-center gap-3 shrink-0 ml-6">
              <button
                onClick={() => slide('left')}
                disabled={!canPrev}
                className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-ink transition-all duration-200 hover:bg-surface hover:border-ink/30 disabled:opacity-25 disabled:cursor-not-allowed"
                aria-label="Previous slide"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button
                onClick={() => slide('right')}
                disabled={!canNext}
                className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-ink transition-all duration-200 hover:bg-surface hover:border-ink/30 disabled:opacity-25 disabled:cursor-not-allowed"
                aria-label="Next slide"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </motion.div>

          {/* Carousel track */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {services.map((service, idx) => (
              <div
                key={idx}
                className="flex-none w-[82vw] sm:w-[340px] lg:w-[380px] snap-start bg-surface border border-line p-7 sm:p-8 md:p-10 rounded-2xl flex flex-col hover:border-accent/30 active:border-accent/30 hover:shadow-[0_8px_28px_rgba(2,6,23,0.07)] active:shadow-[0_8px_28px_rgba(2,6,23,0.07)] transition-all duration-300 group"
              >
                <div className="text-[10px] font-mono tracking-widest uppercase text-ink/30 mb-5">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="fluid-display-card font-display font-medium text-ink mb-4 group-hover:text-accent group-active:text-accent transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-ink/60 leading-relaxed mb-6 text-sm md:text-base">
                  {service.description}
                </p>
                <div className="mt-auto pt-5 border-t border-line">
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="text-xs text-ink/50 font-medium px-3 py-1 bg-paper border border-line/60 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer: mobile arrows + dots */}
          <div className="flex items-center mt-8 gap-4">
            {/* Mobile arrows */}
            <div className="flex sm:hidden items-center gap-3">
              <button
                onClick={() => slide('left')}
                disabled={!canPrev}
                className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink transition-all active:bg-surface active:border-ink/30 disabled:opacity-25"
                aria-label="Previous slide"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button
                onClick={() => slide('right')}
                disabled={!canNext}
                className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink transition-all active:bg-surface active:border-ink/30 disabled:opacity-25"
                aria-label="Next slide"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>

            {/* Dots — centred on mobile, left-aligned on desktop */}
            <div className="flex items-center gap-2 mx-auto sm:mx-0">
              {Array.from({ length: CAROUSEL_DOTS }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToDot(i)}
                  aria-label={`Go to slide group ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeDot ? 'w-6 bg-ink' : 'w-1.5 bg-ink/20 hover:bg-ink/40 active:bg-ink/40'
                  }`}
                />
              ))}
            </div>

            {/* Slide counter */}
            <span className="hidden sm:block text-xs font-mono text-ink/30 ml-auto tracking-wider">
              {String(activeDot + 1).padStart(2, '0')} / {String(CAROUSEL_DOTS).padStart(2, '0')}
            </span>
          </div>

        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-24 bg-ink relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 md:gap-5 mb-6 cursor-pointer"
            >
              <h2 className="fluid-display-hero font-display font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-blue-400 group-active:text-blue-400">
                Let's talk.
              </h2>
              <span className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 text-white shrink-0 transition-all duration-300 group-hover:border-blue-400 group-active:border-blue-400 group-hover:bg-blue-400 group-active:bg-blue-400 group-hover:text-ink group-active:text-ink group-hover:translate-x-1 group-active:translate-x-1">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </span>
            </Link>
            <p className="fluid-display-body text-white/70 mb-4">
              Tell us what you are working on.
            </p>
            <a 
              href="mailto:contact@nextdot.co.in"
              className="text-xl md:text-2xl text-blue-400 font-medium hover:text-blue-300 active:text-blue-300 transition-colors"
            >
              contact@nextdot.co.in
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
