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
  Mail,
  Heart,
  Thermometer,
  LifeBuoy,
  Share2,
  Clock,
  Navigation,
  ChevronDown,
  Fuel,
  Ship,
  Compass,
  CalendarDays,
  Luggage,
  Star,
  Radio,
  ExternalLink,
  Calendar,
  Plane,
  Bath,
  Wifi,
  Umbrella,
  TreePalm,
  WavesIcon,
  Zap,
  Wind,
  Sun,
  Anchor,
  Globe,
  Phone,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  Utensils,
  GlassWater,
  Coffee,
  Wine,
  Music,
  Users,
  Camera,
  Leaf,
  Sparkles,
  CheckCircle,
  Facebook,
  Instagram,
  Youtube,
  Loader2,
} from "lucide-react";
import { useListing, useNearbyListings } from "@/lib/listings.hooks";
import { getNeighborhoodOptions } from "@public/data/filter-config";
import ReviewSection from "@public/components/listings/ReviewSection";
import FavoriteButton from "@public/components/listings/FavoriteButton";
import { usePortalStore } from "@public/store/portalStore";
import { Button } from "@public/components/ui/button";
import { Badge } from "@public/components/ui/badge";

const thumbnails = [
  "https://static.vecteezy.com/system/resources/previews/055/509/727/non_2x/luxurious-tree-house-overlooking-tropical-rainforest-in-bali-photo.jpg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-632871632327570609/original/d43297f3-0041-4fb8-a9fd-f5ce479a7c25.jpeg",
  "https://a0.muscache.com/im/pictures/816242d3-a4e6-43cc-80a8-1cd3174f65c2.jpg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-813029650994267143/original/4cfece71-e34e-41ec-b199-9f6c16551d31.jpeg",
];

const sliderPlaces = [];

const normalizeStringArray = (value: any): string[] => {
  if (!value) return []
  if (Array.isArray(value)) {
    return value
      .map((item) =>
        typeof item === 'string'
          ? item
          : item?.name || item?.label || item?.title || ''
      )
      .filter(Boolean)
  }
  if (typeof value === 'string') {
    return value.split(',').map((item) => item.trim()).filter(Boolean)
  }
  return []
}

const normalizeLinkArray = (value: any): { label: string; url: string }[] => {
  if (!value) return []
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (!item) return null
        if (typeof item === 'string') {
          return {
            label: item.replace(/^https?:\/\//, '').replace(/\/.*$/, ''),
            url: item,
          }
        }

        const url = item.url || item.link || item.website || item.address || ''
        if (!url) return null

        return {
          label: item.platform || item.name || item.label || item.title || url.replace(/^https?:\/\//, '').replace(/\/.*$/, ''),
          url,
        }
      })
      .filter((item): item is { label: string; url: string } => Boolean(item && item.url))
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((url) => ({
        label: url.replace(/^https?:\/\//, '').replace(/\/.*$/, ''),
        url,
      }))
  }
  return []
}

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

