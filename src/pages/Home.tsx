import { Hero } from "../components/Hero";
import { AIEcosystem } from "../components/AIEcosystem";
import { ProblemBanner } from "../components/ProblemBanner";
import { CapabilitiesGrid } from "../components/CapabilitiesGrid";
import { Platforms } from "../components/Platforms";
import { Insights } from "../components/Insights";
import { Testimonial } from "../components/Testimonial";
import { CTASection } from "../components/CTASection";
import SEO from '@/lib/seo';

export default function Home() {
  return (
    <>
      <SEO title="Domain Engineered AI Systems" description="Nextdot builds domain-engineered AI systems and enterprise-grade AI products for large enterprises." path="/" />
      <main>
      <Hero />
      <AIEcosystem />
      <ProblemBanner />
      <CapabilitiesGrid />
      <Platforms />
      <Insights />
      <Testimonial />
      <CTASection />
      </main>
    </>
  );
}
