'use client'
import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  ArrowLeft,
  Plus,
  Trash2,
  MapPin,
  DollarSign,
  ImageIcon,
  Link as LinkIcon,Sparkles, FileText ,
  Map,
  ChevronsUpDown,
  Lightbulb,
  CheckSquare,
  Save,
  Loader2,
  Tag,
  Globe,
  Phone,
  Mail,
  Share2,
  ExternalLink,
  Clock,
  HelpCircle,
  Percent,
  UtensilsCrossed,
  Hash,
  Upload,
  X,
} from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandEmpty,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

// import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

// ─── Types ────────────────────────────────────────────────────────────────────

type WeeklySlot = { start: string; end: string }
type WeeklyDay = { open: boolean; slots: WeeklySlot[] }
type WeeklyHours = Record<string, WeeklyDay>

type AttrOption = { id: string; name: string }
type AttrsByType = {
  neighborhood: AttrOption[]
  key_feature: AttrOption[]
  service: AttrOption[]
  amenity: AttrOption[]
  atmosphere: AttrOption[]
  menu: AttrOption[]
}

type Category = { id: string; name: string }
type SubCategory = { id: string; name: string }
type RoadMapItem = { time: string; activity: string }
type RoadMapDay = { day: number; title: string; items: RoadMapItem[] }
type FAQ = { question: string; answer: string }
type Deal = {
  title: string
  subtitle: string
  percent_off: string
  acquire_link: string
}
type TravelTip = { title: string; subtitle: string }
type MenuItem = { name: string; description: string; price: string }
type ReservationLink = { platform: string; url: string }
type SocialLink = { platform: string; url: string }
type ListingStatus = 'active' | 'inactive' | 'pending' | 'featured'

interface ListingForm {
  title: string
  subtitle: string
  description: string
  price_from: string
  price_to: string
  price_unit: string
  cover_image: string
  category_id: string
  sub_category_id: string
  status: ListingStatus
  category_tags: string[]
  seo_slug: string
  images: string[]
  address: string
  latitude: string
  longitude: string
  google_maps_link: string
  email: string
  phone: string
  website: string
  whatsapp: string
  facebook: string
  instagram: string
  extra_social_links: SocialLink[]
  reservation_links: ReservationLink[]
  start_time: string
  end_time: string
  pickup_time: string
  travel_duration: string
  beach_start: string
  beach_end: string
  weekly_hours: WeeklyHours
  faqs: FAQ[]
  deals: Deal[]
  road_map: RoadMapDay[]
  travel_tips: TravelTip[]
  key_features: string[]
  services: string[]
  amenities: string[]
  neighborhoods: string[]
  atmosphere: string[]
  menu_items: MenuItem[]
}

type ValidationErrors = Partial<
  Record<keyof ListingForm | 'social' | 'user_id', string>
>

// ─── Constants ────────────────────────────────────────────────────────────────

const DAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]
const STATUSES: ListingStatus[] = ['active', 'inactive', 'pending', 'featured']
const PRICE_UNITS = ['night', 'person', 'hour', 'day', 'tour', 'item']

const EMPTY_WEEKLY_HOURS: WeeklyHours = Object.fromEntries(
  DAYS.map((d) => [d, { open: false, slots: [{ start: '', end: '' }] }])
)

const EMPTY_ATTRS: AttrsByType = {
  neighborhood: [],
  key_feature: [],
  service: [],
  amenity: [],
  atmosphere: [],
  menu: [],
}

