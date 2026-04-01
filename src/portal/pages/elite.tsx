import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Share2,
  Search,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Tag,
  Newspaper,
  Instagram,
  Facebook,
  Twitter,
  ExternalLink,
  ThumbsUp,
  CalendarCheck,
  Bookmark,
  Sparkles,
  Percent,
  SlidersHorizontal,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

const tagPills = ["Seafood", "Waterfront", "Fine Dining", "Romantic", "Sunset Views"];

const featurePills = [
  "Beachfront", "Golf Course", "Spa", "Fine Dining", "Infinity Pool",
  "Ocean View", "Butler Service", "Private Beach", "Pet Friendly", "Wedding Venue",
];

const deals = [
  {
    badge: "SAVE 20%",
    badgeColor: "bg-green",
    title: "Extended Stay Package",
    desc: "Stay 5 nights get 2 nights complimentary. Includes daily breakfast and one spa treatment.",
    validUntil: "Valid until March 31, 2026",
    cta: "Claim Offer →",
  },
  {
    badge: "$500 VALUE",
    badgeColor: "bg-amber-500",
    title: "Romantic Escape",
    desc: "Private beachfront dinner, couples massage, and champagne upon arrival.",
    validUntil: "Valid until February 14, 2026",
    cta: "Claim Offer →",
  },
];

const reviews = [
  {
    name: "Sarah Mikhell",
    date: "January 2026",
    rating: 5,
    text: "Absolutely breathtaking! The attention to detail is impeccable. From the moment we arrived, the staff made us feel like royalty. The sunset views from our suite were unforgettable.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60",
  },
  {
    name: "James & Maria Chen",
    date: "December 2025",
    rating: 5,
    text: "We celebrated our anniversary here and exceeded all expectations. The private dinner on the beach was magical. Already planning our return visit!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60",
  },
  {
    name: "Robert van der Berg",
    date: "October 2025",
    rating: 4,
    text: "Outstanding golf course and spa facilities. The restaurant Marea is a culinary journey. Minor note: WiFi could be stronger in some areas.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60",
  },
  {
    name: "Elena Rossi",
    date: "October 2025",
    rating: 5,
    text: "Pure paradise. The infinity pool overlooking the ocean is Instagram-worthy, but the real magic is in the genuine warmth of the staff.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60",
  },
];

