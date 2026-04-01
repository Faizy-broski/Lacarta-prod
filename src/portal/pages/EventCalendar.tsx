import Link from "next/link";
import { Calendar } from "lucide-react";

const tableEvents = [
  {
    img: "/lacarta_images/music-3.jpg",
    badge: "Special",
    title: "A Magic Night Party Bus Experience in Cartagena",
    date: "February 9, 2026 7:00 PM – December 27, 2025 10:30 PM",
    venue: "Camellón de los Mártires Cl. 31 #71-48, El Centro,",
    bookHref: "#",
  },
  {
    img: "/lacarta_images/music-5.jpg",
    badge: "Special",
    title: "Full-Day Rosario Islands Including Barú, Bocachica & Playa Blanca",
    date: "February 9, 2026 7:30 AM – February 28, 2025 4:00 PM",
    venue: "Todomar CHL Marina Bocagrande 2nda, Cartagena de Indias,",
    bookHref: "#",
  },
  {
    img: "/lacarta_images/music-1.jpg",
    badge: "Special",
    title: "Cartagena Night of Fire and Drums Festival",
    date: "November 10, 2025 8:00 PM – November 10, 2025 11:00 PM",
    venue: "Plaza de la Trinidad, Getsemaní, Cartagena",
    bookHref: "#",
  },
  {
    img: "/lacarta_images/music-4.jpg",
    badge: "Special",
    title: "Independence Day Parade & Cartagena Festivities",
    date: "November 11, 2025 9:00 AM – November 11, 2025 6:00 PM",
    venue: "Centro Histórico, Cartagena de Indias",
    bookHref: "#",
  },
];

const upcomingEvents = [
  { month: "Nov", day: "6",  title: "Mesón Cartagenero",                img: "/lacarta_images/music-2.jpg" },
  { month: "Nov", day: "11", title: "Independence Day of Cartagena",     img: "/lacarta_images/music-1.jpg" },
  { month: "Nov", day: "11", title: "Cartagena New Years Getaway 2025",  img: "/lacarta_images/music-6.jpg" },
  { month: "Jan", day: "4",  title: "Cartagena International Music Festival", img: "/lacarta_images/music-3.jpg" },
  { month: "Jan", day: "30", title: "Hay Festival Cartagena de Indias",  img: "/lacarta_images/music-4.jpg" },
  { month: "Jan", day: "26", title: "Frito Festival 2025",               img: "/lacarta_images/music-5.jpg" },
];

