'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Loader2, Upload, X, CheckCircle2, XCircle } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { supabase } from '@/lib/supabase'
import {
  fetchSubmissionById,
  updateSubmission,
  approveSubmission,
  rejectSubmission,
  type StorySubmission,
} from '@/lib/services/story-submissions.service'
import { useAuthStore } from '@/lib/auth/auth.store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { RichTextEditor } from '@/components/ui/rich-text-editor'

const STATUS_STYLE: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  approved: 'bg-green-50 text-green-700 border-green-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
}

interface Props {
  id: string
}

export function SubmissionEditPage({ id }: Props) {
  const router = useRouter()
  const { user } = useAuthStore()
  const coverInputRef = useRef<HTMLInputElement>(null)

  const [submission, setSubmission] = useState<StorySubmission | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [processing, setProcessing] = useState(false)

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)

  useEffect(() => {
    fetchSubmissionById(id).then((s) => {
      if (s) {
        setSubmission(s)
        setTitle(s.title)
        setBody(s.content)
        setCoverPreview(s.cover_image ?? null)
      }
      setLoading(false)
    })
  }, [id])

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
  }

  const uploadCover = async (): Promise<string | null> => {
    if (!coverFile) return null
    const ext = coverFile.name.split('.').pop()
    const path = `articles/${Date.now()}.${ext}`
    const { error } = await supabase.storage
      .from('media')
      .upload(path, coverFile, { upsert: true })
    if (error) {
      toast.error(`Failed to upload cover image: ${error.message}`)
      return null
    }
    const { data } = supabase.storage.from('media').getPublicUrl(path)
    return data.publicUrl
  }

  const handleSave = async () => {
    if (!title.trim()) { toast.error('Title is required'); return }
    setSaving(true)
    try {
      const cover_image = coverFile ? await uploadCover() : undefined
      await updateSubmission(id, {
        title: title.trim(),
        content: body,
        ...(cover_image ? { cover_image } : {}),
      })
      toast.success('Story saved.')
      router.push('/dashboard/story-submissions')
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to save story.')
    } finally {
      setSaving(false)
    }
  }

  const handleApprove = async () => {
    if (!submission || !user) return
    setProcessing(true)
    try {
      // Save any unsaved changes first
      const cover_image = coverFile ? await uploadCover() : undefined
      await updateSubmission(id, {
        title: title.trim(),
        content: body,
        ...(cover_image ? { cover_image } : {}),
      })
      await approveSubmission(
        { ...submission, title: title.trim(), content: body, ...(cover_image ? { cover_image } : {}) },
        (user as any).id
      )
      toast.success(`"${title}" approved and published as an article.`)
      router.push('/dashboard/story-submissions')
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to approve submission.')
    } finally {
      setProcessing(false)
    }
  }

  const handleReject = async () => {
    if (!submission || !user) return
    setProcessing(true)
    try {
      await rejectSubmission(id, (user as any).id)
      toast.success(`"${title}" rejected.`)
      router.push('/dashboard/story-submissions')
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to reject submission.')
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <Main>
          <div className='flex items-center justify-center py-24'>
            <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
          </div>
        </Main>
      </>
    )
  }

  if (!submission) {
    return (
      <>
        <Header />
        <Main>
          <p className='py-24 text-center text-sm text-muted-foreground'>Submission not found.</p>
        </Main>
      </>
    )
  }

  return (
    <>
      <Header />
      <Main>
        {/* Page header */}
        <div className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
          <div className='flex items-center gap-3'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => router.push('/dashboard/story-submissions')}
            >
              <ArrowLeft className='h-5 w-5' />
            </Button>
            <div>
              <h1 className='font-antigua text-2xl font-bold tracking-tight'>Edit Submission</h1>
              <p className='text-sm text-muted-foreground'>
                Submitted {format(new Date(submission.created_at), 'MMMM d, yyyy')}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            {submission.status === 'pending' && !processing && (
              <>
                <Button
                  variant='outline'
                  size='sm'
                  className='text-red-500 border-red-200 hover:bg-red-50'
                  onClick={handleReject}
                  disabled={saving}
                >
                  <XCircle size={14} className='mr-1.5' /> Reject
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  className='text-green-600 border-green-200 hover:bg-green-50'
                  onClick={handleApprove}
                  disabled={saving}
                >
                  <CheckCircle2 size={14} className='mr-1.5' /> Approve & Publish
                </Button>
              </>
            )}
            {processing && <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />}
            <Button
              onClick={handleSave}
              disabled={saving || processing}
              className='bg-gradient-to-r from-[#CF9921] to-[#D2BB6B] text-white hover:brightness-110'
            >
              {saving ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Save className='mr-2 h-4 w-4' />}
              Save Changes
            </Button>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Main content */}
          <div className='space-y-6 lg:col-span-2'>
            {/* Title */}
            <Card>
              <CardContent className='pt-6 space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='title'>Title *</Label>
                  <Input
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Story title…'
                  />
                </div>
              </CardContent>
            </Card>

            {/* Body editor */}
            <Card>
              <CardHeader>
                <CardTitle className='text-base'>Story Content</CardTitle>
              </CardHeader>
              <CardContent className='p-0 overflow-hidden rounded-b-xl'>
                <RichTextEditor
                  value={body}
                  onChange={setBody}
                  placeholder='Write the story content here…'
                  minHeight={500}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Author */}
            <Card>
              <CardHeader>
                <CardTitle className='text-base'>Author</CardTitle>
              </CardHeader>
              <CardContent className='flex items-center gap-3'>
                <Avatar className='h-9 w-9'>
                  <AvatarImage src={submission.author?.profile_photo_url ?? ''} />
                  <AvatarFallback className='text-sm'>
                    {(submission.author_name?.[0] ?? '?').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className='min-w-0'>
                  <p className='text-sm font-medium truncate'>{submission.author_name}</p>
                  <p className='text-xs text-muted-foreground truncate'>{submission.author_email}</p>
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle className='text-base'>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge
                  variant='outline'
                  className={`capitalize ${STATUS_STYLE[submission.status] ?? ''}`}
                >
                  {submission.status === 'pending' ? 'Under Review' : submission.status}
                </Badge>
                {submission.status === 'approved' && submission.article_id && (
                  <a
                    href={`/dashboard/content/articles/${submission.article_id}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='mt-3 flex items-center gap-1.5 text-xs text-gold hover:underline'
                  >
                    View Published Article →
                  </a>
                )}
              </CardContent>
            </Card>

            {/* Cover image */}
            <Card>
              <CardHeader>
                <CardTitle className='text-base'>Cover Image</CardTitle>
              </CardHeader>
              <CardContent>
                {coverPreview ? (
                  <div className='relative'>
                    <img
                      src={coverPreview}
                      alt='Cover'
                      className='h-48 w-full rounded-lg object-cover'
                    />
                    <button
                      type='button'
                      onClick={() => { setCoverPreview(null); setCoverFile(null) }}
                      className='absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white hover:bg-black/80'
                    >
                      <X className='h-4 w-4' />
                    </button>
                    <button
                      type='button'
                      onClick={() => coverInputRef.current?.click()}
                      className='absolute bottom-2 right-2 flex items-center gap-1.5 rounded bg-black/60 px-2.5 py-1.5 text-xs text-white hover:bg-black/80'
                    >
                      <Upload size={12} /> Replace
                    </button>
                  </div>
                ) : (
                  <label className='flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 hover:border-muted-foreground/60 transition'>
                    <Upload className='mb-2 h-6 w-6 text-muted-foreground' />
                    <span className='text-sm text-muted-foreground'>Click to upload</span>
                    <input
                      type='file'
                      accept='image/*'
                      className='hidden'
                      onChange={handleCoverChange}
                    />
                  </label>
                )}
                <input
                  ref={coverInputRef}
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleCoverChange}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}
