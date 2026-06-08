import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const ProductSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 0.95, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="products" className="py-24 sm:py-32 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative" ref={imageRef}>
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent rounded-[2rem] transform -rotate-3 scale-105 blur-xl" />
            <div className="relative glass-card rounded-[2rem] p-2 border border-white/60 shadow-2xl overflow-hidden bg-white/40">
              <div className="absolute top-0 left-0 w-full h-12 bg-white/80 border-b border-line flex items-center px-4 gap-2 backdrop-blur-md z-10">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                <div className="ml-4 text-xs font-medium text-ink/40">NextComply AI Engine</div>
              </div>
              <div className="pt-12 bg-white/50 aspect-[4/3] relative overflow-hidden">
                {/* Abstract UI Representation */}
                <div className="absolute inset-0 p-6 flex flex-col gap-4">
                  <div className="w-full h-8 bg-ink/5 rounded-md animate-pulse" />
                  <div className="flex gap-4">
                    <div className="w-1/3 h-32 bg-ink/5 rounded-xl" />
                    <div className="w-2/3 h-32 bg-white border border-line rounded-xl shadow-sm p-4 flex flex-col gap-3">
                      <div className="w-24 h-4 bg-accent/20 rounded-full" />
                      <div className="w-full h-2 bg-ink/5 rounded-full" />
                      <div className="w-4/5 h-2 bg-ink/5 rounded-full" />
                      <div className="w-full h-2 bg-ink/5 rounded-full" />
                    </div>
                  </div>
                  <div className="w-full h-48 bg-white border border-line rounded-xl shadow-sm mt-auto relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-accent/5 to-transparent" />
                    <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M0,100 L0,50 Q25,30 50,60 T100,40 L100,100 Z" fill="rgba(37, 99, 235, 0.1)" />
                      <path d="M0,100 L0,60 Q25,40 50,70 T100,50 L100,100 Z" fill="rgba(37, 99, 235, 0.05)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-line text-ink/60 text-xs font-medium mb-6 shadow-sm">
              Featured Product
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight mb-6">
              NextComply AI
            </h2>
            <p className="text-lg text-ink/60 leading-relaxed mb-8">
              Automate regulatory compliance and audit reporting with our specialized LLM engine. NextComply ingests thousands of pages of regulatory text and maps them directly to your internal policies.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Automated policy gap analysis",
                "Real-time regulatory change tracking",
                "Audit-ready report generation",
                "Secure, on-premise deployment options"
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent mt-1" size={18} />
                  <span className="text-ink/80 font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <button className="bg-ink text-paper px-8 py-4 rounded-full font-medium hover:bg-ink/90 transition-all shadow-xl shadow-ink/10 active:scale-95">
              Explore NextComply
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
