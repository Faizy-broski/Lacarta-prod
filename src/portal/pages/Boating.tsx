import ListingPage from "@public/components/listings/ListingPage";
import { boatingData } from "@public/data/boating.data";
import Hero from "@public/components/listings/Hero";
import PaginationListing from "@public/components/listings/PaginationListing";
import { fetchPortalListings } from "@/lib/listings.service";

export default async function Boating() {
  const listings = await fetchPortalListings('Boating', 'Detailed-Boating')

  return (
    <>
      <Hero {...boatingData.hero} />
      <PaginationListing premiumListings={listings} text="Premium Listing" />
      <ListingPage categories={listings} categoryName='Boating' />
    </>
  );
}
