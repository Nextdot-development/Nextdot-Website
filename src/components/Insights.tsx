import { motion } from "motion/react";
import { ClientLogos } from "./ClientLogos";

export const Insights = () => {
  return (
    <section className="py-24 bg-paper relative border-t border-line overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Credibility Stats & Logos Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-32 items-center">
          {/* Left: Title & Compact Stats */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="text-sm font-medium text-blue-600 mb-4 tracking-wider uppercase">Credibility</div>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-ink leading-tight mb-8">
              Who we work with
            </h2>
            
            <div className="grid grid-cols-2 gap-4 md:gap-5 mt-4">
              <div className="bg-surface border border-line rounded-2xl p-4 md:p-6 flex flex-col justify-center shadow-[0_8px_24px_rgba(2,6,23,0.04)] transition-all duration-300 hover:border-blue-200 hover:-translate-y-0.5">
                <div className="text-2xl md:text-3xl font-display font-medium text-blue-600 mb-1">10+</div>
                <div className="text-[10px] md:text-xs font-medium text-ink/60 uppercase tracking-wider">Years Operating</div>
              </div>
              <div className="bg-surface border border-line rounded-2xl p-4 md:p-6 flex flex-col justify-center shadow-[0_8px_24px_rgba(2,6,23,0.04)] transition-all duration-300 hover:border-purple-200 hover:-translate-y-0.5">
                <div className="text-2xl md:text-3xl font-display font-medium text-purple-600 mb-1">30+</div>
                <div className="text-[10px] md:text-xs font-medium text-ink/60 uppercase tracking-wider">Specialists</div>
              </div>
              <div className="bg-surface border border-line rounded-2xl p-4 md:p-6 flex flex-col justify-center shadow-[0_8px_24px_rgba(2,6,23,0.04)] transition-all duration-300 hover:border-blue-200 hover:-translate-y-0.5">
                <div className="text-2xl md:text-3xl font-display font-medium text-blue-600 mb-1">100+</div>
                <div className="text-[10px] md:text-xs font-medium text-ink/60 uppercase tracking-wider">Systems Delivered</div>
              </div>
              <div className="bg-surface border border-line rounded-2xl p-4 md:p-6 flex flex-col justify-center shadow-[0_8px_24px_rgba(2,6,23,0.04)] transition-all duration-300 hover:border-purple-200 hover:-translate-y-0.5">
                <div className="text-2xl md:text-3xl font-display font-medium text-purple-600 mb-1">3</div>
                <div className="text-[10px] md:text-xs font-medium text-ink/60 uppercase tracking-wider">Products Live</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Logos Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-6 lg:col-start-7 bg-surface border border-line rounded-3xl p-5 md:p-7 lg:p-8 flex items-center justify-center overflow-hidden shadow-[0_12px_30px_rgba(2,6,23,0.05)]"
          >
            <ClientLogos />
          </motion.div>
        </div>

        {/* How We Work Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-end mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-ink">
            How we work
          </h2>
          <p className="text-base md:text-lg text-ink/60 max-w-xl md:text-right mt-6 md:mt-0">
            We deploy dedicated AI engineering pods that work alongside your team to take AI from exploration to production. Each pod is built around your problem, combining AI engineers, system architects, and domain specialists who own the outcome end-to-end.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            className="bg-surface rounded-3xl p-8 md:p-10 lg:p-12 flex flex-col justify-between border border-line group hover:border-blue-200 transition-colors h-[220px] md:h-[240px]"
          >
              <div className="flex justify-between items-start">
              <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-white border border-line text-ink text-[10px] md:text-xs font-medium rounded-full">01 - DISCOVER</span>
              <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-medium text-ink mb-4 leading-tight">
                Map the highest-leverage problem inside your workflow.
              </h3>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="bg-surface rounded-3xl p-8 md:p-10 lg:p-12 flex flex-col justify-between border border-line group hover:border-blue-200 transition-colors h-[220px] md:h-[240px]"
          >
              <div className="flex justify-between items-start">
              <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-white border border-line text-ink text-[10px] md:text-xs font-medium rounded-full">02 - ARCHITECT</span>
              <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-medium text-ink mb-4 leading-tight">
                Design the system, integrations, data flow, and governance before building.
              </h3>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="bg-surface rounded-3xl p-8 md:p-10 lg:p-12 flex flex-col justify-between border border-line group hover:border-blue-200 transition-colors h-[220px] md:h-[240px]"
          >
              <div className="flex justify-between items-start">
              <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-white border border-line text-ink text-[10px] md:text-xs font-medium rounded-full">03 - ENGINEER</span>
              <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-medium text-ink mb-4 leading-tight">
                Deploy real systems into real environments. Not isolated pilots.
              </h3>
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="bg-surface rounded-3xl p-8 md:p-10 lg:p-12 flex flex-col justify-between border border-line group hover:border-blue-200 transition-colors h-[220px] md:h-[240px]"
          >
              <div className="flex justify-between items-start">
              <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-white border border-line text-ink text-[10px] md:text-xs font-medium rounded-full">04 - OPTIMISE</span>
              <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-medium text-ink mb-4 leading-tight">
                Continuously improve performance post-deployment. ROI compounds.
              </h3>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
