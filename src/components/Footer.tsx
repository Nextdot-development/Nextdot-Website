import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { publicAsset } from "@/lib/utils";

export const Footer = () => {
  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "What We Do", href: "/what-we-do" },
    { label: "AI Capabilities Center", href: "/ai-capability-centre" },
    { label: "Nextdot Creative", href: "/creative" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ];

  return (
    <footer className="bg-white pt-16 md:pt-20 pb-8 md:pb-10 border-t border-line">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 mb-14 md:mb-16">
          
          <div className="sm:col-span-2 lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <img src={publicAsset("images/logo.png")} alt="Nextdot Logo" loading="lazy" decoding="async" className="h-8 w-auto object-contain" />
            </div>
            <p className="text-ink/60 text-sm leading-relaxed max-w-sm mb-7">
              Domain engineered AI products and agentic ecosystems for enterprise transformation. Built for security, scale, and impact.
            </p>

            <div className="flex flex-col gap-3 mb-7">
              <a
                href="https://wa.me/917289820993"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="inline-flex items-center gap-3 text-sm text-ink/60 hover:text-ink active:text-ink transition-colors group w-fit"
              >
                <span className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink/40 group-hover:text-accent group-active:text-accent group-hover:border-accent/30 group-active:border-accent/30 transition-colors shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9 10a.5.5 0 1 0 1 0V9a.5.5 0 0 0-1 0Z"/><path d="M14 10a.5.5 0 1 0 1 0V9a.5.5 0 0 0-1 0Z"/><path d="M9.5 13.5c.5 1 1.5 1.5 2.5 1.5s2-.5 2.5-1.5"/></svg>
                </span>
                +91 72898 20993
              </a>
              <a
                href="mailto:contact@nextdot.co.in"
                aria-label="Email Nextdot"
                className="inline-flex items-center gap-3 text-sm text-ink/60 hover:text-ink active:text-ink transition-colors group w-fit"
              >
                <span className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink/40 group-hover:text-accent group-active:text-accent group-hover:border-accent/30 group-active:border-accent/30 transition-colors shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </span>
                contact@nextdot.co.in
              </a>
            </div>

            <div className="flex gap-4">
              <a href="https://www.instagram.com/nextdot_in/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink/40 hover:text-ink active:text-ink hover:border-ink/20 active:border-ink/20 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/nextdot-in/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink/40 hover:text-ink active:text-ink hover:border-ink/20 active:border-ink/20 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold text-ink mb-4 md:mb-5">Platform</h4>
            <ul className="space-y-3 md:space-y-4 text-sm text-ink/60">
              <li>
                <a href="https://nextcomplyai.com/" target="_blank" rel="noopener noreferrer" className="hover:text-accent active:text-accent transition-colors">
                  NextComply AI
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold text-ink mb-4 md:mb-5">Company</h4>
            <ul className="space-y-3 md:space-y-4 text-sm text-ink/60">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-accent active:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-semibold text-ink mb-4 md:mb-5">Legal</h4>
            <ul className="space-y-3 md:space-y-4 text-sm text-ink/60">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-accent active:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-line flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ink/40">
          <p>© {new Date().getFullYear()} Nextdot Digital Solutions Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-4 md:gap-6">
            <span></span>
            <span></span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
