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
  Share2,
  Search,
  ChevronLeft,
  ChevronRight,
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
  { image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600", title: "HOUSE FOR RENT IN MANGA", type: "House for Rent", garage: "Garage", beds: 3, baths: 2, price: "$4.00/month", rating: 3.5 },
  { image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600", title: "HOUSE FOR RENT IN MANGA", type: "House for Rent", garage: "Garage", beds: 3, baths: 2, price: "$4.00/month", rating: 3.5 },
  { image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600", title: "HOUSE FOR RENT IN MANGA", type: "House for Rent", garage: "Garage", beds: 3, baths: 2, price: "$4.00/month", rating: 3.5 },
  { image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600", title: "HOUSE FOR RENT IN MANGA", type: "House for Rent", garage: "Garage", beds: 3, baths: 2, price: "$4.00/month", rating: 3.5 },
  { image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=600", title: "HOUSE FOR RENT IN MANGA", type: "House for Rent", garage: "Garage", beds: 3, baths: 2, price: "$4.00/month", rating: 3.5 },
  { image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600", title: "HOUSE FOR RENT IN MANGA", type: "House for Rent", garage: "Garage", beds: 3, baths: 2, price: "$4.00/month", rating: 3.5 },
];

const alsoSeenProjects = [
  { image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500", title: "La Royan", sub: "House for Rent Rights", type: "House for Rent", beds: 2, baths: 2, price: "$1,262", rating: 4 },
  { image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500", title: "Espace Lévesque Ouest", sub: "House for Rent", type: "House for Sale", beds: 3, baths: 2, price: "$880", rating: 4 },
  { image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=500", title: "La Jannea", sub: "House for Sale", type: "Condo for Sale", beds: 3, baths: 3, price: "$1,200", rating: 4 },
  { image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500", title: "Les Tours Saint-Martin", sub: "House for Rent", type: "House for Rent", beds: 2, baths: 2, price: "$680", rating: 4 },
  { image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=500", title: "La Jannea", sub: "House for Sale", type: "Condo for Sale", beds: 3, baths: 3, price: "$1,200", rating: 4 },
   { image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500", title: "Espace Lévesque Ouest", sub: "House for Rent", type: "House for Sale", beds: 3, baths: 2, price: "$880", rating: 4 },
     { image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500", title: "La Royan", sub: "House for Rent Rights", type: "House for Rent", beds: 2, baths: 2, price: "$1,262", rating: 4 },
       { image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=500", title: "La Jannea", sub: "House for Sale", type: "Condo for Sale", beds: 3, baths: 3, price: "$1,200", rating: 4 },
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

function StarRow({ count, total = 5, size = "sm" }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array(total).fill(0).map((_, i) => (
        <Star
          key={i}
          className={`${size === "sm" ? "h-3 w-3" : "h-4 w-4"} ${
            i < Math.floor(count) ? "fill-yellow-400 text-yellow-400" : i < count ? "fill-yellow-200 text-yellow-400" : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function PropertyCard({ item }) {
  return (
    <Link href={item.href || "#"}>
      <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col cursor-pointer">
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
          <h3 className="text-lg text-black font-semibold font-antigua leading-tight">{item.title}</h3>
          <h5 className="text-sm text-black/60 font-semibold">{item.type}</h5>
          <p className="text-xs flex gap-2 text-black/60 items-center">
            <Car className="w-4 h-4 shrink-0" /> {item.garage}
          </p>
          <p className="text-xs flex gap-2 text-black/60 items-center">
            <BedDouble className="w-4 h-4 shrink-0" /> Number of Bedrooms: {item.beds}
          </p>
          <p className="text-xs flex gap-2 text-black/60 items-center">
            <Bath className="w-4 h-4 shrink-0" /> Number of Bathrooms: {item.baths}
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
          <button className="w-full rounded-md border border-gray-300 bg-gray-100 text-amber-500 hover:text-gold underline text-sm py-2 font-semibold transition hover:bg-gray-200">
            SEE THIS PROJECT
          </button>
        </div>
      </div>
    </Link>
  );
}

export default function RealEstateDetails() {
  const [activeImg, setActiveImg] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", appointment: "", message: "", broker: false });
  const alsoSeenRef = useRef(null);

  const scrollAlsoSeen = (dir) => {
    if (!alsoSeenRef.current) return;
    alsoSeenRef.current.scrollBy({ left: dir === "left" ? -260 : 260, behavior: "smooth" });
  };

  return (
    <div className="bg-white font-sans w-full overflow-x-hidden">

      <a href="https://wa.me/573151234567" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-green rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110">
        <MessageCircle size={24} className="text-white" />
      </a>

      {/* ══ TOP SEARCH BAR ══ */}
      <div className="bg-white px-4 sm:px-6 md:px-10 lg:px-14 pt-5 pb-4 border-b border-gray-100">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex items-start gap-3">
            <div className="flex flex-col gap-2 shrink-0 pt-0.5">
              <button className="w-9 h-9 rounded-full bg-red flex items-center justify-center shadow hover:opacity-90 transition">
                <Share2 size={14} className="text-white" />
              </button>
              <button className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center shadow hover:bg-amber-500 transition">
                <Heart size={14} className="text-white" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold text-black font-antigua leading-tight mb-3">
                Complete guide of all real estate projects in Cartagena.
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-full px-3 py-2.5 gap-2 shadow-sm">
                  <AlignJustify size={13} className="text-gray-400 shrink-0" />
                  <input type="text" placeholder="What are you looking for?" className="flex-1 bg-transparent outline-none text-xs md:text-sm text-gray-600 placeholder-gray-400" />
                </div>
                <button className="bg-green text-white font-bold text-xs md:text-sm px-5 md:px-7 py-2.5 rounded-full shadow whitespace-nowrap hover:opacity-90 transition">
                  Search
                </button>
                <button className="hidden sm:flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 md:px-4 py-2.5 text-[10px] md:text-xs font-semibold text-gray-500 hover:border-amber-400 transition whitespace-nowrap">
                  <SlidersHorizontal size={12} /> Saved Searches
                </button>
                <a href="https://wa.me/573151234567" target="_blank" rel="noopener noreferrer" className="hidden sm:flex w-9 h-9 bg-green rounded-full items-center justify-center shadow hover:bg-green-600 transition shrink-0">
                  <MessageCircle size={14} className="text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ BREADCRUMB + SPECS ══ */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-14 py-3 bg-white">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[10px] text-gray-400 mb-1.5">
            <Link href="/real-estate" className="hover:text-amber-500 transition">Real Estate Listing</Link>
            {" "}&rsaquo;{" "}
            <span className="text-gray-600 font-semibold">Market habitats locatifs</span>
          </p>
          <p className="text-[10px] text-gray-500 font-semibold mb-3">&lsaquo; Back to Real Estate</p>
          <div className="flex items-center gap-3 md:gap-5 flex-wrap">
            {[
              { icon: Building2, label: "Unavailable" },
              { icon: Bath, label: "2 Baths" },
              { icon: BedDouble, label: "2 Bedrooms" },
              { icon: BedDouble, label: "3 Bedrooms" },
              { icon: SquareCode, label: "1023 Sq. Ft." },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[10px] text-gray-600 font-semibold">
                <item.icon size={12} className="text-amber-500" />{item.label}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-500 mt-1.5 flex items-center gap-1">
            <MapPin size={9} className="text-amber-500" />
            Cartagena, Cartagena Province, Bolivar, Colombia Sq. Ft.
          </p>
        </div>
      </div>

      {/* ══ MAIN IMAGE SLIDER ══ */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-14 pb-4">
        <div className="mx-auto max-w-[1100px]">
          <div className="relative rounded-2xl overflow-hidden shadow-md h-[240px] sm:h-[320px] md:h-[420px] lg:h-[470px]">
            <img src={heroImages[activeImg]} alt="Property" className="w-full h-full object-cover transition-all duration-700" />
            <button onClick={() => setActiveImg((p) => (p - 1 + heroImages.length) % heroImages.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => setActiveImg((p) => (p + 1) % heroImages.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition">
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-3 left-3 bg-black/50 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm">
              {activeImg + 1} / {heroImages.length}
            </div>
            <button className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-black text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-white transition shadow">
              <Eye size={11} /> View All
            </button>
          </div>
          <div className="flex gap-2 mt-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {thumbImages.map((src, i) => (
              <div key={i} onClick={() => setActiveImg(i)} className={`w-[75px] h-[52px] sm:w-[95px] sm:h-[65px] md:w-[110px] md:h-[75px] rounded-xl overflow-hidden cursor-pointer flex-shrink-0 transition-all ${i === activeImg ? "ring-2 ring-amber-400 ring-offset-1" : "opacity-60 hover:opacity-90"}`}>
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ CONTENT + SIDEBAR ══ */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-14 pb-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-[1fr_360px]">

            {/* LEFT */}
            <div className="space-y-4 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-black font-antigua leading-tight mb-1">Market habitats locatifs</h2>
                  <StarRow count={4} size="md" />
                  <div className="mt-2">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Condos for Rent</p>
                    <p className="text-xl md:text-2xl font-extrabold text-black font-antigua mt-0.5">
                      Starting at <span className="text-green">$1,053</span>{" "}
                      <span className="text-sm font-normal text-gray-500">per month</span>
                    </p>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                    <BedDouble size={10} className="text-amber-500" /> 1 Baths — 1-3 Bedrooms
                  </p>
                </div>
                <button className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center shadow hover:bg-amber-500 transition shrink-0 mt-1">
                  <Heart size={14} className="text-white" />
                </button>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 rounded-2xl p-3 md:p-4 border border-gray-100">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <Building2 size={18} className="text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-black text-sm md:text-base font-antigua">Market rental habitats</p>
                  <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 leading-relaxed">
                    Market habitats locatifs offers a full range of advantages to rental residents. It features a prime location in the heart of Cartagena. The 2 similar phases feature a wide selection of an inclusive set, equipped with high-end amenities within an urban eco-logic. Alright residents can find the balance without cost of light.
                  </p>
                </div>
              </div>

              <Accordion type="multiple" className="space-y-2">
                {[
                  {
                    value: "desc", label: "Full description below",
                    content: (
                      <p className="text-xs text-gray-500 leading-relaxed pb-3">
                        Market habitats locatifs is a premium residential development offering a curated selection of rental units in one of Cartagena's most sought-after neighbourhoods. Each unit is designed with contemporary finishes, open-plan layouts, and floor-to-ceiling windows offering stunning city and bay views. The development offers a full suite of amenities including concierge, rooftop pool, fitness centre, and secure underground parking.
                      </p>
                    ),
                  },
                  {
                    value: "contact-info", label: "Contact details and website for this project",
                    content: (
                      <div className="space-y-2 pb-3">
                        {[{ icon: Phone, label: "Phone", val: "+57 315 123 4567" }, { icon: Mail, label: "Email", val: "info@markethabitats.co" }, { icon: Globe, label: "Website", val: "markethabitats.co" }].map((item, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-xs">
                            <item.icon size={12} className="text-amber-500 shrink-0" />
                            <span className="font-semibold text-gray-700">{item.label}:</span>
                            <span className="text-gray-500">{item.val}</span>
                          </div>
                        ))}
                      </div>
                    ),
                  },
                  {
                    value: "developer", label: "Real estate developer(s)",
                    content: (
                      <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0"><Building2 size={15} className="text-amber-600" /></div>
                        <div>
                          <p className="font-bold text-black text-xs font-antigua">Market Habitats Group</p>
                          <p className="text-[10px] text-gray-400">Established 2008 — Cartagena, Colombia</p>
                          <p className="text-[10px] text-amber-600 font-semibold mt-0.5">12 active projects</p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    value: "address", label: "Address",
                    content: (
                      <div className="flex items-start gap-2 pb-3">
                        <MapPin size={13} className="text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-black text-xs font-antigua">Cartagena, Cartagena Province</p>
                          <p className="text-[10px] text-gray-500">Bolivar, Colombia — Manga District</p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    value: "features", label: "Features",
                    content: (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pb-3">
                        {features.map((item, i) => (
                          <div key={i} className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl p-2.5 text-center border border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center"><item.icon size={13} className="text-amber-500" /></div>
                            <p className="text-[10px] font-semibold text-gray-700 leading-tight">{item.label}</p>
                          </div>
                        ))}
                      </div>
                    ),
                  },
                  {
                    value: "comments", label: "User Comments (3)",
                    content: (
                      <div className="space-y-2.5 pb-3">
                        {[
                          { name: "Carlos V.", comment: "Excellent location and amazing amenities. The rooftop pool view is spectacular at sunset.", rating: 5, date: "2 months ago" },
                          { name: "Sophie L.", comment: "The units are beautifully designed and the management team is very responsive.", rating: 4, date: "4 months ago" },
                          { name: "Miguel R.", comment: "Great value for what you get. Highly recommended for long-term rental.", rating: 4, date: "6 months ago" },
                        ].map((item, i) => (
                          <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                            <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center"><User size={10} className="text-amber-600" /></div>
                                <span className="font-bold text-black text-xs font-antigua">{item.name}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <StarRow count={item.rating} />
                                <span className="text-[10px] text-gray-400">{item.date}</span>
                              </div>
                            </div>
                            <p className="text-[10px] text-gray-500 leading-relaxed">{item.comment}</p>
                            <div className="flex items-center gap-3 mt-1.5">
                              <button className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-green transition"><ThumbsUp size={9} /> Helpful</button>
                              <button className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-amber-500 transition"><MessageSquare size={9} /> Reply</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ),
                  },
                  {
                    value: "blogs", label: "Blog posts related to this project",
                    content: (
                      <div className="space-y-2 pb-3">
                        {[
                          { title: "Top 5 Reasons to Rent in Manga, Cartagena", date: "Jan 2025" },
                          { title: "The Ultimate Guide to Cartagena Real Estate 2025", date: "Feb 2025" },
                          { title: "Comparing Rental vs Buying in Colombia's Caribbean Coast", date: "Mar 2025" },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between gap-2 bg-gray-50 rounded-xl p-3 border border-gray-100 hover:border-amber-300 cursor-pointer transition">
                            <p className="text-xs font-semibold text-black flex-1">{item.title}</p>
                            <span className="text-[10px] text-gray-400 shrink-0">{item.date}</span>
                          </div>
                        ))}
                      </div>
                    ),
                  },
                ].map((item) => (
                  <AccordionItem key={item.value} value={item.value} className="bg-white rounded-xl border border-gray-100 shadow-sm px-4">
                    <AccordionTrigger className="text-left text-xs md:text-sm font-semibold text-black hover:no-underline py-3.5">{item.label}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* RIGHT — LEAD FORM */}
            <div className="lg:sticky lg:top-5 h-fit">
              <div className="bg-[#f8f5e9] rounded-2xl p-5 border border-amber-200 shadow-sm">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">Contact</p>
                <h3 className="text-lg font-extrabold text-black font-antigua mb-0.5">Interested in this project?</h3>
                <p className="text-[10px] text-gray-500 mb-4">Fill in your details and speak with our COLLECTION™ experts.</p>
                <div className="space-y-2.5">
                  {[
                    { placeholder: "Name", type: "text", key: "name" },
                    { placeholder: "Email", type: "email", key: "email" },
                    { placeholder: "Phone Number", type: "tel", key: "phone" },
                    { placeholder: "Appointment / Optional", type: "text", key: "appointment" },
                  ].map((field) => (
                    <input key={field.key} type={field.type} placeholder={field.placeholder} value={formData[field.key]} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })} className="w-full bg-white border border-amber-100 rounded-xl px-3 py-2.5 text-xs text-black placeholder-gray-400 outline-none focus:border-amber-400 transition" />
                  ))}
                  <textarea placeholder="Message" rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-white border border-amber-100 rounded-xl px-3 py-2.5 text-xs text-black placeholder-gray-400 outline-none focus:border-amber-400 transition resize-none" />
                  <div className="flex items-start gap-2.5 bg-white rounded-xl p-3 border border-amber-100">
                    <input type="checkbox" id="broker" checked={formData.broker} onChange={(e) => setFormData({ ...formData, broker: e.target.checked })} className="mt-0.5 w-3.5 h-3.5 accent-amber-500 shrink-0" />
                    <label htmlFor="broker" className="text-[10px] text-gray-500 leading-relaxed cursor-pointer">
                      I'm a broker / real estate agent and would like to receive more information about this listing for client referral purposes.
                    </label>
                  </div>
                  <button className="w-full bg-green text-white font-bold text-sm py-3 rounded-full shadow flex items-center justify-center gap-2 hover:opacity-90 transition">
                    <Send size={13} /> Submit
                  </button>
                </div>
                <p className="text-[9px] text-gray-400 text-center mt-3 leading-relaxed">By submitting you agree to our privacy policy and terms of use.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ VISIT COLLECTION GRID ══ */}
      <div className="bg-[#fbf7ef] px-4 sm:px-6 md:px-10 lg:px-14 py-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-black">Visit COLLECTION™ projects located nearby</h2>
            <div className="flex gap-2 shrink-0">
              <button className="bg-red text-white text-[10px] font-bold rounded-full px-3 py-1.5 hover:opacity-90 transition flex items-center gap-1">
                <X size={9} /> Clear Filters
              </button>
              <button className="bg-green text-white text-[10px] font-bold rounded-full px-3 py-1.5 hover:opacity-90 transition flex items-center gap-1">
                <Sliders size={9} /> 3 Filters
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
          <h2 className="text-xl md:text-2xl font-extrabold font-antigua text-black mb-4">Home in the area</h2>
          <div className="rounded-2xl overflow-hidden border border-gray-200 relative" style={{ height: "300px" }}>
            <iframe title="Area Map" className="w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Manga+Cartagena+Colombia&output=embed" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg p-3 min-w-[170px] text-center border border-gray-100">
              <p className="font-extrabold text-black text-xs font-antigua leading-tight mb-0.5">Market habitats locatifs</p>
              <p className="text-[10px] text-green font-bold">$1,053/month</p>
              <button className="mt-2 bg-green text-white text-[9px] font-bold px-4 py-1.5 rounded-full w-full hover:opacity-90 transition">View Project</button>
            </div>
          </div>
        </div>
      </div>

      {/* ══ CUSTOMERS ALSO SEEN SLIDER ══ */}
      <div className="bg-white px-4 sm:px-6 md:px-10 lg:px-14 pb-10">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="text-xl md:text-2xl font-extrabold font-antigua text-black mb-4">
            Customers who have seen this real estate project have also seen these
          </h2>
          <div className="relative">
            <button onClick={() => scrollAlsoSeen("left")} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center shadow hover:bg-amber-500 transition">
              <ChevronLeft size={14} />
            </button>
            <div ref={alsoSeenRef} className="flex gap-4 overflow-x-auto pb-2 px-1" style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {alsoSeenProjects.map((item, i) => (
                <div key={i} className="min-w-[190px] sm:min-w-[210px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow flex-shrink-0 flex flex-col" style={{ scrollSnapAlign: "start" }}>
                  <div className="relative h-[130px] sm:h-[145px] overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <button className="absolute top-2 right-2 w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center hover:bg-amber-500 transition shadow">
                      <Heart size={11} className="text-white" />
                    </button>
                  </div>
                  <div className="p-3 flex flex-col flex-1">
                    <p className="font-extrabold text-black text-xs font-antigua leading-tight mb-0.5">{item.title}</p>
                    <p className="text-[10px] text-gray-400 mb-0.5">{item.sub}</p>
                    <p className="text-[10px] text-gray-500 mb-1.5">{item.type}</p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-1.5">
                      <span className="flex items-center gap-0.5"><BedDouble size={9} /> {item.beds}</span>
                      <span className="flex items-center gap-0.5"><Bath size={9} /> {item.baths}</span>
                    </div>
                    <p className="text-xs font-bold text-green mt-auto mb-1">Starting at {item.price}</p>
                    <StarRow count={item.rating} />
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => scrollAlsoSeen("right")} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-8 h-8 rounded-full bg-green text-white flex items-center justify-center shadow hover:opacity-90 transition">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ══ NEWSLETTER ══ */}
      <div className="relative py-14 md:py-20 px-4 sm:px-6 md:px-10 overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative mx-auto max-w-[680px] text-center">
          <p className="text-[10px] uppercase tracking-widest font-bold text-amber-400 mb-1.5">STAY UPDATED</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-antigua mb-2">Cartagena Newsletter</h2>
          <p className="text-sm text-white/80 mb-1">Get the latest discoveries, deals, coupon, news &amp; tips of Cartagena.</p>
          <p className="text-xs text-white/50 mb-6">Get our latest discoveries, events, images &amp; tips of Cartagena.</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-[480px] mx-auto">
            <input type="email" placeholder="Your email address" className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/50 text-xs outline-none focus:border-amber-400 transition backdrop-blur-sm" />
            <button className="bg-gold text-white font-bold text-xs px-6 py-3 rounded-full shadow whitespace-nowrap hover:opacity-90 transition">Subscribe Now</button>
          </div>
        </div>
      </div>

    </div>
  );
}