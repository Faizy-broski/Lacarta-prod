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
//     { label: "Real Estate", path: "/real-estate" },
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
//               { label: "Real Estate", path: "/real-estate" },
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
//               <span>© LaCarta 2023 – 2026. All rights reserved</span>
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
import { useState, useEffect, useCallback } from "react";
import NewsletterSection from "@public/components/layout/cartagenaNews";
const logo = "/assets/Logo.png.png";
const whatsapp = "/assets/whatsapp.svg";
const footerbg = "/assets/footer-bg.png";
import { Button } from "@public/components/ui/button";
import Link from 'next/link';
import { BookingDialog } from "@public/components/bookingForm";
import { TopBar } from "./TopBar";
import PortalAuthDialog from "@public/components/auth/PortalAuthDialog";
import { FavoritesDrawer } from "./FavoritesDrawer";
import { SharePopover } from "./SharePopover";
import { useAuthStore } from "@/lib/auth/auth.store";
import { usePathname } from 'next/navigation';
import { supabase } from "@/lib/supabase";
import { usePortalStore } from "@public/store/portalStore";
import { addFavorite, removeFavorite, isFavorited } from "@/lib/services/favorites.service";
import { toast } from "sonner";
import {
  Heart,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  CloudMoon,
  LogOut,
} from "lucide-react";

