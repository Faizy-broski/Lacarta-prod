import React, { useRef } from "react";
import { Card, CardContent } from "@public/components/ui/card";
import { Star, Heart, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@public/components/ui/button";
import Link from "next/link";

export default function PaginationListing({
  premiumListings = [],
  text = "Premium Listing",
}) {
  const scrollRef = useRef(null);

  // const scroll = (direction) => {
  //   if (!scrollRef.current) return;

  //   const container = scrollRef.current;
  //   const cardWidth = container.querySelector("div")?.offsetWidth || 300;
  //   const scrollAmount = cardWidth + 24; // card width + gap

  //   container.scrollBy({
  //     left: direction === "left" ? -scrollAmount : scrollAmount,
  //     behavior: "smooth",
  //   });
  // };
  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const firstCard = container.querySelector(".carousel-card");
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 24; // gap-6 = 24px
    const scrollAmount = cardWidth + gap;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Split listings into groups of 4
  const chunkSize = 4;
  const slides = [];
  for (let i = 0; i < premiumListings.length; i += chunkSize) {
    slides.push(premiumListings.slice(i, i + chunkSize));
  }

  return (
    <section className="mx-auto px-6 py-4 md:px-10 pb-0 mb-0">
      <div className="w-full sm:container sm:mx-auto">
        <h2 className="mt-10 text-2xl md:text-3xl lg:text-4xl font-antigua font-bold text-black">
          {text}
        </h2>

        <div className="relative">
          {/* LEFT BUTTON */}
          <button
            onClick={() => scroll("left")}
            className="absolute hidden sm:flex -left-5 top-1/2 z-30 -translate-y-1/2
                     h-10 w-10 rounded-full bg-gradient-to-r from-gold to-gold-light
                     flex items-center justify-center
                     text-white shadow-lg hover:scale-105 transition"
          >
            <ChevronLeft />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={() => scroll("right")}
            className="absolute hidden sm:flex -right-5 top-1/2 z-30 -translate-y-1/2
                     h-10 w-10 rounded-full bg-gradient-to-l from-gold to-gold-light
                     flex items-center justify-center
                     text-white shadow-lg hover:scale-105 transition"
          >
            <ChevronRight />
          </button>

          {/* BLUR EDGES */}
          {/* <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-white via-white/80 to-transparent backdrop-blur-sm" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-white via-white/80 to-transparent backdrop-blur-sm" /> */}

          {/* SCROLL CONTAINER */}
          <div className="overflow-hidden">
            <div
              ref={scrollRef}
              className="w-full flex gap-2 sm:gap-4 px-3 sm:px-0 overflow-x-auto scroll-smooth snap-x snap-mandatory  no-scrollbar"
            >
              {premiumListings.map((item) => (
                <div
                  key={item.id}
                  className="
                  // carousel-card
                  // w-full
                  // sm:w-[calc(50%-12px)]
                  // lg:w-[calc(25%-18px)]
                   carousel-card
                   pl-1 sm:pl-0
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
                >
                  <Link href={item.href} className="block h-full">
                    <Card className="h-full relative rounded-2xl shadow-md overflow-hidden bg-white">
                      <span className="absolute rounded-full shadow-lg p-2 top-3 right-3 bg-white/30 backdrop-md">
                        <Heart className="fill-white" />
                      </span>
                      <div className="absolute top-4 left-4 border-white border-4  bg-white/30 backdrop-md">
                        <img
                          src={item.image}
                          alt={item.title}
                          // className="aspect-2/1 w-16 object-cover"
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

                        <p className="text-xs font-bold truncate text-gray-600">
                          {item.subtitle}
                        </p>

                        <div className="flex mt-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= Math.round(item.rating)
                                  ? "fill-[#E6B65C] text-[#E6B65C]"
                                  : "text-[#E6B65C]"
                              }`}
                            />
                          ))}
                        </div>

                        <button className="mt-3 text-[#22c35d] font-extrabold underline underline-offset-4">
                          MENU
                        </button>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    // <section className="mx-auto max-w-7xl px-4 py-16">
    //   <div className="container">
    //     <h2 className="mb-8 text-4xl font-antigua font-bold text-black">
    //       {text}
    //     </h2>

    //     <div className="relative">
    //       {/* LEFT BLUR */}
    //       {/* <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-white/40 backdrop-blur-md"></div> */}

    //       {/* RIGHT BLUR */}
    //       {/* <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-white/40 backdrop-blur-md"></div> */}

    //       {/* LEFT BUTTON */}
    //       <button
    //         onClick={() => scroll("left")}
    //         className="absolute -left-5 top-1/2 z-30 -translate-y-1/2
    //                  h-10 w-10 rounded-full bg-[#d0a439]
    //                  flex items-center justify-center
    //                  text-white shadow-lg hover:scale-105 transition"
    //       >
    //         <ChevronLeft />
    //       </button>

    //       {/* RIGHT BUTTON */}
    //       <button
    //         onClick={() => scroll("right")}
    //         className="absolute md:-right-5 -right-3 top-1/2 z-30 -translate-y-1/2
    //                  h-10 w-10 rounded-full bg-[#d0a439]
    //                  flex items-center justify-center
    //                  text-white shadow-lg hover:scale-105 transition"
    //       >
    //         <ChevronRight />
    //       </button>

    //       {/* SCROLL WRAPPER */}
    //       <div className="overflow-hidden">
    //         <div
    //           ref={scrollRef}
    //           className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-12 pb-2 no-scrollbar"
    //         >
    //           {slides.flat().map((item) => (
    //             <div
    //               key={item.id}
    //               className="
    //               snap-start
    //               min-w-[85%]
    //               sm:min-w-[48%]
    //               lg:min-w-[23%]
    //               flex-shrink-0
    //             "
    //             >
    //               <Link to={item.href}>
    //                 <Card className="rounded-2xl shadow-md overflow-hidden bg-white">
    //                   <img
    //                     src={item.image}
    //                     alt={item.title}
    //                     className="h-48 w-full object-cover"
    //                   />

    //                   <div className="p-4">
    //                     <h6 className="text-sm font-bold text-gray-600">
    //                       {item.category}
    //                     </h6>

    //                     <h3 className="text-lg font-bold font-luxury text-black truncate">
    //                       {item.title}
    //                     </h3>

    //                     <p className="text-xs font-bold truncate text-gray-600">
    //                       {item.subtitle}
    //                     </p>

    //                     <div className="flex mt-3">
    //                       {[1, 2, 3, 4, 5].map((star) => (
    //                         <Star
    //                           key={star}
    //                           className={`w-5 h-5 ${
    //                             star <= Math.round(item.rating)
    //                               ? "fill-[#E6B65C] text-[#E6B65C]"
    //                               : "text-[#E6B65C]"
    //                           }`}
    //                         />
    //                       ))}
    //                     </div>

    //                     <button className="mt-3 text-[#22c35d] font-extrabold underline underline-offset-4">
    //                       MENU
    //                     </button>
    //                   </div>
    //                 </Card>
    //               </Link>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    // <section className="mx-auto max-w-7xl px-4 py-16">
    //   <div className="container">
    //     <h2 className="mb-8 text-4xl font-antigua font-bold text-black">
    //       {text}
    //     </h2>

    //     <div className="relative">
    //       {/* LEFT BLUR */}
    //       {/* <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-white via-white/80 to-transparent backdrop-blur-sm"></div> */}

    //       {/* RIGHT BLUR */}
    //       {/* <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-white via-white/80 to-transparent backdrop-blur-sm"></div> */}
    //       <div className="absolute left-0 top-0 z-20 h-full w-24 backdrop-blur-md bg-white/40"></div>
    //       <div className="absolute right-0 top-0 z-20 h-full w-24 backdrop-blur-md bg-white/40"></div>
    //       {/* SCROLL CONTAINER */}
    //       <div className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide">
    //         {slides.flat().map((item) => (
    //           <div
    //             key={item.id}
    //             className="
    //         snap-start
    //         min-w-[85%]
    //         sm:min-w-[48%]
    //         lg:min-w-[23%]
    //       "
    //           >
    //             <Link to={item.href}>
    //               <Card className="border-none shadow-md relative overflow-hidden">
    //                 <img
    //                   src={item.image}
    //                   alt={item.title}
    //                   className="h-48 w-full object-cover"
    //                 />

    //                 <CardContent className="p-3">
    //                   <h6 className="text-sm font-bold text-gray-600">
    //                     {item.category}
    //                   </h6>

    //                   <h3 className="text-lg font-bold font-luxury text-black">
    //                     {item.title}
    //                   </h3>

    //                   <p className="text-xs font-bold truncate text-gray-600">
    //                     {item.subtitle}
    //                   </p>

    //                   <div className="flex mt-3">
    //                     {[1, 2, 3, 4, 5].map((star) => (
    //                       <Star
    //                         key={star}
    //                         className={`w-5 h-5 ${
    //                           star <= Math.round(item.rating)
    //                             ? "fill-[#E6B65C] text-[#E6B65C]"
    //                             : "text-[#E6B65C]"
    //                         }`}
    //                       />
    //                     ))}
    //                   </div>

    //                   <button className="mt-3 text-[#22c35d] font-extrabold underline underline-offset-4">
    //                     MENU
    //                   </button>
    //                 </CardContent>
    //               </Card>
    //             </Link>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </section>

    // <section className="mx-auto max-w-7xl px-4 py-16">
    //   <div className="container">
    //     <h2 className="mb-8 text-4xl font-antigua text-black font-bold">
    //       {text}
    //     </h2>

    //     <div
    //       id="listingCarousel"
    //       className="carousel slide relative"
    //       data-bs-ride="carousel"
    //     >
    //       <div className="carousel-inner">
    //         {slides.map((group, index) => (
    //           <div
    //             key={index}
    //             className={`carousel-item ${index === 0 ? "active" : ""}`}
    //           >
    //             <div className="grid gap-2  sm:grid-cols-2 lg:grid-cols-4">
    //               {group.map((item) => (
    //                 <Link key={item.id} to={`${item.href}`}>
    //                   <Card className="border-none shadow-md relative overflow-hidden">
    //                     <img
    //                       src={item.image}
    //                       alt="thumbnail"
    //                       className="absolute top-5 left-3 h-12 w-16 object-cover border-4 border-white shadow"
    //                     />

    //                     <Button className="absolute top-3 right-3 h-8 w-8 rounded-full backdrop-blur-md border bg-transparent border-white p-0 flex items-center justify-center">
    //                       <Heart className="h-5 w-5 fill-white text-white" />
    //                     </Button>

    //                     <img
    //                       src={item.image}
    //                       alt={item.title}
    //                       className="h-48 w-full object-cover"
    //                     />

    //                     <CardContent className="p-2">
    //                       <h6 className="w-fit font-sm font-bold text-gray-600">
    //                         {item.category}
    //                       </h6>

    //                       <h3 className="text-lg text-black font-bold font-luxury">
    //                         {item.title}
    //                       </h3>

    //                       <p className="text-xs font-bold truncate text-gray-600">
    //                         {item.subtitle}
    //                       </p>

    //                       <div className="flex mt-3">
    //                         {[1, 2, 3, 4, 5].map((star) => (
    //                           <Star
    //                             key={star}
    //                             className={`w-5 h-5 ${
    //                               star <= Math.round(item.rating)
    //                                 ? "fill-[#E6B65C] text-[#E6B65C]"
    //                                 : "text-[#E6B65C]"
    //                             }`}
    //                           />
    //                         ))}
    //                       </div>

    //                       <Button
    //                         variant="outline"
    //                         size="sm"
    //                         className="p-0 border-0 bg-transparent text-[#22c35d] font-extrabold underline underline-offset-4 decoration-[#23c55e] hover:text-[#4bd87d]"
    //                       >
    //                         MENU
    //                       </Button>
    //                     </CardContent>
    //                   </Card>
    //                 </Link>
    //               ))}
    //             </div>
    //           </div>
    //         ))}
    //       </div>

    //       {/* Left Button */}
    //       <button
    //         type="button"
    //         data-bs-target="#listingCarousel"
    //         data-bs-slide="prev"
    //         className="absolute top-1/2 -translate-y-1/2 -left-6 z-10
    //                    w-10 h-10 flex items-center justify-center
    //                    rounded-full bg-[#d0a439] text-white shadow-lg"
    //       >
    //         <ChevronLeft size={50} className="p-2" />
    //       </button>

    //       {/* Right Button */}
    //       <button
    //         type="button"
    //         data-bs-target="#listingCarousel"
    //         data-bs-slide="next"
    //         className="absolute top-1/2 -translate-y-1/2 -right-6 z-10
    //                    w-10 h-10 flex items-center justify-center
    //                    rounded-full bg-[#d0a439] text-white shadow-lg"
    //       >
    //         <ChevronRight size={50} className="p-2" />
    //       </button>
    //     </div>
    //   </div>
    // </section>
  );
}
