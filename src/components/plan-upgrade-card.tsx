'use client'

/**
 * PlanUpgradeCard
 *
 * Shown in place of locked dashboard modules when a Client's listing
 * subscription does not include the required plan tier.
 *
 * Usage:
 *   <PlanUpgradeCard requiredTier="Premium" feature="Deals & Promotions" />
 */

import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

type PlanTier = 'Standard' | 'Premium' | 'Elite'

const TIER_COLORS: Record<PlanTier, string> = {
  Standard: 'from-blue-500 to-blue-600',
  Premium:  'from-amber-500 to-amber-600',
  Elite:    'from-purple-500 to-purple-700',
}

const TIER_DESCRIPTIONS: Record<PlanTier, string> = {
  Standard: 'Analytics, photos, location, reviews and more.',
  Premium:  'Deals, FAQs, contact info, social handles and sponsored placements.',
  Elite:    'Events listing, article creation, elite ad spaces and social shoutouts.',
}

interface PlanUpgradeCardProps {
  /** Minimum tier required to access this feature */
  requiredTier: PlanTier
  /** Feature name shown in the card headline */
  feature?: string
  /** Optional custom description */
  description?: string
  /** Listing ID to pre-select on the subscriptions page */
  listingId?: string
}

export function PlanUpgradeCard({
  requiredTier,
  feature,
  description,
  listingId,
}: PlanUpgradeCardProps) {
  const router = useRouter()
  const gradient = TIER_COLORS[requiredTier]
  const target = listingId
    ? `/dashboard/subscriptions?listing=${listingId}`
    : '/dashboard/subscriptions'

  return (
    <div className='flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/30 px-8 py-16 text-center gap-4'>
      <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${gradient} shadow-md`}>
        <Lock className='h-6 w-6 text-white' />
      </div>

      <div className='space-y-1.5 max-w-md'>
        <h3 className='text-lg font-bold'>
          {feature ? `${feature} requires ${requiredTier}` : `${requiredTier} Plan Required`}
        </h3>
        <p className='text-sm text-muted-foreground'>
          {description ?? TIER_DESCRIPTIONS[requiredTier]}
        </p>
      </div>

      <Button
        onClick={() => router.push(target)}
        className={`rounded-md bg-gradient-to-r ${gradient} text-white hover:opacity-90`}
      >
        Upgrade to {requiredTier}
      </Button>
    </div>
  )
}
