import React, { useState, useRef } from "react";
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
  Shell,
  Palmtree,
  Footprints,
  Fish,
  Waves,
  Droplets,
  Thermometer,
  LifeBuoy,
  Share2,
  Navigation,
  ChevronDown,
  Fuel,
  Ship,
  Compass,
  CalendarDays,
  Luggage,
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
} from "lucide-react";
import { Button } from "@public/components/ui/button";
import { Badge } from "@public/components/ui/badge";

const thumbnails = [
  "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800",
  "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800",
  "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800",
  "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800",
];

const sliderPlaces = [
  {
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
    category: "Foodie",
    title: "LA GRANDE – MONT ROYAL",
    subtitle: "Best French Breakfast",
    rating: 4.5,
  },
  {
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    category: "Grill",
    title: "THE BULL HOUSE",
    subtitle: "Premium Steak & BBQ",
    rating: 4.2,
  },
  {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    category: "Asian Fusion",
    title: "KARAMI FUSION",
    subtitle: "Modern Pan-Asian Cuisine",
    rating: 4.7,
  },
  {
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
    category: "Italian",
    title: "BELLA NAPOLI",
    subtitle: "Authentic Wood-Fired Pizza",
    rating: 4.8,
  },
  {
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800",
    category: "Cafe",
    title: "URBAN BREW",
    subtitle: "Specialty Coffee & Brunch",
    rating: 4.3,
  },
  {
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    category: "Fine Dining",
    title: "L'ÉTOILE",
    subtitle: "Contemporary French Cuisine",
    rating: 4.9,
  },
  {
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800",
    category: "Desserts",
    title: "SWEET HAVEN",
    subtitle: "Artisan Cakes & Pastries",
    rating: 4.1,
  },
  {
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800",
    category: "Fast Food",
    title: "STACK BURGERS",
    subtitle: "Gourmet Smash Burgers",
    rating: 4.4,
  },
  {
    image: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=800",
    category: "Seafood",
    title: "BLUE OCEAN",
    subtitle: "Fresh Catch Daily",
    rating: 4.6,
  },
];

