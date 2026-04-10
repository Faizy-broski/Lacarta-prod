'use client'

import { useEffect, useState } from 'react'
import { Heart, Tag, Calendar, Download, BookOpen, Loader2, User } from 'lucide-react'
import { useAuthStore } from '@/lib/auth/auth.store'
import { supabase } from '@/lib/supabase'
import { fetchFavorites, removeFavorite } from '@/lib/services/favorites.service'

interface FavItem {
  id: string
  item_type: string
  item_id: string
  title: string
  category: string
  saved_on: string
}

interface Deal {
  id: string
  title: string
  discount_value: number | null
  valid_until: string | null
  listing_title: string
}

interface EventItem {
  id: string
  title: string
  event_date: string
  location: string | null
}

interface ResourceItem {
  id: string
  title: string
  downloaded_at: string
}

interface ProfileData {
  favorites: FavItem[]
  deals: Deal[]
  events: EventItem[]
  resources: ResourceItem[]
}

function StatCard({ icon: Icon, count, label }: { icon: React.ElementType; count: number; label: string }) {
  return (
    <div className='flex flex-col items-center gap-1 rounded-xl border border-[#CF9921]/20 bg-white px-6 py-4 text-center shadow-sm'>
      <Icon className='h-5 w-5 text-[#CF9921]' />
      <span className='text-2xl font-bold text-gray-900'>{count}</span>
      <span className='text-xs text-gray-500'>{label}</span>
    </div>
  )
}

function Section({ icon: Icon, title, viewAllHref, onViewAll, children }: {
  icon: React.ElementType
  title: string
  viewAllHref?: string
  onViewAll?: () => void
  children: React.ReactNode
}) {
  return (
    <div className='rounded-2xl border border-gray-100 bg-white p-5 shadow-sm'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='flex items-center gap-2 font-semibold text-gray-900'>
          <Icon className='h-4 w-4 text-[#CF9921]' />
          {title}
        </h2>
        {viewAllHref && (
          <a href={viewAllHref} className='text-sm text-[#CF9921] hover:underline'>
            View all →
          </a>
        )}
        {onViewAll && (
          <button onClick={onViewAll} className='text-sm text-[#CF9921] hover:underline'>
            View all →
          </button>
        )}
      </div>
      {children}
    </div>
  )
}

