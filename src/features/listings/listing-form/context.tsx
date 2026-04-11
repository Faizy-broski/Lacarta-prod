import { createContext, useContext } from 'react'
import type {
  ListingForm, ValidationErrors, Category, SubCategory,
  AttrsByType, WeeklyHours,
} from './types'

// ─── Context value shape ──────────────────────────────────────────────────────

export interface ListingFormContextValue {
  // Core form state
  form: ListingForm
  set: <K extends keyof ListingForm>(field: K, value: ListingForm[K]) => void
  errors: ValidationErrors

  // Supporting data from DB
  categories: Category[]
  subCategories: SubCategory[]
  listingTypes: { id: number; name: string }[]
  attributesByType: AttrsByType

  // Category-derived flags
  selectedCategory: Category | undefined
  categorySlug: string
  categoryGroup: string
  isHotel: boolean
  isBoating: boolean
  isActivities: boolean
  isBeach: boolean
  isGastronomy: boolean
  isRealEstate: boolean

  // Plan gating
  hasFeature: (feature: string) => boolean

  // Route meta
  isEdit: boolean
  id: string | undefined
  fixedCategory: string | undefined
  prefillCategoryId: string | undefined

  // Computed
  googleMapsLink: string
  mapSrc: string | null
}

// ─── Context + hook ───────────────────────────────────────────────────────────

export const ListingFormContext = createContext<ListingFormContextValue | null>(null)

export function useListingFormCtx(): ListingFormContextValue {
  const ctx = useContext(ListingFormContext)
  if (!ctx) throw new Error('useListingFormCtx must be used within ListingFormContext.Provider')
  return ctx
}