const festivals = [
  {
    num: "1",
    title: "Independence Festival or November Festivities 2025",
    dates: "From November 11 to November 17",
    body: `Cartagena's Independence carries a deep historical and cultural significance, which is reflected in the heart of the events celebrated during the first days of November. These festivities commemorate Cartagena's Independence, which took place on November 11, 1811, following the emancipation route that began in 1810 with the expulsion of Spanish Governor Francisco de Montes.\n\nThe celebration culminates in the week of November 11, but it is important to note that the festivities' agenda starts in October with preludes in three neighborhoods, followed by several events across the city. The program includes the Jorge García Usta School Festival, the Night of Fire and Drum Celebration, the Student Parade honoring Independence Heroes, and the Night of Tradition.`,
    history: "The November festivities commemorate Cartagena's Independence after a path of emancipation from Spain. It not only had a national impact, being the first population of the viceroyalty to seek self-government, but it also played a significant role in South America's struggle for independence from the Spanish in the 19th century.",
  },
  {
    num: "2",
    title: "Bando and Coronation Festivities",
    dates: "November 10 at Plaza de la Trinidad",
    body: "We are a people of festive tradition with historical memory rooted in our independence. Just a year after signing the Act of Independence, we began celebrating the November festivities. Though they have transformed over time, many key elements remain.\n\nFrom 1930 onwards, the November festivities became more focused on the national beauty pageant than on independence itself. However, in recent years, there has been more emphasis on historical aspects, with parades and concerts.",
    history: "The Bando and the election of Popular Queens and the Queen of Independence are cultural expressions dating back to the Republican era, blending beauty, music, and color to represent our ethnicity.",
  },
  {
    num: "3",
    title: "Cartagena International Music Festival",
    dates: "From January 4 to January 12",
    body: 'The annual Music Festival will be held from January 4 to January 12, 2025, in Cartagena, Colombia. The theme of the Festival is "Sounds of the Sea," showcasing music and compositions from the Iberian Peninsula, particularly Spain and Portugal.',
    history: "According to the Bank of the Republic, staging historical memory through poetic compositions, music, speeches, and civic processions facilitates a collective memory that evokes pride, identity, and celebration.",
  },
  {
    num: "4",
    title: "Frito Festival 2025",
    dates: "From January 26 to February 4",
    body: "This festival traditionally takes place during the Candlemas celebrations, integrating religious, cultural, and gastronomic elements celebrated in the city in honor of the Virgin of Candelaria. Its goal is to preserve the city's cultural heritage and consolidate its multi-ethnic and multicultural identity, as reflected in local cuisine.",
    history: "Celebrated continuously for over 35 years, the Frito Festival is held during the Candlemas celebrations, from January 26 to February 4. The city's patron saint is the Black Virgin of Candelaria.",
  },
  {
    num: "5",
    title: "Dulce Festival 2025",
    dates: "March 31 at Parque del Centenario",
    body: "Held during Holy Week, this is a delightful gastronomic tradition featuring a variety of sweets made from the region's tropical fruits. You can find these sweets in the Portal de los Dulces and the colonial streets of the historic center, especially in Plaza de la Aduana.",
    history: "Since colonial times, during Holy Week, Cartagena women and their mostly African-descended servants have celebrated Easter and Jesus' Resurrection by making sweets with the vast variety of exotic fruits from the region.",
  },
  {
    num: "6",
    title: "Cartagena Film Festival",
    dates: "From April 16 to April 21",
    body: "The Cartagena Film Festival (FICCI) is a free cinematic event with a social mission that reflects the circumstances of the country and the world. It is the largest and most representative film festival in Latin America. The 63rd edition will feature more than 170 screenings, 26 world premieres, 37 Latin American premieres, and 50 national premieres.",
    history: "Founded in 1960, it is the oldest film festival in Latin America. Throughout its history, it has supported and promoted innovation and the renewal of dramaturgy and cinematography in Ibero-America and the world.",
  },
  {
    num: "7",
    title: "Hay Festival of Cartagena de Indias",
    dates: "From January 30 to February 2",
    body: "Under a pleasant temperature, literature takes over Cartagena de Indias, paying tribute to the written word. Attendees enjoy novels and poetry, as well as plays, exhibitions, workshops, and conferences. It lasts for four days and begins every year during the last week of January.",
    history: "The Hay Festival of Cartagena de Indias is one of the international versions of the Hay Festival of Literature and Arts, which began in Hay-on-Wye in Wales in 1988. In Cartagena, it has become one of the best festivals in the world, starting in 2006.",
  },
];

