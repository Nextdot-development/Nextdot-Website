import { motion } from "motion/react";
import { type FormEvent, useRef, useState } from "react";

export const CTASection = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [values, setValues] = useState({ name: "", company: "", email: "", phone: "", message: "", countryCode: "+91", agree: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

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

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setSuccess("");
    setErrors((prev) => ({ ...prev, submit: "" }));
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setLoading(true);
      try {
        // FormSubmit AJAX endpoint: returns a real JSON result, sends CORS headers
        // (works from any deployed domain), and _captcha:false disables the captcha
        // page that silently drops messages submitted via a hidden iframe.
        const fields: Record<string, string> = {
          name: values.name,
          company: values.company,
          email: values.email,
          phone: `${values.countryCode} ${values.phone}`.trim(),
          message: values.message,
          // FormSubmit config
          _template: "table",
          _subject: "New Enquiry via Nextdot Website",
          _replyto: values.email,
          _captcha: "false",
          // Honeypot: bots fill this, real users leave it empty
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

  const handleChange = (field: string, value: any) => {
    setValues((s) => ({ ...s, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <section className="py-20 sm:py-24 bg-ink relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* Left Column - Text */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full lg:w-1/2 min-w-0"
          >
            <div className="text-sm font-medium text-blue-400 mb-4 tracking-wider uppercase">READY TO BUILD</div>
            <h2 className="fluid-display-title font-display font-medium tracking-tight text-white mb-6">
              Done experimenting with AI?
            </h2>
            <p className="fluid-display-body text-white/70 mb-8 md:mb-12">
              Let’s define what production looks like for your organisation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button type="button" onClick={scrollToForm} className="min-h-11 bg-white text-ink px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold shadow-[0_10px_30px_rgba(255,255,255,0.08)] hover:bg-white/90 active:bg-white/90 active:scale-95 transition-all text-sm md:text-base">
                Start the Conversation
              </button>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="w-full lg:w-1/2 min-w-0"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-6">
              {errors.submit && <p className="text-red-300 text-sm">{errors.submit}</p>}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Full Name*</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  value={values.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-400 transition-colors" 
                />
                {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Company Name*</label>
                <input 
                  type="text" 
                  placeholder="Enter your company name" 
                  value={values.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-400 transition-colors" 
                />
                {errors.company && <p className="text-red-400 text-sm mt-2">{errors.company}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Work Email*</label>
                <input 
                  type="email" 
                  placeholder="Enter your work email address" 
                  value={values.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-400 transition-colors" 
                />
                {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Phone</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select aria-label="Country code" title="Country code" value={values.countryCode} onChange={(e) => handleChange('countryCode', e.target.value)} className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400 transition-colors w-full sm:w-24 appearance-none cursor-pointer">
                    <option className="text-ink">+91</option>
                    <option className="text-ink">+1</option>
                    <option className="text-ink">+44</option>
                  </select>
                  <input 
                    type="tel" 
                    placeholder="Enter your phone number" 
                    value={values.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-400 transition-colors" 
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-sm mt-2">{errors.phone}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">How can we help you?</label>
                <textarea 
                  placeholder="Type your message here" 
                  rows={4} 
                  value={values.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-400 transition-colors resize-none" 
                />
                {errors.message && <p className="text-red-400 text-sm mt-2">{errors.message}</p>}
              </div>
              
              <div className="flex items-start gap-3 mt-2">
                <input aria-label="Consent to share information" title="Consent to share information" type="checkbox" checked={values.agree} onChange={(e) => handleChange('agree', e.target.checked)} className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500" />
                <p className="text-xs text-white/60 leading-relaxed">
                  I agree to share information with Nextdot for the purpose of fulfilling this request and in accordance with Nextdot's Privacy Statement.
                </p>
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full sm:w-40 min-h-11 bg-blue-600 text-white rounded-full py-3 font-semibold hover:bg-blue-500 active:bg-blue-500 active:scale-95 transition-all mt-4 sm:self-start disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              {success && <p className="text-green-200 mt-4">{success}</p>}
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
