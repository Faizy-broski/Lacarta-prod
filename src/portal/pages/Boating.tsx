import ListingPage from "@public/components/listings/ListingPage";
import { boatingData } from "@public/data/boating.data";
import Hero from "@public/components/listings/Hero";
import PaginationListing from "@public/components/listings/PaginationListing";
import FeaturedListingsCarousel from "@public/components/listings/FeaturedListingsCarousel";
import { fetchPortalListings, fetchFeaturedCategoryListings } from "@/lib/listings.service";

export default async function Boating() {
  const [listings, featured] = await Promise.all([
    fetchPortalListings('Boating', 'Detailed-Boating'),
    fetchFeaturedCategoryListings('Boating', 'Detailed-Boating'),
  ])

  return (
    <>
      {featured.length > 0
        ? <FeaturedListingsCarousel listings={featured} categoryLabel="Boating" />
        : <Hero {...boatingData.hero} />
      }
      <PaginationListing premiumListings={listings} text="Premium Listing" />
      <ListingPage categories={listings} categoryName='Boating' />
    </>
  );
}
