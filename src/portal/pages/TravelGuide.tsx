import Link from "next/link";
import { MapPin } from "lucide-react";

export default function TravelGuide() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Top green announcement banner ── */}
      <div className="w-full py-2 text-center text-sm font-bold" style={{ backgroundColor: "#3bbfad", color: "#fff" }}>
        Download our FREE Cartagena Travel Guide!
      </div>

      {/* ── Page header ── */}
      <section className="px-4 md:px-16 pt-8 md:pt-10 pb-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
          <div className="flex-shrink-0 sm:pt-1">
            <MapPin size={40} strokeWidth={1.5} className="sm:hidden" style={{ color: "#111" }} />
            <MapPin size={52} strokeWidth={1.5} className="hidden sm:block" style={{ color: "#111" }} />
          </div>
          <div>
            <h1
              className="font-antigua font-black"
              style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#000", lineHeight: 1.1 }}
            >
              Cartagena Travel Guide
            </h1>
            <p className="mt-2 text-base leading-relaxed max-w-2xl" style={{ color: "#000" }}>
              From how to stay safe, order taxis, where to stay, &amp; what to do in Cartagena. Our Free guide will be your best resource throughout your Cartagena Trip!
            </p>
            {/* Breadcrumb */}
            <p className="mt-3 text-sm">
              <span style={{ color: "#c0a030" }}><em>La Carta – Cartagena Culture &amp; Tourism</em></span>
              <span className="font-bold" style={{ color: "#000" }}> › Cartagena Travel Guide</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Main feature: book + CTA ── */}
      <section className="px-8 md:px-16 py-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Book mockup */}
          <div className="flex justify-center">
            <div style={{ maxWidth: 320, width: "100%" }}>
              <img
                src="/lacarta_images/travel-guide.png"
                alt="Cartagena Travel Guide book"
                className="w-full h-auto object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* Text + CTA */}
          <div>
            <h2
              className="font-antigua font-black uppercase"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", color: "#000", lineHeight: 1.05, letterSpacing: "0.03em" }}
            >
              How To Thrive In Cartagena, Colombia Like A Local.
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: "#000" }}>
              Hidden Gems, Staying Safe, Maneuvering around the city, watching out for scams, negotiating, what to pack. The ultimate guide for Gringos.
            </p>
            <div className="mt-7">
              <Link
                href="#download"
                className="inline-block font-black uppercase tracking-widest text-sm px-8 py-3 hover:brightness-110 transition"
                style={{ backgroundColor: "#f5c542", color: "#000" }}
              >
                Download Travel Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gold divider ── */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* ── Guide topics ── */}
      <section className="px-8 md:px-16 py-14 max-w-6xl mx-auto">
        <h2
          className="font-antigua font-black uppercase text-center mb-12"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#000", letterSpacing: "0.06em" }}
        >
          What&apos;s Inside The Guide
        </h2>

        <div className="space-y-10">
          {[
            {
              num: "01",
              title: "Staying Safe in Cartagena",
              body: "Cartagena is safe for tourists in the main areas. Keep your belongings close, use official taxis, and avoid displaying expensive items in crowded spaces. Our guide covers the safest neighborhoods, scam awareness, and emergency contacts.",
              color: "#e8534a",
            },
            {
              num: "02",
              title: "How to Order Taxis & Get Around",
              body: "Taxis, motos, and TaxiExpress are the most common ways to get around. The historic center is best explored on foot. Learn how to negotiate fares, use apps like InDriver, and avoid unofficial taxis at night.",
              color: "#f5c542",
            },
            {
              num: "03",
              title: "Where to Stay",
              body: "From the colonial charm of El Centro to the beach clubs of Bocagrande and the bohemian energy of Getsemaní — find the perfect neighborhood for your travel style and budget.",
              color: "#000",
            },
            {
              num: "04",
              title: "What to Do & Hidden Gems",
              body: "Beyond the Walled City and Rosario Islands, Cartagena hides extraordinary local experiences. Discover neighbourhood food markets, secret rooftop bars, and day trips the guidebooks miss.",
              color: "#e8534a",
            },
            {
              num: "05",
              title: "Negotiating & Local Tips",
              body: "Knowing how to negotiate is essential in Cartagena markets. Our guide gives you the phrases, the numbers, and the mindset to shop like a local and avoid tourist prices.",
              color: "#f5c542",
            },
            {
              num: "06",
              title: "What to Pack",
              body: "Cartagena's tropical heat, Caribbean humidity, and beach lifestyle demand a specific packing list. We cover everything from sun protection to voltage adapters and must-have apps.",
              color: "#000",
            },
          ].map((item) => (
            <div key={item.num} className="flex gap-6 items-start">
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full font-antigua font-black"
                style={{ width: 64, height: 64, backgroundColor: item.color, color: "#fff", fontSize: "1.2rem" }}
              >
                {item.num}
              </div>
              <div>
                <h3
                  className="font-antigua font-black uppercase mb-2"
                  style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "#000", letterSpacing: "0.04em" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#000" }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Download CTA banner ── */}
      <section id="download" className="py-16 px-8 text-center" style={{ backgroundColor: "#f5c542" }}>
        <h2
          className="font-antigua font-black uppercase mb-3"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#000" }}
        >
          Get Your Free Travel Guide
        </h2>
        <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#000" }}>
          Enter your email and we&apos;ll send the complete Cartagena Travel Guide straight to your inbox — completely free.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-5 py-3 text-sm border border-gray-300 rounded outline-none bg-white"
            style={{ color: "#000" }}
          />
          <button
            className="px-8 py-3 font-black uppercase tracking-widest text-sm hover:bg-gray-800 transition"
            style={{ backgroundColor: "#111", color: "#fff" }}
          >
            Download
          </button>
        </div>
      </section>

    </div>
  );
}
