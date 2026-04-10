import ListingPage from "@public/components/listings/ListingPage";
import { hotelsData } from "@public/data/hotels.data";
import Hero from "@public/components/listings/Hero";
import PaginationListing from "@public/components/listings/PaginationListing";
import { fetchPortalListings } from "@/lib/listings.service";
import { ChevronDown } from "lucide-react";

export default async function Hotels() {
  const listings = await fetchPortalListings('Hotels', 'Detailed-Hotel')

  return (
    <>
      <Hero {...hotelsData.hero} />
      <PaginationListing premiumListings={listings} text="Premium Listing" />
      <ListingPage categories={listings} categoryName='Hotels' />
    </>
  );
}
