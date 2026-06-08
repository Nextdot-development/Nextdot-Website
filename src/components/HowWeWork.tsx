import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discovery & Audit",
    description: "We analyze your existing data infrastructure, workflows, and security requirements to identify high-impact AI opportunities."
  },
  {
    number: "02",
    title: "Architecture Design",
    description: "Designing a secure, scalable AI architecture tailored to your enterprise, selecting the right models and integration points."
  },
  {
    number: "03",
    title: "Model Fine-Tuning",
    description: "Adapting foundational models using your proprietary data within a secure, isolated environment."
  },
  {
    number: "04",
    title: "Deployment & Scaling",
    description: "Rolling out the AI solution with robust monitoring, governance, and continuous learning pipelines."
  }
];

export const HowWeWork = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        stepsRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
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
    <section ref={sectionRef} className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight mb-6">
            Our Methodology
          </h2>
          <p className="text-lg text-ink/60 leading-relaxed">
            A structured, risk-mitigated approach to bringing generative AI into enterprise production environments.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-line -translate-y-1/2 z-0" />
          
          <div className="grid lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index}
                ref={el => stepsRef.current[index] = el}
                className="relative"
              >
                <div className="w-16 h-16 rounded-full bg-white border border-line shadow-sm flex items-center justify-center text-xl font-display font-semibold text-accent mb-8 mx-auto lg:mx-0">
                  {step.number}
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-ink/60 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
