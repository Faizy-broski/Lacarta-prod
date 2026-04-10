'use client'

import { useState, useEffect } from 'react'
import { CalendarPlus, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createEvent, fetchEventCategories, type EventCategory } from '@/lib/services/events.service'
import { useAuthStore } from '@/lib/auth/auth.store'

interface Props {
  onCreated?: () => void
}

export default function CreateEventDialog({ onCreated }: Props) {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<EventCategory[]>([])

  const user = useAuthStore((s) => s.user)
  const isAdmin = ['admin', 'owner', 'assistant'].includes(user?.role?.[0] ?? '')

  const [form, setForm] = useState({
    title: '',
    description: '',
    event_date: '',
    start_time: '',
    end_time: '',
    location: '',
    category_id: '',
    status: 'pending' as 'draft' | 'pending' | 'published',
  })

  useEffect(() => {
    if (open) fetchEventCategories().then(setCategories)
  }, [open])

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) { toast.error('Event title is required'); return }
    if (!form.event_date) { toast.error('Event date is required'); return }
    if (!user?.accountNo) { toast.error('You must be logged in'); return }

    try {
      setSaving(true)
      await createEvent({
        title: form.title.trim(),
        description: form.description.trim() || null,
        cover_image: null,
        category_id: form.category_id || null,
        created_by: user.accountNo,
        status: form.status,
        event_date: form.event_date,
        start_time: form.start_time || null,
        end_time: form.end_time || null,
        location: form.location.trim() || null,
      } as any)
      toast.success('Event created successfully')
      setOpen(false)
      setForm({
        title: '',
        description: '',
        event_date: '',
        start_time: '',
        end_time: '',
        location: '',
        category_id: '',
        status: 'draft',
      })
      onCreated?.()
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to create event')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className='gap-2'>
        <CalendarPlus className='h-4 w-4' />
        Create Event
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle className='font-antigua text-xl'>Create New Event</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Title */}
            <div className='space-y-1.5'>
              <Label htmlFor='ev-title'>Title <span className='text-red-500'>*</span></Label>
              <Input
                id='ev-title'
                placeholder='e.g. Cartagena Jazz Festival'
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
              />
            </div>

            {/* Category + Status row */}
            <div className='grid grid-cols-2 gap-3'>
              <div className='space-y-1.5'>
                <Label>Category</Label>
                <Select value={form.category_id} onValueChange={(v) => set('category_id', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select category' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-1.5'>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => set('status', v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='draft'>Draft</SelectItem>
                    <SelectItem value='pending'>Submit for Review</SelectItem>
                    {isAdmin && <SelectItem value='published'>Publish Directly</SelectItem>}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date */}
            <div className='space-y-1.5'>
              <Label htmlFor='ev-date'>Event Date <span className='text-red-500'>*</span></Label>
              <Input
                id='ev-date'
                type='date'
                value={form.event_date}
                onChange={(e) => set('event_date', e.target.value)}
              />
            </div>

            {/* Time row */}
            <div className='grid grid-cols-2 gap-3'>
              <div className='space-y-1.5'>
                <Label htmlFor='ev-start'>Start Time</Label>
                <Input
                  id='ev-start'
                  type='time'
                  value={form.start_time}
                  onChange={(e) => set('start_time', e.target.value)}
                />
              </div>
              <div className='space-y-1.5'>
                <Label htmlFor='ev-end'>End Time</Label>
                <Input
                  id='ev-end'
                  type='time'
                  value={form.end_time}
                  onChange={(e) => set('end_time', e.target.value)}
                />
              </div>
            </div>

            {/* Location */}
            <div className='space-y-1.5'>
              <Label htmlFor='ev-location'>Location</Label>
              <Input
                id='ev-location'
                placeholder='e.g. Centro Histórico, Cartagena'
                value={form.location}
                onChange={(e) => set('location', e.target.value)}
              />
            </div>

            {/* Description */}
            <div className='space-y-1.5'>
              <Label htmlFor='ev-desc'>Description</Label>
              <Textarea
                id='ev-desc'
                placeholder='Event details…'
                rows={3}
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button type='button' variant='outline' onClick={() => setOpen(false)} disabled={saving}>
                Cancel
              </Button>
              <Button type='submit' disabled={saving} className='gap-2'>
                {saving && <Loader2 className='h-4 w-4 animate-spin' />}
                {saving ? 'Creating…' : 'Create Event'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