const EMPTY_FORM: ListingForm = {
  title: '',
  subtitle: '',
  description: '',
  price_from: '',
  price_to: '',
  price_unit: 'night',
  cover_image: '',
  category_id: '',
  sub_category_id: '',
  status: 'pending',
  category_tags: [],
  seo_slug: '',
  images: [],
  address: '',
  latitude: '',
  longitude: '',
  google_maps_link: '',
  email: '',
  phone: '',
  website: '',
  whatsapp: '',
  facebook: '',
  instagram: '',
  extra_social_links: [],
  reservation_links: [],
  start_time: '',
  end_time: '',
  pickup_time: '',
  travel_duration: '',
  beach_start: '',
  beach_end: '',
  weekly_hours: EMPTY_WEEKLY_HOURS,
  faqs: [],
  deals: [],
  road_map: [],
  travel_tips: [],
  key_features: [],
  services: [],
  amenities: [],
  neighborhoods: [],
  atmosphere: [],
  menu_items: [],
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isValidUrl(url: string): boolean {
  if (!url.trim()) return true
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`)
    return true
  } catch {
    return false
  }
}

// ─── UI Primitives ────────────────────────────────────────────────────────────

function SectionCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <Card className='rounded-xl'>
      <CardHeader className=''>
        <div className='flex items-center gap-2.5'>
          <span className='text-gold p-2 rounded-md bg-gold/10'>{icon}</span>
          <div>
            <CardTitle className='text-base font-bold'>{title}</CardTitle>
            {description && (
              <p className='mt-0.5 text-xs text-muted-foreground'>
                {description}
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className='space-y-4 pt-4'>{children}</CardContent>
    </Card>
  )
}

function FormField({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className='space-y-1.5'>
      <Label className='text-sm font-medium'>
        {label}
        {required && <span className='ml-0.5 text-destructive'>*</span>}
      </Label>
      {children}
      {error ? (
        <p className='text-xs text-destructive'>{error}</p>
      ) : (
        hint && <p className='text-[11px] text-muted-foreground'>{hint}</p>
      )}
    </div>
  )
}

function AddButton({
  onClick,
  children,
  disabled,
}: {
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
}) {
  return (
    <Button
      type='button'
      variant='outline'
      onClick={onClick}
      disabled={disabled}
      className='w-full rounded-md border-dashed text-muted-foreground hover:border-gold hover:text-gold'
    >
      <Plus className='mr-2 h-4 w-4' />
      {children}
    </Button>
  )
}

function IconInput({
  icon: Icon,
  className,
  ...props
}: React.ComponentProps<'input'> & {
  icon: React.ElementType
}) {
  return (
    <div className='relative'>
      <Icon className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
      <Input {...props} className={cn('rounded-md pl-9', className)} />
    </div>
  )
}

// ─── Multi-Select Attribute ───────────────────────────────────────────────────

function MultiSelectAttr({
  options,
  values,
  onChange,
  emptyMsg = 'Select a category first',
}: {
  options: AttrOption[]
  values: string[]
  onChange: (v: string[]) => void
  emptyMsg?: string
}) {
  if (!options.length)
    return <p className='text-xs text-muted-foreground italic'>{emptyMsg}</p>
  const toggle = (name: string) =>
    onChange(
      values.includes(name)
        ? values.filter((v) => v !== name)
        : [...values, name]
    )
  return (
    <div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
      {options.map((opt) => (
        <label
          key={opt.id}
          className='flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted/40 has-checked:border-amber-400 has-checked:bg-amber-50'
        >
          <Checkbox
            checked={values.includes(opt.name)}
            onCheckedChange={() => toggle(opt.name)}
            className='shrink-0'
          />
          <span className='leading-tight'>{opt.name}</span>
        </label>
      ))}
    </div>
  )
}

function SingleSelectAttr({
  options,
  value,
  onChange,
  emptyMsg = 'Select a category first',
}: {
  options: AttrOption[]
  value?: string
  onChange: (v: string) => void
  emptyMsg?: string
}) {
  if (!options.length) {
    return <p className='text-xs text-muted-foreground italic'>{emptyMsg}</p>
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Select attribute' />
      </SelectTrigger>

      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.id} value={opt.name}>
            {opt.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

// ─── Sub-category Tag Select ──────────────────────────────────────────────────

function SubCategoryTagSelect({
  subCategories,
  values,
  onChange,
}: {
  subCategories: SubCategory[]
  values: string[]
  onChange: (v: string[]) => void
}) {
  if (!subCategories.length)
    return (
      <p className='text-xs text-muted-foreground italic'>
        Select a category to see available tags
      </p>
    )
  const toggle = (name: string) =>
    onChange(
      values.includes(name)
        ? values.filter((v) => v !== name)
        : [...values, name]
    )
  return (
    <div className='space-y-2'>
      <div className='flex flex-wrap gap-2'>
        {subCategories.map((sc) => (
          <button
            key={sc.id}
            type='button'
            onClick={() => toggle(sc.name)}
            className={cn(
              'rounded-md border px-3 py-1 text-xs font-medium transition-colors',
              values.includes(sc.name)
                ? 'border-amber-400 bg-amber-100 text-amber-800'
                : 'border-border bg-background text-muted-foreground hover:border-amber-300 hover:text-amber-700'
            )}
          >
            {sc.name}
          </button>
        ))}
      </div>
      {values.length > 0 && (
        <p className='text-[11px] text-muted-foreground'>
          {values.length} tag{values.length > 1 ? 's' : ''} selected
        </p>
      )}
    </div>
  )
}

// ─── Photo Uploader (single, drag & drop) ────────────────────────────────────

function PhotoUploader({
  currentUrl,
  onUploaded,
  categorySlug,
  disabled,
  error,
}: {
  currentUrl: string
  onUploaded: (url: string) => void
  categorySlug: string
  disabled?: boolean
  error?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) return
    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const path = `${categorySlug}/${crypto.randomUUID()}.${ext}`
      const { error: err } = await supabase.storage
        .from('listing_photos')
        .upload(path, file, { upsert: false })
      if (err) {
        toast.error('Upload failed', { description: err.message })
        return
      }
      const {
        data: { publicUrl },
      } = supabase.storage.from('listing_photos').getPublicUrl(path)
      onUploaded(publicUrl)
      toast.success('Photo uploaded')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className='space-y-2'>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          if (!disabled) {
            const file = e.dataTransfer.files[0]
            if (file) handleFile(file)
          }
        }}
        onClick={() => !disabled && !uploading && inputRef.current?.click()}
        className={cn(
          'relative flex h-64 w-full cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-md border-2 border-dashed transition-colors',
          isDragging
            ? 'border-gold bg-gold/10'
            : 'border-border hover:border-gold hover:bg-muted/30',
          disabled && 'cursor-not-allowed opacity-50',
          error && !currentUrl && 'border-destructive'
        )}
      >
        {currentUrl ? (
          <>
            <img
              src={currentUrl}
              alt='Featured'
              className='h-full w-full object-cover'
              onError={(e) => {
                ;(e.target as HTMLImageElement).style.display = 'none'
              }}
            />
            <div className='absolute inset-0 flex items-center justify-center bg-black/0 transition-colors hover:bg-black/20'>
              <div className='rounded-md bg-black/60 px-3 py-1.5 text-xs text-white opacity-0 transition-opacity hover:opacity-100'>
                Click to replace
              </div>
            </div>
            <button
              type='button'
              aria-label='Remove photo'
              onClick={(e) => {
                e.stopPropagation()
                onUploaded('')
              }}
              className='absolute top-2 right-2 rounded-md bg-black/50 p-1.5 text-white hover:bg-black/70'
            >
              <X className='h-3.5 w-3.5' />
            </button>
          </>
        ) : (
          <div className='flex flex-col items-center gap-2 text-center'>
            {uploading ? (
              <Loader2 className='h-10 w-10 animate-spin text-gold' />
            ) : (
              <Upload className='h-10 w-10 text-muted-foreground' />
            )}
            <div>
              <p className='text-sm font-medium text-muted-foreground'>
                {uploading
                  ? 'Uploading…'
                  : disabled
                    ? 'Select a category first'
                    : 'Drag & drop or click to upload'}
              </p>
              {!disabled && !uploading && (
                <p className='text-xs text-muted-foreground'>
                  PNG, JPG, WEBP — recommended 1200×800px
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
    </div>
  )
}

// ─── Gallery Uploader (drag & drop) ──────────────────────────────────────────

function GalleryUploader({
  images,
  onChange,
  categorySlug,
  disabled,
}: {
  images: string[]
  onChange: (v: string[]) => void
  categorySlug: string
  disabled?: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  async function handleFiles(files: FileList) {
    setUploading(true)
    const uploaded: string[] = []
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) continue
        const ext = file.name.split('.').pop()
        const path = `${categorySlug}/${crypto.randomUUID()}.${ext}`
        const { error } = await supabase.storage
          .from('listing_photos')
          .upload(path, file, { upsert: false })
        if (error) {
          toast.error(`Failed: ${file.name}`, { description: error.message })
          continue
        }
        const {
          data: { publicUrl },
        } = supabase.storage.from('listing_photos').getPublicUrl(path)
        uploaded.push(publicUrl)
      }
      if (uploaded.length) {
        onChange([...images, ...uploaded])
        toast.success(
          `${uploaded.length} photo${uploaded.length > 1 ? 's' : ''} uploaded`
        )
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className='space-y-3'>
      {/* Thumbnail grid */}
      {images.length > 0 && (
        <div className='grid grid-cols-3 gap-2 sm:grid-cols-4'>
          {images.map((url, idx) => (
            <div
              key={idx}
              className='group relative aspect-square overflow-hidden rounded-md border'
            >
              <img
                src={url}
                alt={`Photo ${idx + 1}`}
                className='h-full w-full object-cover'
              />
              <button
                type='button'
                aria-label={`Remove photo ${idx + 1}`}
                onClick={() => onChange(images.filter((_, i) => i !== idx))}
                className='absolute top-1 right-1 rounded-md bg-black/50 p-0.5 text-white opacity-0 transition-opacity group-hover:opacity-100'
              >
                <X className='h-3 w-3' />
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          if (!disabled && e.dataTransfer.files.length)
            handleFiles(e.dataTransfer.files)
        }}
        onClick={() => !disabled && !uploading && inputRef.current?.click()}
        className={cn(
          'flex h-24 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-md border-2 border-dashed transition-colors',
          isDragging
            ? 'border-gold bg-gold/10'
            : 'border-border hover:border-gold hover:bg-muted/30',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        {uploading ? (
          <Loader2 className='h-5 w-5 animate-spin text-amber-500' />
        ) : (
          <Upload className='h-5 w-5 text-muted-foreground' />
        )}
        <p className='text-xs text-muted-foreground'>
          {disabled
            ? 'Select a category first'
            : uploading
              ? 'Uploading…'
              : 'Drag & drop or click — multiple files supported'}
        </p>
      </div>
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        multiple
        className='hidden'
        onChange={(e) => e.target.files?.length && handleFiles(e.target.files)}
      />
      {images.length > 0 && (
        <p className='text-[11px] text-muted-foreground'>
          {images.length} photo{images.length > 1 ? 's' : ''} in gallery
        </p>
      )}
    </div>
  )
}

// ─── FAQs Editor ─────────────────────────────────────────────────────────────

function FAQsEditor({
  faqs,
  onChange,
}: {
  faqs: FAQ[]
  onChange: (v: FAQ[]) => void
}) {
  const add = () => onChange([...faqs, { question: '', answer: '' }])
  const update = (i: number, field: keyof FAQ, val: string) =>
    onChange(faqs.map((f, idx) => (idx === i ? { ...f, [field]: val } : f)))
  const remove = (i: number) => onChange(faqs.filter((_, idx) => idx !== i))
  return (
    <div className='space-y-3'>
      {faqs.map((faq, i) => (
        <div key={i} className='space-y-3 rounded-md border bg-muted/30 p-4'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-muted-foreground'>
              FAQ #{i + 1}
            </span>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='h-7 w-7'
              onClick={() => remove(i)}
            >
              <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
            </Button>
          </div>
          <Input
            placeholder='Question'
            value={faq.question}
            onChange={(e) => update(i, 'question', e.target.value)}
            className='rounded-md'
          />
          <Textarea
            placeholder='Answer'
            rows={2}
            value={faq.answer}
            onChange={(e) => update(i, 'answer', e.target.value)}
            className='resize-none rounded-md'
          />
        </div>
      ))}
      <AddButton onClick={add}>Add FAQ</AddButton>
    </div>
  )
}

// ─── Deals Editor ────────────────────────────────────────────────────────────

function DealsEditor({
  deals,
  onChange,
}: {
  deals: Deal[]
  onChange: (v: Deal[]) => void
}) {
  const add = () =>
    onChange([
      ...deals,
      { title: '', subtitle: '', percent_off: '', acquire_link: '' },
    ])
  const update = (i: number, field: keyof Deal, val: string) =>
    onChange(deals.map((d, idx) => (idx === i ? { ...d, [field]: val } : d)))
  const remove = (i: number) => onChange(deals.filter((_, idx) => idx !== i))
  return (
    <div className='space-y-3'>
      {deals.map((deal, i) => (
        <div key={i} className='space-y-3 rounded-md border bg-muted/30 p-4'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-muted-foreground'>
              Deal #{i + 1}
            </span>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='h-7 w-7'
              onClick={() => remove(i)}
            >
              <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
            </Button>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <Input
              placeholder='Deal title'
              value={deal.title}
              onChange={(e) => update(i, 'title', e.target.value)}
              className='rounded-md'
            />
            <Input
              placeholder='Subtitle'
              value={deal.subtitle}
              onChange={(e) => update(i, 'subtitle', e.target.value)}
              className='rounded-md'
            />
            <div className='relative'>
              <Percent className='absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground' />
              <Input
                type='number'
                placeholder='Discount %'
                min={0}
                max={100}
                value={deal.percent_off}
                onChange={(e) => update(i, 'percent_off', e.target.value)}
                className='rounded-md pl-8'
              />
            </div>
            <Input
              type='url'
              placeholder='Acquire link URL'
              value={deal.acquire_link}
              onChange={(e) => update(i, 'acquire_link', e.target.value)}
              className='rounded-md'
            />
          </div>
        </div>
      ))}
      <AddButton onClick={add}>Add Deal</AddButton>
    </div>
  )
}

// ─── Reservation Links Editor ─────────────────────────────────────────────────

function ReservationLinksEditor({
  links,
  onChange,
}: {
  links: ReservationLink[]
  onChange: (v: ReservationLink[]) => void
}) {
  const add = () =>
    links.length < 3 && onChange([...links, { platform: '', url: '' }])
  const update = (i: number, field: keyof ReservationLink, val: string) =>
    onChange(links.map((l, idx) => (idx === i ? { ...l, [field]: val } : l)))
  const remove = (i: number) => onChange(links.filter((_, idx) => idx !== i))
  return (
    <div className='space-y-3'>
      {links.map((link, i) => (
        <div key={i} className='space-y-3 rounded-md border bg-muted/30 p-4'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-muted-foreground'>
              Link #{i + 1}
            </span>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='h-7 w-7'
              onClick={() => remove(i)}
            >
              <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
            </Button>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <Input
              placeholder='Platform (e.g. Booking.com)'
              value={link.platform}
              onChange={(e) => update(i, 'platform', e.target.value)}
              className='rounded-md'
            />
            <Input
              type='url'
              placeholder='https://booking.com/…'
              value={link.url}
              onChange={(e) => update(i, 'url', e.target.value)}
              className='rounded-md'
            />
          </div>
        </div>
      ))}
      {links.length < 3 ? (
        <AddButton onClick={add}>Add Reservation Link</AddButton>
      ) : (
        <p className='text-center text-xs text-muted-foreground'>
          Maximum 3 reservation links reached
        </p>
      )}
    </div>
  )
}

// ─── Weekly Hours Editor ──────────────────────────────────────────────────────

function WeeklyHoursEditor({
  hours,
  onChange,
}: {
  hours: WeeklyHours
  onChange: (v: WeeklyHours) => void
}) {
  const toggleDay = (day: string) =>
    onChange({ ...hours, [day]: { ...hours[day], open: !hours[day].open } })
  const updateSlot = (
    day: string,
    si: number,
    field: keyof WeeklySlot,
    val: string
  ) => {
    const slots = hours[day].slots.map((s, i) =>
      i === si ? { ...s, [field]: val } : s
    )
    onChange({ ...hours, [day]: { ...hours[day], slots } })
  }
  const addSlot = (day: string) => {
    if (hours[day].slots.length >= 2) return
    onChange({
      ...hours,
      [day]: {
        ...hours[day],
        slots: [...hours[day].slots, { start: '', end: '' }],
      },
    })
  }
  const removeSlot = (day: string, si: number) => {
    const slots = hours[day].slots.filter((_, i) => i !== si)
    onChange({ ...hours, [day]: { ...hours[day], slots } })
  }
  return (
    <div className='space-y-2'>
      {DAYS.map((day) => (
        <div key={day} className='rounded-md border p-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Switch
                checked={hours[day].open}
                onCheckedChange={() => toggleDay(day)}
              />
              <span className='text-sm font-medium capitalize'>{day}</span>
            </div>
            <span
              className={cn(
                'text-xs',
                hours[day].open ? 'text-green-600' : 'text-muted-foreground'
              )}
            >
              {hours[day].open ? 'Open' : 'Closed'}
            </span>
          </div>
          {hours[day].open && (
            <div className='mt-3 space-y-2'>
              {hours[day].slots.map((slot, si) => (
                <div key={si} className='flex items-center gap-2'>
                  <Input
                    type='time'
                    value={slot.start}
                    onChange={(e) =>
                      updateSlot(day, si, 'start', e.target.value)
                    }
                    className='rounded-md'
                  />
                  <span className='text-xs text-muted-foreground'>–</span>
                  <Input
                    type='time'
                    value={slot.end}
                    onChange={(e) => updateSlot(day, si, 'end', e.target.value)}
                    className='rounded-md'
                  />
                  {hours[day].slots.length > 1 && (
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 shrink-0'
                      onClick={() => removeSlot(day, si)}
                    >
                      <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
                    </Button>
                  )}
                </div>
              ))}
              {hours[day].slots.length < 2 && (
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='h-7 text-xs text-amber-600'
                  onClick={() => addSlot(day)}
                >
                  <Plus className='mr-1 h-3 w-3' /> Add time slot
                </Button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Road Map Editor ──────────────────────────────────────────────────────────

function RoadMapEditor({
  roadMap,
  onChange,
}: {
  roadMap: RoadMapDay[]
  onChange: (v: RoadMapDay[]) => void
}) {
  const addDay = () =>
    onChange([...roadMap, { day: roadMap.length + 1, title: '', items: [] }])
  const updateDay = (
    i: number,
    field: keyof Omit<RoadMapDay, 'items'>,
    val: string
  ) =>
    onChange(roadMap.map((d, idx) => (idx === i ? { ...d, [field]: val } : d)))
  const removeDay = (i: number) =>
    onChange(
      roadMap
        .filter((_, idx) => idx !== i)
        .map((d, idx) => ({ ...d, day: idx + 1 }))
    )
  const addItem = (di: number) =>
    onChange(
      roadMap.map((d, i) =>
        i === di ? { ...d, items: [...d.items, { time: '', activity: '' }] } : d
      )
    )
  const updateItem = (
    di: number,
    ii: number,
    field: keyof RoadMapItem,
    val: string
  ) =>
    onChange(
      roadMap.map((d, i) =>
        i === di
          ? {
              ...d,
              items: d.items.map((item, j) =>
                j === ii ? { ...item, [field]: val } : item
              ),
            }
          : d
      )
    )
  const removeItem = (di: number, ii: number) =>
    onChange(
      roadMap.map((d, i) =>
        i === di ? { ...d, items: d.items.filter((_, j) => j !== ii) } : d
      )
    )
  return (
    <div className='space-y-3'>
      {roadMap.map((day, di) => (
        <div key={di} className='overflow-hidden rounded-md border'>
          <div className='flex items-center justify-between bg-gold/10 px-4 py-2.5'>
            <div className='flex items-center gap-3'>
              <span className='flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-b from-gold to-gold-light text-xs font-bold text-white'>
                {day.day}
              </span>
              <Input
                className='h-auto w-44 border-none bg-transparent p-0 text-sm font-medium shadow-none focus-visible:ring-0'
                placeholder={`Day ${day.day} title`}
                value={day.title}
                onChange={(e) => updateDay(di, 'title', e.target.value)}
              />
            </div>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='h-7 w-7'
              onClick={() => removeDay(di)}
            >
              <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
            </Button>
          </div>
          <div className='space-y-2 p-3'>
            {day.items.map((item, ii) => (
              <div key={ii} className='flex items-center gap-2'>
                <Input
                  placeholder='Time'
                  value={item.time}
                  onChange={(e) => updateItem(di, ii, 'time', e.target.value)}
                  className='w-28 shrink-0 rounded-md'
                />
                <Input
                  placeholder='Activity'
                  value={item.activity}
                  onChange={(e) =>
                    updateItem(di, ii, 'activity', e.target.value)
                  }
                  className='flex-1 rounded-md'
                />
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8 shrink-0'
                  onClick={() => removeItem(di, ii)}
                >
                  <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
                </Button>
              </div>
            ))}
            <Button
              type='button'
              variant='ghost'
              size='sm'
              className='h-7 text-xs text-gold'
              onClick={() => addItem(di)}
            >
              <Plus className='mr-1 h-3 w-3' /> Add activity
            </Button>
          </div>
        </div>
      ))}
      <AddButton onClick={addDay}>Add Day</AddButton>
    </div>
  )
}

// ─── Travel Tips Editor ───────────────────────────────────────────────────────

function TravelTipsEditor({
  tips,
  onChange,
}: {
  tips: TravelTip[]
  onChange: (v: TravelTip[]) => void
}) {
  const add = () => onChange([...tips, { title: '', subtitle: '' }])
  const update = (i: number, field: keyof TravelTip, val: string) =>
    onChange(tips.map((t, idx) => (idx === i ? { ...t, [field]: val } : t)))
  const remove = (i: number) => onChange(tips.filter((_, idx) => idx !== i))
  return (
    <div className='space-y-3'>
      {tips.map((tip, i) => (
        <div
          key={i}
          className='flex items-start gap-3 rounded-md border bg-muted/30 p-3'
        >
          <div className='flex flex-1 gap-2'>
            <Input
              placeholder='Tip title'
              value={tip.title}
              onChange={(e) => update(i, 'title', e.target.value)}
              className='rounded-md'
            />
            <Input
              placeholder='Details'
              value={tip.subtitle}
              onChange={(e) => update(i, 'subtitle', e.target.value)}
              className='rounded-md'
            />
          </div>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='mt-0.5 h-8 w-8 shrink-0'
            onClick={() => remove(i)}
          >
            <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
          </Button>
        </div>
      ))}
      <AddButton onClick={add}>Add Travel Tip</AddButton>
    </div>
  )
}

// ─── Menu Editor ─────────────────────────────────────────────────────────────

function MenuEditor({
  items,
  onChange,
}: {
  items: MenuItem[]
  onChange: (v: MenuItem[]) => void
}) {
  const add = () =>
    onChange([...items, { name: '', description: '', price: '' }])
  const update = (i: number, field: keyof MenuItem, val: string) =>
    onChange(
      items.map((item, idx) => (idx === i ? { ...item, [field]: val } : item))
    )
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i))
  return (
    <div className='space-y-3'>
      {items.map((item, i) => (
        <div key={i} className='space-y-3 rounded-md border bg-muted/30 p-4'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-muted-foreground'>
              Item #{i + 1}
            </span>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='h-7 w-7'
              onClick={() => remove(i)}
            >
              <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
            </Button>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <Input
              placeholder='Item name'
              value={item.name}
              onChange={(e) => update(i, 'name', e.target.value)}
              className='rounded-md'
            />
            <div className='relative'>
              <DollarSign className='absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground' />
              <Input
                type='number'
                min={0}
                placeholder='Price'
                value={item.price}
                onChange={(e) => update(i, 'price', e.target.value)}
                className='rounded-md pl-8'
              />
            </div>
          </div>
          <Textarea
            placeholder='Description'
            rows={2}
            value={item.description}
            onChange={(e) => update(i, 'description', e.target.value)}
            className='resize-none rounded-md'
          />
        </div>
      ))}
      <AddButton onClick={add}>Add Menu Item</AddButton>
    </div>
  )
}

// ─── Rich Text Editor ────────────────────────────────────────────────────────

// function RichTextEditor({
//   value,
//   onChange,
// }: {
//   value: string
//   onChange: (v: string) => void
// }) {
//   const editorRef = useRef<HTMLDivElement>(null)
//   const lastSynced = useRef('')

//   // Sync external value into DOM only when it changes from outside (e.g. load from DB)
//   useEffect(() => {
//     if (editorRef.current && value !== lastSynced.current) {
//       editorRef.current.innerHTML = value
//       lastSynced.current = value
//     }
//   }, [value])

//   const exec = (cmd: string, arg?: string) => {
//     document.execCommand(cmd, false, arg)
//     if (editorRef.current) {
//       const html = editorRef.current.innerHTML
//       lastSynced.current = html
//       onChange(html)
//     }
//     editorRef.current?.focus()
//   }

//   const ToolBtn = ({
//     cmd,
//     arg,
//     label,
//     title,
//   }: {
//     cmd: string
//     arg?: string
//     label: React.ReactNode
//     title: string
//   }) => (
//     <button
//       type='button'
//       title={title}
//       onMouseDown={(e) => {
//         e.preventDefault()
//         exec(cmd, arg)
//       }}
//       className='flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-sm text-muted-foreground hover:bg-muted hover:text-foreground'
//     >
//       {label}
//     </button>
//   )

//   return (
//     <div className='relative rounded-md border focus-within:ring-1 focus-within:ring-ring'>
//       <div className='flex flex-wrap items-center gap-0.5 border-b px-2 py-1.5'>
//         <ToolBtn cmd='bold' title='Bold' label={<strong>B</strong>} />
//         <ToolBtn cmd='italic' title='Italic' label={<em>I</em>} />
//         <ToolBtn
//           cmd='underline'
//           title='Underline'
//           label={<span className='underline'>U</span>}
//         />
//         <div className='mx-1 h-4 w-px bg-border' />
//         <ToolBtn cmd='insertUnorderedList' title='Bullet list' label='• list' />
//         <ToolBtn
//           cmd='insertOrderedList'
//           title='Numbered list'
//           label='1. list'
//         />
//         <div className='mx-1 h-4 w-px bg-border' />
//         <ToolBtn
//           cmd='formatBlock'
//           arg='h3'
//           title='Heading'
//           label={<span className='font-semibold'>H3</span>}
//         />
//         <ToolBtn cmd='formatBlock' arg='p' title='Normal text' label='¶' />
//         <div className='ml-auto'>
//           <ToolBtn cmd='removeFormat' title='Clear formatting' label='Clear' />
//         </div>
//       </div>
//       <div
//         ref={editorRef}
//         contentEditable
//         suppressContentEditableWarning
//         onInput={() => {
//           if (editorRef.current) {
//             const html = editorRef.current.innerHTML
//             lastSynced.current = html
//             onChange(html)
//           }
//         }}
//         className='prose prose-sm min-h-[180px] max-w-none cursor-text p-3 text-sm outline-none [&_h3]:mb-1 [&_h3]:text-base [&_h3]:font-semibold [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5'
//       />
//       {!value && (
//         <p className='pointer-events-none absolute top-12 left-3 text-sm text-muted-foreground/50'>
//           Write a detailed description…
//         </p>
//       )}
//     </div>
//   )
// }
function RichTextEditor({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none min-h-[180px] p-3 text-sm outline-none',
      },
    },
    onUpdate({ editor }: any) {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) return null

  const ToolBtn = ({
    onClick,
    label,
    title,
  }: {
    onClick: () => void
    label: React.ReactNode
    title: string
  }) => (
    <button
      type='button'
      title={title}
      onMouseDown={(e) => {
        e.preventDefault()
        onClick()
      }}
      className='flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-sm text-muted-foreground hover:bg-muted hover:text-foreground'
    >
      {label}
    </button>
  )

  const setLink = () => {
    const url = prompt('Enter URL')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className='rounded-md border focus-within:ring-1 focus-within:ring-ring'>
      <div className='flex flex-wrap items-center gap-0.5 border-b px-2 py-1.5'>
        <ToolBtn
          title='Bold'
          label={<strong>B</strong>}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />

        <ToolBtn
          title='Italic'
          label={<em>I</em>}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />

        <ToolBtn
          title='Underline'
          label={<span className='underline'>U</span>}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />

        <ToolBtn
          title='Strike'
          label={<span className='strike'>S</span>}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />

        <div className='mx-1 h-4 w-px bg-border' />

        {/* <ToolBtn
          title='Heading 1'
          label='H1'
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        />

        <ToolBtn
          title='Heading 2'
          label='H2'
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        />

        <ToolBtn
          title='Heading 3'
          label='H3'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        />

        <ToolBtn
          title='Paragraph'
          label='¶'
          onClick={() => editor.chain().focus().setParagraph().run()}
        />

        <div className='mx-1 h-4 w-px bg-border' />

        <ToolBtn
          title='Bullet List'
          label='• list'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />

        <ToolBtn
          title='Numbered List'
          label='1. list'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />

        <ToolBtn
          title='Blockquote'
          label='❝'
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        /> */}

        <ToolBtn
          title='Code Block'
          label='</>'
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        />

        {/* <div className='mx-1 h-4 w-px bg-border' />
        <ToolBtn
          title='Align Left'
          label='⬅'
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        />

        <ToolBtn
          title='Align Center'
          label='⬌'
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        />

        <ToolBtn
          title='Align Right'
          label='➡'
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        />

        <div className='mx-1 h-4 w-px bg-border' /> */}

        <ToolBtn
          title='Highlight'
          label='🖍'
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        />

        <ToolBtn title='Add Link' label='🔗' onClick={setLink} />

        <div className='ml-auto flex gap-1'>
          <ToolBtn
            title='Undo'
            label='↺'
            onClick={() => editor.chain().focus().undo().run()}
          />

          <ToolBtn
            title='Redo'
            label='↻'
            onClick={() => editor.chain().focus().redo().run()}
          />

          <div className='ml-auto'>
            <ToolBtn
              title='Clear formatting'
              label='Clear'
              onClick={() =>
                editor.chain().focus().clearNodes().unsetAllMarks().run()
              }
            />
          </div>
        </div>
      </div>
      <EditorContent editor={editor} />
      {/* <SimpleEditor /> */}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function ListingFormPage() {
  const router = useRouter()
  const { id } = useParams<{ id?: string }>()
  const isEdit = !!id

  const [form, setForm] = useState<ListingForm>(EMPTY_FORM)
  const [categories, setCategories] = useState<Category[]>([])
  const [subCategories, setSubCategories] = useState<SubCategory[]>([])
  const [attributesByType, setAttributesByType] =
    useState<AttrsByType>(EMPTY_ATTRS)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [currentUserRole, setCurrentUserRole] = useState<string>('client')

  const set = useCallback(
    <K extends keyof ListingForm>(field: K, value: ListingForm[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    },
    []
  )

  // ── Auth: get user ID and role ──
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      setCurrentUserId(user.id)
      supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          const role: string = data?.role ?? 'client'
          setCurrentUserRole(role)
          if (!isEdit && (role === 'owner' || role === 'admin')) {
            setForm((prev) => ({ ...prev, status: 'active' }))
          }
        })
    })
  }, [isEdit])

  // ── Category-derived flags ──
  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === form.category_id),
    [categories, form.category_id]
  )
  const selectedCategoryName = selectedCategory?.name?.toLowerCase() ?? ''
  const isActivities =
    selectedCategoryName.includes('activit') ||
    selectedCategoryName.includes('boating')
  const isBeach = selectedCategoryName.includes('beach')
  const isGastronomy = selectedCategoryName.includes('gastronom')
  const isRealEstate = selectedCategoryName.includes('real estate')
  const categorySlug =
    selectedCategory?.name
      ?.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '') ?? 'general'

  const googleMapsLink = useMemo(() => {
    if (!form.latitude || !form.longitude) return ''
    return `https://www.google.com/maps?q=${form.latitude},${form.longitude}`
  }, [form.latitude, form.longitude])

  const mapSrc = useMemo(() => {
    const lat = parseFloat(form.latitude)
    const lng = parseFloat(form.longitude)
    if (isNaN(lat) || isNaN(lng)) return null
    const d = 0.006
    return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d},${lat - d},${lng + d},${lat + d}&layer=mapnik&marker=${lat},${lng}`
  }, [form.latitude, form.longitude])

  // ── Fetch categories ──
  useEffect(() => {
    supabase
      .from('categories')
      .select('id, name')
      .order('name')
      .then(({ data }) => setCategories(data ?? []))
  }, [])

  // ── Fetch sub-categories when category changes ──
  useEffect(() => {
    if (!form.category_id) {
      setSubCategories([])
      return
    }
    supabase
      .from('sub-categories')
      .select('id, name')
      .eq('category', form.category_id)
      .order('name')
      .then(({ data }) => setSubCategories(data ?? []))
  }, [form.category_id])

  // ── Fetch category attributes when category changes ──
  useEffect(() => {
    if (!form.category_id) {
      setAttributesByType(EMPTY_ATTRS)
      return
    }
    supabase
      .from('category_attribute_assignments')
      .select('attribute_id, category_attributes(id, name, type, status)')
      .eq('category_id', form.category_id)
      .then(({ data }) => {
        const byType: AttrsByType = {
          neighborhood: [],
          key_feature: [],
          service: [],
          amenity: [],
          atmosphere: [],
          menu: [],
        }
        ;(data ?? []).forEach((row: any) => {
          const attr = row.category_attributes
          if (attr && attr.status === 'active' && attr.type in byType) {
            ;(byType as any)[attr.type].push({ id: attr.id, name: attr.name })
          }
        })
        setAttributesByType(byType)
      })
  }, [form.category_id])

  // ── Load existing listing ──
  useEffect(() => {
    if (!isEdit || !id) return
    setLoading(true)
    supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) {
          setForm({
            ...EMPTY_FORM,
            title: data.title ?? '',
            subtitle: data.subtitle ?? '',
            description: data.description ?? '',
            category_id: data.category_id ?? '',
            sub_category_id: data.sub_category_id ?? '',
            status: (data.status as ListingStatus) ?? 'pending',
            price_from: data.price_from ?? '',
            price_to: data.price_to ?? '',
            price_unit: data.price_unit ?? 'night',
            cover_image: data.cover_image ?? '',
            category_tags: data.category_tags ?? [],
            seo_slug: data.seo_slug ?? '',
            images: data.images ?? [],
            address: data.address ?? '',
            latitude: data.latitude ?? '',
            longitude: data.longitude ?? '',
            google_maps_link: data.google_maps_link ?? '',
            email: data.email ?? '',
            phone: data.phone ?? '',
            website: data.website ?? '',
            whatsapp: data.whatsapp ?? '',
            facebook: data.facebook ?? '',
            instagram: data.instagram ?? '',
            extra_social_links: data.extra_social_links ?? [],
            reservation_links: data.reservation_links ?? [],
            start_time: data.start_time ?? '',
            end_time: data.end_time ?? '',
            pickup_time: data.pickup_time ?? '',
            travel_duration: data.travel_duration ?? '',
            beach_start: data.beach_start ?? '',
            beach_end: data.beach_end ?? '',
            weekly_hours: data.weekly_hours ?? EMPTY_WEEKLY_HOURS,
            faqs: data.faqs ?? [],
            deals: data.deals ?? [],
            road_map: data.road_map ?? [],
            travel_tips: data.travel_tips ?? [],
            key_features: data.key_features ?? [],
            services: data.services ?? [],
            amenities: data.amenities ?? [],
            neighborhoods: data.neighborhoods[0] ?? '',
            atmosphere: data.atmosphere ?? [],
            menu_items: data.menu_items ?? [],
          })
        }
        setLoading(false)
      })
  }, [isEdit, id])

  // ── Validation ──
  function validate(): boolean {
    const errs: ValidationErrors = {}
    if (!currentUserId)
      errs.user_id = 'You must be logged in to create a listing'
    if (!form.title.trim()) errs.title = 'Title is required'
    if (!form.subtitle.trim()) errs.subtitle = 'Subtitle is required'
    if (!form.cover_image)
      errs.cover_image = 'Featured image is required — please upload a photo'
    if (!form.price_from || Number(form.price_from) < 0)
      errs.price_from = 'Start price is required'
    const hasSocial =
      !!form.facebook.trim() ||
      !!form.instagram.trim() ||
      form.extra_social_links.some((l) => !!l.url.trim())
    if (!hasSocial)
      errs.social =
        'At least one social link is required (Facebook, Instagram, or other)'
    if (!form.category_tags.length)
      errs.category_tags = 'Select at least one category tag'
    if (!form.seo_slug.trim()) errs.seo_slug = 'SEO slug is required'
    if (!form.category_id) errs.category_id = 'Category is required'
    if (!form.sub_category_id) errs.sub_category_id = 'Sub-category is required'
    if (!form.neighborhoods.length)
      errs.neighborhoods = 'Select one neighborhood'
    if (form.neighborhoods.length > 1)
      errs.neighborhoods = 'Select only one neighborhood'
    if (form.website && !isValidUrl(form.website))
      errs.website = 'Must be a valid URL (https://…)'
    if (form.facebook && !isValidUrl(form.facebook))
      errs.facebook = 'Must be a valid URL (https://…)'
    if (form.instagram && !isValidUrl(form.instagram))
      errs.instagram = 'Must be a valid URL (https://…)'
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      toast.error('Please fix the highlighted fields', {
        description: Object.values(errs)[0],
      })
    }
    return Object.keys(errs).length === 0
  }

  // ── Save ──
  async function handleSave() {
    if (!validate()) return
    setSaving(true)

    // Check SEO slug uniqueness
    if (form.seo_slug.trim()) {
      const slugQuery = supabase
        .from('listings')
        .select('id')
        .eq('seo_slug', form.seo_slug.trim())
        .limit(1)
      if (isEdit) slugQuery.neq('id', id!)
      const { data: slugExists } = await slugQuery
      if (slugExists && slugExists.length > 0) {
        setErrors((prev) => ({
          ...prev,
          seo_slug: 'This SEO slug is already taken — choose a unique one',
        }))
        toast.error('SEO slug already in use', {
          description: 'Choose a different unique URL slug',
        })
        setSaving(false)
        return
      }
    }

    const payload: Record<string, unknown> = {
      title: form.title.trim(),
      subtitle: form.subtitle.trim() || null,
      description: form.description.trim() || null,
      category_id: form.category_id || null,
      sub_category_id: form.sub_category_id || null,
      status: form.status,
      price_from: form.price_from !== '' ? Number(form.price_from) : 0,
      price_to: form.price_to !== '' ? Number(form.price_to) : 0,
      price_unit: form.price_unit,
      cover_image: form.cover_image || null,
      category_tags: form.category_tags,
      seo_slug: form.seo_slug.trim() || null,
      images: form.images.filter(Boolean),
      address: form.address.trim() || null,
      latitude: form.latitude ? Number(form.latitude) : null,
      longitude: form.longitude ? Number(form.longitude) : null,
      google_maps_link: googleMapsLink || null,
      email: form.email.trim() || null,
      phone: form.phone.trim() || null,
      website: form.website.trim() || null,
      whatsapp: form.whatsapp.trim() || null,
      facebook: form.facebook.trim() || null,
      instagram: form.instagram.trim() || null,
      extra_social_links: form.extra_social_links,
      reservation_links: form.reservation_links,
      start_time: form.start_time || null,
      end_time: form.end_time || null,
      pickup_time: form.pickup_time || null,
      travel_duration: form.travel_duration || null,
      beach_start: form.beach_start || null,
      beach_end: form.beach_end || null,
      weekly_hours: isGastronomy ? form.weekly_hours : null,
      faqs: form.faqs,
      deals: form.deals,
      road_map: form.road_map,
      travel_tips: form.travel_tips,
      key_features: form.key_features,
      services: form.services,
      amenities: form.amenities,
      neighborhoods: form.neighborhoods,
      atmosphere: form.atmosphere,
      menu_items: isGastronomy ? form.menu_items : [],
    }
    if (!isEdit && currentUserId) payload.client_id = currentUserId

    let error: { message: string } | null = null
    if (isEdit) {
      ;({ error } = await supabase
        .from('listings')
        .update(payload)
        .eq('id', id!))
    } else {
      ;({ error } = await supabase.from('listings').insert(payload))
    }
    setSaving(false)
    if (!error) {
      toast.success(isEdit ? 'Listing updated' : 'Listing created')
      router.push('/listings')
    } else {
      toast.error('Failed to save listing', { description: error.message })
    }
  }

  // ── Loading ──
  if (loading) {
    return (
      <>
        <Header />
        <Main>
          <div className='flex h-96 items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin text-amber-500' />
          </div>
        </Main>
      </>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <Header />
      <Main>
        {/* ── Sticky action bar ── */}
        <div className='sticky top-0 z-10 -mx-2 -mt-6 mb-6 bg-background/95 px-2 py-3 backdrop-blur supports-backdrop-filter:bg-background/60 sm:px-2'>
          <div className='flex flex-col items-center justify-between gap-2 sm:flex-row'>
            <div className='flex min-w-0 items-center gap-2 self-start'>
              <Button
                variant='ghost'
                size='icon'
                className='shrink-0 rounded-md'
                onClick={() => router.push('/listings')}
              >
                <ArrowLeft className='h-4 w-4' />
              </Button>
              <div className='min-w-0'>
                <h1 className='font-antigua truncate text-base font-bold sm:text-xl'>
                  {isEdit ? 'Edit Listing' : 'Create Listing'}
                </h1>
                <p className='hidden text-xs text-muted-foreground sm:block'>
                  {isEdit
                    ? 'Update listing details'
                    : 'Fill in all required fields (*)'}
                </p>
              </div>
            </div>
            <div className='flex shrink-0 items-center gap-2 self-end'>
              {/* <Select
                value={form.status}
                onValueChange={(v) => set('status', v as ListingStatus)}
              >
                <SelectTrigger className='h-8 w-28 rounded-md text-xs capitalize'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem
                      key={s}
                      value={s}
                      className='text-xs capitalize'
                    >
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
              <Button
                variant='outline'
                size='sm'
                className='rounded-md'
                onClick={() => router.push('/listings')}
              >
                Cancel
              </Button>
              <Button
                size='sm'
                onClick={handleSave}
                disabled={saving}
                className='rounded-md bg-linear-to-r from-[#C9A84C] to-[#E8C96A] text-white hover:opacity-90'
              >
                {saving ? (
                  <Loader2 className='mr-1.5 h-3.5 w-3.5 animate-spin' />
                ) : (
                  <Save className='mr-1.5 h-3.5 w-3.5' />
                )}
                {saving
                  ? 'Saving...'
                  : isEdit
                    ? 'Save Changes'
                    : 'Create Listing'}
              </Button>
            </div>
          </div>
        </div>

        {/* ── Single-column form ── */}
        <div className='mx-auto space-y-6'>
          {/* Auth error banner */}
          {errors.user_id && (
            <div className='rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive'>
              {errors.user_id}
            </div>
          )}

          {/* S1 — Basic Info */}
          <SectionCard
            icon={<Tag className='h-5 w-5' />}
            title='Basic Information'
            description='Core listing details — required fields are marked *'
          >
            <FormField label='Title' required error={errors.title}>
              <Input
                placeholder='e.g. Eco Aventura Snorkeling'
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                className={cn(
                  'rounded-md',
                  errors.title && 'border-destructive'
                )}
              />
            </FormField>
            <FormField label='Subtitle' required error={errors.subtitle}>
              <Input
                placeholder='Short catchy tagline'
                value={form.subtitle}
                onChange={(e) => set('subtitle', e.target.value)}
                className={cn(
                  'rounded-md',
                  errors.subtitle && 'border-destructive'
                )}
              />
            </FormField>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <FormField label='Category' required error={errors.category_id}>
                <Select
                  value={form.category_id}
                  onValueChange={(v) => {
                    set('category_id', v)
                    set('sub_category_id', '')
                    set('category_tags', [])
                    set('key_features', [])
                    set('services', [])
                    set('amenities', [])
                    set('neighborhoods', [])
                    set('atmosphere', [])
                  }}
                >
                  <SelectTrigger
                    className={cn(
                      'rounded-md w-full',
                      errors.category_id && 'border-destructive'
                    )}
                  >
                    <SelectValue placeholder='Select category…' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
              <FormField
                label='Sub-Category'
                required
                error={errors.sub_category_id}
              >
                <Select
                  value={form.sub_category_id || ''}
                  
                  onValueChange={(v) => set('sub_category_id', v)}
                  disabled={!form.category_id || subCategories.length === 0}
                >
                  <SelectTrigger
                    className={cn(
                      'rounded-md w-full',
                      errors.sub_category_id && 'border-destructive'
                    )}
                  >
                    <SelectValue
                      placeholder={
                        !form.category_id
                          ? 'Select category first'
                          : subCategories.length === 0
                            ? 'No sub-categories'
                            : 'Select sub-category…'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {subCategories.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            </div>
            <FormField
              label='SEO Slug'
              required
              error={errors.seo_slug}
              hint='Appears in the listing URL — lowercase, hyphens only'
            >
              <div
                className={cn(
                  'flex items-center gap-2 rounded-md border bg-background px-3 focus-within:ring-2 focus-within:ring-ring',
                  errors.seo_slug && 'border-destructive'
                )}
              >
                <Hash className='h-4 w-4 shrink-0 text-muted-foreground' />
                <input
                  placeholder='my-listing-name'
                  value={form.seo_slug}
                  onChange={(e) =>
                    set(
                      'seo_slug',
                      e.target.value
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^a-z0-9-]/g, '')
                    )
                  }
                  className='flex h-9 w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground'
                />
              </div>
            </FormField>
            <FormField
              label='Neighborhood'
              required
              error={errors.neighborhoods}
              hint='Select the primary neighborhood in Cartagena'
            >
              <SingleSelectAttr
                options={attributesByType.neighborhood}
                value={form.neighborhoods[0]}
                onChange={(v) => set('neighborhoods', [v])}
                emptyMsg='No neighborhoods found — select a category first'
              />
            </FormField>
          </SectionCard>

          {/* S2 — Description & Story */}
          <SectionCard
            icon={<FileText className='h-5 w-5' />}
            title='Description & Story'
            description='Rich description — use the toolbar for bold, italic, lists and headings'
          >
            <RichTextEditor
              value={form.description}
              onChange={(v) => set('description', v)}
            />
          </SectionCard>

          {/* S3 — Image Gallery */}
          <SectionCard
            icon={<ImageIcon className='h-5 w-5' />}
            title='Image Gallery'
            description='Featured cover photo and additional gallery images'
          >
            <FormField
              label='Featured Image'
              required
              error={errors.cover_image}
              hint={
                !form.category_id
                  ? 'Select a category first to enable upload'
                  : 'Drag & drop or click — recommended 1200×800px'
              }
            >
              <PhotoUploader
                currentUrl={form.cover_image}
                onUploaded={(url) => set('cover_image', url)}
                categorySlug={categorySlug}
                disabled={!form.category_id}
                error={errors.cover_image}
              />
            </FormField>
            <Separator />
            <FormField
              label='Photo Gallery'
              hint='Add more photos — drag & drop or click, multiple files supported'
            >
              <GalleryUploader
                images={form.images}
                onChange={(v) => set('images', v)}
                categorySlug={categorySlug}
                disabled={!form.category_id}
              />
            </FormField>
          </SectionCard>

          {/* S4 — Categorization */}
          <SectionCard
            icon={<Sparkles className='h-5 w-5' />}
            title='Ammenities & Features'
            description='Tags and attributes loaded from the selected category'
          >
            <FormField
              label='Category Tags'
              required
              error={errors.category_tags}
              hint='Select the sub-category tags that apply to this listing'
            >
              <SubCategoryTagSelect
                subCategories={subCategories}
                values={form.category_tags}
                onChange={(v) => set('category_tags', v)}
              />
            </FormField>
            {attributesByType.key_feature.length > 0 && (
              <>
                <Separator />
                <FormField label='Key Features'>
                  <MultiSelectAttr
                    options={attributesByType.key_feature}
                    values={form.key_features}
                    onChange={(v) => set('key_features', v)}
                  />
                </FormField>
              </>
            )}
            {attributesByType.service.length > 0 && (
              <>
                <Separator />
                <FormField label='Services'>
                  <MultiSelectAttr
                    options={attributesByType.service}
                    values={form.services}
                    onChange={(v) => set('services', v)}
                  />
                </FormField>
              </>
            )}
            {attributesByType.amenity.length > 0 && (
              <>
                <Separator />
                <FormField label='Amenities'>
                  <MultiSelectAttr
                    options={attributesByType.amenity}
                    values={form.amenities}
                    onChange={(v) => set('amenities', v)}
                  />
                </FormField>
              </>
            )}
            {attributesByType.atmosphere.length > 0 && (
              <>
                <Separator />
                <FormField label='Atmosphere'>
                  <MultiSelectAttr
                    options={attributesByType.atmosphere}
                    values={form.atmosphere}
                    onChange={(v) => set('atmosphere', v)}
                  />
                </FormField>
              </>
            )}
          </SectionCard>

          {/* S5 — Social Sharing (required) */}
          <SectionCard
            icon={<Share2 className='h-5 w-5' />}
            title='Social Sharing'
            description='At least one social link is required (Facebook, Instagram, or other)'
          >
            {errors.social && (
              <div className='rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive'>
                {errors.social}
              </div>
            )}
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <FormField label='Facebook' required error={errors.facebook}>
                <IconInput
                  icon={Globe}
                  type='url'
                  placeholder='https://facebook.com/…'
                  value={form.facebook}
                  onChange={(e) => set('facebook', e.target.value)}
                  className={errors.facebook ? 'border-destructive' : ''}
                />
              </FormField>
              <FormField label='Instagram' required error={errors.instagram}>
                <IconInput
                  icon={Globe}
                  type='url'
                  placeholder='https://instagram.com/…'
                  value={form.instagram}
                  onChange={(e) => set('instagram', e.target.value)}
                  className={errors.instagram ? 'border-destructive' : ''}
                />
              </FormField>
            </div>
            <div className='space-y-2'>
              <Label className='text-sm font-medium'>
                Additional Social Links
              </Label>
              {form.extra_social_links.map((link, i) => (
                <div key={i} className='flex gap-2'>
                  <Input
                    placeholder='Platform'
                    value={link.platform}
                    onChange={(e) => {
                      const updated = form.extra_social_links.map((l, idx) =>
                        idx === i ? { ...l, platform: e.target.value } : l
                      )
                      set('extra_social_links', updated)
                    }}
                    className='w-32 shrink-0 rounded-md'
                  />
                  <Input
                    type='url'
                    placeholder='https://…'
                    value={link.url}
                    onChange={(e) => {
                      const updated = form.extra_social_links.map((l, idx) =>
                        idx === i ? { ...l, url: e.target.value } : l
                      )
                      set('extra_social_links', updated)
                    }}
                    className='flex-1 rounded-md'
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='h-9 w-9 shrink-0'
                    onClick={() =>
                      set(
                        'extra_social_links',
                        form.extra_social_links.filter((_, idx) => idx !== i)
                      )
                    }
                  >
                    <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
                  </Button>
                </div>
              ))}
              <AddButton
                onClick={() =>
                  set('extra_social_links', [
                    ...form.extra_social_links,
                    { platform: '', url: '' },
                  ])
                }
              >
                Add Social Link
              </AddButton>
            </div>
          </SectionCard>

          {/* S6 — Reservation Links */}
          <SectionCard
            icon={<LinkIcon className='h-5 w-5' />}
            title='Third-Party Reservation Links'
            description='Up to 3 external booking platform links'
          >
            <ReservationLinksEditor
              links={form.reservation_links}
              onChange={(v) => set('reservation_links', v)}
            />
          </SectionCard>

          {/* S7 — Contact */}
          <SectionCard
            icon={<Phone className='h-5 w-5' />}
            title='Contact Information'
            description='How visitors can reach this listing'
          >
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <FormField label='Email' error={errors.email}>
                <IconInput
                  icon={Mail}
                  type='email'
                  placeholder='info@example.com'
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                />
              </FormField>
              <FormField label='Phone'>
                <IconInput
                  icon={Phone}
                  type='tel'
                  placeholder='+57 300 000 0000'
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                />
              </FormField>
              <FormField label='Website' error={errors.website}>
                <IconInput
                  icon={Globe}
                  type='url'
                  placeholder='https://example.com'
                  value={form.website}
                  onChange={(e) => set('website', e.target.value)}
                  className={errors.website ? 'border-destructive' : ''}
                />
              </FormField>
              <FormField label='WhatsApp'>
                <IconInput
                  icon={Phone}
                  type='tel'
                  placeholder='+57 300 000 0000'
                  value={form.whatsapp}
                  onChange={(e) => set('whatsapp', e.target.value)}
                />
              </FormField>
            </div>
          </SectionCard>

          {/* S8 — Location */}
          <SectionCard
            icon={<MapPin className='h-5 w-5' />}
            title='Location Details'
            description='Street address and GPS coordinates — map updates live as you type'
          >
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              <div className='space-y-4'>
                <FormField label='Address'>
                  <Input
                    placeholder='e.g. Calle del Cuartel #36-60, Getsemaní'
                    value={form.address}
                    onChange={(e) => set('address', e.target.value)}
                    className='rounded-md'
                  />
                </FormField>
                <div className='grid grid-cols-2 gap-3'>
                  <FormField label='Latitude'>
                    <Input
                      type='number'
                      step='any'
                      placeholder='10.391049'
                      value={form.latitude}
                      onChange={(e) => set('latitude', e.target.value)}
                      className='rounded-md'
                    />
                  </FormField>
                  <FormField label='Longitude'>
                    <Input
                      type='number'
                      step='any'
                      placeholder='-75.479426'
                      value={form.longitude}
                      onChange={(e) => set('longitude', e.target.value)}
                      className='rounded-md'
                    />
                  </FormField>
                </div>
                {googleMapsLink && (
                  <a
                    href={googleMapsLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-700'
                  >
                    <ExternalLink className='h-3.5 w-3.5' /> Open in Google Maps
                  </a>
                )}
              </div>
              <div className='flex flex-col gap-1.5'>
                <p className='text-sm font-medium'>Map Preview</p>
                <div
                  className='flex-1 overflow-hidden rounded-md border'
                  style={{ minHeight: 200 }}
                >
                  {mapSrc ? (
                    <iframe
                      src={mapSrc}
                      title='Location map preview'
                      className='h-full w-full'
                      style={{ minHeight: 200, border: 0 }}
                    />
                  ) : (
                    <div className='flex h-full min-h-[200px] items-center justify-center text-xs text-muted-foreground'>
                      Enter latitude & longitude to preview
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SectionCard>

          {/* S9 — Pricing & Availability */}
          {!isRealEstate && (
            <SectionCard
              icon={<DollarSign className='h-5 w-5' />}
              title='Pricing & Availability'
              description='Pricing, schedule and itinerary details'
            >
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                <FormField
                  label='Start Price ($)'
                  required
                  error={errors.price_from}
                >
                  <div className='relative'>
                    <DollarSign className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                    <Input
                      type='number'
                      placeholder='0'
                      min={0}
                      step={0.01}
                      value={form.price_from}
                      onChange={(e) => set('price_from', e.target.value)}
                      className={cn(
                        'rounded-md pl-9',
                        errors.price_from && 'border-destructive'
                      )}
                    />
                  </div>
                </FormField>
                <FormField label='End Price ($)'>
                  <div className='relative'>
                    <DollarSign className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                    <Input
                      type='number'
                      placeholder='0'
                      min={0}
                      step={0.01}
                      value={form.price_to}
                      onChange={(e) => set('price_to', e.target.value)}
                      className='rounded-md pl-9'
                    />
                  </div>
                </FormField>
                <FormField label='Price Unit'>
                  <Select
                    value={form.price_unit}
                    onValueChange={(v) => set('price_unit', v)}
                  >
                    <SelectTrigger className='rounded-md'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRICE_UNITS.map((u) => (
                        <SelectItem key={u} value={u} className='capitalize'>
                          {u}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
              </div>
              {isActivities && (
                <>
                  <Separator />
                  <p className='text-xs font-semibold tracking-wide text-muted-foreground uppercase'>
                    Activity Schedule
                  </p>
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField label='Start Time'>
                      <Input
                        type='time'
                        value={form.start_time}
                        onChange={(e) => set('start_time', e.target.value)}
                        className='rounded-md'
                      />
                    </FormField>
                    <FormField label='End Time'>
                      <Input
                        type='time'
                        value={form.end_time}
                        onChange={(e) => set('end_time', e.target.value)}
                        className='rounded-md'
                      />
                    </FormField>
                  </div>
                </>
              )}
              {isBeach && (
                <>
                  <Separator />
                  <p className='text-xs font-semibold tracking-wide text-muted-foreground uppercase'>
                    Beach Schedule
                  </p>
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField label='Pickup Time'>
                      <Input
                        type='time'
                        value={form.pickup_time}
                        onChange={(e) => set('pickup_time', e.target.value)}
                        className='rounded-md'
                      />
                    </FormField>
                    <FormField label='Travel Duration'>
                      <Input
                        placeholder='e.g. 45 minutes'
                        value={form.travel_duration}
                        onChange={(e) => set('travel_duration', e.target.value)}
                        className='rounded-md'
                      />
                    </FormField>
                    <FormField label='Beach Start'>
                      <Input
                        type='time'
                        value={form.beach_start}
                        onChange={(e) => set('beach_start', e.target.value)}
                        className='rounded-md'
                      />
                    </FormField>
                    <FormField label='Beach End'>
                      <Input
                        type='time'
                        value={form.beach_end}
                        onChange={(e) => set('beach_end', e.target.value)}
                        className='rounded-md'
                      />
                    </FormField>
                  </div>
                </>
              )}
              {isGastronomy && (
                <>
                  <Separator />
                  <p className='text-xs font-semibold tracking-wide text-muted-foreground uppercase'>
                    Opening Hours
                  </p>
                  <WeeklyHoursEditor
                    hours={form.weekly_hours}
                    onChange={(v) => set('weekly_hours', v)}
                  />
                </>
              )}
              <Separator />
              <p className='text-xs font-semibold tracking-wide text-muted-foreground uppercase'>
                Road Map / Itinerary
              </p>
              <RoadMapEditor
                roadMap={form.road_map}
                onChange={(v) => set('road_map', v)}
              />
            </SectionCard>
          )}

          {/* S10 — Travel Tips */}
          <SectionCard
            icon={<Lightbulb className='h-5 w-5' />}
            title='Travel Tips & Booking Info'
            description='Helpful tips and information for visitors'
          >
            <TravelTipsEditor
              tips={form.travel_tips}
              onChange={(v) => set('travel_tips', v)}
            />
          </SectionCard>

          {/* S11 — FAQs */}
          <SectionCard
            icon={<HelpCircle className='h-5 w-5' />}
            title='FAQs'
            description='Frequently asked questions about this listing'
          >
            <FAQsEditor faqs={form.faqs} onChange={(v) => set('faqs', v)} />
          </SectionCard>

          {/* S12 — Deals */}
          <SectionCard
            icon={<Percent className='h-5 w-5' />}
            title='Deals & Promotions'
            description='Special offers and discount deals'
          >
            <DealsEditor deals={form.deals} onChange={(v) => set('deals', v)} />
          </SectionCard>

          {/* S13 — Menu (Gastronomy only) */}
          {isGastronomy && (
            <SectionCard
              icon={<UtensilsCrossed className='h-5 w-5' />}
              title='Menu'
              description='Menu items for this gastronomy listing'
            >
              <MenuEditor
                items={form.menu_items}
                onChange={(v) => set('menu_items', v)}
              />
            </SectionCard>
          )}
        </div>
      </Main>
    </>
  )
}

export default ListingFormPage
