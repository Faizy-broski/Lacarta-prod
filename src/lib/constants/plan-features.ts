/**
 * plan-features.ts
 *
 * Defines which feature slugs are available at each subscription tier,
 * per category group. Used by useListingPlan to gate form sections and
 * dashboard modules for Client-role users.
 *
 * Tiers are CUMULATIVE — each tier includes all features from tiers below it.
 *
 * Category groups:
 *   HOTELS      — Hotels & Resorts
 *   BEACHES     — Beaches
 *   ACTIVITIES  — Activities (Pools subcategory)
 *   BOATING     — Boating (includes Activities features + boating-specific)
 *   GASTRONOMY  — Gastronomy + Nightlife (Activities subcategory)
 *   REAL_ESTATE — Real Estate
 */

export type FeatureSlug =
  // ── Universal FREE ──────────────────────────────────────────────────────────
  | 'basic_info'
  | 'featured_image'
  | 'social_sharing'
  | 'category_tags'
  | 'favorites_save'
  | 'search_filter'
  | 'dashboard_access'
  // ── Real Estate FREE extras ─────────────────────────────────────────────────
  | 're_specs'
  | 're_availability'
  | 're_pricing_details'
  | 're_reviews_free'
  | 're_feature_tags'
  // ── Universal STANDARD ──────────────────────────────────────────────────────
  | 'gallery'
  | 'about_description'
  | 'address_map'
  | 'analytics'
  | 'reviews'
  | 'notifications'
  | 'services_amenities'
  | 'third_party_links'
  // ── Category STANDARD ───────────────────────────────────────────────────────
  | 'weekly_hours'        // Hotels
  | 'start_end_time'      // Activities, Beaches, Boating
  | 'road_map'            // Activities, Boating
  | 'travel_tips'         // Activities, Beaches
  | 'boating_info'        // Boating only
  | 'menu'                // Gastronomy
  | 'menu_qr_code'        // Gastronomy
  | 'menu_file'           // Gastronomy
  | 'hours_status'        // Gastronomy
  | 'book_with_us'        // Gastronomy
  | 'atmosphere'          // Gastronomy
  | 're_full_description' // Real Estate
  | 're_developer_info'   // Real Estate
  | 're_contact_forms'    // Real Estate
  | 're_lead_notifications'// Real Estate
  // ── Universal PREMIUM ───────────────────────────────────────────────────────
  | 'company_contact'
  | 'social_handles'
  | 'faqs'
  | 'deals_page'
  | 'newsletter_deals'
  | 'sponsored_premium_cat'
  | 'sponsored_premium_listings'
  // ── Category PREMIUM ────────────────────────────────────────────────────────
  | 'direct_links'        // Hotels, Beaches
  | 'also_available_on'   // Activities, Boating, Gastronomy
  | 'featured_in'         // Gastronomy
  | 're_blueprint'        // Real Estate
  | 're_video_uploads'    // Real Estate
  | 're_contact_details'  // Real Estate
  | 're_promotions'       // Real Estate
  | 're_appointment'      // Real Estate
  | 're_website_cta'      // Real Estate
  // ── Universal ELITE ─────────────────────────────────────────────────────────
  | 'article_creation'
  | 'events_listing'
  | 'shoutouts'
  | 'sponsored_elite_search'
  | 'sponsored_elite_home'
  | 'sponsored_elite_category'
  | 'sponsored_elite_blog'

export type PlanTier = 'free' | 'standard' | 'premium' | 'elite'

export type CategoryGroup =
  | 'hotels'
  | 'beaches'
  | 'activities'
  | 'boating'
  | 'gastronomy'
  | 'real_estate'

// ─── Feature sets per tier (cumulative sets) ─────────────────────────────────

const UNIVERSAL_FREE: FeatureSlug[] = [
  'basic_info', 'featured_image', 'social_sharing', 'category_tags',
  'favorites_save', 'search_filter', 'dashboard_access', 'address_map',
]

const UNIVERSAL_STANDARD: FeatureSlug[] = [
  'gallery', 'about_description', 'analytics', 'reviews',
  'notifications', 'services_amenities', 'third_party_links',
]

const UNIVERSAL_PREMIUM: FeatureSlug[] = [
  'company_contact', 'social_handles', 'faqs', 'deals_page', 'newsletter_deals',
  'sponsored_premium_cat', 'sponsored_premium_listings',
]

