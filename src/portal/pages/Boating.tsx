import ListingPage from "@public/components/listings/ListingPage";
import { boatingData } from "@public/data/boating.data";
import Hero from "@public/components/listings/Hero";
import PaginationListing from "@public/components/listings/PaginationListing";
export default function Boating() {
  return (
    <>
      <Hero {...boatingData.hero} />
      <PaginationListing {...boatingData} />
      <ListingPage {...boatingData} />
    </>
  );
}
