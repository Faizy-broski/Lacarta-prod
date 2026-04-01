"use client";

import Link from "next/link";
import { useState } from "react";
import { Users, Globe, Building2, Zap, MapPin, Monitor, Video, Smartphone, Mail, Youtube } from "lucide-react";

const stats = [
  { value: "973", label: "Customers Served", bg: "#e8534a", icon: <Users size={28} color="#e8534a" /> },
  { value: "23",  label: "Nations Served",   bg: "#f5c542", icon: <Globe size={28} color="#f5c542" /> },
  { value: "500+",label: "Hotel Options",    bg: "#3bbfad", icon: <Building2 size={28} color="#3bbfad" /> },
  { value: "500+",label: "Activity Options", bg: "#f5c542", icon: <Zap size={28} color="#f5c542" /> },
];

const adSections = [
  {
    title: "Listing Directory",
    body: "Get your business prominently featured in our comprehensive listing directory. Thousands of travelers and locals browse La Carta's directory daily to discover the best hotels, restaurants, activities, and services Cartagena has to offer. A listing puts your business front and center when potential customers are actively searching.",
    image: "/lacarta_images/Listing Directory.png",
    imageRight: true,
  },
  {
    title: "Website Banner Ads",
    body: "Place your brand in front of a highly engaged audience with targeted banner advertisements across La Carta's website. Our banner placements appear on high-traffic pages including the homepage, category pages, and article pages — giving your brand maximum visibility to readers who are planning their Cartagena experience.",
    image: "/lacarta_images/Website Banner Ads.png",
    imageRight: false,
  },
  {
    title: "Digital Press Release Spotlight",
    body: "Announce your brand, event, or new service through La Carta's Digital Press Release Spotlight. We craft and publish compelling press releases that position your business as a leader in Cartagena's tourism and culture landscape. Our editorial team ensures your story reaches the right audience at the right time.",
    image: "/lacarta_images/Digital Press Release.png",
    imageRight: true,
  },
  {
    title: "Social Media Posting",
    body: "Amplify your reach through La Carta's social media channels. We create and publish engaging posts featuring your brand across Instagram, Facebook, TikTok, and more. Our social media audience is made up of passionate Cartagena enthusiasts, tourists, and locals — the exact customers your business needs.",
    image: "/lacarta_images/Social Media Posting.png",
    imageRight: false,
  },
  {
    title: "Email Newsletter",
    body: "Reach La Carta's loyal subscriber base directly in their inbox. Our curated email newsletters are sent to thousands of engaged readers who actively seek out the best of Cartagena. A newsletter feature ensures your brand message is delivered personally and memorably to an audience that trusts our recommendations.",
    image: "/lacarta_images/Email Newsletter.png",
    imageRight: true,
  },
  {
    title: "YouTube Video Spotlight",
    body: "Showcase your brand through the power of video. La Carta's YouTube Video Spotlight produces high-quality, cinematic content that tells your brand story in a compelling and shareable format. Video content dramatically increases engagement and gives potential customers a vivid preview of what you offer.",
    image: "/lacarta_images/youtube video spotlight.png",
    imageRight: false,
  },
];

const brandLogos = [
  { src: "/lacarta_images/brand-1.png", alt: "ShareMyCasa" },
  { src: "/lacarta_images/brand-2.png", alt: "Especialmente" },
  { src: "/lacarta_images/brand-3.svg", alt: "Falabella" },
  { src: "/lacarta_images/brand-4.png", alt: "Olimpica" },
];

const caseStudies = [
  { src: "/lacarta_images/case-study-1.png", alt: "Falabella", label: "Fallabella colombian company", bg: "#f5e88a" },
  { src: "/lacarta_images/case-study-2.png", alt: "Concurso Nacional de Belleza", label: "Concurso Nacional de Belleza", bg: "#3bbfad" },
  { src: "/lacarta_images/case-study-3.png", alt: "Olimpica", label: "Olimpica", bg: "#e8534a" },
];

const awards = [
  { src: "/lacarta_images/Awards-1.png", alt: "TripAdvisor Certificate of Excellence" },
  { src: "/lacarta_images/Awards-2.png", alt: "Booking.com 9.8" },
  { src: "/lacarta_images/Awards-3.png", alt: "Viator Experience Award 2023" },
  { src: "/lacarta_images/Awards-4.png", alt: "Expedia 86% Recommend" },
];

