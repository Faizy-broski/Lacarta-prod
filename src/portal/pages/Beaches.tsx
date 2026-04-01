import ListingPage from "@public/components/listings/ListingPage";
import { beachesData } from "@public/data/beaches.data";
import Hero from "@public/components/listings/Hero";
import PaginationListing from "@public/components/listings/PaginationListing";

export default function Beaches() {
  return (
    <>
      <Hero {...beachesData.hero} />
      <PaginationListing {...beachesData} />
      <ListingPage {...beachesData} />
    </>
  );
}
