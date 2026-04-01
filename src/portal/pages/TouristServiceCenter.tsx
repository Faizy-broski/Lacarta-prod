import Link from "next/link";
import { MapPin, Clock, Phone, Mail, Info, Scale, FileText, ShieldAlert, BadgeCheck, HeartPulse, Bus, User } from "lucide-react";

const consumerCards = [
  { title: "Sue", desc: "The person filing the lawsuit seeks repair or exchange of the good or the return of the money paid through the effectiveness of the warranty.", icon: <Scale size={36} strokeWidth={1} style={{ color: "#bbb" }} /> },
  { title: "File A Complaint", desc: "The objective of the action is to protect the general interest and the collective right of all consumers", icon: <FileText size={36} strokeWidth={1} style={{ color: "#bbb" }} /> },
  { title: "Theft", desc: "If you are a victim of scams or thefts in Cartagena, you must file your virtual complaint with the Attorney General's Office.", icon: <ShieldAlert size={36} strokeWidth={1} style={{ color: "#bbb" }} /> },
  { title: "Police Guidance", desc: "If you require police guidance or tourist information, you can visit the physical or virtual tourist service centers.", icon: <BadgeCheck size={36} strokeWidth={1} style={{ color: "#bbb" }} /> },
  { title: "Health", desc: "If you have emergency or urgent situations, you can go to the nearest health center or contact the following telephone lines", icon: <HeartPulse size={36} strokeWidth={1} style={{ color: "#bbb" }} /> },
  { title: "Tourism Manager", desc: "Report cases of violence intrafamilial, sexual or gender and human trafficking in the Contact Center", icon: <User size={36} strokeWidth={1} style={{ color: "#bbb" }} /> },
  { title: "Transportation", desc: "Cartagena de Indias has TAXI-type public transportation fare regulation. You can take them from the airport or any other tourist point.", icon: <Bus size={36} strokeWidth={1} style={{ color: "#bbb" }} /> },
];

const infoPoints = [
  { label: "Rafael Nunez International Airport", detail: "Domestic arrivals hall" },
  { label: "Cruise Port", detail: "Port Society of Cartagena" },
  { label: "Plaza de la Paz", detail: "Next to the Public Clock tower. Venezuela Avenue." },
  { label: "La Bodeguita Dock", detail: "Muelle la Bodeguita, Av. Blas de Lezo piso 2. Centro, Cartagena de Indias." },
];

const policePoints = [
  { label: "Rafael Nunez International Airport", detail: "Domestic arrivals hall" },
  { label: "Playa Azul La Boquilla", detail: "Northern area. Blas el Teso sector" },
  { label: "La Bodeguita Dock", detail: "Center Av. Blas de Lezo, Rosario Islands exit." },
  { label: "Bocagrande Beach", detail: "Located at Playas del Capilla del mar, Next to Hotel Capilla del Mar" },
  { label: "Clock Tower", detail: "From outside of walled city. On the right of the clock tower entrance." },
];

function StarShield() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.2">
      <path d="M12 2L9 7H4l3.5 3.5L6 16l6-3 6 3-1.5-5.5L20 7h-5z" />
    </svg>
  );
}