const dealsSlides = [
  {
    title: "Snorkeling + Lunch Combo",
    desc: "Full equipment, guided tour & fresh seafood lunch included. Valid till March 2025.",
    highlight: "BOOK NOW",
    tag: "SAVE 20%",

    valid: "Valid until February 14, 2026",
  },
  {
    title: "Group Discount 10% Off",
    desc: "Book for 4+ people and get 10% off. Life jackets & transport included.",
    highlight: "LIMITED",

    valid: "Valid until February 14, 2026",
  },
  {
    title: "Sunset Snorkel Package",
    desc: "Evening snorkeling with cocktails on return. Reserve now.",
    highlight: "POPULAR",
    tag: "SAVE 20%",

    valid: "Valid until February 14, 2026",
  },
  {
    title: "Extended Stay Package",
    desc: "Book 5 nights, get the 6th night complimentary. Includes daily breakfast and one spa treatment.",
    tag: "SAVE 20%",
    highlight: "LIMITED",
    valid: "Valid until March 31, 2026",
  },
  {
    title: "Romantic Escape",
    desc: "Private beachfront dinner and champagne upon arrival.",
    tag: "",
    highlight: "LIMITED",
    valid: "Valid until February 14, 2026",
  },
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

const reviews = [
  {
    name: "El Gordo",
    date: "Santo - 1 year",
    rating: 2,
    location: "Saint-Lambert",
    text: "Another wonderful evening at my favourite local scene. It is unpleasantly cold out, however the vibrancy and warmth inside more than makes up for it. The quesadilla as always amazing and the sauce delicate only 💯! Thank you all for such an amazing experience every time and thank you for gifting me a glass of wine. So wonderful and sun-kissed 🤍",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60",
    btnLabel: "El Gordo",
  },
  {
    name: "El Gordo",
    date: "Santo - 1 year",
    rating: 0,
    location: "Saint-Lambert",
    text: "Another wonderful evening at my favourite local scene. It is unpleasantly cold out, however the vibrancy and warmth inside more than makes up for it. Truly a place that defines the spirit of Cartagena. Thank you all for such an amazing experience every time and thank you for gifting me a glass of wine. So wonderful and sun-kissed 🤍",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60",
    btnLabel: "El Gordo",
  },
  {
    name: "El Gordo",
    date: "Santo - 1 year",
    rating: 4,
    location: "Saint-Lambert",
    text: "Another wonderful evening at my favourite local scene. It is unpleasantly cold out, however the vibrancy and warmth inside more than makes up for it. Truly a place that defines the spirit of Cartagena. The quesadilla as always amazing and the sauce delicate only 💯! So wonderful and sun-kissed 🤍",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60",
    btnLabel: "El Gordo",
  },
];

const faqData = [
  {
    question: "How do I get there?",
    answer:
      "You can reach the location via private transport, taxi services, or arranged transfers. Detailed directions will be shared after booking.",
  },
  {
    question: "Is it family-friendly?",
    answer:
      "Yes, the activity is suitable for families including children aged 6+. Life vests and beginner equipment are always available.",
  },
  {
    question: "Is Wi-Fi available?",
    answer: "Wi-Fi is available at the base camp and on the transfer boat.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellations made within the allowed period are eligible for a full refund. Please refer to the booking terms for exact details.",
  },
  {
    question: "How far is the location?",
    answer:
      "The snorkeling site is approximately 45–60 minutes by boat from Cartagena marina. Transfer is included in most packages.",
  },
];

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
              <span className="absolute rounded-full shadow-lg p-2 top-3 right-3 bg-yellow-400">
                <Heart className="text-black" />
              </span>
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
              <span className="absolute rounded-full shadow-lg p-2 top-3 right-3 bg-white/30 backdrop-md">
                <Heart className="fill-white" />
              </span>
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

export default function BoatingDetails() {
  const [activeImg, setActiveImg] = useState(0);
  const [dealIdx, setDealIdx] = useState(0);

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
            La Carta &ndash; Cartagena Culture &amp; Tourism &rsaquo; Boating
            &rsaquo; Yacht Charter &rsaquo;{" "}
            <span className="text-gray-700 font-semibold">Jetski</span>
          </p>

          <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-6">
            {/* LEFT: Title + Info */}
            <div className="flex items-start gap-3 flex-1 min-w-0 w-full lg:p-9 md:p-9 sm:p-9">
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black tracking-tight leading-none font-antigua">
                    Jetski
                  </h1>
                  <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-red text-white text-[10px] md:text-xs font-extrabold flex items-center justify-center shrink-0 shadow">
                    J
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <p className="text-xs md:text-sm text-gray-500">
                    Boating / Water Sports / Yacht
                  </p>
                  <p className="text-[10px] md:text-xs font-extrabold tracking-[0.2em] text-gray-700 uppercase">
                    CARTAGENA BAY
                  </p>
                </div>

                <p className="mt-2 md:mt-6 text-sm md:text-base lg:text-[20px] text-gray-600 leading-snug font-semibold">
                  Eco-Luxury Glamping Experience in Isla Bar&uacute;
                </p>

                <div className="mt-3 md:mt-6">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-0.5">
                    Starting From
                  </p>
                  <p className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight font-antigua">
                    $177 &ndash; $515{" "}
                    <span className="text-sm md:text-base font-normal text-gray-500">
                      / night
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

            <div className="flex flex-col sm:flex-row sm:items-start gap-2 md:gap-2.5 w-full lg:w-auto lg:shrink-0 mt-4 lg:mt-0">
              <div
                className="rounded-2xl overflow-hidden shadow-lg flex-1 lg:flex-none"
                style={{ height: "auto" }}
              >
                <div className="lg:hidden w-full h-auto">
                  <img
                    src={thumbnails[activeImg]}
                    alt="Snorkeling"
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>
                <div
                  className="hidden lg:block"
                  style={{ width: "440px", height: "390px" }}
                >
                  <img
                    src={thumbnails[activeImg]}
                    alt="Snorkeling"
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>
              </div>
              <div className="flex flex-row sm:flex-col gap-1.5 md:gap-2 shrink-0">
                {thumbnails.map((src, i) => (
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
                  About Jetski
                </h2>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Nestled on the pristine shores of{" "}
                  <strong className="text-black">Isla Barú</strong>, just a
                  scenic boat ride from Cartagena's historic walls, Playa
                  Scondida offers an unparalleled eco-luxury glamping
                  experience. Here, the Caribbean Sea whispers secrets of
                  ancient mariners, while the jungle canopy shelters you in its
                  emerald embrace.
                  <br />
                  <br />
                  Our philosophy: simple, authentic luxury that honors the land.
                  Each bungalow is crafted from locally-sourced materials,
                  designed to blend seamlessly with the surrounding nature while
                  providing every modern comfort you desire. Wake to the calls
                  of tropical birds, dine on freshly-caught seafood by
                  candlelight, and fall asleep to the rhythm of gentle waves.
                  With private docks offering direct ocean access, secluded
                  beach coves, and immersive nature trails, Playa Scondida is
                  more than accommodation — it is a transformation. Here, time
                  moves differently, allowing you to reconnect with what truly
                  matters.
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
                    Isla Baru, Provincia de Cartagena, Bolívar, Colombia
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
                </div>
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
                {[
                  { icon: Mail, label: "Email", sub: "info@ecoadventura.com" },
                  { icon: Globe, label: "Website", sub: "ecoadventura.co" },
                  { icon: Phone, label: "Phone", sub: "+57 315 123 4567" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#f8f5e9] rounded-xl border border-gold-light shadow-sm p-2 md:p-3 flex flex-col items-center text-center gap-1 cursor-pointer hover:border-gold transition"
                  >
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl backdrop-blur-lg bg-amber-50 flex items-center justify-center">
                      <item.icon size={14} className="text-gold" />
                    </div>
                    <p className="font-bold text-[10px] md:text-xs text-black">
                      {item.label}
                    </p>
                    <p className="text-[9px] md:text-[10px] text-black leading-tight font-bold  break-all">
                      {item.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* Deals Slider */}
              {/* <div className="bg-[#f8f5e9] rounded-2xl border border-amber-200 shadow-sm relative overflow-hidden">
                      <div className="flex items-center justify-between px-4 md:px-5 pt-3 md:pt-4 pb-1.5">
                        <p className="font-bold text-black text-xs md:text-sm font-antigua">
                          Deals &amp; Promotions
                        </p>
                        <span className="text-xs text-amber-600 font-semibold font-antigua">
                          {dealIdx + 1}/{dealsSlides.length}
                        </span>
                      </div>
                      <div className="px-4 md:px-5 pb-3 md:pb-4 relative min-h-[100px] md:min-h-[110px]">
                        <div className="bg-white rounded-xl p-3 md:p-4 border border-amber-100 shadow-sm">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="font-bold text-black text-xs md:text-sm font-antigua">
                                {dealsSlides[dealIdx].title}
                              </p>
                              <p className="text-[10px] md:text-xs text-gray-500 mt-1 leading-relaxed">
                                {dealsSlides[dealIdx].desc}
                              </p>
                            </div>
                            <span className="bg-gold text-white text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded shrink-0">
                              {dealsSlides[dealIdx].highlight}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 md:gap-3 mt-2 md:mt-2.5 text-[9px] md:text-[10px] text-gray-400 flex-wrap">
                            <span>✓ Valid till March 15, 2025</span>
                            <span>✓ T&C apply</span>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setDealIdx(
                              (p) =>
                                (p - 1 + dealsSlides.length) % dealsSlides.length,
                            )
                          }
                          className="absolute left-1.5 md:left-2 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-amber-400 text-white flex items-center justify-center"
                        >
                          <ChevronLeft size={11} />
                        </button>
                        <button
                          onClick={() =>
                            setDealIdx((p) => (p + 1) % dealsSlides.length)
                          }
                          className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-amber-400 text-white flex items-center justify-center"
                        >
                          <ChevronRight size={11} />
                        </button>
                      </div>
                      <div className="flex justify-center gap-1.5 pb-2.5 md:pb-3">
                        {dealsSlides.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setDealIdx(i)}
                            className={`h-1.5 rounded-full transition-all ${i === dealIdx ? "bg-gold w-4" : "bg-amber-200 w-1.5"}`}
                          />
                        ))}
                      </div>
                    </div> */}

              <div className="bg-white rounded-2xl  relative ">
                <div className="flex items-center justify-between  pt-3 md:pt-4 pb-1.5">
                  <p className="font-bold text-black text-xs md:text-sm font-antigua">
                    Deals &amp; Promotions
                  </p>
                  <span className="text-xs text-gold font-semibold font-antigua">
                    {dealIdx + 1}/{dealsSlides.length}
                  </span>
                </div>
                <div className=" pb-3 md:pb-4 relative ">
                  <div className="flex flex-col relative bg-[#f8f5e9] w-full h-[130px] rounded-xl p-3 md:p-4 border border-amber-100 shadow-sm">
                    <div className="flex items-start justify-between gap-2 relative">
                      <div className="flex-1  space-y-3 mb-3">
                        <p className="font-bold text-black text-xs md:text-sm font-antigua">
                          {dealsSlides[dealIdx].title}
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-500 mt-1 leading-relaxed">
                          {dealsSlides[dealIdx].desc}
                        </p>
                      </div>
                      {/* <span className="bg-gold text-white text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded shrink-0">
                                            {dealsSlides[dealIdx].tag}
                                          </span> */}
                    </div>
                    {dealsSlides[dealIdx].tag && (
                      <Badge className="absolute top-0 right-0 border-0 bg-gradient-to-r from-gold-light to-gold overflow-hidden text-white  rounded-xl rounded-tl-none rounded-br-none  text-xs">
                        {dealsSlides[dealIdx].tag}
                      </Badge>
                    )}
                    <div className="mt-auto flex items-center justify-between text-[10px] md:text-xs ">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {dealsSlides[dealIdx].valid}
                      </div>

                      <button className="text-[#c89b2c] font-semibold flex items-center gap-2">
                        Claim Offer →
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        setDealIdx(
                          (p) =>
                            (p - 1 + dealsSlides.length) % dealsSlides.length,
                        )
                      }
                      className="absolute z-16 -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-l from-gold to-gold-light text-white flex items-center justify-center shadow"
                    >
                      <ChevronLeft size={12} />
                    </button>

                    <button
                      onClick={() =>
                        setDealIdx((p) => (p + 1) % dealsSlides.length)
                      }
                      className="absolute z-16 -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-gold to-gold-light text-white flex items-center justify-center shadow"
                    >
                      <ChevronRight size={12} />
                    </button>
                    {/* <button
                                          onClick={() =>
                                            setDealIdx(
                                              (p) =>
                                                (p - 1 + dealsSlides.length) % dealsSlides.length,
                                            )
                                          }
                                          className="absolute  md:left-2 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-l from-gold to-gold-light text-white flex items-center justify-center"
                                        >
                                          <ChevronLeft size={11} />
                                        </button>
                                        <button
                                          onClick={() =>
                                            setDealIdx((p) => (p + 1) % dealsSlides.length)
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
                  {dealsSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setDealIdx(i)}
                      className={`h-1.5 rounded-full transition-all ${i === dealIdx ? "bg-gold w-4" : "bg-gold w-1.5"}`}
                    />
                  ))}
                </div>
              </div>

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
                  {[
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
                  ].map((item, i) => (
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

      {/* LOCATION */}
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
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Club+Nautico+Cartagena+Colombia&output=embed"
            />
          </div>
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
            {[
              {
                title: "Key Features",
                items: [
                  {
                    icon: WavesIcon,
                    label: "Turquoise Beach",
                    sub: "White sand & calm waters",
                  },
                  {
                    icon: Anchor,
                    label: "Snorkeling Zone",
                    sub: "Coral reef access",
                  },
                  {
                    icon: Shell,
                    label: "Secluded Coves",
                    sub: "Private beach areas",
                  },
                ],
                hasSub: true,
              },
              {
                title: "Services",
                items: [
                  { icon: Umbrella, label: "Sunbed & umbrella rental" },
                  { icon: Fish, label: "Fresh seafood restaurant" },
                  { icon: LifeBuoy, label: "Lifeguard on duty" },
                ],
                hasSub: false,
              },
              {
                title: "Amenities",
                items: [
                  { icon: Droplets, label: "Freshwater showers" },
                  { icon: Sun, label: "Changing rooms" },
                  { icon: Umbrella, label: "Beach volleyball court" },
                  { icon: Anchor, label: "Kayak rental" },
                ],
                hasSub: false,
              },
            ].map((col, ci) => (
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
          <div className="flex items-end justify-between flex-col  w-full mb-4 md:mb-5">
            <div className="w-full">
              <p className="text-[10px] md:text-xs uppercase w-full text-center tracking-widest font-medium text-black/70 mb-0.5">
                Explore
              </p>
              <h2 className="text-xl md:text-2xl font-extrabold text-center font-antigua text-black">
                Around This Place
              </h2>
            </div>
            <div className="flex flex-1 gap-1.5 md:gap-2">
              <button className="bg-gradient-to-b from-red to-red-light text-white text-[10px] md:text-xs font-bold rounded-full px-3 md:px-4 py-1.5 md:py-2 hover:bg-red transition">
                Clear Filters
              </button>
              <button className="bg-gradient-to-r from-green to-green-light text-white text-[10px] md:text-xs font-bold rounded-full px-3 md:px-4 py-1.5 md:py-2 hover:bg-green transition">
                + Filters
              </button>
            </div>
          </div>
          <HorizontalSlider items={sliderPlaces} />
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
            {faqData.map((item, i) => (
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

      {/* ══ SECTION 7: REVIEWS ══ */}
      <div className="bg-[#fbf7ef] py-6 md:py-8 px-4 sm:px-6 md:px-10 lg:px-12">
              <div className="mx-auto max-w-[1200px]">
                {/* 3-col header */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-3 mb-5 md:mb-7">
                  {/* La Carta Team Reviews */}
                  <div className="bg-[#F7F6F2] rounded-xl p-4 md:p-5 shadow-sm border border-gold-light">
                    <p className="font-bold text-black text-sm md:text-sm text-center mb-2 md:mb-3 font-antigua">
                      La Carta Team Reviews
                    </p>
                    <div className="space-y-1.5 md:space-y-2">
                      {[
                        { label: "Price", rating: 4 },
                        { label: "Location", rating: 4 },
                        { label: "Ambiance", rating: 3 },
                        { label: "Services", rating: 4 },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-center gap-2"
                        >
                          <span className="text-[10px] text-end md:text-xs text-gray-500 w-14 md:w-16 shrink-0">
                            {item.label}
                          </span>
                          <StarRow count={item.rating} />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-center  mt-3 md:mt-4 pt-2.5  border-t-[1.5px] border-gold border-dotted">
                      <img src="/Group 1686551898.png" alt="" />
                    </div>
                  </div>
      
                  {/* Client Say's */}
                  <div className="relative rounded-xl px-6 py-6 md:px-10 md:py-8 text-center flex flex-col items-center space-y-8 border border-gold-light shadow-[inset_0_0_15px_rgba(209,187,107,0.5)] bg-gradient-to-b from-[#F7F6F2] to-[#EFEDE7]">
                    {/* Reviews Label */}
                    <p className="uppercase tracking-[0.35em] text-gray-600 text-xs md:text-sm ">
                      Feedback
                    </p>
                    <h3 className="font-antigua text-2xl md:text-4xl text-gray-900 mb-6">
                      Client Say's
                    </h3>
                    <div className="flex items-center gap-2 justify-center">
                      <p className="text-lg md:text-lg flex font-bold text-gray-800 ">
                        <Star className="w-6 h-6 fill-gold-light text-gold" />
                        4.8 OUT OF 5 — BASED ON 124 REVIEWS
                      </p>
                    </div>
                  </div>
      
                  {/* Rating Breakdown */}
                  <div
                    className="rounded-xl  px-4 py-4 md:px-5 md:py-5
                               border border-gold-light
                               bg-[#F7F6F2]
                               shadow-[0_12px_40px_rgba(0,0,0,0.06)]
                               flex flex-col gap-2"
                  >
                    <div className="flex flex-col lg:flex-row min-[1024px]:max-[1178px]:flex-col items-start gap-2 ">
                      {/* LEFT SIDE */}
                      <div className="flex flex-col gap-1 items-center  text-center  w-full md:min-w-xl">
                        <p className="text-6xl md:text-5xl font-antigua text-gold leading-none">
                          5.5
                        </p>
      
                        <p className="text-gray-600 text-sm ">66 Ratings</p>
      
                        <div className="flex items-center gap-2 text-gray-700 text-base">
                          <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-3 h-3"
                          />
                          <span className="font-medium text-xs">On Google</span>
                        </div>
      
                        <div className="text-sm text-gray-700">
                          <span className="text-gold font-bold">3.5 ★</span>
                          <span className="text-gray-500"> (100+)</span>
                        </div>
      
                        <p className="text-[8px] text-gray-500">*As Of 2026-02-12</p>
                      </div>
      
                      {/* RIGHT SIDE */}
                      <div className="flex-1 space-y-1 w-full">
                        {categories.map((item, i) => {
                          const percentage = (item.rating / MAX_RATING) * 100;
      
                          return (
                            // <div key={i} className="flex items-center gap-2 justify-center ">
                            <div key={i} className="flex items-center gap-2 w-full">
                              {/* Label */}
                              <div className="w-28 flex shrink-0 justify-end items-center gap-1 text-gold text-sm">
                                <span>{item.label}</span>
                                <span>★</span>
                              </div>
      
                              {/* Bar */}
                              <div className="flex-1 min-w-[120px] h-2 rounded-full bg-gray-300/70 overflow-hidden">
                                <div
                                  className="h-full w-full rounded-full bg-gradient-to-r from-gold to-gold-light transition-all duration-500"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
      
                    {/* BUTTON */}
                    <Button
                      className="w-full mt-4
                                 bg-gradient-to-r from-[#28B463] to-[#196F3D]
                                 text-white font-antigua md:text-lg text-sm
                                 py-5 rounded-full
                                 shadow-lg
                                 hover:scale-[1.02] transition duration-300"
                    >
                      ✎ Give Your Opinion
                    </Button>
                  </div>
                </div>
              </div>
            </div>

      {/* Filter row */}
      <div className="bg-[#fbf7ef] py-8 md:py-12 px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="mx-auto max-w-[950px]">
          {/* Filter row */}
          <div className="flex items-center justify-between mb-8">
            <button className="bg-gradient-to-b from-gold to-gold-light text-white text-xs uppercase font-bold rounded-full px-6 py-2 flex items-center gap-2">
              Trier
              <span className="text-[10px]">▼</span>
            </button>

            <p className="text-xs tracking-wide text-gray-800">
              PAGE <span className="font-bold">1</span> OF{" "}
              <span className="font-bold">3 – 42</span> REVIEWS
            </p>
          </div>

          {/* Review Cards */}
          <div className="space-y-6">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-antigua sm:text-xl text-lg text-black">
                      {r.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{r.location}</p>
                  </div>

                  <StarRow count={r.rating} />
                </div>

                {/* Review Text */}
                <p className="text-sm font-medium text-gray-800 leading-relaxed">
                  {r.text}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={r.avatar}
                      alt=""
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <span className="text-xs text-gray-800">{r.location}</span>
                  </div>

                  <button className="border border-red-light text-red-light text-xs font-medium rounded-full px-5 py-1.5 hover:bg-red-50 transition">
                    Response
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
          <Horizontal2Slider items={sliderPlaces} />
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
