import { motion } from "motion/react";
import { type FormEvent, useState } from "react";
import SEO from '@/lib/seo';
import { WorldMap } from "@/components/WorldMap";
import { MapPin, Building2, Mail } from "lucide-react";

export default function Contact() {
  const [values, setValues] = useState({ name: "", company: "", email: "", phone: "", message: "", countryCode: "+91", agree: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!values.name.trim()) e.name = "Full name is required.";
    if (!values.company.trim()) e.company = "Company name is required.";
    if (!values.email.trim()) e.email = "Work email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "Enter a valid email address.";
    if (!values.phone.trim()) e.phone = "Phone is required.";
    if (!values.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleChange = (field: string, value: any) => {
    setValues((s) => ({ ...s, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Same submission pipeline as the homepage CTA form: formsubmit.co's AJAX
  // endpoint posting to the same configured inbox. Using the AJAX endpoint (vs a
  // hidden-iframe form POST) means we get a real JSON success/failure response,
  // it returns CORS headers so it works from any deployed domain, and _captcha:false
  // disables the captcha page that silently drops messages submitted via an iframe.
  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setSuccess("");
    setErrors((prev) => ({ ...prev, submit: "" }));
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setLoading(true);
      try {
        const fields: Record<string, string> = {
          name: values.name,
          company: values.company,
          email: values.email,
          phone: `${values.countryCode} ${values.phone}`.trim(),
          message: values.message,
          _template: "table",
          _subject: "New Enquiry via Nextdot Website",
          _replyto: values.email,
          _captcha: "false",
          _honey: "",
        };

        const body = new FormData();
        Object.entries(fields).forEach(([key, value]) => body.append(key, value));

        const res = await fetch("https://formsubmit.co/ajax/contact@nextdot.co.in", {
          method: "POST",
          headers: { Accept: "application/json" },
          body,
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok || data?.success === "false" || data?.success === false) {
          throw new Error(data?.message || "Submission failed");
        }

        setSuccess("Thanks - your message has been sent. We'll be in touch shortly.");
        setValues({ name: "", company: "", email: "", phone: "", message: "", countryCode: "+91", agree: false });
      } catch {
        setErrors((prev) => ({ ...prev, submit: "Unable to send right now. Please try again or email contact@nextdot.co.in." }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-blue-500/30">
      <SEO
        title="Contact"
        description="Contact Nextdot for enterprise AI systems, creative production, and digital solutions. Offices in Gurgaon, Mumbai, and Jamshedpur."
        path="/contact"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }]}
      />

      {/* 1. HERO */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-400/10 blur-[120px]"></div>
          <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-300/10 blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          {/* Connecting Lines */}
          <div className="absolute -top-48 left-4 md:left-6 w-px h-48 bg-gradient-to-b from-transparent to-blue-500 hidden md:block" />
          <div className="absolute top-0 left-4 md:left-6 w-2 h-2 -ml-[3px] rounded-full bg-blue-500 hidden md:block shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          <div className="absolute top-0 left-4 md:left-6 w-px h-full bg-line hidden md:block" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: heading, text, Email Us button */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:pt-4"
            >
              <h1 className="fluid-display-hero font-display font-medium tracking-tight text-ink mb-8">
                Start the conversation.
              </h1>
              <p className="fluid-display-body text-ink/60 mb-12 max-w-xl">
                If you're exploring how AI can move from pilot to production inside your organisation, we should talk.
              </p>
              <a
                href="mailto:contact@nextdot.co.in"
                className="inline-flex items-center gap-3 min-h-11 px-8 py-4 bg-ink text-paper rounded-full hover:bg-ink/90 active:bg-ink/90 active:scale-95 transition-all font-medium text-lg group"
              >
                <Mail size={20} className="text-paper/70 group-hover:text-paper group-active:text-paper transition-colors" />
                Email Us
              </a>
            </motion.div>

            {/* Right: contact form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="w-full"
            >
              <div className="bg-surface border border-line rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Full Name*</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={values.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full bg-white border border-line rounded-lg px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Company Name*</label>
                    <input
                      type="text"
                      placeholder="Enter your company name"
                      value={values.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                      className="w-full bg-white border border-line rounded-lg px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.company && <p className="text-red-500 text-sm mt-2">{errors.company}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Work Email*</label>
                    <input
                      type="email"
                      placeholder="Enter your work email address"
                      value={values.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full bg-white border border-line rounded-lg px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Phone</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <select
                        aria-label="Country code"
                        title="Country code"
                        value={values.countryCode}
                        onChange={(e) => handleChange('countryCode', e.target.value)}
                        className="bg-white border border-line rounded-lg px-4 py-3 text-ink focus:outline-none focus:border-accent transition-colors w-full sm:w-24 appearance-none cursor-pointer"
                      >
                        <option>+91</option>
                        <option>+1</option>
                        <option>+44</option>
                      </select>
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={values.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="flex-1 bg-white border border-line rounded-lg px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">How can we help you?</label>
                    <textarea
                      placeholder="Type your message here"
                      rows={4}
                      value={values.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="w-full bg-white border border-line rounded-lg px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:border-accent transition-colors resize-none"
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
                  </div>

                  <div className="flex items-start gap-3 mt-1">
                    <input
                      aria-label="Consent to share information"
                      title="Consent to share information"
                      type="checkbox"
                      checked={values.agree}
                      onChange={(e) => handleChange('agree', e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-line bg-white text-accent focus:ring-accent"
                    />
                    <p className="text-xs text-ink/60 leading-relaxed">
                      I agree to share information with Nextdot for the purpose of fulfilling this request and in accordance with Nextdot's Privacy Statement.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-40 min-h-11 bg-ink text-white rounded-full py-3 font-semibold hover:bg-ink/90 active:bg-ink/90 active:scale-95 transition-all mt-2 sm:self-start disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                  {success && <p className="text-green-600 mt-2 text-sm">{success}</p>}
                </form>
              </div>
            </motion.div>
          </div>
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
              <h2 className="fluid-display-title font-display text-ink">
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
                whileTap={{ scale: 0.98 }}
                className="bg-paper border border-line p-7 sm:p-8 md:p-10 rounded-2xl hover:border-accent/30 active:border-accent/30 hover:shadow-sm active:shadow-sm transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-active:opacity-10 transition-opacity">
                  <Building2 size={120} className="text-ink" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-surface border border-line flex items-center justify-center mb-6 group-hover:scale-110 group-active:scale-110 transition-transform">
                    <MapPin className="text-accent" size={24} />
                  </div>
                  <h3 className="fluid-display-card font-display font-medium text-ink mb-2">{office.city}</h3>
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
