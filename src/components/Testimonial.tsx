import { motion } from "motion/react";
import { publicAsset } from "@/lib/utils";

export const Testimonial = () => {
  return (
    <section className="py-20 sm:py-24 bg-paper relative border-t border-line overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fluid-display-title font-display font-medium tracking-tight text-ink mb-12 md:mb-16"
        >
          AI CAPABILITY CENTER
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="w-full md:w-1/2 relative min-w-0"
          >
            <p className="fluid-display-body text-ink/80 mb-6 md:mb-8 relative z-10 font-medium">
              Nextdot operates an AI Capability Center, bringing together forward-deployed engineers, AI system architects, and agentic specialists under one roof. This is where enterprise AI systems move from idea to production.
            </p>
            <p className="fluid-display-body text-ink/70 mb-8 md:mb-12 relative z-10">
              Multi-agent architectures, workflow automation layers, and domain-trained models, designed, engineered, and deployed by a team that works at the intersection of AI, systems thinking, and real business operations.
            </p>
            <div>
              <div className="fluid-display-card text-blue-600 font-medium mb-1">Built from emerging India</div>
              <div className="text-ink/60 text-sm md:text-base">Where the next generation of engineering talent is not just consuming global technology, but building it.</div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="w-full md:w-1/2 flex flex-col gap-4 min-w-0"
          >
            <div className="w-full h-48 sm:h-56 md:h-64 rounded-3xl overflow-hidden border border-line relative shrink-0">
              <img 
                src={publicAsset("images/office1.png")}
                alt="Office Space"
                className="w-full h-full object-cover transition-all duration-500 hover:scale-105" 
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <div className="w-full h-32 sm:h-40 md:h-48 rounded-3xl overflow-hidden border border-line relative shrink-0">
                <img 
                  src={publicAsset("images/office2.png")} 
                  alt="Team Collaboration"
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-105" 
                />
              </div>
              <div className="w-full h-32 sm:h-40 md:h-48 rounded-3xl overflow-hidden border border-line relative shrink-0">
                <img 
                  src={publicAsset("images/office4.webp")} 
                  alt="Office Meeting"
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-105" 
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
