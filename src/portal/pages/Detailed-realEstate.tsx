"use client";
import React, { useState, useRef, useEffect } from "react";
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
  Share2,
  Plus,
  Minus,
  Search,
  ChevronLeft,
  ChevronRight,
  Expand,
  MapPin,
  BedDouble,
  Bath,
  SquareCode,
  Building2,
  Phone,
  Mail,
  Globe,
  MessageCircle,
  User,
  Send,
  Eye,
  Sliders,
  Car,
  Trees,
  Wind,
  Wifi,
  Waves,
  Lock,
  Dumbbell,
  UtensilsCrossed,
  ThumbsUp,
  MessageSquare,
  X,
  SlidersHorizontal,
  AlignJustify,
} from "lucide-react";
import { useListing, useNearbyListings } from "@/lib/listings.hooks";
import { getListingImages, getListingMapSrc } from "@/portal/lib/listing-detail-utils";
import { getNeighborhoodOptions } from "@public/data/filter-config";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@public/components/ui/card";
import { Input } from "@public/components/ui/input";
import { Textarea } from "@public/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@public/components/ui/select";
import { Checkbox } from "@public/components/ui/checkbox";
import { Label } from "@public/components/ui/label";
import { Button } from "@public/components/ui/button";
const position: [number, number] = [45.558, -73.712];

const locations = [
  {
    id: 1,
    name: "Nearby listing",
    price: "Contact for price",
    position: [45.558, -73.712],
  },
];

const heroImages = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
];

const thumbImages = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200",
];


const features = [
  { icon: Wind, label: "Air Conditioning" },
  { icon: Car, label: "Parking/Garage" },
  { icon: Wifi, label: "Internet/Wi-Fi" },
  { icon: Trees, label: "Garden/Terrace" },
  { icon: Lock, label: "Security System" },
  { icon: Dumbbell, label: "Gym Access" },
  { icon: Waves, label: "Swimming Pool" },
  { icon: UtensilsCrossed, label: "Fitted Kitchen" },
];

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function StarRow({ count, total = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array(total)
        .fill(0)
        .map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < count ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
          />
        ))}
    </div>
  );
}

