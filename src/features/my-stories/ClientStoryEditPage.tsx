'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Loader2, Upload, X } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { fetchSubmissionById, updateSubmission } from '@/lib/services/story-submissions.service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { RichTextEditor } from '@/components/ui/rich-text-editor'

interface Category {
  id: string
  name: string
}

interface ClientStoryEditPageProps {
  id: string
}

export function ClientStoryEditPage({ id }: ClientStoryEditPageProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [body, setBody] = useState('')
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    category_id: '',
  })

  useEffect(() => {
    Promise.all([
      supabase.from('categories').select('id, name').eq('type', 'blog').order('name'),
      fetchSubmissionById(id),
      supabase.auth.getUser(),
    ]).then(([{ data: cats }, submission, { data: { user } }]) => {
      if (cats) setCategories(cats)
      if (!submission || !user || submission.author_id !== user.id) {
        toast.error('You do not have permission to edit this story')
        router.push('/dashboard/my-stories')
        return
      }
      setForm({
        title: submission.title,
        slug: submission.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim(),
        excerpt: submission.content.slice(0, 200),
        category_id: submission.neighbourhood ?? '',
      })
      setBody(submission.content ?? '')
      setCoverPreview(submission.cover_image ?? null)
      setLoading(false)
    })
  }, [id, router])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    setForm((prev) => ({ ...prev, title, slug }))
  }

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
    if (!form.title.trim()) {
      toast.error('Title is required')
      return
    }
    setSaving(true)
    try {
      const cover_image = await uploadCover()
      await updateSubmission(id, {
        title: form.title,
        content: body,
        neighbourhood: form.category_id || undefined,
        ...(cover_image ? { cover_image } : {}),
        status: 'pending',
      })
      toast.success('Story updated and resubmitted for review!')
      router.push('/dashboard/my-stories')
    } catch (err) {
      toast.error('Failed to update story')
      console.error(err)
    } finally {
      setSaving(false)
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

  return (
    <>
      <Header />
      <Main>
        {/* Page Header */}
        <div className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
          <div className='flex items-center gap-3'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => router.push('/dashboard/my-stories')}
            >
              <ArrowLeft className='h-5 w-5' />
            </Button>
            <div>
              <h1 className='font-antigua text-2xl font-bold tracking-tight'>
                Edit Story
              </h1>
              <p className='text-sm text-muted-foreground'>
                Update your story and resubmit for review
              </p>
            </div>
          </div>
          <div className='flex gap-2'>
            <Button
              disabled={saving}
              onClick={handleSave}
              className='bg-gradient-to-r from-[#CF9921] to-[#D2BB6B] text-white hover:brightness-110'
            >
              {saving ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
              Submit for Review
            </Button>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Main Content */}
          <div className='space-y-6 lg:col-span-2'>
            <Card>
              <CardContent className='space-y-4 pt-6'>
                <div className='space-y-2'>
                  <Label htmlFor='title'>Title *</Label>
                  <Input
                    id='title'
                    placeholder='Enter story title…'
                    value={form.title}
                    onChange={handleTitleChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='slug'>Slug</Label>
                  <Input
                    id='slug'
                    placeholder='auto-generated-from-title'
                    value={form.slug}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, slug: e.target.value }))
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='excerpt'>Excerpt</Label>
                  <Textarea
                    id='excerpt'
                    placeholder='Short description shown in story previews…'
                    rows={3}
                    value={form.excerpt}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, excerpt: e.target.value }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='text-base'>Body</CardTitle>
              </CardHeader>
              <CardContent className='overflow-hidden rounded-b-xl p-0'>
                <RichTextEditor
                  value={body}
                  onChange={setBody}
                  placeholder='Write your story content here…'
                  minHeight={400}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Cover Image */}
            <Card>
              <CardHeader>
                <CardTitle className='text-base'>Cover Image</CardTitle>
              </CardHeader>
              <CardContent>
                {coverPreview ? (
                  <div className='relative'>
                    <img
                      src={coverPreview}
                      alt='Cover preview'
                      className='h-48 w-full rounded object-cover'
                    />
                    <button
                      type='button'
                      onClick={() => {
                        setCoverPreview(null)
                        setCoverFile(null)
                      }}
                      className='absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white hover:bg-black/80'
                    >
                      <X className='h-4 w-4' />
                    </button>
                  </div>
                ) : (
                  <label className='flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-muted-foreground/30 hover:border-muted-foreground/60 transition'>
                    <Upload className='mb-2 h-6 w-6 text-muted-foreground' />
                    <span className='text-sm text-muted-foreground'>
                      Click to upload
                    </span>
                    <input
                      type='file'
                      accept='image/*'
                      className='hidden'
                      onChange={handleCoverChange}
                    />
                  </label>
                )}
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle className='text-base'>Settings</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label>Category</Label>
                  <Select
                    value={form.category_id}
                    onValueChange={(val) =>
                      setForm((prev) => ({ ...prev, category_id: val }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select category…' />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800'>
                  Your story will be reviewed by our editorial team before
                  publishing. Save as draft to continue editing later.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}
