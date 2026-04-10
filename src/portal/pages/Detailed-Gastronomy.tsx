'use client'

import React, { useState, useRef, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@public/components/ui/accordion";
import { Card, CardContent } from "@public/components/ui/card";
import Link from "next/link";
import {
  Heart,
  Star,
  Clock,
  Mail,
  Globe,
  Phone,
  ChevronDown,
  CalendarDays,
  Luggage,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Plane,
  Bath,
  Wifi,
  Umbrella,
  Sun,
  Anchor,
  ChevronLeft,
  Coffee,
  ChevronRight,
  Camera,
  Sparkles,
  WavesIcon,
  MapPin,
} from "lucide-react";
import { useListing, useNearbyListings } from "@/lib/listings.hooks";
import { getNeighborhoodOptions } from "@public/data/filter-config";
import ReviewSection from "@public/components/listings/ReviewSection";
import FavoriteButton from "@public/components/listings/FavoriteButton";
import { usePortalStore } from "@public/store/portalStore";
import { getListingImages, getListingMapSrc } from "@/portal/lib/listing-detail-utils";
import { Button } from "@public/components/ui/button";
import { Badge } from "@public/components/ui/badge";

const normalizeStringArray = (value: any): string[] => {
  if (!value) return []
  if (Array.isArray(value)) return value.map((item) => (typeof item === 'string' ? item : item?.label || item?.name || '')).filter(Boolean)
  if (typeof value === 'string') return value.split(',').map((item) => item.trim()).filter(Boolean)
  return []
}

const thumbnails = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
  "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=800",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
];

