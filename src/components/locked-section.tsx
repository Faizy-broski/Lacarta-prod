'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'
import { UpgradeDialog } from '@/components/upgrade-dialog'

type PlanTier = 'free' | 'standard' | 'premium' | 'elite'

const TIER_BADGE: Record<Exclude<PlanTier, 'free'>, string> = {
  standard: 'bg-blue-50 text-blue-700 border-blue-200',
  premium: 'bg-amber-50 text-amber-700 border-amber-200',
  elite: 'bg-purple-50 text-purple-700 border-purple-200',
}

interface LockedSectionProps {
  /** Whether the current user's plan includes this feature */
  hasAccess: boolean
  /** Minimum tier required to unlock — used for the upgrade prompt */
  requiredTier: PlanTier
  /** Human-readable feature name shown in the upgrade dialog */
  feature?: string
  /** Listing ID for the subscription upgrade target URL */
  listingId?: string
  children: React.ReactNode
}

/**
 * Wraps a form section. When the user's plan does not include the feature:
 * - The section content is rendered but visually dimmed and blurred
 * - An overlay with a lock icon + tier badge covers the content
 * - Clicking anywhere on the overlay opens the UpgradeDialog
 *
 * When the user has access the children are rendered as-is.
 */
export function LockedSection({
  hasAccess,
  requiredTier,
  feature,
  listingId,
  children,
}: LockedSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  if (hasAccess || requiredTier === 'free') {
    return <>{children}</>
  }

  const tierLabel = requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)
  const badgeClass = TIER_BADGE[requiredTier as Exclude<PlanTier, 'free'>]

  return (
    <>
      <div className='relative rounded-xl'>
        {/* Dimmed, non-interactive preview of the content */}
        <div className='pointer-events-none select-none opacity-40 blur-[1.5px]' aria-hidden>
          {children}
        </div>

        {/* Clickable overlay */}
        <button
          type='button'
          onClick={() => setDialogOpen(true)}
          className='absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl bg-background/50 backdrop-blur-[2px] transition-colors hover:bg-background/60'
        >
          <div className='flex flex-col items-center gap-2'>
            <div className='flex h-11 w-11 items-center justify-center rounded-full bg-muted shadow'>
              <Lock className='h-5 w-5 text-foreground/70' />
            </div>
            <span
              className={`rounded-full border px-3 py-0.5 text-xs font-semibold uppercase tracking-wide ${badgeClass}`}
            >
              {tierLabel} Required
            </span>
            {feature && (
              <p className='max-w-[200px] text-center text-xs text-muted-foreground'>
                {feature}
              </p>
            )}
          </div>
        </button>
      </div>

      <UpgradeDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        requiredTier={requiredTier}
        feature={feature}
        listingId={listingId}
      />
    </>
  )
}
