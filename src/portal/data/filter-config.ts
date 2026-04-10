/**
 * filter-config.ts
 *
 * Client-defined filter groups for each listing module.
 * Each group maps to a set of tags stored in listing.category_tags (flat string[]).
 *
 * Filtering logic (in ListingPage):
 *   - Within a group: OR  (listing matches ANY selected value)
 *   - Between groups: AND (listing must satisfy ALL active groups)
 */

export interface FilterGroup {
  label: string
  options: string[]
}

export type ModuleFilters = FilterGroup[]

export const MODULE_FILTERS: Record<string, ModuleFilters> = {

  // ── Accommodations (Hotels) ──────────────────────────────────────────────────
  Hotels: [
    {
      label: 'Neighborhood',
      options: [
        'Historic Center',
        'Getsamani',
        'Boca Grande',
        'El Laguito',
        'Marbella/Cabrero',
        'Crespo',
        'Zona Norte',
        'Pie de la Popa',
        'Manga',
        'Castillo Grande',
      ],
    },
    {
      label: 'Type',
      options: ['Hotels', "BnB's", 'Glamping/Nature', 'Hostels', 'Motels'],
    },
    {
      label: 'Key Features',
      options: ['View', 'Colonial', 'Economical', 'Boutique', 'Luxury', 'Beach'],
    },
    {
      label: 'Services',
      options: [
        'Pet Friendly',
        'Front Desk',
        'Breakfast',
        'Airport Pickup',
        'Parking',
        'Laundry',
        'Loud Noise Allowed',
      ],
    },
    {
      label: 'Amenities',
      options: ['Gym', 'Spa', 'Strong WiFi', 'Pool', 'Hot Water', 'Kitchen', 'Thick Walls'],
    },
  ],

  // ── Gastronomy ───────────────────────────────────────────────────────────────
  Gastronomy: [
    {
      label: 'Neighborhood',
      options: [
        'Historic Center',
        'Getsamani',
        'Boca & Castillo Grande',
        'El Laguito',
        'Marbella/Cabrero',
        'Crespo',
        'Zona Norte',
        'Pie de la Popa',
        'Manga',
      ],
    },
    {
      label: 'Type',
      options: [
        'Arabic',
        'Italian',
        'Mexican',
        'Pizza',
        'Seafood/Fish',
        'Sushi',
        'BBQ',
        'Colombian',
        'Chinese',
        'Healthy',
        'Desserts',
        'Coffee',
        'Burgers',
        'Chicken',
        'Breakfast',
        'Sandwiches',
        'Asian',
        'Fast Food',
        'Peruvian',
        'Indian',
        'Fried Foods',
        'Drinks/Juices/Smoothies',
        'Caribbean',
      ],
    },
    {
      label: 'Atmosphere',
      options: [
        'Themed/Instagrammable',
        'Dinner Then Dance',
        'Live Show',
        'Unique Experience',
        'Garden',
        'Rooftop',
        'Terasse',
        'Lounge',
        'Fine Dining',
        'Happy Hour',
        'Tranquil Vibes',
        'Dress Code',
        'Romantic',
      ],
    },
    {
      label: 'Menu',
      options: [
        'Great Wine Selection',
        'Vegetarian',
        'Vegan',
        'Beers',
        'Great Selection of Cocktails',
        'Lunch Specials',
        'Gluten Free',
        'Brunch',
        'All You Can Eat',
        'Halal',
        'Kosher',
        'Dairy-Free',
        'Tapas',
        'Economical',
        'International',
        'Tasting Menu',
        'Smokehouse',
      ],
    },
    {
      label: 'Services & Amenities',
      options: [
        'Bar',
        'Sports on TV',
        'Delivery',
        'Bring Your Own Wine',
        'Smoking Area',
        'Wi-Fi Available',
        'Private Events',
        'Special Reservations',
        'Split Bills Accepted',
        'Takeout',
      ],
    },
    {
      label: 'Hours',
      options: ['Open Now', 'Open Sundays', 'Open 24H'],
    },
  ],

  // ── Beaches ──────────────────────────────────────────────────────────────────
  Beaches: [
    {
      label: 'Neighborhood',
      options: [
        'Historic Center',
        'Boca Grande',
        'Castillo Grande',
        'El Laguito',
        'Marbella/Cabrero',
        'Crespo',
        'Zona Norte',
        'Tierra Bomba',
        'Baru',
        'Islas Del Rosario',
      ],
    },
    {
      label: 'Key Features',
      options: [
        'Blue Waters',
        'Romantic',
        'Economical',
        'Resort',
        'White Sands',
        'Luxury',
        'Sunsets',
        'Party',
        'Peaceful',
        'Islands',
        'Family',
      ],
    },
    {
      label: 'Services',
      options: [
        'Food Included',
        'Chairs & Umbrella Included',
        'Travel By Boat',
        'Travel by Car',
        'Hotel Pickup',
        'Drinks Included',
      ],
    },
    {
      label: 'Amenities',
      options: [
        'WiFi',
        'Towels',
        'Showers',
        'Bathrooms',
        'Volleyball',
        'Paddleboard',
        'Jet Ski',
        'Snorkeling',
        'Aquarium Visit',
        'Bar',
        'DJ Music',
        'Pool',
        'Bike',
        'Restaurant',
      ],
    },
  ],

  // ── Activities ───────────────────────────────────────────────────────────────
  Activities: [
    {
      label: 'Type',
      options: ['Pool Days', 'Nightlife', 'Tours', 'Events', 'Boating'],
    },
    {
      label: 'Features',
      options: [
        'By Beach',
        'Colonial',
        'Instagrammable',
        'Amazing View',
        'Rooftop',
        'Garden',
      ],
    },
    {
      label: 'Services',
      options: [
        'Redeemable Ticket For Food & Drinks',
        'Resto',
        'Spa',
        'Music',
        'Big Groups',
      ],
    },
    {
      label: 'Amenities',
      options: [
        'Bar',
        'Lounge',
        'WiFi',
        'Jacuzzi',
        'Charging Plugs',
        'Beach Chairs',
        'Beds',
        'Tables',
        'Bathrooms',
        'Showers',
      ],
    },
    {
      label: 'Menu',
      options: [
        'Arabic',
        'Italian',
        'Mexican',
        'Pizza',
        'Seafood/Fish',
        'Sushi',
        'BBQ',
        'Colombian',
        'Chinese',
        'Healthy',
        'Desserts',
        'Coffee',
        'Burgers',
        'Chicken',
        'Breakfast',
        'Sandwiches',
        'Asian',
        'Fast Food',
        'Peruvian',
        'Indian',
        'Fried Foods',
        'Drinks/Juices/Smoothies',
        'Caribbean',
        'Vegetarian',
        'Vegan',
        'Beers',
        'Great Selection of Cocktails',
        'Dairy-Free',
        'Tapas',
      ],
    },
  ],

  // ── Boating ──────────────────────────────────────────────────────────────────
  Boating: [
    {
      label: 'Neighborhood',
      options: [
        'Historic Center',
        'Getsamani',
        'Boca Grande',
        'El Laguito',
        'Marbella/Cabrero',
        'Crespo',
        'Zona Norte',
        'Pie de la Popa',
        'Manga',
        'Castillo Grande',
        'Baru',
        'Islas Del Rosario',
      ],
    },
  ],

  // ── Music / NightLife ─────────────────────────────────────────────────────────
  Music: [
    {
      label: 'Neighborhood',
      options: [
        'Historic Center',
        'Getsamani',
        'Boca Grande',
        'El Laguito',
        'Marbella/Cabrero',
        'Crespo',
        'Zona Norte',
        'Pie de la Popa',
        'Manga',
      ],
    },
  ],

  // ── Real Estate ───────────────────────────────────────────────────────────────
  'Real Estate': [
    {
      label: 'Neighborhood',
      options: [
        'Historic Center',
        'Getsamani',
        'Boca Grande',
        'El Laguito',
        'Marbella/Cabrero',
        'Crespo',
        'Zona Norte',
        'Pie de la Popa',
        'Manga',
        'Castillo Grande',
      ],
    },
  ],
}

/** Helper: get the "Type" group options for a module (used for quick-type pills) */
export function getTypeOptions(categoryName: string): string[] {
  const groups = MODULE_FILTERS[categoryName] ?? []
  return groups.find((g) => g.label === 'Type')?.options ?? []
}

/** Helper: get the "Neighborhood" group options for a module */
export function getNeighborhoodOptions(categoryName: string): string[] {
  const groups = MODULE_FILTERS[categoryName] ?? []
  return groups.find((g) => g.label === 'Neighborhood')?.options ?? []
}