export function SubscriberProfilePage() {
  const user = useAuthStore((s) => s.user)
  const [profileData, setProfileData] = useState<ProfileData>({ favorites: [], deals: [], events: [], resources: [] })
  const [loading, setLoading] = useState(true)
  const [showAllFavs, setShowAllFavs] = useState(false)
  const [showAllDeals, setShowAllDeals] = useState(false)

  useEffect(() => {
    if (!user?.accountNo) return

    async function load() {
      const uid = user!.accountNo!

      // Favorites
      const favs = await fetchFavorites(uid)
      const articleIds = favs.filter((f) => f.item_type === 'article').map((f) => f.item_id)
      const listingIds = favs.filter((f) => f.item_type === 'listing').map((f) => f.item_id)
      const titleMap = new Map<string, { title: string; category: string }>()

      if (articleIds.length) {
        const { data: arts } = await supabase
          .from('articles')
          .select('id, title, category:categories!category_id(name)')
          .in('id', articleIds)
        arts?.forEach((a: any) => titleMap.set(a.id, { title: a.title, category: a.category?.name ?? '—' }))
      }
      if (listingIds.length) {
        const { data: listings } = await supabase
          .from('listings')
          .select('id, title, category:categories!category_id(name)')
          .in('id', listingIds)
        listings?.forEach((l: any) => titleMap.set(l.id, { title: l.title, category: l.category?.name ?? '—' }))
      }

      const favorites: FavItem[] = favs.map((f) => ({
        id: f.id,
        item_type: f.item_type,
        item_id: f.item_id,
        title: titleMap.get(f.item_id)?.title ?? f.item_type,
        category: titleMap.get(f.item_id)?.category ?? '—',
        saved_on: new Date(f.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      }))

      // Upcoming events
      const today = new Date().toISOString().split('T')[0]
      const { data: eventsData } = await supabase
        .from('events')
        .select('id, title, event_date, location')
        .eq('status', 'published')
        .gte('event_date', today)
        .order('event_date', { ascending: true })
        .limit(5)

      const events: EventItem[] = (eventsData ?? []).map((e: any) => ({
        id: e.id,
        title: e.title,
        event_date: new Date(e.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        location: e.location,
      }))

      // Active deals
      const { data: dealsData } = await supabase
        .from('deals')
        .select('id, title, discount_value, expires_at, listing:listings!listing_id(title)')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(5)

      const deals: Deal[] = (dealsData ?? []).map((d: any) => ({
        id: d.id,
        title: d.title,
        discount_value: d.discount_value,
        valid_until: d.expires_at
          ? new Date(d.expires_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          : null,
        listing_title: d.listing?.title ?? '—',
      }))

      // Saved resources (favorites of type 'resource')
      const { data: resourceFavs } = await supabase
        .from('favorites')
        .select('id, item_id, created_at')
        .eq('user_id', uid)
        .eq('item_type', 'resource')
        .order('created_at', { ascending: false })
        .limit(5)

      const resourceIds = (resourceFavs ?? []).map((r: any) => r.item_id)
      const resMap = new Map<string, string>()
      if (resourceIds.length) {
        const { data: resData } = await supabase
          .from('resources')
          .select('id, title')
          .in('id', resourceIds)
        resData?.forEach((r: any) => resMap.set(r.id, r.title))
      }

      const resources: ResourceItem[] = (resourceFavs ?? []).map((r: any) => ({
        id: r.id,
        title: resMap.get(r.item_id) ?? 'Resource',
        downloaded_at: new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      }))

      setProfileData({ favorites, deals, events, resources })
      setLoading(false)
    }

    load()
  }, [user?.accountNo])

  const handleRemoveFav = async (item: FavItem) => {
    if (!user?.accountNo) return
    await removeFavorite(user.accountNo, item.item_type, item.item_id)
    setProfileData((prev) => ({ ...prev, favorites: prev.favorites.filter((f) => f.id !== item.id) }))
  }

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  return (
    <div className='mx-auto max-w-4xl px-4 py-10 sm:px-6'>
      {/* Profile header */}
      <div className='mb-8 flex items-center gap-4'>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-[#CF9921]/15 text-xl font-bold text-[#CF9921]'>
          {initials}
        </div>
        <div>
          <h1 className='font-antigua text-2xl font-bold tracking-tight text-gray-900'>
            {user?.name ?? 'My Profile'}
          </h1>
          <p className='text-sm text-gray-500'>{user?.email}</p>
        </div>
      </div>

      {/* Stats row */}
      {!loading && (
        <div className='mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4'>
          <StatCard icon={Heart} count={profileData.favorites.length} label='Saved' />
          <StatCard icon={Tag} count={profileData.deals.length} label='Active Deals' />
          <StatCard icon={Calendar} count={profileData.events.length} label='Upcoming Events' />
          <StatCard icon={Download} count={profileData.resources.length} label='Resources' />
        </div>
      )}

      {loading ? (
        <div className='flex items-center justify-center py-20'>
          <Loader2 className='h-6 w-6 animate-spin text-[#CF9921]' />
        </div>
      ) : (
        <div className='grid gap-5 sm:grid-cols-2'>
          {/* Favorites */}
          <Section
            icon={Heart}
            title='Favorites'
            onViewAll={profileData.favorites.length > 4 && !showAllFavs ? () => setShowAllFavs(true) : undefined}
          >
            {profileData.favorites.length === 0 ? (
              <p className='text-sm text-gray-400'>No saved items yet.</p>
            ) : (
              <div className='space-y-3'>
                {(showAllFavs ? profileData.favorites : profileData.favorites.slice(0, 4)).map((item) => (
                  <div key={item.id} className='flex items-center justify-between text-sm'>
                    <div>
                      <p className='font-medium leading-tight text-gray-800'>{item.title}</p>
                      <p className='text-xs text-gray-400'>{item.category} · {item.saved_on}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveFav(item)}
                      className='ml-2 text-[#CF9921] hover:text-[#CF9921]/70'
                      title='Remove from favorites'
                    >
                      <Heart className='h-3.5 w-3.5 fill-current' />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Active Deals */}
          <Section
            icon={Tag}
            title='Active Deals'
            onViewAll={profileData.deals.length > 4 && !showAllDeals ? () => setShowAllDeals(true) : undefined}
          >
            {profileData.deals.length === 0 ? (
              <p className='text-sm text-gray-400'>No active deals right now.</p>
            ) : (
              <div className='space-y-3'>
                {(showAllDeals ? profileData.deals : profileData.deals.slice(0, 4)).map((deal) => (
                  <div key={deal.id} className='flex items-center justify-between text-sm'>
                    <div>
                      <p className='font-medium leading-tight text-gray-800'>{deal.title}</p>
                      <p className='text-xs text-gray-400'>{deal.listing_title}</p>
                    </div>
                    <div className='text-right'>
                      {deal.discount_value != null && deal.discount_value > 0 && (
                        <span className='rounded-full bg-[#CF9921]/10 px-2 py-0.5 text-[10px] font-semibold text-[#CF9921]'>
                          {deal.discount_value}% off
                        </span>
                      )}
                      {deal.valid_until && (
                        <p className='mt-0.5 text-[10px] text-gray-400'>Until {deal.valid_until}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Upcoming Events */}
          <Section icon={Calendar} title='Upcoming Events' viewAllHref='/event-calendar'>
            {profileData.events.length === 0 ? (
              <p className='text-sm text-gray-400'>No upcoming events.</p>
            ) : (
              <div className='space-y-3'>
                {profileData.events.slice(0, 4).map((ev) => (
                  <div key={ev.id} className='flex items-start gap-3 text-sm'>
                    <div className='mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#CF9921]/10'>
                      <Calendar className='h-3.5 w-3.5 text-[#CF9921]' />
                    </div>
                    <div>
                      <p className='font-medium leading-tight text-gray-800'>{ev.title}</p>
                      <p className='text-xs text-gray-400'>
                        {ev.event_date}{ev.location ? ` · ${ev.location}` : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Saved Resources */}
          <Section icon={Download} title='Saved Resources' viewAllHref='/resources'>
            {profileData.resources.length === 0 ? (
              <p className='text-sm text-gray-400'>No saved resources yet.</p>
            ) : (
              <div className='space-y-3'>
                {profileData.resources.slice(0, 4).map((res) => (
                  <div key={res.id} className='flex items-center gap-2 text-sm'>
                    <BookOpen className='h-4 w-4 shrink-0 text-gray-400' />
                    <div>
                      <p className='font-medium leading-tight text-gray-800'>{res.title}</p>
                      <p className='text-xs text-gray-400'>Saved {res.downloaded_at}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>
      )}
    </div>
  )
}
