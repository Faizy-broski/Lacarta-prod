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
  Shell,
  Palmtree,
  Footprints,
  Fish,
  Waves,
  Droplets,
  Thermometer,
  LifeBuoy,
  Heart,
  Share2,
  Star,
  ChevronDown,
  Leaf,
  Clock,
  CalendarDays,
  Luggage,
  Mail,
  Globe,
  Phone,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Coffee,
  Sparkles,
  Plane,
  Bath,
  Wifi,
  Umbrella,
  TreePalm,
  WavesIcon,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Utensils,
  GlassWater,
  MessageCircle,
  Users,
  Zap,
  Camera,
  Wind,
  Sun,
  Anchor,
} from "lucide-react";
import { Button } from "@public/components/ui/button";
import { Badge } from "@public/components/ui/badge";
import { useListing, useNearbyListings } from "@/lib/listings.hooks";
import { getNeighborhoodOptions } from "@public/data/filter-config";
import { getListingImages, getListingMapSrc, normalizeStringArray } from "@/portal/lib/listing-detail-utils";
import ReviewSection from "@public/components/listings/ReviewSection";
import FavoriteButton from "@public/components/listings/FavoriteButton";
import { usePortalStore } from "@public/store/portalStore";

const thumbnails = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800",
  "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800",
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
];


const categories = [
  { label: "Activities", rating: 4.6 },
  { label: "Hotels", rating: 3.8 },
  { label: "Beaches", rating: 4.4 },
  { label: "Boating", rating: 4.8 },
  { label: "Real Estate", rating: 4.5 },
  { label: "Gastronomy", rating: 4.2 },
];

