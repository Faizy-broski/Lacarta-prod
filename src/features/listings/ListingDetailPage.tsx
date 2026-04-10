'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  ArrowLeft, MapPin, Globe, Phone, Mail, Star, Clock, DollarSign,
  Tag, ExternalLink, Pencil, Trash2, CheckCircle2, Map, Lightbulb,
  Loader2, Calendar, ChevronRight, MessageCircle, Facebook, Instagram,
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { supabase } from '@/lib/supabase'

type ListingStatus = 'active' | 'inactive' | 'pending' | 'featured'

interface RoadMapItem {
  time?: string
  activity: string
}

interface RoadMapDay {
  day: number
  title?: string
  items?: RoadMapItem[]
}

interface TravelTip {
  title: string
  subtitle?: string
}

interface Deal {
  title: string
  subtitle?: string
  validity?: string
  link?: string
}

interface MenuItem {
  name: string
  price?: number
  description?: string
}

interface ReservationLink {
  label: string
  url: string
}

interface WeeklySlot {
  open: string
  close: string
}

interface WeeklyHours {
  mon?: WeeklySlot | null
  tue?: WeeklySlot | null
  wed?: WeeklySlot | null
  thu?: WeeklySlot | null
  fri?: WeeklySlot | null
  sat?: WeeklySlot | null
  sun?: WeeklySlot | null
}

interface Category {
  name: string
}

interface SubCategory {
  name: string
}

interface Listing {
  id: string
  title: string
  subtitle?: string
  description?: string
  address?: string
  neighborhood?: string
  cover_image?: string
  images?: string[]
  price_from?: number
  price_to?: number
  price_unit?: string
  rating?: number
  review_count?: number
  status: ListingStatus
  email?: string
  phone?: string
  website?: string
  whatsapp?: string
  facebook?: string
  instagram?: string
  key_features?: string[]
  services?: string[]
  amenities?: string[]
  neighbourhoods?: string[]
  atmosphere?: string[]
  road_map?: RoadMapDay[]
  travel_tips?: TravelTip[]
  deals?: Deal[]
  menu_items?: MenuItem[]
  reservation_links?: ReservationLink[]
  weekly_hours?: WeeklyHours
  start_time?: string
  end_time?: string
  pickup_time?: string
  travel_duration?: string
  beach_start?: string
  beach_end?: string
  faqs?: { question: string; answer: string }[]
  category_tags?: string[]
  seo_slug?: string
  google_maps_link?: string
  created_at: string
  updated_at: string
  categories?: Category
  'sub-categories'?: SubCategory
}

const statusBadgeColor: Record<ListingStatus, string> = {
  active: 'bg-green-100 text-green-700 border-green-200',
  inactive: 'bg-red-100 text-red-700 border-red-200',
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  featured: 'bg-amber-100 text-amber-700 border-amber-200',
}

const DAY_LABELS: Record<string, string> = {
  mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday',
  fri: 'Friday', sat: 'Saturday', sun: 'Sunday',
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className='rounded-2xl border bg-card p-6 shadow-sm'>
      <div className='mb-4 flex items-center gap-2 border-b pb-3'>
        <div className='rounded-lg bg-amber-50 p-1.5 text-amber-600'>{icon}</div>
        <h3 className='font-semibold text-foreground'>{title}</h3>
      </div>
      {children}
    </div>
  )
}

function InfoRow({ icon, label, value, href }: {
  icon: React.ReactNode
  label: string
  value?: string | null
  href?: string | null
}) {
  if (!value) return null
  const inner = (
    <div className='flex items-start gap-3 py-2'>
      <div className='mt-0.5 shrink-0 text-muted-foreground/80'>{icon}</div>
      <div className='min-w-0 flex-1'>
        <p className='text-xs text-muted-foreground/80'>{label}</p>
        <p className='break-words text-sm text-foreground'>{value}</p>
      </div>
    </div>
  )
  if (href) return (
    <a href={href} target='_blank' rel='noopener noreferrer' className='block -mx-2 rounded-lg px-2 transition hover:bg-muted'>
      {inner}
    </a>
  )
  return <div className='-mx-2 px-2'>{inner}</div>
}

