'use client'

import { useEffect, useState, useRef } from 'react'
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
import { Tag, Loader2, Upload, FileText, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { DatePicker } from '@/components/date-picker'
import { useAuthStore } from '@/lib/auth/auth.store'
import { createDeal, type DealInsert } from '@/lib/services/deals.service'
import type { ClientListing } from '@/lib/listings.service'

interface CreateDealModalProps {
  listings: ClientListing[]
  onCreated?: () => void
}

export default function CreateDealModal({ listings, onCreated }: CreateDealModalProps) {
  const user = useAuthStore((s) => s.user)
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [discountType, setDiscountType] = useState<'percent' | 'fixed' | 'bogo' | 'freebie'>('percent')
  const [discountValue, setDiscountValue] = useState('')
  const [acquireLink, setAcquireLink] = useState('')
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [listingId, setListingId] = useState('')
  const [status, setStatus] = useState<'draft' | 'pending'>('draft')

  // PDF upload
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfPreviewName, setPdfPreviewName] = useState<string | null>(null)
  const pdfInputRef = useRef<HTMLInputElement>(null)

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      toast.error('Please select a PDF file')
      return
    }
    setPdfFile(file)
    setPdfPreviewName(file.name)
  }

  const removePdf = () => {
    setPdfFile(null)
    setPdfPreviewName(null)
    if (pdfInputRef.current) pdfInputRef.current.value = ''
  }

  function resetForm() {
    setTitle('')
    setDescription('')
    setDiscountType('percent')
    setDiscountValue('')
    setAcquireLink('')
    setStartDate(undefined)
    setEndDate(undefined)
    setListingId('')
    setStatus('draft')
    removePdf()
  }

  async function handleSubmit() {
    if (!title.trim()) {
      toast.error('Deal title is required')
      return
    }
    if (!user?.accountNo) {
      toast.error('You must be signed in')
      return
    }

    setSubmitting(true)
    try {
      const payload: DealInsert = {
        title: title.trim(),
        description: description.trim() || null,
        cover_image: null,
        listing_id: listingId || null,
        created_by: user.accountNo,
        discount_type: discountType,
        discount_value: parseFloat(discountValue) || 0,
        acquire_link: acquireLink.trim() || null,
        status,
        starts_at: startDate ? format(startDate, 'yyyy-MM-dd') : null,
        expires_at: endDate ? format(endDate, 'yyyy-MM-dd') : null,
      }

      await createDeal(payload)
      toast.success(status === 'pending' ? 'Deal submitted for review' : 'Deal saved as draft')
      resetForm()
      setOpen(false)
      onCreated?.()
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to create deal')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='gap-1.5 border-[#CF9921]/40 hover:border-[#CF9921] hover:text-[#CF9921]'>
          <Tag className='h-4 w-4' />
          Submit Deal
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
            Submit New Deal
          </DialogTitle>
          <p className='text-xs sm:text-sm text-muted-foreground mt-1'>
            Add a discount or offer for your listing. Submitted deals go to admin review.
          </p>
        </DialogHeader>

        <div className='px-5 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5'>
          {/* Title */}
          <div className='space-y-1.5'>
            <Label htmlFor='dl-title' className='flex items-center gap-1 text-sm'>
              Deal Title <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='dl-title'
              placeholder='Summer Flash Sale – 50% Off'
              className='h-9'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className='space-y-1.5'>
            <Label className='text-sm'>Description</Label>
            <Textarea
              placeholder='Brief description of the deal...'
              className='min-h-[60px] sm:min-h-[68px] resize-none text-sm'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Discount Type + Value */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='space-y-1.5'>
              <Label className='text-sm'>Discount Type</Label>
              <Select value={discountType} onValueChange={(v) => setDiscountType(v as any)}>
                <SelectTrigger className='h-9'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='percent'>Percentage Off</SelectItem>
                  <SelectItem value='fixed'>Fixed Amount Off</SelectItem>
                  <SelectItem value='bogo'>Buy One Get One</SelectItem>
                  <SelectItem value='freebie'>Freebie</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-1.5'>
              <Label className='text-sm'>Discount Value</Label>
              <Input
                type='number'
                placeholder={discountType === 'percent' ? 'e.g. 25' : 'e.g. 10.00'}
                className='h-9'
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
              />
            </div>
          </div>

          {/* Dates */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='space-y-1.5'>
              <Label className='text-sm'>Start Date</Label>
              <DatePicker selected={startDate} onSelect={setStartDate} placeholder='Select start date' />
            </div>
            <div className='space-y-1.5'>
              <Label className='text-sm'>End Date</Label>
              <DatePicker selected={endDate} onSelect={setEndDate} placeholder='Select end date' />
            </div>
          </div>

          {/* Acquire Link */}
          <div className='space-y-1.5'>
            <Label className='text-sm'>Acquire Link</Label>
            <Input
              type='url'
              placeholder='https://example.com/deal'
              className='h-9'
              value={acquireLink}
              onChange={(e) => setAcquireLink(e.target.value)}
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

          {/* Upload PDF */}
          <div className='space-y-1.5'>
            <Label className='text-sm'>Upload PDF</Label>
            <div className='border border-dashed border-input rounded-lg p-3 sm:p-4 bg-muted/30 hover:bg-muted/50 transition-colors'>
              {!pdfPreviewName ? (
                <div className='flex flex-col items-center justify-center py-1 sm:py-4 text-center'>
                  <Upload className='h-6 w-6 sm:h-7 sm:w-7 text-muted-foreground mb-1.5' />
                  <p className='text-sm font-medium'>Click to upload PDF</p>
                  <p className='text-xs text-muted-foreground mt-0.5'>Max 10MB recommended</p>
                  <input
                    ref={pdfInputRef}
                    type='file'
                    accept='application/pdf'
                    className='hidden'
                    onChange={handlePdfChange}
                  />
                  <Button
                    variant='outline'
                    size='sm'
                    className='mt-3 gap-1.5 text-xs sm:text-sm'
                    onClick={() => pdfInputRef.current?.click()}
                  >
                    <FileText className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
                    Choose PDF
                  </Button>
                </div>
              ) : (
                <div className='flex items-center justify-between py-2.5 px-3 sm:px-4 bg-background rounded border text-sm'>
                  <div className='flex items-center gap-2.5'>
                    <FileText className='h-4 w-4 sm:h-5 sm:w-5 text-blue-500' />
                    <span className='font-medium truncate max-w-[180px] sm:max-w-[260px]'>
                      {pdfPreviewName}
                    </span>
                  </div>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-destructive'
                    onClick={removePdf}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </div>
              )}
            </div>
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
                <RadioGroupItem value='draft' id='dl-draft' />
                <Label htmlFor='dl-draft' className='cursor-pointer text-sm'>
                  Save as Draft
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='pending' id='dl-submit' />
                <Label htmlFor='dl-submit' className='cursor-pointer text-sm'>
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
            {status === 'pending' ? 'Submit Deal' : 'Save as Draft'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
