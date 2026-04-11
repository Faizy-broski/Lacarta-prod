import ListingPage from "@public/components/listings/ListingPage";
import { gastronomyData } from "@public/data/gastronomy.data";
import Hero from "@public/components/listings/Hero";
import PaginationListing from "@public/components/listings/PaginationListing";
import FeaturedListingsCarousel from "@public/components/listings/FeaturedListingsCarousel";
import { fetchPortalListings, fetchFeaturedCategoryListings } from "@/lib/listings.service";

export default async function Gastronomy() {
  const [listings, featured] = await Promise.all([
    fetchPortalListings('Gastronomy', 'Detailed-Gastronomy'),
    fetchFeaturedCategoryListings('Gastronomy', 'Detailed-Gastronomy'),
  ])

  return (
    <>
      {featured.length > 0
        ? <FeaturedListingsCarousel listings={featured} categoryLabel="Gastronomy" />
        : <Hero {...gastronomyData.hero} />
      }
      <PaginationListing premiumListings={listings} text="Premium Listing" />
      <ListingPage categories={listings} categoryName='Gastronomy' />
    </>
  );
}
