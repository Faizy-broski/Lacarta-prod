'use client'
import React, { useState, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@public/components/ui/accordion";
import Link from "next/link";
import {
  Heart,
  Star,
  Clock,
  Mail,
  Globe,
  Phone,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  GlassWater,
  Wine,
  Music,
  Users,
  Camera,
  Sparkles,
  CheckCircle,
  Facebook,
  Instagram,
  Youtube,
  Zap,
  Volume2,
  Mic2,
  PartyPopper,
  Moon,
} from "lucide-react";
import { Badge } from "@public/components/ui/badge";
import { useListing, useNearbyListings } from "@/lib/listings.hooks";
import { getListingImages, getListingMapSrc } from "@/portal/lib/listing-detail-utils";
import { getNeighborhoodOptions } from "@public/data/filter-config";
import ReviewSection from "@public/components/listings/ReviewSection";

const normalizeStringArray = (value: any): string[] => {
  if (!value) return []
  if (Array.isArray(value)) return value.map((item) => (typeof item === 'string' ? item : item?.label || item?.name || '')).filter(Boolean)
  if (typeof value === 'string') return value.split(',').map((item) => item.trim()).filter(Boolean)
  return []
}

const thumbnails = [
  "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800",
  "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800",
];

const sliderPlaces = [];

const tagRoutes = {
  Beaches: "/Beaches",
  Accommodations: "/hotels",
  Boating: "/Boating",
  "Real Estate": "/real-estate",
  Activities: "/Activities",
  Gastronomy: "/Gastronomy",
};

function StarRow({ count, total = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array(total).fill(0).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < count ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
      ))}
    </div>
  );
}

