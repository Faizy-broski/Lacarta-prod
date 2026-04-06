'use client'
import { useEffect, useState } from 'react'
import { FileInput, MessageSquare, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  getRecentFormSubmissions,
  getCommentsByArticle,
} from '@/lib/services/analytics.service'

const CATEGORIES = ['All', 'Hotels', 'Beaches', 'Gastronomy', 'Activities', 'Boating', 'Real Estate']

const statusStyle: Record<string, string> = {
  new: 'bg-yellow-100 text-yellow-700',
  read: 'bg-blue-100 text-blue-700',
  responded: 'bg-green-100 text-green-700',
  archived: 'bg-gray-100 text-gray-600',
}

export function FormSubmissions() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [commentsByPost, setCommentsByPost] = useState<{ post: string; count: number }[]>([])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getRecentFormSubmissions(8), getCommentsByArticle(5)]).then(([subs, comments]) => {
      setSubmissions(subs)
      setCommentsByPost(comments)
      setLoading(false)
    })
  }, [])

  const filteredSubs = filter === 'All'
    ? submissions
    : submissions.filter((s) => s.listing?.category?.name === filter)

  return (
    <div className='grid gap-4 lg:grid-cols-2'>
      {/* Form Submissions */}
      <Card className='rounded-xl bg-[#F9FAFB] shadow-sm'>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <div className='flex items-center gap-2'>
            <FileInput className='h-4 w-4 text-[#CF9921]' />
            <h3 className='font-antigua text-base font-semibold'>La Carta Form Submissions</h3>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className='h-7 w-32 text-xs'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className='flex items-center justify-center py-12'>
              <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
            </div>
          ) : filteredSubs.length === 0 ? (
            <p className='py-12 text-center text-sm text-muted-foreground'>No submissions yet.</p>
          ) : (
            <div className='space-y-3'>
              {filteredSubs.map((s) => (
                <div key={s.id} className='flex items-center justify-between rounded-lg border bg-white px-3 py-2.5'>
                  <div>
                    <p className='text-sm font-medium text-gray-900'>{s.name}</p>
                    <p className='text-xs text-muted-foreground'>
                      {s.listing?.category?.name ?? '—'} · {new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <Badge className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle[s.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {s.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comments by Post */}
      <Card className='rounded-xl bg-[#F9FAFB] shadow-sm'>
        <CardHeader className='flex flex-row items-center gap-2 pb-2'>
          <MessageSquare className='h-4 w-4 text-[#6366F1]' />
          <h3 className='font-antigua text-base font-semibold'>Total Comments by Post</h3>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className='flex items-center justify-center py-12'>
              <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
            </div>
          ) : commentsByPost.length === 0 ? (
            <p className='py-12 text-center text-sm text-muted-foreground'>No comments yet.</p>
          ) : (
            <div className='space-y-4'>
              {commentsByPost.map((item) => {
                const max = commentsByPost[0]?.count || 1
                return (
                  <div key={item.post} className='space-y-1'>
                    <div className='flex justify-between text-sm'>
                      <span className='max-w-[70%] truncate text-gray-800'>{item.post}</span>
                      <span className='font-semibold text-[#6366F1]'>{item.count}</span>
                    </div>
                    <div className='h-1.5 w-full rounded-full bg-gray-200'>
                      <div className='h-1.5 rounded-full bg-[#6366F1]' style={{ width: `${(item.count / max) * 100}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
