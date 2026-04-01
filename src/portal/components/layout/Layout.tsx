// import React from "react";
// import { useState } from "react";
// import logo from "/assets/Logo.png.png";
// import whatsapp from "/assets/whatsapp.svg";
// import footerbg from "/assets/footer-bg.png";
// import { Button } from "@public/components/ui/button";
// import { Link } from "react-router-dom";
// import {BookingDialog} from  "@/components/bookingForm"
// import { TopBar } from "./TopBar";
// import {
//   Heart,
//   Menu,
//   X,
//   Facebook,
//   Share2,
//   Twitter,
//   Instagram,
//   Youtube,
//   Linkedin,
//   CloudMoon,
// } from "lucide-react";

// const Layout = ({ children }) => {
//   const NAV_LINKS = [
//     { label: "Activities", path: "/activities" },
//     { label: "Hotels", path: "/hotels" },
//     { label: "Beaches", path: "/beaches" },
//     { label: "Boating", path: "/boating" },
//     { label: "Real Estate", path: "/realState" },
//     { label: "Gastronomy", path: "/gastronomy" },
       
//   ];
//   const FooterNavLinks = [
//     { label: "Activities", path: "/activities" },
//     { label: "Hotels", path: "/hotels" },
//     { label: "Beach Trips", path: "/beaches" },
//     { label: "Rentals", path: "/" },
//     { label: "Medical", path: "/" },
//     { label: "Real Estate", path: "/" },
//     { label: "More", path: "/" },
//   ];

//   const [isOpen, setIsOpen] = useState(false);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   return (
//     <>
//       <TopBar />
//       <header className="flex items-center justify-between px-6 py-4 bg-black md:px-20 relative">
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background:
//               "radial-gradient(circle at center, rgba(245, 242, 242, 0.2) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.3) 100%)",
//           }}
//         />
//         {/* Logo */}
//         <div>
//           <Link href="/">
//             <img src={logo} className="h-16 w-44" alt="Logo" />
//           </Link>
//         </div>

//         {/* Desktop nav */}
//         <nav className="hidden md:flex items-center  gap-3 text-sm uppercase text-white font-medium">
//           {NAV_LINKS.map(({ label, path }) => (
//             <Link
//               key={label}
//               to={path}
//               className="hover:text-gold transition-colors"
//             >
//               {label}
//             </Link>
//           ))}
//         </nav>

//         {/* Right side */}
//         <div className="flex items-center gap-4">
//           <Link href="#" className="text-white">
//             <Heart className="text-gold w-6 h-6" />
//           </Link>

//           <p>|</p>
//           <Link href="#" className="text-white text-sm hidden md:block">
//             Login
//           </Link>
//           <Button onClick={() => setDialogOpen(true)} className="bg-gradient-to-b from-gold to-gold-light hover:bg-gold text-white  rounded px-6 hidden sm:block">
//             BOOK A TRIP
//           </Button>

//           {/* Mobile menu button */}
//           <button
//             className="md:hidden text-white"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>

//         <div className="inline absolute z-[999] top-28 sm:top-44 right-4 sm:right-auto sm:left-4 flex flex-col items-center">
//           <div className="bg-[#f15c5d] p-1 sm:p-3 rounded-full mb-2 sm:mb-6 flex items-center justify-center">
//   <Share2 className="w-5 h-5 sm:h-8 sm:w-8 text-white fill-white" />
// </div>
//           <div className="bg-yellow-400 p-1 sm:p-3 rounded-full mb-2 sm:mb-6 flex items-center justify-center">
//             <Heart className="w-5 h-5 sm:h-8 sm:w-8 text-black  " />
//           </div>
//         </div>
//         <div className="fixed bottom-6 right-6 z-[999] flex items-center gap-2">
//           <div>
//             <span className="bg-white text-black font-bold px-3 py-1 rounded shadow text-sm hidden md:block">
//               Need help? Chat with us
//             </span>
//           </div>
//           <div>
//             <a
//               href="https://wa.me/+111111111111"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-14 h-14 flex items-center justify-center rounded-full  hover:scale-105 transition"
//             >
//               <img src={whatsapp} alt="WhatsApp" className="w-10 h-10" />
//             </a>
//           </div>
//         </div>

