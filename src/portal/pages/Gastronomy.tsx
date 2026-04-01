import ListingPage from "@public/components/listings/ListingPage";
import { gastronomyData } from "@public/data/gastronomy.data";
import Hero from "@public/components/listings/Hero";
import PaginationListing from "@public/components/listings/PaginationListing";

export default function Gastronomy() {
  return (
    <>
      <Hero {...gastronomyData.hero} />
      <PaginationListing {...gastronomyData} />
      <ListingPage {...gastronomyData} />
    </>
  );
}
