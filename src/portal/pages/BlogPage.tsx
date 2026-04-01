"use client";

import { useState } from "react";
import { Search, Heart, Star, Activity, Users, Newspaper, Palette, Trophy, Briefcase, Waves, Building2, UtensilsCrossed, Globe, BedDouble } from "lucide-react";

const categoryIcons = [
  { label: "Popular", Icon: Star },
  { label: "Activities", Icon: Activity },
  { label: "People", Icon: Users },
  { label: "News", Icon: Newspaper },
  { label: "Art & Fashion", Icon: Palette },
  { label: "Sports", Icon: Trophy },
  { label: "Business", Icon: Briefcase },
  { label: "Beaches", Icon: Waves },
  { label: "Real Estate", Icon: Building2 },
  { label: "Gastronomy", Icon: UtensilsCrossed },
  { label: "Culture & Tourism", Icon: Globe },
  { label: "Accommodations", Icon: BedDouble },
];

const mosaicImages = [
  "/lacarta_images/culture-1.png",
  "/lacarta_images/travel-1.jpg",
  "/lacarta_images/travel-2.jpg",
  "/lacarta_images/travel-3.jpg",
  "/lacarta_images/travel-4.jpg",
];

const articles = [
  { id: 1, title: "Top 6 most romantic beaches in Cartagena", author: "Natalia A Ramón Gaitán", date: "September 21, 2025", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80" },
  { id: 2, title: "Exploring the Caribbean Coast: Tips for Traveling from Cartagena to Santa Marta", author: "Natalia A Ramón Gaitán", date: "September 7, 2025", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&q=80" },
  { id: 3, title: "TOP 8 BEST HOSTELS IN CARTAGENA", author: "Natalia A Ramón Gaitán", date: "July 23, 2025", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=200&q=80" },
  { id: 4, title: "CARTAGENA'S HIDDEN GEMS: TOP 9 BEST AIRBNBS IN CARTAGENA", author: "Natalia A Ramón Gaitán", date: "July 23, 2025", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&q=80" },
  { id: 5, title: "The best urban beaches of Cartagena", author: "Natalia A Ramón Gaitán", date: "July 20, 2025", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80" },
  { id: 6, title: "TOP 6 BEST BEACHES IN TIERRA BOMBA", author: "Natalia A Ramón Gaitán", date: "July 20, 2025", image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=200&q=80" },
  { id: 7, title: "Let's talk about the best beaches in Baru, Cartagena.", author: "Natalia A Ramón Gaitán", date: "July 18, 2025", image: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=200&q=80" },
  { id: 8, title: "Top 8 Best Beaches of Islas del Rosario", author: "Natalia A Ramón Gaitán", date: "July 14, 2025", image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=200&q=80" },
  { id: 9, title: "THE BEST HOTELS WITH A VIEW IN CARTAGENA", author: "Natalia A Ramón Gaitán", date: "July 11, 2025", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=200&q=80" },
  { id: 10, title: "The Top 7 Most Instagrammable Places of Cartagena, Colombia", author: "Alejandra Quiroga", date: "September 28, 2024", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80" },
  { id: 11, title: "The Best Monuments and Statues of Cartagena, Colombia", author: "Luz Adriana", date: "September 25, 2024", image: "https://images.unsplash.com/photo-1569949063012-a12691fd8fe6?w=200&q=80" },
  { id: 12, title: "Is Cartagena, Colombia a Safe City to Visit? A Cartagena Safety Guide", author: "Miguel", date: "September 18, 2024", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=200&q=80" },
  { id: 13, title: "Are Taxis Safe in Colombia? Your Ultimate Guide to Getting Around Colombia", author: "Alejandra Quiroga", date: "September 15, 2024", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200&q=80" },
  { id: 14, title: "Best ATM Currency Exchanges in Cartagena: How to Withdraw Money in Colombia", author: "Miguel", date: "September 11, 2024", image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=200&q=80" },
  { id: 15, title: "Las Mejores Playas en Cartagena Colombia", author: "Miguel", date: "August 8, 2024", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80" },
  { id: 16, title: "What NOT to Do in Cartagena? 10 Things You Should Definitely Avoid in Cartagena, Colombia", author: "Natalia A Ramón Gaitán", date: "July 26, 2024", image: "https://images.unsplash.com/photo-1519677584237-752f8853252e?w=200&q=80" },
  { id: 17, title: "Quick Guide: How to Deal with Hustlers?", author: "Miguel", date: "July 26, 2024", image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=200&q=80" },
  { id: 18, title: "Want to exercise? TOP 5 best places to work out in Cartagena", author: "Natalia A Ramón Gaitán", date: "July 23, 2024", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&q=80" },
];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const toggleLike = (id: number) => setLiked((prev) => ({ ...prev, [id]: !prev[id] }));

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">

      {/* Teal banner */}
      <div className="w-full py-2 text-center text-sm font-bold" style={{ backgroundColor: "#3bbfad", color: "#fff" }}>
        Download our FREE Cartagena Travel Guide!
      </div>

      {/* ── Featured mosaic ── */}
      <div className="grid gap-1 grid-cols-1 md:[grid-template-columns:1fr_2fr] md:[grid-template-rows:280px_280px]">
        {/* Featured article — spans 2 rows on desktop */}
        <div className="relative overflow-hidden h-72 md:h-auto md:[grid-row:1/3]">
          <img src={mosaicImages[0]} alt="Featured" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 50%, transparent 100%)" }} />
          <div className="absolute top-4 left-4">
            <span className="text-xs font-black px-3 py-1 rounded-full" style={{ backgroundColor: "#f5c542", color: "#000" }}>
              Culture
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="font-antigua font-black text-white text-lg md:text-xl leading-snug mb-3">
              Want To Exercise? The Best Spots For All Types Of Workouts
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                  <img src="https://i.pravatar.cc/32?u=katen" alt="Katen Doe" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-bold text-xs">Katen Doe</p>
                  <p className="text-gray-300 text-xs">Jul 06, 2021</p>
                </div>
              </div>
              <span className="text-white text-xs font-bold">1 MIN READ</span>
            </div>
          </div>
        </div>

        {/* 4 mosaic images in 2×2 sub-grid */}
        <div className="grid grid-cols-2 gap-1 h-64 md:h-auto md:[grid-row:1/3]">
          {mosaicImages.slice(1).map((src, i) => (
            <div key={i} className="overflow-hidden">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* ── What Would You Like To Learn About ── */}
      <div className="px-4 md:px-10 py-12 max-w-[1400px] mx-auto">
        {/* Breadcrumb */}
        <p className="text-sm mb-4">
          <span style={{ color: "#f5c542" }} className="font-semibold italic">La Carta – Cartagena Culture &amp; Tourism</span>
          <span style={{ color: "#000" }} className="font-bold"> › Blog</span>
        </p>

        {/* Heading */}
        <h1
          className="font-antigua font-black"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#000", lineHeight: 1.1, marginBottom: "1.5rem" }}
        >
          What Would You Like To Learn About?
        </h1>

        {/* Search bar */}
        <div className="flex mb-12" style={{ maxWidth: 900 }}>
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 text-sm outline-none"
            style={{ border: "1px solid #ddd", borderRight: "none", backgroundColor: "#f0f4ff" }}
          />
          <button
            className="px-5 flex items-center justify-center"
            style={{ backgroundColor: "#f5c542" }}
          >
            <Search size={18} color="#000" />
          </button>
        </div>

        {/* Category icon grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8">
          {categoryIcons.map(({ label, Icon }) => (
            <button
              key={label}
              className="flex flex-col items-center gap-3 hover:opacity-70 transition"
            >
              <Icon size={64} strokeWidth={1.2} color="#000" />
              <span className="text-sm font-semibold text-center leading-tight" style={{ color: "#000" }}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Article list on gold background ── */}
      <div className="py-10 px-4 md:px-10" style={{ backgroundColor: "#f5c542" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((article) => (
              <div
                key={article.id}
                className="flex gap-3 bg-white p-3 rounded cursor-pointer hover:shadow-md transition relative"
                style={{ minHeight: 100 }}
              >
                {/* Thumbnail */}
                <div className="flex-shrink-0 rounded overflow-hidden" style={{ width: 90, height: 90 }}>
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                </div>
                {/* Text */}
                <div className="flex-1 min-w-0 pr-6">
                  <h3 className="font-black text-base leading-snug mb-1" style={{ color: "#000" }}>
                    {article.title}
                  </h3>
                  <p className="text-sm uppercase font-semibold" style={{ color: "#555" }}>
                    By {article.author}
                  </p>
                  <p className="text-sm mt-0.5 uppercase" style={{ color: "#888" }}>
                    {article.date}
                  </p>
                </div>
                {/* Heart */}
                <button
                  onClick={() => toggleLike(article.id)}
                  className="absolute top-3 right-3"
                >
                  <Heart
                    size={16}
                    fill={liked[article.id] ? "#e8534a" : "none"}
                    color={liked[article.id] ? "#e8534a" : "#000"}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Most Recent Articles heading ── */}
      <div className="py-16 text-center px-6">
        <h2
          className="font-antigua font-black uppercase"
          style={{ fontSize: "clamp(2rem, 6vw, 4rem)", color: "#000", letterSpacing: "0.06em" }}
        >
          Most Recent Articles
        </h2>
      </div>

    </div>
  );
}
