import { MapPin } from "lucide-react";

const landmarks = [
  { name: "The Walled City", image: "/lacarta_images/the waleed.png" },
  { name: "Clock Tower", image: "/lacarta_images/clock tower.png" },
  { name: "Customs Square", image: "/lacarta_images/custom-square.png" },
  { name: "San Pedro Claver Sanctuary", image: "/lacarta_images/san-padro.png" },
  { name: "Plaza de Bolivar", image: "/lacarta_images/palaza de bolivar.png" },
  { name: "Palace of the Inquisition", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
  { name: "Cathedral of Saint Catherine of Alexandria", image: "/lacarta_images/cathedaral of saint.png" },
  { name: "Santo Domingo Square", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80" },
  { name: "Plaza de Las Bovedas", image: "/lacarta_images/palaza de la bovidas.png" },
];

const faqList = [
  { id: "q1", label: "1. How much should a taxi from the airport to the most popular areas cost?" },
  { id: "q2", label: "2. Can I drink tap water?" },
  { id: "q3", label: "3. Do I need an adapter to plug in my phone or laptop?" },
  { id: "q4", label: "4. Where should I exchange money?" },
  { id: "q5", label: "5. Do they accept cards or is everything paid in cash?" },
  { id: "q6", label: "6. Do I need vaccines to enter Colombia, especially Cartagena?" },
  { id: "q7", label: "7. How should I dress for my upcoming vacation in Cartagena?" },
  { id: "q8", label: "8. Is Cartagena a safe place?" },
  { id: "q9", label: "9. What is the situation with prostitution in Cartagena?" },
  { id: "q10", label: "10. What's the situation with drug trafficking in Cartagena?" },
  { id: "q11", label: "11. What are the emergency or tourist service numbers?" },
  { id: "q12", label: "12. Where are the departure points for the islands?" },
  { id: "q13", label: "13. What are the best hotels in Cartagena?" },
  { id: "q14", label: "14. Which beaches should I visit in Barú and the Rosario Islands?" },
  { id: "q15", label: "15. What are the best hostels and Airbnbs in Cartagena?" },
];

const taxiFares = [
  { route: "Ruta a Manzanillo / Route to Manzanillo", price: "$45.000 COP / 11 USD" },
  { route: "Ruta a La Boquilla / Route to La Boquilla", price: "$21.400 COP / 5.2 USD" },
  { route: "Ruta a Crespo / Route to Crespo", price: "$17.800 COP / 4.3 USD" },
  { route: "Ruta a Marbella / Route to Marbella", price: "$17.800 COP / 4.4 USD" },
  { route: "Ruta al Centro Histórico / Route to Centro Histórico", price: "$17.800–$21.400 COP / 4.3–5.2 USD" },
  { route: "Ruta a Getsemaní / Route to Getsemaní", price: "$17.800 COP / 4.3 USD" },
  { route: "Ruta a Bocagrande / Route to Bocagrande", price: "$30.300 COP / 7.4 USD" },
  { route: "Ruta a Laguito / Route to Laguito", price: "$30.300 COP / 7.4 USD" },
  { route: "Ruta a Castillo Grande / Route to Castillo Grande", price: "$30.300 COP / 7.4 USD" },
];

export default function FAQs() {
  return (
    <div className="min-h-screen bg-white">

      {/* Teal banner */}
      <div className="w-full py-2 text-center text-sm font-bold" style={{ backgroundColor: "#3bbfad", color: "#fff" }}>
        Download our FREE Cartagena Travel Guide!
      </div>

      {/* Hero */}
      <div
        className="relative w-full"
        style={{
          minHeight: 240,
          backgroundColor: "#3bbfad",
          backgroundImage: "url('/lacarta_images/faq-banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(59,191,173,0.75)" }} />
        <div className="relative z-10 px-10 md:px-20 py-12 flex items-start gap-6">
          {/* Magnifying glass SVG */}
          <svg width="72" height="72" viewBox="0 0 64 64" fill="none" style={{ flexShrink: 0, marginTop: 4 }}>
            <circle cx="26" cy="26" r="16" stroke="#000" strokeWidth="2.5" fill="none" />
            <line x1="38" y1="38" x2="54" y2="54" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div>
            <h1
              className="font-antigua font-black uppercase"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#000", letterSpacing: "0.06em", lineHeight: 1.1 }}
            >
              Cartagena FAQ&apos;S
            </h1>
            <p className="mt-2 text-lg font-semibold" style={{ color: "#000" }}>
              Cartagena&apos;s Most Frequently Asked Questions
            </p>
            <p className="mt-3 text-sm italic" style={{ color: "#7a5500" }}>
              La Carta – Cartagena Culture &amp; Tourism
              <span className="font-bold not-italic" style={{ color: "#000" }}> › FAQ&apos;s</span>
            </p>
          </div>
        </div>
      </div>

      {/* 3×3 Landmark image grid */}
      <div className="px-4 md:px-10 py-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {landmarks.map((landmark) => (
            <div key={landmark.name} className="relative rounded-2xl overflow-hidden" style={{ height: 265 }}>
              <img
                src={landmark.image}
                alt={landmark.name}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 35%, transparent 100%)" }}
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <MapPin size={18} style={{ color: "#f5c542", flexShrink: 0 }} />
                <span className="text-white font-bold text-base leading-tight">{landmark.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gold divider */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* Large centered heading */}
      <div className="py-10 text-center px-6">
        <h2
          className="font-antigua font-black uppercase"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#000", letterSpacing: "0.04em", lineHeight: 1.15 }}
        >
          Cartagena FAQ&apos;S: Frequently Asked Questions, Our Top 15.
        </h2>
      </div>

      {/* Gold divider */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* 2-col: sidebar + content */}
      <div className="px-8 md:px-16 py-14 pb-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12">

        {/* Sidebar */}
        <aside className="self-start sticky top-8">
          <p className="font-black text-base mb-5 uppercase" style={{ color: "#000" }}>
            Cartagena FAQ&apos;S: Our Top 15.
          </p>
          <ul className="space-y-3">
            {faqList.map((faq, i) => (
              <li key={faq.id}>
                <a
                  href={`#${faq.id}`}
                  className="text-xs hover:underline leading-snug block"
                  style={{ color: i === 0 ? "#f5c542" : "#000" }}
                >
                  {faq.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="space-y-10 text-sm leading-relaxed" style={{ color: "#000" }}>

          {/* Intro */}
          <div>
            <p className="mb-3">
              Arriving in a new country without information will always be a somewhat crazy and scary adventure. We want you to know that at La Carta, we care about your well-being and all the questions you may have about Cartagena.
            </p>
            <p className="mb-3">
              Cartagena is a safe place, with all the pros and cons that any place in the world has, but here flavor, tradition, human warmth, and fun take priority above all else—and we want you to experience it with all the basic information at your fingertips.
            </p>
            <p className="mb-3">
              Stay here for the most frequently asked questions about Cartagena and Colombia (FAQs), and let's debunk myths together:
            </p>
            <p>Below are some Cartagena FAQ&apos;s:</p>
          </div>

          {/* Q1 */}
          <div id="q1" className="scroll-mt-8">
            <h3 className="font-black text-lg mb-3" style={{ color: "#000" }}>
              1. How much should a taxi from the airport to the most popular areas cost?
            </h3>
            <p className="mb-3">
              Whether you arrive by air or land, there will always be people at each of these services to guide you with fair rates. For example, when you leave the airport, they will give you a ticket with the rates to the most popular areas of Cartagena.
            </p>
            <p className="mb-4">
              Make sure to confirm the fare before getting in so it matches; just ask: "Is it $18,000 colombian pesos to the historic center, is that okay?"
            </p>
            <p className="mb-4">
              Here is an approximate list of fares for the busiest neighborhoods in 2025. Each neighborhood varies in distance, and prices may change, but not far from reality:
            </p>

            {/* Fare table */}
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse" style={{ border: "1px solid #ccc" }}>
                <thead>
                  <tr style={{ backgroundColor: "#fff" }}>
                    <td colSpan={2} className="text-center py-3 px-4 font-semibold text-sm" style={{ border: "1px solid #ccc" }}>
                      Tarifas desde el Aeropuerto Internacional Rafael Nuñez, Cartagena<br />
                      <span>Fares from Rafael Núñez International Airport, Cartagena</span>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {taxiFares.map((row) => (
                    <tr key={row.route}>
                      <td className="py-2 px-4" style={{ border: "1px solid #ccc", width: "60%" }}>{row.route}</td>
                      <td className="py-2 px-4" style={{ border: "1px solid #ccc" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-xs italic" style={{ color: "#555" }}>Cartagena FAQS</p>
            </div>
          </div>

          {/* Q2 */}
          <div id="q2" className="scroll-mt-8">
            <h3 className="font-black text-lg mb-3" style={{ color: "#000" }}>
              2. Can I drink tap water?
            </h3>
            <p>
              The water in Cartagena is potable, safe, and meets all the regulations required by the Ministry of Housing and Aguas de Cartagena. However, many people prefer to buy their own bottled water from supermarkets—either out of personal preference or because they have sensitive digestive systems. We always recommend asking at the reception of your accommodation whether or not they advise drinking the tap water.
            </p>
          </div>

          {/* Q3 */}
          <div id="q3" className="scroll-mt-8">
            <h3 className="font-black text-lg mb-3" style={{ color: "#000" }}>
              3. Do I need an adapter to plug in my phone or laptop?
            </h3>
            <p>
              In Colombia, power outlets use type A and B plugs. If you&apos;re coming from the United States, where these are commonly used, you won&apos;t need an adapter. However, if you&apos;re coming from Australia, Europe, or the United Kingdom, you will need an adapter to charge all your electronic devices, such as phones, batteries, laptops, and more.
            </p>
          </div>

          {/* Q4 */}
          <div id="q4" className="scroll-mt-8">
            <h3 className="font-black text-lg mb-3" style={{ color: "#000" }}>
              4. Where should I exchange money?
            </h3>
            <p>
              This is definitely one of the most Cartagena FAQ&apos;s. Here we tell you all the details so you can exchange your money safely and effectively. Click here.
            </p>
          </div>

          {/* Q5 */}
          <div id="q5" className="scroll-mt-8">
            <h3 className="font-black text-lg mb-3" style={{ color: "#000" }}>
              5. Do they accept cards or is everything paid in cash?
            </h3>
            <p className="mb-3">
              Most commercial establishments accept credit or debit cards; however, many prefer cash due to bank commission fees. They usually display signs outside or inside the store indicating which cards they accept, so it&apos;s a good idea to ask in advance.
            </p>
            <p>
              For things like paying for bus rides, taxis, street vendors, and sometimes even day trips and accommodations on nearby islands, we recommend carrying some cash on hand—at least around <strong>30 USD</strong>—to avoid any inconvenience.
            </p>
          </div>

          {/* Q6 */}
          <div id="q6" className="scroll-mt-8">
            <h3 className="font-black text-lg mb-3" style={{ color: "#000" }}>
              6. Do I need vaccines to enter Colombia, especially Cartagena?
            </h3>
            <p>
              You don&apos;t need any mandatory vaccines to enter Colombia, but the <strong>Yellow Fever vaccine</strong> is recommended due to an increase in cases. However, if you plan to visit high-risk areas like the <strong>Sierra Nevada National Park, Tayrona Park,</strong> or various <strong>Amazon rainforest reserves</strong>, you must be vaccinated at least <strong>10 days in advance</strong>. Vaccination points are available at terminals and airports.
            </p>
          </div>

          {/* Q7 */}
          <div id="q7" className="scroll-mt-8">
            <h3 className="font-black text-lg mb-3" style={{ color: "#000" }}>
              7. How should I dress for my upcoming vacation in Cartagena?
            </h3>
            <p className="mb-3">
              Cartagena&apos;s tropical climate makes it essential to wear comfortable and lightweight clothing. We recommend light colors and breathable fabrics like cotton or linen, which help you stay cool, as the heat can sometimes be intense.
            </p>
            <p className="mb-3">
              During the day, wear shorts and loose-fitting t-shirts in light shades like beige or white. At night, you can play with more vibrant colors while still keeping your outfit light and fresh.
            </p>
            <p>
              The weather in Cartagena averages 27°C (80°F) with around 80% humidity, due to its proximity to the sea.
            </p>
          </div>

          {/* Q8 */}
          <div id="q8" className="scroll-mt-8">
            <h3 className="font-black text-lg mb-3" style={{ color: "#000" }}>
              8. Is Cartagena a safe place?
            </h3>
            <p className="mb-3">
              Probably the most Cartagena FAQ&apos;s. You&apos;ll find several police officers patrolling the most touristy areas, such as the Historic Center, Getsemaní, Bocagrande, and El Laguito.
            </p>
            <p className="mb-3">
              Always keep your belongings safe—carry a secure bag to avoid the common &quot;cosquilleo&quot; (pickpocketing).
            </p>
            <p className="mb-3">
              Everything offered to you on the street has a <strong>cost—do not accept anything without asking the price and checking the quality</strong>.
            </p>
            <p className="mb-3">
              Always remember to ask about prices <strong>beforehand</strong> for tours, taxis, street vendors, or anything else that could come with surprise charges.
            </p>
            <p className="mb-2 font-bold">Some tips:</p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>Don&apos;t keep your wallet or phone in your back pockets.</li>
              <li>Avoid wearing flashy or expensive accessories in public.</li>
              <li>Always keep an eye on your belongings at bars, restaurants, beaches, and malls.</li>
              <li>Store your money in different places—some in the hotel, a small pocket in your backpack, or even inside hidden compartments in your luggage. But don&apos;t keep all your money in one place (like your wallet), to avoid losing everything in case of theft.</li>
            </ul>
          </div>

          {/* Q9 */}
          <div id="q9" className="scroll-mt-8">
            <h3 className="font-black text-lg mb-3" style={{ color: "#000" }}>
              9. What is the situation with prostitution in Cartagena?
            </h3>
            <p className="mb-3">
              Prostitution is a sensitive issue in Cartagena. You may see many women around the Clock Tower involved in it, and unfortunately, this often leads to sexual exploitation of vulnerable women, teenagers, and girls.
            </p>
            <p className="mb-3">
              At La Carta, we are firmly against any form of exploitation of girls, boys, adolescents, women, and people in vulnerable situations. <strong>Do not support these practices</strong>.
            </p>
            <p>
              Some campaigns by the city government and organizations aimed at preventing human trafficking include <strong>#CartagenaSinTrata – Breaking chains, protecting lives</strong>, which involved refugees and migrants, host communities, public officials, and civil society organizations.
            </p>
          </div>

          {/* Q10 */}
          <div id="q10" className="scroll-mt-8">
            <h3 className="font-black text-lg mb-3" style={{ color: "#000" }}>
              10. What&apos;s the situation with drug trafficking in Cartagena?
            </h3>
            <p className="mb-3">
              You might be thinking from the outside that Colombia is a country of drug traffickers, danger, violence, and drugs. Clearly, we carry a heavy history, and very violent times were experienced in the past. But that was decades ago—today, the situation is much more regulated, and it&apos;s very unlikely you&apos;ll encounter gang violence in tourist neighborhoods. We&apos;re not in the &apos;90s anymore.
            </p>
            <p>
              Yes, drug sales can still be seen—just like in many places around the world. You simply need to stay alert and avoid places or situations like the ones we&apos;ll highlight in our guide: <strong>What NOT to do in Cartagena</strong>.
            </p>
          </div>

          {/* Q11 */}
          <div id="q11" className="scroll-mt-8">
            <h3 className="font-black text-lg mb-3" style={{ color: "#000" }}>
              11. What are the emergency or tourist service numbers?
            </h3>
            <p>
              At La Carta, we have a section where you can find all the most important emergency and contact numbers for your stay in Cartagena. Click here.
            </p>
          </div>

          {/* Q12 */}
          <div id="q12" className="scroll-mt-8">
            <h3 className="font-black text-lg mb-3" style={{ color: "#000" }}>
              12. Where are the departure points for the islands?
            </h3>
            <img
              src="/lacarta_images/Cartagena FAQs-1.jpg"
              alt="Departure points for islands"
              className="w-full rounded-xl mb-4 object-cover"
              style={{ maxHeight: 280 }}
            />
            <p className="text-xs italic mb-4" style={{ color: "#555" }}>Cartagena FAQs</p>
            <p className="mb-3">
              The two most popular piers for catching a boat—whether for accommodations or day trips—are:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Muelle de la Bodeguita</strong>: Located right in front of the Clock Tower, this pier has an average boarding fee of <strong>5 USD</strong>. Boats start departing from <strong>8:00 a.m.</strong>
              </li>
              <li>
                <strong>Muelle Turístico de Los Pegasos</strong>: Located along Cartagena&apos;s Bahía de las Ánimas, near Getsemaní and Parque del Centenario. Excursions to the islands and aquatic activities depart daily from here.
              </li>
            </ul>
          </div>

          {/* Q13 */}
          <div id="q13" className="scroll-mt-8">
            <h3 className="font-black text-lg mb-3" style={{ color: "#000" }}>
              13. What are the best hotels in Cartagena?
            </h3>
            <img
              src="/lacarta_images/Cartagena FAQs-2.jpg"
              alt="Best hotels in Cartagena"
              className="w-full rounded-xl mb-4 object-cover"
              style={{ maxHeight: 280 }}
            />
            <p className="text-xs italic mb-4" style={{ color: "#555" }}>Cartagena FAQs</p>
            <p>
              Here&apos;s our guide to help you choose your next stay among the <strong>best hotels in Cartagena</strong>.
            </p>
          </div>

          {/* Q14 */}
          <div id="q14" className="scroll-mt-8">
            <h3 className="font-black text-lg mb-3" style={{ color: "#000" }}>
              14. Which beaches should I visit in Barú and the Rosario Islands?
            </h3>
            <img
              src="/lacarta_images/Cartagena FAQs-3.jpg"
              alt="Beaches in Barú and Rosario Islands"
              className="w-full rounded-xl mb-4 object-cover"
              style={{ maxHeight: 280 }}
            />
            <p className="text-xs italic mb-4" style={{ color: "#555" }}>Cartagena FAQs</p>
            <p className="mb-3">
              You can&apos;t miss an amazing day trip to some of the region&apos;s most beautiful beaches. <strong>Here are our top recommendations for you from La Carta:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The best beaches in Barú</li>
              <li>The best beaches in the Rosario Islands</li>
            </ul>
          </div>

          {/* Q15 */}
          <div id="q15" className="scroll-mt-8">
            <h3 className="font-black text-lg mb-3" style={{ color: "#000" }}>
              15. What are the best hostels and Airbnbs in Cartagena?
            </h3>
            <img
              src="/lacarta_images/Cartagena FAQs-4.jpg"
              alt="Best hostels and Airbnbs in Cartagena"
              className="w-full rounded-xl mb-4 object-cover"
              style={{ maxHeight: 280 }}
            />
            <p className="text-xs italic mb-4" style={{ color: "#555" }}>Cartagena FAQs</p>
            <p className="mb-3">
              We&apos;ve carefully selected the top accommodations for you. Here are some amazing recommendations:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>The best hostels in Cartagena</li>
              <li>The best Airbnbs in Cartagena</li>
            </ul>
            <p className="font-bold">
              If you have any other questions, don&apos;t hesitate to contact us.
            </p>
            <p className="mt-2 text-xs italic" style={{ color: "#555" }}>La Carta: Cartagena FAQ&apos;s</p>
          </div>

        </main>
      </div>

    </div>
  );
}
