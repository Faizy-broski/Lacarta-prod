'use client'

import { useEffect, useState } from 'react'
import {
  MessageSquare,
  CheckCircle,
  XCircle,
  Trash2,
  Loader2,
  Filter,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { toast } from 'sonner'
import { formatDistanceToNow } from 'date-fns'
import {
  fetchComments,
  moderateComment,
  deleteComment,
  type Comment,
} from '@/lib/services/comments.service'

const statusBadge: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  approved: 'bg-green-100 text-green-700 border-green-200',
  rejected: 'bg-red-100 text-red-700 border-red-200',
}

export function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    loadComments()
  }, [statusFilter])

  async function loadComments() {
    setLoading(true)
    const data = await fetchComments(
      undefined,
      statusFilter === 'all' ? undefined : statusFilter
    )
    setComments(data)
    setLoading(false)
  }

  async function handleModerate(id: string, status: 'approved' | 'rejected') {
    try {
      await moderateComment(id, status)
      setComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      )
      toast.success(`Comment ${status}`)
    } catch (err: any) {
      toast.error(err?.message ?? 'Action failed')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this comment permanently?')) return
    try {
      await deleteComment(id)
      setComments((prev) => prev.filter((c) => c.id !== id))
      toast.success('Comment deleted')
    } catch (err: any) {
      toast.error(err?.message ?? 'Delete failed')
    }
  }

  const pendingCount = comments.filter((c) => c.status === 'pending').length

  return (
    <>
      <Header />

      <Main>
        <div className='mb-6 flex h-20 items-center justify-between'>
          <div>
            <h1 className='font-antigua text-3xl font-bold tracking-tight'>
              Comments
            </h1>
            <p className='text-xs text-muted-foreground'>
              Moderate user comments across all articles.
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='h-9 w-[140px]'>
                <Filter className='h-3.5 w-3.5 mr-1.5' />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='approved'>Approved</SelectItem>
                <SelectItem value='rejected'>Rejected</SelectItem>
              </SelectContent>
            </Select>
            {pendingCount > 0 && (
              <Badge className='bg-yellow-100 text-yellow-700 border border-yellow-200'>
                {pendingCount} pending
              </Badge>
            )}
            <Badge variant='secondary' className='gap-1'>
              <MessageSquare className='h-3 w-3' />
              {loading ? '…' : comments.length}
            </Badge>
          </div>
        </div>

        {loading ? (
          <div className='flex items-center justify-center py-16'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          </div>
        ) : comments.length === 0 ? (
          <div className='py-16 text-center text-muted-foreground'>
            No comments found.
          </div>
        ) : (
          <div className='space-y-3'>
            {comments.map((comment) => (
              <Card key={comment.id} className='overflow-hidden'>
                <CardContent className='p-4'>
                  <div className='flex items-start gap-3'>
                    {/* Avatar */}
                    <Avatar className='h-9 w-9 shrink-0'>
                      <AvatarFallback className='text-xs'>
                        {(comment.user?.full_name ?? 'U')
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    {/* Body */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='text-sm font-medium'>
                          {comment.user?.full_name ?? 'Anonymous'}
                        </span>
                        <Badge
                          variant='outline'
                          className={`text-[10px] border ${statusBadge[comment.status]}`}
                        >
                          {comment.status}
                        </Badge>
                        <span className='text-xs text-muted-foreground'>
                          {formatDistanceToNow(new Date(comment.created_at), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>

                      {comment.article?.title && (
                        <p className='text-xs text-[#CF9921] mb-1 truncate'>
                          on &ldquo;{comment.article.title}&rdquo;
                        </p>
                      )}

                      <p className='text-sm text-muted-foreground leading-relaxed'>
                        {comment.body}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className='flex items-center gap-1 shrink-0'>
                      {comment.status !== 'approved' && (
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50'
                          onClick={() => handleModerate(comment.id, 'approved')}
                          title='Approve'
                        >
                          <CheckCircle className='h-4 w-4' />
                        </Button>
                      )}
                      {comment.status !== 'rejected' && (
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 text-orange-600 hover:text-orange-700 hover:bg-orange-50'
                          onClick={() => handleModerate(comment.id, 'rejected')}
                          title='Reject'
                        >
                          <XCircle className='h-4 w-4' />
                        </Button>
                      )}
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 text-destructive hover:text-destructive'
                        onClick={() => handleDelete(comment.id)}
                        title='Delete'
                      >
                        <Trash2 className='h-4 w-4' />
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