//         {/* Mobile nav */}
//         {isOpen && (
//           <nav className="absolute top-full left-0 w-full bg-black z-50 flex flex-col items-center gap-6 py-6 text-white uppercase font-semibold md:hidden">
//             {[
//               { label: "Activities", path: "/activities" },
//               { label: "Hotels", path: "/hotels" },
//               { label: "Beaches", path: "/beaches" },
//               { label: "Boating", path: "/boating" },
//               { label: "Real Estate", path: "/realState" },
//               { label: "Gastronomy", path: "/gastronomy" },
//             ].map((item) => (
//               <Link
//                 key={item.label}
//                 to={item.path}
//                 className="hover:text-[#d0a439]"
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </nav>
//         )}
//       </header>

//       <main>{children}</main>

//       <footer
//         className=" bg-black text-white pt-20 pb-10 relative bg-no-repeat bg-center bg-contain"
//         style={{ backgroundImage: `url(${footerbg})` }}
//       >
//         <div className="container">

//         <div
//           className=" absolute inset-0 pointer-events-none"
//           style={{
//             background:
//               "radial-gradient(circle at center, rgba(245, 242, 242, 0.2) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.3) 100%)",
//           }}
//         ></div>

//         <div className="relative z-10">
//           <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-11 gap-12">
//             {/* Left: Logo + Text + Social */}
//             <div className="md:col-span-3">
//               <Link href="/">
//                 <img src={logo} className="w-100 w-md-60 mb-6" alt="LaCarta" />
//               </Link>

//               <p className="text-white leading-relaxed text-sm mb-6  hidden md:block">
//                 We are native Cartagenero Costeños passionate about everything
//                 Cartagena. Our magazine is here to help you discover the marvels
//                 of Cartagena la Heroica.
//               </p>

//               <Button onClick={() => setDialogOpen(true)} className="bg-gradient-to-b from-gold to-gold-light hover:bg-gold text-white text-lg font-semibold rounded px-6 w-full">
//                 BOOK TRIP
//               </Button>
//             </div>

//             {/* About */}
//             <div className="hidden md:block md:col-span-2 py-5">
//               <h5 className="font-bold mb-6">About</h5>
//               <ul className="space-y-2 text-white">
//                 {[
//                   "About Us",
//                   "Contact",
//                   "Our Culture",
//                   "Work With Us",
//                   "Submit a Story",
//                   "Advertise with Us",
//                   "Editorial Standards",
//                 ].map((l) => (
//                   <li key={l}>
//                     <Link href="#" className="hover:text-white transition">
//                       {l}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Cartagena */}
//             <div className="hidden md:block md:col-span-2 py-5">
//               <h5 className="font-bold mb-6">Cartagena</h5>
//               <ul className="space-y-2 text-white">
//                 {FooterNavLinks.map(({ label, path }) => (
//                   <li key={label}>
//                     <Link href={path} className="hover:text-white transition">
//                       {label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Help */}
//             <div className="md:block text-center md:text-start md:col-span-2 py-5">
//               <h5 className="font-bold mb-6">Help</h5>
//               <ul className="space-y-2 text-white">
//                 {[
//                   "FAQ",
//                   "Travel Guide",
//                   "Resources",
//                   "Glossary",
//                   "Safety Map",
//                   "Staying Safe",
//                   "Tourist Center",
//                 ].map((l) => (
//                   <li key={l}>
//                     <Link href="#" className="hover:text-white transition">
//                       {l}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Weather Card */}
//             <div className="hidden md:flex justify-end md:col-span-2 py-5">
//               <div className="w-[320px] h-[260px] rounded-sm bg-gradient-to-br from-[#62B8F6] to-[#396C90] text-white shadow-xl  pt-6 pb-0 flex flex-col text-center">
//                 {/* Top Section */}
//                 <div className="px-8">
//                   <h4 className="text-2xl font-bold">Cartagena, CO</h4>
//                   <p className="text-sm opacity-90 mt-1">
//                     7:20 am, Dec 19, 2025
//                   </p>
//                 </div>

