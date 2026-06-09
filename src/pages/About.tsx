import { motion } from "motion/react";
import { CheckCircle2, ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import nextdotVideo from "../../video/nextdot.mp4";
import { publicAsset } from "@/lib/utils";
import SEO from '@/lib/seo';

export default function About() {
  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-blue-500/30">
      <SEO
        title="About Us"
        description="About Nextdot - we build domain-engineered AI systems, agentic architectures, and workflow automation for enterprises."
        path="/about"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "About Us", url: "/about" }]}
      />
      {/* 1. HERO */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-400/10 blur-[120px]"></div>
          <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-300/10 blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12">
          {/* Connecting Lines */}
          <div className="absolute -top-48 left-4 md:left-6 w-px h-48 bg-gradient-to-b from-transparent to-blue-500 hidden md:block" />
          <div className="absolute top-0 left-4 md:left-6 w-2 h-2 -ml-[3px] rounded-full bg-blue-500 hidden md:block shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          <div className="absolute top-0 left-4 md:left-6 w-px h-full bg-line hidden md:block" />

              <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
               className="fluid-display-hero font-display font-medium tracking-tight text-ink max-w-5xl mb-8"
          >
            We build AI systems that run inside enterprises.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="fluid-display-body text-ink/60 max-w-3xl mb-12"
          >
            We are engineering domain-specific AI systems, agentic architectures, and workflow automation for organisations moving from experimentation to production.
          </motion.p>
          {(() => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                <Link to="/contact" className="min-h-11 px-8 py-4 bg-transparent border border-accent text-accent rounded-full hover:bg-accent hover:text-white transition-all flex items-center gap-3 text-sm font-medium tracking-wide uppercase inline-flex">
                  Contact Us <ArrowRight size={18} />
                </Link>
              </motion.div>
            );
          })()}
        </div>
      </section>
      {/* 2. WHO WE ARE (Overview) */}
      <section className="py-24 bg-paper border-t border-line">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-16"
          >
            <span className="text-accent text-xs font-mono tracking-widest uppercase mb-4 block">
              OVERVIEW
            </span>
               <h2 className="fluid-display-title font-display text-ink">
              // About Nextdot
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 xl:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full"
            >
                 <div className="overflow-hidden rounded-[28px] border border-line bg-surface shadow-[0_20px_60px_rgba(15,23,42,0.08)] h-[320px] sm:h-[420px] md:h-[620px]">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster={publicAsset("images/office1.png")}
                    className="w-full h-full object-cover"
                  >
                    <source src={nextdotVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="space-y-7 text-ink/70 text-lg leading-relaxed"
            >
                 <p className="fluid-display-title text-ink font-display leading-snug">
                Nextdot operates at the intersection of AI engineering, systems thinking, and real-world business operations.
              </p>
              <p>
                We work with enterprises where AI is no longer a question of if, but how to make it work at scale.
              </p>
              <p>
                Our focus is not on isolated use cases or proofs of concept. We design and deploy AI systems that integrate into existing workflows, operate within real constraints, and deliver measurable outcomes.
              </p>
              
              <div>
                <p className="text-ink font-medium mb-4">This includes:</p>
                <ul className="space-y-4">
                  {[
                    "Multi-agent systems",
                    "Workflow and knowledge automation",
                    "Domain-trained AI models",
                    "Compliance-first AI for regulated industries"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-ink/80">
                      <CheckCircle2 className="text-accent mt-1 shrink-0" size={20} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-line">
                <p className="text-ink font-medium text-xl">
                  Everything we build is designed for production environments - not experimentation.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. WHAT MAKES NEXTDOT DIFFERENT (Metrics/Values style) */}
      <section className="py-24 bg-surface border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-4"
            >
              <span className="text-accent text-xs font-mono tracking-widest uppercase mb-4 block">
                METRICS & VALUES
              </span>
              <h2 className="fluid-display-title font-display text-ink leading-tight">
                What Defines Us
              </h2>
            </motion.div>
            
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
              {[
                {
                  num: "01",
                  title: "Built for Production",
                  desc: "Every system we design is deployed into real environments, integrated, tested, and continuously optimised."
                },
                {
                  num: "02",
                  title: "Forward-Deployed Engineering Pods",
                  desc: "We embed dedicated teams into enterprise problems, owning architecture, build, and performance end-to-end."
                },
                {
                  num: "03",
                  title: "Domain-Led AI Engineering",
                  desc: "We don’t apply generic AI. We build systems shaped by the realities of your industry, especially in high-stakes, regulated environments."
                },
                {
                  num: "04",
                  title: "Systems, Not Services",
                  desc: "We don’t operate like a traditional agency or consulting firm. Our output is a working system, not a report, not a recommendation."
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
                  className="bg-paper border border-line p-7 sm:p-8 md:p-10 rounded-2xl hover:border-accent/30 hover:bg-surface hover:shadow-sm transition-all duration-300 group"
                >
                  <div className="text-5xl font-display text-accent/80 mb-6 group-hover:text-accent transition-colors">
                    {item.num}
                  </div>
                     <h3 className="fluid-display-card font-display font-medium text-ink mb-4">{item.title}</h3>
                  <p className="text-ink/70 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT THE TEAM (Founder's Message style) */}
      <section className="py-24 bg-paper border-t border-line">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-12"
          >
            <h2 className="fluid-display-title font-display text-ink">
              Team
            </h2>
          </motion.div>

             <div className="grid gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full border border-line rounded-3xl p-7 sm:p-8 md:p-16 bg-surface relative overflow-hidden"
            >
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
              <div className="md:col-span-4 lg:col-span-3">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-line bg-paper">
                  <img 
                    src={publicAsset("images/Founder.png")} 
                    alt="Ayush Prashar" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-500 ease-out" 
                  />
                </div>
              </div>
              
              <div className="md:col-span-8 lg:col-span-9 relative">
                <Quote className="absolute -top-8 -left-8 md:-top-12 md:-left-12 text-accent/10 w-24 h-24 md:w-32 md:h-32 rotate-180" />
                
                <div className="relative z-10 space-y-6 fluid-display-body text-ink/80 font-display">
                  <p>
                    "Nextdot is led by Ayush Prashar, a builder who has spent the last decade working at the intersection of marketing, content, and technology.
                  </p>
                  <p>
                    His experience spans end-to-end strategy and execution across brand communication, marketing transformation, and technology-enabled content operations. This includes designing and running systems that don’t just define strategy, but operationalise it at scale.
                  </p>
                  <p className="text-ink font-medium">
                    That foundation shapes how Nextdot approaches AI."
                  </p>
                  
                  <div className="pt-8 mt-8 border-t border-line flex items-center justify-between">
                    <div>
                      <h4 className="text-ink font-medium text-xl">Ayush Prashar</h4>
                      <p className="text-accent text-sm tracking-wide uppercase mt-1">Founder & Lead Builder</p>
                    </div>
                    <Quote className="text-accent w-12 h-12 md:w-16 md:h-16 opacity-20" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          </div>
        </div>
      </section>

      {/* 6. OUR EVOLUTION (Approach style) */}
      <section className="py-24 bg-surface border-t border-line">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-16"
          >
            <span className="text-accent text-xs font-mono tracking-widest uppercase mb-4 block">
              APPROACH
            </span>
            <h2 className="fluid-display-title font-display text-ink">
              Our Evolution
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-8 text-ink/70 text-lg leading-relaxed"
            >
              <p>
                <strong className="text-ink">Nextdot is rooted in a decade of digital and creative consulting.</strong>
              </p>
              <p>
                That experience shaped our understanding of how enterprises operate across marketing, content, compliance, and growth.
              </p>
              <p>
                Today, that foundation has evolved into AI engineering.
              </p>
              <div className="p-6 border-l-2 border-accent bg-accent/5 mt-8">
                <p className="text-ink font-medium text-xl">
                  The same enterprise relationships.<br/>
                  <span className="text-accent">A fundamentally different capability.</span>
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="rounded-2xl overflow-hidden h-[280px] sm:h-[340px] md:h-[400px] border border-line relative group"
            >
              <div className="absolute inset-0 bg-accent/5 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500"></div>
              <img 
                src={publicAsset("images/Our_Evalution.png")} 
                alt="Our Evolution" 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
