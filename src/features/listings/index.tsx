'use client'
import { useEffect, useState, useCallback } from 'react'
import {
  Plus, Pencil, Trash2, MapPin, Globe, Phone, Mail, Star, Eye,
  BookOpen, Tag, Clock, DollarSign, Search, RefreshCw,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { useSearchParams } from 'next/navigation'

type ListingStatus = 'active' | 'inactive' | 'pending' | 'featured'

interface Category {
  id: string
  name: string
}

interface SubCategory {
  name: string
}

interface Listing {
  id: string
  title: string
  subtitle?: string
  address?: string
  neighborhoods?: string[]
  price_from?: number
  price_to?: number
  price_unit?: string
  rating?: number
  review_count?: number
  status: ListingStatus
  email?: string
  phone?: string
  website?: string
  created_at: string
  category_id?: string
  sub_category_id?: string
  categories?: Category
  'sub-categories'?: SubCategory
}

const STATUSES: ListingStatus[] = ['active', 'inactive', 'pending', 'featured']

const statusBadgeVariant: Record<ListingStatus, string> = {
  active: 'bg-green-100 text-green-700 border-green-200',
  inactive: 'bg-red-100 text-red-700 border-red-200',
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  featured: 'bg-amber-100 text-amber-700 border-amber-200',
}

interface StatCardProps {
  label: string
  value: number
  icon: React.ReactNode
  color: string
}

function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <Card className='border-0 shadow-md'>
      <CardContent className='flex items-center gap-3 p-4'>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
          {icon}
        </div>
        <div>
          <p className='text-[11px] text-muted-foreground'>{label}</p>
          <p className='text-2xl font-bold'>{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function StarRating({ rating }: { rating?: number }) {
  if (!rating) return <span className='text-xs text-gray-400'>No rating</span>
  return (
    <div className='flex items-center gap-1'>
      <Star className='h-3.5 w-3.5 fill-amber-400 text-amber-400' />
      <span className='text-sm font-medium text-gray-700'>{rating}</span>
    </div>
  )
}

export function ListingsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [listings, setListings] = useState<Listing[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [showAddMenu, setShowAddMenu] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    const [{ data: listingsData }, { data: categoriesData }] = await Promise.all([
      supabase
        .from('listings')
        .select('*, categories(name), "sub-categories"(name)')
        .order('created_at', { ascending: false }),
      supabase.from('categories').select('id, name').order('name'),
    ])
    setListings((listingsData as Listing[]) || [])
    console.log(listingsData)
    setCategories((categoriesData as Category[]) || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  // Sync filterCategory with URL query param on mount
  useEffect(() => {
    const urlCategory = searchParams.get('category')
    if (urlCategory) setFilterCategory(urlCategory)
  }, [searchParams])

  const filtered = listings.filter((l) => {
    const q = search.toLowerCase()
    const matchSearch =
      l.title?.toLowerCase().includes(q) ||
      l.address?.toLowerCase().includes(q) ||
      l?.neighborhoods?.[0]?.toLowerCase().includes(q)
    const matchCat = filterCategory === 'all' || l.category_id === filterCategory
    const matchStatus = filterStatus === 'all' || l.status === filterStatus
    return matchSearch && matchCat && matchStatus
  })

  async function handleDelete(id: string) {
    setDeleting(true)
    await supabase.from('listings').delete().eq('id', id)
    setListings((prev) => prev.filter((l) => l.id !== id))
    setDeleteConfirm(null)
    setDeleting(false)
  }

  const stats = {
    total: listings.length,
    active: listings.filter((l) => l.status === 'active').length,
    featured: listings.filter((l) => l.status === 'featured').length,
    pending: listings.filter((l) => l.status === 'pending').length,
  }

  return (
    <>
      <Header />
      <Main>
        <div className='mb-6 space-y-1'>
          <div className='mx-auto flex max-w-7xl items-center justify-between'>
            <div>
              <h1 className='font-antigua text-3xl font-bold tracking-tight'>Listings</h1>
              <p className='text-xs text-muted-foreground'>Manage all La Carta directory listings</p>
            </div>
            <div className='flex items-center gap-2'>
              <button
                onClick={fetchData}
                className='rounded-full border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50'
                title='Refresh'
                aria-label='Refresh listings'
              >
                <RefreshCw className='h-4 w-4' />
              </button>
              {/* Optimized Add Listing button logic */}
              {filterCategory !== 'all' ? (
                <Button
                  onClick={() => {
                    let cat = categories.find((c) => c.id === filterCategory)
                    if (!cat) {
                      // Try to match by slug if not found by id
                      cat = categories.find((c) => c.name.toLowerCase().replace(/\s+/g, '_') === filterCategory)
                    }
                    if (!cat) return
                    const slug = cat.name.toLowerCase().replace(/\s+/g, '_')
                    router.push(`/dashboard/listings/${slug}/create`)
                  }}
                >
                  <Plus className='h-4 w-4' />
                  Add Listing
                </Button>
              ) : (
                <div className='relative'>
                  <Button
                    onClick={() => setShowAddMenu((v) => !v)}
                    aria-haspopup='true'
                    aria-expanded={showAddMenu ? 'true' : 'false'}
                  >
                    <Plus className='h-4 w-4' />
                    Add Listing
                  </Button>
                  {showAddMenu && (
                    <div className='absolute right-0 z-10 mt-2 w-48 rounded-md border bg-white shadow-lg'>
                      {categories.map((cat) => {
                        const slug = cat.name.toLowerCase().replace(/\s+/g, '_')
                        return (
                          <button
                            key={cat.id}
                            className='block w-full px-4 py-2 text-left text-sm hover:bg-gray-100'
                            onClick={() => {
                              setShowAddMenu(false)
                              router.push(`/dashboard/listings/${slug}/create`)
                            }}
                          >
                            Add {cat.name} Listing
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4'>
          <StatCard label='Total Listings' value={stats.total} icon={<BookOpen className='h-5 w-5 text-blue-600' />} color='bg-blue-50' />
          <StatCard label='Active' value={stats.active} icon={<Eye className='h-5 w-5 text-green-600' />} color='bg-green-50' />
          <StatCard label='Featured' value={stats.featured} icon={<Star className='h-5 w-5 text-amber-500' />} color='bg-amber-50' />
          <StatCard label='Pending Review' value={stats.pending} icon={<Clock className='h-5 w-5 text-orange-500' />} color='bg-orange-50' />
        </div>

        <div className='mb-6 flex flex-col gap-3 rounded-xl border bg-white p-4 sm:flex-row sm:flex-wrap sm:items-center'>
          <div className='relative w-full sm:flex-1'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
            <Input
              placeholder='Search listings...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='pl-9'
            />
          </div>
          <div className='flex w-full flex-1 gap-3 self-end'>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='All Categories' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className='w-full capitalize'>
                <SelectValue placeholder='All Statuses' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Statuses</SelectItem>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s} className='capitalize'>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='overflow-hidden rounded-xl border bg-white shadow-sm'>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b bg-gray-50'>
                  <th className='px-4 py-3 text-left font-semibold text-gray-600'>Title</th>
                  <th className='px-4 py-3 text-left font-semibold text-gray-600'>Category</th>
                  <th className='px-4 py-3 text-left font-semibold text-gray-600'>Neighborhood</th>
                  <th className='px-4 py-3 text-left font-semibold text-gray-600'>Price Range</th>
                  <th className='px-4 py-3 text-left font-semibold text-gray-600'>Rating</th>
                  {/* <th className='px-4 py-3 text-left font-semibold text-gray-600'>Status</th> */}
                  <th className='px-4 py-3 text-left font-semibold text-gray-600'>Contact</th>
                  <th className='px-4 py-3 text-right font-semibold text-gray-600'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i} className='border-b'>
                      {Array.from({ length: 8 }).map((_, j) => (
                        <td key={j} className='px-4 py-3'>
                          <div className='h-4 animate-pulse rounded bg-gray-100' />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className='py-12 text-center text-gray-400'>
                      <div className='flex flex-col items-center gap-2'>
                        <BookOpen className='h-8 w-8 text-gray-300' />
                        <p>No listings found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((listing) => (
                    <tr key={listing.id} className='border-b transition-colors last:border-0 hover:bg-gray-50'>
                      <td className='px-4 py-3'>
                        <div>
                          <p className='truncate font-semibold text-gray-900'>{listing.title}</p>
                          {listing.subtitle && (
                            <p className='mt-0.5 max-w-[180px] truncate text-xs text-gray-400'>{listing.subtitle}</p>
                          )}
                          <p className='mt-0.5 text-xs text-gray-400'>
                            Added {new Date(listing.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </td>
                      <td className='px-4 py-3'>
                        <div className='space-y-1'>
                          {listing.categories && (
                            <Badge className='bg-blue-50 text-blue-700 border-blue-200'>
                              {listing.categories.name}
                            </Badge>
                          )}
                          {listing['sub-categories'] && (
                            <p className='text-xs text-gray-400'>{listing['sub-categories'].name}</p>
                          )}
                        </div>
                      </td>
                      <td className='px-4 py-3'>
                        <div className='flex max-w-[160px] items-start gap-1.5 text-gray-600'>
                          <MapPin className='mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400' />
                          <span className='text-xs leading-snug'>{listing.neighborhoods?.[0]}</span>
                        </div>
                      </td>
                      <td className='px-4 py-3'>
                        <div className='flex items-center gap-1 text-gray-700'>
                          <DollarSign className='h-3.5 w-3.5 text-gray-400' />
                          {!listing.price_from && !listing.price_to ? (
                            <span className='text-xs text-gray-400'>Free</span>
                          ) : (
                            <span className='text-xs font-medium'>
                              ${Number(listing.price_from).toLocaleString()} – ${Number(listing.price_to).toLocaleString()}
                              {listing.price_unit && (
                                <span className='text-gray-400'> /{listing.price_unit}</span>
                              )}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className='px-4 py-3'>
                        <div className='space-y-0.5'>
                          {/* <StarRating rating={listing.rating} /> */}
                          {listing.review_count && listing.review_count > 0 && (
                            <p className='text-xs text-gray-400'>{listing.review_count} reviews</p>
                          )}
                        </div>
                      </td>
                      {/* <td className='px-4 py-3'>
                        <Badge className={statusBadgeVariant[listing.status] || 'bg-gray-100 text-gray-600'}>
                          {listing.status}
                        </Badge>
                      </td> */}
                      <td className='px-4 py-3'>
                        <div className='space-y-1'>
                          {listing.email && (
                            <div className='flex items-center gap-1.5 text-xs text-gray-500'>
                              <Mail className='h-3 w-3 text-gray-400' />
                              <span className='max-w-[120px] truncate'>{listing.email}</span>
                            </div>
                          )}
                          {listing.phone && (
                            <div className='flex items-center gap-1.5 text-xs text-gray-500'>
                              <Phone className='h-3 w-3 text-gray-400' />
                              {listing.phone}
                            </div>
                          )}
                          {listing.website && (
                            <div className='flex items-center gap-1.5 text-xs text-gray-500'>
                              <Globe className='h-3 w-3 text-gray-400' />
                              {listing.website}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className='px-4 py-3'>
                        <div className='flex items-center justify-end gap-1'>
                          <button
                            onClick={() => router.push(`/listings/${listing.id}`)}
                            className='rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700'
                            title='View'
                            aria-label={`View ${listing.title}`}
                          >
                            <Eye className='h-4 w-4' />
                          </button>
                          <button
                            onClick={() => router.push(`/listings/${listing.id}/edit`)}
                            className='rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700'
                            title='Edit'
                            aria-label={`Edit ${listing.title}`}
                          >
                            <Pencil className='h-4 w-4' />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(listing.id)}
                            className='rounded-lg p-1.5 text-gray-500 transition hover:bg-red-50 hover:text-red-600'
                            title='Delete'
                            aria-label={`Delete ${listing.title}`}
                          >
                            <Trash2 className='h-4 w-4' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {filtered.length > 0 && (
            <div className='border-t bg-gray-50 px-4 py-3 text-xs text-gray-500'>
              Showing {filtered.length} of {listings.length} listings
            </div>
          )}
        </div>

        <AlertDialog open={deleteConfirm !== null} onOpenChange={(open) => { if (!open) setDeleteConfirm(null) }}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Listing</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this listing? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
                disabled={deleting}
                className='bg-red-600 hover:bg-red-700 focus:ring-red-600'
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Main>
    </>
  )
}

export default ListingsPage