//                 {/* Temperature Section */}
//                 <div className="flex items-center justify-center gap-3 my-4 px-8">
//                   <CloudMoon className="w-12 h-12 opacity-90" />
//                   <div className="flex items-start">
//                     <span className="text-6xl font-semibold leading-none">
//                       25
//                     </span>
//                     <span className="text-3xl font-semibold mt-1 ml-1">°C</span>
//                   </div>
//                 </div>
//                 <div className="flex-grow" />

//                 {/* Description */}
//                 <p className="text-sm opacity-95 px-8 pb-2">Few Clouds</p>

//                 {/* Spacer pushes footer down */}

//                 {/* Footer */}
//                 <div className="w-full backdrop-blur-md bg-[#396C90]/50 py-2 rounded-b-sm">
//                   <p className="text-[10px] opacity-70">
//                     Weather from OpenWeatherMap
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="container hidden md:block mx-auto px-4 mt-20 text-sm text-white">
//             <div className="flex flex-col md:flex-row items-center justify-between gap-2">
//               <span>
//                 Follow Us
//                 <div className="flex pl-0 ml-0 gap-2">
//                   {[Facebook, Twitter, Instagram, Youtube, Linkedin].map(
//                     (Icon, i) => (
//                       <Link
//                         key={i}
//                         href="#"
//                         className="p-2 text-white hover:text-gold  transition"
//                       >
//                         <Icon size={22} />
//                       </Link>
//                     ),
//                   )}
//                 </div>
//               </span>
//               <span className="fw-bold">My Favorites</span>
//             </div>
//           </div>

//           <div className="container mx-auto px-4   text-sm text-white">
//             <div className="flex flex-col border-t-2 pt-8 mt-16 border-white md:flex-row items-center justify-between gap-2">
//               <span>© LaCarta 2023 – 2025. All rights reserved</span>
//               <span>Privacy Policy - Terms & Conditions</span>
//             </div>
//           </div>
//         </div>
//         </div>
//       </footer>
//       <BookingDialog open={dialogOpen} onOpenChange={setDialogOpen} />
//     </>
//   );
// };

// export default Layout;

'use client'
import React from "react";
import { useState } from "react";
import NewsletterSection from "@public/components/layout/cartagenaNews";
const logo = "/assets/Logo.png.png";
const whatsapp = "/assets/whatsapp.svg";
const footerbg = "/assets/footer-bg.png";
import { Button } from "@public/components/ui/button";
import Link from 'next/link';
import { BookingDialog } from "@public/components/bookingForm";
import { TopBar } from "./TopBar";
import {
  Heart,
  Menu,
  X,
  Facebook,
  Share2,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  CloudMoon,
} from "lucide-react";

