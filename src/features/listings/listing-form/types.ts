// ─── Primitive types ──────────────────────────────────────────────────────────

export type WeeklySlot = { start: string; end: string }
export type WeeklyDay  = { open: boolean; slots: WeeklySlot[] }
export type WeeklyHours = Record<string, WeeklyDay>

export type AttrOption   = { id: string; name: string }
export type AttrsByType  = {
  neighborhood: AttrOption[]
  key_feature:  AttrOption[]
  service:      AttrOption[]
  amenity:      AttrOption[]
  atmosphere:   AttrOption[]
  menu:         AttrOption[]
}

export type Category    = { id: string; name: string }
export type SubCategory = { id: string; name: string }

export type RoadMapItem = { time: string; activity: string }
export type RoadMapDay  = { day: number; title: string; items: RoadMapItem[] }
export type FAQ         = { question: string; answer: string }
export type DealType    = 'discount' | 'package' | 'promotion'
export type ExperienceItem = { image: string; title: string; url: string }
export type Deal = {
  title: string
  subtitle: string
  deal_type: DealType
  description: string
  start_date: string
  end_date: string
  discount: string
  coupon_code: string
  image: string
  offers_title: string
  offers_description: string
  experience_title: string
  experience_included: ExperienceItem[]
  button_link: string
  percent_off: string
  acquire_link: string
}
export type TravelTip      = { title: string; subtitle: string }
export type MenuItem       = { name: string; description: string; price: string }
export type ReservationLink = { platform: string; url: string }
export type SocialLink     = { platform: string; url: string }
export type ListingStatus  = 'active' | 'inactive' | 'pending' | 'featured'
export type AlsoAvailableOnItem = { name: string; url: string }
export type FeaturedInItem = { name: string; url: string }
export type BoatingInfo    = { capacity_type: string; season: string; what_to_bring: string }
export type WhatsIncludedSection = { title: string; items: string[] }
export type ImportantInfoSection = { title: string; items: string[] }
export type DeveloperInfo  = {
  name: string; contact: string; website: string
  logo: string; description: string; button_label: string
}
export type AppointmentInfo = { title: string; content: string; link: string }
export type WebsiteCTA      = { title: string; content: string; link: string }
export type BookWithUs      = { title: string; button_link: string; why_title: string; why_link: string }
export type VideoUrl        = { url: string; label: string }
export type RoomType        = { room_type: string; option: string }
export type BoatDetail      = { content: string }
export type PriceTier       = '$' | '$$' | '$$$' | '$$$$'
export type FeaturePostType = 'reserve' | 'menu'
export type AvailabilityStatus = 'available' | 'unavailable' | 'coming_soon' | 'sold' | 'rented'
export type REListingType   = 'rent' | 'sale' | 'rent_or_sale'

// ─── Main form shape ──────────────────────────────────────────────────────────

export interface ListingForm {
  title: string
  subtitle: string
  description: string
  price_from: string
  price_to: string
  price_unit: string
  cover_image: string
  category_id: string
  sub_category_id: string
  status: ListingStatus
  category_tags: string[]
  seo_slug: string
  images: string[]
  address: string
  latitude: string
  longitude: string
  google_maps_link: string
  email: string
  phone: string
  website: string
  whatsapp: string
  facebook: string
  instagram: string
  extra_social_links: SocialLink[]
  reservation_links: ReservationLink[]
  direct_links: ReservationLink[]
  start_time: string
  end_time: string
  pickup_time: string
  travel_duration: string
  beach_start: string
  beach_end: string
  weekly_hours: WeeklyHours
  faqs: FAQ[]
  deals: Deal[]
  road_map: RoadMapDay[]
  travel_tips: TravelTip[]
  key_features: string[]
  services: string[]
  amenities: string[]
  neighborhoods: string[]
  atmosphere: string[]
  service_title: string
  amenities_title: string
  feature_title: string
  details_title: string
  boat_details: BoatDetail[]
  price_tier: PriceTier
  address_url: string
  is_feature: boolean
  feature_logo: string
  feature_post_type: FeaturePostType
  menu_items: MenuItem[]
  menu_qr_code: string
  menu_file_url: string
  menu_button_title: string
  hours_status: string
  hours_note: string
  book_with_us: BookWithUs
  availability_button_title: string
  rnt_no: string
  inventory: string
  also_available_on: AlsoAvailableOnItem[]
  featured_in: FeaturedInItem[]
  boating_info: BoatingInfo
  whats_included: WhatsIncludedSection
  important_info: ImportantInfoSection
  room_types: RoomType[]
  room_types_title: string
  re_listing_type: REListingType
  bedrooms: string
  bathrooms: string
  sqft: string
  strata: string
  availability_status: AvailabilityStatus
  unit_specs: string
  developer_info: DeveloperInfo
  appointment_info: AppointmentInfo
  website_cta: WebsiteCTA
  blueprint_url: string
  video_urls: VideoUrl[]
}

