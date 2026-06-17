import { motion } from "motion/react";
import { ClientLogos } from "./ClientLogos";

export const Insights = () => {
  return (
    <section className="py-24 bg-paper relative border-t border-line overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Credibility Stats & Logos Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Title & Compact Stats */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col min-w-0"
          >
            <div className="text-sm font-medium text-blue-600 mb-4 tracking-wider uppercase">Credibility</div>
            <h2 className="fluid-display-title font-display font-medium text-ink mb-8">
              Who we work with
            </h2>
            
          </motion.div>

          {/* Right: Logos Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-6 lg:col-start-7 bg-surface border border-line rounded-3xl p-4 sm:p-5 md:p-7 lg:p-8 flex items-center justify-center overflow-hidden shadow-[0_12px_30px_rgba(2,6,23,0.05)] min-w-0"
          >
            <ClientLogos />
          </motion.div>
        </div>


      </div>
    </section>
  );
};
