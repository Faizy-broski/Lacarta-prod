/**
 * listing-tags.ts
 *
 * Mirrors the tag data seeded in 013_seed_category_attributes.sql.
 * Used by:
 *   - Portal filter panels (to render filter chip groups)
 *   - Listing form MultiSelectAttr (as fallback / offline reference)
 *
 * The live source of truth for the form is the Supabase
 * category_attributes table. These constants are for portal-side
 * filtering and type safety.
 */

// ─── Shared Cartagena neighborhoods ──────────────────────────────────────────

export const CARTAGENA_NEIGHBORHOODS = [
  'Historic Center',
  'Getsemaní',
  'Boca Grande',
  'El Laguito',
  'Marbella/Cabrero',
  'Crespo',
  'Zona Norte',
  'Pie de la Popa',
  'Manga',
  'Castillo Grande',
] as const

export const BEACH_NEIGHBORHOODS = [
  ...CARTAGENA_NEIGHBORHOODS,
  'Tierra Bomba',
  'Barú',
  'Islas del Rosario',
] as const

// ─── Hotels ──────────────────────────────────────────────────────────────────

export const HOTELS_KEY_FEATURES = [
  'View',
  'Colonial',
  'Economical',
  'Boutique',
  'Luxury',
  'Beach',
] as const

export const HOTELS_SERVICES = [
  'Pet Friendly',
  'Front Desk',
  'Breakfast',
  'Airport Pickup',
  'Parking',
  'Laundry',
  'Loud Noise Allowed',
] as const

export const HOTELS_AMENITIES = [
  'Gym',
  'Spa',
  'Strong WiFi',
  'Pool',
  'Hot Water',
  'Kitchen',
  'Thick Walls',
] as const

// ─── Gastronomy ───────────────────────────────────────────────────────────────

export const GASTRONOMY_TYPES = [
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
] as const

export const GASTRONOMY_ATMOSPHERE = [
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
] as const

export const GASTRONOMY_MENU = [
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
  'International',
  'Tasting Menu',
  'Smokehouse',
] as const

export const GASTRONOMY_SERVICES = [
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
  'Open Sundays',
  'Open 24H',
] as const

// ─── Beaches ─────────────────────────────────────────────────────────────────

export const BEACHES_KEY_FEATURES = [
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
] as const

export const BEACHES_SERVICES = [
  'Food Included',
  'Chairs & Umbrella Included',
  'Travel By Boat',
  'Travel By Car',
  'Hotel Pickup',
  'Drinks Included',
] as const

export const BEACHES_AMENITIES = [
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
] as const

// ─── Activities / Pool Days ───────────────────────────────────────────────────

export const ACTIVITIES_TYPES = [
  'Pool Days',
  'Nightlife',
  'Tours',
  'Events',
  'Boating',
] as const

// Activities filter tags — grouped by subcategory
export const ACTIVITIES_FILTER_GROUPS = {
  Nautical:   ['Scuba', 'Kite Surfing', 'Surfing', 'Jet Ski', 'Snorkeling'],
  'Well Being': ['Meditation', 'Beauty', 'Massage', 'Spa', 'Reading', 'Yoga', 'Gym'],
  Events:     ['Concerts', 'Theatre', 'Orchestra', 'Conferences'],
  Culture:    ['Food Tasting', 'Dancing', 'Museums', 'Alcohol Tasting', 'Community'],
  Sports:     ['Soccer', 'Biking', 'Boxing', 'ATV', 'Golf'],
  Tours:      ['Volcano', 'Walking Tour', 'Bike Tour', 'Aquarium', 'Boat Tour', 'Park Tour', 'Bus Tour'],
  Nightlife:  ['Dating', 'Bars', 'Party Bus', 'Nightclubs', 'Rooftops'],
} as const

export const POOL_DAYS_KEY_FEATURES = [
  'By Beach',
  'Colonial',
  'Instagrammable',
  'Amazing View',
  'Rooftop',
  'Garden',
] as const

export const POOL_DAYS_SERVICES = [
  'Redeemable Ticket for Food & Drinks',
  'Restaurant on Site',
  'Spa',
  'Music',
  'Big Groups',
] as const

export const POOL_DAYS_AMENITIES = [
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
  'Pool',
] as const

export const POOL_DAYS_MENU = [
  ...GASTRONOMY_TYPES,
  'Vegetarian',
  'Vegan',
  'Beers',
  'Great Selection of Cocktails',
  'Dairy-Free',
  'Tapas',
] as const

// ─── Boating ─────────────────────────────────────────────────────────────────

export const BOATING_NEIGHBORHOODS = [
  'Boca Grande',
  'Castillo Grande',
  'El Laguito',
  'Tierra Bomba',
  'Barú',
  'Islas del Rosario',
  'Zona Norte',
] as const

export const BOATING_KEY_FEATURES = [
  'Peaceful',
  'Islands',
  'Family',
  'Party',
  'Sunsets',
  'Luxury',
] as const

export const BOATING_SERVICES = [
  'Food Included',
  'Drinks Included',
  'Hotel Pickup',
] as const

export const BOATING_AMENITIES = [
  'Snorkeling',
  'Paddleboard',
  'Jet Ski',
  'Bar',
  'WiFi',
] as const

// ─── Consolidated portal filter map ──────────────────────────────────────────
// Used by portal filter panels to render the correct chips per category.

export const PORTAL_FILTERS = {
  hotels: {
    neighborhoods: CARTAGENA_NEIGHBORHOODS,
    key_features:  HOTELS_KEY_FEATURES,
    services:      HOTELS_SERVICES,
    amenities:     HOTELS_AMENITIES,
  },
  gastronomy: {
    neighborhoods: CARTAGENA_NEIGHBORHOODS,
    key_features:  GASTRONOMY_TYPES,
    atmosphere:    GASTRONOMY_ATMOSPHERE,
    menu:          GASTRONOMY_MENU,
    services:      GASTRONOMY_SERVICES,
  },
  beaches: {
    neighborhoods: BEACH_NEIGHBORHOODS,
    key_features:  BEACHES_KEY_FEATURES,
    services:      BEACHES_SERVICES,
    amenities:     BEACHES_AMENITIES,
  },
  activities: {
    neighborhoods: CARTAGENA_NEIGHBORHOODS,
    key_features:  POOL_DAYS_KEY_FEATURES,
    services:      POOL_DAYS_SERVICES,
    amenities:     POOL_DAYS_AMENITIES,
    menu:          POOL_DAYS_MENU,
  },
  boating: {
    neighborhoods: BOATING_NEIGHBORHOODS,
    key_features:  BOATING_KEY_FEATURES,
    services:      BOATING_SERVICES,
    amenities:     BOATING_AMENITIES,
  },
} as const
