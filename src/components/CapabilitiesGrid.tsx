import { motion } from "motion/react";
import { publicAsset } from "@/lib/utils";

export const CapabilitiesGrid = () => {
  const capabilities = [
    {
      title: "AI Agent & Agentic Systems",
      desc: "Multi-agent architectures designed for real workflows - from document intelligence to decision automation. Autonomous where possible, controlled where necessary.",
      img: publicAsset("images/AI_AA_System.png")
    },
    {
      title: "Enterprise Workflow Automation",
      desc: "AI embedded into your operating layer - orchestrating data, APIs, and systems across CRMs, ERPs, and internal tools.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "AI-Powered Growth Systems",
      desc: "Content, campaign, and performance systems that combine LLMs with structured business data - built for scale, not experimentation.",
      img: publicAsset("images/AI_PG_System.jpg.jpeg")
    },
    {
      title: "Enterprise AI Advisory",
      desc: "Architecture, governance, and operating models for organisations building long-term AI capability.",
      img: publicAsset("images/Enterprice_AA.jpg.jpeg")
    },
    {
      title: "LLMOps & ML Engineering",
      desc: "Model pipelines, orchestration layers, and infrastructure for enterprises moving toward domain-specific AI systems.",
      img: publicAsset("images/LLM_ML.png")
    }
  ];

  return (
    <section className="py-20 sm:py-24 bg-paper relative border-t border-line overflow-hidden" id="capabilities">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro Section */}
        <div className="flex flex-col md:flex-row gap-10 lg:gap-12 mb-14 sm:mb-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full md:w-1/2 min-w-0"
          >
            <div className="text-sm font-medium text-blue-600 mb-4 tracking-wider uppercase">// What We Build</div>
            <h2 className="fluid-display-title font-display font-medium tracking-tight text-ink mb-6">
              AI Engineering & Agentic Systems
            </h2>
            <p className="fluid-display-body text-ink/60 max-w-lg">
              Production-grade systems. Built to run inside real enterprises.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="w-full md:w-1/2 h-[240px] md:h-[300px] bg-surface rounded-3xl border border-line flex items-center justify-center relative overflow-hidden min-w-0"
          >
            <img 
              src={publicAsset("images/What_we_build2.png")} 
              alt="What we build" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Mobile / tablet stacked cards */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-6 pb-12">
        {capabilities.map((cap, i) => (
          <div key={i} className="bg-surface rounded-3xl border border-line overflow-hidden flex flex-col min-w-0">
            <div className="h-52 sm:h-64 relative overflow-hidden border-b border-line">
              <img src={cap.img} alt={cap.title} className="absolute inset-0 w-full h-full object-cover grayscale opacity-80" referrerPolicy="no-referrer" />
            </div>
            <div className="p-6 sm:p-8 flex flex-col gap-4">
              <div className="text-xs font-medium text-ink/40 uppercase tracking-widest">0{i + 1}</div>
              <h3 className="fluid-display-card font-display font-medium text-ink">{cap.title}</h3>
              <p className="text-sm sm:text-base text-ink/60 leading-relaxed">{cap.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Horizontal Scroll Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className="hidden lg:block w-full overflow-x-auto snap-x snap-mandatory pb-12 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div className="flex gap-6 px-6 md:px-12 lg:px-24 w-max min-w-full">
          {capabilities.map((cap, i) => (
            <div 
              key={i} 
              className="flex-none w-[85vw] sm:w-[600px] md:w-[800px] h-[500px] md:h-[400px] snap-center bg-surface rounded-3xl border border-line flex flex-col md:flex-row overflow-hidden group cursor-grab active:cursor-grabbing"
            >
              <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                <div className="text-xs font-medium text-ink/40 mb-4 uppercase tracking-widest">0{i + 1}</div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-ink mb-4">{cap.title}</h3>
                <p className="text-sm sm:text-base text-ink/60 leading-relaxed">
                  {cap.desc}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden order-1 md:order-2 border-b md:border-b-0 md:border-l border-line">
                <img 
                  src={cap.img} 
                  alt={cap.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-4 flex justify-end"
      >
        <div className="text-sm font-medium text-ink/40 flex items-center gap-2">
          <span>Scroll to explore</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      </motion.div>
    </section>
  );
};