export default function TouristServiceCenter() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Teal top banner ── */}
      <div className="w-full py-2 text-center text-sm font-bold" style={{ backgroundColor: "#3bbfad", color: "#fff" }}>
        Download our FREE Cartagena Travel Guide!
      </div>

      {/* ── Hero: gold overlay ── */}
      <div className="relative w-full" style={{ minHeight: 260, backgroundColor: "#c8a020", backgroundImage: "url('/lacarta_images/help-banner.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(210,165,30,0.75)" }} />
        <div className="relative z-10 px-4 md:px-20 py-8 md:py-12 flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          {/* Headset icon */}
          <svg className="w-12 h-12 sm:w-[72px] sm:h-[72px] flex-shrink-0" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="30" stroke="#000" strokeWidth="2" fill="none" />
            <path d="M20 34c0-7 5-13 12-13s12 6 12 13" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
            <rect x="15" y="33" width="8" height="10" rx="3" fill="none" stroke="#000" strokeWidth="2" />
            <rect x="41" y="33" width="8" height="10" rx="3" fill="none" stroke="#000" strokeWidth="2" />
            <path d="M36 46c0 2-2 4-4 4" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            <circle cx="32" cy="50" r="1.5" fill="#000" />
          </svg>
          <div>
            <h1
              className="font-antigua font-black"
              style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#000", lineHeight: 1.1 }}
            >
              Tourist Service Center
            </h1>
            <p className="mt-2 text-lg font-semibold" style={{ color: "#000" }}>
              If you ever need any help during your time in Cartagena!
            </p>
            <p className="mt-3 text-sm">
              <span style={{ color: "#7a5500" }}><em>La Carta – Cartagena Culture &amp; Tourism</em></span>
              <span className="font-bold" style={{ color: "#000" }}> › Tourist Service Center</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Intro text ── */}
      <section className="px-4 md:px-10 py-10 max-w-[1400px] mx-auto space-y-4 text-base leading-relaxed" style={{ color: "#000" }}>
        <p>
          Cartagena de Indias has different entities that are responsible for providing protection, advice and attention to national and/or foreign tourists who visit the city. Taking into account the above, the Cartagena de Indias Tourism Corporation offers guidance to tourists, so that they can expedite attention when certain situations arise, especially emergencies.
        </p>
        <p>
          Taking into account the possible situations that may arise for a tourist while visiting a destination, the tourist service channels are listed below in order to provide information in these situations.
        </p>
      </section>

      {/* ── CAT logo ── */}
      <div className="flex justify-center py-4 pb-10">
        <img src="/lacarta_images/cat.png" alt="CAT – Centro de Atención al Turista" className="h-24 object-contain" />
      </div>

      {/* ── Gold divider ── */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* ── Contact info + Map ── */}
      <section className="px-4 md:px-10 py-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

          {/* Colored contact bars */}
          <div className="space-y-3">
            {[
              { bg: "#e8534a", icon: <MapPin size={24} color="#000" />, text: "Muelle la Bodeguita, Av. Blas de Lezo piso 2. Centro, Cartagena de Indias." },
              { bg: "#4caf74", icon: <Clock size={24} color="#000" />,   text: "Monday to Friday :\n8 am – 12 pm & from 1 pm – 5 pm" },
              { bg: "#f5c542", icon: <Phone size={24} color="#000" />,   text: "+57 (605) 655 0211" },
              { bg: "#e8534a", icon: <Mail size={24} color="#000" />,    text: "recepcion@cartagenadeindias.travel" },
            ].map((row, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-5 py-4 rounded"
                style={{ backgroundColor: row.bg }}
              >
                {row.icon}
                <p className="text-base font-semibold whitespace-pre-line" style={{ color: "#000" }}>{row.text}</p>
              </div>
            ))}
          </div>

          {/* Map + Help Map button */}
          <div className="rounded overflow-hidden shadow-md">
            <div style={{ position: "relative" }}>
              <iframe
                title="CAT Cartagena Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62787.28!2d-75.5326!3d10.4236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef625e1d7d2d935%3A0x759e6fffef7b73c2!2sCartagena%2C%20Bol%C3%ADvar%2C%20Colombia!5e0!3m2!1sen!2s!4v1675000000000!5m2!1sen!2s"
                width="100%"
                height="320"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://maps.google.com/?q=Cartagena,Colombia"
                target="_blank"
                rel="noreferrer"
                className="absolute top-3 left-3 bg-white text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1 shadow"
                style={{ color: "#000" }}
              >
                Open in Maps ↗
              </a>
            </div>
            <Link
              href="/help-map"
              className="block text-center font-antigua font-black uppercase py-3 text-base tracking-widest hover:brightness-110 transition"
              style={{ backgroundColor: "#f5c542", color: "#000" }}
            >
              Help Map
            </Link>
          </div>
        </div>
      </section>

      {/* ── Gold divider ── */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* ── Consumer Protection ── */}
      <section className="px-4 md:px-10 py-12 max-w-[1400px] mx-auto">
        <h2
          className="font-antigua font-black uppercase mb-2"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: "#000", letterSpacing: "0.04em" }}
        >
          Consumer Protection
        </h2>
        <p className="text-base mb-8" style={{ color: "#000" }}>
          If you have concerns about failures, poor quality, non-compliance, misleading information or pricing, you have two options:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {consumerCards.map((card) => (
            <div
              key={card.title}
              className="flex items-start justify-between gap-4 p-5 rounded"
              style={{ backgroundColor: "#f5f5f5" }}
            >
              <div className="flex-1">
                <h3
                  className="font-antigua font-black uppercase mb-2"
                  style={{ fontSize: "1.05rem", color: "#000", letterSpacing: "0.04em" }}
                >
                  {card.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "#555" }}>{card.desc}</p>
              </div>
              <div className="flex-shrink-0 mt-1">{card.icon}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Gold divider ── */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* ── Information Points ── */}
      <section className="px-4 md:px-10 py-12 max-w-[1400px] mx-auto">
        <h2
          className="font-antigua font-black uppercase mb-2"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: "#000", letterSpacing: "0.04em" }}
        >
          Information Points
        </h2>
        <p className="text-base mb-8" style={{ color: "#000" }}>
          There you can receive information about the offer of tourist service providers and attractions to visit in Cartagena.
        </p>
        <div className="space-y-3">
          {infoPoints.map((item) => (
            <div key={item.label} className="flex items-stretch gap-3">
              <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 40 }}>
                <div
                  className="flex items-center justify-center rounded-full border-2"
                  style={{ width: 32, height: 32, borderColor: "#111" }}
                >
                  <Info size={16} style={{ color: "#111" }} />
                </div>
              </div>
              <div
                className="flex items-center px-5 py-3 font-black text-sm"
                style={{ backgroundColor: "#f5c542", color: "#000", width: "42%", minWidth: 0 }}
              >
                {item.label}
              </div>
              <div
                className="flex items-center flex-1 px-5 py-3 text-sm"
                style={{ backgroundColor: "#f0f0f0", color: "#555" }}
              >
                {item.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tourist Service Centers ── */}
      <section className="px-4 md:px-10 py-8 max-w-[1400px] mx-auto">
        <h2
          className="font-antigua font-black uppercase mb-2"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: "#000", letterSpacing: "0.04em" }}
        >
          Tourist Service Centers
        </h2>
        <p className="text-sm" style={{ color: "#000" }}>
          Regulations, restrictions and procedures necessary to ensure that your stay in Cartagena is the best.
        </p>
      </section>

      {/* ── Tourism Police Points ── */}
      <section className="px-4 md:px-10 pb-12 max-w-[1400px] mx-auto">
        <h2
          className="font-antigua font-black uppercase mb-6"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: "#000", letterSpacing: "0.04em" }}
        >
          Tourism Police Points
        </h2>
        <div className="space-y-3">
          {policePoints.map((item) => (
            <div key={item.label} className="flex items-stretch gap-3">
              <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 40 }}>
                <StarShield />
              </div>
              <div
                className="flex items-center px-5 py-3 font-black text-sm"
                style={{ backgroundColor: "#f5c542", color: "#000", width: "42%", minWidth: 0 }}
              >
                {item.label}
              </div>
              <div
                className="flex items-center flex-1 px-5 py-3 text-sm"
                style={{ backgroundColor: "#f0f0f0", color: "#000" }}
              >
                {item.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Gold divider ── */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* ── Provisional Passport Process ── */}
      <section className="px-4 md:px-10 py-12 max-w-[1400px] mx-auto">
        <h2
          className="font-antigua font-black uppercase mb-2"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: "#000", letterSpacing: "0.04em" }}
        >
          Provisional Passport Process
        </h2>
        <p className="text-sm mb-6" style={{ color: "#000" }}>
          Regulations, restrictions and procedures necessary to ensure that your stay in Cartagena is the best.
        </p>

        <div className="space-y-3 mb-10 text-sm" style={{ color: "#000" }}>
          <p>
            <span className="font-black">STEP 1 :</span>{" "}
            <span style={{ color: "#000" }}>Complaint to the Police Inspection or National Police platform</span>
          </p>
          <p>
            <span className="font-black">STEP 2 :</span>{" "}
            <span style={{ color: "#000" }}>Notify the Colombian Immigration office, attaching the pertinent complaint.</span>
          </p>
          <p>
            <span className="font-black">STEP 3 :</span>{" "}
            <span style={{ color: "#000" }}>Present before the consulate or embassy of your country in Colombia</span>
          </p>
        </div>

        {/* 3-col contact cards with floating icon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { bg: "#e8534a", icon: <MapPin size={22} color="#000" />, text: "Calle 20 B # 29-18 Barrio Pie de la Popa Cartagena,\nDT – Bolívar" },
            { bg: "#4caf74", icon: <Clock size={22} color="#000" />,   text: "Monday to Friday :\n8 am – 12 pm & from 1 pm – 5 pm" },
            { bg: "#f5c542", icon: <Phone size={22} color="#000" />,   text: "+57 (605) 670 05 55" },
          ].map((card, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Floating icon */}
              <div
                className="flex items-center justify-center rounded-full bg-white shadow-md z-10 relative"
                style={{ width: 48, height: 48, border: `3px solid ${card.bg}`, marginBottom: -20 }}
              >
                {card.icon}
              </div>
              <div
                className="w-full flex items-center justify-center pt-8 pb-5 px-5 rounded text-sm font-semibold text-center whitespace-pre-line"
                style={{ backgroundColor: card.bg, color: "#000", minHeight: 100 }}
              >
                {card.text}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
