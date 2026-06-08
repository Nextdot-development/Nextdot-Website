import { motion } from "motion/react";
import { publicAsset } from "@/lib/utils";

export const Testimonial = () => {
  return (
    <section className="py-24 bg-paper relative border-t border-line overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-display font-medium tracking-tight text-ink mb-12 md:mb-16"
        >
          AI CAPABILITY CENTER
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="w-full md:w-1/2 relative"
          >
            <p className="text-xl md:text-2xl text-ink/80 leading-relaxed mb-6 md:mb-8 relative z-10 font-medium">
              Nextdot operates an AI Capability Center, bringing together forward-deployed engineers, AI system architects, and agentic specialists under one roof. This is where enterprise AI systems move from idea to production.
            </p>
            <p className="text-lg md:text-xl text-ink/70 leading-relaxed mb-8 md:mb-12 relative z-10">
              Multi-agent architectures, workflow automation layers, and domain-trained models, designed, engineered, and deployed by a team that works at the intersection of AI, systems thinking, and real business operations.
            </p>
            <div>
              <div className="text-blue-600 font-medium text-lg md:text-xl mb-1">Built from emerging India</div>
              <div className="text-ink/60 text-sm md:text-base">Where the next generation of engineering talent is not just consuming global technology, but building it.</div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="w-full md:w-1/2 flex flex-col gap-4"
          >
            <div className="w-full h-48 md:h-64 rounded-3xl overflow-hidden border border-line relative shrink-0">
              <img 
                src={publicAsset("images/Office1.png")} 
                alt="Office Space"
                className="w-full h-full object-cover transition-all duration-500 hover:scale-105" 
              />
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-1/2 h-32 md:h-48 rounded-3xl overflow-hidden border border-line relative shrink-0">
                <img 
                  src={publicAsset("images/office2.png")} 
                  alt="Team Collaboration"
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-105" 
                />
              </div>
              <div className="w-1/2 h-32 md:h-48 rounded-3xl overflow-hidden border border-line relative shrink-0">
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
