import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Zap, Layers } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const FeatureSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
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
    <section ref={sectionRef} className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div ref={contentRef} className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight mb-6">
              Enterprise-Grade Control. <br />
              <span className="text-ink/40">Consumer-Grade UX.</span>
            </h2>
            <p className="text-lg text-ink/60 leading-relaxed mb-10">
              We believe powerful AI shouldn't require a Ph.D. to operate. Our interfaces are designed for business users, while maintaining strict IT governance under the hood.
            </p>
            
            <div className="space-y-8">
              {[
                {
                  icon: <Shield className="text-accent" size={20} />,
                  title: "Role-Based Access Control",
                  desc: "Granular permissions ensuring users only interact with data they are authorized to see."
                },
                {
                  icon: <Zap className="text-accent" size={20} />,
                  title: "High-Performance Inference",
                  desc: "Optimized model serving infrastructure delivering sub-second response times at scale."
                },
                {
                  icon: <Layers className="text-accent" size={20} />,
                  title: "Seamless Integration",
                  desc: "Pre-built connectors for Salesforce, SAP, Oracle, and custom internal APIs."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface border border-line flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                    <p className="text-ink/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={imageRef} className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden bg-surface border border-line p-8 flex items-center justify-center">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
             
             {/* Abstract Dashboard UI */}
             <div className="relative w-full h-full glass-card border border-white/60 shadow-2xl rounded-2xl overflow-hidden flex flex-col">
                <div className="h-12 border-b border-line bg-white/50 flex items-center px-4 gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-ink/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-ink/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-ink/20" />
                  </div>
                  <div className="h-6 w-48 bg-white rounded-md border border-line" />
                </div>
                <div className="flex-1 p-6 flex gap-6">
                  <div className="w-48 hidden sm:flex flex-col gap-3">
                    <div className="h-8 w-full bg-ink/5 rounded-md" />
                    <div className="h-8 w-3/4 bg-ink/5 rounded-md" />
                    <div className="h-8 w-5/6 bg-ink/5 rounded-md" />
                  </div>
                  <div className="flex-1 flex flex-col gap-6">
                    <div className="flex gap-4">
                      <div className="h-24 flex-1 bg-white border border-line rounded-xl shadow-sm" />
                      <div className="h-24 flex-1 bg-white border border-line rounded-xl shadow-sm" />
                      <div className="h-24 flex-1 bg-white border border-line rounded-xl shadow-sm" />
                    </div>
                    <div className="flex-1 bg-white border border-line rounded-xl shadow-sm relative overflow-hidden">
                       <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-accent/10 to-transparent" />
                    </div>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
