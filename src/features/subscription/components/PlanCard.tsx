import {
  Check,
  Crown,
  EllipsisVertical,
  Loader2,
  Sparkles,
  Star,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

// ── Constants ────────────────────────────────────────────────────────────────

const TIER_BG: Record<number, string> = {
  0: 'bg-gradient-to-r from-[#65758B] to-[#808EA3]',
  1: 'bg-gradient-to-r from-[#CF9921] to-[#D2BB6B]',
  2: 'bg-gradient-to-r from-[#980001] to-[#D40D00]',
  3: 'bg-gradient-to-r from-[#22C55E] to-[#105F2D]',
}

const TIER_ICONS: Record<number, React.ReactNode> = {
  0: <User className='h-5 w-5' />,
  1: <Star className='h-5 w-5' />,
  2: <Crown className='h-5 w-5' />,
  3: <Sparkles className='h-5 w-5' />,
}

const TIER_PRICE_COLOR: Record<number, string> = {
  0: 'text-slate-900',
  1: 'text-yellow-700',
  2: 'text-red-700',
  3: 'text-emerald-700',
}

// ── Props ────────────────────────────────────────────────────────────────────

interface PlanCardProps {
  tierName: string
  tierOrder: number
  monthlyPrice: number
  yearlyPrice: number
  yearlyDiscount: number
  billingPeriod: 'monthly' | 'yearly'
  status: 'active' | 'inactive'
  features: string[]
  isAdminFree: boolean
  isCheckingOut?: boolean
  onUpgrade?: () => void
}

// ── Component ────────────────────────────────────────────────────────────────

export default function PlanCard({
  tierName,
  tierOrder,
  monthlyPrice,
  yearlyPrice,
  yearlyDiscount,
  billingPeriod,
  status,
  features,
  isAdminFree: _isAdminFree,
  isCheckingOut,
  onUpgrade,
}: PlanCardProps) {
  const bg =
    TIER_BG[tierOrder] ?? 'bg-gradient-to-r from-slate-400 to-slate-500'
  const icon = TIER_ICONS[tierOrder] ?? <User className='h-5 w-5' />
  const priceColor = TIER_PRICE_COLOR[tierOrder] ?? 'text-slate-900'
  const isActive = status === 'active'
  const isFree = tierOrder === 0
  const displayPrice = billingPeriod === 'yearly' ? yearlyPrice : monthlyPrice
  const periodLabel = billingPeriod === 'yearly' ? '/year' : '/month'

  return (
    <Card className='flex h-full flex-col overflow-hidden rounded-sm border p-0'>
      {/* HEADER */}
      <div
        className={`overflow-hidden rounded-t-sm px-3 py-4 text-white shadow-inner ${bg}`}
      >
        <div className='flex items-start gap-3 sm:items-center'>
          {/* ICON */}
          <span className='flex shrink-0 items-center justify-center rounded-md bg-white/20 p-2 backdrop-blur-md'>
            {icon}
          </span>

          {/* TITLE + BADGES */}
          <div className='flex flex-col gap-1'>
            <h3 className='text-base font-semibold sm:text-lg'>{tierName}</h3>
            <div className='flex gap-1.5'>
              <Badge
                className={cn(
                  'w-fit rounded-full px-3 text-xs font-medium',
                  isActive
                    ? 'bg-white text-slate-700'
                    : 'bg-white/30 text-white'
                )}
              >
                {isActive ? 'Active' : 'Inactive'}
              </Badge>
              {/* {isAdminFree && (
                <Badge className='rounded-full bg-white/20 px-2 text-[10px] text-white'>
                  Admin Free
                </Badge>
              )} */}
            </div>
          </div>
          <EllipsisVertical className='ml-auto' />
        </div>
      </div>

      {/* CONTENT */}
      <CardContent className='px-6 sm:px-3'>
        {/* PRICE */}
        <div>
          <div className='flex items-end'>
            {isFree ? (
              <span className={`text-3xl font-bold ${priceColor}`}>Free</span>
            ) : (
              <>
                <span>
                  <span className='text-xs text-slate-500 sm:text-sm'>COP </span>
                  <span className={`text-3xl font-bold ${priceColor}`}>
                    {Number(displayPrice).toLocaleString('es-CO')}
                  </span>
                </span>
                <span className='text-xs text-slate-500 sm:text-sm'>{periodLabel}</span>
              </>
            )}
          </div>
          {!isFree && yearlyDiscount > 0 && billingPeriod === 'yearly' && (
            <div className='mt-1 flex items-center gap-2'>
              <Badge className='rounded-full bg-emerald-100 px-1.5 py-0 text-[10px] text-emerald-700'>
                Save {yearlyDiscount}%
              </Badge>
            </div>
          )}
          <hr className='-mx-10 my-2 border-slate-200' />
        </div>

        {/* FEATURES */}
        <div className='space-y-3 text-sm text-slate-700'>
          <p className='text-xs tracking-wide text-muted-foreground uppercase'>
            Key Features
          </p>

          {features.length === 0 ? (
            <p className='text-xs text-muted-foreground italic'>
              No features configured
            </p>
          ) : (
            <ul className='space-y-2'>
              {features.map((item) => (
                <li key={item} className='flex items-start gap-3 text-xs'>
                  <Check className='mt-0.5 h-4 w-4 shrink-0 text-emerald-500' />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>

      {/* FOOTER */}
      <CardFooter className='mt-auto flex flex-col gap-2 px-6 pb-4 sm:px-3'>
        {!isFree && onUpgrade && (
          <Button
            onClick={onUpgrade}
            disabled={isCheckingOut}
            className={cn(
              'w-full rounded-md text-xs text-white',
              'bg-gradient-to-r from-[#CF9921] to-[#D2BB6B] font-normal hover:from-yellow-600 hover:to-yellow-700'
            )}
          >
            {isCheckingOut ? (
              <>
                <Loader2 className='mr-1.5 h-3.5 w-3.5 animate-spin' />
                Redirecting…
              </>
            ) : (
              `Upgrade to ${tierName}`
            )}
          </Button>
        )}
        {isFree && (
          <span className='text-center text-xs text-muted-foreground'>
            Current default plan
          </span>
        )}
      </CardFooter>
    </Card>
  )
}
