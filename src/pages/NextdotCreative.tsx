import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import aiCreativeVideo from "../../video/ai creative.mp4";
import SEO from '@/lib/seo';

export default function NextdotCreative() {
  const services = [
    {
      title: "Video Production & Ad Films",
      description: "Brand films, ad campaigns, corporate content, social video. Concept to delivery.",
      tags: ["Brand films", "Ad campaigns", "Corporate & product videos", "Social formats"]
    },
    {
      title: "Motion Graphics & Animation",
      description: "2D, 3D, motion design. For content that needs to move to land.",
      tags: ["2D & 3D animation", "Motion design", "Explainers", "Animated social assets"]
    },
    {
      title: "Social Media Management",
      description: "Full-cycle social strategy, content, community, and reporting. Consistent brand presence across every platform.",
      tags: ["Instagram", "LinkedIn", "Facebook", "X", "Platform content strategy"]
    },
    {
      title: "YouTube Channel Management",
      description: "Channel strategy, SEO, scripting, production, and analytics. For brands building something durable on the platform.",
      tags: ["Channel strategy", "Video SEO", "Production support", "Thumbnail & metadata", "Analytics"]
    },
    {
      title: "Influencer & Creator Marketing",
      description: "Creator ecosystems built to run not one-off activations. Identification, briefing, execution, and measurement.",
      tags: ["Creator strategy", "Campaign management", "Micro & macro networks", "Performance tracking"]
    },
    {
      title: "Performance Marketing",
      description: "Google, Meta, programmatic. Creative-led, data-governed, built around outcomes not spend management.",
      tags: ["Google & Meta Ads", "CPO / CPA campaigns", "Creative testing", "Budget optimisation"]
    },
    {
      title: "Content & Creative Production",
      description: "Copy, design, photography, asset production at volume, without the drop in quality. AI-assisted where it helps.",
      tags: ["Copywriting", "Graphic design", "Photography direction", "Multi-platform assets"]
    },
    {
      title: "Digital Growth & Strategy",
      description: "Content, paid, SEO, and conversion connected into one operating plan. Not a deck. An execution.",
      tags: ["SEO", "Funnel design", "Growth strategy", "Analytics & attribution"]
    },
    {
      title: "Fractional CTO / CPO",
      description: "Technology and product leadership for teams that need senior judgment without full-time overhead.",
      tags: ["Fractional CPO", "Tech strategy", "Product roadmap", "Team structuring"]
    }
  ];

  const processSteps = ["Understand", "Strategise", "Produce", "Optimise"];

  const audiences = [
    "D2C and consumer brands with continuous content and campaign needs",
    "Enterprise marketing teams that need external creative without losing control",
    "Growth-stage companies looking for a creative partner, not a vendor",
    "Creator-led businesses scaling beyond the founder"
  ];

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-blue-500/30">
      <SEO
        title="Nextdot Creative"
        description="Video production, motion graphics, brand films, and performance creative rebuilt as a production system."
        path="/creative"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Nextdot Creative", url: "/creative" }]}
      />
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-400/10 blur-[120px]"></div>
          <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-300/10 blur-[100px]"></div>
        </div>

        <div className="relative z-10 w-full md:flex md:gap-8 lg:gap-10 md:items-start px-6 md:pl-12 md:pr-0">
          {/* Connecting Lines */}
          <div className="absolute -top-48 left-4 md:left-6 w-px h-48 bg-gradient-to-b from-transparent to-blue-500 hidden md:block" />
          <div className="absolute top-0 left-4 md:left-6 w-2 h-2 -ml-[3px] rounded-full bg-blue-500 hidden md:block shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          <div className="absolute top-0 left-4 md:left-6 w-px h-full bg-line hidden md:block" />

          <div className="w-full md:w-[30%] md:max-w-[480px] md:shrink-0">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight text-ink mb-8 leading-[1.1]"
            >
              Creative, rebuilt as a system
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="text-xl md:text-2xl text-ink/60 leading-relaxed mb-8"
            >
              We started in creative and digital. That work just got smarter.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="text-xl md:text-2xl text-ink/60 leading-relaxed"
            >
              Same craft. A different operating model.
            </motion.p>
          </div>

          <div className="relative m-0 p-0 w-full md:flex-1 md:min-w-0 mt-8 md:mt-0 aspect-video overflow-hidden rounded-[24px] md:rounded-r-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="block m-0 p-0 w-full h-full object-cover"
            >
              <source src={aiCreativeVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Hero Context Section */}
      <section className="py-24 bg-surface border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-8 text-lg text-ink/70 leading-relaxed max-w-4xl">
            <p className="text-2xl md:text-3xl text-ink font-display leading-snug">
              Creative, content, campaigns - we've done the work at scale, long before AI became a talking point. What's changed is how it's built now: faster systems, tighter loops, better output.
            </p>
            
            <p>
              Nextdot has spent over a decade running creative and digital systems - brand communication, content pipelines, performance campaigns, and production - across industries and markets.
            </p>

            <p className="text-ink font-medium text-lg">
              We are not an agency adapting to AI. We are a company restructuring around it.
            </p>

            <div>
              <p className="text-ink font-medium mb-6 text-lg">What that means in practice:</p>
              <ul className="space-y-4">
                {[
                  "Production cycles compressed from weeks to days",
                  "Creative tested continuously, not campaign by campaign",
                  "Systems that generate, adapt, and optimise output at scale"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-ink/80">
                    <CheckCircle2 className="text-accent mt-1 shrink-0" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-line">
              <p className="text-ink font-medium text-lg">
                The foundation is the same. The way it runs is not.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="py-24 bg-paper border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display text-ink">
              What we do.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.05 }}
                className="bg-surface border border-line p-8 md:p-10 rounded-2xl flex flex-col h-full hover:border-accent/30 hover:shadow-sm transition-all group"
              >
                <h3 className="text-2xl font-display font-medium text-ink mb-4">{service.title}</h3>
                <p className="text-ink/70 leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="mt-auto pt-6 border-t border-line">
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, tagIdx) => (
                      <span 
                        key={tagIdx}
                        className="text-xs text-ink/60 font-medium px-3 py-1 bg-paper rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW WE WORK SECTION */}
      <section className="py-24 bg-surface border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-3xl"
          >
            <span className="text-accent text-xs font-mono tracking-widest uppercase mb-4 block">
              PROCESS
            </span>
            <h2 className="text-4xl md:text-5xl font-display text-ink mb-12">
              Studio thinking. Systems execution.
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="text-xl text-ink/70 leading-relaxed mb-12">
              One team across strategy, production, and delivery. No handoffs, no context lost. The same people accountable from brief to result.
            </p>

            <div className="flex flex-col md:flex-row gap-6 md:gap-4 items-start md:items-center">
              {processSteps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="px-6 py-4 bg-ink text-white rounded-full font-display font-medium text-lg whitespace-nowrap">
                    {step}
                  </div>
                  {idx < processSteps.length - 1 && (
                    <div className="md:hidden w-full h-px bg-line my-4" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. WHO THIS IS FOR SECTION */}
      <section className="py-24 bg-paper border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-16"
          >
            <span className="text-accent text-xs font-mono tracking-widest uppercase mb-4 block">
              AUDIENCES
            </span>
            <h2 className="text-4xl md:text-5xl font-display text-ink">
              Who we work with.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
            {audiences.map((audience, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
                className="bg-surface border border-line p-8 rounded-2xl hover:border-accent/30 transition-all"
              >
                <p className="text-lg text-ink/70 leading-relaxed">
                  {audience}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-24 bg-ink relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight text-white leading-[1.1] mb-6">
              Let's talk.
            </h2>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-4">
              Tell us what you are working on.
            </p>
            <a 
              href="mailto:contact@nextdot.co.in"
              className="text-xl md:text-2xl text-blue-400 font-medium hover:text-blue-300 transition-colors"
            >
              contact@nextdot.co.in
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
