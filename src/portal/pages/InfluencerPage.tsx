import Hero from "@public/components/listings/Hero";

const inputClass =
  "w-full border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:border-gray-500";

const labelClass = "block text-xs font-semibold mb-1";

const niches = ["Writer", "Social Media Guru", "Videographer", "Editor", "Speaker"];

const socialLinks = [
  { label: "Instagram account link", col: "#000" },
  { label: "Youtube Account Link",   col: "#5a8fd4" },
  { label: "TikTok account link",    col: "#000" },
  { label: "Facebook account link",  col: "#000" },
  { label: "Snapchat account link",  col: "#000" },
  { label: "Personal website",       col: "#000" },
  { label: "X account link",         col: "#000" },
  { label: "portfolio",              col: "#000" },
];

export default function InfluencerPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero banner ── */}
      <Hero
        bgImage="/lacarta_images/influencer.png"
        title=""
        subtitle=""
        path="La Carta - Cartagena Culture & Tourism › Work with Us – Influencer"
        button={false}
      />

      {/* ── Intro ── */}
      <section className="py-10 text-center px-4">
        <h1
          className="font-antigua font-black uppercase mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#000" }}
        >
          Cartagena Influencers
        </h1>
        <p className="font-semibold text-sm mb-3" style={{ color: "#000" }}>
          Join <em>La Carta</em> as an Influencer!
        </p>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed mb-3">
          At <em>La Carta</em>, we're all about sharing the vibrant stories and culture of Cartagena with our readers. We're looking for passionate influencers who have a deep connection with their audience and can bring the energy and spirit of Cartagena to life through engaging content. If you're a creator who loves to explore, share experiences, and inspire others, we'd love to hear from you!
        </p>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Submit your profile below, and let's see how we can collaborate to showcase the best of Cartagena together!
        </p>
      </section>

      {/* ── Form on gold background ── */}
      <section className="py-10 px-4" style={{ backgroundColor: "#f5c542" }}>
        <div className="flex justify-center">
          {/* Card */}
          <div
            className="bg-white w-full max-w-lg rounded-3xl px-10 py-10"
            style={{ border: "3px solid #111" }}
          >
            <h2
              className="font-antigua font-black uppercase text-center mb-6"
              style={{ fontSize: "1.6rem", color: "#000" }}
            >
              Influencer
            </h2>

            <form className="space-y-4">

              {/* Full Name + Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={{ color: "#000" }}>Full Name</label>
                  <input type="text" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass} style={{ color: "#000" }}>Phone Number</label>
                  <input type="tel" className={inputClass} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={labelClass} style={{ color: "#000" }}>Email Address</label>
                <input type="email" className={inputClass} />
              </div>

              {/* City */}
              <div>
                <label className={labelClass} style={{ color: "#000" }}>City</label>
                <input type="text" className={inputClass} />
              </div>

              {/* Bio */}
              <div>
                <label className={labelClass} style={{ color: "#000" }}>
                  Bio (past work, viral content, sponsored content created, etc.) <span style={{ color: "red" }}>*</span>
                </label>
                <textarea rows={5} className={`${inputClass} resize-none`} />
              </div>

              {/* Niche */}
              <div>
                <label className={labelClass} style={{ color: "#5a8fd4" }}>What is your Niche?</label>
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1">
                  {niches.map((n) => (
                    <label key={n} className="flex items-center gap-1.5 text-xs" style={{ color: "#000" }}>
                      <input type="checkbox" className="h-3.5 w-3.5" />
                      {n}
                    </label>
                  ))}
                </div>
              </div>

              {/* Social links 2-column grid */}
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((s) => (
                  <div key={s.label}>
                    <label className={labelClass} style={{ color: s.col }}>{s.label}</label>
                    <input type="url" className={inputClass} />
                  </div>
                ))}
              </div>

              {/* Why */}
              <div>
                <label className={labelClass} style={{ color: "#000" }}>
                  Why would make you a great content creator for La Carta?
                </label>
                <input type="text" className={inputClass} />
              </div>

              {/* reCAPTCHA mock */}
              <div
                className="flex items-center gap-3 border border-gray-300 bg-gray-50 rounded px-4 py-3"
                style={{ width: "fit-content" }}
              >
                <input type="checkbox" className="h-4 w-4 flex-shrink-0" />
                <span style={{ fontSize: "0.875rem", color: "#000" }}>I'm not a robot</span>
                <div className="ml-4 text-center leading-tight">
                  <div style={{ fontSize: "0.6rem", color: "#4a90d9", fontWeight: 700 }}>reCAPTCHA</div>
                  <div style={{ fontSize: "0.55rem", color: "#999" }}>Privacy · Terms</div>
                </div>
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="bg-black text-white font-black uppercase tracking-widest px-8 py-2 hover:bg-gray-800 transition text-sm"
                >
                  Submit
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
