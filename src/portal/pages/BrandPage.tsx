import Hero from "@public/components/listings/Hero";

const inputClass =
  "w-full border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder-transparent focus:outline-none focus:border-gray-500";

const labelClass = "block text-xs font-semibold mb-1" ;

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero banner ── */}
      <Hero
        bgImage="/lacarta_images/brand.png"
        title=""
        subtitle=""
        path="La Carta - Cartagena Culture & Tourism › Work with Us-Brand"
        button={false}
      />

      {/* ── Intro ── */}
      <section className="py-10 text-center px-4">
        <h1
          className="font-antigua font-black uppercase mb-3"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#000" }}
        >
          Brand
        </h1>
        <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
          Brands leverage our trust, expertise and reach to connect with our highly engaged audiences through stories that extend beyond traditional advertising. Reach out to learn more.
        </p>
      </section>

      {/* ── Form on gold background ── */}
      <section className="pb-16 px-4" style={{ backgroundColor: "#f5c542" }}>
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
              Brand
            </h2>

            <form className="space-y-4">

              {/* Full Name + Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={{ color: "#000" }}>Full Name</label>
                  <input type="text" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass} style={{ color: "#000" }}>Phone</label>
                  <input type="tel" className={inputClass} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={labelClass} style={{ color: "#000" }}>Email Address</label>
                <input type="email" className={inputClass} />
              </div>

              {/* Company Name */}
              <div>
                <label className={labelClass} style={{ color: "#000" }}>Company Name</label>
                <input type="text" className={inputClass} />
              </div>

              {/* Campaign/Brand Name */}
              <div>
                <label className={labelClass} style={{ color: "#000" }}>
                  What's The Campaign/Brand Name You're Looking To Advertise?
                </label>
                <input type="text" className={inputClass} />
              </div>

              {/* Business Type */}
              <div>
                <label className={labelClass} style={{ color: "#000" }}>Which Type Of Business Are You?</label>
                <input type="text" className={inputClass} />
              </div>

              {/* Budget + Campaign Start Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={{ color: "#000" }}>Budget</label>
                  <input type="text" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass} style={{ color: "#5a8fd4" }}>Campaign Start Date</label>
                  <input
                    type="date"
                    className={inputClass}
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              {/* Target Market */}
              <div>
                <label className={labelClass} style={{ color: "#000" }}>Target Market</label>
                <input type="text" className={inputClass} />
              </div>

              {/* How Did You Discover */}
              <div>
                <label className={labelClass} style={{ color: "#000" }}>How Did You Discover La Carta?</label>
                <input type="text" className={inputClass} />
              </div>

              {/* Objectives */}
              <div>
                <label className={labelClass} style={{ color: "#000" }}>Tell Us More About Your Objectives</label>
                <textarea rows={5} className={`${inputClass} resize-none`} />
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
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="bg-black text-white font-black uppercase tracking-widest px-10 py-2.5 hover:bg-gray-800 transition text-sm"
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
