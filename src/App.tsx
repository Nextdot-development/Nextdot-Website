import { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import { Cursor } from "./components/Cursor";

// Home loads eagerly since it's the most common landing page.
// Every other route is code-split so visitors only download the JS for
// the page they actually visit, instead of the whole site upfront.
import Home from "./pages/Home";
const About = lazy(() => import("./pages/About"));
const WhatWeDo = lazy(() => import("./pages/WhatWeDo"));
const NextdotCreative = lazy(() => import("./pages/NextdotCreative"));
const AICapabilityCentre = lazy(() => import("./pages/AICapabilityCentre"));
const Blogs = lazy(() => import("./pages/Blogs").then((m) => ({ default: m.default })));
const BlogPostDetail = lazy(() => import("./pages/Blogs").then((m) => ({ default: m.BlogPostDetail })));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
// The admin panel is a separate, code-split app with its own chrome-free layout.
// Public visitors never download it.
const AdminApp = lazy(() => import("./pages/admin/AdminApp"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  // The admin panel runs as its own app: no public chrome, no Lenis smooth
  // scroll, no preloader. Everything else is the public site, unchanged.
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Simulate loading time for the preloader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => {
      lenis.destroy();
      clearTimeout(timer);
    };
  }, [isAdmin]);

  // Admin panel: its own self-contained app, no public chrome.
  if (isAdmin) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-paper" />}>
        <AdminApp />
      </Suspense>
    );
  }

  return (
    <>
      <ScrollToTop />
      <div className="relative min-h-screen bg-paper text-ink selection:bg-blue-500/30 selection:text-ink">
        <Cursor />
        <ScrollProgress />
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 z-[100] bg-ink flex items-center justify-center overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-white text-3xl md:text-5xl font-display tracking-[0.2em] uppercase"
              >
                Nextdot
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="noise-overlay" />
        <Navbar />

        <Suspense fallback={<div className="min-h-screen bg-paper" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="/creative" element={<NextdotCreative />} />
            <Route path="/ai-capability-centre" element={<AICapabilityCentre />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogPostDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            {/* Legacy URL redirects (also handled server-side in .htaccess) */}
            <Route path="/about-us" element={<Navigate to="/about" replace />} />
            <Route path="/services" element={<Navigate to="/terms-of-service" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </>
  );
}
