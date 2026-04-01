import Hero from "@public/components/listings/Hero";
import { Phone, Mail, MapPin } from "lucide-react";

const offices = [
  {
    name: "Castillo Grande Office",
    phone: "+57 (301) 545-2164",
    email: "hola@lacarta.co",
    address: "9-46A CL5A Avenida Pinaňgo Castillo Grande",
  },
  {
    name: "Boca Grande Head Office",
    phone: "+57 (301) 545-2164",
    email: "hola@lacarta.co",
    address: "Esquina con carrera 4, Cl. 7a #7, Cartagena de Indias, Bolívar, Colombia",
  },
  {
    name: "Panama Office",
    phone: "+1 (860) 348-5520",
    email: "info@lacarta.co",
    address: "Torre Inteligente, CrediCorp Bank, C. 50 3101, Panamá, Provincia de Panamá, Panama",
  },
  {
    name: "Miami Office",
    phone: "+1 (516) 421-0231",
    email: "info@lacarta.co",
    address: "230 NE 4th St, Miami, FL 33132, United States",
  },
];

const inputClass =
  "w-full border border-gray-300 px-4 py-3 text-sm text-black placeholder-gray-400 bg-white focus:outline-none focus:border-gray-600";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <Hero
        bgImage="/lacarta_images/contact-banner.png"
        title=""
        subtitle=""
        path="La Carta - Cartagena Culture & Tourism › Contact"
        button={false}
      />

      {/* Main Section */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20">

            {/* ── Left: Form ── */}
            <div>
              <h2
                className="font-antigua font-black uppercase mb-8 leading-none"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#000" }}
              >
                Connect With Us
              </h2>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text"  placeholder="Name*"         className={inputClass} />
                  <input type="email" placeholder="Email*"        className={inputClass} />
                </div>
                <input   type="tel"  placeholder="Phone Number*" className={inputClass} />
                <textarea
                  rows={7}
                  placeholder="Message"
                  className={`${inputClass} resize-none`}
                />

                {/* Verify label */}
                <p style={{ color: "#000", fontWeight: 600, fontSize: "0.875rem" }}>Verify</p>

                {/* reCAPTCHA mock */}
                <div
                  className="flex items-center gap-3 border border-gray-300 bg-gray-50 rounded px-4 py-3"
                  style={{ width: "fit-content", minWidth: 220 }}
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
                    className="bg-black text-white font-bold px-10 py-3 hover:bg-gray-800 transition-colors"
                    style={{ fontSize: "0.9rem", letterSpacing: "0.05em" }}
                  >
                    Submit
                  </button>
                </div>

                <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#000" }}>
                  Any Spam Emails Will Be Blacklisted
                </p>
              </form>
            </div>

            {/* ── Right: Offices ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-8 content-start">
              {offices.map((office) => (
                <div key={office.name}>
                  <h3
                    className="font-antigua font-black leading-tight mb-2"
                    style={{ fontSize: "1.05rem", color: "#000" }}
                  >
                    {office.name}
                  </h3>
                  <div style={{ borderBottom: "2px solid #000", marginBottom: "0.75rem" }} />
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Phone className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#000" }} />
                      <span style={{ fontSize: "0.875rem", color: "#000" }}>{office.phone}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Mail className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#000" }} />
                      <span style={{ fontSize: "0.875rem", color: "#000" }}>{office.email}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#000" }} />
                      <span style={{ fontSize: "0.875rem", color: "#444" }}>{office.address}</span>
                    </li>
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Google Map ── */}
      <div className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d490.52902565833494!2d-75.55695049423026!3d10.403123377092946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef62f1588d1a511%3A0x4f299ea8b272531d!2sEdificio%20Caribdis!5e0!3m2!1sen!2s!4v1774975758764!5m2!1sen!2s"
          width="100%"
          height="450"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