const MAX_RATING = 5;


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
      {Array(total)
        .fill(0)
        .map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < count ? "fill-gold text-gold" : " text-gold"}`}
          />
        ))}
    </div>
  );
}

function HorizontalSlider({ items }) {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -230 : 230,
      behavior: "smooth",
    });
  };
  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute hidden sm:flex left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 md:-translate-x-4
                           h-10 w-10 rounded-full bg-gradient-to-r from-gold to-gold-light
                           flex items-center justify-center
                           text-white shadow-lg hover:scale-105 transition"
      >
        <ChevronLeft />
      </button>
      {/* <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-4 z-10 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-l from-gold to-gold-light text-white flex items-center justify-center shadow hover:bg-gold transition"
      >
        <ChevronLeft size={14} />
      </button> */}
      <div
        ref={scrollRef}
        // className="flex gap-3 md:gap-4 overflow-x-auto pb-2"
        className="w-full flex gap-2 sm:gap-4 px-3 sm:px-0 overflow-x-auto scroll-smooth snap-x snap-mandatory  no-scrollbar"

        // style={{
        //   scrollSnapType: "x mandatory",
        //   scrollbarWidth: "none",
        //   msOverflowStyle: "none",
        // }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="
                  // carousel-card
                  // w-full
                  // sm:w-[calc(50%-12px)]
                  // lg:w-[calc(25%-18px)]
                   carousel-card
                   px-1 sm:px-0
    snap-start
    shrink-0
    basis-full

    sm:basis-[calc((100%-16px)/2)]
    lg:basis-[calc((100%-48px)/4)]
    // basis-[100%]        /* 1 card mobile */
    // sm:basis-[50%]      /* 2 cards */
    // md:basis-[33.333%]  /* 3 cards */
    // lg:basis-[25%]      /* 4 cards */
    //  basis-full          /* 1 card mobile */
    // sm:basis-1/2        /* 2 cards */
    // md:basis-1/3        /* 3 cards */
    // lg:basis-1/4        /* 4 cards */
    // basis-[85%]          /* mobile: 1 card */
    // sm:basis-[48%]       /* small: 2 cards */
    // md:basis-[31%]       /* medium: 3 cards */
    // lg:basis-[23%]       /* large: 4 cards */
                "
            style={{ scrollSnapAlign: "start" }}
          >
            <Card className="h-full relative rounded-2xl shadow-md overflow-hidden bg-white">
              <FavoriteButton listingId={item.id ?? ''} className="absolute top-3 right-3" />
              <div className="absolute top-4 left-4 border-white border-4  bg-white/30 backdrop-md">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-10 w-16 object-cover"
                />
              </div>
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover"
              />

              <CardContent className="p-4">
                <h6 className="text-sm font-bold text-gray-600">
                  {item.category}
                </h6>

                <h3 className="text-lg font-semibold font-antigua text-black truncate">
                  {item.title}
                </h3>

                <p className="text-xs font-normal truncate text-gray-600">
                  {item.subtitle}
                </p>

                <div className="flex mt-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(item.rating)
                          ? "fill-gold text-gold"
                          : "text-gold"
                      }`}
                    />
                  ))}
                </div>

                <button className="mt-3 text-[#22c35d] font-semibold underline underline-offset-2">
                  MENU
                </button>
              </CardContent>
            </Card>
            {/* <div className="relative h-[120px] sm:h-[130px] md:h-[200px] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 border-white border-4  bg-white/30 backdrop-md">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-10 w-16 object-cover"
                />
              </div>
              <button className="absolute top-2 right-2 w-6 h-6 md:w-7 md:h-7  rounded-full flex items-center justify-center  shadow-lg  bg-white/30 backdrop-md">
                <Heart size={11} className=" fill-white text-white" />
              </button>
            </div>
            <div className="p-2.5 md:p-3">
              <p className="font-bold text-black text-xs md:text-sm leading-tight font-antigua">
                {item.title}
              </p>
              <p className="text-[10px] md:text-xs text-gray-500 mt-0.5">
                {item.location}
              </p>
              <div className="flex items-center gap-1.5 md:gap-2 mt-1.5 md:mt-2">
                <StarRow count={item.rating} />
              </div>
            </div> */}
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll("right")}
        className="absolute hidden sm:flex right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-4
                           h-10 w-10 rounded-full bg-gradient-to-l from-gold to-gold-light
                           flex items-center justify-center
                           text-white shadow-lg hover:scale-105 transition"
      >
        <ChevronRight />
      </button>
      {/* <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-4 z-10 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-gold to-gold-light text-white flex items-center justify-center shadow hover:bg-green transition"
      >
        <ChevronRight size={14} />
      </button> */}
    </div>
    // <div className="relative px-1">
    //   <button
    //     onClick={() => scroll("left")}
    //     className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-4 z-10 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-l from-gold to-gold-light text-white flex items-center justify-center shadow hover:bg-gold transition"
    //   >
    //     <ChevronLeft size={14} />
    //   </button>
    //   <div
    //     ref={scrollRef}
    //     className="flex gap-3 md:gap-4 overflow-x-auto pb-2"
    //     style={{
    //       scrollSnapType: "x mandatory",
    //       scrollbarWidth: "none",
    //       msOverflowStyle: "none",
    //     }}
    //   >
    //     {items.map((item, i) => (
    //       <div
    //         key={i}
    //         className="min-w-[170px] sm:min-w-[190px] md:min-w-[210px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow flex-shrink-0"
    //         style={{ scrollSnapAlign: "start" }}
    //       >
    //         <div className="relative h-[120px] sm:h-[130px] md:h-[145px] overflow-hidden">
    //           <img
    //             src={item.image}
    //             alt={item.title}
    //             className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
    //           />
    //           <div className="absolute top-2 left-2 border-white border-4  bg-white/30 backdrop-md">
    //             <img
    //               src={item.image}
    //               alt={item.title}
    //               className="h-10 w-16 object-cover"
    //             />
    //           </div>

    //           <button className="absolute top-2 right-2 w-6 h-6 md:w-7 md:h-7 bg-yellow-400 rounded-full flex items-center justify-center">
    //             <Heart size={11} className="text-black" />
    //           </button>
    //         </div>
    //         <div className="p-2.5 md:p-3">
    //           <p className="font-bold text-black text-xs md:text-sm leading-tight font-antigua">
    //             {item.title}
    //           </p>
    //           <p className="text-[10px] md:text-xs text-gray-500 mt-0.5">
    //             {item.location}
    //           </p>
    //           <div className="flex items-center gap-1.5 md:gap-2 mt-1.5 md:mt-2">
    //             <StarRow count={item.rating} />
    //             <span className="text-[10px] md:text-xs font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">
    //               {item.badge}
    //             </span>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    //   <button
    //     onClick={() => scroll("right")}
    //     className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-4 z-10 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-gold to-gold-light text-white flex items-center justify-center shadow hover:bg-green transition"
    //   >
    //     <ChevronRight size={14} />
    //   </button>
    // </div>
  );
}

