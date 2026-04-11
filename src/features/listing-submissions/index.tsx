'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, XCircle, Loader2, Pencil, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  fetchListingSubmissions,
  approveListing,
  rejectListing,
  getListingSubmissionCounts,
  type ListingSubmission,
} from '@/lib/services/listings-admin.service'
import { useAuthStore } from '@/lib/auth/auth.store'

function SubmissionTable({
  rows,
  tab,
  onApprove,
  onReject,
  processing,
  onEdit,
}: {
  rows: ListingSubmission[]
  tab: string
  onApprove: (s: ListingSubmission) => void
  onReject: (s: ListingSubmission) => void
  processing: string | null
  onEdit: (s: ListingSubmission) => void
}) {
  if (rows.length === 0) {
    return (
      <p className='py-10 text-center text-sm text-muted-foreground'>
        No {tab} listing submissions.
      </p>
    )
  }

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Cover</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((listing) => (
            <TableRow key={listing.id}>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Avatar className='h-7 w-7'>
                    <AvatarImage src={listing.client?.profile_photo_url ?? ''} />
                    <AvatarFallback className='text-[11px]'>
                      {(listing.client?.full_name?.[0] ?? '?').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='text-sm font-medium'>{listing.client?.full_name ?? 'Unknown'}</p>
                    <p className='text-xs text-muted-foreground'>{listing.client?.email ?? ''}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {listing.cover_image ? (
                  <img
                    src={listing.cover_image}
                    alt={listing.title}
                    className='h-12 w-20 rounded-md object-cover'
                  />
                ) : (
                  <div className='h-12 w-20 rounded-md bg-slate-100' />
                )}
              </TableCell>
              <TableCell className='font-medium max-w-[220px]'>
                <p className='truncate'>{listing.title}</p>
                {listing.address && (
                  <p className='text-xs text-muted-foreground truncate'>{listing.address}</p>
                )}
              </TableCell>
              <TableCell>
                {listing.category && (
                  <Badge variant='outline' className='text-xs'>
                    {listing.category.name}
                  </Badge>
                )}
              </TableCell>
              <TableCell className='text-sm text-muted-foreground whitespace-nowrap'>
                {format(new Date(listing.created_at), 'MMM d, yyyy')}
              </TableCell>
              <TableCell>
                <div className='flex items-center justify-end gap-2'>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => onEdit(listing)}
                    className='h-7 px-2 text-xs'
                  >
                    <Pencil size={13} className='mr-1' /> View
                  </Button>
                  {listing.status === 'active' && (
                    <Button variant='ghost' size='sm' asChild className='h-7 px-2 text-xs text-gold'>
                      <a
                        href={`/dashboard/listings/${listing.id}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <ExternalLink size={13} className='mr-1' /> Listing
                      </a>
                    </Button>
                  )}
                  {listing.status === 'pending' && (
                    <>
                      {processing === listing.id ? (
                        <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                      ) : (
                        <>
                          <Button
                            variant='outline'
                            size='sm'
                            className='h-7 px-2 text-xs text-green-600 border-green-200 hover:bg-green-50'
                            onClick={() => onApprove(listing)}
                          >
                            <CheckCircle2 size={13} className='mr-1' /> Approve
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            className='h-7 px-2 text-xs text-red-500 border-red-200 hover:bg-red-50'
                            onClick={() => onReject(listing)}
                          >
                            <XCircle size={13} className='mr-1' /> Reject
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function ListingSubmissionsContent() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [pending, setPending]   = useState<ListingSubmission[]>([])
  const [approved, setApproved] = useState<ListingSubmission[]>([])
  const [rejected, setRejected] = useState<ListingSubmission[]>([])
  const [counts, setCounts]     = useState({ pending: 0, active: 0, rejected: 0 })
  const [loading, setLoading]   = useState(true)
  const [processing, setProcessing] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const reload = async () => {
    setLoading(true)
    const [p, a, r, c] = await Promise.all([
      fetchListingSubmissions('pending'),
      fetchListingSubmissions('active'),
      fetchListingSubmissions('rejected'),
      getListingSubmissionCounts(),
    ])
    setPending(p)
    setApproved(a)
    setRejected(r)
    setCounts(c)
    setLoading(false)
  }

  useEffect(() => { reload() }, [])

  const handleApprove = async (listing: ListingSubmission) => {
    if (!user) return
    setProcessing(listing.id)
    try {
      await approveListing(listing.id, (user as any).id)
      toast.success(`"${listing.title}" approved and is now active.`)
      await reload()
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to approve listing.')
    } finally {
      setProcessing(null)
    }
  }

  const handleReject = async (listing: ListingSubmission) => {
    if (!user) return
    setProcessing(listing.id)
    try {
      await rejectListing(listing.id, (user as any).id)
      toast.success(`"${listing.title}" rejected.`)
      await reload()
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to reject listing.')
    } finally {
      setProcessing(null)
    }
  }

  // Unique categories across all submissions for the filter
  const allListings = [...pending, ...approved, ...rejected]
  const uniqueCategories = Array.from(
    new Map(
      allListings
        .filter((l) => l.category)
        .map((l) => [l.category!.id, l.category!])
    ).values()
  )

  const filterRows = (rows: ListingSubmission[]) =>
    categoryFilter === 'all'
      ? rows
      : rows.filter((r) => r.category?.id === categoryFilter)

  return (
    <>
      <Header />
      <Main>
        <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='font-antigua text-2xl font-bold tracking-tight'>Listing Submissions</h1>
            <p className='mt-1 text-sm text-muted-foreground'>
              Review and approve client-submitted listings for publication.
            </p>
          </div>

          {/* Category filter */}
          {uniqueCategories.length > 0 && (
            <div className='w-full sm:w-48'>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className='h-8 text-sm'>
                  <SelectValue placeholder='All Categories' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Categories</SelectItem>
                  {uniqueCategories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {loading ? (
          <div className='flex justify-center py-16'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          </div>
        ) : (
          <Tabs defaultValue='pending'>
            <TabsList className='mb-4'>
              <TabsTrigger value='pending'>
                Pending
                {counts.pending > 0 && (
                  <Badge className='ml-2 h-5 px-1.5 text-xs bg-gold/20 text-gold border-0'>
                    {counts.pending}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value='approved'>
                Approved
                {counts.active > 0 && (
                  <Badge variant='outline' className='ml-2 h-5 px-1.5 text-xs'>
                    {counts.active}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value='rejected'>
                Rejected
                {counts.rejected > 0 && (
                  <Badge variant='outline' className='ml-2 h-5 px-1.5 text-xs'>
                    {counts.rejected}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value='pending'>
              <SubmissionTable
                rows={filterRows(pending)}
                tab='pending'
                onApprove={handleApprove}
                onReject={handleReject}
                processing={processing}
                onEdit={(l) => router.push(`/dashboard/listings/${l.id}/edit`)}
              />
            </TabsContent>
            <TabsContent value='approved'>
              <SubmissionTable
                rows={filterRows(approved)}
                tab='approved'
                onApprove={handleApprove}
                onReject={handleReject}
                processing={processing}
                onEdit={(l) => router.push(`/dashboard/listings/${l.id}/edit`)}
              />
            </TabsContent>
            <TabsContent value='rejected'>
              <SubmissionTable
                rows={filterRows(rejected)}
                tab='rejected'
                onApprove={handleApprove}
                onReject={handleReject}
                processing={processing}
                onEdit={(l) => router.push(`/dashboard/listings/${l.id}/edit`)}
              />
            </TabsContent>
          </Tabs>
        )}
      </Main>
    </>
  )
}
