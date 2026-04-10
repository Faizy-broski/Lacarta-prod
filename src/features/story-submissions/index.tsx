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
import {
  fetchSubmissions,
  approveSubmission,
  rejectSubmission,
  getSubmissionCounts,
  type StorySubmission,
} from '@/lib/services/story-submissions.service'
import { useAuthStore } from '@/lib/auth/auth.store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function SubmissionTable({
  rows,
  tab,
  onApprove,
  onReject,
  processing,
  onEdit,
}: {
  rows: StorySubmission[]
  tab: string
  onApprove: (s: StorySubmission) => void
  onReject: (s: StorySubmission) => void
  processing: string | null
  onEdit: (s: StorySubmission) => void
}) {
  if (rows.length === 0) {
    return (
      <p className='py-10 text-center text-sm text-muted-foreground'>
        No {tab} submissions.
      </p>
    )
  }

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Author</TableHead>
            <TableHead>Cover</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((submission) => (
            <TableRow key={submission.id}>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Avatar className='h-7 w-7'>
                    <AvatarImage src={submission.author?.profile_photo_url ?? ''} />
                    <AvatarFallback className='text-[11px]'>
                      {(submission.author_name?.[0] ?? '?').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='text-sm font-medium'>{submission.author_name}</p>
                    <p className='text-xs text-muted-foreground'>{submission.author_email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {submission.cover_image ? (
                  <img
                    src={submission.cover_image}
                    alt={submission.title}
                    className='h-12 w-20 rounded-md object-cover'
                  />
                ) : (
                  <div className='h-12 w-20 rounded-md bg-slate-100' />
                )}
              </TableCell>
              <TableCell className='font-medium max-w-[250px]'>
                <p className='truncate'>{submission.title}</p>
              </TableCell>
              <TableCell className='text-sm text-muted-foreground whitespace-nowrap'>
                {format(new Date(submission.created_at), 'MMM d, yyyy')}
              </TableCell>
              <TableCell>
                <div className='flex items-center justify-end gap-2'>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => onEdit(submission)}
                    className='h-7 px-2 text-xs'
                  >
                    <Pencil size={13} className='mr-1' /> Edit
                  </Button>
                  {submission.status === 'approved' && submission.article_id && (
                    <Button variant='ghost' size='sm' asChild className='h-7 px-2 text-xs text-gold'>
                      <a href={`/dashboard/content/articles/${submission.article_id}`} target='_blank' rel='noopener noreferrer'>
                        <ExternalLink size={13} className='mr-1' /> Article
                      </a>
                    </Button>
                  )}
                  {submission.status === 'pending' && (
                    <>
                      {processing === submission.id ? (
                        <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                      ) : (
                        <>
                          <Button
                            variant='outline'
                            size='sm'
                            className='h-7 px-2 text-xs text-green-600 border-green-200 hover:bg-green-50'
                            onClick={() => onApprove(submission)}
                          >
                            <CheckCircle2 size={13} className='mr-1' /> Approve
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            className='h-7 px-2 text-xs text-red-500 border-red-200 hover:bg-red-50'
                            onClick={() => onReject(submission)}
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

export function StorySubmissionsContent() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [pending, setPending] = useState<StorySubmission[]>([])
  const [approved, setApproved] = useState<StorySubmission[]>([])
  const [rejected, setRejected] = useState<StorySubmission[]>([])
  const [counts, setCounts] = useState({ pending: 0, approved: 0, rejected: 0 })
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState<string | null>(null)

  const reload = async () => {
    setLoading(true)
    const [p, a, r, c] = await Promise.all([
      fetchSubmissions('pending'),
      fetchSubmissions('approved'),
      fetchSubmissions('rejected'),
      getSubmissionCounts(),
    ])
    setPending(p)
    setApproved(a)
    setRejected(r)
    setCounts(c)
    setLoading(false)
  }

  useEffect(() => {
    reload()
  }, [])

  const handleApprove = async (submission: StorySubmission) => {
    if (!user) return
    setProcessing(submission.id)
    try {
      await approveSubmission(submission, (user as any).id)
      toast.success(`"${submission.title}" approved and published as an article.`)
      await reload()
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to approve submission.')
    } finally {
      setProcessing(null)
    }
  }

  const handleReject = async (submission: StorySubmission) => {
    if (!user) return
    setProcessing(submission.id)
    try {
      await rejectSubmission(submission.id, (user as any).id)
      toast.success(`"${submission.title}" rejected.`)
      await reload()
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to reject submission.')
    } finally {
      setProcessing(null)
    }
  }

  return (
    <>
      <Header />
      <Main>
        <div className='mb-6'>
          <h1 className='font-antigua text-2xl font-bold tracking-tight'>Story Submissions</h1>
          <p className='mt-1 text-sm text-muted-foreground'>
            Review and approve client story submissions for publication.
          </p>
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
                {counts.approved > 0 && (
                  <Badge variant='outline' className='ml-2 h-5 px-1.5 text-xs'>
                    {counts.approved}
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
                rows={pending}
                tab='pending'
                onApprove={handleApprove}
                onReject={handleReject}
                processing={processing}
                onEdit={(s) => router.push(`/dashboard/story-submissions/${s.id}/edit`)}
              />
            </TabsContent>
            <TabsContent value='approved'>
              <SubmissionTable
                rows={approved}
                tab='approved'
                onApprove={handleApprove}
                onReject={handleReject}
                processing={processing}
                onEdit={(s) => router.push(`/dashboard/story-submissions/${s.id}/edit`)}
              />
            </TabsContent>
            <TabsContent value='rejected'>
              <SubmissionTable
                rows={rejected}
                tab='rejected'
                onApprove={handleApprove}
                onReject={handleReject}
                processing={processing}
                onEdit={(s) => router.push(`/dashboard/story-submissions/${s.id}/edit`)}
              />
            </TabsContent>
          </Tabs>
        )}
      </Main>
    </>
  )
}