const UNIVERSAL_ELITE: FeatureSlug[] = [
  'article_creation', 'events_listing', 'shoutouts',
  'sponsored_elite_search', 'sponsored_elite_home',
  'sponsored_elite_category', 'sponsored_elite_blog',
]

// ─── Per-category feature maps ───────────────────────────────────────────────
// Each entry lists ALL features available at that tier (cumulative from free up)

const HOTELS_FEATURES: Record<PlanTier, Set<FeatureSlug>> = {
  free: new Set([...UNIVERSAL_FREE]),
  standard: new Set([...UNIVERSAL_FREE, ...UNIVERSAL_STANDARD, 'weekly_hours', 'hours_status']),
  premium: new Set([...UNIVERSAL_FREE, ...UNIVERSAL_STANDARD, 'weekly_hours', 'hours_status', ...UNIVERSAL_PREMIUM, 'direct_links', 'book_with_us']),
  elite: new Set([...UNIVERSAL_FREE, ...UNIVERSAL_STANDARD, 'weekly_hours', 'hours_status', ...UNIVERSAL_PREMIUM, 'direct_links', 'book_with_us', ...UNIVERSAL_ELITE]),
}

const BEACHES_FEATURES: Record<PlanTier, Set<FeatureSlug>> = {
  free: new Set([...UNIVERSAL_FREE]),
  standard: new Set([...UNIVERSAL_FREE, ...UNIVERSAL_STANDARD, 'start_end_time', 'travel_tips', 'road_map']),
  premium: new Set([...UNIVERSAL_FREE, ...UNIVERSAL_STANDARD, 'start_end_time', 'travel_tips', 'road_map', ...UNIVERSAL_PREMIUM, 'direct_links', 'book_with_us']),
  elite: new Set([...UNIVERSAL_FREE, ...UNIVERSAL_STANDARD, 'start_end_time', 'travel_tips', 'road_map', ...UNIVERSAL_PREMIUM, 'direct_links', 'book_with_us', ...UNIVERSAL_ELITE]),
}

const ACTIVITIES_FEATURES: Record<PlanTier, Set<FeatureSlug>> = {
  free: new Set([...UNIVERSAL_FREE]),
  standard: new Set([...UNIVERSAL_FREE, ...UNIVERSAL_STANDARD, 'start_end_time', 'road_map', 'travel_tips']),
  premium: new Set([...UNIVERSAL_FREE, ...UNIVERSAL_STANDARD, 'start_end_time', 'road_map', 'travel_tips', ...UNIVERSAL_PREMIUM, 'also_available_on']),
  elite: new Set([...UNIVERSAL_FREE, ...UNIVERSAL_STANDARD, 'start_end_time', 'road_map', 'travel_tips', ...UNIVERSAL_PREMIUM, 'also_available_on', ...UNIVERSAL_ELITE]),
}

const BOATING_FEATURES: Record<PlanTier, Set<FeatureSlug>> = {
  free: new Set([...UNIVERSAL_FREE]),
  standard: new Set([...UNIVERSAL_FREE, ...UNIVERSAL_STANDARD, 'start_end_time', 'road_map', 'travel_tips', 'boating_info']),
  premium: new Set([...UNIVERSAL_FREE, ...UNIVERSAL_STANDARD, 'start_end_time', 'road_map', 'travel_tips', 'boating_info', ...UNIVERSAL_PREMIUM, 'also_available_on', 'direct_links', 'book_with_us']),
  elite: new Set([...UNIVERSAL_FREE, ...UNIVERSAL_STANDARD, 'start_end_time', 'road_map', 'travel_tips', 'boating_info', ...UNIVERSAL_PREMIUM, 'also_available_on', 'direct_links', 'book_with_us', ...UNIVERSAL_ELITE]),
}