function HorizontalSlider({ items }) {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -230 : 230, behavior: "smooth" });
  };
  return (
    <div className="relative px-1">
      <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-4 z-10 w-7 h-7 md:w-8 md:h-8 rounded-full bg-amber-400 text-white flex items-center justify-center shadow">
        <ChevronLeft size={14} />
      </button>
      <div ref={scrollRef} className="flex gap-3 md:gap-4 overflow-x-auto pb-2" style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {items.map((item, i) => (
          <div key={i} className="min-w-[170px] sm:min-w-[190px] md:min-w-[210px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow flex-shrink-0" style={{ scrollSnapAlign: "start" }}>
            <div className="relative h-[120px] sm:h-[130px] md:h-[145px] overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 left-2 bg-white/90 rounded px-1.5 py-0.5 text-[10px] md:text-xs font-bold text-gray-700 flex items-center gap-0.5">
                <MapPin size={8} className="text-amber-500" />{item.category}
              </div>
              <button className="absolute top-2 right-2 w-6 h-6 md:w-7 md:h-7 bg-yellow-400 rounded-full flex items-center justify-center">
                <Heart size={11} className="text-black" />
              </button>
            </div>
            <div className="p-2.5 md:p-3">
              <p className="font-bold text-black text-xs md:text-sm leading-tight font-antigua">{item.title}</p>
              <p className="text-[10px] md:text-xs text-gray-500 mt-0.5">{item.location}</p>
              <div className="flex items-center gap-1.5 md:gap-2 mt-1.5 md:mt-2">
                <StarRow count={item.rating} />
                <span className="text-[10px] md:text-xs font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">{item.badge}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-4 z-10 w-7 h-7 md:w-8 md:h-8 rounded-full bg-green text-white flex items-center justify-center shadow">
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

export default function NightlifeDetails({ slug }: { slug?: string }) {
  const { listing, loading, error } = useListing(slug || "")
  const neighborhood = getNeighborhoodOptions('Music').find(
    (n) => ((listing?.category_tags as string[]) ?? []).includes(n)
  ) ?? '';
  const { listings: nearbyListings } = useNearbyListings(
    listing?.category ?? 'Music',
    'Detailed-NightLife',
    neighborhood,
    slug || ''
  );
  const [activeImg, setActiveImg] = useState(0);
  const [menuTab, setMenuTab] = useState("Wine");
  const [dealIdx, setDealIdx] = useState(0);

  const listingImages = getListingImages(listing, thumbnails)
  const heroImage = listingImages[activeImg] || thumbnails[0]
  const heroTitle = listing?.title || "Nightlife Venue"
  const heroBreadcrumb = listing?.category
    ? `${listing.category} / ${listing.sub_category_id ?? "Nightlife"}`
    : "Music / Nightlife / Club"
  const heroCompany = listing?.company_name || listing?.title?.split(" ")?.[0] || "CARTAGENA"
  const heroSubtitle = listing?.subtitle || ""
  const priceFrom = listing?.price_from ?? listing?.price ?? null
  const priceTo = listing?.price_to ?? priceFrom
  const priceUnit = listing?.price_unit || "entry"
  const listingDescription = listing?.description || listing?.about || listing?.details || ""
  const deals = Array.isArray(listing?.deals) && listing.deals.length > 0 ? listing.deals : []
  const faqs = Array.isArray(listing?.faqs) && listing.faqs.length > 0 ? listing.faqs : []
  const hours: any[] = Array.isArray(listing?.weekly_hours) && listing.weekly_hours.length > 0
    ? listing.weekly_hours
    : []
  const mapSrc = getListingMapSrc(listing)
  const contactEmail = listing?.email || null
  const contactWebsite = listing?.website || null
  const contactPhone = listing?.phone || listing?.whatsapp || null
  const listingAddress = listing?.address || ""
  const fbUrl = listing?.facebook || "#"
  const igUrl = listing?.instagram || "#"
  const keyFeatures: string[] = normalizeStringArray(listing?.key_features)
  const serviceItems: string[] = normalizeStringArray(listing?.services)
  const amenityItems: string[] = normalizeStringArray(listing?.amenities)
  const alsoAvailableOn = Array.isArray(listing?.also_available_on) && listing.also_available_on.length > 0
    ? listing.also_available_on
    : null
  const reservationLinks = Array.isArray(listing?.reservation_links) && listing.reservation_links.length > 0
    ? listing.reservation_links
    : null

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold-light border-t-black" />
      </div>
    )
  }

  if (error && slug) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-500">Listing not found</h2>
        <a href="/music" className="text-gold underline">Return to Music & Nightlife</a>
      </div>
    )
  }

  return (
    <div className="bg-white font-sans w-full overflow-x-hidden">

      <a href="https://wa.me/573151234567" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110">
        <MessageCircle size={24} className="text-white" />
      </a>

      {/* HERO */}
      <div className="bg-white px-4 sm:px-6 md:px-10 lg:px-12 pt-5 md:pt-6 pb-6 md:pb-8">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[10px] md:text-xs text-gray-400 mb-3 md:mb-4 leading-none">
            La Carta &ndash; Cartagena Culture &amp; Tourism &rsaquo; {heroBreadcrumb} &rsaquo;{" "}
            <span className="text-gray-700 font-semibold">{heroTitle}</span>
          </p>
          <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-6">
            <div className="flex items-start gap-3 flex-1 min-w-0 w-full lg:p-9 md:p-9 sm:p-9">
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black tracking-tight leading-none font-antigua">{heroTitle}</h1>
                  <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-red text-white text-[10px] md:text-xs font-extrabold flex items-center justify-center shrink-0 shadow">{heroCompany?.[0] ?? "N"}</span>
                </div>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <p className="text-xs md:text-sm text-gray-500">{heroBreadcrumb}</p>
                  <p className="text-[10px] md:text-xs font-extrabold tracking-[0.2em] text-gray-700 uppercase">{heroCompany}</p>
                </div>
                {heroSubtitle && <p className="mt-2 md:mt-6 text-sm md:text-base lg:text-[20px] text-gray-600 leading-snug font-bold">{heroSubtitle}</p>}
                {priceFrom != null && (
                <div className="mt-3 md:mt-6">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-0.5">Starting From</p>
                  <p className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight font-antigua">${priceFrom}{priceTo && priceTo !== priceFrom ? ` – $${priceTo}` : ""} <span className="text-sm md:text-base font-normal text-gray-500">/ {priceUnit}</span></p>
                </div>
                )}
                <div className="flex items-center gap-2 mt-3 md:mt-6 flex-wrap">
                  {Array(5).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />)}
                  <span className="text-sm font-semibold cursor-pointer ml-1 text-black font-antigua">Leave Review</span>
                  <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-black text-white text-[9px] md:text-xs flex items-center justify-center font-bold leading-none">?</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 mt-4 md:mt-10 flex-wrap">
                  <button className="bg-green hover:bg-green transition text-white font-bold text-xs md:text-sm px-5 md:px-7 py-2.5 md:py-3 rounded-full shadow">Reserve Now</button>
                  <button className="bg-gold hover:bg-gold transition text-white font-bold text-xs md:text-sm px-4 md:px-6 py-2.5 md:py-3 rounded-full shadow flex items-center gap-1.5 md:gap-2"><span>🎁</span> Nos Promo</button>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2 md:gap-2.5 w-full lg:w-auto lg:shrink-0 mt-4 lg:mt-0">
              <div className="rounded-2xl overflow-hidden shadow-lg flex-1 lg:flex-none">
                <div className="lg:hidden w-full"><img src={heroImage} alt={heroTitle} className="w-full h-full object-cover transition-all duration-700" /></div>
                <div className="hidden lg:block" style={{ width: "440px", height: "390px" }}><img src={heroImage} alt={heroTitle} className="w-full h-full object-cover transition-all duration-700" /></div>
              </div>
              <div className="flex flex-col gap-1.5 md:gap-2 shrink-0">
                {listingImages.map((src, i) => (
                  <div key={i} onClick={() => setActiveImg(i)} className={`w-14 h-16 sm:w-16 sm:h-[72px] md:w-[70px] md:h-[90px] rounded-xl overflow-hidden cursor-pointer transition-all flex-shrink-0 ${i === activeImg ? "ring-2 ring-blue-500 ring-offset-1" : "opacity-70 hover:opacity-100"}`}>
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT + SIDEBAR */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-12 pb-6 md:pb-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-5 md:gap-6 grid-cols-1 lg:grid-cols-[1.45fr_1fr]">
            <div className="space-y-4 md:space-y-5">

              <div className="bg-white rounded-2xl p-4 md:p-6">
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">About</p>
                <h2 className="text-xl md:text-2xl font-extrabold text-black font-antigua mb-3 md:mb-4">About {heroTitle}</h2>
                {listingDescription && (
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{listingDescription}</p>
                )}
              </div>

              {/* Our Specialties */}
              {keyFeatures.length > 0 && (
              <div className="bg-white rounded-2xl p-4 md:p-6">
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Our Specialties</p>
                <h2 className="text-lg md:text-xl font-extrabold text-black font-antigua mb-3 md:mb-4">Dish by our dishes</h2>
                <div className="space-y-2 md:space-y-3">
                  {keyFeatures.map((label, i) => (
                    <div key={i} className="flex items-start gap-2 md:gap-3 bg-[#f8f5e9] rounded-xl p-2.5 md:p-3 border border-amber-50">
                      <CheckCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-black text-xs md:text-sm font-antigua">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              )}

              {/* Nearby Activities */}
              <div className="bg-[#f8f5e9] rounded-2xl p-4 md:p-5 border border-amber-100 shadow-sm relative">
                <span className="absolute -top-3 left-5 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full">Nearby Activities</span>
                <div className="mt-4 grid grid-cols-2 gap-2 md:gap-3">
                  {[
                    { icon: Music, label: "Live Salsa", desc: "Thursday night performances" },
                    { icon: Mic2, label: "Open Mic", desc: "Every Tuesday evening" },
                    { icon: Volume2, label: "DJ Night", desc: "Fri & Sat international DJs" },
                    { icon: Moon, label: "Rooftop Bar", desc: "Open-air sunset cocktails" },
                    { icon: PartyPopper, label: "Private Events", desc: "Birthdays & celebrations" },
                    { icon: Zap, label: "VIP Experience", desc: "Bottle service & reserved" },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl p-2.5 md:p-3 bg-white shadow-sm border border-amber-200 flex items-start gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                        <item.icon size={13} className="text-amber-500" />
                      </div>
                      <div>
                        <p className="font-bold text-black text-[10px] md:text-xs font-antigua">{item.label}</p>
                        <p className="text-[9px] md:text-[10px] text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Menu Tabs */}
              <div className="bg-[#f8f5e9] rounded-2xl p-4 md:p-5 border border-amber-100 shadow-sm relative">
                <span className="absolute -top-3 left-5 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full">Menu</span>
                <div className="flex items-center justify-between mt-2 mb-3 md:mb-4 flex-wrap gap-2">
                  <div className="flex gap-1.5 md:gap-2 flex-wrap">
                    {["Wine", "Drinks", "Menu"].map((tab) => (
                      <button key={tab} onClick={() => setMenuTab(tab)} className={`flex items-center gap-1 md:gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all border ${menuTab === tab ? "bg-gold text-white border-amber-500" : "bg-white text-gray-700 border-gray-200 hover:border-amber-300"}`}>
                        {tab === "Wine" && <Wine size={11} />}
                        {tab === "Drinks" && <GlassWater size={11} />}
                        {tab === "Menu" && <Sparkles size={11} />}
                        {tab}
                      </button>
                    ))}
                  </div>
                  <button className="text-xs text-gray-600 font-semibold underline">QR Code</button>
                </div>
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {menuTab === "Wine" && [
                    { name: "Sparkling Wine", price: "$32", emoji: "🥂" },
                    { name: "Red Blend", price: "$28", emoji: "🍷" },
                    { name: "Champagne", price: "$85", emoji: "🍾" },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl p-2.5 md:p-3 text-center shadow-sm border border-amber-300 bg-white">
                      <p className="text-xl mb-1">{item.emoji}</p>
                      <p className="font-bold text-black text-[10px] md:text-xs font-antigua">{item.name}</p>
                      <p className="text-amber-600 font-bold text-xs md:text-sm mt-0.5">{item.price}</p>
                    </div>
                  ))}
                  {menuTab === "Drinks" && [
                    { name: "Signature Mojito", price: "$14", emoji: "🍹" },
                    { name: "Rum Sour", price: "$12", emoji: "🍊" },
                    { name: "Neon Cosmo", price: "$15", emoji: "💜" },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl p-2.5 md:p-3 text-center shadow-sm border border-amber-300 bg-white">
                      <p className="text-xl mb-1">{item.emoji}</p>
                      <p className="font-bold text-black text-[10px] md:text-xs font-antigua">{item.name}</p>
                      <p className="text-amber-600 font-bold text-xs md:text-sm mt-0.5">{item.price}</p>
                    </div>
                  ))}
                  {menuTab === "Menu" && [
                    { name: "Tapas Plate", price: "$18", emoji: "🍽️" },
                    { name: "Mini Sliders", price: "$16", emoji: "🍔" },
                    { name: "Ceviche Bites", price: "$20", emoji: "🐟" },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl p-2.5 md:p-3 text-center shadow-sm border border-amber-300 bg-white">
                      <p className="text-xl mb-1">{item.emoji}</p>
                      <p className="font-bold text-black text-[10px] md:text-xs font-antigua">{item.name}</p>
                      <p className="text-amber-600 font-bold text-xs md:text-sm mt-0.5">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-3 md:space-y-4">

              {/* Information + Hours */}
              <div className="bg-[#f8f5e9] rounded-2xl p-4 md:p-5 border border-amber-200 shadow-sm relative">
                <span className="absolute -top-3 left-5 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full">Information</span>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] md:text-xs text-black font-bold uppercase mb-1">Entry Fee</p>
                    <p className="text-xs font-bold text-black font-antigua">$15 – $30</p>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-black font-bold uppercase mb-1">Reservations</p>
                    <p className="text-xs font-bold text-black font-antigua">Recommended</p>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-black font-bold uppercase mb-1">Dress Code</p>
                    <p className="text-xs font-bold text-black font-antigua">Smart / Stylish</p>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-black font-bold uppercase mb-1">Capacity</p>
                    <p className="text-xs font-bold text-black font-antigua">300 guests</p>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-black font-bold uppercase mb-1">Min. Age</p>
                    <p className="text-xs font-bold text-black font-antigua">18+ with ID</p>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-black font-bold uppercase mb-1">Cards</p>
                    <p className="text-xs font-bold text-black font-antigua">Visa / MC / Amex</p>
                  </div>
                </div>
                {hours.length > 0 && (
                <div className="mt-3 md:mt-4 border-t border-amber-100 pt-3 md:pt-4">
                  <p className="text-[10px] md:text-xs font-bold text-black uppercase mb-2">Opening Hours</p>
                  <div className="space-y-1">
                    {hours.map((row, i) => (
                      <div key={i} className={`flex items-center justify-between text-[10px] md:text-xs py-1 px-2 rounded ${i >= 4 ? "bg-amber-100 font-bold text-black" : "text-gray-600"}`}>
                        <span className="font-semibold w-24">{row.day}</span>
                        <span>{row.open}</span>
                        {row.close && <><span className="text-gray-400">–</span><span>{row.close}</span></>}
                      </div>
                    ))}
                  </div>
                </div>
                )}
              </div>

              {/* Address + Social */}
              <div className="bg-[#f8f5e9] rounded-2xl p-4 md:p-5 border border-amber-200 shadow-sm">
                {listingAddress && (
                  <>
                    <p className="text-xs text-black uppercase font-bold mb-1">Address</p>
                    <p className="text-xs md:text-sm font-bold text-black leading-snug font-antigua">{listingAddress}</p>
                  </>
                )}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-amber-100">
                  <p className="text-[10px] text-gray-500 font-bold mr-1">Follow:</p>
                  {fbUrl !== "#" && <a href={fbUrl} target="_blank" rel="noreferrer" className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:opacity-80 transition"><Facebook size={12} /></a>}
                  {igUrl !== "#" && <a href={igUrl} target="_blank" rel="noreferrer" className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-pink-500 text-white flex items-center justify-center hover:opacity-80 transition"><Instagram size={12} /></a>}
                  {contactWebsite && <a href={contactWebsite} target="_blank" rel="noreferrer" className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-amber-500 text-white flex items-center justify-center hover:opacity-80 transition"><Globe size={12} /></a>}
                </div>
              </div>

              {/* 3 Contact Icons */}
              <div className="grid grid-cols-3 gap-2 md:gap-2.5">
                {[
                  { icon: Mail, label: "Email", sub: contactEmail || "Not available", href: contactEmail ? `mailto:${contactEmail}` : "#" },
                  { icon: Globe, label: "Website", sub: contactWebsite ? contactWebsite.replace(/^https?:\/\//, "") : "Not available", href: contactWebsite || "#" },
                  { icon: Phone, label: "Phone", sub: contactPhone || "Not available", href: contactPhone ? `tel:${contactPhone}` : "#" },
                ].map((item, i) => (
                  <a key={i} href={item.href} target={item.href !== "#" ? "_blank" : undefined} rel="noreferrer noopener" className="bg-[#f8f5e9] rounded-xl border border-amber-100 shadow-sm p-2 md:p-3 flex flex-col items-center text-center gap-1 hover:border-amber-400 transition">
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-amber-50 flex items-center justify-center"><item.icon size={14} className="text-amber-500" /></div>
                    <p className="font-bold text-[10px] md:text-xs text-black">{item.label}</p>
                    <p className="text-[9px] md:text-[10px] text-black leading-tight font-bold break-all">{item.sub}</p>
                  </a>
                ))}
              </div>

              {/* Also Available On */}
              {alsoAvailableOn && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 md:p-4 text-center">
                <p className="font-bold text-black text-xs md:text-sm mb-2 md:mb-3 font-antigua">Also Available On</p>
                <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
                  {alsoAvailableOn.map((link: any, i: number) => (
                    <a key={i} href={link.url || link.link || "#"} target="_blank" rel="noreferrer" className="bg-gold text-white text-[10px] md:text-xs font-bold rounded-xl px-3 md:px-5 py-2 md:py-3">
                      {link.platform || link.label || link.name} ↗
                    </a>
                  ))}
                </div>
              </div>
              )}

              <button className="w-full rounded-full bg-gold hover:bg-gold transition py-3 md:py-3.5 text-xs md:text-sm font-bold text-white shadow">Book with La Carta</button>
              <div className="flex items-center justify-center gap-2 text-[10px] md:text-xs text-gray-400 flex-wrap">
                <ShieldCheck size={12} className="text-green-500" />
                <span>Secure payments · Verified listings · 24/7 support</span>
              </div>

              {/* Deals Slider */}
              {deals.length > 0 && (
              <div className="bg-white rounded-2xl  relative ">
                <div className="flex items-center justify-between  pt-3 md:pt-4 pb-1.5">
                  <p className="font-bold text-black text-xs md:text-sm font-antigua">
                    Deals &amp; Promotions
                  </p>
                  <span className="text-xs text-gold font-semibold font-antigua">
                    {dealIdx + 1}/{deals.length}
                  </span>
                </div>
                <div className=" pb-3 md:pb-4 relative ">
                  <div className="flex flex-col relative bg-[#f8f5e9] w-full h-[130px] rounded-xl p-3 md:p-4 border border-amber-100 shadow-sm">
                    <div className="flex items-start justify-between gap-2 relative">
                      <div className="flex-1  space-y-3 mb-3">
                        <p className="font-bold text-black text-xs md:text-sm font-antigua">
                        {deals[dealIdx]?.title}
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-500 mt-1 leading-relaxed">
                          {deals[dealIdx]?.desc}
                        </p>
                      </div>
                      {/* <span className="bg-gold text-white text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded shrink-0">
                        {deals[dealIdx].tag}
                      </span> */}
                    </div>
                    {deals[dealIdx]?.tag && (
                      <Badge className="absolute top-0 right-0 border-0 bg-gradient-to-r from-gold-light to-gold overflow-hidden text-white  rounded-xl rounded-tl-none rounded-br-none  text-xs">
                        {deals[dealIdx].tag}
                      </Badge>
                    )}
                    <div className="mt-auto flex items-center justify-between text-[10px] md:text-xs ">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {deals[dealIdx].valid}
                      </div>

                      <button className="text-[#c89b2c] font-semibold flex items-center gap-2">
                        Claim Offer →
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        setDealIdx(
                          (p) =>
                            (p - 1 + deals.length) % deals.length,
                        )
                      }
                      className="absolute z-16 -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-l from-gold to-gold-light text-white flex items-center justify-center shadow"
                    >
                      <ChevronLeft size={12} />
                    </button>

                    <button
                      onClick={() =>
                        setDealIdx((p) => (p + 1) % deals.length)
                      }
                      className="absolute z-16 -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-gold to-gold-light text-white flex items-center justify-center shadow"
                    >
                      <ChevronRight size={12} />
                    </button>
                    {/* <button
                      onClick={() =>
                        setDealIdx(
                          (p) =>
                            (p - 1 + deals.length) % deals.length,
                        )
                      }
                      className="absolute  md:left-2 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-l from-gold to-gold-light text-white flex items-center justify-center"
                    >
                      <ChevronLeft size={11} />
                    </button>
                    <button
                      onClick={() =>
                        setDealIdx((p) => (p + 1) % deals.length)
                      }
                      className="absolute  md:right-2 top-1/2   -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-gold to-gold-light text-white flex items-center justify-center"
                    >
                      <ChevronRight size={11} />
                    </button> */}

                    {/* <div className="flex items-center gap-2 md:gap-3 mt-2 md:mt-2.5 text-[9px] md:text-[10px] text-gray-400 flex-wrap">
                      <span>✓ Valid till March 15, 2025</span>
                      <span>✓ T&C apply</span>
                    </div> */}
                  </div>
                </div>
                <div className="flex justify-center gap-1.5 pb-2.5 md:pb-3">
                  {deals.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setDealIdx(i)}
                      className={`h-1.5 rounded-full transition-all ${i === dealIdx ? "bg-gold w-4" : "bg-gold w-1.5"}`}
                    />
                  ))}
                </div>
              </div>
              )}

              {/* Powered By */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 md:p-4">
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase mb-2">Powered by</p>
                <div className="space-y-1.5">
                  {["Google Reviews", "TripAdvisor", "Eventbrite"].map((src, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1.5">
                      <div className="w-5 h-5 rounded bg-amber-100 flex items-center justify-center shrink-0"><Globe size={10} className="text-amber-500" /></div>
                      <span className="text-[10px] md:text-xs font-bold text-gray-600">{src}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOCATION */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-12 py-6 md:py-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-4 md:mb-5">
            <p className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Find Us</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-antigua text-black">Location &amp; Getting There</h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 h-[220px] sm:h-[280px] md:h-[320px]">
            <iframe title="Location Map" className="w-full h-full border-0" loading="lazy" allowFullScreen src={mapSrc} />
          </div>
          {listing?.address && (
            <p className="mt-3 text-sm text-gray-600 flex items-center gap-2 font-medium">
              <MapPin size={16} className="text-gold" /> {listing.address}
            </p>
          )}
        </div>
      </div>

      {/* SERVICES */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-12 pb-6 md:pb-8">
        <div className="mx-auto max-w-[1200px] bg-white rounded-2xl p-5 md:p-8">
          <div className="text-center mb-5 md:mb-7">
            <p className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">What's Included</p>
            <h2 className="text-xl md:text-2xl font-extrabold text-black font-antigua">Services &amp; Amenities</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {([
              { title: "Key Features", items: keyFeatures, icon: Sparkles },
              { title: "Services", items: serviceItems, icon: GlassWater },
              { title: "Amenities", items: amenityItems, icon: Music },
            ].filter(col => col.items.length > 0) as Array<{ title: string; items: string[]; icon: any }>).map((col, ci) => (
              <div key={ci}>
                <h3 className="font-bold text-black text-sm md:text-base mb-3 md:mb-4 pb-2 border-b-2 border-gray-300">{col.title}</h3>
                <div className="space-y-3 md:space-y-3.5">
                  {col.items.map((label, i) => (
                    <div key={i} className="flex items-start gap-2 md:gap-3">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-amber-50 flex items-center justify-center shrink-0"><col.icon size={13} className="text-amber-500" /></div>
                      <p className="font-semibold text-gray-900 text-xs md:text-sm pt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AROUND THIS PLACE */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-12 pb-6 md:pb-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="w-full mb-4 md:mb-5">
            <p className="text-[10px] md:text-xs uppercase w-full text-center tracking-widest font-bold text-gray-400 mb-0.5">Explore</p>
            <h2 className="text-xl md:text-2xl font-extrabold text-center font-antigua text-black">Around This Place</h2>
          </div>
          {nearbyListings.length > 0 ? (
            <HorizontalSlider items={nearbyListings.map(l => ({ image: l.image, category: l.category, title: l.title, subtitle: l.subtitle, rating: l.rating, href: l.href }))} />
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center text-black/50 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <p className="text-sm font-medium">No listings found in this neighbourhood yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* FAQ */}
      {faqs.length > 0 && (
      <div className="bg-[#fbf7ef] py-8 md:py-12 px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="mx-auto max-w-[950px]">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-400 mb-1 md:mb-1.5">Questions?</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-black">Frequently Asked</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-2 md:space-y-3">
            {faqs.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 md:px-5">
                <AccordionTrigger className="text-left text-xs md:text-sm font-semibold text-black hover:no-underline py-3 md:py-4">{item.question}</AccordionTrigger>
                <AccordionContent className="text-xs md:text-sm text-gray-500 leading-relaxed pb-3 md:pb-4">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      )}

      <ReviewSection listingId={listing?.id ?? ''} />

      {/* PREMIUM LISTING */}
      <div className="bg-[#fbf7ef] py-6 md:py-8 px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex items-end justify-between mb-4 md:mb-5">
            <h2 className="text-xl md:text-2xl font-extrabold font-antigua text-black">Premium Listing</h2>
            <div className="flex gap-1.5 md:gap-2">
              <button className="bg-red text-white text-[10px] md:text-xs font-bold rounded-full px-3 md:px-4 py-1.5 md:py-2">Clear Filters</button>
              <button className="bg-green text-white text-[10px] md:text-xs font-bold rounded-full px-3 md:px-4 py-1.5 md:py-2">+ Filters</button>
            </div>
          </div>
          <HorizontalSlider items={sliderPlaces} />
        </div>
      </div>

      {/* NEWSLETTER */}
      <div className="relative py-14 md:py-20 px-4 sm:px-6 md:px-10 lg:px-12 overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=1400')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative mx-auto max-w-[700px] text-center">
          <p className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-amber-400 mb-2">Stay Updated</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-antigua mb-3 md:mb-4">Cartagena Newsletter</h2>
          <p className="text-sm md:text-base text-white/80 mb-6 md:mb-8 leading-relaxed">Subscribe to get exclusive nightlife event previews, VIP deals, and insider access to the best nights in Cartagena — straight to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 max-w-[500px] mx-auto">
            <input type="email" placeholder="Your email address" className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/60 text-xs md:text-sm outline-none focus:border-amber-400 transition backdrop-blur-sm" />
            <button className="bg-gold text-white font-bold text-xs md:text-sm px-6 py-3 rounded-full shadow whitespace-nowrap">Subscribe Now</button>
          </div>
          <p className="text-[10px] text-white/40 mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </div>

    </div>
  );
}