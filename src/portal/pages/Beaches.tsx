import ListingPage from "@public/components/listings/ListingPage";
import { beachesData } from "@public/data/beaches.data";
import Hero from "@public/components/listings/Hero";
import PaginationListing from "@public/components/listings/PaginationListing";
import FeaturedListingsCarousel from "@public/components/listings/FeaturedListingsCarousel";
import { fetchPortalListings, fetchFeaturedCategoryListings } from "@/lib/listings.service";

export default async function Beaches() {
  const [listings, featured] = await Promise.all([
    fetchPortalListings('Beaches', 'Detailed-Beach'),
    fetchFeaturedCategoryListings('Beaches', 'Detailed-Beach'),
  ])

  return (
    <>
      {featured.length > 0
        ? <FeaturedListingsCarousel listings={featured} categoryLabel="Beaches" />
        : <Hero {...beachesData.hero} />
      }
      <PaginationListing premiumListings={listings} text="Premium Listing" />
      <ListingPage categories={listings} categoryName='Beaches' />
    </>
  );
}