function PropertyCard({ item }) {
  return (
    <Link href={item.href || "#"}>
      <div className="relative overflow-hidden bg-white rounded-md shadow-lg hover:shadow-xl transition-shadow flex flex-col cursor-pointer">
        <button className="absolute right-2 top-2 z-10 h-10 w-10 rounded-full bg-amber-400 flex items-center justify-center shadow hover:bg-amber-500 transition">
          <Heart className="h-5 w-5 text-black" />
        </button>

        <div className="aspect-square overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="space-y-1 p-3">
          <h3 className="text-lg text-black font-semibold  leading-tight">
            {item.title}
          </h3>
          <h5 className="text-sm text-black/60 font-semibold">{item.type}</h5>
          <p className="text-xs flex gap-2 text-black/60 items-center">
            <Car className="w-4 h-4 shrink-0" /> {item.garage}
          </p>
          <p className="text-xs flex gap-2 text-black/60 items-center">
            <BedDouble className="w-4 h-4 shrink-0" /> Number of Bedrooms:{" "}
            {item.beds}
          </p>
          <p className="text-xs flex gap-2 text-black/60 items-center">
            <Bath className="w-4 h-4 shrink-0" /> Number of Bathrooms:{" "}
            {item.baths}
          </p>
          <h5 className="text-black/70 font-medium">
            Starting at {item.price}/month
          </h5>
          <div className="flex gap-4 items-center my-2">
            <span className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(item.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-yellow-400"
                  }`}
                />
              ))}
            </span>
            <span className="text-sm text-red font-antigua font-bold">
              {item.rating}/5
            </span>
          </div>
        </div>

        <div className="p-3 pt-0">
          <button className="w-full rounded border border-gray-300 bg-gray-100 text-gold hover:text-gold underline text-sm py-2 font-semibold transition hover:bg-gray-200">
            SEE THIS PROJECT
          </button>
        </div>
      </div>
    </Link>
  );
}

export default function RealEstateDetails({ slug }: { slug?: string }) {
  const { listing, loading, error } = useListing(slug || "");
  const neighborhood = getNeighborhoodOptions('Real Estate').find(
    (n) => ((listing?.category_tags as string[]) ?? []).includes(n)
  ) ?? '';
  const { listings: nearbyListings } = useNearbyListings(
    listing?.category ?? 'Real Estate',
    'Detailed-RealEstate',
    neighborhood,
    slug || ''
  );
  const [activeImg, setActiveImg] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    appointment: "",
    message: "",
    broker: false,
  });
  const alsoSeenRef = useRef(null);

  const scrollAlsoSeen = (dir) => {
    if (!alsoSeenRef.current) return;
    alsoSeenRef.current.scrollBy({
      left: dir === "left" ? -260 : 260,
      behavior: "smooth",
    });
  };

  const listingImages = getListingImages(listing, heroImages);
  const heroImage = listingImages[activeImg] || heroImages[0];
  const heroTitle = listing?.title || "Real estate listing";
  const heroBreadcrumb = listing?.category
    ? `Real Estate / ${listing.category}`
    : "Real Estate / Property";
  const heroCompany = listing?.company_name || listing?.title?.split(" ")?.[0] || "Real Estate";
  const heroSubtitle = listing?.subtitle || listing?.category || "Property for rent";
  const priceFrom = listing?.price_from ?? listing?.price ?? listing?.starting_price ?? null;
  const priceTo = listing?.price_to ?? priceFrom;
  const priceUnit = listing?.price_unit || "month";
  const rating = listing?.rating ? Number(listing.rating) : null;
  const ratingLabel = rating ? `${rating.toFixed(2)}/5` : null;
  const bedrooms = listing?.bedrooms ?? listing?.beds ?? null;
  const bathrooms = listing?.bathrooms ?? listing?.baths ?? null;
  const squareFeet = listing?.sqft ?? listing?.size ?? listing?.area ?? listing?.square_feet ?? null;
  const address = listing?.address || listing?.location || "Property address not available";
  const propertyType = listing?.category || "Real estate";
  const description =
    listing?.description ||
    listing?.about ||
    listing?.details ||
    "This real estate listing provides key features and amenities to make your next move easier. Contact the agent for the latest availability and pricing.";
  const descriptionText = stripHtml(description)
  const mapPosition =
    listing?.latitude && listing?.longitude
      ? [Number(listing.latitude), Number(listing.longitude)]
      : position;
  const mapSrc = getListingMapSrc(listing);
  const contactCards = [
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
  ];

  // Rich content fields
  const developerInfo = listing?.developer_info
    ? typeof listing.developer_info === "string"
      ? JSON.parse(listing.developer_info)
      : listing.developer_info
    : null;

  const normalize = (arr: any[]) =>
    arr.map((a: any) => (typeof a === "string" ? a : a?.label || a?.name || "")).filter(Boolean)

  const keyFeatureItems: string[] = Array.isArray(listing?.key_features) ? normalize(listing.key_features) : []
  const amenityItems: string[]    = Array.isArray(listing?.amenities)    ? normalize(listing.amenities)    : []
  // Combined for the "Features & Amenities" accordion — deduplicated
  const amenities: string[] = [...new Set([...keyFeatureItems, ...amenityItems])]

  const faqs: Array<{ question: string; answer: string }> =
    Array.isArray(listing?.faqs) && listing.faqs.length > 0
      ? listing.faqs
      : [];

  const unitSpecs: string = listing?.unit_specs || "";
  const availabilityStatus: string = listing?.availability_status || listing?.status || "";

  // Similar listings mapped to PropertyCard shape
  const nearbyCards = (nearbyListings ?? []).slice(0, 6).map((l) => ({
    image: l.image || heroImages[0],
    title: l.title,
    type: l.category || "Real Estate",
    garage: "",
    beds: (l as any).bedrooms ?? null,
    baths: (l as any).bathrooms ?? null,
    price: (l as any).price_from ? `$${(l as any).price_from}` : "Contact for price",
    rating: l.rating ?? 0,
    href: l.href,
  }));

  const alsoSeenCards = (nearbyListings ?? []).slice(0, 4).map((l) => ({
    image: l.image || heroImages[0],
    title: l.title,
    sub: l.subtitle || l.category || "",
    type: l.category || "Real Estate",
    beds: (l as any).bedrooms ?? null,
    baths: (l as any).bathrooms ?? null,
    price: (l as any).price_from ? `$${(l as any).price_from}` : "Contact for price",
    rating: l.rating ?? 0,
    href: l.href,
  }));

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
        <a href="/real-estate" className="text-gold underline">Return to Real Estate</a>
      </div>
    );
  }

  return (
    <div className="bg-white font-sans w-full overflow-x-hidden">
      {/* <a href="https://wa.me/573151234567" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-green rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110">
        <MessageCircle size={24} className="text-white" />
      </a> */}

      {/* ══ TOP SEARCH BAR ══ */}
      <div className="bg-white px-4 sm:px-6 md:px-10 lg:px-14 pt-5 pb-4 ">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex items-center justify-center gap-3">
            {/* <div className="flex flex-col gap-2 shrink-0 pt-0.5">
              <button className="w-9 h-9 rounded-full bg-red flex items-center justify-center shadow hover:opacity-90 transition">
                <Share2 size={14} className="text-white" />
              </button>
              <button className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center shadow hover:bg-amber-500 transition">
                <Heart size={14} className="text-white" />
              </button>
            </div> */}
            <div className="flex-1 min-w-0 justify-center">
              <h1 className="text-base text-center sm:text-lg md:text-xl lg:text-3xl font-extrabold text-black font-antigua leading-tight mb-3">
                Complete guide of all real estate projects in Cartagena.
              </h1>
              <div className="w-full flex justify-center px-4">
                <div className="flex items-center flex-col md:flex-row gap-3 w-full max-w-2xl">
                  {/* input container */}
                  <div className="relative flex items-center w-full">
                    <input
                      type="text"
                      placeholder="Where/What are you looking for?"
                      className="w-full rounded-full border border-gray-300 bg-white px-5 pr-12 py-2 text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    />

                    {/* filter icon */}
                    <AlignJustify
                      size={18}
                      className="absolute right-4 text-gray-400"
                    />
                  </div>

                  {/* search button */}
                  <Button className="flex items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-gold to-gold-light px-6 md:px-8 py-2 text-white text-sm md:text-base font-semibold shadow hover:opacity-90 transition">
                    Search
                    <Search size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ BREADCRUMB + SPECS ══ */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-14 py-6 bg-white ">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-xs text-gray-400 mb-3">
            <Link
              href="/"
              className="hover:text-amber-500 text-sky-500 transition"
            >
              Home /{" "}
            </Link>
            <Link
              href="/real-estate"
              className="hover:text-amber-500 text-sky-500 transition"
            >
              Real Estate
            </Link>{" "}
            / <span className="text-gray-400">{heroTitle}</span>
          </p>
          <Link
            href="/real-estate"
            className="block text-xs text-gray-500 font-semibold mb-10"
          >
            &lsaquo; Back to Real Estate
          </Link>
          <div className="flex items-center justify-between gap-3 md:gap-5 flex-wrap">
            {[
              { icon: Building2, label: availabilityStatus || listing?.status || "Available" },
              bathrooms != null ? { icon: Bath, label: `${bathrooms} Bath${bathrooms !== 1 ? "s" : ""}` } : null,
              bedrooms != null ? { icon: BedDouble, label: `${bedrooms} Bedroom${bedrooms !== 1 ? "s" : ""}` } : null,
              squareFeet != null ? { icon: SquareCode, label: `${squareFeet} Sq. Ft.` } : null,
            ].filter(Boolean).map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-2 text-md text-gray-600 font-semibold"
              >
                <item.icon className="text-gold-light w-5 h-5" />
                {item.label}
              </div>
            ))}
          </div>
          <p className="text-md text-gray-600 mt-3 flex items-center gap-2 font-semibold">
            <MapPin className="text-gold-light h-5 w-5" />
            {address}
          </p>
        </div>
      </div>

      {/* ══ MAIN IMAGE SLIDER ══ */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-14 pb-4 ">
        <div className="container mx-auto max-w-[1100px] py-6 border border-gray-200 rounded-lg shadow">
          <div className="relative rounded-2xl overflow-hidden shadow-md h-[240px] sm:h-[320px] md:h-[420px] lg:h-[470px]">
            <img
              src={heroImage}
              alt={heroTitle}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <button
              onClick={() =>
                setActiveImg(
                  (p) => (p - 1 + listingImages.length) % listingImages.length,
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setActiveImg((p) => (p + 1) % listingImages.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition"
            >
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-3 left-3 bg-white/90  text-sm  px-2.5 py-1 rounded-lg backdrop-blur-sm">
              {activeImg + 1} / {listingImages.length}
            </div>
            <button className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-sm  px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-white transition shadow">
              <Expand className="w-4 h-4" /> View All
            </button>
          </div>
          <div
            className="flex gap-2 mt-2.5 overflow-x-auto p-1"
            style={{ scrollbarWidth: "none" }}
          >
            {listingImages.map((src, i) => (
              <div
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-[75px] h-[52px] sm:w-[95px] sm:h-[65px] md:w-[110px] md:h-[75px] rounded-xl overflow-hidden cursor-pointer flex-shrink-0 transition-all ${i === activeImg ? "ring-2 ring-gold" : "opacity-60 hover:opacity-90"}`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="flex items-start justify-between gap-4 mt-6">
            {/* LEFT CONTENT */}
            <div className="flex-1">
              {/* title */}
              <h2 className="text-3xl md:text-4xl font-antigua font-extrabold text-black leading-tight">
                {heroTitle}
              </h2>

              {/* rating */}
              {rating != null && (
              <div className="flex items-center gap-2 mt-2">
                <StarRow count={Math.round(rating)} />
                <span className="text-sm text-gray-500">{ratingLabel}{listing?.reviews_count ? ` (${listing.reviews_count} VOTES)` : ""}</span>
                <button className="text-sm text-gray-600 underline">Vote</button>
              </div>
              )}

              {/* category */}
              <p className="text-gray-500 mt-4 text-base">{heroSubtitle}</p>

              {/* price */}
              {priceFrom != null && (
              <p className="text-base md:text-base font-bold text-black mt-1">
                Starting at ${priceFrom}{priceTo && priceTo !== priceFrom ? ` – $${priceTo}` : ""} per {priceUnit}
              </p>
              )}

              {/* features */}
              {(bedrooms != null || bathrooms != null || squareFeet != null) && (
              <ul className="mt-4 space-y-1 text-gray-500 text-sm">
                {bedrooms != null && <li>• {bedrooms} bedroom{bedrooms !== 1 ? "s" : ""}</li>}
                {bathrooms != null && <li>• {bathrooms} bathroom{bathrooms !== 1 ? "s" : ""}</li>}
                {squareFeet != null && <li>• {squareFeet} Sq. Ft.</li>}
                {unitSpecs && <li>• {unitSpecs}</li>}
              </ul>
              )}
            </div>

            {/* HEART BUTTON */}
            <button className="w-14 h-14 hidden sm:flex rounded-full bg-yellow-400  items-center justify-center shadow-md hover:scale-105 transition shrink-0">
              <Heart size={22} className="text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* ══ CONTENT + SIDEBAR ══ */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-14 pb-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-[1fr_360px]">
            {/* LEFT */}
            <div className="space-y-4 min-w-0">
              <div className="flex items-start gap-3">
                {(listing?.feature_logo || listing?.cover_image) && (
                <img
                  src={listing.feature_logo || listing.cover_image}
                  className="w-14 h-14 rounded-lg object-cover shrink-0"
                  alt={heroTitle}
                />
                )}

                <div>
                  <p className="font-bold text-black text-sm md:text-base">
                    {heroCompany}
                  </p>

                  <p className="text-xs md:text-sm text-gray-500 mt-1 leading-relaxed">
                    {descriptionText}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-3 cursor-pointer">
                Full description here +
              </p>

              <Accordion type="single" collapsible className="space-y-2">
                {[
                  {
                    value: "contact-info",
                    label: "Contact details and website for this project",
                    content: (
                      <div className="grid sm:grid-cols-2 gap-3 pb-4">
                        {contactCards.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2"
                          >
                            <item.icon
                              size={16}
                              className="text-gray-500 shrink-0"
                            />

                            <div className="text-sm">
                              <p className="font-semibold text-gray-700">
                                {item.label}
                              </p>
                              <p className="text-gray-500">{item.sub}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ),
                    //         <span className="font-semibold text-gray-700">
                    //           {item.label}:
                    //         </span>
                    //         <span className="text-gray-500">{item.val}</span>
                    //       </div>
                    //     ))}
                    //   </div>
                    // ),
                  },
                  ...(developerInfo ? [{
                    value: "developer",
                    label: "Real estate developer(s)",
                    content: (
                      <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                          <Building2 size={20} className="text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900">{developerInfo.name}</p>
                          {developerInfo.contact && <p className="text-sm text-gray-500">{developerInfo.contact}</p>}
                          {developerInfo.website && (
                            <a href={developerInfo.website} target="_blank" rel="noreferrer" className="text-sm text-gold underline mt-1 block truncate">{developerInfo.website.replace(/^https?:\/\//, "")}</a>
                          )}
                        </div>
                      </div>
                    ),
                  }] : []),
                  {
                    value: "address",
                    label: "Address",
                    content: (
                      <div className="flex items-start gap-3 pb-4">
                        <MapPin size={18} className="text-gray-500 mt-1" />

                        <div>
                          <p className="font-semibold text-gray-900">
                            {address}
                          </p>

                          <p className="text-sm text-gray-500">
                            {listing?.neighborhood || listing?.sub_location || ""}
                          </p>
                        </div>
                      </div>
                    ),
                    // content: (
                    //   <div className="flex items-start gap-2 pb-3">
                    //     <MapPin
                    //       size={13}
                    //       className="text-amber-500 shrink-0 mt-0.5"
                    //     />
                    //     <div>
                    //       <p className="font-bold text-black text-xs font-antigua">
                    //         Cartagena, Cartagena Province
                    //       </p>
                    //       <p className="text-[10px] text-gray-500">
                    //         Bolivar, Colombia — Manga District
                    //       </p>
                    //     </div>
                    //   </div>
                    // ),
                  },
                  ...(amenities.length > 0 ? [{
                    value: "features",
                    label: "Features & Amenities",
                    content: (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pb-4">
                        {amenities.filter(Boolean).map((label, i) => (
                          <div key={i} className="flex flex-col items-center gap-2 bg-gray-50 rounded-xl p-4 text-center">
                            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                              <Building2 size={18} className="text-gray-500" />
                            </div>
                            <p className="text-sm text-gray-700 font-medium">{label}</p>
                          </div>
                        ))}
                      </div>
                    ),
                  }] : []),
                  ...(faqs.length > 0 ? [{
                    value: "faqs",
                    label: `Frequently Asked Questions (${faqs.length})`,
                    content: (
                      <div className="space-y-3 pb-4">
                        {faqs.map((item, i) => (
                          <div key={i} className="bg-gray-50 rounded-xl p-4">
                            <p className="font-semibold text-gray-900 mb-1">{item.question}</p>
                            <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                          </div>
                        ))}
                      </div>
                    ),
                  }] : []),
                ].map((item) => (
                  <AccordionItem
                    key={item.value}
                    value={item.value}
                    // className="bg-white rounded-xl border border-gray-100 shadow-sm px-4"
                    className="border-b border-gray-200"
                  >
                    <AccordionTrigger
                      className="group py-4 text-sm text-start font-semibold text-gray-700 hover:no-underline"
                      plus
                    >
                      <span>{item.label}</span>

                      {/* <span className="ml-auto relative w-4 h-4">
                        <Plus
                          className="absolute inset-0 group-data-[state=open]:hidden"
                          size={16}
                        />
                        <Minus
                          className="absolute inset-0 hidden group-data-[state=open]:block"
                          size={16}
                        />
                      </span> */}
                    </AccordionTrigger>
                    {/* // <AccordionTrigger className="text-left text-xs md:text-sm font-semibold text-black hover:no-underline py-3.5">
                    //   {item.label}
                    // </AccordionTrigger> */}
                    <AccordionContent className="pb-4">
                      {item.content}
                      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                        {features.map((item, i) => (
                          <div
                            key={i}
                            className="bg-gray-100 rounded-lg p-5 flex flex-col items-center justify-center gap-2"
                          >
                            <item.icon size={22} className="text-gray-500" />
                            <p className="text-xs text-gray-600 text-center">
                              {item.label}
                            </p>
                          </div>
                        ))}
                      </div> */}
                    </AccordionContent>
                    {/* // <AccordionContent>{item.content}</AccordionContent> */}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* RIGHT — LEAD FORM */}
            <div className="lg:sticky lg:top-6 h-fit">
              <Card className="rounded-2xl shadow-lg border border-gray-200">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-2xl font-antigua font-bold text-black">
                    Interested in this project?
                  </CardTitle>

                  <CardDescription className="text-xs">
                    Let us share your request with similar COLLECTION™ listings.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Input placeholder="Name" className="border-gray-200" />

                  <Input
                    type="email"
                    placeholder="Email"
                    className="border-gray-200"
                  />

                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    className="border-gray-200"
                  />

                  <Select>
                    <SelectTrigger className="border-gray-200 text-black data-[placeholder]:text-muted-foreground">
                      <SelectValue placeholder="Appointment (Optional)" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="tomorrow">Tomorrow</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                    </SelectContent>
                  </Select>

                  <Textarea
                    placeholder="Message"
                    className="min-h-[120px] border-gray-200"
                  />

                  {/* Recaptcha placeholder */}
                  <div className="border border-gray-200 bg-muted-foreground/10 rounded-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 ">
                      <Checkbox className="text-muted-foreground" />
                      <Label>I'm not a robot</Label>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      reCAPTCHA
                    </div>
                  </div>

                  {/* consent */}
                  <div className="flex items-start gap-2">
                    <Checkbox id="consent" />

                    <Label
                      htmlFor="consent"
                      className="text-sm leading-relaxed"
                    >
                      I agree to receive communications from Guide Immo.
                    </Label>
                  </div>

                  <Button className="w-full bg-gradient-to-l to-green from-green-light hover:bg-green-700 text-white">
                    Submit
                  </Button>
                </CardContent>
              </Card>
            </div>
            {/* <div className="lg:sticky lg:top-5 h-fit">
              <div className="bg-[#f8f5e9] rounded-2xl p-5 border border-amber-200 shadow-sm">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">
                  Contact
                </p>
                <h3 className="text-lg font-extrabold text-black font-antigua mb-0.5">
                  Interested in this project?
                </h3>
                <p className="text-[10px] text-gray-500 mb-4">
                  Fill in your details and speak with our COLLECTION™ experts.
                </p>
                <div className="space-y-2.5">
                  {[
                    { placeholder: "Name", type: "text", key: "name" },
                    { placeholder: "Email", type: "email", key: "email" },
                    { placeholder: "Phone Number", type: "tel", key: "phone" },
                    {
                      placeholder: "Appointment / Optional",
                      type: "text",
                      key: "appointment",
                    },
                  ].map((field) => (
                    <input
                      key={field.key}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.key]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-amber-100 rounded-xl px-3 py-2.5 text-xs text-black placeholder-gray-400 outline-none focus:border-amber-400 transition"
                    />
                  ))}
                  <textarea
                    placeholder="Message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-white border border-amber-100 rounded-xl px-3 py-2.5 text-xs text-black placeholder-gray-400 outline-none focus:border-amber-400 transition resize-none"
                  />
                  <div className="flex items-start gap-2.5 bg-white rounded-xl p-3 border border-amber-100">
                    <input
                      type="checkbox"
                      id="broker"
                      checked={formData.broker}
                      onChange={(e) =>
                        setFormData({ ...formData, broker: e.target.checked })
                      }
                      className="mt-0.5 w-3.5 h-3.5 accent-amber-500 shrink-0"
                    />
                    <label
                      htmlFor="broker"
                      className="text-[10px] text-gray-500 leading-relaxed cursor-pointer"
                    >
                      I'm a broker / real estate agent and would like to receive
                      more information about this listing for client referral
                      purposes.
                    </label>
                  </div>
                  <button className="w-full bg-green text-white font-bold text-sm py-3 rounded-full shadow flex items-center justify-center gap-2 hover:opacity-90 transition">
                    <Send size={13} /> Submit
                  </button>
                </div>
                <p className="text-[9px] text-gray-400 text-center mt-3 leading-relaxed">
                  By submitting you agree to our privacy policy and terms of
                  use.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* ══ VISIT COLLECTION GRID ══ */}
      <div className=" px-4 sm:px-6 md:px-10 lg:px-14 py-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-black">
              Visit COLLECTION™ projects located nearby
            </h2>
            <div className="flex gap-2 shrink-0">
              <button className="bg-gradient-to-b from-red to-red-light text-white text-sm font-bold rounded-full px-3 py-1.5 hover:opacity-90 transition flex items-center gap-1">
                Clear Filters
              </button>
              <button className="bg-gradient-to-l from-green-light to-green text-white text-sm font-bold rounded-full px-3 py-1.5 hover:opacity-90 transition flex items-center gap-1">
                <Sliders size={12} /> 3 Filters
              </button>
            </div>
          </div>
          {nearbyCards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {nearbyCards.map((item, i) => (
              <PropertyCard key={i} item={item} />
            ))}
          </div>
          ) : (
            <p className="text-sm text-gray-400 py-4">No nearby listings available yet.</p>
          )}
        </div>
      </div>

      {/* ══ HOME IN THE AREA MAP ══ */}
      <div className="bg-white px-4 sm:px-6 md:px-10 lg:px-14 py-8">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="text-xl md:text-2xl font-extrabold text-black mb-4">
            Home in the area
          </h2>
          <div className="rounded-2xl overflow-hidden border border-gray-200 h-[300px]">
            {mapSrc ? (
              <iframe
                title="Location Map"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                src={mapSrc}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                Location not available
              </div>
            )}
          </div>
          {address && (
            <p className="mt-3 text-sm text-gray-600 flex items-center gap-2 font-medium">
              <MapPin size={16} className="text-gold" /> {address}
            </p>
          )}
        </div>
      </div>

      {/* ══ AROUND THIS PLACE ══ */}
      <div className="bg-white px-4 sm:px-6 md:px-10 lg:px-14 pb-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="w-full mb-4 md:mb-5">
            <p className="text-[10px] md:text-xs uppercase w-full text-center tracking-widest font-medium text-black/70 mb-0.5">Explore</p>
            <h2 className="text-xl md:text-2xl font-extrabold text-center font-antigua text-black">Around This Place</h2>
          </div>
          {alsoSeenCards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {alsoSeenCards.map((item, i) => (
                <Link key={i} href={item.href || "#"}>
                <Card className="overflow-hidden rounded-md group cursor-pointer shadow hover:shadow-xl transition duration-300">
                  <div className="relative h-[230px] overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <button className="absolute top-4 right-4 w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center shadow-md hover:bg-yellow-500 transition">
                      <Heart size={20} className="text-black" />
                    </button>
                  </div>
                  <CardContent className="p-3 space-y-2">
                    <h3 className="font-semibold text-lg text-gray-900 leading-tight">{item.title}</h3>
                    {item.sub && <p className="text-gray-500 text-sm">{item.sub}</p>}
                    <p className="text-gray-500 text-sm">{item.type}</p>
                    <p className="text-gray-900 font-semibold pt-2 text-sm">
                      Starting at {item.price}
                      <span className="text-gray-500 font-medium">/{priceUnit}</span>
                    </p>
                    {item.rating > 0 && <StarRow count={Math.round(item.rating)} />}
                  </CardContent>
                </Card>
                </Link>
              ))}
            </div>
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

      {/* ══ NEWSLETTER ══ */}
      {/* <div
        className="relative py-14 md:py-20 px-4 sm:px-6 md:px-10 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative mx-auto max-w-[680px] text-center">
          <p className="text-[10px] uppercase tracking-widest font-bold text-amber-400 mb-1.5">
            STAY UPDATED
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-antigua mb-2">
            Cartagena Newsletter
          </h2>
          <p className="text-sm text-white/80 mb-1">
            Get the latest discoveries, deals, coupon, news &amp; tips of
            Cartagena.
          </p>
          <p className="text-xs text-white/50 mb-6">
            Get our latest discoveries, events, images &amp; tips of Cartagena.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-[480px] mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/50 text-xs outline-none focus:border-amber-400 transition backdrop-blur-sm"
            />
            <button className="bg-gold text-white font-bold text-xs px-6 py-3 rounded-full shadow whitespace-nowrap hover:opacity-90 transition">
              Subscribe Now
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}
