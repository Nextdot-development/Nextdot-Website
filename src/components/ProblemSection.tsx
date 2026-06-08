import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertCircle, Clock, Database, ShieldAlert } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    icon: <Database className="text-accent" size={24} />,
    title: "Siloed Data Systems",
    description: "Enterprise data is trapped across disconnected legacy systems, preventing unified AI context and decision making."
  },
  {
    icon: <Clock className="text-accent" size={24} />,
    title: "Slow Deployment Cycles",
    description: "Moving from AI prototypes to production takes months, blocked by compliance, security, and integration hurdles."
  },
  {
    icon: <ShieldAlert className="text-accent" size={24} />,
    title: "Security & Governance",
    description: "Public LLMs pose data leakage risks. Enterprises need private, governed AI environments with strict access controls."
  },
  {
    icon: <AlertCircle className="text-accent" size={24} />,
    title: "Hallucination Risks",
    description: "Generic models lack domain specificity, leading to inaccurate outputs that cannot be trusted in critical workflows."
  }
];

export const ProblemSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
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
    <section ref={sectionRef} className="py-24 sm:py-32 bg-surface relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16 sm:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight mb-6">
            The Enterprise AI Gap
          </h2>
          <p className="text-lg text-ink/60 leading-relaxed">
            While consumer AI moves fast, enterprises face unique structural challenges. We bridge the gap between experimental models and production-ready infrastructure.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="glass-card p-8 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                {problem.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
              <p className="text-ink/60 text-sm leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
