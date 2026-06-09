import { motion } from "motion/react";
import nextComplyVideo from "../../video/NextComplyAI.mp4";

export const SuccessStories = () => {
  return (
    <section className="py-20 sm:py-24 bg-paper relative border-t border-line overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 md:mb-16"
        >
          <div>
            <div className="text-sm font-medium text-blue-600 mb-4 tracking-wider uppercase">Flagship Product · Live</div>
            <h2 className="fluid-display-title font-display font-medium tracking-tight text-ink">
              NextComply AI
            </h2>
          </div>
          <p className="fluid-display-body text-ink/60 max-w-md md:text-right mt-0">
            A Small Language Model built exclusively for healthcare compliance - trained to understand the rules, so your teams don’t have to enforce them manually.
          </p>
        </motion.div>

        <div className="w-full rounded-3xl overflow-hidden border border-line bg-surface shadow-sm relative">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="metadata"
            className="w-full h-auto object-cover"
          >
            <source src={nextComplyVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};
