'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Package } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/supabase'
import { fetchClientListings } from '@/lib/listings.service'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PlanCard from './PlanCard'
import type { ClientListing } from '@/lib/listings.service'

// ── Types ────────────────────────────────────────────────────────────────────

type Category = { id: string; name: string; type: string }
type Tier = { id: string; name: string; tier_order: number; is_admin_free: boolean }

type TierPricingRecord = {
  id: string
  category_id: string
  tier_id: string
  monthly_price: number
  yearly_price: number
  yearly_discount_percent: number
  status: 'active' | 'inactive'
}

type Feature = { id: string; label: string }
type BillingPeriod = 'monthly' | 'yearly'

// ── Props ────────────────────────────────────────────────────────────────────

interface PlanGridProps {
  /** Current client's account ID — used to fetch their listings */
  clientId?: string
  /** Client's email — passed to Stripe checkout */
  clientEmail?: string
}

// ── Component ────────────────────────────────────────────────────────────────

export default function PlanGrid({ clientId, clientEmail }: PlanGridProps) {
  const searchParams = useSearchParams()
  const preselectedListingId = searchParams.get('listing') ?? ''

  const [categories, setCategories] = useState<Category[]>([])
  const [tiers, setTiers] = useState<Tier[]>([])
  const [pricingRecords, setPricingRecords] = useState<TierPricingRecord[]>([])
  const [featuresMap, setFeaturesMap] = useState<Record<string, Feature[]>>({})
  const [listings, setListings] = useState<ClientListing[]>([])
  const [selectedListingId, setSelectedListingId] = useState(preselectedListingId)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly')
  const [checkingOut, setCheckingOut] = useState<string | null>(null) // tier id being checked out
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (clientId) {
      fetchClientListings(clientId).then(setListings)
    }
  }, [clientId])

  // When a listing is selected, auto-select its category
  useEffect(() => {
    if (!selectedListingId || !listings.length || !categories.length) return
    const listing = listings.find((l) => l.id === selectedListingId)
    if (!listing?.category?.name) return
    const cat = categories.find(
      (c) => c.name.toLowerCase() === listing.category!.name.toLowerCase()
    )
    if (cat) setSelectedCategoryId(cat.id)
  }, [selectedListingId, listings, categories])

  async function loadAll() {
    setLoading(true)
    const [catRes, tierRes, priceRes, featRes] = await Promise.all([
      supabase.from('categories').select('id, name, type').order('name'),
      supabase.from('subscription_tiers').select('*').order('tier_order'),
      supabase.from('tier_pricing').select('*'),
      supabase
        .from('tier_pricing_features')
        .select('tier_pricing_id, features(id, label)'),
    ])

    const cats = (catRes.data ?? []) as Category[]
    setCategories(cats)
    setTiers((tierRes.data ?? []) as Tier[])
    setPricingRecords((priceRes.data ?? []) as TierPricingRecord[])

    const map: Record<string, Feature[]> = {}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;((featRes.data ?? []) as any[]).forEach((row) => {
      if (!map[row.tier_pricing_id]) map[row.tier_pricing_id] = []
      if (row.features) map[row.tier_pricing_id].push(row.features as Feature)
    })
    setFeaturesMap(map)

    if (cats.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(cats[0].id)
    }
    setLoading(false)
  }

  // ── Checkout ──────────────────────────────────────────────────────────────

  async function handleUpgrade(tierName: string) {
    if (!selectedListingId) {
      toast.error('Please select a listing to upgrade.')
      return
    }
    if (!clientEmail) {
      toast.error('Could not determine your account email. Please try again.')
      return
    }

    const listing = listings.find((l) => l.id === selectedListingId)
    const categoryName = listing?.category?.name ?? ''

    setCheckingOut(tierName)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: selectedListingId,
          listingTitle: listing?.title ?? '',
          categoryName,
          tier: tierName.toLowerCase(),
          billingPeriod,
          clientEmail,
          clientId: clientId ?? '',
        }),
      })

      const data = (await res.json()) as { url?: string; error?: string }
      if (!res.ok || !data.url) {
        toast.error(data.error ?? 'Checkout failed. Please try again.')
        return
      }
      window.location.href = data.url
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setCheckingOut(null)
    }
  }

  // ── Derived data ──────────────────────────────────────────────────────────

  const categoryPricing = pricingRecords.filter(
    (p) => p.category_id === selectedCategoryId
  )

  const configuredTiers = tiers
    .filter((t) => categoryPricing.some((p) => p.tier_id === t.id))
    .map((tier) => {
      const record = categoryPricing.find((p) => p.tier_id === tier.id)!
      const features = featuresMap[record.id] ?? []
      return { tier, record, features }
    })

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId)

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <section className='my-4 space-y-4'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <h2 className='font-antigua flex items-center text-xl font-semibold'>
          <Package className='mr-2 h-5 w-5 text-muted-foreground' /> Plan
          Overview
        </h2>

        <div className='flex flex-wrap items-center gap-2'>
          {/* Listing selector — only when client has listings */}
          {listings.length > 0 && (
            <Select value={selectedListingId} onValueChange={setSelectedListingId}>
              <SelectTrigger className='w-56'>
                <SelectValue placeholder='Select listing' />
              </SelectTrigger>
              <SelectContent>
                {listings.map((l) => (
                  <SelectItem key={l.id} value={l.id}>
                    {l.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Category selector */}
          {categories.length > 0 && (
            <Select
              value={selectedCategoryId}
              onValueChange={setSelectedCategoryId}
            >
              <SelectTrigger className='w-44'>
                <SelectValue placeholder='Select category' />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Billing period toggle */}
          <Tabs
            value={billingPeriod}
            onValueChange={(v) => setBillingPeriod(v as BillingPeriod)}
          >
            <TabsList className='h-9'>
              <TabsTrigger value='monthly' className='text-xs'>
                Monthly
              </TabsTrigger>
              <TabsTrigger value='yearly' className='text-xs'>
                Yearly
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {loading ? (
        <p className='text-sm text-muted-foreground'>Loading plans…</p>
      ) : configuredTiers.length === 0 ? (
        <div className='rounded-xl border border-dashed p-8 text-center text-muted-foreground'>
          <p className='text-sm'>
            {categories.length === 0
              ? 'No categories found.'
              : `No tiers configured for ${selectedCategory?.name ?? 'this category'} yet.`}
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {configuredTiers.map(({ tier, record, features }) => (
            <PlanCard
              key={tier.id}
              tierName={tier.name}
              tierOrder={tier.tier_order}
              monthlyPrice={record.monthly_price}
              yearlyPrice={record.yearly_price}
              yearlyDiscount={record.yearly_discount_percent}
              billingPeriod={billingPeriod}
              status={record.status}
              features={features.map((f) => f.label)}
              isAdminFree={tier.is_admin_free}
              isCheckingOut={checkingOut === tier.name}
              onUpgrade={() => handleUpgrade(tier.name)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
