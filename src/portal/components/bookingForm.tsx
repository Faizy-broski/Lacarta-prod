'use client'

import { useRef, useState } from 'react'
import { Loader2, ChevronDown } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@supabase/supabase-js'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@public/components/ui/dialog'
import { Input } from '@public/components/ui/input'
import { Textarea } from '@public/components/ui/textarea'
import { Button } from '@public/components/ui/button'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  listingId?: string
}

export function BookingDialog({ open, onOpenChange, listingId }: BookingDialogProps) {
  const inputStartRef = useRef<HTMLInputElement>(null)
  const inputEndRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [groupSize, setGroupSize] = useState('')
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const openPicker = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current?.showPicker) {
      ref.current.showPicker()
    } else {
      ref.current?.focus()
    }
  }

  const resetForm = () => {
    setName('')
    setPhone('')
    setEmail('')
    setStartDate('')
    setEndDate('')
    setGroupSize('')
    setComment('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      toast.error('Name and email are required.')
      return
    }
    setSubmitting(true)

    const { error } = await supabase.from('inquiries').insert({
      listing_id: listingId ?? null,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
      message: comment.trim() || null,
      start_date: startDate || null,
      end_date: endDate || null,
      group_size: groupSize ? parseInt(groupSize, 10) : null,
      inquiry_type: 'booking',
      status: 'new',
    })

    setSubmitting(false)
    if (error) {
      toast.error('Failed to submit booking. Please try again.')
    } else {
      toast.success('Booking submitted! We will get back to you soon.')
      resetForm()
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(s) => { if (!submitting) { resetForm(); onOpenChange(s) } }}>
      <DialogContent
        className='w-[95%] max-w-3xl max-h-[80vh] overflow-auto rounded-2xl bg-[#f4f4f4] p-6 sm:p-10 shadow-2xl'
      >
        <DialogHeader className='relative'>
          <DialogTitle className='font-antigua text-2xl text-black sm:text-3xl tracking-wide'>
            Book With La Carta
          </DialogTitle>
          <p className='text-sm text-muted-foreground mt-1'>Fill the details for booking.</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='mt-6 space-y-6'>
          <Input
            placeholder='Name *'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='bg-transparent border-0 border-b rounded-none shadow-none focus-visible:ring-0 text-black'
          />

          <Input
            placeholder='Phone Number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='bg-transparent border-0 border-b rounded-none shadow-none focus-visible:ring-0 text-black'
          />

          <Input
            type='email'
            placeholder='Email *'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='bg-transparent border-0 border-b rounded-none shadow-none focus-visible:ring-0 text-black'
          />

          {/* Dates Row */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {/* Start Date */}
            <div className='relative w-full'>
              <input
                ref={inputStartRef}
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className='absolute inset-0 opacity-0 pointer-events-none w-full h-10'
              />
              <button
                type='button'
                onClick={() => openPicker(inputStartRef)}
                className='w-full flex items-center justify-between border-0 border-b border-gray-300 pb-2 text-left bg-transparent rounded-none shadow-none focus:outline-none h-10 px-3 py-2 text-muted-foreground md:text-sm'
              >
                <span className={startDate ? 'text-black' : 'text-gray-500'}>
                  {startDate || 'Start Date'}
                </span>
                <ChevronDown className='h-4 w-4 text-gray-500' />
              </button>
            </div>

            {/* End Date */}
            <div className='relative w-full'>
              <input
                ref={inputEndRef}
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className='absolute inset-0 opacity-0 pointer-events-none w-full h-10'
              />
              <button
                type='button'
                onClick={() => openPicker(inputEndRef)}
                className='w-full flex items-center justify-between border-0 border-b border-gray-300 pb-2 text-left bg-transparent rounded-none shadow-none focus:outline-none h-10 px-3 py-2 text-muted-foreground md:text-sm'
              >
                <span className={endDate ? 'text-black' : 'text-gray-500'}>
                  {endDate || 'End Date'}
                </span>
                <ChevronDown className='h-4 w-4 text-gray-500' />
              </button>
            </div>
          </div>

          <Input
            placeholder='Group Size'
            type='number'
            min='1'
            value={groupSize}
            onChange={(e) => setGroupSize(e.target.value)}
            className='bg-transparent border-0 border-b rounded-none shadow-none focus-visible:ring-0 text-black'
          />

          <Textarea
            placeholder='Comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='min-h-[150px] resize-none bg-transparent border rounded-xl focus-visible:ring-0 text-black'
          />

          <Button
            type='submit'
            disabled={submitting}
            className='w-full h-14 rounded-full text-base font-medium font-antigua bg-gradient-to-b from-gold to-gold-light text-white hover:opacity-90'
          >
            {submitting ? <Loader2 className='mr-2 h-5 w-5 animate-spin' /> : null}
            Book with La Carta
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
