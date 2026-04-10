import ListingPage from "@public/components/listings/ListingPage";
import { gastronomyData } from "@public/data/gastronomy.data";
import Hero from "@public/components/listings/Hero";
import PaginationListing from "@public/components/listings/PaginationListing";
import { fetchPortalListings } from "@/lib/listings.service";

export default async function Gastronomy() {
  const listings = await fetchPortalListings('Gastronomy', 'Detailed-Gastronomy')

  return (
    <>
      <Hero {...gastronomyData.hero} />
      <PaginationListing premiumListings={listings} text="Premium Listing" />
      <ListingPage categories={listings} categoryName='Gastronomy' />
    </>
  );
}
