import ListingPage from "@public/components/listings/ListingPage";
import { activitiesData } from "@public/data/activities.data";
import Hero from "@public/components/listings/Hero";
import PaginationListing from "@public/components/listings/PaginationListing";

export default function Activities() {
  return (
    <>
      <Hero {...activitiesData.hero} />
      <PaginationListing
        premiumListings={activitiesData.eliteListings}
        text={"Elite Listing"}
      />
      <PaginationListing {...activitiesData} />
      <ListingPage {...activitiesData} />
    </>
  );
}
