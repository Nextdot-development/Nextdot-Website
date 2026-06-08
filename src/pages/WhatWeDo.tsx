import { motion } from "motion/react";
import SEO from '@/lib/seo';
import { CheckCircle2, Layers, Workflow, BarChart3, ShieldCheck, Cpu, Network } from "lucide-react";

export default function WhatWeDo() {
  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-blue-500/30">
      <SEO
        title="What We Do"
        description="AI engineering, multi-agent systems, workflow automation, and enterprise AI solutions built for production."
        path="/what-we-do"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "What We Do", url: "/what-we-do" }]}
      />
      {/* 1. HERO */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-400/10 blur-[120px]"></div>
          <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-300/10 blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          {/* Connecting Lines */}
          <div className="absolute -top-48 left-4 md:left-6 w-px h-48 bg-gradient-to-b from-transparent to-blue-500 hidden md:block" />
          <div className="absolute top-0 left-4 md:left-6 w-2 h-2 -ml-[3px] rounded-full bg-blue-500 hidden md:block shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          <div className="absolute top-0 left-4 md:left-6 w-px h-full bg-line hidden md:block" />

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight text-ink max-w-5xl mb-8 leading-[1.1]"
          >
            AI systems built for production.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-xl md:text-2xl text-ink/60 max-w-3xl leading-relaxed"
          >
            Nextdot engineers domain-specific AI systems, agentic architectures, and workflow automation designed to run inside real enterprise environments.
          </motion.p>
        </div>
      </section>

      {/* 2. CONTEXT */}
      <section className="py-24 bg-surface border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-8"
            >
              <span className="text-accent text-xs font-mono tracking-widest uppercase block">
                CONTEXT
              </span>
              <h2 className="text-4xl md:text-5xl font-display text-ink">
                What We Build
              </h2>
              <div className="space-y-6 text-lg text-ink/70 leading-relaxed">
                <p className="text-2xl text-ink font-display leading-snug">
                  We don’t offer disconnected AI services.
                </p>
                <p>
                  We build integrated systems combining models, workflows, data, and interfaces into a single operational layer.
                </p>
                <p>
                  Each capability below represents a system we design, deploy, and optimise in production.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="rounded-2xl overflow-hidden h-[400px] md:h-[500px] border border-line relative group"
            >
              <div className="absolute inset-0 bg-accent/5 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500"></div>
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" 
                alt="Integrated Systems" 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                referrerPolicy="no-referrer" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. CORE CAPABILITIES */}
      <section className="py-24 bg-paper border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-16"
          >
            <span className="text-accent text-xs font-mono tracking-widest uppercase mb-4 block">
              CORE CAPABILITIES
            </span>
            <h2 className="text-4xl md:text-5xl font-display text-ink">
              Systems we design and deploy.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Capability 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-surface border border-line p-8 md:p-10 rounded-2xl flex flex-col h-full hover:border-accent/30 hover:shadow-sm transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-paper border border-line flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Layers className="text-accent" size={28} />
              </div>
              <h3 className="text-2xl font-display font-medium text-ink mb-4">AI Agent & Agentic Systems</h3>
              <p className="text-ink/70 leading-relaxed mb-6">
                Multi-agent systems designed to execute tasks, make decisions, and operate across workflows. From lead qualification and document intelligence to multi-step decision processes these systems combine autonomous agents with controlled logic to ensure reliability in production environments.
              </p>
              <div className="mt-auto pt-6 border-t border-line">
                <p className="text-sm font-medium text-ink mb-4 uppercase tracking-wider">What this includes:</p>
                <ul className="space-y-3">
                  {["Multi-agent architecture design", "Task orchestration across agents", "Decision-layer engineering (rules + LLMs)", "Integration with internal tools and APIs"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-ink/70 text-sm">
                      <CheckCircle2 className="text-accent mt-0.5 shrink-0" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Capability 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="bg-surface border border-line p-8 md:p-10 rounded-2xl flex flex-col h-full hover:border-accent/30 hover:shadow-sm transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-paper border border-line flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Workflow className="text-accent" size={28} />
              </div>
              <h3 className="text-2xl font-display font-medium text-ink mb-4">Enterprise Workflow Automation</h3>
              <p className="text-ink/70 leading-relaxed mb-6">
                AI embedded into how your organisation operates, not layered on top. We design systems that connect CRMs, ERPs, internal tools, and communication platforms, eliminating manual data movement and enabling real-time intelligence across workflows.
              </p>
              <div className="mt-auto pt-6 border-t border-line">
                <p className="text-sm font-medium text-ink mb-4 uppercase tracking-wider">What this includes:</p>
                <ul className="space-y-3">
                  {["API orchestration", "LLM integration into workflows", "Cross-system automation", "Knowledge retrieval systems"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-ink/70 text-sm">
                      <CheckCircle2 className="text-accent mt-0.5 shrink-0" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Capability 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="bg-surface border border-line p-8 md:p-10 rounded-2xl flex flex-col h-full hover:border-accent/30 hover:shadow-sm transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-paper border border-line flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <BarChart3 className="text-accent" size={28} />
              </div>
              <h3 className="text-2xl font-display font-medium text-ink mb-4">AI-Powered Growth Systems</h3>
              <p className="text-ink/70 leading-relaxed mb-6">
                Systems that combine AI with structured business data to drive marketing, content, and performance outcomes at scale. These are not content tools; they are operational systems for generating, optimising, and distributing outputs continuously.
              </p>
              <div className="mt-auto pt-6 border-t border-line">
                <p className="text-sm font-medium text-ink mb-4 uppercase tracking-wider">What this includes:</p>
                <ul className="space-y-3">
                  {["Content generation pipelines", "Campaign intelligence systems", "Performance optimisation loops", "Reporting and insight automation"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-ink/70 text-sm">
                      <CheckCircle2 className="text-accent mt-0.5 shrink-0" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. SPECIALISED SYSTEMS */}
      <section className="py-24 bg-ink text-paper border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="text-accent text-xs font-mono tracking-widest uppercase mb-4 block">
                SPECIALISED SYSTEMS
              </span>
              <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
                Compliance-First Healthcare AI
              </h2>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-8">
                <ShieldCheck size={16} />
                <span>Status: Flagship · SaaS</span>
              </div>

              <div className="space-y-6 text-lg text-paper/70 leading-relaxed mb-10">
                <p>
                  AI systems purpose-built for regulated healthcare communication. Designed to operate within compliance frameworks, ensuring content is reviewed, validated, and audit-ready before it reaches the market.
                </p>
                <p className="text-white font-medium">
                  Flagship Product: NextComply AI
                </p>
              </div>

              <div>
                <p className="text-white font-medium mb-4 uppercase tracking-wider text-sm">What this includes:</p>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {["Compliance validation engines", "Real-time content review", "Audit trail generation", "Configurable regulatory frameworks"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-paper/80">
                      <CheckCircle2 className="text-accent mt-1 shrink-0" size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="relative h-[400px] md:h-[600px]"
            >
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-accent/20 via-transparent to-white/10 blur-xl pointer-events-none" />
              <div className="relative h-full overflow-hidden rounded-3xl border border-white/15 bg-black shadow-[0_24px_70px_rgba(2,6,23,0.55)]">
                <iframe
                  src="https://www.youtube.com/embed/Y3Ln_EyB1EE?autoplay=1&mute=1&loop=1&playlist=Y3Ln_EyB1EE&playsinline=1&rel=0&modestbranding=1"
                  title="Compliance-First Healthcare AI"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. EXPANDING CAPABILITIES */}
      <section className="py-24 bg-surface border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-16 text-center max-w-3xl mx-auto"
          >
            <span className="text-accent text-xs font-mono tracking-widest uppercase mb-4 block">
              EXPANDING CAPABILITIES
            </span>
            <h2 className="text-4xl md:text-5xl font-display text-ink">
              Beyond the core.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-paper border border-line p-8 md:p-10 rounded-2xl hover:border-accent/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-surface border border-line flex items-center justify-center mb-6">
                <Network className="text-accent" size={24} />
              </div>
              <h3 className="text-2xl font-display font-medium text-ink mb-4">Enterprise AI Advisory</h3>
              <p className="text-ink/70 leading-relaxed">
                Strategic support for enterprises designing their AI roadmap. From architecture decisions to governance frameworks, we help organisations define how AI operates at scale.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="bg-paper border border-line p-8 md:p-10 rounded-2xl hover:border-accent/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-surface border border-line flex items-center justify-center mb-6">
                <Cpu className="text-accent" size={24} />
              </div>
              <h3 className="text-2xl font-display font-medium text-ink mb-4">LLMOps & ML Engineering</h3>
              <p className="text-ink/70 leading-relaxed">
                Infrastructure and pipelines for enterprises moving beyond off-the-shelf models. Includes model orchestration, fine-tuning workflows, and production ML systems.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. HOW THESE SYSTEMS CONNECT & 7. WHERE THIS RUNS */}
      <section className="py-24 bg-paper border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* HOW THESE SYSTEMS CONNECT */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="text-accent text-xs font-mono tracking-widest uppercase mb-4 block">
                INTEGRATION
              </span>
              <h2 className="text-3xl md:text-4xl font-display text-ink mb-6">
                Not separate capabilities. One integrated system.
              </h2>
              <div className="space-y-6 text-lg text-ink/70 leading-relaxed">
                <p>
                  In production environments, these systems don’t operate in isolation.
                </p>
                <ul className="space-y-4 border-l-2 border-accent/20 pl-6 my-8">
                  <li><strong className="text-ink font-medium">Agentic systems</strong> rely on workflow automation.</li>
                  <li><strong className="text-ink font-medium">Growth systems</strong> depend on structured data pipelines.</li>
                  <li><strong className="text-ink font-medium">Compliance systems</strong> integrate into content and communication layers.</li>
                </ul>
                <p className="text-xl text-ink font-medium">
                  We design these as interconnected systems, not standalone deployments.
                </p>
              </div>
            </motion.div>

            {/* WHERE THIS RUNS */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="bg-surface border border-line p-8 md:p-12 rounded-3xl"
            >
              <span className="text-accent text-xs font-mono tracking-widest uppercase mb-4 block">
                DEPLOYMENT
              </span>
              <h2 className="text-3xl md:text-4xl font-display text-ink mb-8">
                Designed for real enterprise environments.
              </h2>
              <p className="text-lg text-ink/70 mb-8">
                Our systems are deployed across:
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Marketing and growth operations",
                  "Compliance and regulatory workflows",
                  "Knowledge and document systems",
                  "Customer and internal communication layers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-ink/80 text-lg">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="p-6 bg-paper border border-line rounded-xl">
                <p className="text-ink font-medium text-center">
                  Integrated into your existing stack, not replacing it.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
