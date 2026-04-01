const guidepic = "/assets/img13.png";
import {Button} from "@public/components/ui/button"
import { BookingDialog } from "@public/components/bookingForm";
import { useState } from "react";

export default function ConciergeCTA() {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  return (
    <div className="w-full bg-cover bg-center py-12 md:py-20" style={{ backgroundImage: "url('/Rectangle1.png')" }}>
<BookingDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white flex flex-col md:flex-row items-center gap-8 p-6 md:p-8 shadow-lg">
          {/* Left Content */}
          <div className="w-full md:w-7/12 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-5xl leading-snug md:leading-relaxed font-antigua font-semibold text-black">
              Concierge Cartagena Travel Guides
            </h2>

            <p className="text-base md:text-lg my-4 md:my-6 text-black">
              From flights, accommodations, stays, and activities. You’re in
              safe hands with our team!
            </p>

            <Button
onClick={() => setDialogOpen(true)}
              className="w-full py-3 rounded-sm font-bold text-white 
          bg-gradient-to-r from-gold to-gold-light 
          hover:brightness-110 transition"
            >
              BOOK TRIP
            </Button>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-5/12">
            <img
              src={guidepic}
              alt="Guide Photo"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
    // <>
    //   <div className="w-full bg-cover bg-center  py-20 hidden md:block" style={{backgroundImage:"url('/Rectangle1.png')"}}>

    //     <div className="max-w-6xl mx-auto px-6">
    //       <div className="bg-white   flex items-center gap-8 p-8">
    //         {/* Left Content */}
    //         <div className="w-7/12">
    //           <h2 className="text-5xl leading-relaxed font-antigua font-semibold text-black">
    //             Concierge Cartagena Travel Guides
    //           </h2>

    //           <p className="text-lg my-6 text-black">
    //             From flights, accommodations, stays, and activities. Your in
    //             safe hands with our team!
    //           </p>

    //           <button className="w-full py-3 rounded-sm font-bold text-white  bg-gradient-to-r from-gold to-gold-light hover:brightness-110 transition">
    //             BOOK TRIP
    //           </button>
    //         </div>

    //         {/* Right Image */}
    //         <div className="w-5/12 flex justify-end">
    //           <img src={guidepic} alt="Guide Photo" className="object-cover" />
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* MOBILE VIEW */}
    //   <div className="block md:hidden">
    //     <img src={guidepic} alt="Guide Photo" className="w-full object-cover" />

    //     <div className="px-4 mt-6">
    //       <div className="bg-white p-5 text-center rounded-xl shadow-md">
    //         <h2 className="text-xl font-semibold">
    //           Concierge Cartagena Travel Guides
    //         </h2>

    //         <p className="mt-4 text-base">
    //           From flights, accommodations, stays, and activities. You’re in
    //           safe hands with our team!
    //         </p>

    //         <button className="w-full mt-5 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-gold  to-gold-light hover:brightness-110 transition">
    //           BOOK TRIP
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </>
    // <>

    // <div className="container-fluid p-5 backgroud-image2 d-none d-md-block">
    //   <div className="container">
    //     <div className="row bg-white py-4 px-3 shadow rounded">
    //       {/* Left content */}
    //       <div className="col-md-7">
    //         <h2 className="text-2xl text-black font-semibold">
    //           Concierge Cartagena Travel Guides
    //         </h2>
    //         <p className="fs-5 my-4 text-black">
    //           From flights, accommodations, stays, and activities. You’re in
    //           safe hands with our team!
    //         </p>
    //         <button className="btn text-light font-bold bg-gradient-to-r from-[#E6B65C] via-[#D4A74A] to-[#B8902F] hover:brightness-110 btn-md w-100">
    //           BOOK TRIP
    //         </button>
    //       </div>

    //       {/* Right image */}
    //       <div className="col-md-5 text-end">
    //         <img
    //           src={guidepic}
    //           alt="Guide Photo"
    //           className="img-fluid rounded"
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    //   {/* MOBILE VIEW */}
    //   <div className="container-fluid p-0 d-block d-md-none">
    //     <img src={guidepic} alt="Guide Photo" className="img-fluid w-100" />
    //     <div className="container mt-3">
    //       <div className="bg-white text-center p-3">
    //         <h2>Concierge Cartagena Travel Guides</h2>
    //         <p className="px-5">
    //           From flights, accommodations, stays, and activities. You’re in
    //           safe hands with our team!
    //         </p>
    //         <button className="btn c2 font-bold text-light btn-md w-100">
    //           BOOK TRIP
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}