function StarRow({ count, total = 5 }: { count: number; total?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array(total)
        .fill(0)
        .map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < count ? "fill-gold text-gold" : "text-gold"}`}
          />
        ))}
    </div>
  );
}

function HorizontalSlider({ items }: { items: Array<{ image: string; category: string; title: string; subtitle: string; rating: number }> }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -230 : 230, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute hidden sm:flex left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 md:-translate-x-4 h-10 w-10 rounded-full bg-gradient-to-r from-gold to-gold-light flex items-center justify-center text-white shadow-lg hover:scale-105 transition"
      >
        <ChevronLeft />
      </button>
      <div ref={scrollRef} className="w-full flex gap-2 sm:gap-4 px-3 sm:px-0 overflow-x-auto no-scrollbar">
        {items.map((item, i) => (
          <div key={i} className="snap-start shrink-0 basis-full sm:basis-[calc((100%-16px)/2)] lg:basis-[calc((100%-48px)/4)]">
            <Card className="h-full rounded-2xl shadow-md overflow-hidden bg-white">
              <div className="relative">
                <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
                <span className="absolute top-3 right-3 rounded-full bg-white p-2 shadow">
                  <Heart className="text-red-600" />
                </span>
              </div>
              <CardContent className="p-4">
                <p className="text-sm font-bold text-gray-600">{item.category}</p>
                <h3 className="text-lg font-semibold font-antigua text-black truncate">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1 truncate">{item.subtitle}</p>
                <div className="flex mt-3">
                  <StarRow count={Math.round(item.rating)} />
                </div>
                <button className="mt-3 text-[#22c35d] font-semibold underline underline-offset-2">
                  View Menu
                </button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll("right")}
        className="absolute hidden sm:flex right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-4 h-10 w-10 rounded-full bg-gradient-to-l from-gold to-gold-light flex items-center justify-center text-white shadow-lg hover:scale-105 transition"
      >
        <ChevronRight />
      </button>
    </div>
  );
}

export default function GastronomyDetails({ slug }: { slug?: string }) {
  const { listing, loading, error } = useListing(slug || "");
  const { setCurrentListing, clearCurrentListing } = usePortalStore();
  useEffect(() => {
    if (listing?.id) setCurrentListing(listing.id, listing.title ?? '');
    return () => clearCurrentListing();
  }, [listing?.id, listing?.title]);
  const neighborhood = getNeighborhoodOptions('Gastronomy').find(
    (n) => ((listing?.category_tags as string[]) ?? []).includes(n)
  ) ?? '';
  const { listings: nearbyListings } = useNearbyListings(
    listing?.category ?? 'Gastronomy',
    'Detailed-Gastronomy',
    neighborhood,
    slug || ''
  );
  const [activeImg, setActiveImg] = useState(0);
  const [dealIdx, setDealIdx] = useState(0);

  const listingImages = getListingImages(listing, thumbnails);
  const heroImage = listingImages[activeImg] || thumbnails[0];
  const heroTitle = listing?.title || "Gastronomy Experience";
  const heroBreadcrumb = listing?.category
    ? `${listing.category} / ${listing.sub_category_id || "Dining"}`
    : "Gastronomy / Dining / Local Cuisine";
  const heroCompany = listing?.company_name || listing?.title?.split(" ")?.[0] || "GASTRONOMY";
  const heroSubtitle = listing?.subtitle || "Local culinary experiences and chef-led dining adventures.";
  const priceFrom = listing?.price_from ?? listing?.price ?? 85;
  const priceTo = listing?.price_to ?? priceFrom;
  const priceUnit = listing?.price_unit || "experience";
  const mapSrc = getListingMapSrc(listing);
  const contactCards = [
    {
      icon: Mail,
      label: "Email",
      sub: listing?.email || "Not available",
      href: listing?.email ? `mailto:${listing.email}` : "#",
    },
    {
      icon: Globe,
      label: "Website",
      sub: listing?.website ? listing.website.replace(/^https?:\/\//, "") : "Not available",
      href: listing?.website || "#",
    },
    {
      icon: Phone,
      label: "Phone",
      sub: listing?.phone || listing?.whatsapp || "Not available",
      href: listing?.phone
        ? `tel:${listing.phone}`
        : listing?.whatsapp
        ? `https://wa.me/${String(listing.whatsapp).replace(/\D/g, "")}`
        : "#",
    },
  ];
  const listingDescription =
    listing?.description ||
    listing?.about ||
    listing?.details ||
    "Savor Cartagena's most memorable culinary experiences, from waterfront seafood tables to intimate tasting menus inspired by local flavors.";

  const similarItems = nearbyListings.map((item) => ({
    image: item.image || thumbnails[0],
    category: item.category || "Gastronomy",
    title: item.title || "Untitled",
    subtitle: item.subtitle || "Local dining experience",
    rating: item.rating ?? 4,
    id: item.id,
    href: item.href,
  }));

  const deals = Array.isArray(listing?.deals) && listing.deals.length > 0 ? listing.deals : [];
  const faqs = Array.isArray(listing?.faqs) && listing.faqs.length > 0 ? listing.faqs : [];
  const keyFeatures = normalizeStringArray(listing?.key_features)
  const serviceItems = normalizeStringArray(listing?.services)
  const amenityItems = normalizeStringArray(listing?.amenities)

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold-light border-t-black" />
      </div>
    );
  }

  if (error && slug) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-500">Listing not found</h2>
        <a href="/gastronomy" className="text-gold underline">Return to Gastronomy</a>
      </div>
    );
  }

  return (
    <div className="bg-white font-sans w-full overflow-x-hidden">
      <div className="bg-white px-4 sm:px-6 md:px-10 lg:px-12 pt-5 md:pt-6 pb-6 md:pb-8">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[10px] md:text-xs text-gray-400 mb-3 md:mb-4 leading-none">
            La Carta &ndash; Cartagena Culture &amp; Tourism &rsaquo; Gastronomy
            &rsaquo; Dining &rsaquo; <span className="text-gray-700 font-semibold">{heroTitle}</span>
          </p>

          <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-6">
            <div className="flex items-start gap-3 flex-1 min-w-0 w-full lg:p-9 md:p-9 sm:p-9">
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black tracking-tight leading-none font-antigua">
                    {heroTitle}
                  </h1>
                  <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-red text-white text-[10px] md:text-xs font-extrabold flex items-center justify-center shrink-0 shadow">
                    {heroCompany?.[0] ?? "G"}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <p className="text-xs md:text-sm text-gray-500">{heroBreadcrumb}</p>
                  <p className="text-[10px] md:text-xs font-extrabold tracking-[0.2em] text-gray-700 uppercase">{heroCompany}</p>
                </div>

                <p className="mt-2 md:mt-6 text-sm md:text-base lg:text-[20px] text-gray-600 leading-snug font-semibold">
                  {heroSubtitle}
                </p>

                <div className="mt-3 md:mt-6">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-0.5">
                    Starting From
                  </p>
                  <p className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight font-antigua">
                    ${priceFrom} &ndash; ${priceTo}{" "}
                    <span className="text-sm md:text-base font-normal text-gray-500">/ {priceUnit}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-3 md:mt-6 flex-wrap">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  <span className="text-sm font-semibold cursor-pointer ml-1 text-black font-antigua">Leave Review</span>
                  <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-black text-white text-[9px] md:text-xs flex items-center justify-center font-bold leading-none">?</span>
                </div>

                <div className="flex items-center gap-2 md:gap-3 mt-4 md:mt-10 flex-wrap">
                  <button className="bg-gradient-to-l from-green-light to-green hover:bg-green transition text-white font-bold text-xs md:text-sm px-5 md:px-7 py-2.5 md:py-3 rounded-full shadow">
                    Reserve Now
                  </button>
                  <button className="bg-gradient-to-r from-gold to-gold-light hover:bg-gold transition text-white font-bold text-xs md:text-sm px-4 md:px-6 py-2.5 md:py-3 rounded-full shadow flex items-center gap-1.5 md:gap-2">
                    <span>🎁</span> Nos Promo
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-2 md:gap-2.5 w-full lg:w-auto lg:shrink-0 mt-4 lg:mt-0">
              <div className="rounded-2xl overflow-hidden shadow-lg flex-1 lg:flex-none" style={{ height: "auto" }}>
                <div className="lg:hidden w-full h-auto">
                  <img src={heroImage} alt={heroTitle} className="w-full h-full object-cover transition-all duration-700" />
                </div>
                <div className="hidden lg:block" style={{ width: "440px", height: "390px" }}>
                  <img src={heroImage} alt={heroTitle} className="w-full h-full object-cover transition-all duration-700" />
                </div>
              </div>
              <div className="flex flex-row sm:flex-col gap-1.5 md:gap-2 shrink-0">
                {listingImages.map((src, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-14 h-16 sm:w-16 sm:h-[72px] md:w-[70px] md:h-[90px] rounded-xl overflow-hidden cursor-pointer transition-all flex-shrink-0 ${i === activeImg ? "ring-2 ring-blue-500 ring-offset-1" : "opacity-70 hover:opacity-100"}`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-10 lg:px-12 pb-6 md:pb-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-5 md:gap-6 grid-cols-1 lg:grid-cols-[1.45fr_1fr]">
            <div className="space-y-4 md:space-y-5">
              <div className="bg-white rounded-2xl p-4 md:p-6">
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">About</p>
                <h2 className="text-xl md:text-2xl font-extrabold text-black font-antigua mb-3 md:mb-4">About {heroTitle}</h2>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{listingDescription}</p>
              </div>

              <div className="bg-[#f8f5e9] rounded-2xl p-5 md:p-10 border border-gold-light shadow-sm relative">
                <span className="absolute -top-3 left-5 bg-gradient-to-r from-gold to-gold-light text-white text-xs font-bold px-3 py-1 rounded-full">Road Map</span>
                <div className="flex items-center gap-2 mt-2 mb-4 font-antigua">
                  <span className="text-base"><CalendarDays className="text-gold" /></span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-black">DAY 01</h3>
                </div>
                <div className="relative ml-2 md:ml-4">
                  <div className="absolute left-1.5 top-0 bottom-0 w-0.5 bg-gold" />
                  {[
                    { time: "11:00 am", desc: "Arrival and welcome tasting menu." },
                    { time: "12:30 pm", desc: "Chef demonstration and local product tour." },
                    { time: "2:00 pm", desc: "Lunch with paired cocktails." },
                    { time: "4:00 pm", desc: "Dessert tasting and street food sample." },
                    { time: "6:00 pm", desc: "Evening drinks with live entertainment." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 mb-3 md:mb-3.5 relative pl-6 md:pl-8">
                      <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-gold border-2 border-gold shadow" />
                      <div>
                        <p className="font-bold text-black text-xs md:text-sm font-antigua">{item.time}</p>
                        <p className="text-[10px] md:text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="bg-[#f8f5e9] rounded-2xl p-4 md:p-5 border border-gold-light shadow-sm relative">
                <span className="absolute -top-3 left-5 bg-gradient-to-r from-gold to-gold-light text-white text-xs font-bold px-3 py-1 rounded-full">Information</span>
                <div className="mt-3">
                  <p className="text-xs text-black uppercase font-normal">Address</p>
                  <p className="text-xs md:text-lg font-bold text-black mt-1 leading-snug font-antigua">{listing?.address || listing?.location || "Address not available"}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-3 mt-3 md:mt-4 border-t border-amber-100 pt-3 md:pt-4">
                  <div>
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-black font-bold mb-0.5"><Clock size={10} /> Start Time</div>
                    <p className="font-bold text-black text-xs md:text-sm font-antigua">{listing?.start_time || listing?.start || "11:00 am"}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-black font-bold mb-0.5"><Clock size={10} /> End Time</div>
                    <p className="font-bold text-black text-xs md:text-sm font-antigua">{listing?.end_time || listing?.end || "10:00 pm"}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 md:gap-2.5">
                {contactCards.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target={item.href && item.href !== '#' ? '_blank' : undefined}
                    rel={item.href && item.href !== '#' ? 'noreferrer noopener' : undefined}
                    className="bg-[#f8f5e9] rounded-xl border border-gold-light shadow-sm p-2 md:p-3 flex flex-col items-center text-center gap-1 hover:border-gold transition"
                  >
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl backdrop-blur-lg bg-amber-50 flex items-center justify-center"><item.icon size={14} className="text-gold" /></div>
                    <p className="font-bold text-[10px] md:text-xs text-black">{item.label}</p>
                    <p className="text-[9px] md:text-[10px] text-black leading-tight font-bold break-all">{item.sub}</p>
                  </a>
                ))}
              </div>

              {deals.length > 0 && (
              <div className="bg-white rounded-2xl relative">
                <div className="flex items-center justify-between pt-3 md:pt-4 pb-1.5">
                  <p className="font-bold text-black text-xs md:text-sm font-antigua">Deals &amp; Promotions</p>
                  <span className="text-xs text-gold font-semibold font-antigua">{dealIdx + 1}/{deals.length}</span>
                </div>
                <div className="pb-3 md:pb-4 relative">
                  <div className="flex flex-col relative bg-[#f8f5e9] w-full h-[130px] rounded-xl p-3 md:p-4 border border-amber-100 shadow-sm">
                    <div className="flex items-start justify-between gap-2 relative">
                      <div className="flex-1 space-y-3 mb-3">
                        <p className="font-bold text-black text-xs md:text-sm font-antigua">{deals[dealIdx]?.title}</p>
                        <p className="text-[10px] md:text-xs text-gray-500 mt-1 leading-relaxed">{deals[dealIdx]?.desc}</p>
                      </div>
                      {deals[dealIdx]?.tag && (
                        <Badge className="absolute top-0 right-0 border-0 bg-gradient-to-r from-gold-light to-gold overflow-hidden text-white rounded-xl rounded-tl-none rounded-br-none text-xs">{deals[dealIdx]?.tag}</Badge>
                      )}
                    </div>
                    <div className="mt-auto flex items-center justify-between text-[10px] md:text-xs">
                      <div className="flex items-center gap-2 text-gray-500"><Calendar className="w-3 h-3" />{deals[dealIdx]?.valid}</div>
                      <button className="text-[#c89b2c] font-semibold flex items-center gap-2">Claim Offer →</button>
                    </div>
                    <button onClick={() => setDealIdx((p) => (p - 1 + deals.length) % deals.length)} className="absolute z-16 -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-l from-gold to-gold-light text-white flex items-center justify-center shadow"><ChevronLeft size={12} /></button>
                    <button onClick={() => setDealIdx((p) => (p + 1) % deals.length)} className="absolute z-16 -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-gold to-gold-light text-white flex items-center justify-center shadow"><ChevronRight size={12} /></button>
                  </div>
                </div>
                <div className="flex justify-center gap-1.5 pb-2.5 md:pb-3">
                  {deals.map((_, i) => (
                    <button key={i} onClick={() => setDealIdx(i)} className={`h-1.5 rounded-full transition-all ${i === dealIdx ? "bg-gold w-4" : "bg-gold w-1.5"}`} />
                  ))}
                </div>
              </div>
              )}

              <div className="bg-white rounded-2xl border border-gold-light shadow-sm p-3 md:p-4 text-center">
                <p className="font-bold text-black text-xs md:text-sm mb-2 md:mb-3 font-antigua">Also Available On</p>
                <div className="flex justify-center gap-2 md:gap-5 flex-wrap">
                  <button className="bg-green text-white flex gap-3 text-[10px] md:text-xs font-normal rounded-xl px-3 md:px-5 py-2 md:py-3 hover:bg-green transition"><span>Booking.com</span> <ExternalLink size={15} /></button>
                  <button className="bg-teal-700 flex gap-3 text-white text-[10px] md:text-xs font-normal rounded-xl px-3 md:px-5 py-2 md:py-3 hover:bg-teal-800 transition"><span>Airbnb</span> <ExternalLink size={15} /></button>
                  <button className="bg-blue-900 flex gap-3 text-white text-[10px] md:text-xs font-normal rounded-xl px-3 md:px-5 py-2 md:py-3 hover:bg-blue-800 transition"><span>Expedia</span> <ExternalLink size={15} /></button>
                </div>
              </div>

              <button className="w-full rounded-full bg-gradient-to-r from-gold to-gold-light font-antigua hover:bg-gold transition py-3 md:py-3.5 text-xs md:text-sm font-bold text-white shadow">Book with La Carta</button>
              <div className="flex items-center justify-center gap-2 text-[10px] md:text-xs text-gray-400 flex-wrap"><ShieldCheck size={12} /> Why book with Lacarta?</div>
              <p className="text-center text-[10px] md:text-xs text-gray-400 leading-relaxed">Secure payments, Verified listings, 24/7 support and Exclusive local experiences curated by Cartagena insiders.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-10 lg:px-12 py-6 md:py-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-4 md:mb-5">
            <p className="text-[10px] md:text-xs uppercase tracking-widest font-medium text-black/70 mb-1">Find Us</p>
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

      <div className="px-4 sm:px-6 md:px-10 lg:px-12 pb-6 md:pb-8">
        <div className="mx-auto max-w-[1200px] bg-white rounded-2xl p-5 md:p-8">
          <div className="text-center mb-5 md:mb-7">
            <p className="text-[10px] md:text-xs uppercase tracking-widest font-medium text-black/70 mb-1">What's Included</p>
            <h2 className="text-xl md:text-3xl font-extrabold text-black font-antigua">Services &amp; Amenities</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {([
              { title: "Key Features", items: keyFeatures, icon: Anchor },
              { title: "Services", items: serviceItems, icon: Coffee },
              { title: "Amenities", items: amenityItems, icon: Wifi },
            ].filter(col => col.items.length > 0) as Array<{ title: string; items: string[]; icon: any }>).map((col, ci) => (
              <div key={ci}>
                <h3 className="font-bold text-black text-sm sm:text-lg font-antigua md:text-base mb-3 md:mb-4 pb-3 border-b border-gold-light">{col.title}</h3>
                <div className="space-y-3 md:space-y-3.5">
                  {col.items.map((label, i) => (
                    <div key={i} className="flex items-start gap-2 md:gap-3">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-amber-50 flex items-center justify-center shrink-0"><col.icon size={13} className="text-amber-500" /></div>
                      <div>
                        <p className="font-normal text-gray-900 text-xs md:text-sm">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ReviewSection listingId={listing?.id ?? ''} />

      <div className="px-4 sm:px-6 md:px-10 lg:px-12 pb-6 md:pb-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="w-full mb-4 md:mb-5">
            <p className="text-[10px] md:text-xs uppercase w-full text-center tracking-widest font-medium text-black/70 mb-0.5">Explore</p>
            <h2 className="text-xl md:text-2xl font-extrabold text-center font-antigua text-black">Around This Place</h2>
          </div>
          {similarItems.length > 0 ? (
            <HorizontalSlider items={similarItems} />
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

      <div className="bg-[#fbf7ef] py-8 md:py-12 px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="mx-auto max-w-[950px]">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[10px] md:text-xs uppercase tracking-widest font-medium text-black/70 mb-1 md:mb-1.5">Questions?</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-antigua font-extrabold text-black">Frequently Asked</h2>
          </div>
          {faqs.length > 0 && (
          <Accordion type="single" collapsible className="space-y-2 md:space-y-3">
            {faqs.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 md:px-5">
                <AccordionTrigger className="text-left text-xs md:text-sm font-semibold text-black hover:no-underline py-3 md:py-4">{item.question}</AccordionTrigger>
                <AccordionContent className="text-xs md:text-sm text-gray-500 leading-relaxed pb-3 md:pb-4">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          )}
        </div>
      </div>
    </div>
  );
}
