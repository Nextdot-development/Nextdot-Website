import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn, publicAsset } from "@/lib/utils";

export const Platforms = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const platforms = [
    {
      title: "AI-Augmented Content Systems",
      desc: "High-volume, high-consistency content pipelines powered by AI.",
      image: publicAsset("images/AACS.webp")
    },
    {
      title: "Performance Marketing Systems",
      desc: "Campaigns driven by real-time intelligence and optimisation loops.",
      image: publicAsset("images/PMS.webp")
    },
    {
      title: "Video & Design Production",
      desc: "Faster iteration. Scalable production. Enterprise-grade output.",
      image: publicAsset("images/VDP.webp")
    },
    {
      title: "Digital Growth Systems",
      desc: "End-to-end growth infrastructure, not isolated campaigns.",
      image: publicAsset("images/DGS.webp")
    }
  ];

  return (
    <section className="py-20 sm:py-24 bg-paper relative border-t border-line overflow-hidden" id="use-cases">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 md:mb-16"
        >
          <h2 className="fluid-display-title font-display font-medium tracking-tight text-ink">
            Nextdot for Creative
          </h2>
          <p className="fluid-display-body text-ink/60 max-w-md md:text-right mt-0">
            A decade of digital and creative consulting, now re-engineered with AI at the core.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 h-auto lg:h-[480px]">
          {/* Left List */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="w-full lg:w-5/12 flex flex-col gap-2 min-w-0"
          >
            {platforms.map((platform, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "p-4 sm:p-5 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 border",
                  activeIndex === i
                    ? "bg-surface border-line shadow-sm"
                    : "bg-transparent border-transparent hover:bg-surface/50 active:bg-surface/50"
                )}
              >
                <h3 className={cn(
                  "fluid-display-card font-display font-medium transition-colors",
                  activeIndex === i ? "text-blue-600 mb-2 md:mb-3" : "text-ink"
                )}>
                  {platform.title}
                </h3>
                <AnimatePresence>
                  {activeIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-ink/60 text-sm leading-relaxed">
                        {platform.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            
          </motion.div>

          {/* Right Image Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-7/12 relative rounded-3xl overflow-hidden border border-line bg-surface h-[300px] sm:h-[400px] lg:h-full min-w-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent z-10" />
                <img
                  src={platforms[activeIndex].image}
                  alt={platforms[activeIndex].title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-12 z-20 w-full">
                  <h3 className="fluid-display-title font-display font-medium text-white mb-4 md:mb-6 leading-tight">
                    {platforms[activeIndex].title}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
