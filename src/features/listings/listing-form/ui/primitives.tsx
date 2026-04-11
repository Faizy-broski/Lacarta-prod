'use client'
import React from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

// ─── SectionCard ──────────────────────────────────────────────────────────────

export function SectionCard({
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
      <CardHeader>
        <div className='flex items-center gap-2.5'>
          <span className='text-gold p-2 rounded-md bg-gold/10'>{icon}</span>
          <div>
            <CardTitle className='text-base font-bold'>{title}</CardTitle>
            {description && (
              <p className='mt-0.5 text-xs text-muted-foreground'>{description}</p>
            )}
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className='space-y-4 pt-4'>{children}</CardContent>
    </Card>
  )
}

// ─── FormField ────────────────────────────────────────────────────────────────

export function FormField({
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

// ─── AddButton ────────────────────────────────────────────────────────────────

export function AddButton({
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

// ─── IconInput ────────────────────────────────────────────────────────────────

export function IconInput({
  icon: Icon,
  className,
  ...props
}: React.ComponentProps<'input'> & { icon: React.ElementType }) {
  return (
    <div className='relative'>
      <Icon className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
      <Input {...props} className={cn('rounded-md pl-9', className)} />
    </div>
  )
}
