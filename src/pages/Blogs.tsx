import React from "react";
import { motion } from "motion/react";
import { Link, useParams } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import SEO from '@/lib/seo';

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  label: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  content: string[];
};

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "ai-voice-agents-never-miss-a-call",
    title: "The Future of Customer Communication: AI Voice Agents That Never Miss a Call",
    description: "In today's fast-paced business environment, every missed call is a missed opportunity. Whether it's a potential customer looking to book an appointment, an existing client seeking support, or a lead ready to convert, the cost of unavailability is higher than ever. That's where intelligent voice automation changes everything.",
    category: "Voice AI",
    label: "Featured Blog",
    date: "Apr 24, 2026",
    readTime: "14 min read",
    image: "/blogs/voice-agent.png",
    featured: true,
    content: [
      "In today's fast-paced business environment, every missed call is a missed opportunity. Whether it's a potential customer looking to book an appointment, an existing client seeking support, or a lead ready to convert, the cost of unavailability is higher than ever. That's where intelligent voice automation changes everything.",
      "Beyond Traditional IVR: Meet Your 24/7 AI Receptionist",
      "Remember the frustration of \"press 1 for sales, press 2 for support\"? Those days are over. Modern AI voice agents don't just route calls - they understand them. Using advanced natural language processing, these systems comprehend what callers actually want and respond accordingly, creating conversations that feel natural and human.",
      "The difference is remarkable. Instead of forcing customers through a maze of menu options, the AI engages in genuine dialogue, asking clarifying questions when needed and providing accurate responses instantly.",
      "Fully Automated Call Handling: From Hello to Confirmed",
      "The true power of AI voice agents lies in complete automation. Here's what happens when a call comes in:",
      "The system answers immediately, greets the caller professionally, and begins the conversation. There's no waiting on hold, no transferred calls bouncing between departments, and no voicemails left in limbo. The AI handles the entire interaction from start to finish.",
      "Need to book an appointment? The voice agent checks your real-time calendar, suggests available time slots, and confirms the booking - all within the same call. Want to reschedule? It handles that too. Looking for information about services or pricing? The AI provides accurate details instantly.",
      "Once the call concludes, automated confirmations go out via WhatsApp or SMS, ensuring customers have all the details they need. No manual follow-up required.",
      "Speaking Your Customer's Language - Literally",
      "In our globalized world, language barriers shouldn't limit business growth. AI voice agents detect the caller's language automatically and switch to communicate in that language seamlessly. Whether your customer speaks English, Spanish, Hindi, Mandarin, or dozens of other languages, the conversation flows naturally.",
      "This isn't just convenient - it's transformative for businesses serving diverse communities. Every caller feels understood and valued, regardless of their native language.",
      "Intent Recognition: Understanding What People Really Want",
      "The most sophisticated aspect of AI voice technology is intent recognition. Instead of matching keywords robotically, these systems understand context, sentiment, and nuance.",
      "When someone calls saying \"I need to see someone soon,\" the AI recognizes this as an urgent appointment request. If they ask \"Do you handle insurance claims?\", it understands they're seeking service information. When a caller says \"I've been waiting three days for a callback,\" the system detects frustration and prioritizes the issue accordingly.",
      "This contextual understanding means faster resolutions, fewer transfers, and significantly better customer experiences.",
      "Never Lose Another Lead",
      "Traditional phone systems create leakage points where potential customers slip through. AI voice agents eliminate these gaps with intelligent features designed to capture every opportunity:",
      "Missed Call Auto-Callback: If a call drops or goes unanswered during high-volume periods, the system automatically calls back, ensuring no lead goes cold.",
      "Repeat Caller Recognition: When someone calls multiple times, the AI recognizes them, recalls previous conversations, and picks up where things left off - no need to repeat information.",
      "Seamless Human Handoff: For complex situations requiring human expertise, the AI transfers smoothly to available staff, providing them with complete context about the caller's needs.",
      "These features transform how businesses handle communication, turning potential losses into secured conversions.",
      "One Integrated Ecosystem",
      "The real magic happens when everything connects. AI voice agents don't operate in isolation - they're the hub of an integrated communication ecosystem.",
      "The calling system connects directly to your database, pulling customer information instantly. Calendar integration happens in real-time, showing accurate availability for bookings. WhatsApp and SMS systems trigger automatically for confirmations and reminders. Every interaction is logged and accessible, creating a complete customer communication history.",
      "This integration eliminates the administrative burden that typically follows customer calls. No manual data entry, no calendar updates to make, no confirmation messages to send. Everything flows automatically through connected systems.",
      "Real-World Impact: What This Means for Your Business",
      "For Medical Practices: Patients book appointments anytime, day or night, without burdening your front desk staff during busy hours. The AI handles insurance verification questions, provides office hours, and sends appointment reminders automatically.",
      "For Service Businesses: Customers describe their needs conversationally, and the AI books the appropriate service, gathers necessary details, and confirms timing - all while your technicians focus on the work itself.",
      "For E-commerce: Shoppers inquire about products, check order status, or initiate returns through voice calls that feel just like talking to your best customer service representative.",
      "For Restaurants: Diners make reservations, ask about menu options for dietary restrictions, or modify existing bookings without tying up staff during peak service hours.",
      "The Cost of Doing Nothing",
      "Every business owner knows the pain points: calls during lunch rush that go unanswered, evening inquiries that wait until morning, weekend leads that convert to competitors, multilingual customers who struggle to communicate, and administrative staff overwhelmed by repetitive questions.",
      "These aren't just inconveniences - they're revenue leaks. Each missed opportunity represents real money walking out the door to businesses that are more accessible.",
      "Making the Shift to Intelligent Automation",
      "Implementing AI voice agents doesn't mean replacing your team - it means empowering them. Staff members focus on complex issues requiring human judgment, relationship-building, and specialized expertise, while the AI handles routine inquiries, bookings, and information requests that don't require human touch.",
      "The result is a business that scales communication capacity without scaling headcount, provides consistent service quality regardless of time or volume, responds instantly to customer needs 24/7, and captures leads that traditional systems miss.",
      "Your Always-On, Always-Ready Business Partner",
      "Think of an AI voice agent as your most reliable employee: never sick, never on break, never frustrated, and endlessly patient. It handles peak hours without stress, maintains professionalism in every interaction, learns from every conversation, and improves over time.",
      "Most importantly, it ensures that when opportunity calls, your business always answers.",
      "The Path Forward",
      "Customer expectations continue to rise. Instant responses aren't just appreciated - they're expected. Availability matters more than ever. Communication barriers cost real business.",
      "AI voice agents aren't futuristic technology anymore - they're essential infrastructure for businesses serious about growth. The question isn't whether to adopt intelligent automation, but how quickly you can implement it before competitors do.",
      "Ready to transform your customer communication? Discover how AI voice agents can eliminate missed opportunities, reduce administrative burden, and create exceptional customer experiences. Your next caller could be your biggest opportunity - make sure you're ready to handle it."
    ]
  },
  {
    id: 2,
    slug: "ai-doctor-avatars-revolutionizing-healthcare-communication",
    title: "AI Doctor Avatars: Revolutionizing Healthcare Communication at Scale",
    description: "In healthcare marketing, there's an undeniable truth: patients trust doctors. When a physician speaks, people listen. But there's a problem. Doctors are busy saving lives, not recording videos.",
    category: "Healthcare",
    label: "Blog",
    date: "Apr 24, 2026",
    readTime: "16 min read",
    image: "/blogs/avatar.png",
    content: [
      "In healthcare marketing, there's an undeniable truth: patients trust doctors. When a physician speaks, people listen. But there's a problem. Doctors are busy saving lives, not recording videos. Scheduling a single shoot requires coordinating calendars, booking studios, managing equipment, and hoping nothing goes wrong. By the time you need another video, the entire process starts over.",
      "What if you could create unlimited doctor-led content without ever scheduling another video shoot?",
      "The Video Production Bottleneck in Healthcare",
      "Healthcare brands face a unique challenge. Effective patient communication requires medical expertise and authority. That means doctor involvement. But doctors have limited time, and video production is resource-intensive.",
      "The traditional approach simply doesn't scale.",
      "Enter AI Doctor Avatars: Create Once, Generate Endlessly",
      "A doctor records a single foundational video session. From this session, an AI avatar is created that captures their appearance, voice, mannerisms, and speaking style. Once created, this avatar can generate unlimited new videos without the doctor ever stepping in front of a camera again.",
      "Need a video about diabetes management? Generate it. Want to explain a new treatment option? Done in minutes. Require social media content for five different branches? Create all of them simultaneously. No scheduling, no studio time, no repeated production costs.",
      "Scale Your Doctor's Presence Across Every Channel",
      "Doctors can't be everywhere at once, but their AI avatars can.",
      "While your doctor sees patients, their avatar educates audiences on YouTube. While they're in surgery, their avatar welcomes visitors on your website. While they sleep, their avatar runs patient education campaigns across social media.",
      "Consistency That Builds Trust",
      "In healthcare, inconsistency isn't just unprofessional, it's potentially dangerous. When different branches communicate different information, or when messaging changes across platforms, patient trust erodes.",
      "AI doctor avatars solve this. Every video maintains identical tone, adheres to precise medical accuracy, follows brand guidelines exactly, and meets compliance requirements consistently.",
      "From Concept to Content in Minutes",
      "Traditional video production measures timelines in weeks. AI doctor avatars compress this timeline dramatically. Take a single topic and generate multiple video formats in minutes.",
      "Why Patients Engage With Doctor-Led Content",
      "Study after study confirms what we instinctively know: patients trust information more when it comes from doctors.",
      "Centralized Control for Complex Organizations",
      "All content flows through one management platform where administrators review and approve videos before publication, track performance across all channels, update outdated information instantly, and maintain version control across locations.",
      "Built for Scale: Multi-Doctor, Multi-Location Healthcare Brands",
      "Imagine a hospital network with 20 doctors across 10 locations. AI avatars make comprehensive, consistent doctor content possible at scale.",
      "The Economics of Endless Content",
      "With AI doctor avatars, you pay once for avatar creation, then produce 50 videos (or 500 videos) for a fraction of traditional cost.",
      "Addressing the Elephant in the Room: Authenticity",
      "These are not deepfakes or generic AI voices. They're digital representations of real doctors, created with their full knowledge and participation, speaking information they've approved.",
      "The Competitive Advantage of Speed and Scale",
      "Organizations limited by traditional video production can't keep pace. AI doctor avatars eliminate this lag and enable immediate response content.",
      "Your Doctors, Everywhere, Always",
      "Ready to scale your doctor's expertise infinitely? Discover how AI doctor avatars can transform your healthcare brand's content creation, patient engagement, and market presence."
    ]
  },
  {
    id: 3,
    slug: "nextcomplyai-compliance-operating-system",
    title: "NextComplyAI: The Compliance Operating System That Prevents Problems Before They Happen",
    description: "In regulated industries, compliance isn't optional. It's the foundation everything else stands on. One missed requirement, one overlooked regulation, one communication that crosses the line, and your business faces penalties, lawsuits, damaged reputation, or worse.",
    category: "Compliance",
    label: "Blog",
    date: "Apr 24, 2026",
    readTime: "17 min read",
    image: "/blogs/comply.png",
    content: [
      "In regulated industries, compliance isn't optional. It's the foundation everything else stands on. One missed requirement, one overlooked regulation, one communication that crosses the line, and your business faces penalties, lawsuits, damaged reputation, or worse.",
      "The Broken State of Compliance Management",
      "Most organizations still treat compliance like a manual checklist. Teams review communications after they're sent. Issues surface only after damage is done.",
      "NextComplyAI: Compliance That Works at the Speed of Business",
      "Instead of reviewing communications after they're sent, it checks them before they leave. Instead of sampling randomly, it monitors everything. Instead of reacting to violations, it prevents them.",
      "End-to-End Automation: From Detection to Prevention",
      "Every communication flowing through your organization gets automatically screened against relevant regulations, compliance policies, industry standards, and internal guidelines in real-time.",
      "Proactive Risk Management: Stopping Problems Before They Start",
      "NextComplyAI doesn't just check against known rules. It identifies emerging risks through pattern analysis, regulatory trend monitoring, and predictive risk scoring.",
      "Real-Time Intelligence Across Every Communication Channel",
      "Voice calls get monitored as they happen. Written communications get validated before sending. Documents include automatic compliance review in creation workflows.",
      "Built for the Industries Where Compliance Matters Most",
      "Healthcare, Financial Services, Insurance, and Enterprise teams get context-aware compliance mapped to jurisdiction and use case.",
      "Centralized Control for Complex Organizations",
      "Compliance officers see the entire picture from a single dashboard with complete audit trails and role-based oversight.",
      "Reducing Legal and Operational Risk While Accelerating Business",
      "By automating compliance, organizations reduce violations while increasing operational speed and time-to-market.",
      "Future-Ready Infrastructure That Scales With Your Business",
      "As your business grows, compliance capacity grows automatically. As regulations change, enforcement updates without disruption.",
      "The Competitive Imperative of Automated Compliance",
      "The gap between organizations with automated compliance and those using manual processes is widening rapidly.",
      "Building Your Compliance Operating System",
      "Ready to transform compliance from constraint to competitive advantage? Discover how NextComplyAI can automate compliance operations and enable faster, confident growth."
    ]
  }
];

