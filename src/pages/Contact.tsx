import { motion } from "motion/react";
import SEO from '@/lib/seo';
import { WorldMap } from "@/components/WorldMap";
import { MapPin, Building2, ArrowRight, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-blue-500/30">
      <SEO
        title="Contact"
        description="Contact Nextdot for enterprise AI systems, creative production, and digital solutions. Offices in Gurgaon, Mumbai, and Jamshedpur."
        path="/contact"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }]}
      />

      {/* 1. HERO */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-400/10 blur-[120px]"></div>
          <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-300/10 blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
          {/* Connecting Lines */}
          <div className="absolute -top-48 left-4 md:left-6 w-px h-48 bg-gradient-to-b from-transparent to-blue-500 hidden md:block" />
          <div className="absolute top-0 left-4 md:left-6 w-2 h-2 -ml-[3px] rounded-full bg-blue-500 hidden md:block shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          <div className="absolute top-0 left-4 md:left-6 w-px h-full bg-line hidden md:block" />

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight text-ink max-w-4xl mx-auto mb-8 leading-[1.1]"
          >
            Start the conversation.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-xl md:text-2xl text-ink/60 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            If you're exploring how AI can move from pilot to production inside your organisation, we should talk.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <a
              href="mailto:contact@nextdot.co.in"
              className="inline-flex items-center gap-3 px-8 py-4 bg-ink text-paper rounded-full hover:bg-ink/90 transition-all font-medium text-lg group"
            >
              <Mail size={20} className="text-paper/70 group-hover:text-paper transition-colors" />
              Email Us
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. OFFICE LOCATIONS */}
      <section className="py-24 bg-surface border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-16 text-center"
          >
            <span className="text-accent text-xs font-mono tracking-widest uppercase mb-4 block">
              // Offices
            </span>
            <h2 className="text-4xl md:text-5xl font-display text-ink">
              Where we operate from.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                city: "Gurgaon",
                type: "Corporate Office",
                address: "DLF Cyber City, Phase 2, Gurugram, Haryana 122002, India",
              },
              {
                city: "Mumbai",
                type: "Regional Office",
                address: "Rcity Offices, Ghatkopar, Mumbai, Maharashtra 400086, India",
              },
              {
                city: "Jamshedpur",
                type: "AI Capability Center",
                address: "Bistupur, Jamshedpur, Jharkhand 831001, India",
              }
            ].map((office, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
                className="bg-paper border border-line p-8 md:p-10 rounded-2xl hover:border-accent/30 hover:shadow-sm transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Building2 size={120} className="text-ink" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-surface border border-line flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <MapPin className="text-accent" size={24} />
                  </div>
                  <h3 className="text-2xl font-display font-medium text-ink mb-2">{office.city}</h3>
                  <p className="text-accent text-sm font-mono tracking-wide mb-6">{office.type}</p>
                  <p className="text-ink/70 leading-relaxed">{office.address}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MAP */}
      <section className="py-24 bg-paper border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <WorldMap />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
