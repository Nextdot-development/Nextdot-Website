import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn, publicAsset } from "@/lib/utils";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const homeHref = "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const navLinks = [
    { name: "About Us", href: "/about" },
    { name: "What We Do", href: "/what-we-do" },
    { name: "Nextdot Creative", href: "/creative" },
    { name: "AI Capability Centre", href: "/ai-capability-centre" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          scrolled ? "py-4 bg-white/80 backdrop-blur-xl border-line shadow-sm" : "py-6 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <Link to={homeHref} onClick={handleLogoClick} className="flex items-center group cursor-pointer shrink-0">
            <img src={publicAsset("images/logo.png")} alt="Nextdot Logo" className="h-9 sm:h-10 lg:h-11 w-auto max-w-[160px] object-contain transition-transform duration-300 group-hover:scale-105" />
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className={cn(
                  "text-sm font-medium transition-colors",
                  location.pathname === link.href ? "text-ink" : "text-ink/70 hover:text-ink"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button aria-label="Open menu" title="Open menu" className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/70 text-ink" onClick={() => setIsOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-[60] p-4 sm:p-6 flex flex-col overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10 sm:mb-12">
              <Link to={homeHref} onClick={handleLogoClick} className="flex items-center gap-3">
                <img src={publicAsset("images/logo.png")} alt="Nextdot Logo" className="h-9 sm:h-10 w-auto object-contain" />
              </Link>
              <button aria-label="Close menu" title="Close menu" onClick={() => setIsOpen(false)} className="inline-flex h-11 w-11 items-center justify-center bg-surface rounded-full border border-line">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-4 sm:gap-6 pb-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-2xl sm:text-3xl font-display font-medium tracking-tight border-b border-line pb-4",
                    location.pathname === link.href ? "text-ink" : "text-ink/70"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
