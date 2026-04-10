'use client'

import { useEffect, useState } from 'react'
import { Send, CheckCircle2, Clock, CheckCheck, X as XIcon, FilePen } from 'lucide-react'
import { toast } from 'sonner'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createSubmission, fetchMySubmissions, type StorySubmission } from '@/lib/services/story-submissions.service'
import { useAuthStore } from '@/lib/auth/auth.store'

interface FormState {
  title: string
  content: string
  neighbourhood: string
}

const EMPTY: FormState = { title: '', content: '', neighbourhood: '' }

const STATUS_STYLE: Record<StorySubmission['status'], string> = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  approved: 'bg-green-50 text-green-700 border-green-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
}

const STATUS_ICON: Record<StorySubmission['status'], React.ReactNode> = {
  pending: <Clock className='h-3.5 w-3.5' />,
  approved: <CheckCheck className='h-3.5 w-3.5' />,
  rejected: <XIcon className='h-3.5 w-3.5' />,
}

export function SubmitStoryContent() {
  const { user } = useAuthStore()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [mySubmissions, setMySubmissions] = useState<StorySubmission[]>([])
  const [loadingSubmissions, setLoadingSubmissions] = useState(true)

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }))

  useEffect(() => {
    if (!user?.accountNo) return
    fetchMySubmissions(user.accountNo).then((data) => {
      setMySubmissions(data)
      setLoadingSubmissions(false)
    })
  }, [user?.accountNo])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const trimmed = {
      title: form.title.trim(),
      content: form.content.trim(),
      neighbourhood: form.neighbourhood.trim(),
    }

    if (!trimmed.title || !trimmed.content) {
      toast.error('Title and story content are required.')
      return
    }

    setLoading(true)
    try {
      const newSub = await createSubmission({
        title: trimmed.title,
        content: trimmed.content,
        neighbourhood: trimmed.neighbourhood || undefined,
        author_id: user.accountNo,
        author_name: user.name ?? user.email ?? 'Unknown',
        author_email: user.email ?? '',
        status: 'pending',
      })
      setMySubmissions((prev) => [newSub, ...prev])
      setSubmitted(true)
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to submit story. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAnother = () => {
    setForm(EMPTY)
    setSubmitted(false)
  }

  return (
    <>
      <Header />
      <Main>
        <div className='mb-6'>
          <h1 className='font-antigua text-2xl font-bold tracking-tight'>Submit a Story</h1>
          <p className='mt-1 text-sm text-muted-foreground'>
            Share a story with the Lacarta editorial team for review and publication.
          </p>
        </div>

        {submitted ? (
          <Card className='max-w-xl border-green/20 bg-green/5'>
            <CardContent className='flex flex-col items-center gap-4 py-12 text-center'>
              <CheckCircle2 className='h-12 w-12 text-green-600' />
              <div>
                <h2 className='font-antigua text-xl font-bold'>Story Submitted!</h2>
                <p className='mt-1 text-sm text-muted-foreground'>
                  Our editorial team will review your submission and get back to you.
                </p>
              </div>
              <Button variant='outline' onClick={handleAnother}>
                Submit Another Story
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className='max-w-xl'>
            <CardHeader>
              <CardTitle className='font-antigua text-lg'>Story Details</CardTitle>
              <CardDescription>
                All submissions are reviewed before publication. Be as detailed as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-5'>
                <div className='space-y-1.5'>
                  <Label htmlFor='sub-title'>Title <span className='text-red-500'>*</span></Label>
                  <Input
                    id='sub-title'
                    placeholder='e.g. Hidden Beaches of Barú'
                    value={form.title}
                    onChange={set('title')}
                    required
                    maxLength={200}
                  />
                </div>

                <div className='space-y-1.5'>
                  <Label htmlFor='sub-neighbourhood'>Neighbourhood / Region</Label>
                  <Input
                    id='sub-neighbourhood'
                    placeholder='e.g. Getsemaní, Castillogrande'
                    value={form.neighbourhood}
                    onChange={set('neighbourhood')}
                    maxLength={100}
                  />
                </div>

                <div className='space-y-1.5'>
                  <Label htmlFor='sub-content'>Your Story <span className='text-red-500'>*</span></Label>
                  <Textarea
                    id='sub-content'
                    placeholder='Write your story here...'
                    value={form.content}
                    onChange={set('content')}
                    required
                    rows={10}
                    className='resize-y'
                  />
                  <p className='text-xs text-muted-foreground'>{form.content.length} characters</p>
                </div>

                <Button
                  type='submit'
                  disabled={loading}
                  className='bg-gold hover:bg-gold/90 text-black font-semibold w-full'
                >
                  {loading ? 'Submitting…' : (
                    <>
                      <Send size={15} className='mr-2' />
                      Submit Story
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* ── My Submissions ──────────────────────────────────────────── */}
        {!loadingSubmissions && mySubmissions.length > 0 && (
          <div className='mt-10'>
            <h2 className='font-antigua text-xl font-bold mb-4'>My Submissions</h2>
            <div className='flex flex-col gap-3 max-w-xl'>
              {mySubmissions.map((sub) => (
                <Card key={sub.id}>
                  <CardContent className='flex items-start gap-3 py-4'>
                    <div className='rounded-lg bg-gold/20 p-2 mt-0.5'>
                      <FilePen className='h-4 w-4 text-gold' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center justify-between gap-2'>
                        <p className='text-sm font-medium truncate'>{sub.title}</p>
                        <Badge
                          variant='outline'
                          className={`flex items-center gap-1 rounded-full px-2 text-xs shrink-0 ${STATUS_STYLE[sub.status]}`}
                        >
                          {STATUS_ICON[sub.status]}
                          {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                        </Badge>
                      </div>
                      <p className='mt-0.5 text-xs text-muted-foreground'>
                        Submitted {new Date(sub.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        {sub.neighbourhood ? ` · ${sub.neighbourhood}` : ''}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Main>
    </>
  )
}