function StarRow({ count, total = 5, size = "sm" }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array(total).fill(0).map((_, i) => (
        <Star
          key={i}
          className={`${size === "lg" ? "h-4 w-4 md:h-5 md:w-5" : "h-3 w-3"} ${
            i < Math.floor(count) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function ElitePage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-white font-sans w-full overflow-x-hidden">

      <a
        href="https://wa.me/573151234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110"
      >
        <MessageCircle size={24} className="text-white" />
      </a>

      {/* ══ TOP SEARCH SECTION ══ */}
      <div className="bg-white px-4 sm:px-6 md:px-10 lg:px-14 pt-5 pb-4 border-b border-gray-100">
        <div className="mx-auto max-w-[1100px]">

          <div className="flex items-start gap-3">
            <div className="flex flex-col gap-2 shrink-0 pt-1">
              <button className="w-9 h-9 rounded-full bg-red flex items-center justify-center shadow hover:opacity-90 transition">
                <Share2 size={14} className="text-white" />
              </button>
              <button
                onClick={() => setSaved(!saved)}
                className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center shadow hover:bg-amber-500 transition"
              >
                <Heart size={14} className="text-white" fill={saved ? "white" : "none"} />
              </button>
            </div>

            <div className="flex-1">
              <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-black font-antigua mb-3">
                Discover Our Elite Sponsors
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-full px-4 py-2.5 gap-2 shadow-sm">
                  <Search size={14} className="text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="flex-1 bg-transparent outline-none text-xs md:text-sm text-gray-600 placeholder-gray-400"
                  />
                </div>
                <button className="bg-green hover:bg-green transition text-white font-bold text-xs md:text-sm px-6 md:px-8 py-2.5 rounded-full shadow whitespace-nowrap">
                  Search
                </button>
                <button className="hidden md:flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-4 py-2.5 text-xs font-semibold text-gray-500 hover:border-amber-400 transition whitespace-nowrap">
                  <SlidersHorizontal size={12} /> Saved Searches
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ ELITE BADGE + CATEGORY + TITLE + PRICE ══ */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-14 pt-5 pb-3">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-2.5">
            <span className="inline-flex items-center gap-1.5 bg-gold text-white text-[10px] md:text-xs font-extrabold px-3 py-1.5 rounded-full shadow">
              <Sparkles size={10} /> Elite Sponsored
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-500">HOTELS &amp; RESORTS</p>
              <span className="text-gray-300 text-xs">·</span>
              <p className="text-[10px] md:text-xs text-gray-400 flex items-center gap-1">
                <MapPin size={9} className="text-amber-500" /> Cartagena, Colombia
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <StarRow count={4.9} total={5} size="lg" />
              <span className="text-xs md:text-sm font-extrabold text-black font-antigua">4.9</span>
              <span className="text-[10px] md:text-xs text-gray-400">(247 reviews)</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-black tracking-tight font-antigua leading-tight mb-1">
            Casa Dorada Beach &amp; Golf Resort
          </h1>
          <p className="text-xs md:text-sm text-gray-500 italic mb-3">Where Mediterranean Elegance Meets Pacific Serenity.</p>

          <div className="flex items-center gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black font-antigua tracking-tight">1.047.600</p>
                <span className="text-xs text-gray-500 font-semibold">COP / yearly</span>
                <span className="bg-red text-white text-[9px] md:text-[10px] font-extrabold px-2 py-0.5 rounded-full">10% OFF</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-gray-400 text-sm font-bold">≈</span>
                <p className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-700 font-antigua">97.000</p>
                <span className="text-xs text-gray-500 font-semibold">COP / monthly</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ PHOTO GALLERY — 3 top + 2 bottom ══ */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-14 pb-4">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-2 h-[160px] sm:h-[200px] md:h-[240px]">
              <div className="col-span-1 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
                  alt="resort-1"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                />
              </div>
              <div className="col-span-1 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
                  alt="resort-2"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                />
              </div>
              <div className="col-span-1 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800"
                  alt="resort-3"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 h-[140px] sm:h-[180px] md:h-[200px]">
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800"
                  alt="resort-4"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                />
              </div>
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
                  alt="resort-5"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {tagPills.map((tag, i) => (
              <span
                key={i}
                className="bg-white border border-gray-200 text-gray-600 text-[10px] md:text-xs font-semibold px-3 py-1.5 rounded-full hover:border-amber-400 hover:bg-amber-50 cursor-pointer transition"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══ MAIN CONTENT + RIGHT SIDEBAR ══ */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-14 pb-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-[1fr_340px]">

            {/* ── LEFT COLUMN ── */}
            <div className="space-y-6 md:space-y-8 min-w-0">

              {/* About */}
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-black font-antigua mb-3">About</h2>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-2.5">
                  Perched on a sun-drenched cliff overlooking the pristine waters of the Pacific, Casa Dorada Beach &amp; Golf Resort offers an unparalleled escape into luxury. Our award-winning property seamlessly blends traditional Mediterranean architecture with contemporary comfort, creating an atmosphere of timeless sophistication.
                </p>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Each of our 120 meticulously designed suites features floor-to-ceiling windows, private balconies with panoramic ocean views, and handcrafted furnishings sourced from local artisans. Wake up to the gentle sound of waves and the golden light of dawn painting the horizon.
                </p>
              </div>

              {/* Tags & Features */}
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-black font-antigua mb-3">Tags &amp; Features</h2>
                <div className="flex flex-wrap gap-2">
                  {featurePills.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-50 border border-gray-200 text-gray-600 text-[10px] md:text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-amber-50 hover:border-amber-300 cursor-pointer transition"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deals & Promotions */}
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-black font-antigua mb-3 flex items-center gap-2">
                  <Tag size={17} className="text-amber-500" /> Deals &amp; Promotions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {deals.map((deal, i) => (
                    <div key={i} className="bg-[#faf8f2] rounded-2xl p-4 border border-amber-100 relative overflow-hidden">
                      <span className={`absolute top-3 right-3 ${deal.badgeColor} text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full whitespace-nowrap`}>
                        {deal.badge}
                      </span>
                      <p className="font-extrabold text-black text-xs md:text-sm font-antigua pr-20 mb-1.5 leading-snug">{deal.title}</p>
                      <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed mb-3">{deal.desc}</p>
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[9px] md:text-[10px] text-gray-400 flex items-center gap-1">
                          <CalendarCheck size={9} /> {deal.validUntil}
                        </span>
                        <button className="text-[10px] md:text-xs font-bold text-amber-600 hover:text-amber-700 transition whitespace-nowrap">{deal.cta}</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest Reviews */}
              <div>
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h2 className="text-xl md:text-2xl font-extrabold text-black font-antigua">Guest Reviews</h2>
                  <div className="flex items-center gap-1.5">
                    <StarRow count={4.9} size="lg" />
                    <span className="font-extrabold text-black text-sm font-antigua">4.9</span>
                    <span className="text-[10px] text-gray-400">(247 reviews)</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {reviews.map((r, i) => (
                    <div key={i} className="bg-white rounded-2xl p-3 md:p-4 border border-gray-100 shadow-sm">
                      <div className="flex items-start gap-2 mb-2">
                        <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-black text-xs font-antigua leading-tight truncate">{r.name}</p>
                          <p className="text-[9px] text-gray-400">{r.date}</p>
                        </div>
                        <StarRow count={r.rating} />
                      </div>
                      <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Press Release */}
              <div className="bg-[#faf8f0] rounded-2xl p-5 md:p-7 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-black text-gold font-extrabold px-2.5 py-1 rounded flex items-center gap-1 uppercase tracking-wider">
                    <Newspaper size={19} /> Press Release
                  </span>
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-extrabold text-black font-antigua mb-2 leading-tight">
                  Casa Dorada Unveils New Oceanfront Wellness Pavilion
                </h3>
                <p className="text-[10px] md:text-xs text-gray-400 mb-4 flex items-center gap-1">
                  <CalendarCheck size={10} /> January 15, 2026
                </p>
                <p className="text-xs md:text-sm text-black leading-relaxed mb-3">
                  Casa Dorada Beach &amp; Golf Resort is proud to announce the grand opening of our new Oceanfront Wellness Pavilion, a 15,000 square foot sanctuary dedicated to holistic health and rejuvenation.
                </p>
                <p className="text-xs md:text-sm text-black leading-relaxed mb-3">
                  Designed by renowned architect Tadao Ando, the pavilion features floor-to-ceiling glass walls that blur the boundary between interior spaces and the Pacific horizon. The facility includes 12 treatment rooms, a hydrotherapy circuit, meditation gardens, and a rooftop yoga deck.
                </p>
                <blockquote className="border-l-4 border-amber-500 pl-4 my-4">
                  <p className="text-xs md:text-sm text-black italic leading-relaxed">
                    "This represents our commitment to offering guests not just luxury, but transformative experiences," said General Manager Elena Vargas. "The Wellness Pavilion is where ancient healing traditions meet modern science."
                  </p>
                </blockquote>
                <p className="text-xs md:text-sm text-black leading-relaxed">
                  The pavilion will offer exclusive treatments using locally-sourced botanical ingredients, including signature therapies developed in partnership with indigenous Huichol healers.
                </p>
              </div>

              {/* Featured On */}
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-black font-antigua mb-3">Featured On</h2>
                <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                  {[
                    { icon: Instagram, handle: "@casadoradaresort", color: "text-pink-500" },
                    { icon: Facebook, handle: "@CasaDoradaResort", color: "text-blue-600" },
                    { icon: Twitter, handle: "@CasaDorada4K", color: "text-sky-500" },
                  ].map((item, i) => (
                    <button
                      key={i}
                      className={`text-dark bg-[#faf8f0]  flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-full text-[10px] md:text-xs font-bold hover:opacity-90 transition shadow-sm`}
                    >
                      <item.icon size={18} className={`${item.color}`} /> {item.handle}
                    </button>
                  ))}
                </div>
              </div>

              {/* Save / Share / Contact bar */}
              <div className="flex items-end justify-end gap-4 md:gap-6 pt-10 pb-1 border-t border-gray-100">
                <button
                  onClick={() => setSaved(!saved)}
                  className=" bg-[#faf8f0] px-6 py-3 rounded-xl flex items-center gap-1.5 text-xs md:text-sm font-semibold text-gray-600 hover:text-amber-500 transition"
                >
                  <Bookmark size={14} className={saved ? "text-amber-500 fill-amber-500" : ""} /> Save
                </button>
                <button className=" bg-[#faf8f0] px-6 py-3 rounded-xl flex items-center gap-1.5 text-xs md:text-sm font-semibold text-gray-600 hover:text-green transition">
                  <Share2 size={14} /> Share
                </button>
                <button className=" bg-[#faf8f0] px-6 py-3 rounded-xl flex items-center gap-1.5 text-xs md:text-sm font-semibold text-gray-600 hover:text-blue-500 transition">
                  <Phone size={14} /> Contact
                </button>
              </div>
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="space-y-4 lg:sticky lg:top-5 h-fit">

              {/* Contact & Hours */}
              <div className="bg-[#faf8f0] rounded-2xl p-4 md:p-5 border border-amber-100">
                <p className="font-extrabold text-black text-sm md:text-base font-antigua mb-3">Contact &amp; Hours</p>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2">
                    <MapPin size={12} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] md:text-xs text-gray-600 leading-snug">
                      Carretera a Punta de Mita Km 5.5, Bahía de Banderas, Nayarit 63734, Mexico
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green shrink-0" />
                    <p className="text-[10px] md:text-xs text-gray-600">
                      Check-In: <strong className="text-black">3:00 PM</strong> · Check-Out: <strong className="text-black">12:00 PM</strong>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-amber-500 shrink-0" />
                    <p className="text-[10px] md:text-xs font-bold text-black">+52 329 291 6030</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-amber-500 shrink-0" />
                    <p className="text-[10px] md:text-xs font-bold text-black break-all">reservations@casadorada.com</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={12} className="text-amber-500 shrink-0" />
                    <p className="text-[10px] md:text-xs font-bold text-black flex items-center gap-1">
                      www.casadorada.com <ExternalLink size={9} className="text-gray-400" />
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <button className="w-full bg-green hover:bg-green transition text-white font-bold text-xs md:text-sm py-2.5 rounded-full shadow flex items-center justify-center gap-2">
                    <CalendarCheck size={13} /> Book Now
                  </button>
                  <button className="w-full bg-white border border-gray-200 hover:border-amber-400 text-gray-700 font-semibold text-xs md:text-sm py-2.5 rounded-full flex items-center justify-center gap-2 transition">
                    View Menu
                  </button>
                  <button className="w-full bg-white border border-gray-200 hover:border-green text-gray-700 hover:text-green font-semibold text-xs md:text-sm py-2.5 rounded-full flex items-center justify-center gap-2 transition">
                    <Phone size={12} /> Call Now
                  </button>
                </div>
              </div>

              {/* Timing */}
              <div className="bg-[#faf8f0] rounded-2xl p-4 md:p-5 border border-amber-100">
                <p className="font-extrabold text-black text-sm md:text-base font-antigua mb-3">Timing</p>
                <div className="space-y-2.5">
                  <div>
                    <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5">HOTEL CHECK-IN</p>
                    <p className="text-2xl md:text-3xl font-extrabold text-black font-antigua">09:00 am</p>
                  </div>
                  <div className="border-t border-amber-100 pt-2.5">
                    <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5">HOTEL CHECK-OUT</p>
                    <p className="text-2xl md:text-3xl font-extrabold text-black font-antigua">09:00 pm</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-[#faf8f0] rounded-2xl p-4 md:p-5 border border-amber-100">
                <p className="font-extrabold text-black text-sm md:text-base font-antigua mb-2">Location</p>
                <p className="text-[10px] md:text-xs text-gray-600 leading-snug mb-3">
                  Isla Buru, Provincia de Cartagena, Bolívar, Colombia
                </p>
                <div className="rounded-xl overflow-hidden h-[160px] md:h-[180px] border border-amber-100">
                  <iframe
                    title="Location"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=Cartagena+Colombia&output=embed"
                  />
                </div>
                <button className="mt-2 text-[10px] md:text-xs text-amber-600 font-semibold hover:underline">
                  View larger map →
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ══ NEWSLETTER ══ */}
      <div
        className="relative py-14 md:py-20 px-4 sm:px-6 md:px-10 overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative mx-auto max-w-[680px] text-center">
          <p className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-amber-400 mb-1.5">STAY UPDATED</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-antigua mb-2">
            Cartagena Newsletter
          </h2>
          <p className="text-sm text-white/80 mb-1">Get the latest discoveries, deals, coupon, news &amp; tips of Cartagena.</p>
          <p className="text-xs text-white/50 mb-6">Get our latest discoveries, events, images &amp; tips of Cartagena.</p>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 max-w-[480px] mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/50 text-xs md:text-sm outline-none focus:border-amber-400 transition backdrop-blur-sm"
            />
            <button className="bg-gold text-white font-bold text-xs md:text-sm px-6 py-3 rounded-full shadow whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}