'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, MapPin, Clock, Loader2, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { useAuthStore } from '@/lib/auth/auth.store'
import { fetchClientListings, type ClientListing } from '@/lib/listings.service'
import { useClientPlan } from '@/lib/hooks/useClientPlan'
import CreateEventModal from './components/create-event-modal'
import CreateDealModal from './components/create-deal-modal'
import { ListingAnalytics } from './components/ListingAnalytics'

const statusColors: Record<string, string> = {
  active: 'bg-green-50 text-green-700 border-green-200',
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  inactive: 'bg-red-50 text-red-700 border-red-200',
  featured: 'bg-[#CF9921]/10 text-[#CF9921] border-[#CF9921]/30',
}

const tierColors: Record<string, string> = {
  free: 'bg-slate-50 text-slate-600 border-slate-200',
  standard: 'bg-blue-50 text-blue-700 border-blue-200',
  premium: 'bg-amber-50 text-amber-700 border-amber-200',
  elite: 'bg-purple-50 text-purple-700 border-purple-200',
}

export function MyListingsPage() {
  const user = useAuthStore((s) => s.user)
  const router = useRouter()
  const [listings, setListings] = useState<ClientListing[]>([])
  const [loading, setLoading] = useState(true)

  const { hasAnyListingAt } = useClientPlan(user?.accountNo, user?.role?.[0] ?? '')

  const loadListings = useCallback(() => {
    if (!user?.accountNo) return
    setLoading(true)
    fetchClientListings(user.accountNo).then((data) => {
      setListings(data)
      setLoading(false)
    })
  }, [user?.accountNo])

  useEffect(() => {
    loadListings()
  }, [loadListings])

  return (
    <>
      <Header />

      <Main>
        <div className='mb-6 flex h-20 items-center justify-between'>
          <div>
            <h1 className='font-antigua text-3xl font-bold tracking-tight'>
              My Listings
            </h1>
            <p className='text-xs text-muted-foreground'>
              Manage your individual listings, discounts, and events.
            </p>
          </div>
          <div className='flex items-center gap-2'>
            {hasAnyListingAt('elite') && (
              <CreateEventModal listings={listings} onCreated={loadListings} />
            )}
            {hasAnyListingAt('premium') && (
              <CreateDealModal listings={listings} onCreated={loadListings} />
            )}
            <Button
              size='sm'
              className='h-8 gap-1.5 bg-[#CF9921] text-white hover:bg-[#b8881e]'
              onClick={() => router.push('/dashboard/listings/create')}
            >
              <Plus className='h-3.5 w-3.5' />
              Create Listing
            </Button>
            <Badge variant='secondary' className='gap-1'>
              <Building2 className='h-3 w-3' />
              {loading ? '…' : listings.length} listings
            </Badge>
          </div>
        </div>

        {loading ? (
          <div className='flex items-center justify-center py-16'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          </div>
        ) : listings.length === 0 ? (
          <div className='py-16 text-center text-muted-foreground'>
            You don&apos;t have any listings yet.
          </div>
        ) : (
        <div className='grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
          {listings.map((listing) => (
            <Card key={listing.id} className='group cursor-pointer transition-shadow hover:shadow-md'>
              <CardHeader className='pb-2'>
                <div className='flex items-start justify-between gap-2'>
                  <div className='flex flex-col gap-1.5'>
                    <div className='flex items-center gap-2'>
                      {listing.category?.name && (
                        <Badge className='border text-[10px]' variant='outline'>
                          {listing.category.name}
                        </Badge>
                      )}
                      <Badge className={`border text-[10px] ${statusColors[listing.status] ?? ''}`} variant='outline'>
                        {listing.status}
                      </Badge>
                      <Badge
                        className={`border text-[10px] capitalize ${tierColors[listing.subscription_tier ?? 'free'] ?? tierColors.free}`}
                        variant='outline'
                      >
                        {listing.subscription_tier ?? 'free'}
                      </Badge>
                    </div>
                    <h2 className='font-antigua text-base font-semibold leading-snug tracking-tight'>
                      {listing.title}
                    </h2>
                  </div>
                </div>
                {listing.address && (
                  <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                    <MapPin className='h-3 w-3' />
                    {listing.address}
                  </div>
                )}
              </CardHeader>
              <CardContent className='space-y-3 pt-0'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                    <Clock className='h-3 w-3' />
                    Created {new Date(listing.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className='flex items-center gap-1'>
                    <ListingAnalytics listingId={listing.id} listingTitle={listing.title} />
                    <Button
                      size='sm'
                      variant='outline'
                      className='h-7 px-3 text-xs hover:border-[#CF9921] hover:text-[#CF9921]'
                      onClick={() => router.push(`/dashboard/listings/${listing.id}/edit`)}
                    >
                      Manage
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        )}
      </Main>
    </>
  )
}
