import { motion } from "motion/react";
import whatThisIsVideo from "../../video/WhatThisIs.mp4";
import SEO from '@/lib/seo';
import { 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Workflow, 
  Network, 
  Link, 
  ShieldCheck, 
  Layers, 
  Database, 
  Globe, 
  Zap 
} from "lucide-react";

export default function AICapabilityCentre() {
  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-blue-500/30">
      <SEO
        title="AI Capability Centre"
        description="Nextdot AI Capability Centre: engineering, deploying, and running enterprise AI systems in production at scale."
        path="/ai-capability-centre"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "AI Capability Centre", url: "/ai-capability-centre" }]}
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
            AI Capability Center
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-xl md:text-2xl text-ink/60 max-w-3xl leading-relaxed"
          >
            Nextdot operates an AI Capability Center, bringing together forward-deployed engineers, AI system architects, and agentic specialists to design, deploy, and run AI systems in production.
          </motion.p>
        </div>
      </section>

      {/* 2. WHAT THIS IS */}
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
              <h2 className="text-4xl md:text-5xl font-display text-ink">
                What This Is
              </h2>
              <div className="space-y-6 text-lg text-ink/70 leading-relaxed">
                <p className="text-2xl text-ink font-display leading-snug">
                  The Capability Center is where AI moves from concept to working system.
                </p>
                <p>
                  Every system we build, agentic workflows, automation layers, and domain-trained models, is designed, tested, and deployed from here.
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
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              >
                <source src={whatThisIsVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. THE PEOPLE */}
      <section className="py-24 bg-paper border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-16 max-w-3xl"
          >
            <span className="text-accent text-xs font-mono tracking-widest uppercase mb-4 block">
              // The Team
            </span>
            <h2 className="text-4xl md:text-5xl font-display text-ink mb-6">
              Built by engineers who work on systems
            </h2>
            <p className="text-xl text-ink/70 leading-relaxed">
              The Capability Center brings together a cross-functional team focused on one thing: building AI systems that work in real environments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "AI Systems Engineers",
                desc: "Design and build multi-agent systems, orchestration layers, and decision frameworks.",
                icon: <Cpu className="text-accent" size={24} />
              },
              {
                title: "Workflow & Product Architects",
                desc: "Map business processes into structured, automatable systems.",
                icon: <Workflow className="text-accent" size={24} />
              },
              {
                title: "Agentic Specialists",
                desc: "Design how agents interact, collaborate, and execute multi-step workflows.",
                icon: <Network className="text-accent" size={24} />
              },
              {
                title: "Integration Engineers",
                desc: "Connect AI systems to CRMs, ERPs, APIs, and internal platforms.",
                icon: <Link className="text-accent" size={24} />
              },
              {
                title: "QA & Deployment Leads",
                desc: "Ensure systems are stable, reliable, and production-ready.",
                icon: <ShieldCheck className="text-accent" size={24} />
              }
            ].map((role, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
                className="bg-surface border border-line p-8 rounded-2xl hover:border-accent/30 hover:shadow-sm transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-paper border border-line flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {role.icon}
                </div>
                <h3 className="text-xl font-display font-medium text-ink mb-3">{role.title}</h3>
                <p className="text-ink/70 leading-relaxed">{role.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT GETS BUILT HERE */}
      <section className="py-24 bg-surface border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-16"
          >
            <span className="text-accent text-xs font-mono tracking-widest uppercase mb-4 block">
              // Systems
            </span>
            <h2 className="text-4xl md:text-5xl font-display text-ink">
              From architecture to deployment.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Multi-Agent Systems",
                desc: "Autonomous and semi-autonomous agents working across workflows - from document intelligence to decision automation.",
                icon: <Network className="text-accent" size={28} />
              },
              {
                title: "Workflow Automation Layers",
                desc: "AI embedded into operational systems - connecting tools, data, and processes.",
                icon: <Layers className="text-accent" size={28} />
              },
              {
                title: "Domain-Specific AI Models",
                desc: "Purpose-trained models for specific industries - especially regulated environments like healthcare.",
                icon: <Database className="text-accent" size={28} />
              },
              {
                title: "Compliance Systems",
                desc: "AI systems designed to operate within regulatory frameworks, including real-time validation and audit trails.",
                icon: <ShieldCheck className="text-accent" size={28} />
              }
            ].map((system, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
                className="bg-paper border border-line p-8 md:p-10 rounded-2xl flex flex-col h-full hover:border-accent/30 hover:shadow-sm transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-surface border border-line flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {system.icon}
                </div>
                <h3 className="text-2xl font-display font-medium text-ink mb-4">{system.title}</h3>
                <p className="text-ink/70 leading-relaxed">{system.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT OPERATES */}
      <section className="py-24 bg-paper border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-5"
            >
              <span className="text-accent text-xs font-mono tracking-widest uppercase mb-4 block">
                // Operating Model
              </span>
              <h2 className="text-4xl md:text-5xl font-display text-ink mb-6 leading-tight">
                Continuous build. Continuous deployment.
              </h2>
              <p className="text-lg text-ink/70 leading-relaxed mb-8">
                The Capability Center runs on active engineering tracks, parallel streams of system design, build, and optimisation.
              </p>
              <div className="p-6 bg-surface border border-line rounded-xl">
                <p className="text-ink font-medium">
                  This allows us to move quickly from identifying a problem to deploying a working system, without breaking continuity.
                </p>
              </div>
            </motion.div>
            
            <div className="lg:col-span-7">
              <p className="text-ink font-medium mb-6 text-lg">Each track focuses on a specific class of problems:</p>
              <div className="space-y-4">
                {[
                  "Agentic systems",
                  "Workflow automation",
                  "Domain AI products"
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
                    className="flex items-center gap-4 p-6 bg-surface border border-line rounded-2xl"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Zap className="text-accent" size={20} />
                    </div>
                    <span className="text-xl text-ink font-display font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FORWARD-DEPLOYED EXTENSION (Dark Section) */}
      <section className="py-24 bg-ink text-paper border-t border-line">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-display text-white mb-8">
              Extended into your organisation.
            </h2>
            <div className="space-y-6 text-xl text-paper/70 leading-relaxed">
              <p>
                The Capability Center does not operate in isolation.
              </p>
              <p>
                Its output is deployed through forward-deployed engineering pods, embedded into enterprise environments, working alongside internal teams.
              </p>
              <p className="text-2xl text-white font-display mt-8">
                What is built here is implemented there. <span className="text-accent">Seamlessly.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. BUILD PHILOSOPHY */}
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
                // Philosophy
              </span>
              <h2 className="text-4xl md:text-5xl font-display text-ink">
                Built from emerging India.
              </h2>
              <div className="space-y-6 text-lg text-ink/70 leading-relaxed">
                <p>
                  The next generation of AI systems will not be built only in global tech hubs.
                </p>
                <p>
                  They will be built by focused engineering teams working close to real-world problems, with the depth and discipline required for production systems.
                </p>
                <p className="text-ink font-medium text-xl pt-4 border-t border-line">
                  This is that environment.<br/>
                  <span className="text-accent">A place designed for building, not pitching.</span>
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
                src="/images/Nextdot_AU.png" 
                alt="Tech Hub Environment" 
                className="w-full h-full object-contain bg-surface grayscale opacity-80 group-hover:opacity-100 transition-all duration-700" 
                referrerPolicy="no-referrer" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. WHAT THIS ENABLES */}
      <section className="py-24 bg-paper border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-16 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-display text-ink mb-6">
              Faster path from problem to production.
            </h2>
            <p className="text-xl text-ink/70 leading-relaxed">
              Because the Capability Center brings together architecture, engineering, and deployment in one place:
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Systems move faster from idea to execution",
              "Engineering quality remains consistent",
              "Knowledge compounds across deployments",
              "Enterprises don’t have to build everything internally"
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
                className="bg-surface border border-line p-8 rounded-2xl text-center hover:border-accent/30 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-accent" size={24} />
                </div>
                <p className="text-lg text-ink font-medium leading-snug">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