function Horizontal2Slider({ items }) {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -230 : 230,
      behavior: "smooth",
    });
  };
  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute hidden sm:flex left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 md:-translate-x-4
                           h-10 w-10 rounded-full bg-gradient-to-r from-gold to-gold-light
                           flex items-center justify-center
                           text-white shadow-lg hover:scale-105 transition"
      >
        <ChevronLeft />
      </button>
      {/* <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-4 z-10 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-l from-gold to-gold-light text-white flex items-center justify-center shadow hover:bg-gold transition"
      >
        <ChevronLeft size={14} />
      </button> */}
      <div
        ref={scrollRef}
        // className="flex gap-3 md:gap-4 overflow-x-auto pb-2"
        className="w-full flex gap-2 sm:gap-4 px-3 sm:px-0 overflow-x-auto scroll-smooth snap-x snap-mandatory  no-scrollbar"

        // style={{
        //   scrollSnapType: "x mandatory",
        //   scrollbarWidth: "none",
        //   msOverflowStyle: "none",
        // }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="
                  // carousel-card
                  // w-full
                  // sm:w-[calc(50%-12px)]
                  // lg:w-[calc(25%-18px)]
                   carousel-card
                   px-1 sm:px-0
    snap-start
    shrink-0
    basis-full

    sm:basis-[calc((100%-16px)/2)]
    lg:basis-[calc((100%-48px)/4)]
    // basis-[100%]        /* 1 card mobile */
    // sm:basis-[50%]      /* 2 cards */
    // md:basis-[33.333%]  /* 3 cards */
    // lg:basis-[25%]      /* 4 cards */
    //  basis-full          /* 1 card mobile */
    // sm:basis-1/2        /* 2 cards */
    // md:basis-1/3        /* 3 cards */
    // lg:basis-1/4        /* 4 cards */
    // basis-[85%]          /* mobile: 1 card */
    // sm:basis-[48%]       /* small: 2 cards */
    // md:basis-[31%]       /* medium: 3 cards */
    // lg:basis-[23%]       /* large: 4 cards */
                "
            style={{ scrollSnapAlign: "start" }}
          >
            <Card className="h-full relative rounded-2xl shadow-md overflow-hidden bg-white">
              <FavoriteButton listingId={item.id ?? ''} className="absolute top-3 right-3" />
              <div className="absolute top-4 left-4 border-white border-4  bg-white/30 backdrop-md">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-10 w-16 object-cover"
                />
              </div>
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover"
              />

              <CardContent className="p-4">
                <h6 className="text-sm font-bold text-gray-600">
                  {item.category}
                </h6>

                <h3 className="text-lg font-semibold font-antigua text-black truncate">
                  {item.title}
                </h3>

                <p className="text-xs font-normal truncate text-gray-600">
                  {item.subtitle}
                </p>

                <div className="flex mt-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(item.rating)
                          ? "fill-gold text-gold"
                          : "text-gold"
                      }`}
                    />
                  ))}
                </div>

                <button className="mt-3 text-[#22c35d] font-semibold underline underline-offset-2">
                  MENU
                </button>
              </CardContent>
            </Card>
            {/* <div className="relative h-[120px] sm:h-[130px] md:h-[200px] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 border-white border-4  bg-white/30 backdrop-md">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-10 w-16 object-cover"
                />
              </div>
              <button className="absolute top-2 right-2 w-6 h-6 md:w-7 md:h-7  rounded-full flex items-center justify-center  shadow-lg  bg-white/30 backdrop-md">
                <Heart size={11} className=" fill-white text-white" />
              </button>
            </div>
            <div className="p-2.5 md:p-3">
              <p className="font-bold text-black text-xs md:text-sm leading-tight font-antigua">
                {item.title}
              </p>
              <p className="text-[10px] md:text-xs text-gray-500 mt-0.5">
                {item.location}
              </p>
              <div className="flex items-center gap-1.5 md:gap-2 mt-1.5 md:mt-2">
                <StarRow count={item.rating} />
              </div>
            </div> */}
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll("right")}
        className="absolute hidden sm:flex right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-4
                           h-10 w-10 rounded-full bg-gradient-to-l from-gold to-gold-light
                           flex items-center justify-center
                           text-white shadow-lg hover:scale-105 transition"
      >
        <ChevronRight />
      </button>
      {/* <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-4 z-10 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-gold to-gold-light text-white flex items-center justify-center shadow hover:bg-green transition"
      >
        <ChevronRight size={14} />
      </button> */}
    </div>
  );
}


export default function BeachDetails({ slug }: { slug?: string }) {
  const { listing, loading, error } = useListing(slug || "");
  const { setCurrentListing, clearCurrentListing } = usePortalStore();
  useEffect(() => {
    if (listing?.id) setCurrentListing(listing.id, listing.title ?? '');
    return () => clearCurrentListing();
  }, [listing?.id, listing?.title]);
  const neighborhood = getNeighborhoodOptions('Beaches').find(
    (n) => ((listing?.category_tags as string[]) ?? []).includes(n)
  ) ?? '';
  const { listings: nearbyListings } = useNearbyListings(
    listing?.category ?? 'Beaches',
    'Detailed-Beach',
    neighborhood,
    slug || ''
  );
  const [activeImg, setActiveImg] = useState(0);
  const [dealIdx, setDealIdx] = useState(0);

  const listingImages = getListingImages(listing, thumbnails);
  const heroImage = listingImages[activeImg] || thumbnails[0];
  const heroTitle = listing?.title || "Tierra bomba";
  const heroBreadcrumb = listing?.category
    ? `${listing.category} / ${listing.sub_category_id || "Island"}`
    : "Beaches / Island / Caribbean";
  const heroCompany = listing?.company_name || listing?.title?.split(" ")?.[0] || "ISLA BARÚ";
  const heroSubtitle = listing?.subtitle || "Eco-Luxury Glamping Experience in Isla Barú";
  const priceFrom = listing?.price_from ?? listing?.price ?? 177;
  const priceTo = listing?.price_to ?? priceFrom;
  const priceUnit = listing?.price_unit || "night";
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
    `Nestled on the pristine shores of Isla Barú, just a scenic boat ride from Cartagena's historic walls, Playa Scondida offers an unparalleled eco-luxury glamping experience. Here, the Caribbean Sea whispers secrets of ancient mariners, while the jungle canopy shelters you in its emerald embrace.`;

  const beachStartTime = listing?.beach_start || listing?.start_time || "11:50 – 22:00";
  const beachEndTime = listing?.beach_end || listing?.end_time || "10:00 – 14:00";

  const keyFeatures = normalizeStringArray(listing?.key_features);
  const services = normalizeStringArray(listing?.services);
  const amenities = normalizeStringArray(listing?.amenities);

  const travelTipIcons = [Clock, Sun, Luggage];
  const listingTravelTips =
    Array.isArray(listing?.travel_tips) && listing.travel_tips.length > 0
      ? listing.travel_tips.map((tip: any, index: number) => ({
          icon: travelTipIcons[index % travelTipIcons.length],
          label:
            typeof tip === "string"
              ? `Tip ${index + 1}`
              : tip.title || tip.label || tip.heading || `Tip ${index + 1}`,
          sub:
            typeof tip === "string"
              ? tip
              : tip.subtitle || tip.text || tip.description || "",
        }))
      : typeof listing?.travel_tips === "string"
      ? listing.travel_tips
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean)
          .map((tip, index) => ({
            icon: travelTipIcons[index % travelTipIcons.length],
            label: `Tip ${index + 1}`,
            sub: tip,
          }))
      : [];

  const travelTips = listingTravelTips.length > 0
    ? listingTravelTips
    : [
        {
          icon: Clock,
          label: "Getting There",
          sub: "45–60 min from Cartagena marina. Transfer included.",
        },
        {
          icon: Sun,
          label: "Best Time to Go",
          sub: "7am–10am for clearest waters & best visibility.",
        },
        {
          icon: Luggage,
          label: "What to Bring",
          sub: "Swimwear, reef-safe sunscreen, towel, camera.",
        },
      ];

  const listingDeals =
    Array.isArray(listing?.deals) && listing.deals.length > 0
      ? listing.deals
      : [];

  const featureItems = keyFeatures.map((label) => ({ icon: WavesIcon, label, sub: "" }));

  const serviceItems = services.map((label) => ({ icon: Umbrella, label, sub: "" }));

  const amenityItems = amenities.map((label) => ({ icon: Droplets, label, sub: "" }));

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
        <a href="/Beaches" className="text-gold underline">Return to Beaches</a>
      </div>
    );
  }

  return (
    <div className="bg-white font-sans w-full overflow-x-hidden">
      {/* WhatsApp Floating Button */}
      {/* <a
        href="https://wa.me/573151234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110"
      >
        <MessageCircle size={24} className="text-white" />
      </a> */}

      {/* ══ SECTION 1: HERO ══ */}
      <div className="bg-white px-4 sm:px-6 md:px-10 lg:px-12 pt-5 md:pt-6 pb-6 md:pb-8">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[10px] md:text-xs text-gray-400 mb-3 md:mb-4 leading-none">
              La Carta &ndash; Cartagena Culture &amp; Tourism &rsaquo; Beaches
              &rsaquo; Water Sports &rsaquo;{" "}
              <span className="text-gray-700 font-semibold">{heroTitle}</span>
          </p>

          <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-6">
            {/* LEFT: Title + Info */}
            <div className="flex items-start gap-3 flex-1 min-w-0 w-full lg:p-9 md:p-9 sm:p-9">
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black tracking-tight leading-none font-antigua">
                    {heroTitle}
                  </h1>
                  <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-red text-white text-[10px] md:text-xs font-extrabold flex items-center justify-center shrink-0 shadow">
                    {heroCompany?.[0] ?? "B"}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <p className="text-xs md:text-sm text-gray-500">
                    {heroBreadcrumb}
                  </p>
                  <p className="text-[10px] md:text-xs font-extrabold tracking-[0.2em] text-gray-700 uppercase">
                    {heroCompany}
                  </p>
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
                    <span className="text-sm md:text-base font-normal text-gray-500">
                      / {priceUnit}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-3 md:mt-6 flex-wrap">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  <span className="text-sm font-semibold cursor-pointer ml-1 text-black font-antigua">
                    Leave Review
                  </span>
                  <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-black text-white text-[9px] md:text-xs flex items-center justify-center font-bold leading-none">
                    ?
                  </span>
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

            {/* RIGHT: Main image + Thumbnails */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 md:gap-2.5 w-full lg:w-auto lg:shrink-0 mt-4 lg:mt-0">
              <div
                className="rounded-2xl overflow-hidden shadow-lg flex-1 lg:flex-none"
                style={{ height: "auto" }}
              >
                <div className="lg:hidden w-full h-auto">
                  <img
                    src={heroImage}
                    alt={heroTitle}
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>
                <div
                  className="hidden lg:block"
                  style={{ width: "440px", height: "390px" }}
                >
                  <img
                    src={heroImage}
                    alt={heroTitle}
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>
              </div>
              <div className="flex flex-row sm:flex-col gap-1.5 md:gap-2 shrink-0">
                {listingImages.map((src, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-14 h-16 sm:w-16 sm:h-[72px] md:w-[70px] md:h-[90px] rounded-xl overflow-hidden cursor-pointer transition-all flex-shrink-0 ${i === activeImg ? "ring-2 ring-blue-500 ring-offset-1" : "opacity-70 hover:opacity-100"}`}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ SECTION 2: ABOUT + SIDEBAR ══ */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-12 pb-6 md:pb-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-5 md:gap-6 grid-cols-1 lg:grid-cols-[1.45fr_1fr]">
            {/* ── LEFT COLUMN ── */}
            <div className="space-y-4 md:space-y-5">
              {/* About */}
              <div className="bg-white rounded-2xl p-4 md:p-6">
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">
                  About
                </p>
                <h2 className="text-xl md:text-2xl font-extrabold text-black font-antigua mb-3 md:mb-4">
                  About {heroTitle}
                </h2>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  {listingDescription}
                </p>
              </div>

              {/* Day Package / Road Map */}
              <div className="bg-[#f8f5e9] rounded-2xl p-5 md:p-10 border border-gold-light shadow-sm relative">
                <span className="absolute -top-3 left-5 bg-gradient-to-r from-gold to-gold-light text-white text-xs font-bold px-3 py-1 rounded-full">
                  Road Map
                </span>
                <div className="flex items-center gap-2 mt-2 mb-4 font-antigua">
                  <span className="text-base">
                    <CalendarDays className="text-gold" />
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-black">
                    DAY 01
                  </h3>
                </div>
                <div className="relative ml-2 md:ml-4">
                  <div className="absolute left-1.5 top-0 bottom-0 w-0.5 bg-gold" />
                  {[
                    {
                      time: "8am - 9am",
                      desc: "Boat departure from Muelle de la Bodeguita",
                    },
                    {
                      time: "9am - 10am",
                      desc: "Arrive & set up at beach — sunbed & umbrella",
                    },
                    {
                      time: "10am - 12pm",
                      desc: "Swimming, snorkeling & beach exploration",
                    },
                    {
                      time: "12pm - 2pm",
                      desc: "Fresh seafood lunch at beachside restaurant",
                    },
                    {
                      time: "2pm - 5pm",
                      desc: "Free time — volleyball, kayaking & relaxing",
                    },
                    {
                      time: "5pm - 6pm",
                      desc: "Sunset viewing & return boat to Cartagena",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-3 mb-3 md:mb-3.5 relative pl-6 md:pl-8"
                    >
                      <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-gold border-2 border-gold shadow" />
                      <div>
                        <p className="font-bold text-black text-xs md:text-sm font-antigua">
                          {item.time}
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-500">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beach Highlights */}
              {/* <div className="bg-[#f8f5e9] rounded-2xl p-4 md:p-5 border border-amber-100 shadow-sm relative">
                <span className="absolute -top-3 left-5 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full">
                  Highlights
                </span>
                <div className="mt-4 grid grid-cols-2 gap-2 md:gap-3">
                  {[
                    {
                      icon: Waves,
                      label: "Crystal Clear Water",
                      desc: "Turquoise Caribbean sea",
                    },
                    {
                      icon: Camera,
                      label: "Photography Spots",
                      desc: "Stunning natural backdrops",
                    },
                    {
                      icon: Fish,
                      label: "Marine Life",
                      desc: "Colorful reef fish & corals",
                    },
                    {
                      icon: Sun,
                      label: "Year-round Sun",
                      desc: "Perfect tropical climate",
                    },
                    {
                      icon: Users,
                      label: "Beach Capacity",
                      desc: "Max 200 visitors/day",
                    },
                    {
                      icon: LifeBuoy,
                      label: "Safety Services",
                      desc: "Lifeguards on duty",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-2.5 md:p-3 bg-white shadow-sm border border-amber-200 flex items-start gap-2"
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                        <item.icon size={13} className="text-amber-500" />
                      </div>
                      <div>
                        <p className="font-bold text-black text-[10px] md:text-xs font-antigua">
                          {item.label}
                        </p>
                        <p className="text-[9px] md:text-[10px] text-gray-400">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="space-y-3 md:space-y-4">
              {/* Information */}
              <div className="bg-[#f8f5e9] rounded-2xl p-4 md:p-5 border border-gold-light shadow-sm relative">
                <span className="absolute -top-3 left-5 bg-gradient-to-r from-gold to-gold-light text-white text-xs font-bold px-3 py-1 rounded-full">
                  Information
                </span>
                <div className="mt-3">
                  <p className="text-xs text-black uppercase font-normal">
                    Address
                  </p>
                  <p className="text-xs md:text-lg font-bold text-black mt-1 leading-snug font-antigua">
                    {listing?.address || listing?.location || "Address not available"}
                  </p>
                </div>
                <div className="bg-[#f4f1e6] rounded-xl p-4 md:p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 font-bold text-black text-sm md:text-base">
                      <Clock size={16} />
                      Beach Hours:
                    </div>
                    <ChevronDown size={18} className="text-black" />
                  </div>

                  {/* Content Rows */}
                  <div className="space-y-3 md:space-y-4">
                    {[
                      { label: "Pick Up Time", time: listing?.pickup_time || "11:50 – 21:50" },
                      { label: "Travel Duration", time: listing?.travel_duration || "11:50 – 22:00" },
                      { label: "Beach Start Time", time: beachStartTime },
                      { label: "Beach End Time", time: beachEndTime },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center"
                      >
                        <p className="text-xs md:text-sm font-semibold text-black">
                          {item.label}
                        </p>
                        <p className="text-sm md:text-lg font-antigua font-bold text-start text-black">
                          {item.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* <div className="grid grid-cols-2 gap-2 md:gap-3 mt-3 md:mt-4 border-t border-amber-100 pt-3 md:pt-4">
                  <div>
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-black font-bold mb-0.5">
                      <Clock size={10} /> Start Time
                    </div>
                    <p className="font-bold text-black text-xs md:text-sm font-antigua">
                      9:00 am
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-black font-bold mb-0.5">
                      <Clock size={10} /> End Time
                    </div>
                    <p className="font-bold text-black text-xs md:text-sm font-antigua">
                      9:00 pm
                    </p>
                  </div>
                </div> */}
                {/* Beach Conditions — beach-specific extra info */}
                {/* <div className="grid grid-cols-3 gap-2 mt-3 md:mt-4 border-t border-amber-100 pt-3 md:pt-4">
                  {[
                    { icon: Thermometer, label: "Water Temp", val: "28°C" },
                    { icon: Wind, label: "Wind", val: "12 km/h" },
                    { icon: Droplets, label: "Waves", val: "Calm" },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="flex justify-center mb-0.5">
                        <item.icon size={12} className="text-amber-500" />
                      </div>
                      <p className="text-[9px] md:text-[10px] text-gray-400 font-bold">
                        {item.label}
                      </p>
                      <p className="font-bold text-black text-[10px] md:text-xs font-antigua">
                        {item.val}
                      </p>
                    </div>
                  ))}
                </div> */}
              </div>

              {/* 3 Contact Icons */}
              <div className="grid grid-cols-3 gap-2 md:gap-2.5">
                {contactCards.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target={item.href && item.href !== '#' ? '_blank' : undefined}
                    rel={item.href && item.href !== '#' ? 'noreferrer noopener' : undefined}
                    className="bg-[#f8f5e9] rounded-xl border border-gold-light shadow-sm p-2 md:p-3 flex flex-col items-center text-center gap-1 hover:border-gold transition"
                  >
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl backdrop-blur-lg bg-amber-50 flex items-center justify-center">
                      <item.icon size={14} className="text-gold" />
                    </div>
                    <p className="font-bold text-[10px] md:text-xs text-black">
                      {item.label}
                    </p>
                    <p className="text-[9px] md:text-[10px] text-black leading-tight font-bold break-all">
                      {item.sub}
                    </p>
                  </a>
                ))}
              </div>

              {/* Deals Slider */}

              {listingDeals.length > 0 && (
              <div className="bg-white rounded-2xl  relative ">
                <div className="flex items-center justify-between  pt-3 md:pt-4 pb-1.5">
                  <p className="font-bold text-black text-xs md:text-sm font-antigua">
                    Deals &amp; Promotions
                  </p>
                  <span className="text-xs text-gold font-semibold font-antigua">
                      {dealIdx + 1}/{listingDeals.length}
                    </span>
                  </div>
                  <div className=" pb-3 md:pb-4 relative ">
                    <div className="flex flex-col relative bg-[#f8f5e9] w-full h-[130px] rounded-xl p-3 md:p-4 border border-amber-100 shadow-sm">
                      <div className="flex items-start justify-between gap-2 relative">
                        <div className="flex-1  space-y-3 mb-3">
                          <p className="font-bold text-black text-xs md:text-sm font-antigua">
                            {listingDeals[dealIdx]?.title}
                          </p>
                          <p className="text-[10px] md:text-xs text-gray-500 mt-1 leading-relaxed">
                            {listingDeals[dealIdx]?.desc}
                          </p>
                        </div>
                      </div>
                      {listingDeals[dealIdx]?.tag && (
                        <Badge className="absolute top-0 right-0 border-0 bg-gradient-to-r from-gold-light to-gold overflow-hidden text-white  rounded-xl rounded-tl-none rounded-br-none  text-xs">
                          {listingDeals[dealIdx]?.tag}
                        </Badge>
                      )}
                      <div className="mt-auto flex items-center justify-between text-[10px] md:text-xs ">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {listingDeals[dealIdx]?.valid}
                        </div>

                        <button className="text-[#c89b2c] font-semibold flex items-center gap-2">
                          Claim Offer →
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          setDealIdx(
                            (p) =>
                              (p - 1 + listingDeals.length) % listingDeals.length,
                          )
                        }
                        className="absolute z-16 -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-l from-gold to-gold-light text-white flex items-center justify-center shadow"
                      >
                        <ChevronLeft size={12} />
                      </button>

                      <button
                        onClick={() =>
                          setDealIdx((p) => (p + 1) % listingDeals.length)
                        }
                        className="absolute z-16 -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-gold to-gold-light text-white flex items-center justify-center shadow"
                      >
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center gap-1.5 pb-2.5 md:pb-3">
                    {listingDeals.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setDealIdx(i)}
                        className={`h-1.5 rounded-full transition-all ${i === dealIdx ? "bg-gold w-4" : "bg-gold w-1.5"}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Also Available On */}
              <div className="bg-white rounded-2xl border border-gold-light shadow-sm p-3 md:p-4 text-center">
                <p className="font-bold text-black text-xs md:text-sm mb-2 md:mb-3 font-antigua">
                  Also Available On
                </p>
                <div className="flex justify-center gap-2 md:gap-5 flex-wrap">
                  <button className="bg-green text-white flex  gap-3 text-[10px] md:text-xs font-normal rounded-xl px-3 md:px-5 py-2 md:py-3 hover:bg-green transition">
                    <span>Booking.com</span> <ExternalLink size={15} />
                  </button>
                  <button className="bg-teal-700 flex gap-3 text-white text-[10px] md:text-xs font-normal rounded-xl px-3 md:px-75 py-2 md:py-3 hover:bg-teal-800 transition">
                    <span>Airbnb</span> <ExternalLink size={15} />
                  </button>
                  <button className="bg-blue-900 flex gap-3 text-white text-[10px] md:text-xs font-normal rounded-xl px-3 md:px-5 py-2 md:py-3 hover:bg-blue-800 transition">
                    <span>Expedia</span> <ExternalLink size={15} />
                  </button>
                </div>
              </div>

              {/* Book with La Carta CTA */}
              <button className="w-full rounded-full bg-gradient-to-r from-gold to-gold-light font-antigua hover:bg-gold transition py-3 md:py-3.5 text-xs md:text-sm font-bold text-white shadow">
                Book with La Carta
              </button>
              <div className="flex items-center justify-center gap-2 text-[10px] md:text-xs text-gray-400 flex-wrap">
                <ShieldCheck size={12} />
                Why book with Lacarta?
              </div>
              <p className="text-center text-[10px] md:text-xs text-gray-400 leading-relaxed">
                Secure payments, Verified listings, 24/7 support and Exclusive
                local experiences curated by Cartagena insiders.
              </p>

              {/* Booking Info — Beach specific */}
              <div className="rounded-2xl p-3 md:p-5 relative">
                <span className="absolute -top-3 left-2 text-black font-bold text-xs md:text-sm px-3 py-1 rounded-full font-antigua">
                  Travel Tips
                </span>
                <div className="mt-3 space-y-2 md:space-y-3">
                  {travelTips.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 md:gap-3 bg-[#f8f5e9] rounded-xl p-2.5 md:p-3 border border-gold-light"
                    >
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                        <item.icon size={12} className="text-amber-600" />
                      </div>
                      <div>
                        <p className="font-bold text-black text-xs md:text-sm font-antigua">
                          {item.label}
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-500">
                          {item.sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ SECTION 3: LOCATION ══ */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-12 py-6 md:py-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-4 md:mb-5">
            <p className="text-[10px] md:text-xs uppercase tracking-widest font-medium text-black/70 mb-1">
              Find Us
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-antigua text-black">
              Location &amp; Getting There
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 h-[220px] sm:h-[280px] md:h-[320px]">
            <iframe
              title="Location Map"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              src={mapSrc}
            />
          </div>
          {listing?.address && (
            <p className="mt-3 text-sm text-gray-600 flex items-center gap-2 font-medium">
              <MapPin size={16} className="text-gold" /> {listing.address}
            </p>
          )}
        </div>
      </div>

      {/* ══ SECTION 4: SERVICES & AMENITIES ══ */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-12 pb-6 md:pb-8">
        <div className="mx-auto max-w-[1200px] bg-white rounded-2xl p-5 md:p-8">
          <div className="text-center mb-5 md:mb-7">
            <p className="text-[10px] md:text-xs uppercase tracking-widest font-medium text-black/70 mb-1">
              What's Included
            </p>
            <h2 className="text-xl md:text-3xl font-extrabold text-black font-antigua">
              Services &amp; Amenities
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {([
              { title: "Key Features", items: featureItems, hasSub: false },
              { title: "Services", items: serviceItems, hasSub: false },
              { title: "Amenities", items: amenityItems, hasSub: false },
            ].filter(col => col.items.length > 0)).map((col, ci) => (
              <div key={ci}>
                <h3 className="font-bold text-black text-sm sm:text-lg font-antigua md:text-base mb-3 md:mb-4 pb-3 border-b border-gold-light">
                  {col.title}
                </h3>
                <div className="space-y-3 md:space-y-3.5">
                  {col.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 md:gap-3">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                        <item.icon size={13} className="text-amber-500" />
                      </div>
                      <div>
                        <p className="font-normal text-gray-900 text-xs md:text-sm">
                          {item.label}
                        </p>
                        {col.hasSub && item.sub && (
                          <p className="text-[10px] md:text-xs text-gray-400">
                            {item.sub}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ SECTION 5: AROUND THIS PLACE ══ */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-12 pb-6 md:pb-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="w-full mb-4 md:mb-5">
            <p className="text-[10px] md:text-xs uppercase w-full text-center tracking-widest font-medium text-black/70 mb-0.5">
              Explore
            </p>
            <h2 className="text-xl md:text-2xl font-extrabold text-center font-antigua text-black">
              Around This Place
            </h2>
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

      {/* ══ SECTION 6: FAQ ══ */}
      <div className="bg-[#fbf7ef] py-8 md:py-12 px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="mx-auto max-w-[950px]">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[10px] md:text-xs uppercase tracking-widest font-medium text-black/70 mb-1 md:mb-1.5">
              Questions?
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-antigua font-extrabold text-black">
              Frequently Asked
            </h2>
          </div>
          <Accordion
            type="single"
            collapsible
            className="space-y-2 md:space-y-3"
          >
            {(Array.isArray(listing?.faqs) && listing.faqs.length > 0 ? listing.faqs : []).map((item: any, i: number) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 md:px-5"
              >
                <AccordionTrigger className="text-left text-xs md:text-sm font-semibold text-black hover:no-underline py-3 md:py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs md:text-sm text-gray-500 leading-relaxed pb-3 md:pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* <div className="mt-5 md:mt-6 space-y-2 md:space-y-3">
            <nav className="hidden sm:grid grid-cols-3 md:grid-cols-6 gap-1.5 md:gap-2">
              {Object.keys(tagRoutes).map((tag) => (
                <Link key={tag} href={tagRoutes[tag]}>
                  <button className="w-full bg-white text-black font-bold shadow text-[10px] md:text-xs py-1.5 md:py-2 rounded hover:bg-gray-50 transition border border-gray-100">
                    {tag}
                  </button>
                </Link>
              ))}
            </nav>
            <div className="flex bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <input
                className="flex-grow px-3 md:px-4 py-2.5 md:py-3 bg-white text-black outline-none text-xs md:text-sm"
                type="text"
                placeholder="Search for Anything"
              />
              <button className="bg-gold hover:bg-gold transition text-white font-bold px-4 md:px-6 py-2.5 md:py-3 text-xs md:text-sm">
                Search
              </button>
            </div>
          </div> */}
        </div>
      </div>

      <ReviewSection listingId={listing?.id ?? ''} />

      {/* ══ SECTION 8: PREMIUM LISTING ══ */}
      {/* <div className="bg-[#fbf7ef] py-6 md:py-8 px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="mx-auto max-w-[1200px]"> */}
      <section className=" bg-[#fbf7ef] mx-auto px-6 py-6 md:py-8 md:px-10 pb-0 mb-0">
        <div className="w-full sm:container sm:mx-auto">
          <div className="flex-col sm:flex-row flex items-center justify-between">
            <h2 className="text-xl md:text-3xl font-extrabold font-antigua text-black">
              Premium Listing
            </h2>
            <div className="flex gap-1.5 md:gap-2 self-end ">
              <button className="bg-gradient-to-b from-red to-red-light text-white text-[10px] md:text-xs font-bold rounded-full px-3 md:px-4 py-1.5 md:py-2 hover:bg-red transition">
                Clear Filters
              </button>
              <button className="bg-gradient-to-r from-green to-green-light  text-white text-[10px] md:text-xs font-bold rounded-full px-3 md:px-4 py-1.5 md:py-2 hover:bg-green transition">
                + Filters
              </button>
            </div>
          </div>
          <Horizontal2Slider items={nearbyListings.map(l => ({ image: l.image, category: l.category, title: l.title, subtitle: l.subtitle, rating: l.rating, href: l.href }))} />
        </div>
        {/* </div> */}
      </section>

      {/* ══ SECTION 9: NEWSLETTER (Activity-specific, from image 2) ══ */}
      {/* <div
             className="relative py-14 md:py-20 px-4 sm:px-6 md:px-10 lg:px-12 overflow-hidden"
             style={{
               backgroundImage:
                 "url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1400')",
               backgroundSize: "cover",
               backgroundPosition: "center",
             }}
           >
             <div className="absolute inset-0 bg-black/60" />
             <div className="relative mx-auto max-w-[700px] text-center">
               <p className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-amber-400 mb-2">
                 Stay Updated
               </p>
               <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-antigua mb-3 md:mb-4">
                 Cartagena Newsletter
               </h2>
               <p className="text-sm md:text-base text-white/80 mb-6 md:mb-8 leading-relaxed">
                 Subscribe to get exclusive deals, activity updates, and insider tips
                 from our local experts — straight to your inbox.
               </p>
               <div className="flex flex-col sm:flex-row gap-2 md:gap-3 max-w-[500px] mx-auto">
                 <input
                   type="email"
                   placeholder="Your email address"
                   className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/60 text-xs md:text-sm outline-none focus:border-amber-400 transition backdrop-blur-sm"
                 />
                 <button className="bg-gold hover:bg-gold transition text-white font-bold text-xs md:text-sm px-6 py-3 rounded-full shadow whitespace-nowrap">
                   Subscribe Now
                 </button>
               </div>
               <p className="text-[10px] text-white/40 mt-3">
                 No spam. Unsubscribe anytime.
               </p>
             </div>
           </div> */}
    </div>
  );
}