const GASTRONOMY_FEATURES: Record<PlanTier, Set<FeatureSlug>> = {
  free: new Set([...UNIVERSAL_FREE]),
  standard: new Set([...UNIVERSAL_FREE, ...UNIVERSAL_STANDARD, 'weekly_hours', 'hours_status', 'menu', 'menu_qr_code', 'menu_file', 'atmosphere']),
  premium: new Set([...UNIVERSAL_FREE, ...UNIVERSAL_STANDARD, 'weekly_hours', 'hours_status', 'menu', 'menu_qr_code', 'menu_file', 'atmosphere', ...UNIVERSAL_PREMIUM, 'also_available_on', 'featured_in', 'book_with_us']),
  elite: new Set([...UNIVERSAL_FREE, ...UNIVERSAL_STANDARD, 'weekly_hours', 'hours_status', 'menu', 'menu_qr_code', 'menu_file', 'atmosphere', ...UNIVERSAL_PREMIUM, 'also_available_on', 'featured_in', 'book_with_us', ...UNIVERSAL_ELITE]),
}

const REAL_ESTATE_FEATURES: Record<PlanTier, Set<FeatureSlug>> = {
  free: new Set([
    ...UNIVERSAL_FREE,
    're_specs', 're_availability', 're_pricing_details', 're_reviews_free', 're_feature_tags',
  ]),
  standard: new Set([
    ...UNIVERSAL_FREE,
    're_specs', 're_availability', 're_pricing_details', 're_reviews_free', 're_feature_tags',
    ...UNIVERSAL_STANDARD,
    're_full_description', 're_developer_info', 're_contact_forms', 're_lead_notifications',
    're_appointment', 're_website_cta',
  ]),
  premium: new Set([
    ...UNIVERSAL_FREE,
    're_specs', 're_availability', 're_pricing_details', 're_reviews_free', 're_feature_tags',
    ...UNIVERSAL_STANDARD,
    're_full_description', 're_developer_info', 're_contact_forms', 're_lead_notifications',
    're_appointment', 're_website_cta',
    ...UNIVERSAL_PREMIUM,
    're_blueprint', 're_video_uploads', 're_contact_details', 're_promotions',
  ]),
  elite: new Set([
    ...UNIVERSAL_FREE,
    're_specs', 're_availability', 're_pricing_details', 're_reviews_free', 're_feature_tags',
    ...UNIVERSAL_STANDARD,
    're_full_description', 're_developer_info', 're_contact_forms', 're_lead_notifications',
    're_appointment', 're_website_cta',
    ...UNIVERSAL_PREMIUM,
    're_blueprint', 're_video_uploads', 're_contact_details', 're_promotions',
    ...UNIVERSAL_ELITE,
  ]),
}

// ─── Lookup map ──────────────────────────────────────────────────────────────

export const PLAN_FEATURES: Record<CategoryGroup, Record<PlanTier, Set<FeatureSlug>>> = {
  hotels:      HOTELS_FEATURES,
  beaches:     BEACHES_FEATURES,
  activities:  ACTIVITIES_FEATURES,
  boating:     BOATING_FEATURES,
  gastronomy:  GASTRONOMY_FEATURES,
  real_estate: REAL_ESTATE_FEATURES,
}

/**
 * Returns the category group key from a raw category name string.
 * Falls back to 'activities' if no match found.
 */
export function getCategoryGroup(categoryName: string): CategoryGroup {
  const name = categoryName.toLowerCase()
  if (name.includes('hotel'))       return 'hotels'
  if (name.includes('beach'))       return 'beaches'
  if (name.includes('boating'))     return 'boating'
  if (name.includes('gastronom') || name.includes('nightlife')) return 'gastronomy'
  if (name.includes('real estate')) return 'real_estate'
  return 'activities'  // Activities, Pools, other activities
}

/**
 * Check if a feature is available at the given tier for a category group.
 * Admin/Owner/Assistant bypass: always returns true.
 */
export function hasFeatureAccess(
  categoryGroup: CategoryGroup,
  tier: PlanTier,
  featureSlug: FeatureSlug,
  role?: string
): boolean {
  // Staff always has full access
  if (role && ['owner', 'admin', 'assistant'].includes(role)) return true
  return PLAN_FEATURES[categoryGroup]?.[tier]?.has(featureSlug) ?? false
}

/**
 * The minimum tier required to access a feature for a given category group.
 * Returns null if the feature is not available at any tier.
 */
export function getRequiredTier(
  categoryGroup: CategoryGroup,
  featureSlug: FeatureSlug
): PlanTier | null {
  const tiers: PlanTier[] = ['free', 'standard', 'premium', 'elite']
  for (const tier of tiers) {
    if (PLAN_FEATURES[categoryGroup]?.[tier]?.has(featureSlug)) return tier
  }
  return null
}
