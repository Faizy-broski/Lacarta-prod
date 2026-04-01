import ListingPage from "@public/components/listings/ListingPage";
import { hotelsData } from "@public/data/hotels.data";
import Hero from "@public/components/listings/Hero";
import PaginationListing from "@public/components/listings/PaginationListing";

export default function Hotels() {
  return (
    <>
      <Hero {...hotelsData.hero} />
      <PaginationListing {...hotelsData} />
      <ListingPage {...hotelsData} />
    </>
  );
}
