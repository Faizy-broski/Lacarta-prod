'use client'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useListingPlan } from '@/lib/hooks/useListingPlan'
import { getCategoryGroup } from '@/lib/constants/plan-features'
import type {
  ListingForm, ValidationErrors, Category, SubCategory,
  AttrsByType, ListingStatus, REListingType, AvailabilityStatus,
} from './types'
import {
  EMPTY_FORM, EMPTY_WEEKLY_HOURS, EMPTY_ATTRS, isValidUrl,
} from './types'

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useFormState(fixedCategory?: string) {
  const router          = useRouter()
  const { id }          = useParams<{ id?: string }>()
  const searchParams    = useSearchParams()
  const prefillCategoryId = searchParams.get('category_id') ?? undefined
  const isEdit          = !!id

  const [form, setForm]             = useState<ListingForm>(EMPTY_FORM)
  const [categories, setCategories] = useState<Category[]>([])
  const [subCategories, setSubCategories] = useState<SubCategory[]>([])
  const [listingTypes, setListingTypes]   = useState<{ id: number; name: string }[]>([])
  const [attributesByType, setAttributesByType] = useState<AttrsByType>(EMPTY_ATTRS)
  const [loading, setLoading]   = useState(isEdit)
  const [saving, setSaving]     = useState(false)
  const [errors, setErrors]     = useState<ValidationErrors>({})
  const [currentUserId, setCurrentUserId]     = useState<string | null>(null)
  const [currentUserRole, setCurrentUserRole] = useState<string>('client')

  // ── Setter — clears the field's error on change ──
  const set = useCallback(<K extends keyof ListingForm>(field: K, value: ListingForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }, [])

  // ── Pre-select category from URL / fixedCategory ──
  useEffect(() => {
    if (isEdit) return
    if (prefillCategoryId) {
      setForm((prev) => prev.category_id === prefillCategoryId
        ? prev : { ...prev, category_id: prefillCategoryId })
      return
    }
    if (fixedCategory && categories.length > 0) {
      const slugify = (s: string) => s.toLowerCase().replace(/[\s-]+/g, '_')
      const cat = categories.find((c) =>
        c.name.toLowerCase() === fixedCategory.toLowerCase() ||
        slugify(c.name) === slugify(fixedCategory)
      )
      if (cat && form.category_id !== cat.id) {
        setForm((prev) => ({ ...prev, category_id: cat.id }))
      }
    }
  }, [prefillCategoryId, fixedCategory, categories, isEdit])

  // ── Auth ──
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      setCurrentUserId(user.id)
      supabase.from('users').select('role').eq('id', user.id).single()
        .then(({ data }) => {
          setCurrentUserRole(data?.role ?? 'client')
          if (!isEdit) setForm((prev) => ({ ...prev, status: 'active' }))
        })
    })
  }, [isEdit])

  // ── Categories ──
  useEffect(() => {
    supabase.from('categories').select('id, name').eq('type', 'listing').order('name')
      .then(({ data }) => setCategories(data ?? []))
  }, [])

  // ── Sub-categories ──
  useEffect(() => {
    if (!form.category_id) { setSubCategories([]); return }
    supabase.from('sub-categories').select('id, name')
      .eq('category', form.category_id).order('name')
      .then(({ data }) => setSubCategories(data ?? []))
  }, [form.category_id])

  // ── Listing types ──
  useEffect(() => {
    if (!form.category_id) { setListingTypes([]); return }
    supabase.from('listing_types').select('id, name')
      .eq('category', form.category_id).eq('status', 'active').order('name')
      .then(({ data }) => setListingTypes(data ?? []))
  }, [form.category_id])

  // ── Category attributes ──
  useEffect(() => {
    if (!form.category_id) { setAttributesByType(EMPTY_ATTRS); return }
    supabase.from('category_attribute_assignments')
      .select('attribute_id, category_attributes(id, name, type, status)')
      .eq('category_id', form.category_id)
      .then(({ data }) => {
        const byType: AttrsByType = {
          neighborhood: [], key_feature: [], service: [],
          amenity: [], atmosphere: [], menu: [],
        }
        ;(data ?? []).forEach((row: any) => {
          const attr = row.category_attributes
          if (attr && attr.status === 'active' && attr.type in byType) {
            ;(byType as any)[attr.type].push({ id: attr.id, name: attr.name })
          }
        })
        setAttributesByType(byType)
      })
  }, [form.category_id])

  // ── Load existing listing (edit mode) ──
  useEffect(() => {
    if (!isEdit || !id) return
    setLoading(true)
    supabase.from('listings').select('*').eq('id', id).single()
      .then(({ data }) => {
        if (data) {
          setForm({
            ...EMPTY_FORM,
            title: data.title ?? '',
            subtitle: data.subtitle ?? '',
            description: data.description ?? '',
            category_id: data.category_id ?? '',
            sub_category_id: data.sub_category_id ?? '',
            status: (data.status as ListingStatus) ?? 'pending',
            price_from: data.price_from ?? '',
            price_to: data.price_to ?? '',
            price_unit: data.price_unit ?? 'night',
            cover_image: data.cover_image ?? '',
            category_tags: data.category_tags ?? [],
            seo_slug: data.seo_slug ?? '',
            images: data.images ?? [],
            address: data.address ?? '',
            latitude: data.latitude ?? '',
            longitude: data.longitude ?? '',
            google_maps_link: data.google_maps_link ?? '',
            email: data.email ?? '',
            phone: data.phone ?? '',
            website: data.website ?? '',
            whatsapp: data.whatsapp ?? '',
            facebook: data.facebook ?? '',
            instagram: data.instagram ?? '',
            extra_social_links: data.extra_social_links ?? [],
            reservation_links: data.reservation_links ?? [],
            direct_links: data.direct_links ?? [],
            start_time: data.start_time ?? '',
            end_time: data.end_time ?? '',
            pickup_time: data.pickup_time ?? '',
            travel_duration: data.travel_duration ?? '',
            beach_start: data.beach_start ?? '',
            beach_end: data.beach_end ?? '',
            weekly_hours: data.weekly_hours ?? EMPTY_WEEKLY_HOURS,
            faqs: data.faqs ?? [],
            deals: data.deals ?? [],
            road_map: data.road_map ?? [],
            whats_included: data.whats_included ?? { title: '', items: [] },
            important_info: data.important_info ?? { title: '', items: [] },
            travel_tips: data.travel_tips ?? [],
            key_features: data.key_features ?? [],
            services: data.services ?? [],
            amenities: data.amenities ?? [],
            neighborhoods: data.neighborhoods ?? [],
            atmosphere: data.atmosphere ?? [],
            service_title: data.service_title ?? '',
            amenities_title: data.amenities_title ?? '',
            feature_title: data.feature_title ?? '',
            details_title: data.details_title ?? '',
            boat_details: data.boat_details ?? [],
            price_tier: data.price_tier ?? '$',
            address_url: data.address_url ?? '',
            is_feature: data.is_feature ?? false,
            feature_logo: data.feature_logo ?? '',
            feature_post_type: data.feature_post_type ?? 'reserve',
            menu_items: data.menu_items ?? [],
            menu_qr_code: data.menu_qr_code ?? '',
            menu_file_url: data.menu_file_url ?? '',
            menu_button_title: data.menu_button_title ?? '',
            hours_status: data.hours_status ?? '',
            hours_note: data.hours_note ?? '',
            book_with_us: {
              title: data.book_with_us?.title ?? '',
              button_link: data.book_with_us?.button_link ?? '',
              why_title: data.book_with_us?.why_title ?? '',
              why_link: data.book_with_us?.why_link ?? '',
            },
            availability_button_title: data.availability_button_title ?? '',
            rnt_no: data.rnt_no ?? '',
            inventory: data.inventory ?? '',
            also_available_on: data.also_available_on ?? [],
            featured_in: data.featured_in ?? [],
            boating_info: data.boating_info ?? { capacity_type: '', season: '', what_to_bring: '' },
            room_types: data.room_types ?? [],
            room_types_title: data.room_types_title ?? '',
            bedrooms: data.bedrooms != null ? String(data.bedrooms) : '',
            bathrooms: data.bathrooms != null ? String(data.bathrooms) : '',
            sqft: data.sqft != null ? String(data.sqft) : '',
            strata: data.strata != null ? String(data.strata) : '',
            availability_status: data.availability_status ?? 'available',
            unit_specs: data.unit_specs ?? '',
            re_listing_type: (data.re_listing_type as REListingType) ?? 'sale',
            developer_info: {
              name: data.developer_info?.name ?? '',
              contact: data.developer_info?.contact ?? '',
              website: data.developer_info?.website ?? '',
              logo: data.developer_info?.logo ?? '',
              description: data.developer_info?.description ?? '',
              button_label: data.developer_info?.button_label ?? '',
            },
            appointment_info: {
              title: data.appointment_info?.title ?? '',
              content: data.appointment_info?.content ?? '',
              link: data.appointment_info?.link ?? '',
            },
            website_cta: {
              title: data.website_cta?.title ?? '',
              content: data.website_cta?.content ?? '',
              link: data.website_cta?.link ?? '',
            },
            blueprint_url: data.blueprint_url ?? '',
            video_urls: data.video_urls ?? [],
          })
        }
        setLoading(false)
      })
  }, [isEdit, id])

  // ── Category-derived ──
  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === form.category_id),
    [categories, form.category_id]
  )
  const selectedCategoryName = selectedCategory?.name?.toLowerCase() ?? ''
  const isBoating    = selectedCategoryName.includes('boating')
  const isActivities = selectedCategoryName.includes('activit') || isBoating
  const isBeach      = selectedCategoryName.includes('beach')
  const isGastronomy = selectedCategoryName.includes('gastronom')
  const isRealEstate = selectedCategoryName.includes('real estate')
  const isHotel      = !isActivities && !isBeach && !isGastronomy && !isRealEstate && !!form.category_id
  const categoryGroup = getCategoryGroup(selectedCategory?.name ?? '')
  const categorySlug  = selectedCategory?.name
    ?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') ?? 'general'

  const googleMapsLink = useMemo(() => {
    if (!form.latitude || !form.longitude) return ''
    return `https://www.google.com/maps?q=${form.latitude},${form.longitude}`
  }, [form.latitude, form.longitude])

  const mapSrc = useMemo(() => {
    const lat = parseFloat(form.latitude)
    const lng = parseFloat(form.longitude)
    if (isNaN(lat) || isNaN(lng)) return null
    const d = 0.006
    return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d},${lat - d},${lng + d},${lat + d}&layer=mapnik&marker=${lat},${lng}`
  }, [form.latitude, form.longitude])

  // ── Plan enforcement ──
  const { hasFeature: hasFeatureFn } = useListingPlan(id, selectedCategory?.name ?? '', currentUserRole)
  const hasFeature = (feature: string) => hasFeatureFn(feature as Parameters<typeof hasFeatureFn>[0])

  // ── Validation ──
  function validate(): boolean {
    const errs: ValidationErrors = {}
    if (!currentUserId) errs.user_id = 'You must be logged in to create a listing'
    if (!form.title.trim()) errs.title = 'Title is required'
    if (!form.subtitle.trim()) errs.subtitle = 'Subtitle is required'
    if (!form.cover_image) errs.cover_image = 'Featured image is required — please upload a photo'
    if (!isRealEstate && (!form.price_from || Number(form.price_from) < 0))
      errs.price_from = 'Start price is required'
    if (hasFeature('social_handles')) {
      const hasSocial = !!form.facebook.trim() || !!form.instagram.trim() ||
        form.extra_social_links.some((l) => !!l.url.trim())
      if (!hasSocial)
        errs.social = 'At least one social link is required (Facebook, Instagram, or other)'
    }
    if (listingTypes.length > 0 && !form.category_tags.length) errs.category_tags = 'Select at least one type'
    if (!form.seo_slug.trim()) errs.seo_slug = 'SEO slug is required'
    if (!form.category_id) errs.category_id = 'Category is required'
    if (subCategories.length > 0 && !form.sub_category_id) errs.sub_category_id = 'Sub-category is required'
    if (!form.neighborhoods.length) errs.neighborhoods = 'Select one neighborhood'
    if (form.neighborhoods.length > 1) errs.neighborhoods = 'Select only one neighborhood'
    if (form.website && !isValidUrl(form.website)) errs.website = 'Must be a valid URL (https://…)'
    if (form.facebook && !isValidUrl(form.facebook)) errs.facebook = 'Must be a valid URL (https://…)'
    if (form.instagram && !isValidUrl(form.instagram)) errs.instagram = 'Must be a valid URL (https://…)'
    const hasLocation =
      !!form.address.trim() ||
      (!!form.latitude.trim() && !!form.longitude.trim()) ||
      !!form.google_maps_link.trim()
    if (!hasLocation) errs.address = 'Location is required — enter an address or GPS coordinates'
    setErrors(errs)
    if (Object.keys(errs).length > 0)
      toast.error('Please fix the highlighted fields', { description: Object.values(errs)[0] })
    return Object.keys(errs).length === 0
  }

  // ── Save / submit ──
  async function handleSave() {
    if (!validate()) return
    setSaving(true)

    if (form.seo_slug.trim()) {
      const slugQuery = supabase.from('listings').select('id').eq('seo_slug', form.seo_slug.trim()).limit(1)
      if (isEdit) slugQuery.neq('id', id!)
      const { data: slugExists } = await slugQuery
      if (slugExists && slugExists.length > 0) {
        setErrors((prev) => ({ ...prev, seo_slug: 'This SEO slug is already taken — choose a unique one' }))
        toast.error('SEO slug already in use', { description: 'Choose a different unique URL slug' })
        setSaving(false)
        return
      }
    }

    const payload: Record<string, unknown> = {
      title: form.title.trim(),
      subtitle: form.subtitle.trim() || null,
      description: form.description.trim() || null,
      category_id: form.category_id || null,
      sub_category_id: form.sub_category_id || null,
      status: form.status,
      price_from: form.price_from !== '' ? Number(form.price_from) : 0,
      price_to: form.price_to !== '' ? Number(form.price_to) : 0,
      price_unit: form.price_unit,
      cover_image: form.cover_image || null,
      category_tags: form.category_tags,
      seo_slug: form.seo_slug.trim() || null,
      images: form.images.filter(Boolean),
      address: form.address.trim() || null,
      latitude: form.latitude ? Number(form.latitude) : null,
      longitude: form.longitude ? Number(form.longitude) : null,
      google_maps_link: googleMapsLink || null,
      email: form.email.trim() || null,
      phone: form.phone.trim() || null,
      website: form.website.trim() || null,
      whatsapp: form.whatsapp.trim() || null,
      facebook: form.facebook.trim() || null,
      instagram: form.instagram.trim() || null,
      extra_social_links: form.extra_social_links,
      reservation_links: form.reservation_links,
      start_time: form.start_time || null,
      end_time: form.end_time || null,
      pickup_time: form.pickup_time || null,
      travel_duration: form.travel_duration || null,
      beach_start: form.beach_start || null,
      beach_end: form.beach_end || null,
      weekly_hours: (isGastronomy || isHotel) ? form.weekly_hours : {},
      faqs: form.faqs,
      deals: form.deals,
      road_map: form.road_map,
      travel_tips: form.travel_tips,
      key_features: form.key_features,
      services: form.services,
      amenities: form.amenities,
      neighborhoods: form.neighborhoods,
      atmosphere: form.atmosphere,
      service_title: form.service_title.trim() || null,
      amenities_title: form.amenities_title.trim() || null,
      feature_title: form.feature_title.trim() || null,
      details_title: isBoating ? (form.details_title.trim() || null) : null,
      boat_details: isBoating ? form.boat_details : [],
      price_tier: form.price_tier,
      address_url: form.address_url.trim() || null,
      is_feature: form.is_feature,
      feature_logo: form.feature_logo || null,
      feature_post_type: form.feature_post_type,
      menu_items: isGastronomy ? form.menu_items : [],
      menu_qr_code: isGastronomy ? (form.menu_qr_code || null) : null,
      menu_file_url: isGastronomy ? (form.menu_file_url || null) : null,
      menu_button_title: isGastronomy ? (form.menu_button_title || null) : null,
      hours_status: (isGastronomy || isHotel) ? (form.hours_status || null) : null,
      hours_note: (isGastronomy || isHotel) ? (form.hours_note || null) : null,
      book_with_us: (isGastronomy || isHotel || isBeach || isBoating) ? form.book_with_us : {},
      availability_button_title: form.availability_button_title || null,
      rnt_no: form.rnt_no || null,
      inventory: form.inventory || null,
      also_available_on: (isGastronomy || isActivities) ? form.also_available_on : [],
      whats_included: (isBoating || isGastronomy || isActivities) ? form.whats_included : {},
      important_info: (isBoating || isGastronomy || isActivities) ? form.important_info : {},
      featured_in: isGastronomy ? form.featured_in : [],
      direct_links: (isHotel || isBeach || isBoating) ? form.direct_links : [],
      boating_info: isBoating ? form.boating_info : {},
      room_types: isHotel ? form.room_types : [],
      room_types_title: isHotel ? (form.room_types_title.trim() || null) : null,
      re_listing_type: isRealEstate ? form.re_listing_type : null,
      bedrooms: isRealEstate && form.bedrooms !== '' ? Number(form.bedrooms) : null,
      bathrooms: isRealEstate && form.bathrooms !== '' ? Number(form.bathrooms) : null,
      sqft: isRealEstate && form.sqft !== '' ? Number(form.sqft) : null,
      strata: isRealEstate && form.strata !== '' ? Number(form.strata) : null,
      availability_status: isRealEstate ? form.availability_status : null,
      unit_specs: isRealEstate ? (form.unit_specs || null) : null,
      developer_info: isRealEstate ? form.developer_info : {},
      appointment_info: isRealEstate ? form.appointment_info : {},
      website_cta: isRealEstate ? form.website_cta : {},
      blueprint_url: isRealEstate ? (form.blueprint_url || null) : null,
      video_urls: isRealEstate ? form.video_urls : [],
    }
    if (!isEdit && currentUserId) payload.client_id = currentUserId

    let error: { message: string } | null = null
    let newId: string | null = null
    if (isEdit) {
      ;({ error } = await supabase.from('listings').update(payload).eq('id', id!))
    } else {
      const { data: inserted, error: insertError } = await supabase
        .from('listings').insert(payload).select('id').single()
      error = insertError
      newId = inserted?.id ?? null
    }
    setSaving(false)
    if (!error) {
      toast.success(isEdit ? 'Listing updated' : 'Listing created')
      if (isEdit) router.back()
      else if (newId) router.push(`/dashboard/listings/${newId}`)
      else router.back()
    } else {
      toast.error('Failed to save listing', { description: error.message })
    }
  }

  return {
    // State
    form, set, errors,
    // Supporting data
    categories, subCategories, listingTypes, attributesByType,
    // Category flags + derived
    selectedCategory, categorySlug, categoryGroup,
    isHotel, isBoating, isActivities, isBeach, isGastronomy, isRealEstate,
    // Plan
    hasFeature,
    // Route meta
    isEdit, id: id as string | undefined,
    fixedCategory, prefillCategoryId,
    // Computed
    googleMapsLink, mapSrc,
    // UI flags
    loading, saving,
    // Actions
    handleSave,
    router,
  }
}