function ChipList({ items, color = 'bg-muted text-gray-700' }: { items?: string[]; color?: string }) {
  if (!items || items.length === 0) return <p className='text-sm text-muted-foreground/80'>None specified</p>
  return (
    <div className='flex flex-wrap gap-2'>
      {items.map((item, i) => (
        <span key={i} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${color}`}>
          <CheckCircle2 className='h-3 w-3' /> {item}
        </span>
      ))}
    </div>
  )
}

export function ListingDetailPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (!id) return
    supabase
      .from('listings')
      .select('*, categories(name), "sub-categories"(name)')
      .eq('id', id)
      .single()
      .then(({ data }) => { setListing(data as Listing); setLoading(false) })
  }, [id])

  async function handleDelete() {
    setDeleting(true)
    await supabase.from('listings').delete().eq('id', id!)
    router.push('/dashboard/listings')
  }

  if (loading) {
    return (
      <>
        <Header />
        <Main>
          <div className='flex h-96 items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin text-amber-500' />
          </div>
        </Main>
      </>
    )
  }

  if (!listing) {
    return (
      <>
        <Header />
        <Main>
          <div className='flex h-96 flex-col items-center justify-center gap-3 text-muted-foreground'>
            <p className='text-lg font-medium'>Listing not found</p>
            <button onClick={() => router.push('/dashboard/listings')} className='text-sm text-amber-600 hover:underline'>
              ← Back to listings
            </button>
          </div>
        </Main>
      </>
    )
  }

  const allImages = [listing.cover_image, ...(listing.images || [])].filter(Boolean) as string[]

  return (
    <>
      <Header />
      <Main>
        <div className='min-h-screen bg-background text-foreground font-sans'>
          <div className='sticky top-0 z-10 border-b bg-card px-6 py-4 shadow-sm'>
            <div className='mx-auto flex max-w-5xl items-center justify-between'>
              <div className='flex items-center gap-3'>
                <button
                  onClick={() => router.push('/dashboard/listings')}
                  className='rounded-lg p-2 text-muted-foreground transition hover:bg-muted'
                  aria-label='Back to listings'
                >
                  <ArrowLeft className='h-4 w-4' />
                </button>
                <div>
                  <div className='flex items-center gap-2'>
                    <h1 className='text-xl font-bold text-foreground'>{listing.title}</h1>
                    <Badge className={statusBadgeColor[listing.status] || 'bg-muted text-muted-foreground'}>
                      {listing.status}
                    </Badge>
                  </div>
                  <div className='mt-0.5 flex items-center gap-2'>
                    {listing.categories && <span className='text-xs text-muted-foreground'>{listing.categories.name}</span>}
                    {listing['sub-categories'] && (
                      <>
                        <ChevronRight className='h-3 w-3 text-muted-foreground/80' />
                        <span className='text-xs text-muted-foreground'>{listing['sub-categories'].name}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => router.push(`/dashboard/listings/${id}/edit`)}
                >
                  <Pencil className='h-4 w-4' /> Edit
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setDeleteOpen(true)}
                  className='border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
                >
                  <Trash2 className='h-4 w-4' /> Delete
                </Button>
              </div>
            </div>
          </div>

          <div className='mx-auto max-w-5xl space-y-6 px-6 py-6'>
            {allImages.length > 0 && (
              <div className='overflow-hidden rounded-2xl border bg-card shadow-sm'>
                <div className='relative h-72 w-full bg-muted'>
                  <img
                    src={allImages[activeImage]}
                    alt={listing.title}
                    className='h-full w-full object-cover'
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/800x300?text=No+Image' }}
                  />
                </div>
                {allImages.length > 1 && (
                  <div className='flex gap-2 overflow-x-auto p-3'>
                    {allImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        aria-label={`View image ${i + 1}`}
                        className={`h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${i === activeImage ? 'border-amber-400' : 'border-transparent'}`}
                      >
                        <img src={img} alt='' className='h-full w-full object-cover' />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className='grid grid-cols-3 gap-6'>
              <div className='col-span-2 space-y-6'>
                {(listing.subtitle || listing.description) && (
                  <Section icon={<Tag className='h-4 w-4' />} title='About'>
                    {listing.subtitle && <p className='mb-2 text-base font-medium text-gray-700'>{listing.subtitle}</p>}
                    {/* {listing.description && <p className='text-sm leading-relaxed text-muted-foreground'>{listing.description}</p>} */}
                    {listing.description && (
  <div
    className="prose prose-sm max-w-none text-muted-foreground"
    dangerouslySetInnerHTML={{ __html: listing.description }}
  />
)}
                  </Section>
                )}

                {listing.video_urls && listing.video_urls.length > 0 && (
                  <Section icon={<Tag className='h-4 w-4' />} title='Videos'>
                    <div className='grid gap-4 sm:grid-cols-2'>
                      {listing.video_urls.map((vid: string, i: number) => (
                        <a key={i} href={vid} target='_blank' rel='noopener noreferrer' className='flex items-center gap-2 rounded-lg border bg-muted/50 p-3 text-sm font-medium text-blue-600 hover:underline'>
                          <ExternalLink className='h-4 w-4' /> Watch Video {i + 1}
                        </a>
                      ))}
                    </div>
                  </Section>
                )}

                {listing.room_types && listing.room_types.length > 0 && (
                  <Section icon={<Tag className='h-4 w-4' />} title={listing.room_types_title || 'Room Types & Accommodations'}>
                    <div className='space-y-3'>
                      {listing.room_types.map((room: any, i: number) => (
                        <div key={i} className='flex gap-4 rounded-xl border border-border bg-muted/20 p-3'>
                          {room.image && (
                            <img src={room.image} alt={room.name} className='h-20 w-32 flex-shrink-0 rounded-lg object-cover' />
                          )}
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-center justify-between'>
                              <p className='text-sm font-semibold text-foreground truncate'>{room.name}</p>
                              {room.price && <p className='text-sm font-bold text-amber-600 flex-shrink-0'>${Number(room.price).toLocaleString()}</p>}
                            </div>
                            {room.description && <p className='mt-1 text-xs text-muted-foreground line-clamp-2'>{room.description}</p>}
                            <div className='mt-2 flex flex-wrap gap-2 text-[10px] text-muted-foreground'>
                              {room.size && <span className='rounded bg-muted px-1.5 py-0.5'>Size: {room.size}</span>}
                              {room.beds && <span className='rounded bg-muted px-1.5 py-0.5'>Beds: {room.beds}</span>}
                              {room.capacity && <span className='rounded bg-muted px-1.5 py-0.5'>Max: {room.capacity}</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                {listing.road_map && listing.road_map.length > 0 && (
                  <Section icon={<Map className='h-4 w-4' />} title='Road Map / Itinerary'>
                    <div className='space-y-4'>
                      {listing.road_map.map((day, i) => (
                        <div key={i} className='overflow-hidden rounded-xl border border-amber-100 bg-amber-50/40'>
                          <div className='flex items-center gap-3 bg-amber-100/60 px-4 py-2.5'>
                            <span className='flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white'>
                              {day.day}
                            </span>
                            <span className='text-sm font-semibold text-foreground'>{day.title || `Day ${day.day}`}</span>
                          </div>
                          {day.items && day.items.length > 0 && (
                            <div className='divide-y divide-amber-100/60 px-4'>
                              {day.items.map((item, j) => (
                                <div key={j} className='flex items-start gap-3 py-2'>
                                  {item.time && (
                                    <span className='w-20 flex-shrink-0 text-xs font-medium text-amber-600'>{item.time}</span>
                                  )}
                                  <span className='text-sm text-gray-700'>{item.activity}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                {listing.travel_tips && listing.travel_tips.length > 0 && (
                  <Section icon={<Lightbulb className='h-4 w-4' />} title='Travel Tips'>
                    <div className='space-y-3'>
                      {listing.travel_tips.map((tip, i) => (
                        <div key={i} className='flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3'>
                          <Lightbulb className='mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500' />
                          <div>
                            <p className='text-sm font-semibold text-foreground'>{tip.title}</p>
                            {tip.subtitle && <p className='mt-0.5 text-xs text-muted-foreground'>{tip.subtitle}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                {listing.deals && listing.deals.length > 0 && (
                  <Section icon={<Tag className='h-4 w-4' />} title='Deals & Promotions'>
                    <div className='space-y-3'>
                      {listing.deals.map((deal, i) => (
                        <div key={i} className='flex items-start justify-between rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3'>
                          <div className='space-y-2 flex-1'>
                            <div>
                              <div className='flex items-center gap-2'>
                                <p className='text-sm font-semibold text-foreground'>{deal.title}</p>
                                {deal.deal_type && (
                                  <span className='rounded bg-emerald-200/50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800'>
                                    {deal.deal_type}
                                  </span>
                                )}
                              </div>
                              {deal.subtitle && <p className='mt-0.5 text-xs text-muted-foreground'>{deal.subtitle}</p>}
                            </div>
                            
                            {deal.description && <p className='text-xs text-muted-foreground'>{deal.description}</p>}
                            {deal.offers_description && (
                              <p className='text-xs text-muted-foreground'>
                                <strong className='text-foreground'>{deal.offers_title || 'Offers'}:</strong> {deal.offers_description}
                              </p>
                            )}

                            {deal.experience_included && deal.experience_included.length > 0 && (
                              <div className='mt-1 rounded-lg bg-white/50 p-2'>
                                <p className='text-xs font-semibold text-foreground mb-1'>{deal.experience_title || 'What’s Included'}</p>
                                <ul className='list-inside list-disc text-xs text-muted-foreground'>
                                  {deal.experience_included.map((exp: any, ei: number) => (
                                    <li key={ei}>{exp.title}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className='flex flex-wrap gap-2 pt-1'>
                              {(deal.start_date || deal.end_date) && (
                                <span className='inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800'>
                                  <Calendar className='h-3 w-3' /> 
                                  Valid: {deal.start_date || '?'} to {deal.end_date || '?'}
                                </span>
                              )}
                              {deal.coupon_code && (
                                <span className='inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800'>
                                  <Tag className='h-2.5 w-2.5' /> Code: <span className='font-bold'>{deal.coupon_code}</span>
                                </span>
                              )}
                              {deal.discount && (
                                <span className='inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800'>
                                  Discount: {deal.discount}
                                </span>
                              )}
                              {deal.percent_off && (
                                <span className='inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800 font-bold'>
                                  {deal.percent_off}% OFF
                                </span>
                              )}
                            </div>
                          </div>
                          {(deal.button_link || deal.acquire_link) && (
                            <a
                              href={deal.button_link || deal.acquire_link} target='_blank' rel='noopener noreferrer'
                              className='ml-3 flex-shrink-0 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-700'
                            >
                              View Deal
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                {listing.menu_items && listing.menu_items.length > 0 && (
                  <Section icon={<Tag className='h-4 w-4' />} title='Menu'>
                    <div className='space-y-2'>
                      {listing.menu_items.map((item, i) => (
                        <div key={i} className='flex items-center justify-between rounded-lg border border-border bg-muted/50 px-4 py-2.5'>
                          <div>
                            <p className='text-sm font-medium text-foreground'>{item.name}</p>
                            {item.description && <p className='text-xs text-muted-foreground'>{item.description}</p>}
                          </div>
                          {item.price !== undefined && (
                            <span className='ml-4 text-sm font-semibold text-foreground'>
                              ${Number(item.price).toLocaleString()}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                {listing.weekly_hours && (
                  <Section icon={<Clock className='h-4 w-4' />} title='Weekly Hours'>
                    {listing.hours_status && <p className='mb-2 text-sm font-semibold text-amber-600'>{listing.hours_status}</p>}
                    {listing.hours_note && <p className='mb-3 text-sm text-muted-foreground'>{listing.hours_note}</p>}
                    <div className='space-y-1'>
                      {(Object.entries(listing.weekly_hours) as [string, WeeklySlot | null | undefined][]).map(([day, slot]) => (
                        <div key={day} className='flex items-center justify-between rounded-lg px-2 py-1.5 even:bg-muted/50'>
                          <span className='text-sm font-medium text-gray-700'>{DAY_LABELS[day] ?? day}</span>
                          {slot && slot.open ? (
                            <span className='text-sm text-muted-foreground'>
                              {(slot as any).slots && (slot as any).slots.length > 0 
                                ? (slot as any).slots.map((s: any) => `${s.start} – ${s.end}`).join(', ') 
                                : 'Open'}
                            </span>
                          ) : (
                            <span className='text-xs text-muted-foreground/80'>Closed</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                {listing.whats_included && listing.whats_included.items && listing.whats_included.items.length > 0 && (
                  <Section icon={<CheckCircle2 className='h-4 w-4' />} title={listing.whats_included.title || 'What’s Included'}>
                    <ul className='grid gap-2 sm:grid-cols-2 list-inside list-disc text-sm text-foreground'>
                      {listing.whats_included.items.map((item: any, i: number) => (
                        <li key={i}>{item.content}</li>
                      ))}
                    </ul>
                  </Section>
                )}

                {listing.important_info && listing.important_info.items && listing.important_info.items.length > 0 && (
                  <Section icon={<Lightbulb className='h-4 w-4' />} title={listing.important_info.title || 'Important Information'}>
                    <ul className='space-y-2 list-inside list-disc text-sm text-muted-foreground'>
                      {listing.important_info.items.map((item: any, i: number) => (
                        <li key={i}>{item.content}</li>
                      ))}
                    </ul>
                  </Section>
                )}

                {listing.faqs && listing.faqs.length > 0 && (
                  <Section icon={<CheckCircle2 className='h-4 w-4' />} title='FAQs'>
                    <div className='space-y-3'>
                      {listing.faqs.map((faq, i) => (
                        <div key={i} className='rounded-xl border border-border bg-muted/50 px-4 py-3'>
                          <p className='text-sm font-semibold text-foreground'>{faq.question}</p>
                          <p className='mt-1 text-sm text-muted-foreground'>{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                <Section icon={<CheckCircle2 className='h-4 w-4' />} title='Services & Amenities'>
                  <div className='space-y-5'>
                    <div>
                      <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Key Features</p>
                      <ChipList items={listing.key_features} color='bg-blue-50 text-blue-700 border border-blue-100' />
                    </div>
                    <div>
                      <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Services</p>
                      <ChipList items={listing.services} color='bg-purple-50 text-purple-700 border border-purple-100' />
                    </div>
                    <div>
                      <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Amenities</p>
                      <ChipList items={listing.amenities} color='bg-emerald-50 text-emerald-700 border border-emerald-100' />
                    </div>
                    <div>
                      <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Atmosphere</p>
                      <ChipList items={listing.atmosphere} color='bg-pink-50 text-pink-700 border border-pink-100' />
                    </div>
                    <div>
                      <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Neighbourhoods</p>
                      <ChipList items={listing.neighbourhoods} color='bg-orange-50 text-orange-700 border border-orange-100' />
                    </div>
                  </div>
                </Section>
              </div>

              <div className='space-y-6'>
                <div className='rounded-2xl border bg-card p-5 shadow-sm'>
                  <p className='mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Pricing</p>
                  {!listing.price_from && !listing.price_to ? (
                    <p className='text-lg font-bold text-green-600'>Free</p>
                  ) : (
                    <div>
                      <p className='text-2xl font-bold text-foreground'>
                        ${Number(listing.price_from).toLocaleString()}
                        {listing.price_to && listing.price_to > (listing.price_from ?? 0) && (
                          <span className='text-lg text-muted-foreground'> – ${Number(listing.price_to).toLocaleString()}</span>
                        )}
                      </p>
                      <p className='text-xs text-muted-foreground/80'>per {listing.price_unit || 'person'}</p>
                    </div>
                  )}
                  {(listing.start_time || listing.end_time) && (
                    <div className='mt-3 flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm text-muted-foreground'>
                      <Clock className='h-4 w-4 text-muted-foreground/80' />
                      {listing.start_time && listing.end_time
                        ? `${listing.start_time} – ${listing.end_time}`
                        : listing.start_time || listing.end_time}
                    </div>
                  )}
                  {listing.pickup_time && (
                    <div className='mt-2 flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm text-muted-foreground'>
                      <Clock className='h-4 w-4 text-muted-foreground/80' />
                      Pickup: {listing.pickup_time}
                    </div>
                  )}
                  {(listing.rating ?? 0) > 0 && (
                    <div className='mt-3 flex items-center gap-2'>
                      <Star className='h-4 w-4 fill-amber-400 text-amber-400' />
                      <span className='font-semibold text-foreground'>{listing.rating}</span>
                      {listing.review_count && listing.review_count > 0 && (
                        <span className='text-xs text-muted-foreground/80'>({listing.review_count} reviews)</span>
                      )}
                    </div>
                  )}
                </div>

                <div className='rounded-2xl border bg-card p-5 shadow-sm'>
                  <p className='mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Contact</p>
                  <div className='divide-y'>
                    <InfoRow
                      icon={<MapPin className='h-4 w-4' />}
                      label='Address'
                      value={[listing.address, listing.neighborhood].filter(Boolean).join(', ') || null}
                    />
                    <InfoRow icon={<Mail className='h-4 w-4' />} label='Email' value={listing.email} href={listing.email ? `mailto:${listing.email}` : null} />
                    <InfoRow icon={<Phone className='h-4 w-4' />} label='Phone' value={listing.phone} href={listing.phone ? `tel:${listing.phone}` : null} />
                    <InfoRow
                      icon={<Globe className='h-4 w-4' />}
                      label='Website'
                      value={listing.website}
                      href={listing.website ? (listing.website.startsWith('http') ? listing.website : `https://${listing.website}`) : null}
                    />
                    <InfoRow
                      icon={<MessageCircle className='h-4 w-4' />}
                      label='WhatsApp'
                      value={listing.whatsapp}
                      href={listing.whatsapp ? `https://wa.me/${listing.whatsapp.replace(/\D/g, '')}` : null}
                    />
                    <InfoRow
                      icon={<Facebook className='h-4 w-4' />}
                      label='Facebook'
                      value={listing.facebook}
                      href={listing.facebook}
                    />
                    <InfoRow
                      icon={<Instagram className='h-4 w-4' />}
                      label='Instagram'
                      value={listing.instagram}
                      href={listing.instagram}
                    />
                    {!listing.latitude && !listing.longitude && listing.google_maps_link && (
                      <InfoRow
                        icon={<Map className='h-4 w-4' />}
                        label='Google Maps'
                        value='View on map'
                        href={listing.google_maps_link}
                      />
                    )}
                  </div>
                  
                  {listing.latitude && listing.longitude && (
                    <div className='mt-5 pt-5 border-t border-border'>
                      <iframe
                        src={`https://maps.google.com/maps?q=${listing.latitude},${listing.longitude}&hl=en&z=15&output=embed`}
                        title='Location Map'
                        className='w-full h-48 rounded-xl border border-gray-100 shadow-sm'
                        style={{ border: 0 }}
                        allowFullScreen
                        loading='lazy'
                        referrerPolicy='no-referrer-when-downgrade'
                      />
                      {listing.google_maps_link && (
                        <a href={listing.google_maps_link} target='_blank' rel='noopener noreferrer' className='mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-100'>
                          <MapPin className='h-3.5 w-3.5' /> Open in Maps App
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {listing.reservation_links && listing.reservation_links.length > 0 && (
                  <div className='rounded-2xl border bg-card p-5 shadow-sm'>
                    <p className='mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Book Online</p>
                    <div className='space-y-2'>
                      {listing.reservation_links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100'
                        >
                          {link.label} <ExternalLink className='h-3.5 w-3.5' />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {listing.book_with_us && (listing.book_with_us.title || listing.book_with_us.button_link || listing.book_with_us.why_title) && (
                  <div className='rounded-2xl border bg-card p-5 shadow-sm'>
                    <p className='mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Book With Us</p>
                    {listing.book_with_us.title && <p className='text-sm font-medium text-foreground mb-2'>{listing.book_with_us.title}</p>}
                    {listing.book_with_us.button_link && (
                      <a href={listing.book_with_us.button_link} target='_blank' rel='noopener noreferrer' className='mb-3 flex w-full items-center justify-center rounded-lg bg-amber-500 py-2.5 text-xs font-semibold text-white transition hover:bg-amber-600'>
                        {listing.book_with_us.button_text || 'Book Now'}
                      </a>
                    )}
                    {listing.book_with_us.why_title && (
                      <div className='mt-2 border-t pt-2'>
                        <p className='text-xs font-medium text-foreground'>{listing.book_with_us.why_title}</p>
                        {listing.book_with_us.why_link && (
                          <a href={listing.book_with_us.why_link} target='_blank' rel='noopener noreferrer' className='text-[10px] font-semibold text-amber-600 hover:underline inline-block mt-1'>LEARN MORE →</a>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {listing.direct_links && listing.direct_links.length > 0 && (
                  <div className='rounded-2xl border bg-card p-5 shadow-sm'>
                    <p className='mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Direct Links</p>
                    <div className='space-y-2'>
                      {listing.direct_links.map((link: any, i: number) => (
                        <a key={i} href={link.url} target='_blank' rel='noopener noreferrer' className='flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100'>
                          {link.label} <ExternalLink className='h-3.5 w-3.5 text-muted-foreground' />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {listing.category_tags && listing.category_tags.length > 0 && (
                  <div className='rounded-2xl border bg-card p-5 shadow-sm'>
                    <p className='mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Tags</p>
                    <div className='flex flex-wrap gap-2'>
                      {listing.category_tags.map((tag, i) => (
                        <Badge key={i} className='bg-muted text-muted-foreground'>{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className='space-y-1 rounded-2xl border bg-card p-5 text-xs text-muted-foreground/80 shadow-sm'>
                  {listing.rnt_no && <p>RNT: <span className='font-medium text-foreground'>{listing.rnt_no}</span></p>}
                  {listing.inventory && <p>Inventory: <span className='font-medium text-foreground'>{listing.inventory} units/rooms</span></p>}
                  {listing.seo_slug && <p>Slug: <span className='font-mono text-muted-foreground'>/{listing.seo_slug}</span></p>}
                  <p>ID: <span className='font-mono text-muted-foreground'>{listing.id}</span></p>
                  <p>Created: {new Date(listing.created_at).toLocaleString()}</p>
                  <p>Updated: {new Date(listing.updated_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Listing</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete <strong>{listing.title}</strong>? This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={deleting}
                  className='bg-red-600 hover:bg-red-700 focus:ring-red-600'
                >
                  {deleting ? <Loader2 className='h-4 w-4 animate-spin' /> : <Trash2 className='h-4 w-4' />}
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Main>
    </>
  )
}

export default ListingDetailPage
