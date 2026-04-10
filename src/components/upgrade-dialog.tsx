'use client'

import { Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type PlanTier = 'standard' | 'premium' | 'elite'

const TIER_COLORS: Record<PlanTier, string> = {
  standard: 'from-blue-500 to-blue-600',
  premium: 'from-amber-500 to-amber-600',
  elite: 'from-purple-500 to-purple-700',
}

const TIER_BADGE_COLORS: Record<PlanTier, string> = {
  standard: 'bg-blue-100 text-blue-700 border-blue-200',
  premium: 'bg-amber-100 text-amber-700 border-amber-200',
  elite: 'bg-purple-100 text-purple-700 border-purple-200',
}

const TIER_DESCRIPTIONS: Record<PlanTier, string> = {
  standard: 'Unlock photos, location map, analytics, reviews and more.',
  premium: 'Unlock FAQs, deals, contact info, social handles and sponsored placements.',
  elite: 'Unlock events listing, article creation, elite ad spaces and social shoutouts.',
}

interface UpgradeDialogProps {
  open: boolean
  onClose: () => void
  requiredTier: PlanTier
  feature?: string
  listingId?: string
}

export function UpgradeDialog({
  open,
  onClose,
  requiredTier,
  feature,
  listingId,
}: UpgradeDialogProps) {
  const router = useRouter()
  const gradient = TIER_COLORS[requiredTier]
  const badgeClass = TIER_BADGE_COLORS[requiredTier]
  const tierLabel = requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)

  function handleUpgrade() {
    onClose()
    const target = listingId
      ? `/dashboard/subscriptions?listing=${listingId}`
      : '/dashboard/subscriptions'
    router.push(target)
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <div className='mb-3 flex items-center gap-3'>
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} shadow-md`}
            >
              <Lock className='h-5 w-5 text-white' />
            </div>
            <span
              className={`rounded-full border px-3 py-0.5 text-xs font-semibold uppercase tracking-wide ${badgeClass}`}
            >
              {tierLabel} Required
            </span>
          </div>
          <DialogTitle className='text-left text-lg'>
            {feature ? `${feature} requires ${tierLabel}` : `${tierLabel} Plan Required`}
          </DialogTitle>
          <DialogDescription className='text-left text-sm text-muted-foreground'>
            {TIER_DESCRIPTIONS[requiredTier]}
          </DialogDescription>
        </DialogHeader>

        {!listingId && (
          <p className='rounded-lg bg-muted px-4 py-3 text-xs text-muted-foreground'>
            Save your listing first, then upgrade from{' '}
            <span className='font-medium text-foreground'>My Listings → Subscriptions</span>.
          </p>
        )}

        <div className='flex gap-2 pt-1'>
          <Button variant='outline' className='flex-1' onClick={onClose}>
            Not now
          </Button>
          <Button
            className={`flex-1 bg-gradient-to-r ${gradient} text-white hover:opacity-90`}
            onClick={handleUpgrade}
          >
            {listingId ? `Upgrade to ${tierLabel}` : 'View Plans'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
