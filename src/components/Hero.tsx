import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { publicAsset } from "@/lib/utils";

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
    <section className="pt-28 sm:pt-32 md:pt-40 pb-20 md:pb-32 relative overflow-hidden bg-paper">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mb-16 md:mb-24"
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
                <Link to="/contact" className="bg-surface border border-line text-ink px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-paper transition-colors text-sm sm:text-base inline-flex items-center justify-center">
                  Talk To Us
                </Link>
              </motion.div>
            );
          })()}
        </motion.div>

        {/* Premium Problem Section */}
        <div className="relative mt-24 sm:mt-32 md:mt-48 -mx-4 sm:-mx-6 px-4 sm:px-6 py-16 sm:py-20 md:py-32 bg-white overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div
              className="hidden md:block absolute inset-0 favicon-wave-stage"
            >
              <img
                src={publicAsset("images/Fav_icon.png")}
                alt=""
                className="absolute left-1/2 top-1/2 w-[min(88vw,1120px)] max-w-none opacity-10 select-none favicon-wave-image"
              />
            </div>
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              {/* Left Side: Heading & Description */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-block"
                >
                  <div className="text-xs sm:text-sm font-medium text-blue-600 mb-4 tracking-widest uppercase">
                    The Problem
                  </div>
                </motion.div>

                <h2 className="fluid-display-title font-display font-medium text-ink mb-6 leading-tight">
                  Most enterprises are stuck at the pilot.
                </h2>

                <p className="fluid-display-body text-ink/60">
                  Moving AI into production is not a model problem-it's a systems problem. It requires domain context, workflow integration, and engineering accountability.
                </p>

                {/* Subtle decorative line */}
                <div className="mt-10 pt-10 border-t border-line/30">
                  <p className="text-sm text-ink/50 italic">
                    Real transformation needs an architected agentic ecosystem, not scattered pilots.
                  </p>
                </div>
              </motion.div>

              {/* Right Side: Three Floating Cards */}
              <div className="space-y-5">
                {[
                  {
                    num: "01",
                    title: "The Integration Gap",
                    desc: "Multiple tools. Disconnected workflows. What looks like AI adoption is actually fragmentation."
                  },
                  {
                    num: "02",
                    title: "The Accountability Gap",
                    desc: "Vendors deliver decks. Your internal team inherits complexity without clarity."
                  },
                  {
                    num: "03",
                    title: "The Architecture Gap",
                    desc: "Pilots don't scale. Real transformation needs an AI operating system-not scattered experiments."
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="group relative"
                  >
                    {/* Light glass card */}
                    <div className="relative p-5 sm:p-6 rounded-2xl border border-line/50 bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:border-blue-200/60 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-blue-500/5 overflow-hidden">
                      {/* Subtle gradient border on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/0 via-transparent to-blue-500/0 group-hover:from-blue-400/10 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none" />

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Number with animation */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                          className="fluid-display-title font-display font-medium text-blue-600 mb-3 group-hover:text-blue-700 transition-all duration-300"
                        >
                          {item.num}
                        </motion.div>

                        {/* Title */}
                        <h3 className="fluid-display-card font-medium text-ink mb-2 group-hover:text-blue-600 transition-colors duration-300">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-ink/60 leading-relaxed group-hover:text-ink/70 transition-colors duration-300">
                          {item.desc}
                        </p>
                      </div>

                      {/* Floating animation container */}
                      <motion.div
                        animate={{
                          y: [0, -3, 0]
                        }}
                        transition={{
                          duration: 4 + i * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-400/3 blur-3xl pointer-events-none"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
