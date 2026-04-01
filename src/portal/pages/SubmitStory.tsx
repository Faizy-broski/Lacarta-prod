import Link from "next/link";

const inputClass =
  "w-full border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:border-gray-500";

const labelClass = "block text-xs font-semibold mb-1";

const req = <span style={{ color: "red" }}> *</span>;

export default function SubmitStory() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Intro — no hero image, just white section ── */}
      <section className="pt-10 pb-6 px-6 md:px-12 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <p className="text-sm mb-4 text-center">
          <span style={{ color: "#c0a030" }}>La Carta – Cartagena Culture &amp; Tourism</span>
          <span className="font-bold text-black"> &rsaquo; Submit a Story</span>
        </p>

        {/* Heading */}
        <h1
          className="font-antigua font-black uppercase text-center mb-8"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#000" }}
        >
          Submit a La Carta Story
        </h1>

        {/* Body text */}
        <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#000" }}>
          <p>Have a hot story?</p>
          <p>
            At <em>La Carta</em>, we are dedicated to capturing the essence of Cartagena. We cover the stories that highlight the city's vibrant culture, its fascinating people, and the pressing issues that affect our community.
          </p>
          <p>
            If you have a story idea or information on something we should look into, we want to hear from you! Please provide as much detail as possible: What happened? When and where did it take place? Why is this story important to our readers? How did you come across this information?
          </p>
          <p>
            We respect your privacy and understand if you wish to remain anonymous. However, to help us create the best possible story, we encourage you to include any documents or evidence you might have. The more specific and factual your tip, the better!
          </p>
          <p>
            For general inquiries, please visit our{" "}
            <Link href="/contact" className="underline hover:opacity-75" style={{ color: "#000" }}>
              contact page
            </Link>
            .
          </p>
          <p>
            To submit a story idea or tip, please fill out the form below with all relevant details (What, When, Where, Why, and How). Your submission could be the next big feature in <em>La Carta</em>!
          </p>
        </div>
      </section>

      {/* ── Gold divider ── */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* ── Form on gold background ── */}
      <section className="py-10 px-4" style={{ backgroundColor: "#f5c542" }}>
        <div className="flex justify-center">
          {/* Card */}
          <div
            className="bg-white w-full max-w-2xl rounded-3xl px-10 py-10"
            style={{ border: "3px solid #111" }}
          >
            <h2
              className="font-antigua font-black uppercase text-center mb-6"
              style={{ fontSize: "1.5rem", color: "#000", letterSpacing: "0.08em" }}
            >
              Submit A Tip
            </h2>

            <form className="space-y-4">

              {/* Subject */}
              <div>
                <label className={labelClass} style={{ color: "#000" }}>Subject{req}</label>
                <input type="text" className={inputClass} />
              </div>

              {/* What's the story */}
              <div>
                <label className={labelClass} style={{ color: "#000" }}>What's the story?{req}</label>
                <textarea rows={6} className={`${inputClass} resize-none`} />
              </div>

              {/* Neighbourhood or Region */}
              <div>
                <label className={labelClass} style={{ color: "#000" }}>Neighbourhood or Region?{req}</label>
                <input type="text" className={inputClass} />
              </div>

              {/* Full Name + Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={{ color: "#000" }}>Full Name{req}</label>
                  <input type="text" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass} style={{ color: "#000" }}>Phone Number</label>
                  <input type="tel" className={inputClass} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={labelClass} style={{ color: "#000" }}>Email Address{req}</label>
                <input type="email" className={inputClass} />
              </div>

              {/* Credit Name */}
              <div>
                <label className={labelClass} style={{ color: "#000" }}>Credit Name{req}</label>
                <input type="text" className={inputClass} />
              </div>

              {/* Credit URL */}
              <div>
                <label className={labelClass} style={{ color: "#000" }}>Credit URL{req}</label>
                <input type="url" className={inputClass} />
              </div>

              {/* Terms & Conditions */}
              <div>
                <p className="font-black text-base mb-2" style={{ color: "#000" }}>Terms &amp; Conditions</p>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "#5a8fd4" }}>
                  I understand that I waive my moral rights to the content and grant a non exclusive license to La Carta to use the information and material of my submission on any type of medium.
                </p>

                {/* Are you interested */}
                <div className="mb-3">
                  <p className="text-xs mb-1" style={{ color: "#000" }}>
                    Are you interested in <span style={{ color: "#5a8fd4" }}>writing or participating</span> in this story?
                  </p>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-1.5 text-xs" style={{ color: "#000" }}>
                      <input type="radio" name="participate" value="yes" className="h-3.5 w-3.5" /> Yes
                    </label>
                    <label className="flex items-center gap-1.5 text-xs" style={{ color: "#000" }}>
                      <input type="radio" name="participate" value="no" className="h-3.5 w-3.5" /> No
                    </label>
                  </div>
                </div>

                {/* T&C checkbox */}
                <label className="flex items-start gap-2 text-xs" style={{ color: "#000" }}>
                  <input type="checkbox" className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                  <span>I am the sole rights holder of the Content, I am over 18 years old and I accept the above Terms &amp; Conditions.</span>
                </label>
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
