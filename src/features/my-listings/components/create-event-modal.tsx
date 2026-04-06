'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CalendarPlus, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { DatePicker } from '@/components/date-picker'
import { useAuthStore } from '@/lib/auth/auth.store'
import { createEvent, type EventInsert } from '@/lib/services/events.service'
import { supabase } from '@/lib/supabase'
import type { ClientListing } from '@/lib/listings.service'

interface CreateEventModalProps {
  listings: ClientListing[]
  onCreated?: () => void
}

export default function CreateEventModal({ listings, onCreated }: CreateEventModalProps) {
  const user = useAuthStore((s) => s.user)
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [eventDate, setEventDate] = useState<Date | undefined>(undefined)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [location, setLocation] = useState('')
  const [listingId, setListingId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [status, setStatus] = useState<'draft' | 'pending'>('draft')

  // Categories for events
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])

  useEffect(() => {
    supabase
      .from('categories')
      .select('id, name')
      .eq('type', 'event')
      .eq('status', 'active')
      .order('name')
      .then(({ data }) => {
        if (data) setCategories(data)
      })
  }, [])

  function resetForm() {
    setTitle('')
    setDescription('')
    setEventDate(undefined)
    setStartTime('')
    setEndTime('')
    setLocation('')
    setListingId('')
    setCategoryId('')
    setStatus('draft')
  }

  async function handleSubmit() {
    if (!title.trim()) {
      toast.error('Event title is required')
      return
    }
    if (!eventDate) {
      toast.error('Event date is required')
      return
    }
    if (!user?.accountNo) {
      toast.error('You must be signed in')
      return
    }

    setSubmitting(true)
    try {
      const payload: EventInsert = {
        title: title.trim(),
        description: description.trim() || null,
        cover_image: null,
        category_id: categoryId || null,
        listing_id: listingId || null,
        created_by: user.accountNo,
        status,
        event_date: format(eventDate, 'yyyy-MM-dd'),
        start_time: startTime || null,
        end_time: endTime || null,
        location: location.trim() || null,
        latitude: null,
        longitude: null,
        is_recurring: false,
        recurrence_rule: null,
      }

      await createEvent(payload)
      toast.success(status === 'pending' ? 'Event submitted for review' : 'Event saved as draft')
      resetForm()
      setOpen(false)
      onCreated?.()
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to create event')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='gap-1.5 border-[#CF9921]/40 hover:border-[#CF9921] hover:text-[#CF9921]'>
          <CalendarPlus className='h-4 w-4' />
          Submit Event
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          'p-0 gap-0 overflow-y-auto max-h-[96vh]',
          'w-full max-w-[min(95vw,460px)] sm:max-w-[min(95vw,520px)] md:max-w-[min(95vw,620px)]'
        )}
      >
        <DialogHeader className='px-5 sm:px-6 pt-5 pb-3 border-b'>
          <DialogTitle className='text-lg sm:text-xl font-semibold tracking-tight'>
            Submit New Event
          </DialogTitle>
          <p className='text-xs sm:text-sm text-muted-foreground mt-1'>
            Add your event details. Submitted events go to admin review before publishing.
          </p>
        </DialogHeader>

        <div className='px-5 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5'>
          {/* Title */}
          <div className='space-y-1.5'>
            <Label htmlFor='ev-title' className='flex items-center gap-1 text-sm'>
              Event Title <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='ev-title'
              placeholder='Sunset Jazz at the Marina'
              className='h-9'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className='space-y-1.5'>
            <Label className='text-sm'>Description</Label>
            <Textarea
              placeholder='Brief description of the event...'
              className='min-h-[60px] sm:min-h-[68px] resize-none text-sm'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Event Date + Times */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <div className='space-y-1.5'>
              <Label className='flex items-center gap-1 text-sm'>
                Date <span className='text-red-500'>*</span>
              </Label>
              <DatePicker selected={eventDate} onSelect={setEventDate} placeholder='Select date' />
            </div>
            <div className='space-y-1.5'>
              <Label className='text-sm'>Start Time</Label>
              <Input
                type='time'
                className='h-9'
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className='space-y-1.5'>
              <Label className='text-sm'>End Time</Label>
              <Input
                type='time'
                className='h-9'
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          {/* Location */}
          <div className='space-y-1.5'>
            <Label className='text-sm'>Location</Label>
            <Input
              placeholder='e.g. Playa Blanca, Cartagena'
              className='h-9'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Linked Listing */}
          {listings.length > 0 && (
            <div className='space-y-1.5'>
              <Label className='text-sm'>Link to Listing</Label>
              <Select value={listingId} onValueChange={setListingId}>
                <SelectTrigger className='h-9'>
                  <SelectValue placeholder='Select a listing (optional)' />
                </SelectTrigger>
                <SelectContent>
                  {listings.map((l) => (
                    <SelectItem key={l.id} value={l.id}>
                      {l.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Category */}
          <div className='space-y-1.5'>
            <Label className='text-sm'>Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className='h-9'>
                <SelectValue placeholder='Select category (optional)' />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className='space-y-1.5'>
            <Label className='text-sm'>Status</Label>
            <RadioGroup
              value={status}
              onValueChange={(v) => setStatus(v as 'draft' | 'pending')}
              className='flex flex-col sm:flex-row gap-5 sm:gap-8 pt-0.5'
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='draft' id='ev-draft' />
                <Label htmlFor='ev-draft' className='cursor-pointer text-sm'>
                  Save as Draft
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='pending' id='ev-submit' />
                <Label htmlFor='ev-submit' className='cursor-pointer text-sm'>
                  Submit for Review
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className='px-5 sm:px-6 py-4 border-t bg-muted/30'>
          <Button
            className='w-full bg-[#CF9921] hover:bg-[#b8871b] text-white font-medium h-10'
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <Loader2 className='h-4 w-4 animate-spin mr-2' />
            ) : null}
            {status === 'pending' ? 'Submit Event' : 'Save as Draft'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
