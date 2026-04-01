import ListingPage from "@public/components/listings/ListingPage";
import { realEstateData } from "@public/data/realEstate.data";
import Hero from "@public/components/listings/Hero";
import PaginationListing from "@public/components/listings/PaginationListing";
import { ChevronDown } from "lucide-react";

export default function RealEstate() {
  return (
    <>
      <Hero {...realEstateData.hero} />

      {/* SCROLL indicator */}
      <div className="flex flex-col items-center justify-center py-4 gap-1 cursor-pointer hover:opacity-70 transition" style={{ color: "#000" }}>
        <span className="text-xs font-bold tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} />
      </div>

      <PaginationListing {...realEstateData} />
      <ListingPage {...realEstateData} />
    </>
  );
}
