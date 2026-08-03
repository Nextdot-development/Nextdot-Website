import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./AIEcosystem.css";

import claudeLogo from "../assets/images/claude-logo.webp";
import openaiLogo from "../assets/images/openai-logo.webp";
import geminiLogo from "../assets/images/gemini-logo.webp";
import elevenlabsLogo from "../assets/images/elevenlabs-logo.webp";
import sarvamLogo from "../assets/images/sarvam-logo.svg";
import heygenLogo from "../assets/images/heygen-logo.svg";
import klingLogo from "../assets/images/kling-logo.webp";
import higgsfieldLogo from "../assets/images/higgsfield-logo.webp";
import langchainLogo from "../assets/images/langchain-logo.svg";
import vectordbLogo from "../assets/images/vectordb-logo.webp";
import mcpLogo from "../assets/images/mcp-logo.webp";

const tools = [
  { name: "Claude", category: "Reasoning", logo: claudeLogo, desc: "Advanced reasoning and agentic intelligence for complex enterprise workflows." },
  { name: "OpenAI", category: "Reasoning", logo: openaiLogo, desc: "Foundation models powering reasoning, generation, and automation at scale." },
  { name: "Gemini", category: "Reasoning", logo: geminiLogo, desc: "Multimodal intelligence from Google, built for complex reasoning tasks." },
  { name: "ElevenLabs", category: "Voice", logo: elevenlabsLogo, desc: "Lifelike voice synthesis for conversational and narrative AI experiences." },
  { name: "Sarvam", category: "Voice", logo: sarvamLogo, desc: "Multilingual voice intelligence built for Indian languages and dialects." },
  { name: "HeyGen", category: "Video", logo: heygenLogo, desc: "AI avatars and video generation engineered for enterprise scale." },
  { name: "Kling AI", category: "Video", logo: klingLogo, desc: "High-fidelity generative video for creative and brand production." },
  { name: "Higgsfield", category: "Video", logo: higgsfieldLogo, desc: "Cinematic AI video generation for premium brand storytelling." },
  { name: "LangChain", category: "Infrastructure", logo: langchainLogo, desc: "Orchestration framework powering multi-step agentic workflows." },
  { name: "Vector Databases", category: "Infrastructure", logo: vectordbLogo, desc: "High-performance retrieval infrastructure for AI memory and context." },
  { name: "MCP Ecosystem", category: "Infrastructure", logo: mcpLogo, desc: "Standardised protocol connecting AI models to real enterprise systems." },
];

const tabs = ["Reasoning", "Voice", "Video", "Infrastructure"];

const trustedStrip = [
  { name: "Claude", logo: claudeLogo },
  { name: "OpenAI", logo: openaiLogo },
  { name: "Gemini", logo: geminiLogo },
  { name: "ElevenLabs", logo: elevenlabsLogo },
  { name: "Sarvam", logo: sarvamLogo },
  { name: "LangChain", logo: langchainLogo },
  { name: "MCP", logo: mcpLogo },
];
const trustedRow = [...trustedStrip, ...trustedStrip];

const renderTrustedRow = (keyPrefix: string) => (
  <div className="ai-marquee-content" aria-hidden={keyPrefix !== "a"}>
    {trustedRow.map((item, idx) => (
      <div key={`${keyPrefix}-${item.name}-${idx}`} className="ai-marquee-chip">
        <img src={item.logo} alt={keyPrefix === "a" ? item.name : ""} className="ai-marquee-logo" loading="lazy" decoding="async" />
      </div>
    ))}
  </div>
);

export const AIEcosystem = () => {
  const [activeTab, setActiveTab] = useState("Reasoning");
  const filtered = tools.filter((t) => t.category === activeTab);

  return (
    <section className="py-20 sm:py-24 bg-paper relative border-t border-line overflow-hidden">
      {/* Ambient glow background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-[10%] -right-[10%] w-[45%] h-[45%] rounded-full bg-blue-400/[0.06] blur-[120px]" />
        <div className="absolute bottom-[-15%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-300/[0.07] blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
        >
          <span className="text-accent text-xs font-mono tracking-widest uppercase mb-4 block">
            AI Ecosystem & Infrastructure
          </span>
          <h2 className="fluid-display-title font-display font-medium tracking-tight text-ink mb-5">
            Powered by the World's Most Advanced AI Models
          </h2>
          <p className="fluid-display-body text-ink/60">
            From reasoning and voice to video and multimodal intelligence, we build enterprise AI systems on proven global platforms.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10 sm:mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 active:scale-95 ${
                activeTab === tab
                  ? "bg-ink text-white shadow-sm"
                  : "bg-white border border-line text-ink/60 hover:border-ink/30 active:border-ink/30 hover:text-ink active:text-ink"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Showcase grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-16 sm:mb-20">
          <AnimatePresence mode="popLayout">
            {filtered.map((tool) => (
              <motion.div
                key={tool.name}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="group relative bg-white border border-line rounded-[24px] p-6 sm:p-7 flex flex-col min-h-[260px] sm:min-h-[280px] overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] active:shadow-[0_20px_50px_rgba(37,99,235,0.1)] hover:border-accent/30 active:border-accent/30 hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Ambient glow wash on hover/tap */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-transparent to-blue-500/0 group-hover:from-blue-400/[0.06] group-hover:to-blue-500/[0.03] group-active:from-blue-400/[0.06] group-active:to-blue-500/[0.03] transition-all duration-500 pointer-events-none" />

                {/* Category label */}
                <span className="relative z-10 text-[11px] font-mono uppercase tracking-widest text-ink/40 mb-6">
                  {tool.category}
                </span>

                {/* Large centered logo */}
                <div className="relative z-10 flex-1 flex items-center justify-center py-2">
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    loading="lazy"
                    decoding="async"
                    className="max-h-16 sm:max-h-[72px] max-w-[75%] w-auto h-auto object-contain group-hover:scale-110 group-active:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Description */}
                <p className="relative z-10 text-sm text-ink/55 leading-relaxed text-center mt-6 pt-5 border-t border-line/50 group-hover:text-ink/70 group-active:text-ink/70 transition-colors duration-300">
                  {tool.desc}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Trusted ecosystem marquee */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-center text-[11px] font-mono uppercase tracking-widest text-ink/40 mb-6">
            Trusted Ecosystem
          </p>
          <div className="ai-marquee-wrap rounded-2xl border border-line bg-white/60 backdrop-blur-sm py-5">
            <div className="ai-marquee-track">
              {renderTrustedRow("a")}
              {renderTrustedRow("b")}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