export type ValidationErrors = Partial<
  Record<keyof ListingForm | 'social' | 'user_id', string>
>

// ─── Constants ────────────────────────────────────────────────────────────────

export const DAYS = [
  'monday', 'tuesday', 'wednesday', 'thursday',
  'friday', 'saturday', 'sunday',
]

export const STATUSES: ListingStatus[] = ['active', 'inactive', 'pending', 'featured']
export const PRICE_UNITS = ['night', 'person', 'hour', 'day', 'tour', 'item']

export const EMPTY_WEEKLY_HOURS: WeeklyHours = Object.fromEntries(
  DAYS.map((d) => [d, { open: false, slots: [{ start: '', end: '' }] }])
)

export const EMPTY_ATTRS: AttrsByType = {
  neighborhood: [], key_feature: [], service: [],
  amenity: [], atmosphere: [], menu: [],
}

export const EMPTY_FORM: ListingForm = {
  title: '', subtitle: '', description: '',
  price_from: '', price_to: '', price_unit: 'night',
  cover_image: '', category_id: '', sub_category_id: '',
  status: 'active', category_tags: [], seo_slug: '',
  images: [], address: '', latitude: '', longitude: '',
  google_maps_link: '', email: '', phone: '', website: '',
  whatsapp: '', facebook: '', instagram: '',
  extra_social_links: [], reservation_links: [],
  start_time: '', end_time: '', pickup_time: '',
  travel_duration: '', beach_start: '', beach_end: '',
  weekly_hours: EMPTY_WEEKLY_HOURS,
  faqs: [], deals: [], road_map: [], travel_tips: [],
  key_features: [], services: [], amenities: [],
  neighborhoods: [], atmosphere: [],
  service_title: '', amenities_title: '', feature_title: '',
  details_title: '', boat_details: [], price_tier: '$',
  address_url: '', is_feature: false, feature_logo: '',
  feature_post_type: 'reserve', menu_items: [],
  menu_qr_code: '', menu_file_url: '', menu_button_title: '',
  hours_status: '', hours_note: '',
  book_with_us: { title: '', button_link: '', why_title: '', why_link: '' },
  availability_button_title: '', rnt_no: '', inventory: '',
  also_available_on: [], featured_in: [], direct_links: [],
  boating_info: { capacity_type: '', season: '', what_to_bring: '' },
  whats_included: { title: '', items: [] },
  important_info: { title: '', items: [] },
  room_types: [], room_types_title: '',
  re_listing_type: 'sale', bedrooms: '', bathrooms: '',
  sqft: '', strata: '', availability_status: 'available',
  unit_specs: '',
  developer_info: { name: '', contact: '', website: '', logo: '', description: '', button_label: '' },
  appointment_info: { title: '', content: '', link: '' },
  website_cta: { title: '', content: '', link: '' },
  blueprint_url: '', video_urls: [],
}

export const EMPTY_DEAL: Deal = {
  title: '', subtitle: '', deal_type: 'discount', description: '',
  start_date: '', end_date: '', discount: '', coupon_code: '', image: '',
  offers_title: '', offers_description: '', experience_title: '',
  experience_included: [], button_link: '', percent_off: '', acquire_link: '',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function isValidUrl(url: string): boolean {
  if (!url.trim()) return true
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`)
    return true
  } catch {
    return false
  }
}