const Layout = ({ children }) => {
  const NAV_LINKS = [
    { label: "Activities", path: "/activities" },
    { label: "Hotels", path: "/hotels" },
    { label: "Beaches", path: "/beaches" },
    { label: "Boating", path: "/boating" },
    { label: "Real Estate", path: "/realState" },
    { label: "Gastronomy", path: "/gastronomy" },
    { label: "More", path: "/blog" },
  ];
  const FooterNavLinks = [
    { label: "Activities", path: "/activities" },
    { label: "Hotels", path: "/hotels" },
    { label: "Beach Trips", path: "/beaches" },
    { label: "Rentals", path: "/" },
    { label: "Medical", path: "/" },
    { label: "Real Estate", path: "/" },
    { label: "More", path: "/" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <TopBar />
      <header className="flex items-center justify-between px-4 sm:px-6 lg:px-20 py-3 bg-black relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(245, 242, 242, 0.2) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.3) 100%)",
          }}
        />

        {/* Logo */}
        <div className="flex-shrink-0 z-10">
          <Link href="/">
            <img src={logo} className="h-12 w-36 sm:h-14 sm:w-40 lg:h-16 lg:w-44" alt="Logo" />
          </Link>
        </div>

        {/* Desktop & Tablet nav - hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-3 text-xs xl:text-sm uppercase text-white font-medium flex-1 justify-center px-4">
          {NAV_LINKS.map(({ label, path }) => (
            <Link
              key={label}
              href={path}
              className="hover:text-gold transition-colors whitespace-nowrap"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 z-10 flex-shrink-0">
          <Link href="#" className="text-white">
            <Heart className="text-gold w-5 h-5 sm:w-6 sm:h-6" />
          </Link>

          <p className="text-white hidden lg:block">|</p>

          <Link href="#" className="text-white text-sm hidden lg:block whitespace-nowrap">
            Login
          </Link>

          <Button
            onClick={() => setDialogOpen(true)}
            className="bg-gradient-to-b from-gold to-gold-light hover:bg-gold text-white rounded px-3 sm:px-4 lg:px-6 text-xs sm:text-sm hidden sm:block whitespace-nowrap"
          >
            BOOK A TRIP
          </Button>

          {/* Mobile/Tablet menu button */}
          <button
            className="lg:hidden text-white z-10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Share & Heart floating icons - responsive positioning */}
        <div className="inline absolute z-[999] top-20 sm:top-24 lg:top-28 right-3 sm:right-4 lg:right-auto lg:left-4 flex flex-col items-center gap-2">
          <div className="bg-[#f15c5d] p-1.5 sm:p-2 lg:p-3 rounded-full">
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-8 lg:h-8 text-white font-bold fill-white" />
          </div>
          <div className="bg-yellow-400 p-1.5 sm:p-2 lg:p-3 rounded-full">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-8 lg:h-8 text-black font-bold" />
          </div>
        </div>

        {/* WhatsApp floating button */}
        <div className="fixed bottom-6 right-4 sm:right-6 z-[999] flex items-center gap-2">
          <div>
            <span className="bg-white text-black font-bold px-3 py-1 rounded shadow text-sm hidden lg:block">
              Need help? Chat with us
            </span>
          </div>
          <div>
            <a
              href="https://wa.me/+111111111111"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full hover:scale-105 transition"
            >
              <img src={whatsapp} alt="WhatsApp" className="w-9 h-9 sm:w-10 sm:h-10" />
            </a>
          </div>
        </div>

        {/* Mobile/Tablet Dropdown nav */}
        {isOpen && (
          <nav className="absolute top-full left-0 w-full bg-black z-50 flex flex-col items-center gap-5 py-6 text-white uppercase font-semibold lg:hidden shadow-lg">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.path}
                className="hover:text-[#d0a439] transition-colors text-sm sm:text-base"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {/* Login & Book Trip in mobile menu */}
            <div className="flex flex-col items-center gap-3 pt-2 border-t border-gray-700 w-full px-8">
              <Link
                href="#"
                className="text-white text-sm hover:text-[#d0a439] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Button
                onClick={() => {
                  setDialogOpen(true);
                  setIsOpen(false);
                }}
                className="bg-gradient-to-b from-gold to-gold-light hover:bg-gold text-white rounded px-8 w-full max-w-xs"
              >
                BOOK A TRIP
              </Button>
            </div>
          </nav>
        )}
      </header>

      <main>{children}</main>

      <NewsletterSection />

      <footer
        className="bg-black text-white pt-20 pb-10 relative bg-no-repeat bg-center bg-contain"
        style={{ backgroundImage: `url(${footerbg})` }}
      >
        <div className="container">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(245, 242, 242, 0.2) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.3) 100%)",
            }}
          ></div>

          <div className="relative z-10">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-11 gap-12">
              {/* Left: Logo + Text + Social */}
              <div className="md:col-span-3">
                <Link href="/">
                  <img src={logo} className="w-100 w-md-60 mb-6" alt="LaCarta" />
                </Link>

                <p className="text-white leading-relaxed text-sm mb-6 hidden md:block">
                  We are native Cartagenero Costeños passionate about everything
                  Cartagena. Our magazine is here to help you discover the marvels
                  of Cartagena la Heroica.
                </p>

                <Button
                  onClick={() => setDialogOpen(true)}
                  className="bg-gradient-to-b from-gold to-gold-light hover:bg-gold text-white text-lg font-semibold rounded px-6 w-full"
                >
                  BOOK TRIP
                </Button>
              </div>

              {/* About */}
              <div className="hidden lg:block md:col-span-2 py-5">
                <h5 className="font-bold mb-6">About</h5>
                <ul className="space-y-2 text-white">
                  {[
                    { title: "About Us", href: "/about-us" },
                    { title: "Contact", href: "/contact" },
                    { title: "Our Culture", href: "/our-culture" },
                    { title: "Work With Us", href: "/work-with-us" },
                    { title: "Submit a Story", href: "/submit-a-story" },
                    { title: "Advertise with Us", href: "/advertise-with-us" },
                    { title: "Editorial Standards", href: "/editorial-standards" },
                  ].map((l) => (
                    <li key={l.title}>
                      <Link href={l.href} className="hover:text-gold transition">
                        {l.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cartagena */}
              <div className="text-center lg:text-start md:col-span-2 py-5">
                <h5 className="font-bold mb-6">Cartagena</h5>
                <ul className="space-y-2 text-white">
                  {NAV_LINKS.map(({ label, path }) => (
                    <li key={label}>
                      <Link href={path} className="hover:text-white transition">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Help */}
              <div className="hidden lg:block text-center lg:text-start md:col-span-2 py-5">
                <h5 className="font-bold mb-6">Help</h5>
                <ul className="space-y-2 text-white">
                  {[
                    { title: "FAQ", href: "/faqs" },
                    { title: "Travel Guide", href: "/travel-guide" },
                    { title: "Resources", href: "/resources" },
                    { title: "Glossary", href: "#" },
                    { title: "Safety Map", href: "/help-map" },
                    { title: "Staying Safe", href: "#" },
                    { title: "Tourist Center", href: "/tourist-service-center" },
                  
                  ].map((l) => (
                    <li key={l.title}>
                      <Link href={l.href} className="hover:text-white transition">
                        {l.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weather Card */}
              <div className="hidden lg:flex justify-end md:col-span-2 py-5">
                <div className="w-[320px] h-[260px] rounded-sm bg-gradient-to-br from-[#62B8F6] to-[#396C90] text-white shadow-xl pt-6 pb-0 flex flex-col text-center">
                  <div className="px-8">
                    <h4 className="text-2xl font-bold">Cartagena, CO</h4>
                    <p className="text-sm opacity-90 mt-1">7:20 am, Dec 19, 2025</p>
                  </div>

                  <div className="flex items-center justify-center gap-3 my-4 px-8">
                    <CloudMoon className="w-12 h-12 opacity-90" />
                    <div className="flex items-start">
                      <span className="text-6xl font-semibold leading-none">25</span>
                      <span className="text-3xl font-semibold mt-1 ml-1">°C</span>
                    </div>
                  </div>
                  <div className="flex-grow" />

                  <p className="text-sm opacity-95 px-8 pb-2">Few Clouds</p>

                  <div className="w-full backdrop-blur-md bg-[#396C90]/50 py-2 rounded-b-sm">
                    <p className="text-[10px] opacity-70">Weather from OpenWeatherMap</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="container hidden lg:block mx-auto px-4 mt-20 text-sm text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                <span>
                  Follow Us
                  <div className="flex pl-0 ml-0 gap-2">
                    {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                      <Link key={i} href="#" className="p-2 text-white hover:text-gold transition">
                        <Icon size={22} />
                      </Link>
                    ))}
                  </div>
                </span>
                <span className="fw-bold">My Favorites</span>
              </div>
            </div>

            <div className="container mx-auto px-4 text-sm text-white">
              <div className="flex flex-col border-t-2 pt-8 mt-16 border-white md:flex-row items-center justify-between gap-2">
                <span>© LaCarta 2023 – 2025. All rights reserved</span>
                <span>Privacy Policy - Terms & Conditions</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <BookingDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
};

export default Layout;