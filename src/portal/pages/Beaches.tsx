import ListingPage from "@public/components/listings/ListingPage";
import { beachesData } from "@public/data/beaches.data";
import Hero from "@public/components/listings/Hero";
import PaginationListing from "@public/components/listings/PaginationListing";
import { fetchPortalListings } from "@/lib/listings.service";

export default async function Beaches() {
  const listings = await fetchPortalListings('Beaches', 'Detailed-Beach')

  return (
    <>
      <Hero {...beachesData.hero} />
      <PaginationListing premiumListings={listings} text="Premium Listing" />
      <ListingPage categories={listings} categoryName='Beaches' />
    </>
  );
}
