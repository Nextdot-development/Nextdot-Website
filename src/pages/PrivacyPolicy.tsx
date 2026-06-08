import SEO from '@/lib/seo';
import { LegalPageShell } from '@/components/LegalPageShell';

export default function PrivacyPolicy() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      effectiveDate="1st January 2026"
      description="This policy explains how Nextdot Digital Solutions Pvt. Ltd. collects, uses, stores, and protects information obtained through its website and associated communications."
      sections={[
        { id: 'information-we-collect', label: '1. Information We Collect' },
        { id: 'use-of-information', label: '2. Use of Information' },
        { id: 'marketing-communications', label: '3. Marketing Communications' },
        { id: 'cookies-and-technologies', label: '4. Cookies and Website Technologies' },
        { id: 'data-sharing', label: '5. Data Sharing' },
        { id: 'data-security', label: '6. Data Security' },
        { id: 'data-retention', label: '7. Data Retention' },
        { id: 'third-party-links', label: '8. Third-Party Links' },
        { id: 'childrens-privacy', label: '9. Children’s Privacy' },
        { id: 'policy-updates', label: '10. Policy Updates' },
        { id: 'contact-information', label: '11. Contact Information' },
      ]}
    >
      <SEO title="Privacy Policy - Nextdot" description="Privacy Policy for Nextdot Digital Solutions Pvt. Ltd." path="/privacy-policy" />
      <h3 id="information-we-collect">1. Information We Collect</h3>
      <p>
        The Company may collect: name, email address, phone number, company information, inquiry and
        project-related information, device, browser and usage information, IP address and communication data.
        The Company does not process payments directly through the website.
      </p>

      <h3 id="use-of-information">2. Use of Information</h3>
      <p>
        Collected information may be used for responding to inquiries and business requests, service
        delivery and communication, website administration and security, marketing, advertising and
        remarketing activities, and improving business operations and user experience.
      </p>

      <h3 id="marketing-communications">3. Marketing Communications</h3>
      <p>Users may receive newsletters, promotional content, or updates. Users may opt out at any time.</p>

      <h3 id="cookies-and-technologies">4. Cookies and Website Technologies</h3>
      <p>
        The website may use standard cookies and browser technologies to improve functionality, analytics,
        and marketing performance. Users may disable cookies through browser settings.
      </p>

      <h3 id="data-sharing">5. Data Sharing</h3>
      <p>
        The Company does not sell personal information. Information may be shared with authorized
        employees or vendors, where legally required, or to protect business operations, legal rights, or
        security.
      </p>

      <h3 id="data-security">6. Data Security</h3>
      <p>
        Reasonable technical and organizational measures are implemented to protect information against
        unauthorized access, misuse, or disclosure. However, no digital system can be guaranteed to be
        completely secure.
      </p>

      <h3 id="data-retention">7. Data Retention</h3>
      <p>Information is retained only as long as necessary for business, operational, legal, or contractual purposes.</p>

      <h3 id="third-party-links">8. Third-Party Links</h3>
      <p>
        The website may contain links to third-party websites. Nextdot is not responsible for the privacy
        practices or content of such external platforms.
      </p>

      <h3 id="childrens-privacy">9. Children’s Privacy</h3>
      <p>The Company does not knowingly collect personal information from individuals under the age of 18.</p>

      <h3 id="policy-updates">10. Policy Updates</h3>
      <p>Nextdot reserves the right to modify or update this Privacy Policy at any time without prior notice.</p>

      <h3 id="contact-information">11. Contact Information</h3>
      <p>
        Nextdot Digital Solutions Pvt. Ltd.<br />
        DLF Phase 2, JCM 22, Gurgaon, Haryana<br />
        Email: <a href="mailto:contact@nextdot.co.in">contact@nextdot.co.in</a><br />
        Website: <a href="https://nextdot.co.in/">https://nextdot.co.in/</a>
      </p>
    </LegalPageShell>
  );
}
