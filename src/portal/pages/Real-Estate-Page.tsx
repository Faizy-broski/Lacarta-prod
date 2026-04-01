// import React from "react";
// import EstateHero from "@public/components/real-estate/realEstate-hero";
// import EstateThemes from "@public/components/real-estate/EstateThemes";

// export default function RealestatePage() {
//   return (
//     <>
//       <div className="bg-[#f7f7f7] px-3 px-md-5">
//         <div className="mx-auto max-w-7xl md:px-4">
//           <EstateHero />
//           <EstateThemes />
//         </div>
//       </div>
//     </>
//   );
// }

import React from "react";
import EstateHero from "../components/real-estate/realEstate-hero";
import EstateThemes from "../components/real-estate/EstateThemes";
import Neighborhoods from "../components/real-estate/scroll-Images";
import WaltSection from "../components/real-estate/Walt-Slider";
import EstateCard from "@public/components/card/RealEstate-Card";
import { realEsteteData } from "@public/data/real-estate-page";
import CartagenaNews from "@public/components/layout/cartagenaNews";

export default function RealestatePage() {
  return (
    <>
      <div className=" px-3 px-md-5">
        <div className="mx-auto max-w-7xl md:px-4">
          <div className="md:px-9 md:py-2">
            <EstateHero />
          </div>
          <EstateThemes />
          <Neighborhoods />
          <WaltSection />
          <EstateCard
            {...realEsteteData}
            columns={"grid gap-6  md:grid-cols-3 sm:grid-cols-2 "}
          />
        </div>
      </div>
      <CartagenaNews />
    </>
  );
}
