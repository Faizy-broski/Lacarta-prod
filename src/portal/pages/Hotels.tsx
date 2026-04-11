import ListingPage from "@public/components/listings/ListingPage";
import { hotelsData } from "@public/data/hotels.data";
import Hero from "@public/components/listings/Hero";
import PaginationListing from "@public/components/listings/PaginationListing";
import FeaturedListingsCarousel from "@public/components/listings/FeaturedListingsCarousel";
import { fetchPortalListings, fetchFeaturedCategoryListings } from "@/lib/listings.service";
import { ChevronDown } from "lucide-react";

export default async function Hotels() {
  const [listings, featured] = await Promise.all([
    fetchPortalListings('Hotels', 'Detailed-Hotel'),
    fetchFeaturedCategoryListings('Hotels', 'Detailed-Hotel'),
  ])

  return (
    <>
      {featured.length > 0
        ? <FeaturedListingsCarousel listings={featured} categoryLabel="Hotels" />
        : <Hero {...hotelsData.hero} />
      }
      <PaginationListing premiumListings={listings} text="Premium Listing" />
      <ListingPage categories={listings} categoryName='Hotels' />
    </>
  );
}
