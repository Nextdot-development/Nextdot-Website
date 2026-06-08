import SEO from '@/lib/seo';
import { LegalPageShell } from '@/components/LegalPageShell';

export default function TermsOfService() {
  return (
    <LegalPageShell
      title="Terms of Service"
      effectiveDate="1st January 2026"
      description="These terms govern access to and use of the website, services, communications, deliverables, and digital platforms operated by Nextdot Digital Solutions Pvt. Ltd."
      sections={[
        { id: 'company-overview', label: '1. Company Overview' },
        { id: 'eligibility', label: '2. Eligibility' },
        { id: 'scope-of-services', label: '3. Scope of Services' },
        { id: 'intellectual-property', label: '4. Intellectual Property' },
        { id: 'acceptable-use', label: '5. Acceptable Use' },
        { id: 'commercial-terms', label: '6. Commercial Terms' },
        { id: 'third-party-platforms', label: '7. Third-Party Platforms' },
        { id: 'confidentiality', label: '8. Confidentiality' },
        { id: 'limitation-of-liability', label: '9. Limitation of Liability' },
        { id: 'indemnification', label: '10. Indemnification' },
        { id: 'governing-law', label: '11. Governing Law' },
        { id: 'contact-information', label: '12. Contact Information' },
      ]}
    >
      <SEO title="Terms of Service - Nextdot" description="Terms of Service for Nextdot Digital Solutions Pvt. Ltd." path="/terms-of-service" />
      <h3 id="company-overview">1. Company Overview</h3>
      <p>
        Nextdot Digital Solutions Pvt. Ltd. is engaged in software solutions, creative solutions, branding,
        digital marketing, content production, campaign management, AI-powered solutions, advertising,
        and related strategic services across India.
      </p>

      <h3 id="eligibility">2. Eligibility</h3>
      <p>
        Users accessing the website or availing services must have the legal authority to enter into binding
        agreements under applicable laws.
      </p>

      <h3 id="scope-of-services">3. Scope of Services</h3>
      <p>
        All commercial engagements are governed through proposals, quotations, agreements, statements of
        work, invoices, or written approvals shared between the Company and its clients. The Company reserves
        the right to modify, suspend, refuse, or discontinue any service without prior notice.
      </p>

      <h3 id="intellectual-property">4. Intellectual Property</h3>
      <p>
        All content, visual assets, software frameworks, creative concepts, branding elements, campaign
        strategies, documentation, graphics, videos, source files, website elements, and proprietary
        materials created by Nextdot remain the intellectual property of the Company unless otherwise
        agreed in writing. Client-provided trademarks, logos, content, and materials remain the property of
        their respective owners.
      </p>

      <h3 id="acceptable-use">5. Acceptable Use</h3>
      <p>Users shall not:</p>
      <ul>
        <li>Use the website or services for unlawful purposes;</li>
        <li>Attempt unauthorized access to systems or networks;</li>
        <li>Interfere with website security or operations;</li>
        <li>Upload malicious software or harmful code;</li>
        <li>Copy, distribute, or misuse proprietary content.</li>
      </ul>

      <h3 id="commercial-terms">6. Commercial Terms</h3>
      <p>
        Payment schedules, retainers, timelines, revisions, and project deliverables shall be governed
        through separate commercial agreements. Unless otherwise stated: payments made are non-refundable;
        delayed payments may result in suspension of services; deliverable ownership transfers only after
        full payment clearance.
      </p>

      <h3 id="third-party-platforms">7. Third-Party Platforms</h3>
      <p>
        The Company may work with third-party platforms including advertising platforms, hosting
        providers, communication tools, or software services. Nextdot shall not be liable for platform
        outages, policy or algorithm changes, third-party account suspensions, or service interruptions
        caused externally.
      </p>

      <h3 id="confidentiality">8. Confidentiality</h3>
      <p>
        Both parties agree to maintain confidentiality regarding proprietary information, project details,
        credentials, documents, and strategic discussions shared during engagements.
      </p>

      <h3 id="limitation-of-liability">9. Limitation of Liability</h3>
      <p>
        To the maximum extent permitted by law, Nextdot shall not be liable for indirect, consequential,
        incidental, reputational, or financial damages arising from use of its website or services. The
        Company’s total liability shall not exceed the fees paid for the specific service giving rise to the
        claim.
      </p>

      <h3 id="indemnification">10. Indemnification</h3>
      <p>
        Users and clients agree to indemnify and hold harmless Nextdot Digital Solutions Pvt. Ltd., its
        employees, directors, affiliates, and partners from claims, liabilities, losses, or damages arising
        from misuse of services, violation of laws, or infringement of third-party rights.
      </p>

      <h3 id="governing-law">11. Governing Law</h3>
      <p>
        These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive
        jurisdiction of the courts located in Gurgaon, Haryana.
      </p>

      <h3 id="contact-information">12. Contact Information</h3>
      <p>
        Nextdot Digital Solutions Pvt. Ltd.<br />
        DLF Phase 2, JCM 22, Gurgaon, Haryana<br />
        Email: <a href="mailto:contact@nextdot.co.in">contact@nextdot.co.in</a><br />
        Website: <a href="https://nextdot.co.in/">https://nextdot.co.in/</a>
      </p>
    </LegalPageShell>
  );
}