const testimonials = [
  {
    logo: "/lacarta_images/brand-1.png",
    quote: "Listing our properties with La Carta has increased our occupancy rate from 40% to 65%. Their online analytics show us exact results.",
    author: "Hossein Yehia, Owner at sharemycasa.com",
  },
  {
    logoText: "EMINENT",
    quote: "The social media call outs as well as the PR we have generated for our specific clients has been a tremendous success.",
    author: "Andres Moreno Owner at Eminent Digital Marketing",
  },
  {
    logoText: "ALPHA\nLEARNING",
    quote: "Our video company obtained 37 high paying clients in the restaurant & real estate industries.",
    author: "Andre Bougie - Alpha Learning",
  },
  {
    logoText: "Deloitte.",
    quote: "Great sponsorship awareness for our Colombian target demographic campaign.",
    author: "Maheen Anjum - Senior Consultant at Deloitte",
  },
];

const processSteps = [
  { num: "1", label: "Choose\nSponsorship Plan", bg: "#f5c542", icon: <Monitor size={40} color="#fff" /> },
  { num: "2", label: "Fill out\nForm",            bg: "#e8534a", icon: <Mail size={40} color="#fff" /> },
  { num: "3", label: "Refine\nSponsorship",       bg: "#3bbfad", icon: <Video size={40} color="#fff" /> },
  { num: "4", label: "Boost Business\nVisibility",bg: "#f5c542", icon: <Zap size={40} color="#fff" /> },
];

const sponsorshipPlans = [
  { num: "1", title: "Business Directory Listing",    body: "List your local business with La Carta to receive more business from international tourists & locals looking for the best finds.",                    bg: "#e8534a", icon: <MapPin size={32} color="#fff" /> },
  { num: "2", title: "Website Banner Ads",             body: "Have your advertisement be strategically placed on our website and benefit from our traffic.",                                                       bg: "#f5c542", icon: <Monitor size={32} color="#fff" /> },
  { num: "3", title: "Digital Press Release Spotlight",body: "Get a Press Release featured in La Carta and all of our partner sites for your Business or Personality Brand.",                                      bg: "#e8534a", icon: <Video size={32} color="#fff" /> },
  { num: "4", title: "Social Media Posting",           body: "Be featured on our Facebook, Instagram, Tiktok, and Twitter profiles.",                                                                              bg: "#3bbfad", icon: <Smartphone size={32} color="#fff" /> },
  { num: "5", title: "Email Newsletter",               body: "Have a big event or hot topic news that must be seen quick? Be featured in our weekly newsletter.",                                                   bg: "#e8534a", icon: <Mail size={32} color="#fff" /> },
  { num: "6", title: "YouTube Video Spotlight",        body: "In depth video of your business or personality brand to be featured on our YouTube channel. Includes Social Media Features.",                       bg: "#f5c542", icon: <Youtube size={32} color="#fff" /> },
];

const partners = [
  { src: "/lacarta_images/partner-1.png", alt: "Cartagena de Indias Convention & Visitors Bureau" },
  { src: "/lacarta_images/partner-2.png", alt: "Colombia – The Country of Beauty" },
  { src: "/lacarta_images/partner-3.png", alt: "Dale Cultura" },
];

const inputCls = "w-full border border-gray-300 rounded px-3 py-2.5 text-sm mt-1 bg-white outline-none focus:border-gray-500";
const labelCls = "block text-sm font-bold mb-1";

