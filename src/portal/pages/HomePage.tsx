// import React from "react";
// import logo from "/assets/Logo.png.png";
// import img1 from "/assets/img1.png";
// import whatsapp from "/assets/whatsapp.svg";
// import img2 from "/assets/img2.png";
// import img3 from "/assets/img33.png";
// import img4 from "/assets/4.png";
// import img5 from "/assets/img5.png";
// import img6 from "/assets/img6.png";
// import carpic from "/assets/BOOKGROUP.png";
// import girlpic from "/assets/girl.png";
// import beachpic from "/assets/beach.png";
// import shippic from "/assets/ship.png";
// import artpic from "/assets/art.png";
// import resturantpic from "/assets/resturant.png";
// import hotelpic from "/assets/hotels.png";
// import hotel1 from "/assets/hotel2.png";
// import sqImage from "/assets/ChatGPT Image Mar 6, 2026, 03_01_45 AM.png";

// import Card from "@public/components/card/Card";
// import CircleCard from "@public/components/card/CircularCard";

// import { Button } from "@public/components/ui/button";
// import { Link } from "react-router-dom";
// import {
//   Heart,
//   Headset,
//   Share2,
//   MessageCircleMore,
//   MessageCircle,
//   FileSpreadsheet,
//   Plus,
//   Music,
//   CircleArrowRight,
//   Facebook,
//   Twitter,
//   Instagram,
//   Youtube,
//   Linkedin,
// } from "lucide-react";
// import HowToDoCartagena from "@public/components/HowToCartagena";
// import TopNewsCartagena from "@public/components/TopNewsCartagena.tsx";
// import ConciergeCTA from "@public/components/ConciergeCTA";
// import Pizza from "@public/components/Pizza";

// // Category Color Map to replace c1, c2, c3 etc.
// const catColors = {
//   green: "bg-[#20bb59]",
//   gold: "bg-[#d0a439]",
//   yellow: "bg-[#fed358]",
//   purple: "bg-[#ca77e7]",
//   teal: "bg-[#5bc7c1]",
//   red: "bg-[#f52929]",
// };

// const tagRoutes: Record<string, string> = {
//   Beaches: "/Beaches",
//   Accommodations: "/hotels",
//   Boating: "/Boating",
//   "Real Estate": "/real-estate",
//   Activities: "/Activities",
//   Gastronomy: "/Gastronomy",
// };

// const HomePage = () => {
//   return (
//     <div className="min-h-screen font-sans">
//       {/* Hero Section */}
//       <div
//         className="relative bg-cover bg-center py-24 md:py-40"
//         style={{ backgroundImage: `url('/assets/Hero.png')` }}
//       >
//         <div className="absolute inset-0 bg-black/30"></div>
//         <div className="relative z-10 container mx-auto text-center text-white">
//           {/* <div className="inline absolute w-fit z-9 top-4 left-10">
//             <div className="bg-[#f15c5d] w-fit rounded-full">
//               <Share2
//                 size={60}
//                 className="p-3 text-white font-bold bg-red-400 mb-6 fill-white"
//               />
//             </div>
//             <div className="bg-yellow-400 w-fit rounded-full">
//               <Heart size={60} className="p-3 text-black font-bold " />
//             </div>
//           </div> */}
//           {/* <div className="inline fixed z-[999] top-44 left-10">
//             <div className="bg-[#f15c5d] rounded-full">
//               <Share2
//                 size={60}
//                 className="p-3 text-white font-bold bg-red-400 mb-6 fill-white"
//               />
//             </div>
//             <div className="bg-yellow-400 rounded-full">
//               <Heart size={60} className="p-3 text-black font-bold " />
//             </div>
//           </div> */}

//           {/* <div className="fixed bottom-6 right-6 z-[999] flex items-center gap-2">
//             <div>
//               <span className="bg-white text-black font-bold px-3 py-1 rounded shadow text-sm hidden md:block">
//                 Need help? Chat with us
//               </span>
//             </div>
//             <div>
//               <a
//                 href="https://wa.me/+111111111111"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="
//                   w-14 h-14
//                   flex items-center justify-center
//                   rounded-full shadow-lg
//                   bg-green-600 hover:scale-105 transition
//                 "
//               >
//                 <img src={whatsapp} alt="WhatsApp" className="w-10 h-10" />
//               </a>
//             </div>
//           </div> */}

//           <h1
//             className="
//               font-moonscape
//               text-white
//               uppercase
//               font-medium
//               tracking-[0.08em]
//               leading-[0.92]
//               text-[52px]
//               sm:text-[72px]
//               md:text-[96px]
//               lg:text-[100px]
//               mb-[100px]
//               drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]

//           "
//           >
//             EVERYTHING <br /> CARTAGENA
//           </h1>

//           <div className="max-w-3xl p-0 m-auto">
//             <div className="w-full mb-2">
//               <nav className="lg:grid grid-cols-6 hidden flex-wrap justify-center gap-1">
//                 {[
//                   "Activities",
//                   "Accommodations",
//                   "Beaches",
//                   "Boating",
//                   "Real Estate",
//                   "Gastronomy",
//                 ].map((tag) => (
//                   <Button className="bg-white text-black font-bold shadow-xl rounded hover:bg-gray-200">
//                     <Link key={tag} href={tagRoutes[tag]}>
//                       {tag}
//                     </Link>
//                   </Button>
//                 ))}
//               </nav>
//             </div>