export default function DetailedHotel({ slug }: { slug?: string }) {
  const { listing, loading, error } = useListing(slug || "");
  const { setCurrentListing, clearCurrentListing } = usePortalStore();
  useEffect(() => {
    if (listing?.id) setCurrentListing(listing.id, listing.title ?? '');
    return () => clearCurrentListing();
  }, [listing?.id, listing?.title]);
  const neighborhood = (getNeighborhoodOptions('Hotels')).find(
    (n) => ((listing?.category_tags as string[]) ?? []).includes(n)
  ) ?? '';
  const { listings: nearbyListings } = useNearbyListings(
    listing?.category ?? 'Hotels',
    'Detailed-Hotel',
    neighborhood,
    slug || ''
  );
  const [activeImg, setActiveImg] = useState(0);
  const [menuTab, setMenuTab] = useState("Brunch");
  const [dealIdx, setDealIdx] = useState(0);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 animate-spin text-[#d0a439]" />
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-500">Listing not found</h2>
        <a href="/hotels" className="text-gold underline">Return to Hotels</a>
      </div>
    );
  }

  const mappedSimilar = nearbyListings.map(l => ({
    image: l.image,
    title: l.title,
    subtitle: l.subtitle,
    category: l.category || "Hotel",
    rating: l.rating ?? 5,
    href: l.href,
    id: l.id,
  }));

  const keyFeatures = normalizeStringArray(listing.key_features)
  const serviceItems = normalizeStringArray(listing.services)
  const amenityItems = normalizeStringArray(listing.amenities)

  const travelTips = Array.isArray(listing.travel_tips)
    ? listing.travel_tips.map((item: any) => ({
        label: item.label || item.title || item.name || 'Travel Tip',
        sub: item.sub || item.subtitle || item.description || '',
        icon: item.icon ?? null,
      }))
    : normalizeStringArray(listing.travel_tips).map((title) => ({ label: title, sub: '', icon: null }))

  const scheduleStart =
    listing.start_time ||
    listing.weekly_hours?.monday?.slots?.[0]?.start ||
    'Not available'
  const scheduleEnd =
    listing.end_time || listing.weekly_hours?.monday?.slots?.[0]?.end || 'Not available'

  const contactCards = [
    {
      icon: Mail,
      label: 'Email',
      sub: listing.email || 'Not available',
      href: listing.email ? `mailto:${listing.email}` : '',
    },
    {
      icon: Globe,
      label: 'Website',
      sub: listing.website ? listing.website.replace(/^https?:\/\//, '') : 'Not available',
      href: listing.website || '',
    },
    {
      icon: Phone,
      label: 'Phone',
      sub: listing.phone || listing.whatsapp || 'Not available',
      href: listing.phone
        ? `tel:${listing.phone}`
        : listing.whatsapp
        ? `https://wa.me/${String(listing.whatsapp).replace(/\D/g, '')}`
        : '',
    },
  ]

  const listingDeals =
    Array.isArray(listing.deals) && listing.deals.length > 0
      ? listing.deals
      : []

  const currentDeal = listingDeals[dealIdx]
  const currentDealDescription =
    currentDeal?.description ||
    currentDeal?.offers_description ||
    currentDeal?.subtitle ||
    ''
  const currentDealTag =
    currentDeal?.deal_type
      ? currentDeal.deal_type.replace(/_/g, ' ').toUpperCase()
      : currentDeal?.coupon_code || ''
  const currentDealValid =
    currentDeal?.start_date && currentDeal?.end_date
      ? `${currentDeal.start_date} to ${currentDeal.end_date}`
      : currentDeal?.discount
      ? `${currentDeal.discount} OFF`
      : currentDeal?.coupon_code
      ? `Code: ${currentDeal.coupon_code}`
      : ''

  const weeklyHoursDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const
  const weeklyHours = weeklyHoursDays.map((day) => {
    const dayData = listing.weekly_hours?.[day] || {}
    const slots = Array.isArray(dayData.slots)
      ? dayData.slots.filter((slot: any) => slot?.start || slot?.end)
      : []
    return {
      day,
      label: day[0].toUpperCase() + day.slice(1),
      open: !!dayData.open,
      slots,
    }
  })
  const hasWeeklyHours = weeklyHours.some((day) => day.open && day.slots.length > 0)
  const listingRoadMap = Array.isArray(listing.road_map) ? listing.road_map : []
  const hasRoadMap = listingRoadMap.length > 0

  const alsoAvailableLinks = normalizeLinkArray(
    listing.also_available_on ||
      listing.direct_links ||
      listing.reservation_links ||
      listing.extra_social_links ||
      (listing.website ? [{ platform: 'Website', url: listing.website }] : [])
  )

  const whatsIncludedItems = Array.isArray(listing?.whats_included?.items)
    ? listing.whats_included.items
    : []
  const importantInfoItems = Array.isArray(listing?.important_info?.items)
    ? listing.important_info.items
    : []

  const serviceColumns = [
    {
      title: 'Key Features',
      items: keyFeatures,
      hasSub: false,
      icon: WavesIcon,
    },
    {
      title: 'Services',
      items: serviceItems,
      hasSub: false,
      icon: LifeBuoy,
    },
    {
      title: 'Amenities',
      items: amenityItems,
      hasSub: false,
      icon: Droplets,
    },
  ]

  const pageSpecialties = keyFeatures.map((label) => ({ label, sub: '' }))

  const listingMapSrc =
    typeof listing.google_maps_link === 'string' && listing.google_maps_link.includes('output=embed')
      ? listing.google_maps_link
      : listing.latitude && listing.longitude
      ? `https://maps.google.com/maps?q=${listing.latitude},${listing.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`
      : listing.address
      ? `https://maps.google.com/maps?q=${encodeURIComponent(listing.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
      : 'https://maps.google.com/maps?q=Cartagena+Colombia&t=&z=15&ie=UTF8&iwloc=&output=embed'

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

      {/* HERO */}
      <div className="bg-white px-4 sm:px-6 md:px-10 lg:px-12 pt-5 md:pt-6 pb-6 md:pb-8">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[10px] md:text-xs text-gray-400 mb-3 md:mb-4 leading-none">
            La Carta &ndash; Cartagena Culture &amp; Tourism &rsaquo;{' '}
            {listing.category ? `${listing.category} &rsaquo; ` : ''}
            {listing.sub_category_id ? 'Glamping/Nature &rsaquo; ' : 'Hotel &rsaquo; '}
            <span className="text-gray-700 font-semibold">
              {listing.title}
            </span>
          </p>

          <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-6">
            {/* LEFT: Title + Info */}
            <div className="flex items-start gap-3 flex-1 min-w-0 w-full lg:p-9 md:p-9 sm:p-9">
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black tracking-tight leading-none font-antigua uppercase">
                    {listing.title}
                  </h1>
                  <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-red text-white text-[10px] md:text-xs font-extrabold flex items-center justify-center shrink-0 shadow">
                    {listing.title?.[0]?.toUpperCase() ?? "K"}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <p className="text-xs md:text-sm text-gray-500">
                    {listing.category} / {listing.sub_category_id ? 'Glamping / Nature' : 'Hotel'}
                  </p>
                  <p className="text-[10px] md:text-xs font-extrabold tracking-[0.2em] text-gray-700 uppercase">
                    {listing.seo_slug?.replace(/-/g, ' ')}
                  </p>
                </div>

                <p className="text-[10px] md:text-xs font-extrabold tracking-[0.2em] text-gray-700 uppercase">
                   {listing.subtitle}
                </p>

                <div className="mt-3 md:mt-6">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-0.5">
                    Starting From
                  </p>
                  <p className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight font-antigua">
                    ${listing.price_from} &ndash; ${listing.price_to}{" "}
                    <span className="text-sm md:text-base font-normal text-gray-500">
                      / {listing.price_unit ?? 'night'}
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
                
                {/* Contact & Socials */}
                <div className="flex items-center gap-3 mt-4 md:mt-6">
                  {listing.facebook && <a href={listing.facebook} target="_blank" className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition shadow"><Facebook size={18} /></a>}
                  {listing.instagram && <a href={listing.instagram} target="_blank" className="p-2 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100 transition shadow"><Instagram size={18} /></a>}
                  {listing.whatsapp && <a href={`https://wa.me/${listing.whatsapp.replace(/\D/g,'')}`} target="_blank" className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition shadow"><MessageCircle size={18} /></a>}
                  {listing.email && <a href={`mailto:${listing.email}`} className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition shadow"><Mail size={18} /></a>}
                  {listing.website && <a href={listing.website} target="_blank" className="p-2 rounded-full bg-gray-50 text-gray-800 hover:bg-gray-100 transition shadow"><Globe size={18} /></a>}
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
                    src={(listing.images && listing.images.length > 0) ? listing.images[activeImg] : listing.cover_image || thumbnails[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>
                <div
                  className="hidden lg:block"
                  style={{ width: "440px", height: "390px" }}
                >
                  <img
                    src={(listing.images && listing.images.length > 0) ? listing.images[activeImg] : listing.cover_image || thumbnails[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>
              </div>
              <div className="flex flex-row sm:flex-col gap-1.5 md:gap-2 shrink-0">
                {(listing.images && listing.images.length > 0 ? listing.images : [listing.cover_image]).map((src: any, i: any) => (
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
                  About {listing.title}
                </h2>
                <div 
                  className="text-gray-600 text-xs md:text-sm leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: listing.description || 'No description available for this listing.' }} 
                />
              </div>

              {hasRoadMap && (
              <div className="bg-[#f8f5e9] rounded-2xl p-5 md:p-8 border border-gold-light shadow-sm relative">
                <span className="absolute -top-3 left-6 bg-gradient-to-r from-gold to-gold-light text-white text-xs font-bold px-3 py-1 rounded-full">
                  Road Map
                </span>
                <div className="mt-4 space-y-6">
                  {listingRoadMap.map((day: any, dayIndex: number) => (
                    <div key={dayIndex} className="rounded-2xl bg-white p-4 border border-amber-100 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
                          {String(day.day ?? dayIndex + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-black font-antigua">
                            {day.title || `Day ${dayIndex + 1}`}
                          </p>
                          {day.subtitle && <p className="text-xs text-gray-500">{day.subtitle}</p>}
                        </div>
                      </div>
                      {Array.isArray(day.items) && day.items.length > 0 && (
                        <div className="space-y-3">
                          {day.items.map((slot: any, slotIndex: number) => (
                            <div key={slotIndex} className="flex items-start gap-3">
                              <div className="min-w-[68px] text-[10px] md:text-xs text-amber-700 font-semibold">
                                {slot.time || slot.start || ''}
                              </div>
                              <div>
                                <p className="text-sm text-black font-medium">{slot.activity || slot.description || ''}</p>
                                {slot.notes && <p className="text-xs text-gray-500 mt-0.5">{slot.notes}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              )}

              {/* Day Package */}
              <h2 className="text-2xl md:text-3xl font-antigua font-bold text-black">
                {listing.feature_title || 'Our specialities'}
              </h2>
              <p className="text-gray-500 text-sm md:text-base mt-2">
                {listing.details_title || listing.description?.split('. ')[0] || 'Discover what makes this hotel unique.'}
              </p>
              {/* Our Specialties */}
              {pageSpecialties.length > 0 && (
              <div className="bg-[#F4F1E6] rounded-2xl p-5 md:p-8 relative border border-[#E7DFC8]">
                {/* Header */}

                {/* Key Features Badge */}

                <Badge className="absolute -top-3 left-6 bg-gradient-to-r from-gold to-gold-light text-white text-md px-4 py-1 font-semibold rounded-full shadow-md">
                  Key Features
                </Badge>

                {/* Feature List */}
                <div className="mt-6 md:mt-8 space-y-5">
                  {pageSpecialties.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      {/* Icon Container */}
                      <div className="w-12 h-12 rounded-xl bg-[#EAE3D0] flex items-center justify-center shrink-0">
                        <CheckCircle className="text-[#C9A227]" size={18} />
                      </div>

                      {/* Text */}
                      <div>
                        <p className="font-antigua text-base md:text-lg font-bold text-black">
                          {item.label}
                        </p>
                        <p className="text-gray-500 text-sm md:text-base mt-1">
                          {item.sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              )}

              {Array.isArray(listing.room_types) && listing.room_types.length > 0 && (
                <div className="bg-white rounded-2xl p-5 md:p-8 border border-amber-100 shadow-sm">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">
                        Room Types
                      </p>
                      <h2 className="text-xl md:text-2xl font-extrabold text-black font-antigua">
                        {listing.room_types_title || 'Our Room Types'}
                      </h2>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {listing.room_types.map((room: any, i: number) => (
                      <div key={i} className="rounded-2xl border border-amber-100 bg-[#F7F3E6] p-4">
                        <p className="text-sm font-semibold text-black">
                          {room.room_type || room.name || `Room ${i + 1}`}
                        </p>
                        {room.option && (
                          <p className="mt-2 text-sm text-gray-600">
                            {room.option}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Menu Tabs */}
              {/* <div className="bg-[#f8f5e9] rounded-2xl p-4 md:p-5 border border-amber-100 shadow-sm relative">
                <span className="absolute -top-3 left-5 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full">
                  Menu
                </span>
                <div className="flex items-center justify-between mt-2 mb-3 md:mb-4 flex-wrap gap-2">
                  <div className="flex gap-1.5 md:gap-2 flex-wrap">
                    {["Brunch", "Drinks", "Dinner"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setMenuTab(tab)}
                        className={`flex items-center gap-1 md:gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all border ${menuTab === tab ? "bg-gold text-white border-amber-500" : "bg-white text-gray-700 border-gray-200 hover:border-amber-300"}`}
                      >
                        {tab === "Brunch" && <Coffee size={11} />}
                        {tab === "Drinks" && <GlassWater size={11} />}
                        {tab === "Dinner" && <Utensils size={11} />}
                        {tab}
                      </button>
                    ))}
                  </div>
                  <button className="text-xs text-gray-600 font-semibold underline">
                    QR Code
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {[
                    { name: "Tropical Bowl", price: "$14", emoji: "🥗" },
                    { name: "Island Eggs", price: "$12", emoji: "🍳" },
                    { name: "Fresh Juice", price: "$8", emoji: "🥤" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-2.5 md:p-3 text-center shadow-sm border border-amber-300"
                    >
                      <p className="font-bold text-black text-[10px] md:text-xs font-antigua">
                        {item.name}
                      </p>
                      <p className="text-amber-600 font-bold text-xs md:text-sm mt-0.5">
                        {item.price}
                      </p>
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
                    {listing.address || 'Address not available'}
                  </p>
                </div>
                {/* <div className="bg-[#f4f1e6] rounded-xl p-4 md:p-6">
                                    
                                    <div className="flex items-center justify-between mb-4">
                                      <div className="flex items-center gap-2 font-bold text-black text-sm md:text-base">
                                        <Clock size={16} />
                                        Beach Hours:
                                      </div>
                                      <ChevronDown size={18} className="text-black" />
                                    </div>
                  
                                    <div className="space-y-3 md:space-y-4">
                                      {[
                                        { label: "Pick Up Time", time: "11:50 – 21:50" },
                                        { label: "Travel Duration", time: "11:50 – 22:00" },
                                        { label: "Beach Start Time", time: "11:50 – 22:00" },
                                        { label: "Beach End Time", time: "10:00 – 14:00" },
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
                                  </div> */}
                <div className="grid grid-cols-2 gap-2 md:gap-3 mt-3 md:mt-4 border-t border-amber-100 pt-3 md:pt-4">
                  <div>
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-black font-bold mb-0.5">
                      <Clock size={10} /> Start Time
                    </div>
                    <p className="font-bold text-black text-xs md:text-sm font-antigua">
                      {scheduleStart}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-black font-bold mb-0.5">
                      <Clock size={10} /> End Time
                    </div>
                    <p className="font-bold text-black text-xs md:text-sm font-antigua">
                      {scheduleEnd}
                    </p>
                  </div>
                </div>
                {hasWeeklyHours && (
                <div className="bg-white rounded-2xl p-4 md:p-5 border border-gold-light shadow-sm mt-4">
                  <span className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-3">
                    Weekly Hours
                  </span>
                  <div className="space-y-2">
                    {weeklyHours.map((day) => (
                      <div key={day.day} className="flex items-center justify-between gap-3 px-2 py-2 rounded-lg bg-[#f8f5e9]">
                        <span className={day.open ? 'text-sm font-semibold text-black' : 'text-sm text-gray-400'}>
                          {day.label}
                        </span>
                        <span className="text-[10px] md:text-xs text-gray-600 text-right">
                          {day.open && day.slots.length > 0
                            ? day.slots.map((slot: any) => `${slot.start || ''}${slot.start && slot.end ? ' – ' : ''}${slot.end || ''}`).join(', ')
                            : 'Closed'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                )}
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
                    href={item.href || '#'}
                    target={item.href ? '_blank' : undefined}
                    rel={item.href ? 'noreferrer noopener' : undefined}
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
              {/* <div className="relative w-full"> */}
              {/* <h3 className="font-antigua text-xl font-bold mb-6">
                  Deals & Promotions
                </h3> */}
              {/* <div className="bg-[#f8f5e9] rounded-2xl border border-gold-light shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between px-4 md:px-5 pt-3 md:pt-4 pb-1.5">
                  <p className="font-bold text-black text-xs md:text-sm font-antigua">
                    Deals &amp; Promotions
                  </p>
                  <span className="text-xs text-gold font-semibold font-antigua">
                    {dealIdx + 1}/{listingDeals.length}
                  </span>
                </div>

                <div className="overflow-hidden">
                  <div
                    className="flex gap-6 transition-transform duration-500"
                    // style={{ transform: `translateX(-${dealIdx * 65}%)` }}
                  >
                    {listingDeals.map((deal, i) => (
                      <div
                        key={i}
                        className="min-w-[65%] bg-[#e9e3d6] border border-[#d8c9a6] rounded-2xl p-6 relative"
                      >
                        {deal.tag && (
                          <div className="absolute top-0 right-0 bg-gradient-to-r from-[#c89b2c] to-[#e0c36c] text-white px-5 py-2 rounded-bl-xl font-bold text-sm">
                            {deal.tag}
                          </div>
                        )}

                        <h4 className="font-antigua text-lg font-bold mb-3">
                          {deal.title}
                        </h4>

                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                          {deal.desc}
                        </p>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-500">
                            <Calendar size={16} />
                            {deal.valid}
                          </div>

                          <button className="text-[#c89b2c] font-semibold flex items-center gap-2">
                            Claim Offer →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() =>
                    setDealIdx(
                      (p) => (p - 1 + listingDeals.length) % listingDeals.length,
                    )
                  }
                  className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#c89b2c] text-white flex items-center justify-center shadow"
                >
                  <ChevronLeft />
                </button>

                <button
                  onClick={() =>
                    setDealIdx((p) => (p + 1) % listingDeals.length)
                  }
                  className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#c89b2c] text-white flex items-center justify-center shadow"
                >
                  <ChevronRight />
                </button>
              </div> */}
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
                          {currentDeal?.title}
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-500 mt-1 leading-relaxed">
                          {currentDealDescription}
                        </p>
                        {currentDeal?.offers_title && (
                          <p className="text-[10px] md:text-xs text-amber-700 font-semibold mt-1">
                            {currentDeal.offers_title}
                          </p>
                        )}
                      </div>
                    </div>
                    {currentDealTag && (
                      <Badge className="absolute top-0 right-0 border-0 bg-gradient-to-r from-gold-light to-gold overflow-hidden text-white rounded-xl rounded-tl-none rounded-br-none text-xs">
                        {currentDealTag}
                      </Badge>
                    )}
                    <div className="mt-auto flex items-center justify-between text-[10px] md:text-xs ">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {currentDealValid}
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
                    {/* <button
                      onClick={() =>
                        setDealIdx(
                          (p) =>
                            (p - 1 + listingDeals.length) % listingDeals.length,
                        )
                      }
                      className="absolute  md:left-2 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-l from-gold to-gold-light text-white flex items-center justify-center"
                    >
                      <ChevronLeft size={11} />
                    </button>
                    <button
                      onClick={() =>
                        setDealIdx((p) => (p + 1) % listingDeals.length)
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
                  {(alsoAvailableLinks.length > 0 ? alsoAvailableLinks : [
                    { label: 'Booking.com', url: 'https://booking.com' },
                    { label: 'Airbnb', url: 'https://airbnb.com' },
                    { label: 'Expedia', url: 'https://expedia.com' },
                  ]).map((item, i) => (
                    <a
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="bg-green text-white flex gap-3 text-[10px] md:text-xs font-normal rounded-xl px-3 md:px-5 py-2 md:py-3 hover:bg-green transition"
                    >
                      <span>{item.label}</span> <ExternalLink size={15} />
                    </a>
                  ))}
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

              {whatsIncludedItems.length > 0 && (
                <div className="rounded-2xl p-3 md:p-5 border border-gold-light bg-white">
                  <p className="font-bold text-black text-xs md:text-sm mb-3 font-antigua">What&apos;s Included</p>
                  <ul className="list-inside list-disc space-y-2 text-[10px] md:text-xs text-gray-600">
                    {whatsIncludedItems.map((item: any, i: number) => (
                      <li key={i}>{typeof item === 'string' ? item : item?.content ?? item?.title ?? String(item)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {importantInfoItems.length > 0 && (
                <div className="rounded-2xl p-3 md:p-5 border border-gold-light bg-white">
                  <p className="font-bold text-black text-xs md:text-sm mb-3 font-antigua">Important to Know</p>
                  <ul className="list-inside list-disc space-y-2 text-[10px] md:text-xs text-gray-600">
                    {importantInfoItems.map((item: any, i: number) => (
                      <li key={i}>{typeof item === 'string' ? item : item?.content ?? item?.title ?? String(item)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Booking Info */}
              <div className="rounded-2xl p-3 md:p-5 relative">
                <span className="absolute -top-3 left-2 text-black font-bold text-xs md:text-sm px-3 py-1 rounded-full font-antigua">
                  Travel Tips
                </span>
                <div className="mt-3 space-y-2 md:space-y-3">
                  {(travelTips.length > 0 ? travelTips : [
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
                  ]).map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 md:gap-3 bg-[#f8f5e9] rounded-xl p-2.5 md:p-3 border border-gold-light"
                    >
                      {item.icon && (
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                          <item.icon size={12} className="text-amber-600" />
                        </div>
                      )}
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
            <p className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">
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
              src={listingMapSrc}
            />
          </div>
          {listing.address && (
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
            {serviceColumns.filter(col => col.items.length > 0).map((col, ci) => (
              <div key={ci}>
                <h3 className="font-bold text-black text-sm sm:text-lg font-antigua md:text-base mb-3 md:mb-4 pb-3 border-b border-gold-light">
                  {col.title}
                </h3>
                <div className="space-y-3 md:space-y-3.5">
                  {col.items.map((item: any, i: number) => {
                    const label = typeof item === 'string' ? item : item.label || item.title || ''
                    const sub = typeof item === 'string' ? '' : item.sub || ''
                    const Icon = typeof item === 'string' ? col.icon : item.icon || col.icon

                    return (
                      <div key={i} className="flex items-start gap-2 md:gap-3">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                          <Icon size={13} className="text-amber-500" />
                        </div>
                        <div>
                          <p className="font-normal text-gray-900 text-xs md:text-sm">
                            {label}
                          </p>
                          {col.hasSub && sub && (
                            <p className="text-[10px] md:text-xs text-gray-400">
                              {sub}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
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
          {mappedSimilar.length > 0 ? (
            <HorizontalSlider items={mappedSimilar} />
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
          {/* FAQ */}
          {(listing.faqs && listing.faqs.length > 0) && (
            <div className="mb-8">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <div className="mb-4">
                  <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">
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
                  {listing.faqs.map((item: any, i: number) => (
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
              </div>
            </div>
          )}
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

      <ReviewSection listingId={listing.id} />

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
          <Horizontal2Slider items={mappedSimilar.length > 0 ? mappedSimilar : sliderPlaces} />
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
