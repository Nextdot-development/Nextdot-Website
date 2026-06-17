import { motion } from "motion/react";
import { publicAsset } from "@/lib/utils";

const partners = [
  { name: "Anthropic", tag: "Foundation Model Partner", logo: publicAsset("images/anthropic-ai-logo.png") },
  { name: "Claude", tag: "AI Reasoning Engine", logo: publicAsset("images/claude_logo.jpg") },
  { name: "ElevenLabs", tag: "Voice AI Infrastructure", logo: publicAsset("images/elevenlabs-logo-black.png") },
];

export const PartnersShowcase = () => {
  return (
    <section className="py-16 sm:py-20 bg-paper relative border-t border-line overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[200px] rounded-full bg-blue-400/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="text-accent text-xs font-mono tracking-widest uppercase mb-3 block">
            // Trusted Infrastructure
          </span>
          <h2 className="fluid-display-title font-display font-medium tracking-tight text-ink">
            Proudly Partnered With Industry-Leading AI
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto">
          {partners.map((partner, idx) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.08 }}
              className="group relative rounded-3xl border border-line bg-white/40 backdrop-blur-md p-7 sm:p-8 flex flex-col items-center text-center gap-4 shadow-[0_8px_30px_rgba(2,6,23,0.04)] hover:border-blue-400/40 hover:bg-white/70 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(37,99,235,0.12)] transition-all duration-400"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 via-transparent to-blue-500/0 group-hover:from-blue-500/[0.06] group-hover:to-transparent transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 w-full h-16 sm:h-20 rounded-2xl bg-white border border-line/60 flex items-center justify-center p-3 group-hover:scale-105 group-hover:border-blue-400/40 group-hover:shadow-[0_8px_20px_rgba(37,99,235,0.1)] transition-all duration-300">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="relative z-10">
                <div className="fluid-display-card font-display font-medium text-ink mb-1.5">
                  {partner.name}
                </div>
                <div className="text-xs text-ink/50 font-mono tracking-wide uppercase">
                  {partner.tag}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
