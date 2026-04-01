"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@public/components/ui/accordion";
import CartagenaNews from "@public/components/layout/cartagenaNews";
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
import dynamic from "next/dynamic";

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false });

const position: [number, number] = [45.558, -73.712];

const locations = [
  {
    id: 1,
    name: "Market habitats locatifs",
    price: "$1,653 per month",
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

const nearbyProjects = [
  {
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600",
    title: "HOUSE FOR RENT IN MANGA",
    type: "House for Rent",
    garage: "Garage",
    beds: 3,
    baths: 2,
    price: "$4.00/month",
    rating: 3.5,
  },
  {
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600",
    title: "HOUSE FOR RENT IN MANGA",
    type: "House for Rent",
    garage: "Garage",
    beds: 3,
    baths: 2,
    price: "$4.00/month",
    rating: 3.5,
  },
  {
    image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600",
    title: "HOUSE FOR RENT IN MANGA",
    type: "House for Rent",
    garage: "Garage",
    beds: 3,
    baths: 2,
    price: "$4.00/month",
    rating: 3.5,
  },
  {
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600",
    title: "HOUSE FOR RENT IN MANGA",
    type: "House for Rent",
    garage: "Garage",
    beds: 3,
    baths: 2,
    price: "$4.00/month",
    rating: 3.5,
  },
  {
    image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=600",
    title: "HOUSE FOR RENT IN MANGA",
    type: "House for Rent",
    garage: "Garage",
    beds: 3,
    baths: 2,
    price: "$4.00/month",
    rating: 3.5,
  },
  {
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600",
    title: "HOUSE FOR RENT IN MANGA",
    type: "House for Rent",
    garage: "Garage",
    beds: 3,
    baths: 2,
    price: "$4.00/month",
    rating: 3.5,
  },
];

const alsoSeenProjects = [
  {
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500",
    title: "La Royan",
    sub: "House for Rent Rights",
    type: "House for Rent",
    beds: 2,
    baths: 2,
    price: "$1,262",
    rating: 4,
  },
  {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500",
    title: "Espace Lévesque Ouest",
    sub: "House for Rent",
    type: "House for Sale",
    beds: 3,
    baths: 2,
    price: "$880",
    rating: 4,
  },
  {
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=500",
    title: "La Jannea",
    sub: "House for Sale",
    type: "Condo for Sale",
    beds: 3,
    baths: 3,
    price: "$1,200",
    rating: 4,
  },
  {
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500",
    title: "Les Tours Saint-Martin",
    sub: "House for Rent",
    type: "House for Rent",
    beds: 2,
    baths: 2,
    price: "$680",
    rating: 4,
  },
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

export default function RealEstateDetails() {
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

  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, []);

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
              href="/realState"
              className="hover:text-amber-500 text-sky-500 transition"
            >
              Real Estate / Listing
            </Link>{" "}
            / <span className="text-gray-400">Market habitats locatifs</span>
          </p>
          <Link
            href="/realState"
            className="block text-xs text-gray-500 font-semibold mb-10"
          >
            &lsaquo; Back to Real Estate
          </Link>
          <div className="flex items-center justify-between gap-3 md:gap-5 flex-wrap">
            {[
              { icon: Building2, label: "Unavailable" },
              { icon: Bath, label: "2 Baths" },
              { icon: BedDouble, label: "2 Bedrooms" },
              { icon: BedDouble, label: "3 Bedrooms" },
              { icon: SquareCode, label: "1023 Sq. Ft." },
            ].map((item, i) => (
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
            Cartagena, Cartagena Province, Bolivar, Colombia Sq. Ft.
          </p>
        </div>
      </div>

      {/* ══ MAIN IMAGE SLIDER ══ */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-14 pb-4 ">
        <div className="container mx-auto max-w-[1100px] py-6 border border-gray-200 rounded-lg shadow">
          <div className="relative rounded-2xl overflow-hidden shadow-md h-[240px] sm:h-[320px] md:h-[420px] lg:h-[470px]">
            <img
              src={heroImages[activeImg]}
              alt="Property"
              className="w-full h-full object-cover transition-all duration-700"
            />
            <button
              onClick={() =>
                setActiveImg(
                  (p) => (p - 1 + heroImages.length) % heroImages.length,
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setActiveImg((p) => (p + 1) % heroImages.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition"
            >
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-3 left-3 bg-white/90  text-sm  px-2.5 py-1 rounded-lg backdrop-blur-sm">
              {activeImg + 1} / {heroImages.length}
            </div>
            <button className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-sm  px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-white transition shadow">
              <Expand className="w-4 h-4" /> View All
            </button>
          </div>
          <div
            className="flex gap-2 mt-2.5 overflow-x-auto p-1"
            style={{ scrollbarWidth: "none" }}
          >
            {thumbImages.map((src, i) => (
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
                Market habitats locatifs
              </h2>

              {/* rating */}
              <div className="flex items-center gap-2 mt-2">
                <StarRow count={3.5} />
                <span className="text-sm text-gray-500">3.67/5 (6 VOTES)</span>
                <button className="text-sm text-gray-600 underline">
                  Vote
                </button>
              </div>

              {/* category */}
              <p className="text-gray-500 mt-4 text-base">Condos for rent</p>

              {/* price */}
              <p className="text-base md:text-base font-bold text-black mt-1">
                Starting at $1,653 per month
              </p>

              {/* features */}
              <ul className="mt-4 space-y-1 text-gray-500 text-sm">
                <li>• Studios, 1 to 3 bedrooms</li>
                <li>• Move-in-ready</li>
              </ul>
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
                <img
                  src={
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200"
                  }
                  className="w-14 h-14 rounded-lg object-cover"
                />

                <div>
                  <p className="font-bold text-black text-sm md:text-base">
                    Market rental habitats
                  </p>

                  <p className="text-xs md:text-sm text-gray-500 mt-1 leading-relaxed">
                    Market rental habitats offer a multitude of advantages to
                    their residents, thanks to a prime location in the heart of
                    Chomedey, Laval. The 3 rental phases feature a wide
                    selection of all-inclusive units equipped with high-end
                    finishes and generous full-height windows that flood the
                    spaces with natural light.
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-3 cursor-pointer">
                Full description here +
              </p>
              {/* <div className="flex items-start gap-3 bg-gray-50 rounded-2xl p-3 md:p-4 border border-gray-100">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <Building2 size={18} className="text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-black text-sm md:text-base font-antigua">
                    Market rental habitats
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 leading-relaxed">
                    Market habitats locatifs offers a full range of advantages
                    to rental residents. It features a prime location in the
                    heart of Cartagena. The 2 similar phases feature a wide
                    selection of an inclusive set, equipped with high-end
                    amenities within an urban eco-logic. Alright residents can
                    find the balance without cost of light.
                  </p>
                </div>
              </div> */}

              {/* <Accordion type="single" collapsible className="mt-4">
                {[
                  "Contact details and website for this project",
                  "Real estate developer(s)",
                  "Address",
                  "Features",
                  "User comment(s) (0)",
                  "Blog posts related to this project",
                ].map((label, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-b border-gray-200"
                  >
                    <AccordionTrigger className="py-4 text-sm text-start font-semibold text-gray-700 hover:no-underline">
                      {label}
                    </AccordionTrigger>

                    <AccordionContent className="pb-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
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
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion> */}

              <Accordion type="single" collapsible className="space-y-2">
                {[
                  // {
                  //   value: "desc",
                  //   label: "Full description below",
                  //   content: (
                  //     <p className="text-xs text-gray-500 leading-relaxed pb-3">
                  //       Market habitats locatifs is a premium residential
                  //       development offering a curated selection of rental units
                  //       in one of Cartagena's most sought-after neighbourhoods.
                  //       Each unit is designed with contemporary finishes,
                  //       open-plan layouts, and floor-to-ceiling windows offering
                  //       stunning city and bay views. The development offers a
                  //       full suite of amenities including concierge, rooftop
                  //       pool, fitness centre, and secure underground parking.
                  //     </p>
                  //   ),
                  // },
                  {
                    value: "contact-info",
                    label: "Contact details and website for this project",
                    content: (
                      <div className="grid sm:grid-cols-2 gap-3 pb-4">
                        {[
                          {
                            icon: Phone,
                            label: "Phone",
                            val: "+57 315 123 4567",
                          },
                          {
                            icon: Mail,
                            label: "Email",
                            val: "info@markethabitats.co",
                          },
                          {
                            icon: Globe,
                            label: "Website",
                            val: "markethabitats.co",
                          },
                        ].map((item, i) => (
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
                              <p className="text-gray-500">{item.val}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ),
                    // content: (
                    //   <div className="space-y-2 pb-3">
                    //     {[
                    //       {
                    //         icon: Phone,
                    //         label: "Phone",
                    //         val: "+57 315 123 4567",
                    //       },
                    //       {
                    //         icon: Mail,
                    //         label: "Email",
                    //         val: "info@markethabitats.co",
                    //       },
                    //       {
                    //         icon: Globe,
                    //         label: "Website",
                    //         val: "markethabitats.co",
                    //       },
                    //     ].map((item, i) => (
                    //       <div
                    //         key={i}
                    //         className="flex items-center gap-2.5 text-xs"
                    //       >
                    //         <item.icon
                    //           size={12}
                    //           className="text-amber-500 shrink-0"
                    //         />
                    //         <span className="font-semibold text-gray-700">
                    //           {item.label}:
                    //         </span>
                    //         <span className="text-gray-500">{item.val}</span>
                    //       </div>
                    //     ))}
                    //   </div>
                    // ),
                  },
                  {
                    value: "developer",
                    label: "Real estate developer(s)",
                    content: (
                      <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Building2 size={20} className="text-gray-600" />
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            Market Habitats Group
                          </p>

                          <p className="text-sm text-gray-500">
                            Established 2008 — Cartagena, Colombia
                          </p>

                          <p className="text-sm text-gray-600 font-semibold mt-1">
                            12 active projects
                          </p>
                        </div>
                      </div>
                    ),
                    // content: (
                    //   <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 mb-3">
                    //     <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                    //       <Building2 size={15} className="text-amber-600" />
                    //     </div>
                    //     <div>
                    //       <p className="font-bold text-black text-xs font-antigua">
                    //         Market Habitats Group
                    //       </p>
                    //       <p className="text-[10px] text-gray-400">
                    //         Established 2008 — Cartagena, Colombia
                    //       </p>
                    //       <p className="text-[10px] text-amber-600 font-semibold mt-0.5">
                    //         12 active projects
                    //       </p>
                    //     </div>
                    //   </div>
                    // ),
                  },
                  {
                    value: "address",
                    label: "Address",
                    content: (
                      <div className="flex items-start gap-3 pb-4">
                        <MapPin size={18} className="text-gray-500 mt-1" />

                        <div>
                          <p className="font-semibold text-gray-900">
                            Cartagena, Cartagena Province
                          </p>

                          <p className="text-sm text-gray-500">
                            Bolívar, Colombia — Manga District
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
                  {
                    value: "features",
                    label: "Features",
                    content: (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pb-4">
                        {features.map((item, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-center gap-2 bg-gray-50 rounded-xl p-4 text-center"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                              <item.icon size={18} className="text-gray-500" />
                            </div>

                            <p className="text-sm text-gray-700 font-medium">
                              {item.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    ),
                    // content: (
                    //   <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pb-3">
                    //     {features.map((item, i) => (
                    //       <div
                    //         key={i}
                    //         className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl p-2.5 text-center border border-gray-100"
                    //       >
                    //         <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                    //           <item.icon size={13} className="text-amber-500" />
                    //         </div>
                    //         <p className="text-[10px] font-semibold text-gray-700 leading-tight">
                    //           {item.label}
                    //         </p>
                    //       </div>
                    //     ))}
                    //   </div>
                    // ),
                  },
                  {
                    value: "comments",
                    label: "User Comments (3)",
                    content: (
                      <div className="space-y-4 pb-4">
                        {[
                          {
                            name: "Carlos V.",
                            comment:
                              "Excellent location and amazing amenities. The rooftop pool view is spectacular at sunset.",
                            rating: 5,
                            date: "2 months ago",
                          },
                          {
                            name: "Sophie L.",
                            comment:
                              "The units are beautifully designed and the management team is very responsive.",
                            rating: 4,
                            date: "4 months ago",
                          },
                          {
                            name: "Miguel R.",
                            comment:
                              "Great value for what you get. Highly recommended for long-term rental.",
                            rating: 4,
                            date: "6 months ago",
                          },
                        ].map((item, i) => (
                          <div key={i} className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                  <User size={14} className="text-gray-600" />
                                </div>

                                <p className="font-semibold text-gray-900">
                                  {item.name}
                                </p>
                              </div>

                              <span className="text-xs text-gray-400">
                                {item.date}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mb-2">
                              <StarRow count={item.rating} />
                            </div>

                            <p className="text-sm text-gray-600 leading-relaxed">
                              {item.comment}
                            </p>

                            <div className="flex gap-4 mt-3 text-sm text-gray-500">
                              <button className="flex items-center gap-1 hover:text-green transition">
                                <ThumbsUp size={14} /> Helpful
                              </button>

                              <button className="flex items-center gap-1 hover:text-amber-500 transition">
                                <MessageSquare size={14} /> Reply
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ),
                    // content: (
                    //   <div className="space-y-2.5 pb-3">
                    //     {[
                    //       {
                    //         name: "Carlos V.",
                    //         comment:
                    //           "Excellent location and amazing amenities. The rooftop pool view is spectacular at sunset.",
                    //         rating: 5,
                    //         date: "2 months ago",
                    //       },
                    //       {
                    //         name: "Sophie L.",
                    //         comment:
                    //           "The units are beautifully designed and the management team is very responsive.",
                    //         rating: 4,
                    //         date: "4 months ago",
                    //       },
                    //       {
                    //         name: "Miguel R.",
                    //         comment:
                    //           "Great value for what you get. Highly recommended for long-term rental.",
                    //         rating: 4,
                    //         date: "6 months ago",
                    //       },
                    //     ].map((item, i) => (
                    //       <div
                    //         key={i}
                    //         className="bg-gray-50 rounded-xl p-3 border border-gray-100"
                    //       >
                    //         <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                    //           <div className="flex items-center gap-2">
                    //             <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                    //               <User size={10} className="text-amber-600" />
                    //             </div>
                    //             <span className="font-bold text-black text-xs font-antigua">
                    //               {item.name}
                    //             </span>
                    //           </div>
                    //           <div className="flex items-center gap-1.5">
                    //             <StarRow count={item.rating} />
                    //             <span className="text-[10px] text-gray-400">
                    //               {item.date}
                    //             </span>
                    //           </div>
                    //         </div>
                    //         <p className="text-[10px] text-gray-500 leading-relaxed">
                    //           {item.comment}
                    //         </p>
                    //         <div className="flex items-center gap-3 mt-1.5">
                    //           <button className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-green transition">
                    //             <ThumbsUp size={9} /> Helpful
                    //           </button>
                    //           <button className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-amber-500 transition">
                    //             <MessageSquare size={9} /> Reply
                    //           </button>
                    //         </div>
                    //       </div>
                    //     ))}
                    //   </div>
                    // ),
                  },
                  {
                    value: "blogs",
                    label: "Blog posts related to this project",
                    content: (
                      <div className="space-y-3 pb-4">
                        {[
                          {
                            title: "Top 5 Reasons to Rent in Manga, Cartagena",
                            date: "Jan 2025",
                          },
                          {
                            title:
                              "The Ultimate Guide to Cartagena Real Estate 2025",
                            date: "Feb 2025",
                          },
                          {
                            title:
                              "Comparing Rental vs Buying in Colombia's Caribbean Coast",
                            date: "Mar 2025",
                          },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 hover:border-amber-300 border border-gray-100 cursor-pointer transition"
                          >
                            <p className="text-sm font-medium text-gray-800">
                              {item.title}
                            </p>

                            <span className="text-xs text-gray-400">
                              {item.date}
                            </span>
                          </div>
                        ))}
                      </div>
                    ),
                    // content: (
                    //   <div className="space-y-2 pb-3">
                    //     {[
                    //       {
                    //         title: "Top 5 Reasons to Rent in Manga, Cartagena",
                    //         date: "Jan 2025",
                    //       },
                    //       {
                    //         title:
                    //           "The Ultimate Guide to Cartagena Real Estate 2025",
                    //         date: "Feb 2025",
                    //       },
                    //       {
                    //         title:
                    //           "Comparing Rental vs Buying in Colombia's Caribbean Coast",
                    //         date: "Mar 2025",
                    //       },
                    //     ].map((item, i) => (
                    //       <div
                    //         key={i}
                    //         className="flex items-center justify-between gap-2 bg-gray-50 rounded-xl p-3 border border-gray-100 hover:border-amber-300 cursor-pointer transition"
                    //       >
                    //         <p className="text-xs font-semibold text-black flex-1">
                    //           {item.title}
                    //         </p>
                    //         <span className="text-[10px] text-gray-400 shrink-0">
                    //           {item.date}
                    //         </span>
                    //       </div>
                    //     ))}
                    //   </div>
                    // ),
                  },
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {nearbyProjects.map((item, i) => (
              <PropertyCard key={i} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* ══ HOME IN THE AREA MAP ══ */}
      <div className="bg-white px-4 sm:px-6 md:px-10 lg:px-14 py-8">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="text-xl md:text-2xl font-extrabold  text-black mb-4">
            Home in the area
          </h2>
          <div
            className="rounded-2xl overflow-hidden border border-gray-200 relative"
            style={{ height: "300px" }}
          >
            {/* <div className="w-full h-[450px] rounded-xl overflow-hidden">
              <MapContainer
                center={position}
                zoom={12}
                scrollWheelZoom
                className="h-full w-full"
              > */}
            <div className="h-[500px] w-full">
              <MapContainer
                center={[45.558, -73.712]}
                zoom={12}
                className="h-full w-full"
              >
                {/* <TileLayer
                  attribution="© OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                /> */}
                <TileLayer
                  attribution="© OpenStreetMap contributors © CARTO"
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <Marker ref={markerRef} position={position}>
                  <Popup closeButton={false} autoClose={false}>
                    <div className="space-y-1">
                      <h3 className="font-semibold">
                        Market habitats locatifs
                      </h3>
                      <p className="text-sm text-gray-500">Condos</p>
                      <p className="text-xs text-gray-500">You are here</p>
                      <p className="font-bold">$1,653 per month</p>
                    </div>
                  </Popup>
                </Marker>

                {/* <MarkerClusterGroup>
                  {locations.map((loc) => (
                    <Marker
                      key={loc.id}
                      position={loc.position}
                      icon={customIcon}
                    >
                      <Popup open={true}>
                        <div className="space-y-1">
                          <h3 className="font-semibold">{loc.name}</h3>
                          <p className="text-sm text-gray-500">Condos</p>
                          <p className="font-bold">{loc.price}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MarkerClusterGroup> */}
              </MapContainer>
            </div>

            {/* <iframe
              title="Area Map"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Manga+Cartagena+Colombia&output=embed"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg p-3 min-w-[170px] text-center border border-gray-100">
              <p className="font-extrabold text-black text-xs font-antigua leading-tight mb-0.5">
                Market habitats locatifs
              </p>
              <p className="text-[10px] text-green font-bold">$1,053/month</p>
              <button className="mt-2 bg-green text-white text-[9px] font-bold px-4 py-1.5 rounded-full w-full hover:opacity-90 transition">
                View Project
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* ══ CUSTOMERS ALSO SEEN SLIDER ══ */}
      <div className="bg-white px-4 sm:px-6 md:px-10 lg:px-14 pb-10">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="text-xl md:text-2xl font-extrabold  text-black mb-4">
            Customers who have seen this real estate project have also seen
            these
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {alsoSeenProjects.map((item, i) => (
              <Card
  key={i}
  className="overflow-hidden rounded-md group cursor-pointer shadow hover:shadow-xl transition duration-300"
>
  {/* IMAGE */}
  <div className="relative h-[230px] overflow-hidden">
    <img
      src={item.image}
      alt={item.title}
      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
    />

    {/* Favorite Button */}
    <button className="absolute top-4 right-4 w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center shadow-md hover:bg-yellow-500 transition">
      <Heart size={20} className="text-black" />
    </button>
  </div>

  {/* CONTENT */}
  <CardContent className="p-3 space-y-2">
    {/* Title */}
    <div>
    <h3 className="font-semibold text-lg text-gray-900">
      {item.title}
    </h3>

    {/* Location */}
    <p className="text-gray-500 text-sm">
      {item.sub}
    </p>
    </div>

    {/* Property Type */}
    <p className="text-gray-500 text-sm">
      {item.type}
    </p>

    {/* Features list */}
    <ul className="text-gray-500 text-sm list-disc pl-4 space-y-1">
      <li>103 units</li>
      <li>1 to 3 bedrooms</li>
      <li>Move-in-ready</li>
    </ul>

    {/* Price */}
    <p className="text-gray-900 font-semibold pt-2 text-sm">
      Starting at {item.price}
      <span className="text-gray-500 font-medium">/month</span>
    </p>

    {/* Rating */}
    <StarRow count={item.rating} />
  </CardContent>
</Card>
            ))}
          </div>
          {/* <div className="relative">
            <button
              onClick={() => scrollAlsoSeen("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center shadow hover:bg-amber-500 transition"
            >
              <ChevronLeft size={14} />
            </button>
            <div
              ref={alsoSeenRef}
              className="gird grid-cols-1 md:grid-cols-4 pb-2 px-1"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {alsoSeenProjects.map((item, i) => (
                <div
                  key={i}
                  className=" bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow flex-shrink-0 flex flex-col"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div className="relative h-[130px] sm:h-[145px] overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <button className="absolute top-2 right-2 w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center hover:bg-amber-500 transition shadow">
                      <Heart size={11} className="text-white" />
                    </button>
                  </div>
                  <div className="p-3 flex flex-col flex-1">
                    <p className="font-extrabold text-black text-xs font-antigua leading-tight mb-0.5">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-gray-400 mb-0.5">
                      {item.sub}
                    </p>
                    <p className="text-[10px] text-gray-500 mb-1.5">
                      {item.type}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-1.5">
                      <span className="flex items-center gap-0.5">
                        <BedDouble size={9} /> {item.beds}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Bath size={9} /> {item.baths}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-green mt-auto mb-1">
                      Starting at {item.price}
                    </p>
                    <StarRow count={item.rating} />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollAlsoSeen("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-8 h-8 rounded-full bg-green text-white flex items-center justify-center shadow hover:opacity-90 transition"
            >
              <ChevronRight size={14} />
            </button>
          </div> */}
        </div>
      </div>

      {/* ══ NEWSLETTER ══ */}
      <CartagenaNews />
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