//             <div className="flex flex-col gap-4">
//               <div className="flex bg-white rounded overflow-hidden p-1">
//                 <input
//                   className="flex-grow p-2 bg-white text-black placeholder:px-3"
//                   type="text"
//                   placeholder="Search for Anything"
//                 />
//                 <Button className="text-white hidden sm:block w-[250px] my-auto rounded px-6 py-2 font-bold bg-[#d0a439] hover:bg-[#b88f30]  transition-colors">
//                   Search
//                 </Button>
//               </div>
//               <Button className="text-white sm:hidden w-full my-auto rounded px-6 py-2 font-bold bg-[#d0a439] hover:bg-[#b88f30]  transition-colors">
//                 Search
//               </Button>
//             </div>
//           </div>

//           {/* <div>

//           </div> */}
//         </div>
//       </div>

//       {/* Section Title */}
//       <div className="pt-20 px-10 md:px-16 text-center">
//         <h2 className="text-3xl md:text-4xl font-black font-antigua text-black text-center uppercase mb-16">
//           What to do in Cartagena, Colombia
//         </h2>
//       </div>

//       {/* Category Grid */}
//       <div className="container mx-auto pb-20 px-10 md:px-16">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[
//             {
//               label: "Hotels",
//               img: img1,
//               color: "bg-gradient-to-r from-gold to-gold-light",
//               href: "/hotels",
//             },
//             {
//               label: "Beaches",
//               img: img2,
//               color: "bg-gradient-to-l from-green-light to-green",
//               href: "/Beaches",
//             },
//             {
//               label: "Activities",
//               img: img3,
//               color: "bg-gradient-to-b from-red to-red-light",
//               href: "/Activities",
//             },
//             {
//               label: "Tours & Sightseeing",
//               img: img4,
//               color: "bg-gradient-to-r from-gold to-gold-light",
//               href: "/real-estate",
//             },
//             {
//               label: "Boat Rentals",
//               img: img5,
//               color: "bg-gradient-to-l from-green-light to-green",
//               href: "/Boating",
//             },
//             {
//               label: "Gastronomy",
//               img: img6,
//               color: "bg-gradient-to-b from-red to-red-light",
//               href: "/Gastronomy",
//             },
//           ].map((item, idx) => (
//             <Link
//               key={idx}
//               to={item.href}
//               className="relative group overflow-hidden cursor-pointer"
//             >
//               <div
//                 className={`absolute top-0 left-0 w-full p-2 text-white font-bold text-lg text-center  ${item.color}`}
//               >
//                 {item.label}
//               </div>
//               <img
//                 src={item.img}
//                 className="w-full h-110 object-cover transition-transform duration-500 "
//                 alt={item.label}
//               />
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Masonry-style Section */}
//       {/* <section className="py-12 px-10 md:px-16 bg-gray-50"> */}
//       {/* ══ THE BEST OF SECTION TITLE ══ */}
//       <div className="text-center px-4 mb-4 mt-6 sm:mt-10">
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-antigua text-black text-center uppercase mb-8 sm:mb-12 md:mb-16">
//           The best of Cartagena, Colombia
//         </h2>
//       </div>

//       {/* ══ MASONRY GRID SECTION ══ */}
//       <section className="container mb-8 mx-auto pb-10 px-4 sm:px-8 md:px-10 lg:px-16">
//         {/* Mobile: single column stack */}
//         {/* <div className="flex flex-col gap-4 lg:hidden">
//           <Card image={beachpic} category="BEACHES" title="Best Beaches of Cartagena" author="Miguel" time="17 min" className="w-full" />
//           <Card image={resturantpic} category="Gastronomy" title="The Best Restaurants of Cartagena." author="May" time="10 min" className="w-full" />
//           <Card image={shippic} category="ACTIVITIES" title="What to do in Cartagena" author="Maria" time="10 min" className="w-full" />
//           <Card image={girlpic} category="Fashion" title="The Best Shopping in Cartagena" author="Alejandra" time="7 min" className="w-full" />
//           <Card image={hotel1} category="HOTELS" title="Top Hotels of Cartagena" author="Natalia" time="21 min" className="w-full" />
//           <Card image={artpic} category="Art" title="The Best Street Art of Cartagena" author="Juan Pablo" time="5 min" className="w-full" />
//         </div> */}

