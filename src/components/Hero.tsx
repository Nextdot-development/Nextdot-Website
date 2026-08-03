import { motion } from "motion/react";
import { Link } from "react-router-dom";

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="pt-28 sm:pt-32 md:pt-40 pb-28 sm:pb-32 md:pb-40 relative overflow-hidden bg-paper">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          <h1 className="fluid-display-hero font-display font-medium tracking-tight text-ink mb-6 md:mb-8 flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-2">
            {["Domain", "Engineered", "AI", "Products", "&", "Agents", "For", "Enterprise"].map((word, i) => (
              <motion.span key={i} variants={itemVariants} className="inline-block">
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p variants={itemVariants} className="fluid-display-body text-ink/60 max-w-3xl mb-8 md:mb-12">
            Real transformation needs an architected agentic ecosystem - not isolated use cases. Nextdot builds AI operating systems for enterprises that are no longer experimenting.
          </motion.p>
          {(() => {
            return (
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="bg-surface border border-line text-ink px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-paper active:bg-paper active:scale-95 transition-all text-sm sm:text-base inline-flex items-center justify-center">
                  Talk To Us
                </Link>
              </motion.div>
            );
          })()}
        </motion.div>
      </div>
    </section>
  );
};
