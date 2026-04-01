import Link from "next/link";
import { Map, Check } from "lucide-react";

export default function HelpMap() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Top teal banner ── */}
      <div className="w-full py-2 text-center text-sm font-bold" style={{ backgroundColor: "#3bbfad", color: "#fff" }}>
        Download our FREE Cartagena Travel Guide!
      </div>

      {/* ── Hero with teal overlay ── */}
      <div className="relative w-full" style={{ minHeight: 280, backgroundColor: "#3bbfad", backgroundImage: "url('/lacarta_images/help-banner.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        {/* overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(59,191,173,0.72)" }} />
        <div className="relative z-10 px-10 md:px-20 py-12 flex items-start gap-6">
          <Map size={64} strokeWidth={1.5} style={{ color: "#000", flexShrink: 0, marginTop: 4 }} />
          <div>
            <h1
              className="font-antigua font-black uppercase"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#000", letterSpacing: "0.06em", lineHeight: 1.1 }}
            >
              Cartagena Help Map
            </h1>
            <p className="mt-2 text-lg font-semibold" style={{ color: "#000" }}>
              Safe places to stay in Cartagena, Day &amp; Night
            </p>
            <p className="mt-3 text-sm">
              <span style={{ color: "#c0a030" }}><em>La Carta – Cartagena Culture &amp; Tourism</em></span>
              <span className="font-bold" style={{ color: "#000" }}> › Help Map</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Google Maps embed full-width with legend overlay ── */}
      <div className="relative w-full" style={{ height: 480 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.153014949835!2d-75.51952055000001!3d10.4094193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef62585f34a3513%3A0x34555ae56288c15f!2sPrado%2C%20Cartagena%2C%20Bolivar%2C%20Colombia!5e0!3m2!1sen!2s!4v1775027631612!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Safety legend */}
        <div
          className="absolute flex items-center gap-5 px-5 py-2 rounded-full bg-white shadow-md"
          style={{ bottom: 80, left: "50%", transform: "translateX(-50%)", border: "1px solid #ddd", zIndex: 10 }}
        >
          <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#000" }}>
            <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: "#22c55e" }} /> Safe
          </span>
          <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#000" }}>
            <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: "#f5c542" }} /> Caution
          </span>
          <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#000" }}>
            <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: "#e8534a" }} /> Danger
          </span>
        </div>

        {/* Need To Know box */}
        <div
          className="absolute bg-white rounded-xl shadow-lg p-5"
          style={{ bottom: 20, left: 20, zIndex: 10, width: 260, border: "1px solid #eee" }}
        >
          <p className="font-bold text-sm mb-2" style={{ color: "#d0a439" }}>Need To Know</p>
          <p className="font-bold text-sm mb-1" style={{ color: "#000" }}>Tourism</p>
          <p className="font-bold text-sm mb-3" style={{ color: "#000" }}>Night Life &amp; Food</p>
          <ol className="space-y-1">
            {["ATMs", "Casa De Cambio", "Police Stations", "Hospitals / Drs Bloodwork / Dentist", "Colectivo Pick Up Areas"].map((item, i) => (
              <li key={item} className="text-xs" style={{ color: "#000" }}>{i + 1}. {item}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* ── Featured location card ── */}
      <div className="px-8 md:px-16 py-8 max-w-5xl mx-auto">
        <div
          className="flex items-center justify-between gap-6 rounded-2xl p-6"
          style={{ border: "2px solid #f5c542", backgroundColor: "#fffdf0" }}
        >
          <div className="flex-1">
            <h3 className="font-black text-lg mb-1" style={{ color: "#000" }}>San Felipe de Barajas Fort</h3>
            <p className="text-sm mb-4" style={{ color: "#000" }}>
              Imposing hilltop fortress built in the 1600s with a complex tunnel system &amp; offering audio tours.
            </p>
            <button
              className="px-5 py-2 text-sm font-black uppercase tracking-widest border-2 hover:bg-gray-100 transition"
              style={{ borderColor: "#111", color: "#000" }}
            >
              Save Directions
            </button>
          </div>
          <div className="flex-shrink-0 rounded overflow-hidden" style={{ width: 180 }}>
            <img src="/lacarta_images/art-1.jpg" alt="San Felipe Fort" className="w-full h-full object-cover" style={{ height: 120 }} />
          </div>
        </div>
      </div>

      {/* ── Gold divider ── */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* ── Main heading ── */}
      <div className="py-10 text-center px-6">
        <h2
          className="font-antigua font-black uppercase"
          style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#000", letterSpacing: "0.06em" }}
        >
          Cartagena Help Map
        </h2>
      </div>

      {/* ── 2-col layout: sidebar + content ── */}
      <div className="px-8 md:px-16 pb-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[260px_1fr] gap-12">

        {/* Sidebar */}
        <aside>
          <h3 className="font-antigua font-black uppercase mb-2" style={{ fontSize: "1rem", color: "#000" }}>Cartagena Help Map</h3>
          <p className="text-sm font-semibold mb-4" style={{ color: "#000" }}>Need help finding your way around?</p>
          <ul className="space-y-2">
            {["SAFETY", "ENTERTAINMENT", "ART AND CULTURE"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check size={16} style={{ color: "#000" }} />
                <a href={`#${item.toLowerCase().replace(/ /g, "-")}`} className="text-sm font-bold hover:underline" style={{ color: "#000" }}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="space-y-8 text-sm leading-relaxed" style={{ color: "#000" }}>

          {/* Intro */}
          <div>
            <p className="text-base font-bold mb-2" style={{ color: "#000" }}>HELP MAP Guide: Cartagena Just One Click Away</p>
            <h2 className="font-antigua font-black text-2xl mb-4" style={{ color: "#000" }}>Need help finding your way around?</h2>
            <p className="mb-3">
              At La Carta, we've created an interactive map to make your life easier. Arriving in a new destination is always an adventure—full of excitement, the urge to explore everything right away, and of course, a bit of anxiety. You might even forget to thoroughly research the most important points for your stay, such as safety, police stations, medical centers, safe areas, and of course, Instagram-worthy spots.
            </p>
            <p className="mb-3">
              A map will always be our right hand anywhere we go—even in our own city. But this isn't just any map; it has everything you need for well-planned, safe, fun, and dreamy holidays.
            </p>
            <p className="font-bold mb-3">GUIA HELP MAPS</p>
            <p className="mb-3">
              This city is meant to be experienced with all your senses. And while this map helps you arrive prepared, what will truly make you return with a full heart are the experiences that weren't planned. Here, you'll live unique moments you won't find anywhere else.
            </p>
            <p className="mb-3">
              Let me give you an idea of what you'll find here in Cartagena: for me, La Heroica has the best of both worlds. First, there's the impressive Walled City, steeped in history and remarkable events, surrounded by a fortress that will simply take your breath away. In the historic center, you'll enjoy a complete experience—on every corner you'll discover warm, welcoming spots, culinary hideaways, and unique experiences waiting to be explored.
            </p>
            <p className="mb-3">
              On the other side of the fun, we have the beautiful beaches that surround the city. I say you get the best of both worlds because at night you can stroll under the moonlight along charming cobblestone streets, and during the day you can head out on an unforgettable excursion to the beaches of Barú, Tierra Bomba, the Rosario Islands, or the city beaches like Bocagrande, Castillo, Laguito, Crespo, Marbella, and La Boquilla.
            </p>
            <p className="mb-3">
              Here's my favorite blog on the{" "}
              <Link href="/blog" style={{ color: "#d0a439" }} className="hover:underline">best beaches in the Rosario Islands and Barú</Link>.
              {" "}This city has everything a traveler could be looking for. I can tell you this: there's room here for everyone—those who love traveling light and staying in cool hostels to meet people from around the world, those who live for water adventures, those who can't imagine their stay without luxury, and those who love art, history, and culture.
            </p>
            <p>Save this section so you always have quick and easy access to the information.</p>
          </div>

          {/* SAFETY */}
          <div id="safety">
            <h3 className="font-antigua font-black uppercase text-xl mb-4" style={{ color: "#000" }}>Safety</h3>
            <p className="mb-3">
              In Cartagena, there are completely safe neighborhoods, each with its own charm and warm atmosphere. La Heroica has everything you need to enjoy peaceful walks through its streets—the Historic Center, Getsemaní, the Northern Zone, Bocagrande, Laguito, and more dreamy areas.
            </p>
            <p className="mb-3">
              But, as in any city, there are neighborhoods where you need to be more cautious, and others that are better avoided altogether. That's why we explain how to easily read our map if you want to identify which areas are definitely not for you—or for foreign visitors in general.
            </p>
            <ul className="space-y-1 mb-4">
              <li className="font-bold" style={{ color: "#22c55e" }}>GREEN: SAFE</li>
              <li className="font-bold" style={{ color: "#d0a439" }}>YELLOW: USE CAUTION</li>
              <li className="font-bold" style={{ color: "#e8534a" }}>RED: DANGEROUS – DO NOT GO</li>
            </ul>
            <p className="mb-3">
              There are certain neighborhoods in Cartagena I would advise visitors to avoid. The most dangerous areas are El Paraíso, La Magdalena sector, La María, Olaya, and El Pozón. Do not let anyone take you there.{" "}
              <Link href="/blog" style={{ color: "#d0a439" }} className="hover:underline">Click here to learn more about safety in Cartagena.</Link>
            </p>
            <p className="mb-3">
              In addition to these warnings, we've also marked key points of interest and essential places for your next visit, such as currency exchange offices, docks, major monuments, banks, hospitals, police stations, and more.
            </p>
            <p className="mb-3">
              Although Cartagena is generally a calm and welcoming city, it's always useful to know where the nearest police stations are, as well as other essential locations for your trip. Our map includes:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4 pl-2">
              <li>Police stations closest to tourist areas.</li>
              <li>Tourist assistance centers.</li>
              <li>The main bus terminal and collective transport boarding points.</li>
              <li>The most important docks if you want to take a trip to the islands.</li>
              <li>Shopping centers where you can also find banks, customer service points, and plenty of people ready to help you.</li>
            </ul>
            <p className="mb-3">
              When traveling internationally, it's normal (and advisable) to have medical insurance in case of an emergency or any need. Here we've listed some of the most centrally located medical centers in Cartagena:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Clínica Medihelp Services: Bocagrande</li>
              <li>Hospital Universitario del Caribe: Zaragocilla</li>
              <li>Clínica Cartagena del Mar: Northern Zone</li>
            </ul>
          </div>

          {/* ENTERTAINMENT */}
          <div id="entertainment">
            <h3 className="font-antigua font-black uppercase text-xl mb-5" style={{ color: "#000" }}>Entertainment</h3>

            {/* 2-photo grid */}
            <div className="grid grid-cols-2 gap-2 mb-5" style={{ maxWidth: 460 }}>
              <img src="/lacarta_images/entertainment-1.jpg" alt="Restaurant Cartagena" className="w-full h-40 object-cover rounded" />
              <img src="/lacarta_images/entertainment-1.jpg" alt="Food Cartagena" className="w-full h-40 object-cover rounded" />
            </div>

            <p className="font-bold mb-2" style={{ color: "#000" }}>GUIA HELP MAPS:</p>
            <p className="mb-3">
              We've selected the best restaurants for you, luxury hotels, and simply unforgettable destinations for your next stay in <em>La Heroica</em>. The best rooftop terraces where you can watch the most breathtaking sunsets with a delicious cocktail in hand—and end the day at the most vibrant clubs in Cartagena. Click below to discover more of <em>La Heroica's</em> treasures:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4 pl-2">
              <li><Link href="/hotels" style={{ color: "#d0a439" }} className="hover:underline">The Best Hotels in Cartagena</Link></li>
              <li><Link href="/beaches" style={{ color: "#d0a439" }} className="hover:underline">The Best Beaches in the Rosario Islands and Barú</Link></li>
              <li><Link href="/hotels" style={{ color: "#d0a439" }} className="hover:underline">Hotels with the Best Views in Cartagena</Link></li>
            </ul>
            <p className="mb-3">
              The nightlife in Cartagena is simply wild—you can find, all on the same block, nightclubs with the flavor of champeta, the atmosphere of salsa, and the irresistible beats of reggaeton. Here, there's something for every taste.
            </p>
            <p className="mb-3">
              And let's not forget the gastronomic delights you'll find here—it's a feast for your palate and all your senses. Check out our blog:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><Link href="/blog" style={{ color: "#d0a439" }} className="hover:underline">Cartagena's Best Gastronomic Experiences</Link></li>
              <li><Link href="/blog" style={{ color: "#d0a439" }} className="hover:underline">The Best Italian Food in Cartagena</Link></li>
              <li><Link href="/blog" style={{ color: "#d0a439" }} className="hover:underline">The Best Sushi</Link></li>
            </ul>
          </div>

          {/* ART AND CULTURE */}
          <div id="art-and-culture">
            <h3 className="font-antigua font-black uppercase text-xl mb-5" style={{ color: "#000" }}>Art and Culture</h3>

            <img src="/lacarta_images/art-1.jpg" alt="Cartagena Art and Culture" className="w-full rounded mb-5 object-cover" style={{ maxHeight: 320 }} />

            <p className="font-bold mb-2" style={{ color: "#000" }}>GUIA HELP MAPS:</p>
            <p className="mb-3">
              I think we can all agree—you can't come to Cartagena without visiting its most important cultural landmarks. These are iconic, must-see tourist spots that should absolutely be on your itinerary.
            </p>
            <p className="mb-3">
              Its colorful, cobblestone streets tell a magical story. The monuments and fortresses breathe history, and on our map, we highlight these points and more:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4 pl-2">
              <li>Castillo de San Felipe de Barajas</li>
              <li>Clock Tower and Plaza de los Coches</li>
              <li>Gold Museum</li>
              <li>Cartagena Historical Museum</li>
              <li>Museum of Modern Art</li>
              <li>Caribbean Naval Museum</li>
              <li>India Catalina and Los Pegasos Pier</li>
            </ul>
            <p className="mb-3">
              Exploring Cartagena goes beyond visiting the beautiful Walled City, its crystal-clear beaches, or its typical Caribbean cuisine. It's about immersing yourself in the local culture—discovering its history filled with emotions, anecdotes, and above all, a deep love for the city.
            </p>
            <p className="mb-3">
              Cartagena is best experienced when you're well-prepared, and here at La Carta, we bring you our most complete help map, absolutely packed with useful, accessible, and up-to-date information.
            </p>
            <p>
              At La Carta, we want your vacation in Cartagena to be simply unforgettable.{" "}
              <Link href="/contact" style={{ color: "#d0a439" }} className="hover:underline">Contact us if you need any assistance.</Link>
              {" "}Explore, connect, and make every moment in Cartagena an unforgettable experience!
            </p>
          </div>

        </main>
      </div>

    </div>
  );
}
