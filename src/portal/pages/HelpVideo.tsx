import Link from "next/link";
import { Check } from "lucide-react";

const sidebarLinks = [
  { label: "Must-Do Experiences in Cartagena", bold: true, href: "#must-do" },
  { label: "Gastronomy", href: "#gastronomy" },
  { label: "Culture and Art", href: "#culture" },
  { label: "The best beaches of Cartagena", href: "#beaches" },
  { label: "The best hotels of Cartagena", href: "#hotels" },
  { label: "The Most Beautiful Neighborhoods of Cartagena", href: "#neighborhoods" },
];

const topLists = [
  "Top 12 Things to Do in Cartagena",
  "Top 5 Instagram-Worthy Spots in Cartagena",
  "The Most Beautiful Sunsets to Watch as a Couple",
  "Five Romantic Plans to Share with Your Partner",
  "The Best Hotels for Families with Kids",
  "First Time in Cartagena? Top 10 Must-Sees",
];

export default function HelpVideo() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Teal banner ── */}
      <div className="w-full py-2 text-center text-sm font-bold" style={{ backgroundColor: "#3bbfad", color: "#fff" }}>
        Download our FREE Cartagena Travel Guide!
      </div>

      {/* ── Hero: gold overlay ── */}
      <div
        className="relative w-full"
        style={{ minHeight: 240, backgroundColor: "#b8860b", backgroundImage: "url('/lacarta_images/help-videp-banner.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(210,165,30,0.72)" }} />
        <div className="relative z-10 px-10 md:px-20 py-12 flex items-start gap-6">
          {/* Luggage/kit SVG icon */}
          <svg width="72" height="72" viewBox="0 0 64 64" fill="none" style={{ flexShrink: 0, marginTop: 4 }}>
            <rect x="14" y="22" width="36" height="30" rx="4" stroke="#000" strokeWidth="2.2" fill="none" />
            <path d="M22 22V17a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v5" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="32" y1="29" x2="32" y2="45" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="24" y1="37" x2="40" y2="37" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <div>
            <h1
              className="font-antigua font-black uppercase"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#000", letterSpacing: "0.06em", lineHeight: 1.1 }}
            >
              Cartagena Help Video
            </h1>
            <p className="mt-2 text-lg font-semibold" style={{ color: "#000" }}>
              Watch our help video to prepare yourself for your trip to cartagena
            </p>
            <p className="mt-3 text-sm">
              <span style={{ color: "#7a5500" }}><em>La Carta – Cartagena Culture &amp; Tourism</em></span>
              <span className="font-bold" style={{ color: "#000" }}> › Cartagena Help Video</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Center headings ── */}
      <div className="py-10 text-center px-6">
        <h2
          className="font-antigua font-black uppercase"
          style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#000", letterSpacing: "0.06em" }}
        >
          Cartagena Travel Guide
        </h2>
        <p className="mt-2 text-base" style={{ color: "#000" }}>Getting Around Cartagena</p>
      </div>

      {/* ── Gold divider ── */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* ── 2-col: sidebar + content ── */}
      <div className="px-4 md:px-10 py-14 pb-20 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12">

        {/* Sidebar */}
        <aside className="self-start sticky top-8">
          <p className="font-black text-base mb-5 uppercase" style={{ color: "#000" }}>On This Page</p>
          <ul className="space-y-3">
            {sidebarLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`text-base hover:underline ${link.bold ? "font-black" : ""}`}
                  style={{ color: "#000" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="space-y-12 text-base leading-relaxed" style={{ color: "#000" }}>

          {/* Videos intro */}
          <div>
            <h3
              className="font-black uppercase mb-1"
              style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "#000", letterSpacing: "0.05em" }}
            >
              Videos To Explore Cartagena Before You Come To Enjoy It
            </h3>
            <p className="text-sm font-semibold mb-5" style={{ color: "#000" }}>HELP VIDEO GUIDE</p>

            {/* 2-image grid */}
            <div className="grid grid-cols-2 gap-2 mb-6" style={{ maxWidth: 520 }}>
              <img src="/lacarta_images/help-video-1.jpg" alt="Cartagena" className="w-full h-48 object-cover rounded" />
              <img src="/lacarta_images/help-video-2.jpg" alt="Cartagena streets" className="w-full h-48 object-cover rounded" />
            </div>

            <p className="mb-3">
              Do you love watching videos to picture your next dream destination? Join us as we tour Cartagena before you experience it in person. Let's explore its beaches, cobblestone streets, luxurious hotels, and crystal-clear waters. We'll give you a taste of what it feels like to be here—but keep in mind, it's a thousand times better when you live it yourself.
            </p>
            <p className="mb-3">
              You're in the right place. We want to share plenty of guides and visual resources showcasing everything Cartagena has to offer you. For me, Cartagena awakens unique sensations unlike any other city. Its historic center is warm and full of history. Its beaches and blue waters soothe the soul. Its cuisine and cocktails blend perfectly for an unforgettable night—always accompanied by music, because in Cartagena, it never stops.
            </p>
            <p className="mb-3">
              All this sounds beautiful, but we believe that an image—and especially a video—is worth more than all the words I could write here. Let me tell you a bit about the video categories, but go ahead and dive in to see the wonders of "La Heroica."
            </p>
            <p>
              Here you'll find a rich selection of videos featuring the best beaches, the top tours through the Walled City, the most amazing day trips to the Rosario Islands and Barú, the charm of the historic center, and the lively vibe of the coolest neighborhood—Getsemaní.
            </p>
          </div>

          {/* Must-Do Experiences */}
          <div id="must-do">
            <h3 className="font-antigua font-black uppercase text-xl mb-1" style={{ color: "#000" }}>
              Must-Do Experiences in Cartagena
            </h3>
            <p className="text-sm font-semibold mb-5" style={{ color: "#000" }}>HELP VIDEO GUIDE</p>

            <img src="/lacarta_images/help-video-3.jpg" alt="Cartagena Experiences" className="w-full rounded mb-5 object-cover" style={{ maxHeight: 280 }} />

            <p className="mb-3">
              The videos you'll find here are organized to show you Cartagena from multiple angles. We'll take you on complete tours of the Historic Center, that colonial heart where time seems to have stood still. Cobblestone streets, flower-adorned balconies, plazas full of history, centuries-old churches, and a local energy that blends the old with the new.
            </p>
            <p>
              You'll also see guided tours on foot, by bike, and even on a "chiva rumbera" bus, so you can experience the city in different ways, both day and night. Some focus on history, others on urban art, gastronomy, or the nightlife scene. If food is your top priority, there are street food tours featuring the most iconic spots and local places serving typical Caribbean cuisine. They all have one thing in common: they show you Cartagena with passion, through the eyes of those who know and love it.
            </p>
          </div>

          {/* Gastronomy */}
          <div id="gastronomy">
            <h3 className="font-antigua font-black uppercase text-xl mb-1" style={{ color: "#000" }}>Gastronomy</h3>
            <p className="text-sm font-semibold mb-5" style={{ color: "#000" }}>HELP VIDEO GUIDE</p>
            <p className="mb-3">
              For me, eating in Cartagena is a sensory explosion that I highly recommend you never miss. And the best way to show it is by seeing it in action: dishes prepared right before the camera, mouth-watering ceviches, crispy egg arepas at the first bite, and cocktails that look like works of art—and best of all, they're delicious. Not overly sweet at all.
            </p>
            <p>
              Our selection of food videos takes you to the most famous restaurants, but also to those hidden spots only locals know. We'll show you typical dishes, international cuisine, vegetarian and vegan menus, signature bars, book cafés, and even popular markets like Bazurto.
            </p>
          </div>

          {/* Culture and Art */}
          <div id="culture">
            <h3 className="font-antigua font-black uppercase text-xl mb-4" style={{ color: "#000" }}>Culture and Art</h3>
            <p className="mb-3">
              Cartagena cannot be understood without its people. That's why we've also included videos that show the city's most authentic and human side. The Palenquera women, living icons of Afro-Colombian culture, sharing their stories. We'll take you to perfect spots to dance champeta, watch spontaneous street dances, and understand why Getsemaní is much more than a neighborhood with beautiful murals—it's the coolest neighborhood in Colombia and one of the most amazing in the world.
            </p>
            <p>
              In this section, the videos explore the city's cultural identity: its festivals, traditions, characters, and energy. There's also room to see cultural tours to the most important museums, key sites of Cartagena's colonial history, and much more.
            </p>
          </div>

          {/* Beaches */}
          <div id="beaches">
            <h3 className="font-antigua font-black uppercase text-xl mb-1" style={{ color: "#000" }}>
              The best beaches of Cartagena
            </h3>
            <p className="text-sm font-semibold mb-5" style={{ color: "#000" }}>HELP VIDEO GUIDE</p>

            <img src="/lacarta_images/help-video-4.jpg" alt="Cartagena Beaches" className="w-full rounded mb-5 object-cover" style={{ maxHeight: 280 }} />

            <p className="mb-3">
              No trip to Cartagena is complete without a day of sun, sea, and sand. At La Carta, we love the beaches that surround La Heroica. We've dedicated entire pages to talk about the best beaches, and here we want to show you videos so you can try to feel the warmth of their white sand and the freshness of their waters right from home. A little craving to book your tickets straight to paradise.
            </p>
            <p className="mb-3">
              The videos will take you to Barú, Playa Blanca, Cholón, Tierrabomba, Bocachica, and of course, the famous Rosario Islands. You'll see what the water really looks like (spoiler: it's crystal-clear and turquoise), what tours and water sports you can enjoy (snorkeling, paddleboarding, yacht parties, etc.), and the kind of vibe you can expect at each spot (peaceful, festive, natural, or cultural).
            </p>
            <p>
              Plus, you'll find recommendations on what to bring, how to get there, and when to visit, so you can make choices based on your travel style.
            </p>
          </div>

          {/* Hotels */}
          <div id="hotels">
            <h3 className="font-antigua font-black uppercase text-xl mb-4" style={{ color: "#000" }}>
              The best hotels of Cartagena
            </h3>
            <p className="mb-3">
              Cartagena offers one of the most interesting hotel selections in Colombia: from boutique hotels in 17th-century colonial houses to modern beachfront resorts with infinity pools. Our videos showcase the best accommodations tailored to every type of traveler.
            </p>
            <p className="mb-3">
              We have a curated selection of categories to help you easily choose your next stay: luxury hotels, boutique spots, hostels, places with stunning sea views, or charming balconies overlooking the historic center.
            </p>
            <p>
              Don't worry—cool hostels and well-located Airbnbs also have their place in this section. Plus, we include video reviews from travelers so you can see what the rooms, breakfast, atmosphere, and attention to detail are like at each location.
            </p>
          </div>

          {/* Neighborhoods */}
          <div id="neighborhoods">
            <h3 className="font-antigua font-black uppercase text-xl mb-1" style={{ color: "#000" }}>
              The Most Beautiful Neighborhoods of Cartagena
            </h3>
            <p className="text-sm font-semibold mb-5" style={{ color: "#000" }}>HELP VIDEO GUIDE</p>

            <img src="/lacarta_images/help-video-5.jpg" alt="Cartagena Neighborhoods" className="w-full rounded mb-5 object-cover" style={{ maxHeight: 280 }} />

            <p className="mb-3">
              We'll take you through the streets of Cartagena's most beautiful neighborhoods. We'll tell you what makes each neighborhood special, its unique charm, activities, the types of accommodation available, and its distinctive gastronomy.
            </p>
            <p className="mb-3">
              Of course, we'll also point out which neighborhoods are better to avoid at night or simply skip during your vacation.
            </p>
            <p className="mb-3">
              Check out our quick-help video on what to expect in Cartagena—covering cultural etiquette, safety tips, and how to make the most of your trip. In short, with these videos, the checklist, and the resources we provide about safety and guidance, you'll have everything you need to book your plane tickets to LA HERÓICA.
            </p>
            <p className="font-semibold mb-3">In our video selection, we also have "Top" lists featuring the best things to do in Cartagena:</p>
            <ul className="space-y-2 mb-6 pl-1">
              {topLists.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#000" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mb-3">
              These videos are designed to give you concrete ideas, help you plan your itinerary, and inspire you to discover more than you expected.
            </p>
            <p>
              Once you're here, you'll realize it's impossible not to want to take photos and videos of every corner of this city. Whether it's the picturesque balconies, hanging plants, colorful doors, the crystal-clear waters of the Rosario Islands, the warm white sand of Barú, or the unforgettable landscapes of Tierra Bomba—you'll be amazed.
            </p>
          </div>

        </main>
      </div>

    </div>
  );
}
