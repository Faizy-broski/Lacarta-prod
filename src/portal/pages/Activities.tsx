import ListingPage from "@public/components/listings/ListingPage";
import { activitiesData } from "@public/data/activities.data";
import Hero from "@public/components/listings/Hero";
import PaginationListing from "@public/components/listings/PaginationListing";
import FeaturedListingsCarousel from "@public/components/listings/FeaturedListingsCarousel";
import { fetchPortalListings, fetchFeaturedCategoryListings } from "@/lib/listings.service";

export default async function Activities() {
  const [listings, featured] = await Promise.all([
    fetchPortalListings('Activities', 'Detailed-Activity'),
    fetchFeaturedCategoryListings('Activities', 'Detailed-Activity'),
  ])

  return (
    <>
      {featured.length > 0
        ? <FeaturedListingsCarousel listings={featured} categoryLabel="Activities" />
        : <Hero {...activitiesData.hero} />
      }
      <PaginationListing premiumListings={listings} text="Premium Listing" />
      <ListingPage categories={listings} categoryName='Activities' />
    </>
  );
}
