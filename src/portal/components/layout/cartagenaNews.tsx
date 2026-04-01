import { Button } from "@public/components/ui/button";

export default function NewsletterSection() {
  return (
    <section className="relative bg-cover bg-center" style={{ backgroundImage: "url('/assets/overlayed.png')" }}>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="container relative max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center text-white">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold uppercase font-antigua">
            Cartagena Newsletter
          </h2>

          <p className="my-4 text-xs sm:text-base md:text-xl opacity-90">
            Get the latest discounts, deals, coupons, news, & tips of Cartagena.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Input + Button */}
          <div className="flex bg-white rounded overflow-hidden p-1">
            <input
              type="email"
              placeholder="Email"
              className="flex-grow p-2 bg-white text-black placeholder:px-3"
            />

            <Button className="text-white hidden sm:block w-[250px] my-auto rounded px-6 py-2 font-bold bg-[#d0a439] hover:bg-[#b88f30]  transition-colors">
              Subscribe
            </Button>
          </div>
          <Button className="text-white  sm:hidden w-full my-auto rounded px-6 py-2 font-bold bg-[#d0a439] hover:bg-[#b88f30]  transition-colors">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}
// import React from "react";
// import { Button } from "@public/components/ui/button";

// export default function CartagenaNews() {
//   return (
//     <div className="overlayed-pic container-fluid p-3 text-light p-relative">
//       <div className="overlay">
//         <div className="container col-lg-8 col-md-8 col-12 mb-4 py-5 mb-md-0 m-auto text-center text-white">
//           <h2 className="fs-1 fw-bold ">CARTAGENA NEWSLETTER</h2>
//           <p className="fs-5 my-3">
//             Get the latest discounts, deals, coupons, news, & tips of Cartagena.
//           </p>
//           <div className="flex max-w-3xl mx-auto bg-white rounded overflow-hidden p-1">
//             <input
//               className="flex-grow p-2 bg-white text-black outline-none"
//               type="text"
//               placeholder="Search for Anything"
//             />
//             <Button className="text-white w-[250px] my-auto rounded px-6 py-2 font-bold bg-[#d0a439] hover:bg-[#b88f30] transition-colors">
//               Subscribe
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