export default function EventCalendar() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Teal banner ── */}
      <div className="w-full py-2 text-center text-sm font-bold" style={{ backgroundColor: "#3bbfad", color: "#fff" }}>
        Download our FREE Cartagena Travel Guide!
      </div>

      {/* ── Hero: red/coral overlay ── */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: 340 }}>
        <img src="/lacarta_images/music-4.jpg" alt="Cartagena Events" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(140,20,10,0.72)" }} />
        <div className="relative z-10 px-6 md:px-16 py-16 flex items-start gap-6">
          <Calendar size={72} strokeWidth={1.4} style={{ color: "#fff", flexShrink: 0, marginTop: 4 }} />
          <div>
            <h1
              className="font-antigua font-black uppercase"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", letterSpacing: "0.06em", lineHeight: 1.1 }}
            >
              Cartagena Event Calendar
            </h1>
            <p className="mt-2 text-lg font-semibold" style={{ color: "#fce4e0" }}>
              Integrate the top Events with your calendar.
            </p>
            <p className="mt-3 text-sm">
              <span style={{ color: "#f8b8b0" }}><em>La Carta – Cartagena Culture &amp; Tourism</em></span>
              <span className="font-bold" style={{ color: "#fff" }}> › Cartagena Event Calendar</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Events table ── */}
      <section className="px-4 md:px-10 py-10 max-w-[1400px] mx-auto">
        {/* Table header – desktop only */}
        <div
          className="hidden md:grid text-base font-black items-center px-4 py-3 rounded-full mb-3"
          style={{ gridTemplateColumns: "80px 140px 1fr 220px 200px 180px", backgroundColor: "#f5c542", color: "#000" }}
        >
          <span>Image</span>
          <span>All Types ∨</span>
          <span>Events</span>
          <span>Date</span>
          <span>Venue</span>
          <span className="text-right">Action</span>
        </div>

        {tableEvents.map((ev, i) => (
          <div key={i}>
            {/* Mobile card */}
            <div className="md:hidden flex gap-3 px-4 py-4 mb-3 rounded" style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa", border: "1px solid #eee" }}>
              <img src={ev.img} alt={ev.title} className="w-20 h-20 object-cover rounded flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="px-2 py-0.5 rounded text-xs font-black inline-block mb-1" style={{ backgroundColor: "#f5c542", color: "#000" }}>{ev.badge}</span>
                <p className="font-semibold text-base leading-tight mb-1" style={{ color: "#000" }}>{ev.title}</p>
                <p className="text-sm mb-0.5" style={{ color: "#555" }}>{ev.date}</p>
                <p className="text-sm mb-2" style={{ color: "#555" }}>{ev.venue}</p>
                <div className="flex flex-col gap-1.5">
                  <Link href={ev.bookHref} className="text-center text-sm font-black py-1.5 px-4 rounded hover:brightness-110 transition" style={{ backgroundColor: "#3bbfad", color: "#000" }}>
                    Book Now
                  </Link>
                  <button className="text-sm font-black py-1.5 px-4 rounded hover:bg-gray-700 transition" style={{ backgroundColor: "#111", color: "#fff" }}>
                    Add to Calendar
                  </button>
                </div>
              </div>
            </div>
            {/* Desktop row */}
            <div
              className="hidden md:grid items-center px-4 py-4 mb-2 rounded"
              style={{ gridTemplateColumns: "80px 140px 1fr 220px 200px 180px", backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa", border: "1px solid #eee" }}
            >
              <img src={ev.img} alt={ev.title} className="w-16 h-14 object-cover rounded" />
              <span>
                <span className="px-3 py-1 rounded text-sm font-black" style={{ backgroundColor: "#f5c542", color: "#000" }}>{ev.badge}</span>
              </span>
              <span className="text-base font-semibold pr-4" style={{ color: "#000" }}>{ev.title}</span>
              <span className="text-sm" style={{ color: "#000" }}>{ev.date}</span>
              <span className="text-sm" style={{ color: "#000" }}>{ev.venue}</span>
              <div className="flex flex-col gap-1.5">
                <Link href={ev.bookHref} className="text-center text-sm font-black py-1.5 px-4 rounded hover:brightness-110 transition" style={{ backgroundColor: "#3bbfad", color: "#000" }}>
                  Book Now
                </Link>
                <button className="text-sm font-black py-1.5 px-4 rounded hover:bg-gray-700 transition" style={{ backgroundColor: "#111", color: "#fff" }}>
                  Add to Calendar
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Gold divider ── */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* ── Upcoming Events grid ── */}
      <section className="px-4 md:px-10 py-14 max-w-[1400px] mx-auto">
        <h2
          className="font-antigua font-black uppercase text-center mb-10"
          style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#000", letterSpacing: "0.06em" }}
        >
          Upcoming Events in Cartagena
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((ev) => (
            <div key={ev.title} className="rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition">
              <div className="relative">
                <img src={ev.img} alt={ev.title} className="w-full object-cover" style={{ height: 220 }} />
              </div>
              <div className="flex items-center gap-4 px-4 py-3" style={{ backgroundColor: "#fff" }}>
                <div
                  className="flex-shrink-0 flex flex-col items-center justify-center rounded text-white text-center"
                  style={{ backgroundColor: "#3bbfad", width: 52, height: 52, padding: 4 }}
                >
                  <span className="text-xs font-semibold leading-none">{ev.month}</span>
                  <span className="text-xl font-black leading-none">{ev.day}</span>
                </div>
                <p className="font-black text-base" style={{ color: "#000" }}>{ev.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Gold divider ── */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* ── Cartagena Events and Festivals 2025 article ── */}
      <section className="px-4 md:px-10 py-14 max-w-[1400px] mx-auto">
        <h2
          className="font-antigua font-black text-center mb-8"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: "#000" }}
        >
          Cartagena Events and Festivals in 2025...
        </h2>

        <div className="space-y-4 text-base leading-relaxed mb-12" style={{ color: "#000" }}>
          <p>I come from Cartagena; vibrant, serene, historical, cultural, musical, magical, and realistic. I belong to this Caribbean part of my country, where the heat and salty air will seduce you alongside its sea and sunsets filled with beautiful colors. I invite you to stroll through its streets and colonial balconies, which will captivate you with their vibrant atmosphere and rhythmic music. Among drums, flutes, accordions, and maracas.</p>
          <p>Here, the devotion to parties, festivals, and celebrations will lure you into a carefree, romantic, and yet cultured environment, also business-minded and entrepreneurial.</p>
          <p>For me, Cartagena is everything, which is why I invite you to discover every corner, its people, and its projects.</p>
          <p>Below, I offer you a list of the vibrant events that Cartagena has prepared for locals and visitors during 2025.</p>
          <p>The festive spirit of the people of Cartagena and the Caribbean, in general, stems from our ethnic and cultural fusion, inherited from Europeans, mainly Spain (Andalusia and Castile), Africans (Congo, Ghana, Nigeria), and Indigenous peoples (Calamary-Caribbean).</p>
          <p>Colombians, in general, are joyful and optimistic; the people of the Caribbean coast are festive, and Cartageneros, in particular, are a constant celebration. The tropical man enjoys life and recognizes the privilege of being who he is, appreciates his surroundings, protects his family, and is welcoming and protective of what is his, without being reluctant to share, based on respect and tolerance.</p>
          <p>The coexistence of races makes us welcoming and communicative people, which we express in our cuisine—Castilian, maritime, rural, and exotic. With distinctive aromas and flavors that delight even the most demanding palates.</p>
          <p>I won't extend further, it's time for you to experience for yourself the exuberance of our landscapes, the warmth of its people, vibrant music and festivals, and the dishes with their fusion of flavors. I invite you to join me on this adventure; the exciting festivals and events prepared for 2025 in this traditional and festive Cartagena will be something you will never forget.</p>
          <p style={{ color: "#000" }}>So, to enjoy all the events and festivals in 2025, we have an essential list below of what you must do to have the best experience.</p>
        </div>

        {/* Events in Cartagena 2025 */}
        <hr style={{ borderColor: "#ddd", marginBottom: 32 }} />
        <h3 className="font-antigua font-black text-2xl mb-2" style={{ color: "#000" }}>Events in Cartagena 2025</h3>
        <p className="text-base mb-8" style={{ color: "#000" }}>The Seven Most Anticipated Events in Cartagena for 2025:</p>

        <div className="space-y-10">
          {festivals.map((f) => (
            <div key={f.num}>
              <p className="font-black text-base mb-1" style={{ color: "#000" }}>
                {f.num}. {f.title}{" "}
                <em className="font-normal text-sm" style={{ color: "#000" }}>{f.dates}</em>
              </p>
              {f.body.split("\n\n").map((para, i) => (
                <p key={i} className="text-base leading-relaxed mb-3" style={{ color: "#000" }}>{para}</p>
              ))}
              <p className="text-sm font-black mb-1" style={{ color: "#000" }}>A bit of history</p>
              <p className="text-base leading-relaxed" style={{ color: "#000" }}>{f.history}</p>
            </div>
          ))}
        </div>

        {/* Useful Tips */}
        <hr style={{ borderColor: "#ddd", margin: "40px 0 24px" }} />
        <h3 className="font-antigua font-black text-2xl mb-4" style={{ color: "#000" }}>Useful Tips</h3>
        <div className="space-y-3 text-base leading-relaxed" style={{ color: "#000" }}>
          <p>Cartagena is located on the northern coast of Colombia in the Caribbean, so its climate is semi-arid, warm, and dry, although the breeze makes it pleasant. There are two main seasons and a transitional one: the rainy season (from May to November); the dry season, with no rainfall (starting in December and ending in April); and a transition period with occasional rain.</p>
          <p>If you ask me when the best time to visit Cartagena is, I would say it depends on your interests. Many people visit during the dry season from December to April.</p>
          <p>The average temperature ranges between 30 and 32 degrees Celsius. From December to April, it's cooler, around 24 to 29 degrees. In the afternoons, there is usually a breeze, so shorts are recommended during the day, along with hats or caps, and long sleeves in the evening. At all times, comfortable shoes such as sandals or walking shoes are advised, as the streets in the historic center are paved or made of stone or brick. Drink plenty of water to avoid dehydration, allowing you to fully enjoy your fabulous stay.</p>
        </div>
      </section>

    </div>
  );
}
