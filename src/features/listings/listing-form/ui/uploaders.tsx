'use client'
import { useRef, useState } from 'react'
import { Upload, Loader2, X } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

// ─── PhotoUploader (single, drag & drop) ─────────────────────────────────────

export function PhotoUploader({
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
      const { data: { publicUrl } } = supabase.storage.from('listing_photos').getPublicUrl(path)
      onUploaded(publicUrl)
      toast.success('Photo uploaded')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className='space-y-2'>
      <div
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          if (!disabled) { const file = e.dataTransfer.files[0]; if (file) handleFile(file) }
        }}
        onClick={() => !disabled && !uploading && inputRef.current?.click()}
        className={cn(
          'relative flex h-64 w-full cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-md border-2 border-dashed transition-colors',
          isDragging ? 'border-gold bg-gold/10' : 'border-border hover:border-gold hover:bg-muted/30',
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
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
            <div className='absolute inset-0 flex items-center justify-center bg-black/0 transition-colors hover:bg-black/20'>
              <div className='rounded-md bg-black/60 px-3 py-1.5 text-xs text-white opacity-0 transition-opacity hover:opacity-100'>
                Click to replace
              </div>
            </div>
            <button
              type='button'
              aria-label='Remove photo'
              onClick={(e) => { e.stopPropagation(); onUploaded('') }}
              className='absolute top-2 right-2 rounded-md bg-black/50 p-1.5 text-white hover:bg-black/70'
            >
              <X className='h-3.5 w-3.5' />
            </button>
          </>
        ) : (
          <div className='flex flex-col items-center gap-2 text-center'>
            {uploading
              ? <Loader2 className='h-10 w-10 animate-spin text-gold' />
              : <Upload className='h-10 w-10 text-muted-foreground' />
            }
            <div>
              <p className='text-sm font-medium text-muted-foreground'>
                {uploading ? 'Uploading…' : disabled ? 'Select a category first' : 'Drag & drop or click to upload'}
              </p>
              {!disabled && !uploading && (
                <p className='text-xs text-muted-foreground'>PNG, JPG, WEBP — recommended 1200×800px</p>
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

// ─── GalleryUploader (multi, drag & drop) ────────────────────────────────────

export function GalleryUploader({
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
        if (error) { toast.error(`Failed: ${file.name}`, { description: error.message }); continue }
        const { data: { publicUrl } } = supabase.storage.from('listing_photos').getPublicUrl(path)
        uploaded.push(publicUrl)
      }
      if (uploaded.length) {
        onChange([...images, ...uploaded])
        toast.success(`${uploaded.length} photo${uploaded.length > 1 ? 's' : ''} uploaded`)
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className='space-y-3'>
      {images.length > 0 && (
        <div className='grid grid-cols-3 gap-2 sm:grid-cols-4'>
          {images.map((url, idx) => (
            <div key={idx} className='group relative aspect-square overflow-hidden rounded-md border'>
              <img src={url} alt={`Photo ${idx + 1}`} className='h-full w-full object-cover' />
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
      <div
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          if (!disabled && e.dataTransfer.files.length) handleFiles(e.dataTransfer.files)
        }}
        onClick={() => !disabled && !uploading && inputRef.current?.click()}
        className={cn(
          'flex h-24 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-md border-2 border-dashed transition-colors',
          isDragging ? 'border-gold bg-gold/10' : 'border-border hover:border-gold hover:bg-muted/30',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        {uploading
          ? <Loader2 className='h-5 w-5 animate-spin text-amber-500' />
          : <Upload className='h-5 w-5 text-muted-foreground' />
        }
        <p className='text-xs text-muted-foreground'>
          {disabled ? 'Select a category first' : uploading ? 'Uploading…' : 'Drag & drop or click — multiple files supported'}
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
