import { useState } from "react";
// import carasolePic from "../assets/carasole.png";
const carasolePic = "/assets/ncartagen.png";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Card } from "@public/components/ui/card";
import { Button } from "@public/components/ui/button";

const slides = [
  {
    image: carasolePic,
    title: "The Most Luxurious Hotel Of Cartagena",
    read: "7 MIN READ",
  },
  {
    image: carasolePic,
    title: "The Most Comfortable Hotel Of Cartagena",
    read: "10 MIN READ",
  },
  {
    image: carasolePic,
    title: "The Best Hotel Of Cartagena",
    read: "15 MIN READ",
  },
];

export default function TopNewsCartagena() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));

  const next = () => setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1));
  return (
    <>
      <div className="text-center mb-7 mt-10 md:mt-20">
        <h2 className="text-3xl md:text-4xl font-black font-antigua text-black text-center uppercase mb-10">
          Top News Of Cartagena
        </h2>
      </div>
      <section className="container mb-5 mx-auto pb-13 px-10 md:px-16 md:py-16">
        {/* Section Title */}
        {/* <h2 className="text-4xl font-black text-center font-antigua uppercase mb-16">
        
      </h2> */}

        <div className="max-w-7xl mx-auto  px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-12 items-center">
            {/* LEFT SIDE - HERO CAROUSEL */}
            <div className="md:col-span-12 lg:col-span-8 relative">
              <Card className="relative overflow-hidden rounded-2xl shadow-none border-0">
                <img
                  src={slides[current].image}
                  alt="Slide"
                  className="w-full h-[320px] sm:h-[420px] md:h-[560px] object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                  <div className="p-5 sm:p-8 md:p-10 text-white">
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-semibold font-antigua leading-snug md:leading-tight max-w-2xl">
                      {slides[current].title}
                    </h2>

                    <p className="mt-3 md:mt-6 sm:text-sm text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-90">
                      {slides[current].read}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Navigation Arrows */}
              <button
                onClick={prev}
                className="absolute left-3 sm:left-5 md:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition"
              >
                <ChevronLeft size={28} className="md:hidden" />
                <ChevronLeft size={42} className="hidden md:block" />
              </button>

              <button
                onClick={next}
                className="absolute right-3 sm:right-5 lg:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition"
              >
                <ChevronRight size={28} className="md:hidden" />
                <ChevronRight size={42} className="hidden md:block" />
              </button>
            </div>

            {/* RIGHT SIDE - ARTICLE LIST */}
            <div className="md:col-span-12 lg:col-span-4 space-y-8 md:space-y-14">
              {[
                {
                  ttile: "the most luxurious hotel of cartagena",
                  category: "Accommodations - Hotel",
                },
                {
                  ttile:
                    "Want To Exercise? The Best Spots For All Types Of Workouts",
                  category: "Activities - Gyms",
                },
                {
                  ttile: "the top 7 instagrammable places of cartagena",
                  category: "Activities - Culture",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center  mt-10 lg:mt-0"
                >
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {item.category}
                    </p>

                    <h4 className="font-semibold font-antigua text-black text-base capitalize sm:text-lg my-2 leading-snug">
                      {item.ttile}
                    </h4>

                    <p className="text-xs sm:text-sm text-black">3 Min Read</p>
                  </div>

                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full border border-2 shrink-0  p-5 bg-transparent border-yellow-400 text-yellow-400  hover:bg-yellow-400 hover:text-white transition"
                  >
                    <ArrowRight className="w-8 h-8 " />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
    // <section className="d-none d-md-block py-5">
    //   <h2 className="text-3xl md:text-4xl font-black text-black text-center uppercase mb-16">
    //     TOP NEWS OF CARTAGENA
    //   </h2>
    //   <div className="container">
    //     <div className="row align-items-center">
    //       <div className="col-lg-8 col-md-7">
    //         <div
    //           id="imageCarousel"
    //           className="carousel slide"
    //           data-bs-ride="carousel"
    //         >
    //           <div className="carousel-inner rounded overflow-hidden">
    //             <div className="carousel-item active relative">
    //               <img
    //                 src={carasolePic}
    //                 className="d-block w-100"
    //                 alt="Slide 1"
    //               />

    //               <div className="absolute inset-0 flex bg-gradient-to-t from-black/40 via-black/20 to-transparent items-end">
    //                 <div className="p-6 md:p-10 text-white">
    //                   <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
    //                     The Most Luxurious Hotel <br />
    //                     Of Cartagena
    //                   </h2>

    //                   <p className="mt-3 text-sm tracking-widest uppercase opacity-90">
    //                     7 MIN READ
    //                   </p>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="carousel-item relative">
    //               <img
    //                 src={carasolePic}
    //                 className="d-block w-100"
    //                 alt="Slide 2"
    //               />
    //               <div className="absolute inset-0 flex bg-gradient-to-t from-black/40 via-black/20 to-transparent items-end">
    //                 <div className="p-6 md:p-10 text-white">
    //                   <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
    //                     The Most Luxurious Hotel <br />
    //                     Of Cartagena
    //                   </h2>

    //                   <p className="mt-3 text-sm tracking-widest uppercase opacity-90">
    //                     7 MIN READ
    //                   </p>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="carousel-item relative">
    //               <img
    //                 src={carasolePic}
    //                 className="d-block w-100"
    //                 alt="Slide 3"
    //               />
    //               <div className="absolute inset-0 flex bg-gradient-to-t from-black/40 via-black/20 to-transparent items-end">
    //                 <div className="p-6 md:p-10 text-white">
    //                   <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
    //                     The Most Luxurious Hotel <br />
    //                     Of Cartagena
    //                   </h2>

    //                   <p className="mt-3 text-sm tracking-widest uppercase opacity-90">
    //                     7 MIN READ
    //                   </p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           <button
    //             className="carousel-control-prev"
    //             type="button"
    //             data-bs-target="#imageCarousel"
    //             data-bs-slide="prev"
    //           >
    //             <ChevronLeft size={50} />
    //           </button>

    //           <button
    //             className="carousel-control-next"
    //             type="button"
    //             data-bs-target="#imageCarousel"
    //             data-bs-slide="next"
    //           >
    //             <ChevronRight size={50} />
    //           </button>
    //         </div>
    //       </div>

    //       {/* Content */}
    //       <div className="col-lg-4 col-md-5 mt-4 mt-md-0">
    //         <div className="d-flex my-5 align-items-center">
    //           <div>
    //             <span>Accomodation - Hotels</span>
    //             <h5 className="fw-bold my-2 text-black">
    //               the most luxurious hotel of cartagena
    //             </h5>
    //             <span>3 Min Read</span>
    //           </div>
    //           <div>
    //             <button className="btn fs-2 fw-bold">
    //               <i className="bi bi-arrow-right-circle text-[#d0a439] hover:text-[#b88f30]"></i>
    //             </button>
    //           </div>
    //         </div>

    //         <div className="d-flex my-5 align-items-center">
    //           <div>
    //             <span>Accomodation - Hotels</span>
    //             <h5 className="fw-bold my-2 text-black">
    //               Want To Exercise? The Best Spots For All Types Of Workouts
    //             </h5>
    //             <span>3 Min Read</span>
    //           </div>
    //           <div>
    //             <button className="btn fs-2 fw-bold">
    //               <i className="bi bi-arrow-right-circle text-[#d0a439] hover:text-[#b88f30]"></i>
    //             </button>
    //           </div>
    //         </div>

    //         <div className="d-flex my-5 align-items-center">
    //           <div>
    //             <span>Accomodation - Hotels</span>
    //             <h5 className="fw-bold my-2 text-black">
    //               the top 7 instagrammable places of cartagena
    //             </h5>
    //             <span>3 Min Read</span>
    //           </div>
    //           <div>
    //             <button className="btn fs-2 fw-bold">
    //               <i className="text-[#d0a439] hover:text-[#b88f30] bi bi-arrow-right-circle"></i>
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}
