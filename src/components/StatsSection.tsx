import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 99.9, suffix: "%", label: "Uptime SLA", decimals: 1 },
  { value: 50, suffix: "M+", label: "API Calls Daily", decimals: 0 },
  { value: 12, suffix: "x", label: "Faster Deployment", decimals: 0 },
  { value: 0, suffix: " Data Leaks", label: "Enterprise Security", decimals: 0 }
];

export const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          if (!hasAnimated) {
            setHasAnimated(true);
            
            // Animate counters
            const counters = document.querySelectorAll('.stat-value');
            counters.forEach((counter, i) => {
              const target = stats[i].value;
              const decimals = stats[i].decimals;
              
              gsap.to(counter, {
                innerHTML: target,
                duration: 1.2,
                ease: "power2.out",
                snap: { innerHTML: Math.pow(10, -decimals) },
                onUpdate: function() {
                  if (decimals > 0) {
                    counter.innerHTML = Number(this.targets()[0].innerHTML).toFixed(decimals);
                  }
                }
              });
            });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-20 border-y border-line bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-ink mb-2 flex items-center">
                <span className="stat-value">0</span>
                <span>{stat.suffix}</span>
              </div>
              <div className="text-sm font-medium text-ink/50 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