const Layout = ({ children }) => {
  const NAV_LINKS = [
    { label: "Activities", path: "/activities" },
    { label: "Hotels", path: "/hotels" },
    { label: "Beaches", path: "/beaches" },
    { label: "Boating", path: "/boating" },
    { label: "Real Estate", path: "/real-estate" },
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
  const [authOpen, setAuthOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const { currentListingId, currentListingTitle } = usePortalStore();
  const pathname = usePathname();
  const [favorited, setFavorited] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [favCount, setFavCount] = useState(0);

  // Load total favorites count on login
  useEffect(() => {
    if (!user?.accountNo) { setFavCount(0); return; }
    supabase
      .from('favorites')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.accountNo)
      .then(({ count }) => setFavCount(count ?? 0));
  }, [user?.accountNo]);

  const refreshFavCount = useCallback(() => {
    if (!user?.accountNo) return;
    supabase
      .from('favorites')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.accountNo)
      .then(({ count }) => setFavCount(count ?? 0));
  }, [user?.accountNo]);

  // Check favorite status whenever listing/page or user changes
  useEffect(() => {
    if (!user?.accountNo) { setFavorited(false); return; }
    if (currentListingId) {
      isFavorited(user.accountNo, 'listing', currentListingId).then(setFavorited);
    } else {
      // Check if the current page is favorited
      isFavorited(user.accountNo, 'page', pathname).then(setFavorited);
    }
  }, [user?.accountNo, currentListingId, pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    logout();
  };

  const handleFavorite = useCallback(async () => {
    if (!user) { setAuthOpen(true); return; }
    setFavLoading(true);
    try {
      if (currentListingId) {
        // Favorite a specific listing
        if (favorited) {
          setFavorited(false);
          setFavCount((c) => Math.max(0, c - 1));
          await removeFavorite(user.accountNo, 'listing', currentListingId);
          toast.success('Removed from favorites');
        } else {
          setFavorited(true);
          setFavCount((c) => c + 1);
          await addFavorite(user.accountNo, 'listing', currentListingId);
          toast.success('Saved to favorites!');
        }
      } else {
        // Favorite the current page
        const pageTitle = typeof document !== 'undefined' ? document.title : pathname;
        if (favorited) {
          setFavorited(false);
          setFavCount((c) => Math.max(0, c - 1));
          await removeFavorite(user.accountNo, 'page', pathname);
          toast.success('Page removed from favorites');
        } else {
          setFavorited(true);
          setFavCount((c) => c + 1);
          await addFavorite(user.accountNo, 'page', pathname, pageTitle);
          toast.success('Page saved to favorites!');
        }
      }
    } catch (err) {
      // Revert optimistic updates on failure
      setFavorited(favorited);
      refreshFavCount();
      const msg = err instanceof Error ? err.message : 'Could not update favorites';
      console.error('[handleFavorite]', msg);
      toast.error(msg);
    } finally {
      // Always sync with real DB count after the operation
      refreshFavCount();
      setFavLoading(false);
    }
  }, [user, currentListingId, favorited, pathname, refreshFavCount]);

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
          <button
            onClick={() => user ? setFavOpen(true) : setAuthOpen(true)}
            className="relative text-white"
            title={user ? "My Favorites" : "Sign in to save favorites"}
          >
            <Heart className="text-gold w-5 h-5 sm:w-6 sm:h-6" />
            {user && favCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-0.5 flex items-center justify-center rounded-full bg-[#f15c5d] text-white text-[9px] font-bold leading-none">
                {favCount > 99 ? '99+' : favCount}
              </span>
            )}
          </button>

          <p className="text-white hidden lg:block">|</p>

          {user ? (
            <div className="hidden lg:flex items-center gap-2">
              <Link
                href="/profile"
                className="text-white text-sm font-antigua truncate max-w-[100px] hover:text-gold transition"
                title="My Profile"
              >
                {user.name || user.email}
              </Link>
              <button
                onClick={handleLogout}
                title="Sign out"
                className="text-gray-300 hover:text-white transition"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="text-white text-sm hidden lg:block whitespace-nowrap hover:text-gold transition font-antigua"
            >
              Login
            </button>
          )}

          <PortalAuthDialog open={authOpen} onOpenChange={setAuthOpen} />
          <FavoritesDrawer open={favOpen} onClose={() => setFavOpen(false)} />

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
          <SharePopover title={currentListingTitle ?? undefined} />
          <button
            onClick={handleFavorite}
            disabled={favLoading}
            title={favorited ? "Remove from favorites" : "Save to favorites"}
            className={`p-1.5 sm:p-2 lg:p-3 rounded-full hover:brightness-110 transition active:scale-95 ${
              favorited ? 'bg-gold' : 'bg-yellow-400'
            }`}
          >
            <Heart className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-8 lg:h-8 font-bold ${favorited ? 'fill-white text-white' : 'text-black'}`} />
          </button>
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
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="text-white text-sm hover:text-[#d0a439] transition-colors font-antigua"
                    onClick={() => setIsOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="text-white text-sm hover:text-[#d0a439] transition-colors font-antigua flex items-center gap-1.5"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setAuthOpen(true); setIsOpen(false); }}
                  className="text-white text-sm hover:text-[#d0a439] transition-colors font-antigua"
                >
                  Login / Sign Up
                </button>
              )}
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
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-11 gap-8 lg:gap-12">
              {/* Left: Logo + Text + Social */}
              <div className="lg:col-span-3">
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

              {/* Mobile: 3-col link grid */}
              <div className="grid grid-cols-3 gap-4 lg:hidden py-4 border-t border-white/20">
                <div>
                  <h5 className="font-bold mb-3 text-sm">About</h5>
                  <ul className="space-y-2 text-white text-xs">
                    {[
                      { title: "About Us", href: "/about-us" },
                      { title: "Contact", href: "/contact" },
                      { title: "Our Culture", href: "/our-culture" },
                      { title: "Work With Us", href: "/work-with-us" },
                      { title: "List Your Business", href: "/apply" },
                      { title: "Submit a Story", href: "/submit-a-story" },
                      { title: "Advertise", href: "/advertise-with-us" },
                      { title: "Editorial", href: "/editorial-standards" },
                    ].map((l) => (
                      <li key={l.title}><Link href={l.href} className="hover:text-gold">{l.title}</Link></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold mb-3 text-sm">Cartagena</h5>
                  <ul className="space-y-2 text-white text-xs">
                    {NAV_LINKS.map(({ label, path }) => (
                      <li key={label}><Link href={path} className="hover:text-gold">{label}</Link></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold mb-3 text-sm">Help</h5>
                  <ul className="space-y-2 text-white text-xs">
                    {[
                      { title: "FAQ", href: "/faqs" },
                      { title: "Travel Guide", href: "/travel-guide" },
                      { title: "Resources", href: "/resources" },
                      { title: "Safety Map", href: "/help-map" },
                      { title: "Staying Safe", href: "#" },
                      { title: "Tourist Center", href: "/tourist-service-center" },
                    ].map((l) => (
                      <li key={l.title}><Link href={l.href} className="hover:text-gold">{l.title}</Link></li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* About — desktop only */}
              <div className="hidden lg:block lg:col-span-2 py-5">
                <h5 className="font-bold mb-6">About</h5>
                <ul className="space-y-2 text-white">
                  {[
                    { title: "About Us", href: "/about-us" },
                    { title: "Contact", href: "/contact" },
                    { title: "Our Culture", href: "/our-culture" },
                    { title: "Work With Us", href: "/work-with-us" },
                    { title: "List Your Business", href: "/apply" },
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

              {/* Cartagena — desktop only */}
              <div className="hidden lg:block text-start lg:col-span-2 py-5">
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

              {/* Help — desktop only */}
              <div className="hidden lg:block text-start lg:col-span-2 py-5">
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
                <span>© LaCarta 2023 – 2026. All rights reserved</span>
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