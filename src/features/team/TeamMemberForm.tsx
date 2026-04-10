'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Upload, X } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import {
  createTeamMember,
  updateTeamMember,
  type TeamMember,
  type TeamMemberInsert,
} from '@/lib/services/team.service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Separator } from '@/components/ui/separator'

type FormState = Omit<TeamMemberInsert, 'photo_url'>

interface Props {
  member?: TeamMember
}

const EMPTY_FORM: FormState = {
  slug: '',
  name: '',
  role: '',
  bio: null,
  bio_extended: null,
  favorite_movie: null,
  favorite_song: null,
  favorite_club: null,
  favorite_book: null,
  favorite_food: null,
  email: null,
  twitter_url: null,
  instagram_url: null,
  linkedin_url: null,
  display_order: 0,
  is_published: true,
}

export function TeamMemberForm({ member }: Props) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isEditing = !!member

  const [form, setForm] = useState<FormState>(
    member
      ? {
          slug: member.slug,
          name: member.name,
          role: member.role,
          bio: member.bio,
          bio_extended: member.bio_extended,
          favorite_movie: member.favorite_movie,
          favorite_song: member.favorite_song,
          favorite_club: member.favorite_club,
          favorite_book: member.favorite_book,
          favorite_food: member.favorite_food,
          email: member.email,
          twitter_url: member.twitter_url,
          instagram_url: member.instagram_url,
          linkedin_url: member.linkedin_url,
          display_order: member.display_order,
          is_published: member.is_published,
        }
      : EMPTY_FORM
  )

  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(member?.photo_url ?? null)
  const [saving, setSaving] = useState(false)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    setForm((prev) => ({ ...prev, name, slug: isEditing ? prev.slug : slug }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  const uploadPhoto = async (): Promise<string | null> => {
    if (!photoFile) return null
    const ext = photoFile.name.split('.').pop()
    const path = `team/${Date.now()}.${ext}`
    const { error } = await supabase.storage
      .from('media')
      .upload(path, photoFile, { upsert: true })
    if (error) {
      toast.error(`Failed to upload photo: ${error.message}`)
      return null
    }
    const { data } = supabase.storage.from('media').getPublicUrl(path)
    return data.publicUrl
  }

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error('Name is required'); return }
    if (!form.role.trim()) { toast.error('Role is required'); return }
    if (!form.slug.trim())  { toast.error('Slug is required'); return }
    setSaving(true)
    try {
      const photo_url = photoFile ? await uploadPhoto() : (member?.photo_url ?? null)
      const payload: TeamMemberInsert = { ...form, photo_url }

      if (isEditing) {
        await updateTeamMember(member.id, payload)
        toast.success('Team member updated')
      } else {
        await createTeamMember(payload)
        toast.success('Team member created')
      }
      router.push('/dashboard/team')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      toast.error(`Failed to save: ${msg}`)
    } finally {
      setSaving(false)
    }
  }

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value || null }))

  return (
    <>
      <Header />
      <Main>
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='font-antigua text-2xl font-bold tracking-tight'>
              {isEditing ? 'Edit Team Member' : 'New Team Member'}
            </h1>
            <p className='mt-1 text-sm text-muted-foreground'>
              {isEditing ? `Editing ${member.name}` : 'Fill in the details below to add a new team member.'}
            </p>
          </div>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={() => router.push('/dashboard/team')}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className='bg-gradient-to-r from-[#CF9921] to-[#D2BB6B] text-white hover:brightness-110'
            >
              {saving ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
              {isEditing ? 'Save Changes' : 'Create Member'}
            </Button>
          </div>
        </div>

        <div className='grid gap-6 lg:grid-cols-[2fr_1fr]'>
          {/* Left column */}
          <div className='space-y-6'>
            {/* Core info */}
            <Card>
              <CardHeader>
                <CardTitle className='font-antigua text-lg'>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <div className='space-y-1.5'>
                    <Label htmlFor='name'>Full Name *</Label>
                    <Input
                      id='name'
                      value={form.name}
                      onChange={handleNameChange}
                      placeholder='Cris Morelo'
                    />
                  </div>
                  <div className='space-y-1.5'>
                    <Label htmlFor='role'>Role / Title *</Label>
                    <Input
                      id='role'
                      value={form.role}
                      onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                      placeholder='Head of Creative & HR'
                    />
                  </div>
                </div>

                <div className='space-y-1.5'>
                  <Label htmlFor='slug'>
                    Slug *{' '}
                    <span className='text-xs text-muted-foreground'>(URL-friendly identifier)</span>
                  </Label>
                  <Input
                    id='slug'
                    value={form.slug}
                    onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                    placeholder='cris-morelo'
                  />
                </div>

                <div className='space-y-1.5'>
                  <Label htmlFor='bio'>Bio (first paragraph)</Label>
                  <Textarea
                    id='bio'
                    value={form.bio ?? ''}
                    onChange={set('bio')}
                    rows={3}
                    placeholder='Short introduction…'
                  />
                </div>

                <div className='space-y-1.5'>
                  <Label htmlFor='bio_extended'>Bio (second paragraph)</Label>
                  <Textarea
                    id='bio_extended'
                    value={form.bio_extended ?? ''}
                    onChange={set('bio_extended')}
                    rows={3}
                    placeholder='More detail…'
                  />
                </div>
              </CardContent>
            </Card>

            {/* Favorites */}
            <Card>
              <CardHeader>
                <CardTitle className='font-antigua text-lg'>Fun Favorites</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <div className='space-y-1.5'>
                    <Label htmlFor='fav_movie'>🎬 Favorite Movie</Label>
                    <Input id='fav_movie' value={form.favorite_movie ?? ''} onChange={set('favorite_movie')} placeholder='e.g. The Pursuit of Happyness' />
                  </div>
                  <div className='space-y-1.5'>
                    <Label htmlFor='fav_song'>🎵 Favorite Song</Label>
                    <Input id='fav_song' value={form.favorite_song ?? ''} onChange={set('favorite_song')} placeholder='e.g. Bohemian Rhapsody' />
                  </div>
                  <div className='space-y-1.5'>
                    <Label htmlFor='fav_club'>🌙 Favorite Club</Label>
                    <Input id='fav_club' value={form.favorite_club ?? ''} onChange={set('favorite_club')} placeholder='e.g. Calle 8 Club' />
                  </div>
                  <div className='space-y-1.5'>
                    <Label htmlFor='fav_book'>📖 Favorite Book</Label>
                    <Input id='fav_book' value={form.favorite_book ?? ''} onChange={set('favorite_book')} placeholder='e.g. Atomic Habits' />
                  </div>
                  <div className='space-y-1.5 sm:col-span-2'>
                    <Label htmlFor='fav_food'>🍽 Favorite Dish</Label>
                    <Input id='fav_food' value={form.favorite_food ?? ''} onChange={set('favorite_food')} placeholder='e.g. Arroz con Pollo' />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social links */}
            <Card>
              <CardHeader>
                <CardTitle className='font-antigua text-lg'>Social Links</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <div className='space-y-1.5'>
                    <Label htmlFor='email'>Email</Label>
                    <Input id='email' type='email' value={form.email ?? ''} onChange={set('email')} placeholder='member@lacarta.com' />
                  </div>
                  <div className='space-y-1.5'>
                    <Label htmlFor='twitter_url'>X (Twitter) URL</Label>
                    <Input id='twitter_url' value={form.twitter_url ?? ''} onChange={set('twitter_url')} placeholder='https://x.com/handle' />
                  </div>
                  <div className='space-y-1.5'>
                    <Label htmlFor='instagram_url'>Instagram URL</Label>
                    <Input id='instagram_url' value={form.instagram_url ?? ''} onChange={set('instagram_url')} placeholder='https://instagram.com/handle' />
                  </div>
                  <div className='space-y-1.5'>
                    <Label htmlFor='linkedin_url'>LinkedIn URL</Label>
                    <Input id='linkedin_url' value={form.linkedin_url ?? ''} onChange={set('linkedin_url')} placeholder='https://linkedin.com/in/handle' />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className='space-y-6'>
            {/* Photo */}
            <Card>
              <CardHeader>
                <CardTitle className='font-antigua text-lg'>Photo</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {photoPreview ? (
                  <div className='relative'>
                    <img
                      src={photoPreview}
                      alt='Preview'
                      className='h-56 w-full rounded-lg object-cover object-top'
                    />
                    <button
                      type='button'
                      onClick={() => { setPhotoFile(null); setPhotoPreview(null) }}
                      className='absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70'
                    >
                      <X className='h-4 w-4' />
                    </button>
                  </div>
                ) : (
                  <button
                    type='button'
                    onClick={() => fileInputRef.current?.click()}
                    className='flex h-48 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border text-muted-foreground hover:border-[#CF9921] hover:text-[#CF9921] transition-colors'
                  >
                    <Upload className='h-8 w-8' />
                    <span className='text-sm'>Click to upload photo</span>
                    <span className='text-xs'>JPG, PNG, WebP (max 5 MB)</span>
                  </button>
                )}
                {photoPreview && (
                  <Button
                    variant='outline'
                    size='sm'
                    className='w-full'
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className='mr-2 h-4 w-4' />
                    Change Photo
                  </Button>
                )}
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handlePhotoChange}
                />
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle className='font-antigua text-lg'>Settings</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-1.5'>
                  <Label htmlFor='display_order'>Display Order</Label>
                  <Input
                    id='display_order'
                    type='number'
                    min={0}
                    value={form.display_order}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, display_order: parseInt(e.target.value) || 0 }))
                    }
                  />
                  <p className='text-xs text-muted-foreground'>Lower numbers appear first.</p>
                </div>

                <Separator />

                <div className='flex items-center justify-between'>
                  <div>
                    <Label htmlFor='is_published' className='cursor-pointer'>Published</Label>
                    <p className='text-xs text-muted-foreground'>
                      {form.is_published ? 'Visible on About Us page' : 'Hidden from public'}
                    </p>
                  </div>
                  <Switch
                    id='is_published'
                    checked={form.is_published}
                    onCheckedChange={(checked) => setForm((p) => ({ ...p, is_published: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}