//         {/* Desktop: masonry grid */}
//         {/* <div className=" md:grid grid-cols-3 gap-6 auto-rows-[260px]"> */}
//         <div
//           className="hidden sm:grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-6 md:auto-rows-[260px] auto-rows-[120px]     /* mobile row height */
//     sm:auto-rows-[150px]  /* tablet */
//     md:auto-rows-[260px]  /* desktop */"
//         >
//           {/* <div className="block sm:hidden"> */}
//           <Card
//             image={beachpic}
//             category="BEACHES"
//             title="Best Beaches of Cartagena"
//             author="Miguel"
//             time="17 min"
//             className="row-span-3 sm:row-span-2"
//           />
//           <Card
//             image={resturantpic}
//             category="Gastronomy"
//             title="The Best Restaurants of Cartagena."
//             author="May"
//             time="10 min"
//             className="row-span-2 sm:row-span-1"
//           />
//           <Card
//             image={shippic}
//             category="ACTIVITIES"
//             title="What to do in Cartagena"
//             author="Maria"
//             time="10 min"
//             className="row-span-3 sm:row-span-2"
//           />
//           <Card
//             image={girlpic}
//             category="Fashion"
//             title="The Best Shopping in Cartagena"
//             author="Alejandra"
//             time="7 min"
//             className="row-span-4 sm:row-span-3 z-10"
//           />
//           <CircleCard
//             image={hotelpic}
//             category="HOTELS"
//             title="Top Hotels of Cartagena"
//             author="Natalia"
//             time="21 min"
//             className=""
//           />
//           <Card
//             image={artpic}
//             category="Art"
//             title="The Best Street Art of Cartagena"
//             author="Juan Pablo"
//             time="5 min"
//             className="mt-5  row-span-2 sm:row-span-1"
//           />
//         </div>
//         <div
//           className=" sm:hidden grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-6 md:auto-rows-[260px] auto-rows-[120px]     /* mobile row height */
//     sm:auto-rows-[150px]  /* tablet */
//     md:auto-rows-[260px]  /* desktop */"
//         >
//           <Card
//             image={beachpic}
//             category="BEACHES"
//             title="Best Beaches of Cartagena"
//             author="Miguel"
//             time="17 min"
//             className="row-span-2 sm:row-span-1"
//           />
//           <Card
//             image={resturantpic}
//             category="Gastronomy"
//             title="The Best Restaurants of Cartagena."
//             author="May"
//             time="10 min"
//             className="row-span-1 sm:row-span-1"
//           />
//           <Card
//             image={girlpic}
//             category="Fashion"
//             title="The Best Shopping in Cartagena"
//             author="Alejandra"
//             time="7 min"
//             className="row-span-3 sm:row-span-2 z-10 "
//           />
//           <Card
//           image={sqImage}
//           category="HOTELS"
//             title="Top Hotels of Cartagena"
//             author="Natalia"
//             time="21 min"
//             className="row-span-1 sm:row-span-1"
//           />
//           {/* <CircleCard
//             image={hotelpic}
//             category="HOTELS"
//             title="Top Hotels of Cartagena"
//             author="Natalia"
//             time="21 min"
//             className=""
//           /> */}
//           <Card
//             image={shippic}
//             category="ACTIVITIES"
//             title="What to do in Cartagena"
//             author="Maria"
//             time="10 min"
//             className="row-span-2 sm:row-span-1"
//           />
//           <Card
//             image={artpic}
//             category="Art"
//             title="The Best Street Art of Cartagena"
//             author="Juan Pablo"
//             time="5 min"
//             className=" row-span-1 sm:row-span-2"
//           />
//         </div>
//         {/* </div> */}
//       </section>
//       {/* <div className="text-center mb-7 mt-10">
//         <h2 className="text-3xl md:text-4xl font-black font-antigua text-black text-center uppercase mb-16">
//           The best of Cartagena, Colombia
//         </h2>
//       </div>

//       <section className="container mb-5 mx-auto pb-13 px-10 md:px-16">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[260px]">
//           <Card
//             image={beachpic}
//             category="BEACHES"
//             title="Best Beaches of Cartagena"
//             author="Miguel"
//             time="17 min"
//             className="row-span-2"
//           />

//           <Card
//             image={resturantpic}
//             category="Gastronomy"
//             title="The Best Restaurants of Cartagena."
//             author="May"
//             time="10 min"
//             className="row-span-1"
//           />

//           <Card
//             image={shippic}
//             category="ACTIVITIES"
//             title="What to do in Cartagena"
//             author="Maria"
//             time="10 min"
//             className="row-span-2"
//           />

//           <Card
//             image={girlpic}
//             category="Fashion"
//             title="The Best Shopping in Cartagena"
//             author="Alejandra"
//             time="7 min"
//             className="row-span-2 sm:row-span-3 z-10"
//           />

//           <CircleCard
//             image={hotelpic}
//             category="HOTELS"
//             title="Top Hotels of Cartagena"
//             author="Natalia"
//             time="21 min"
//             className="rounded-full  sm:block hidden"
//           />
//           <Card
//             image={hotel1}
//             category="HOTELS"
//             title="Top Hotels of Cartagena"
//             author="Natalia"
//             time="21 min"
//             className="row-span-1 rounded-full sm:hidden block"
//           />

//           <Card
//             image={artpic}
//             category="Art"
//             title="The Best Street Art of Cartagena"
//             author="Juan Pablo"
//             time="5 min"
//             className="mt-5 z-10"
//           />
//         </div>
//       </section> */}
//       {/* </section> */}

//       {/* Newsletter Promo (Desktop) */}
//       <div className="md:py-24 py-12  relative bg-[url('/Rectangle.png')] md:-mt-24">
//         {/* Decorative background waves (optional SVG or image) */}

//         <div className="container mx-auto  relative z-10">
//           <div className="md:grid md:grid-cols-2 md:px-16 px-10 flex flex-col items-center md:gap-16 gap-1">
//             {/* LEFT CONTENT */}
//             <div className="md:max-w-xl w-[130%]">
//               <h2 className="text-xl md:text-5xl font-antigua leading-tight font-semibold uppercase mb-6 text-black">
//                 How to thrive in Cartagena, Colombia like a local.
//               </h2>

//               <p className="md:text-lg text-sm text-black mb-8 leading-relaxed">
//                 Hidden Gems, Staying Safe, Maneuvering Around The City, Watching
//                 Out For Scams, Negotiating, What To Pack. The Ultimate Guide For
//                 Gringos.
//               </p>

//               <Button className="px-6 py-3 md:block hidden text-white w-full font-bold rounded bg-gradient-to-r from-[#3BCF8E] via-[#2EB872] to-[#1E9E5A] hover:brightness-110 transition">
//                 <a href="https://lacarta.co/cartagena/resources/">resources</a>
//               </Button>
//             </div>