const getBlogLink = (post: BlogPost) => `/blogs/${post.slug}`;

const isHeading = (text: string) => {
  const trimmed = text.trim();
  if (!trimmed || trimmed.length > 100) {
    return false;
  }
  return !trimmed.endsWith(".");
};

export default function Blogs() {
  const featuredPost = BLOG_POSTS.find((post) => post.featured) ?? BLOG_POSTS[0];
  const recentPosts = BLOG_POSTS.filter((post) => post.id !== featuredPost.id);
  const filterTabs = ["Featured", ...Array.from(new Set(BLOG_POSTS.map((post) => post.category)))];

  const hideOnImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.display = "none";
  };

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-blue-500/30">
      <SEO
        title="Blogs & Case Studies"
        description="Insights on AI voice agents, healthcare avatars, compliance systems, and enterprise AI from the Nextdot team."
        path="/blogs"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Blogs & Case Studies", url: "/blogs" }]}
      />
      <section className="pt-24 md:pt-28 pb-8 md:pb-10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-10">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="fluid-display-title font-display font-medium tracking-tight text-ink"
          >
            Blogs & Case Studies
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.06 }}
            className="mt-3 fluid-display-body text-ink/65 max-w-3xl"
          >
            Long-form insights on voice AI, healthcare avatars, and compliance systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.12 }}
            className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[11px] md:text-xs font-medium tracking-wide text-ink/60"
          >
            {filterTabs.map((tab) => (
              <span key={tab} className="hover:text-ink transition-colors">
                {tab}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
            className="mt-8 group"
          >
            <Link to={getBlogLink(featuredPost)} className="block">
              <article className="grid md:grid-cols-2 rounded-2xl overflow-hidden border border-line bg-surface hover:border-accent/30 hover:shadow-md transition-all duration-400">
                <div className="order-2 md:order-1 p-6 md:p-8 lg:p-10 flex flex-col justify-between min-h-[290px] md:min-h-[360px] lg:min-h-[400px]">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] md:text-xs font-mono tracking-wide text-ink/60 mb-3">
                      <span className="uppercase text-accent">{featuredPost.category}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1"><Calendar size={13} /> {featuredPost.date}</span>
                    </div>

                    <h2 className="fluid-display-title font-display font-medium text-ink leading-[1.08] group-hover:text-accent transition-colors">
                      {featuredPost.title}
                    </h2>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm md:text-base text-ink/65 leading-relaxed line-clamp-3 mb-4">
                      {featuredPost.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-ink group-hover:text-accent transition-colors">
                      Read Article
                    </span>
                  </div>
                </div>

                <div className="order-1 md:order-2 relative min-h-[250px] md:min-h-full">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                    decoding="async"
                    onError={hideOnImageError}
                  />
                </div>
              </article>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="border-t border-line mb-8" />

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            {recentPosts.map((post, idx) => (
              <Link to={getBlogLink(post)} key={post.id} className="group block h-full">
                <motion.article
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.08 }}
                  className="h-full rounded-2xl border border-line bg-surface p-3.5 md:p-4 hover:border-accent/30 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                >
                  <div className="rounded-xl overflow-hidden h-[210px] md:h-[220px] border border-line">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      loading="lazy"
                      decoding="async"
                      onError={hideOnImageError}
                    />
                  </div>

                  <div className="pt-3.5 flex flex-col h-[calc(100%-220px)] md:h-[calc(100%-230px)]">
                    <div className="flex items-center gap-2 text-[11px] font-mono tracking-wide text-ink/60 mb-2.5 flex-wrap">
                      <span className="uppercase text-accent">{post.category}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="fluid-display-card font-display font-medium text-ink leading-snug mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>

                    <div className="mt-auto pt-3 border-t border-line/60 flex items-center justify-between text-xs text-ink/60">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={13} /> {post.readTime}
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export const BlogPostDetail: React.FC = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="bg-paper pt-24 min-h-screen text-ink">
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-semibold mb-4">Blog Not Found</h1>
          <p className="text-ink/70 mb-8">We could not find the blog you are looking for.</p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold hover:border-accent transition-all"
          >
            Back to Blogs
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-paper pt-24 min-h-screen text-ink">
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-10">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink/60 hover:text-ink transition-colors"
          >
            Back to Blogs
          </Link>
        </div>

        <div className="mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">{post.category}</div>
          <h1 className="fluid-display-title font-semibold mb-5 tracking-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-ink/60 mb-5 flex-wrap">
            <span className="inline-flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
            <span className="text-line">|</span>
            <span className="inline-flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
          </div>
          <p className="text-xl text-ink/70 leading-relaxed">{post.description}</p>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl mb-12 shadow-sm border border-line">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </div>

        <article className="max-w-3xl mx-auto">
          {post.content.map((paragraph, index) =>
            isHeading(paragraph) ? (
              <h2 key={index} className="text-2xl md:text-3xl font-semibold mt-10 mb-4 text-ink tracking-tight">
                {paragraph}
              </h2>
            ) : (
              <p key={index} className="text-ink/80 leading-relaxed my-6 text-lg">
                {paragraph}
              </p>
            )
          )}
        </article>
      </section>
    </div>
  );
};