function StepDots({ step }: { step: number }) {
  const icons = [
    <Users key="u" size={18} />,
    <Building2 key="b" size={18} />,
    <Zap key="z" size={18} />,
  ];
  return (
    <div className="flex items-center justify-center gap-1 mb-8">
      {icons.map((icon, i) => (
        <div key={i} className="flex items-center">
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: 34, height: 34, backgroundColor: step === i + 1 ? "#f5c542" : "#ccc", color: "#000" }}
          >
            {icon}
          </div>
          {i < 2 && (
            <div className="flex gap-0.5 mx-1">
              {[...Array(5)].map((_, d) => (
                <div key={d} style={{ width: 4, height: 2, backgroundColor: "#bbb", borderRadius: 2 }} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SponsorForm() {
  const [step, setStep] = useState(1);

  return (
    <div
      className="rounded-3xl px-8 py-10 w-full mx-auto"
      style={{ backgroundColor: "#f0f0f0", border: "4px solid #111", maxWidth: 560 }}
    >
      <h3
        className="font-antigua font-black uppercase text-center mb-6"
        style={{ fontSize: "1.5rem", color: "#000", letterSpacing: "0.06em" }}
      >
        Become A Sponsor
      </h3>

      <StepDots step={step} />

      {/* ── Step 1: Personal Details ── */}
      {step === 1 && (
        <div className="space-y-4">
          <p className="font-bold text-base mb-3" style={{ color: "#000" }}>Personal Details</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls} style={{ color: "#e8534a" }}>First Name</label>
              <input className={inputCls} style={{ color: "#000" }} />
            </div>
            <div>
              <label className={labelCls} style={{ color: "#e8534a" }}>Last Name</label>
              <input className={inputCls} style={{ color: "#000" }} />
            </div>
          </div>
          <div>
            <label className={labelCls} style={{ color: "#e8534a" }}>Email</label>
            <input type="email" className={inputCls} style={{ color: "#000" }} />
          </div>
          <div className="text-center pt-3">
            <button
              onClick={() => setStep(2)}
              className="px-12 py-2.5 font-bold text-sm hover:bg-gray-800 transition"
              style={{ backgroundColor: "#111", color: "#fff" }}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2: Business Details ── */}
      {step === 2 && (
        <div className="space-y-4">
          <p className="font-bold text-base mb-3" style={{ color: "#000" }}>Business Details</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls} style={{ color: "#000" }}>Phone number</label>
              <input type="tel" className={inputCls} style={{ color: "#000" }} />
            </div>
            <div>
              <label className={labelCls} style={{ color: "#000" }}>Company Website</label>
              <input type="url" className={inputCls} style={{ color: "#000" }} />
            </div>
          </div>
          <div>
            <label className={labelCls} style={{ color: "#000" }}>Which type of business are you?</label>
            <select className={inputCls} style={{ color: "#000" }}>
              <option>Activities</option>
              <option>Accommodations</option>
              <option>Weddings</option>
              <option>Resto/Bar</option>
              <option>Real Estate</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className={labelCls} style={{ color: "#000" }}>Select Advertising Service</label>
            <select className={inputCls} style={{ color: "#000" }}>
              <option>List Business on La Carta</option>
              <option>Website Banner Ads</option>
              <option>Digital Press Release Spotlight</option>
              <option>Social Media Posting</option>
              <option>Email Newsletter</option>
              <option>YouTube Video Spotlight</option>
            </select>
          </div>
          <div className="flex gap-3 pt-3 justify-center">
            <button onClick={() => setStep(1)} className="px-7 py-2.5 text-sm border border-gray-400 hover:bg-gray-100 transition" style={{ color: "#000" }}>Back</button>
            <button onClick={() => setStep(3)} className="px-10 py-2.5 font-bold text-sm hover:bg-gray-800 transition" style={{ backgroundColor: "#111", color: "#fff" }}>Next</button>
          </div>
        </div>
      )}

      {/* ── Step 3: Gameplan ── */}
      {step === 3 && (
        <div className="space-y-4">
          <p className="font-bold text-base mb-3" style={{ color: "#000" }}>Gameplan</p>
          <div>
            <label className={labelCls} style={{ color: "#000" }}>Budget*</label>
            <select className={inputCls} style={{ color: "#000" }}>
              <option>&gt;1,000,000 COP</option>
              <option>500,000 – 1,000,000 COP</option>
              <option>250,000 – 500,000 COP</option>
              <option>&lt;250,000 COP</option>
            </select>
          </div>
          <div>
            <label className={labelCls} style={{ color: "#000" }}>Campaign start date*</label>
            <input type="date" className={inputCls} style={{ color: "#000" }} />
          </div>
          <div>
            <label className={labelCls} style={{ color: "#000" }}>Target Market*</label>
            <select className={inputCls} style={{ color: "#000" }}>
              <option>Consumer (B2C)</option>
              <option>Business (B2B)</option>
              <option>Tourists</option>
              <option>Locals</option>
              <option>Tourists &amp; Locals</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className={labelCls} style={{ color: "#000" }}>Tell me more about your objectives*</label>
            <textarea
              rows={3}
              className={inputCls}
              style={{ color: "#000", resize: "none" }}
            />
          </div>
          <div>
            <label className={labelCls} style={{ color: "#000" }}>How did you discover La Cartagena media group?</label>
            <select className={inputCls} style={{ color: "#000" }}>
              <option>Social Media (e.g., Facebook, Instagram, Twitter)</option>
              <option>Google / Search Engine</option>
              <option>Word of Mouth</option>
              <option>Partner Referral</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <input type="checkbox" id="updates" className="w-4 h-4" />
            <label htmlFor="updates" className="text-xs" style={{ color: "#000" }}>
              I wish to receive monthly updates from La Cartagena
            </label>
          </div>
          <div className="flex gap-3 pt-3 justify-center">
            <button onClick={() => setStep(2)} className="px-7 py-2.5 text-sm border border-gray-400 hover:bg-gray-100 transition" style={{ color: "#000" }}>Back</button>
            <button
              className="px-10 py-2.5 font-black text-sm hover:brightness-110 transition font-antigua"
              style={{ backgroundColor: "#f5c542", color: "#000" }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdvertiseWithUs() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Intro ── */}
      <section className="pt-10 pb-8 px-6 md:px-12 max-w-6xl mx-auto">
        <p className="text-sm mb-6 text-center">
          <span style={{ color: "#c0a030" }}>La Carta – Cartagena Culture &amp; Tourism</span>
          <span className="font-bold" style={{ color: "#000" }}> &rsaquo; Become a Sponsor</span>
        </p>
        <h1
          className="font-antigua font-black uppercase text-center mb-8"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#000", letterSpacing: "0.06em" }}
        >
          Increase Clientele &amp; Visibility
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="rounded overflow-hidden">
            <img src="/lacarta_images/brand.png" alt="Cartagena" className="w-full object-cover" style={{ maxHeight: 360 }} />
          </div>
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#000" }}>
            <p><em>La Carta</em> is Cartagena's premier digital culture and tourism magazine, connecting businesses with thousands of engaged readers, travelers, and locals every month. Our platform is built on trust, quality content, and a deep passion for everything Cartagena.</p>
            <p>Whether you're a hotel, restaurant, tour operator, or local brand, advertising with <em>La Carta</em> places your business directly in front of the audience that matters most. Our readers are actively planning their Cartagena experiences — and they look to us for trusted recommendations.</p>
            <p>We offer a full suite of advertising and sponsorship solutions designed to increase your visibility, drive new customers, and build lasting brand recognition in the Cartagena market and beyond. Explore our offerings below and reach out to get started.</p>
            <div className="pt-2">
              <Link href="/contact" className="inline-block font-black uppercase tracking-widest text-sm px-8 py-2.5 hover:brightness-110 transition" style={{ backgroundColor: "#f5c542", color: "#000" }}>
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* ── Why Work With Us / Stats ── */}
      <section className="py-12 px-6 md:px-12 max-w-6xl mx-auto">
        <h2
          className="font-antigua font-black uppercase text-center mb-12"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: "#000", letterSpacing: "0.06em" }}
        >
          Why Work With Us?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <div
                className="flex items-center justify-center rounded-full bg-white shadow-md z-10 relative"
                style={{ width: 56, height: 56, border: `3px solid ${s.bg}`, marginBottom: -20 }}
              >
                {s.icon}
              </div>
              <div className="w-full flex flex-col items-center justify-center pt-8 pb-5 px-4 rounded" style={{ backgroundColor: s.bg, minHeight: 120 }}>
                <p className="font-antigua font-black text-center" style={{ fontSize: "2rem", color: "#fff", lineHeight: 1.1 }}>{s.value}</p>
                <p className="text-xs font-semibold text-center mt-1" style={{ color: "#fff" }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* ── Ad format sections ── */}
      {adSections.map((sec, i) => (
        <section key={sec.title} className="py-12 px-6 md:px-16" style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
          <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${sec.imageRight ? "" : "md:[&>:first-child]:order-2 md:[&>:last-child]:order-1"}`}>
            <div>
              <h3 className="font-antigua font-black uppercase mb-4" style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: "#000", letterSpacing: "0.05em" }}>{sec.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#000" }}>{sec.body}</p>
              <div className="mt-6">
                <Link href="/contact" className="inline-block font-black uppercase tracking-widest text-xs px-7 py-2 hover:brightness-110 transition" style={{ backgroundColor: "#f5c542", color: "#000" }}>
                  Learn More
                </Link>
              </div>
            </div>
            <div className="rounded overflow-hidden shadow-md">
              <img src={sec.image} alt={sec.title} className="w-full h-auto object-contain" style={{ maxHeight: 320 }} />
            </div>
          </div>
        </section>
      ))}

      {/* ── Brands We've Worked With ── */}
      <section className="py-14 px-6 bg-white">
        <h2
          className="font-antigua font-black uppercase text-center mb-10"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: "#000", letterSpacing: "0.06em" }}
        >
          Brands We&apos;ve Worked With
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-10 max-w-5xl mx-auto">
          {brandLogos.map((b) => (
            <img key={b.alt} src={b.src} alt={b.alt} className="h-16 object-contain" />
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* ── Case Studies ── */}
      <section className="py-14 px-6 bg-white">
        <h2
          className="font-antigua font-black uppercase text-center mb-4"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: "#000", letterSpacing: "0.06em" }}
        >
          Case Studies
        </h2>
        <p className="text-sm text-center max-w-3xl mx-auto mb-10" style={{ color: "#000" }}>
          From local, to national, to international La Carta is great for any brand who is looking for a Cartagena target audience and Cartagena travel audience. Here are some successful brands we have worked with.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {caseStudies.map((cs) => (
            <div key={cs.alt} className="flex flex-col items-center">
              <div
                className="w-full flex items-center justify-center rounded overflow-hidden"
                style={{ backgroundColor: cs.bg, aspectRatio: "1 / 1" }}
              >
                <img src={cs.src} alt={cs.alt} className="w-3/4 h-3/4 object-contain" />
              </div>
              <p className="mt-3 font-black text-sm text-center" style={{ color: "#000" }}>{cs.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* ── Awards & Honorable Mentions ── */}
      <section className="py-14 px-6 bg-white">
        <h2
          className="font-antigua font-black uppercase text-center mb-10"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: "#000", letterSpacing: "0.06em" }}
        >
          Awards &amp; Honorable Mentions
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-10 max-w-4xl mx-auto">
          {awards.map((a) => (
            <img key={a.alt} src={a.src} alt={a.alt} className="h-24 object-contain" />
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* ── Testimonials ── */}
      <section className="py-14 px-6 bg-white">
        <h2
          className="font-antigua font-black uppercase text-center mb-10"
          style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", color: "#000", letterSpacing: "0.06em" }}
        >
          What Our Client Are Saying About Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.author} className="flex gap-4 p-4 rounded" style={{ border: "1px solid #ddd" }}>
              <div className="flex-shrink-0 w-20 flex items-center justify-center">
                {t.logo ? (
                  <img src={t.logo} alt={t.author} className="h-10 object-contain" />
                ) : (
                  <span className="font-black text-xs text-center leading-tight" style={{ color: "#000", whiteSpace: "pre-line" }}>{t.logoText}</span>
                )}
              </div>
              <div>
                <p className="text-xs leading-relaxed mb-2" style={{ color: "#000" }}>{t.quote}</p>
                <p className="text-xs font-semibold" style={{ color: "#e8534a" }}>{t.author}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* ── Our Process ── */}
      <section className="py-14 px-6 bg-white">
        <h2
          className="font-antigua font-black uppercase text-center mb-10"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: "#000", letterSpacing: "0.06em" }}
        >
          Our Process
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {processSteps.map((s) => (
            <div
              key={s.num}
              className="flex flex-col items-center justify-center gap-4 p-6 rounded"
              style={{ backgroundColor: s.bg, minHeight: 160 }}
            >
              {s.icon}
              <p
                className="font-antigua font-black text-center text-xs uppercase"
                style={{ color: "#fff", whiteSpace: "pre-line", lineHeight: 1.4 }}
              >
                {s.num}. {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sponsorship Plans ── */}
      <section className="py-14 px-6 bg-white">
        <h2
          className="font-antigua font-black uppercase text-center mb-10"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: "#000", letterSpacing: "0.06em" }}
        >
          Sponsorship Plans
        </h2>
        <div className="max-w-3xl mx-auto space-y-10">
          {sponsorshipPlans.map((p) => (
            <div key={p.num} className="flex items-start gap-6">
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full"
                style={{ width: 80, height: 80, backgroundColor: p.bg }}
              >
                {p.icon}
              </div>
              <div>
                <h3
                  className="font-antigua font-black uppercase mb-1"
                  style={{ fontSize: "1rem", color: "#000", letterSpacing: "0.05em" }}
                >
                  {p.num}. {p.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#000" }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* ── Our Partners ── */}
      <section className="py-12 px-6 bg-white">
        <h2
          className="font-antigua font-black uppercase text-center mb-8"
          style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: "#000", letterSpacing: "0.06em" }}
        >
          Our Partners:
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-12 max-w-3xl mx-auto">
          {partners.map((p) => (
            <img key={p.alt} src={p.src} alt={p.alt} className="h-20 object-contain" />
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* ── Become a Sponsor form ── */}
      <section className="py-16 px-6 flex items-center justify-center" style={{ backgroundColor: "#f5c542" }}>
        <SponsorForm />
      </section>

    </div>
  );
}