//             {/* RIGHT IMAGE STACK */}
//             <div className="relative md:flex md:justify-center">
//               <img
//                 src={carpic}
//                 alt="Cartagena Travel Guide"
//                 className="md:w-[400px] w-[200px] md:h-[500px] h-[300px] relative z-20"
//               />
//               <Button className="px-6 py-3 md:hidden block  text-white w-full font-bold rounded bg-gradient-to-r from-[#3BCF8E] via-[#2EB872] to-[#1E9E5A] hover:brightness-110 transition">
//                 <a href="https://lacarta.co/cartagena/resources/">resources</a>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tools Section */}
//       <div className="container mb-24 mx-auto pb-13 px-10 md:px-16 mt-12">
//         <h2 className="text-3xl md:text-4xl font-black text-black font-antigua text-center capitalize mb-16">
//           Free tools for your Cartagena journey
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-5">
//           {[
//             {
//               icon: (
//                 <span className="w-10 h-10 p-2 rounded-full bg-gradient-to-r from-gold  to-gold-light">
//                   <Headset className="w-6 h-6" />
//                 </span>
//               ),
//               label: "Tourist Service Center",
//               color: "bg-gradient-to-r from-gold  to-gold-light",
//               paragraph:
//                 "If you ever need any help during your time in Cartagena!",
//               buttonTxt: "GO",
//             },
//             {
//               icon: (
//                 <span className="w-10 h-10 p-2 rounded-full bg-gradient-to-r from-green to-green-light">
//                   <MessageCircleMore className="w-6 h-6" />
//                 </span>
//               ),
//               label: "Catagena FAQs",
//               color: "bg-gradient-to-r from-green to-green-light",
//               paragraph: "Cartagena's Most Frequently Asked Questions",
//               buttonTxt: "Download",
//             },
//             {
//               icon: (
//                 <span className="w-10 h-10 p-2 rounded-full bg-gradient-to-r from-red to-red-light">
//                   <FileSpreadsheet className="w-6 h-6" />
//                 </span>
//               ),
//               label: "Cartagena Travel Checklists",
//               color: "bg-gradient-to-r from-red to-red-light",
//               paragraph:
//                 "Everything you must do before boarding your flight to Cartagena, Colombia!",
//               buttonTxt: "Checkoff",
//             },
//             {
//               icon: (
//                 <span className="w-10 h-10 p-2 rounded-full bg-gradient-to-r from-gold  to-gold-light">
//                   <Plus className="w-6 h-6" />
//                 </span>
//               ),
//               label: "Cartagena Emergency Guides",
//               color: "bg-gradient-to-r from-gold  to-gold-light",
//               paragraph:
//                 "Save our Emergency Guide with you at all times for all the police stations, hospitals, and medical services!",
//               buttonTxt: "Download",
//             },
//             {
//               icon: (
//                 <span className="w-10 h-10 p-2 rounded-full bg-gradient-to-r from-green to-green-light">
//                   <Music className="w-6 h-6" />
//                 </span>
//               ),
//               label: "Cartagena Spotify Playlists",
//               color: "bg-gradient-to-r from-green to-green-light",
//               paragraph:
//                 "Enhance your Cartagena trip by immersing yourself to the Cartagena Carribean beats!",
//               buttonTxt: "Download",
//             },
//           ].map((tool, i) => (
//             <div
//               key={i}
//               className="mt-8 md:mt-5 rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.15)] pt-10 pb-3 px-3 lg:pt-9 lg:pb-4 lg:px-5  relative text-start
//              flex flex-col h-auto space-y-2"
//             >
//               <div
//                 className={`absolute -top-8 left-1/2  -translate-x-1/2
//               w-14 h-14 flex items-center p-2  justify-center
//               rounded-full text-white bg-white shadow-[0_-8px_10px_0_rgba(0,0,0,0.15)] `}
//               >
//                 {tool.icon}
//               </div>
//               <div className="inline text-black font-bold absolute top-3 right-3 lg:top-3  lg:right-5">
//                 <Heart size={25} />
//               </div>

//               {/* <div className="px-2">/ */}
//               <h5 className="font-extrabold text-black">{tool.label}</h5>
//               <p className="text-xs font-normal pt-1 leading-relaxed text-gray-500 flex-grow  pb-5">
//                 {tool.paragraph}
//               </p>
//               <Button
//                 variant="default"
//                 className={`w-full rounded text-white bg-gradient-to-r hover:brightness-110 ${tool.color}`}
//               >
//                 {tool.buttonTxt}
//               </Button>
//             </div>
//           ))}
//         </div>
//       </div>

//       <ConciergeCTA />

//       <HowToDoCartagena />

//       <Pizza />

//       {/* Carasole Section */}
//       <TopNewsCartagena />

//       {/* Search Section */}
//     </div>
//   );
// };

// export default HomePage;

import React from "react";
const logo = "/assets/Logo.png.png";
const img1 = "/assets/img1.png";
const whatsapp = "/assets/whatsapp.svg";
const img2 = "/assets/img2.png";
const img3 = "/assets/img33.png";
const img4 = "/assets/4.png";
const img5 = "/assets/img5.png";
const img6 = "/assets/img6.png";
const carpic = "/assets/BOOKGROUP.png";
const girlpic = "/assets/girl.png";
const beachpic = "/assets/beach.png";
const shippic = "/assets/ship.png";
const artpic = "/assets/art.png";
const resturantpic = "/assets/resturant.png";
const hotelpic = "/assets/hotels.png";
const hotel1 = "/assets/hotel2.png";
const sqImage = "/assets/ChatGPT Image Mar 6, 2026, 03_01_45 AM.png";

