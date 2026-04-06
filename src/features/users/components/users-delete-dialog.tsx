'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type User } from '../data/schema'

type UserDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
  onSuccess?: () => void
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow, onSuccess }: UserDeleteDialogProps) {
  const [value, setValue] = useState('')
  const [deleting, setDeleting] = useState(false)

  const displayName = currentRow.full_name ?? currentRow.email ?? 'this user'

  const handleDelete = async () => {
    if (value.trim() !== (currentRow.full_name ?? '')) return
    setDeleting(true)
    const res = await fetch(`/api/admin/users?id=${currentRow.id}`, { method: 'DELETE' })
    const json = await res.json()
    setDeleting(false)
    if (!res.ok) {
      toast.error(json.error ?? 'Failed to delete user.')
    } else {
      toast.success('User deleted.')
      setValue('')
      onOpenChange(false)
      onSuccess?.()
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={(state) => {
        setValue('')
        onOpenChange(state)
      }}
      handleConfirm={handleDelete}
      disabled={value.trim() !== (currentRow.full_name ?? '') || deleting}
      title={
        <span className='text-destructive'>
          <AlertTriangle className='me-1 inline-block stroke-destructive' size={18} />{' '}
          Delete User
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{displayName}</span>?
            <br />
            This action will permanently remove the user with the role of{' '}
            <span className='font-bold'>{currentRow.role.toUpperCase()}</span> from the system.
            This cannot be undone.
          </p>
          <Label className='my-2'>
            Type the user&apos;s full name to confirm:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={currentRow.full_name ?? 'Full name'}
            />
          </Label>
          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  )
}