import Card from "@public/components/card/Card";
import CircleCard from "@public/components/card/CircularCard";

import { Button } from "@public/components/ui/button";
import Link from "next/link";
import {
  Heart,
  Headset,
  Share2,
  MessageCircleMore,
  MessageCircle,
  FileSpreadsheet,
  Plus,
  Music,
  CircleArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import HowToDoCartagena from "@public/components/HowToCartagena";
import TopNewsCartagena from "@public/components/TopNewsCartagena.tsx";
import ConciergeCTA from "@public/components/ConciergeCTA";
import Pizza from "@public/components/Pizza";

// Category Color Map to replace c1, c2, c3 etc.
const catColors = {
  green: "bg-[#20bb59]",
  gold: "bg-[#d0a439]",
  yellow: "bg-[#fed358]",
  purple: "bg-[#ca77e7]",
  teal: "bg-[#5bc7c1]",
  red: "bg-[#f52929]",
};

const tagRoutes: Record<string, string> = {
  Beaches: "/Beaches",
  Accommodations: "/hotels",
  Boating: "/Boating",
  "Real Estate": "/real-estate",
  Activities: "/Activities",
  Gastronomy: "/Gastronomy",
};

const HomePage = () => {
  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center py-24 md:py-40"
        style={{ backgroundImage: `url('/assets/Hero.png')` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 container mx-auto text-center text-white">
          {/* <div className="inline absolute w-fit z-9 top-4 left-10">
            <div className="bg-[#f15c5d] w-fit rounded-full">
              <Share2
                size={60}
                className="p-3 text-white font-bold bg-red-400 mb-6 fill-white"
              />
            </div>
            <div className="bg-yellow-400 w-fit rounded-full">
              <Heart size={60} className="p-3 text-black font-bold " />
            </div>
          </div> */}
          {/* <div className="inline fixed z-[999] top-44 left-10">
            <div className="bg-[#f15c5d] rounded-full">
              <Share2
                size={60}
                className="p-3 text-white font-bold bg-red-400 mb-6 fill-white"
              />
            </div>
            <div className="bg-yellow-400 rounded-full">
              <Heart size={60} className="p-3 text-black font-bold " />
            </div>
          </div> */}

          {/* <div className="fixed bottom-6 right-6 z-[999] flex items-center gap-2">
            <div>
              <span className="bg-white text-black font-bold px-3 py-1 rounded shadow text-sm hidden md:block">
                Need help? Chat with us
              </span>
            </div>
            <div>
              <a
                href="https://wa.me/+111111111111"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-14 h-14
                  flex items-center justify-center
                  rounded-full shadow-lg
                  bg-green-600 hover:scale-105 transition
                "
              >
                <img src={whatsapp} alt="WhatsApp" className="w-10 h-10" />
              </a>
            </div>
          </div> */}

          <h1
            className="
              font-moonscape
              text-white
              uppercase
              font-medium
              tracking-[0.08em]
              leading-[0.92]
              text-[68px]
              sm:text-[96px]
              md:text-[128px]
              lg:text-[148px]
              mb-[100px]
              drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]
          
          "
          >
            EVERYTHING <br /> CARTAGENA
          </h1>

          <div className="max-w-3xl p-0 m-auto">
            <div className="w-full mb-2">
              <nav className="lg:grid grid-cols-6 hidden flex-wrap justify-center gap-1">
                {[
                  "Activities",
                  "Accommodations",
                  "Beaches",
                  "Boating",
                  "Real Estate",
                  "Gastronomy",
                ].map((tag) => (
                  <Button key={tag} className="bg-white text-black font-bold shadow-xl rounded hover:bg-gray-200">
                    <Link href={tagRoutes[tag]}>
                      {tag}
                    </Link>
                  </Button>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex bg-white rounded overflow-hidden p-1">
                <input
                  className="flex-grow p-2 bg-white text-black placeholder:px-3"
                  type="text"
                  placeholder="Search for Anything"
                />
                <Button className="text-white hidden sm:block w-[250px] my-auto rounded px-6 py-2 font-bold bg-[#d0a439] hover:bg-[#b88f30]  transition-colors">
                  Search
                </Button>
              </div>
              <Button className="text-white sm:hidden w-full my-auto rounded px-6 py-2 font-bold bg-[#d0a439] hover:bg-[#b88f30]  transition-colors">
                Search
              </Button>
            </div>
          </div>

          {/* <div>
          
          </div> */}
        </div>
      </div>

      {/* Section Title */}
      <div className="pt-20 px-10 md:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-black font-antigua text-black text-center uppercase mb-16">
          What to do in Cartagena, Colombia
        </h2>
      </div>

      {/* Category Grid */}
      <div className="container mx-auto pb-20 px-10 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: "Hotels",
              img: img1,
              color: "bg-gradient-to-r from-gold to-gold-light",
              href: "/hotels",
            },
            {
              label: "Beaches",
              img: img2,
              color: "bg-gradient-to-l from-green-light to-green",
              href: "/Beaches",
            },
            {
              label: "Activities",
              img: img3,
              color: "bg-gradient-to-b from-red to-red-light",
              href: "/Activities",
            },
            {
              label: "Tours & Sightseeing",
              img: img4,
              color: "bg-gradient-to-r from-gold to-gold-light",
              href: "/real-estate",
            },
            {
              label: "Boat Rentals",
              img: img5,
              color: "bg-gradient-to-l from-green-light to-green",
              href: "/Boating",
            },
            {
              label: "Gastronomy",
              img: img6,
              color: "bg-gradient-to-b from-red to-red-light",
              href: "/Gastronomy",
            },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="relative group overflow-hidden cursor-pointer"
            >
              <div
                className={`absolute top-0 left-0 w-full p-2 text-white font-bold text-lg text-center  ${item.color}`}
              >
                {item.label}
              </div>
              <img
                src={item.img}
                className="w-full h-110 object-cover transition-transform duration-500 "
                alt={item.label}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Masonry-style Section */}
      {/* <section className="py-12 px-10 md:px-16 bg-gray-50"> */}
      {/* ══ THE BEST OF SECTION TITLE ══ */}
      <div className="text-center px-4 mb-4 mt-6 sm:mt-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-antigua text-black text-center uppercase mb-8 sm:mb-12 md:mb-16">
          The best of Cartagena, Colombia
        </h2>
      </div>

      {/* ══ MASONRY GRID SECTION ══ */}
      <section className="container mb-8 mx-auto pb-10 px-4 sm:px-8 md:px-10 lg:px-16">
        {/* Mobile: single column stack */}
        {/* <div className="flex flex-col gap-4 lg:hidden">
          <Card image={beachpic} category="BEACHES" title="Best Beaches of Cartagena" author="Miguel" time="17 min" className="w-full" />
          <Card image={resturantpic} category="Gastronomy" title="The Best Restaurants of Cartagena." author="May" time="10 min" className="w-full" />
          <Card image={shippic} category="ACTIVITIES" title="What to do in Cartagena" author="Maria" time="10 min" className="w-full" />
          <Card image={girlpic} category="Fashion" title="The Best Shopping in Cartagena" author="Alejandra" time="7 min" className="w-full" />
          <Card image={hotel1} category="HOTELS" title="Top Hotels of Cartagena" author="Natalia" time="21 min" className="w-full" />
          <Card image={artpic} category="Art" title="The Best Street Art of Cartagena" author="Juan Pablo" time="5 min" className="w-full" />
        </div> */}

        {/* Desktop: masonry grid */}
        {/* <div className=" md:grid grid-cols-3 gap-6 auto-rows-[260px]"> */}
        <div
          className="hidden sm:grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-6 md:auto-rows-[260px] auto-rows-[120px]     /* mobile row height */
    sm:auto-rows-[150px]  /* tablet */
    md:auto-rows-[260px]  /* desktop */"
        >
          {/* <div className="block sm:hidden"> */}
          <Card
            image={beachpic}
            category="BEACHES"
            title="Best Beaches of Cartagena"
            author="Miguel"
            time="17 min"
            className="row-span-3 sm:row-span-2"
          />
          <Card
            image={resturantpic}
            category="Gastronomy"
            title="The Best Restaurants of Cartagena."
            author="May"
            time="10 min"
            className="row-span-2 sm:row-span-1"
          />
          <Card
            image={shippic}
            category="ACTIVITIES"
            title="What to do in Cartagena"
            author="Maria"
            time="10 min"
            className="row-span-3 sm:row-span-2"
          />
          <Card
            image={girlpic}
            category="Fashion"
            title="The Best Shopping in Cartagena"
            author="Alejandra"
            time="7 min"
            className="row-span-4 sm:row-span-3 z-10 "
          />
          <CircleCard
            image={hotelpic}
            category="HOTELS"
            title="Top Hotels of Cartagena"
            author="Natalia"
            time="21 min"
            className="hidden md:block"
          />
          <Card
            image={sqImage}
            category="HOTELS"
            title="Top Hotels of Cartagena"
            author="Natalia"
            time="21 min"
            className="sm:block md:hidden hidden"
          />
          <Card
            image={artpic}
            category="Art"
            title="The Best Street Art of Cartagena"
            author="Juan Pablo"
            time="5 min"
            className="lg:mt-5  row-span-2 sm:row-span-1"
          />
        </div>
        <div
          className=" sm:hidden grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-6 md:auto-rows-[260px] auto-rows-[120px]     /* mobile row height */
    sm:auto-rows-[150px]  /* tablet */
    md:auto-rows-[260px]  /* desktop */"
        >
          <Card
            image={beachpic}
            category="BEACHES"
            title="Best Beaches of Cartagena"
            author="Miguel"
            time="17 min"
            className="row-span-2 sm:row-span-1"
          />
          <Card
            image={resturantpic}
            category="Gastronomy"
            title="The Best Restaurants of Cartagena."
            author="May"
            time="10 min"
            className="row-span-1 sm:row-span-1"
          />
          <Card
            image={girlpic}
            category="Fashion"
            title="The Best Shopping in Cartagena"
            author="Alejandra"
            time="7 min"
            className="row-span-3 sm:row-span-2 z-10 "
          />
          <Card
            image={sqImage}
            category="HOTELS"
            title="Top Hotels of Cartagena"
            author="Natalia"
            time="21 min"
            className="row-span-1 sm:row-span-1"
          />
          {/* <CircleCard
            image={hotelpic}
            category="HOTELS"
            title="Top Hotels of Cartagena"
            author="Natalia"
            time="21 min"
            className=""
          /> */}
          <Card
            image={shippic}
            category="ACTIVITIES"
            title="What to do in Cartagena"
            author="Maria"
            time="10 min"
            className="row-span-2 sm:row-span-1"
          />
          <Card
            image={artpic}
            category="Art"
            title="The Best Street Art of Cartagena"
            author="Juan Pablo"
            time="5 min"
            className=" row-span-1 sm:row-span-2"
          />
        </div>
        {/* </div> */}
      </section>
      {/* <div className="text-center mb-7 mt-10">
        <h2 className="text-3xl md:text-4xl font-black font-antigua text-black text-center uppercase mb-16">
          The best of Cartagena, Colombia
        </h2>
      </div>

      <section className="container mb-5 mx-auto pb-13 px-10 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[260px]">
          <Card
            image={beachpic}
            category="BEACHES"
            title="Best Beaches of Cartagena"
            author="Miguel"
            time="17 min"
            className="row-span-2"
          />

          <Card
            image={resturantpic}
            category="Gastronomy"
            title="The Best Restaurants of Cartagena."
            author="May"
            time="10 min"
            className="row-span-1"
          />

          <Card
            image={shippic}
            category="ACTIVITIES"
            title="What to do in Cartagena"
            author="Maria"
            time="10 min"
            className="row-span-2"
          />

          <Card
            image={girlpic}
            category="Fashion"
            title="The Best Shopping in Cartagena"
            author="Alejandra"
            time="7 min"
            className="row-span-2 sm:row-span-3 z-10"
          />

          <CircleCard
            image={hotelpic}
            category="HOTELS"
            title="Top Hotels of Cartagena"
            author="Natalia"
            time="21 min"
            className="rounded-full  sm:block hidden"
          />
          <Card
            image={hotel1}
            category="HOTELS"
            title="Top Hotels of Cartagena"
            author="Natalia"
            time="21 min"
            className="row-span-1 rounded-full sm:hidden block"
          />

          <Card
            image={artpic}
            category="Art"
            title="The Best Street Art of Cartagena"
            author="Juan Pablo"
            time="5 min"
            className="mt-5 z-10"
          />
        </div>
      </section> */}
      {/* </section> */}

      {/* Newsletter Promo (Desktop) */}
      <div className="py-12 sm:py-16 md:py-20 lg:py-24 relative bg-no-repeat bg-cover md:-mt-24 overflow-hidden" style={{ backgroundImage: "url('/Rectangle.png')" }}>
        <div className="container mx-auto relative z-10 px-6 sm:px-10 md:px-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-16">
            {/* LEFT CONTENT */}
            <div className="w-full sm:w-[55%] md:w-[52%] lg:w-1/2 lg:max-w-xl">
              <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-antigua leading-tight font-semibold uppercase mb-4 md:mb-6 text-black">
                How to thrive in Cartagena, Colombia like a local.
              </h2>

              <p className="text-sm sm:text-sm md:text-base lg:text-lg text-black mb-6 md:mb-8 leading-relaxed">
                Hidden Gems, Staying Safe, Maneuvering Around The City, Watching
                Out For Scams, Negotiating, What To Pack. The Ultimate Guide For
                Gringos.
              </p>

              <Button className="px-6 py-3 text-white w-full sm:w-full font-bold rounded bg-gradient-to-r from-green to-green-light hover:brightness-110 transition" asChild>
                <Link href="/resources">Resources</Link>
              </Button>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full sm:w-[45%] md:w-[48%] lg:w-1/2 flex justify-center items-center">
              <img
                src={carpic}
                alt="Cartagena Travel Guide"
                className="w-[200px] sm:w-[220px] md:w-[280px] lg:w-[380px] xl:w-[420px] h-auto relative z-20 object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="container mb-24 mx-auto pb-13 px-10 md:px-16 mt-12">
        <h2 className="text-3xl md:text-4xl font-black text-black font-antigua text-center capitalize mb-16">
          Free tools for your Cartagena journey
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-5">
          {[
            {
              icon: (
                <span className="w-10 h-10 p-2 rounded-full bg-gradient-to-r from-gold  to-gold-light">
                  <Headset className="w-6 h-6" />
                </span>
              ),
              label: "Tourist Service Center",
              color: "bg-gradient-to-r from-gold  to-gold-light",
              paragraph:
                "If you ever need any help during your time in Cartagena!",
              buttonTxt: "GO",
              href: "/tourist-service-center",
            },
            {
              icon: (
                <span className="w-10 h-10 p-2 rounded-full bg-gradient-to-r from-green to-green-light">
                  <MessageCircleMore className="w-6 h-6" />
                </span>
              ),
              label: "Catagena FAQs",
              color: "bg-gradient-to-r from-green to-green-light",
              paragraph: "Cartagena's Most Frequently Asked Questions",
              buttonTxt: "Download",
              href: "faqs",
            },
            {
              icon: (
                <span className="w-10 h-10 p-2 rounded-full bg-gradient-to-r from-red to-red-light">
                  <FileSpreadsheet className="w-6 h-6" />
                </span>
              ),
              label: "Cartagena Travel Checklists",
              color: "bg-gradient-to-r from-red to-red-light",
              paragraph:
                "Everything you must do before boarding your flight to Cartagena, Colombia!",
              buttonTxt: "Checkoff",
              href: "/checklist",
            },
            {
              icon: (
                <span className="w-10 h-10 p-2 rounded-full bg-gradient-to-r from-gold  to-gold-light">
                  <Plus className="w-6 h-6" />
                </span>
              ),
              label: "Cartagena Emergency Guides",
              color: "bg-gradient-to-r from-gold  to-gold-light",
              paragraph:
                "Save our Emergency Guide with you at all times for all the police stations, hospitals, and medical services!",
              buttonTxt: "Download",
              href: "/tourist-service-center",
            },
            {
              icon: (
                <span className="w-10 h-10 p-2 rounded-full bg-gradient-to-r from-green to-green-light">
                  <Music className="w-6 h-6" />
                </span>
              ),
              label: "Cartagena Spotify Playlists",
              color: "bg-gradient-to-r from-green to-green-light",
              paragraph:
                "Enhance your Cartagena trip by immersing yourself to the Cartagena Carribean beats!",
              buttonTxt: "Download",
              href: "/music",
            },
          ].map((tool, i) => (
            <Link
              key={i}
              href={tool?.href}
              className="mt-8 md:mt-5 rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.15)] pt-10 pb-3 px-3 lg:pt-9 lg:pb-4 lg:px-5  relative text-start 
            flex flex-col h-auto space-y-2"
            >
              <div
                className={`absolute -top-8 left-1/2  -translate-x-1/2 
              w-14 h-14 flex items-center p-2  justify-center
              rounded-full text-white bg-white shadow-[0_-8px_10px_0_rgba(0,0,0,0.15)] `}
              >
                {tool.icon}
              </div>
              <div className="inline text-black font-bold absolute top-3 right-3 lg:top-3  lg:right-5">
                <Heart size={25} />
              </div>

              {/* <div className="px-2">/ */}
              <h5 className="font-extrabold text-black">{tool.label}</h5>
              <p className="text-xs font-normal pt-1 leading-relaxed text-gray-500 flex-grow  pb-5">
                {tool.paragraph}
              </p>
              <Button
                variant="default"
                className={`w-full rounded text-white bg-gradient-to-r hover:brightness-110 ${tool.color}`}
              >
                {tool.buttonTxt}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      {/* <div className="container mb-24 mx-auto pb-13 px-10 md:px-16 mt-12">
        <h2 className="text-3xl md:text-4xl font-black text-black font-antigua text-center capitalize mb-16">
          Free tools for your Cartagena journey
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-5">
          {[
            {
              icon: (
                <span className="w-10 h-10 p-2 rounded-full bg-gradient-to-r from-gold  to-gold-light">
                  <Headset className="w-6 h-6" />
                </span>
              ),
              label: "Tourist Service Center",
              color: "bg-gradient-to-r from-gold  to-gold-light",
              paragraph:
                "If you ever need any help during your time in Cartagena!",
              buttonTxt: "GO",
            },
            {
              icon: (
                <span className="w-10 h-10 p-2 rounded-full bg-gradient-to-r from-green to-green-light">
                  <MessageCircleMore className="w-6 h-6" />
                </span>
              ),
              label: "Catagena FAQs",
              color: "bg-gradient-to-r from-green to-green-light",
              paragraph: "Cartagena's Most Frequently Asked Questions",
              buttonTxt: "Download",
            },
            {
              icon: (
                <span className="w-10 h-10 p-2 rounded-full bg-gradient-to-r from-red to-red-light">
                  <FileSpreadsheet className="w-6 h-6" />
                </span>
              ),
              label: "Cartagena Travel Checklists",
              color: "bg-gradient-to-r from-red to-red-light",
              paragraph:
                "Everything you must do before boarding your flight to Cartagena, Colombia!",
              buttonTxt: "Checkoff",
            },
            {
              icon: (
                <span className="w-10 h-10 p-2 rounded-full bg-gradient-to-r from-gold  to-gold-light">
                  <Plus className="w-6 h-6" />
                </span>
              ),
              label: "Cartagena Emergency Guides",
              color: "bg-gradient-to-r from-gold  to-gold-light",
              paragraph:
                "Save our Emergency Guide with you at all times for all the police stations, hospitals, and medical services!",
              buttonTxt: "Download",
            },
            {
              icon: (
                <span className="w-10 h-10 p-2 rounded-full bg-gradient-to-r from-green to-green-light">
                  <Music className="w-6 h-6" />
                </span>
              ),
              label: "Cartagena Spotify Playlists",
              color: "bg-gradient-to-r from-green to-green-light",
              paragraph:
                "Enhance your Cartagena trip by immersing yourself to the Cartagena Carribean beats!",
              buttonTxt: "Download",
            },
          ].map((tool, i) => (
            <div
              key={i}
              className="mt-8 md:mt-5 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.15)] pt-10 pb-3 px-3 lg:pt-9 lg:pb-4 lg:px-5  relative text-start 
            flex flex-col h-auto space-y-2"
            >
              <div
                className={`absolute -top-8 left-1/2  -translate-x-1/2 
              w-14 h-14 flex items-center p-2  justify-center
              rounded-full text-white bg-white shadow-[0_-8px_10px_0_rgba(0,0,0,0.15)] `}
              >
                {tool.icon}
              </div>
              <div className="inline text-black font-bold absolute top-3 right-2">
                <Heart size={25} />
              </div>

              <h5 className="font-extrabold text-black">{tool.label}</h5>
              <p className="text-xs font-normal pt-1 leading-relaxed text-gray-500 flex-grow  pb-5">
                {tool.paragraph}
              </p>
              <Button
                variant="default"
                className={`w-full rounded text-white bg-gradient-to-r hover:brightness-110 ${tool.color}`}
              >
                {tool.buttonTxt}
              </Button>
            </div>
          ))}
        </div>
      </div> */}

      <ConciergeCTA />

      <HowToDoCartagena />

      <Pizza />

      {/* Carasole Section */}
      <TopNewsCartagena />

      {/* Search Section */}
    </div>
  );
};

export default HomePage;
