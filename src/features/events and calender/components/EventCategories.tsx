'use client'

import { useEffect, useState } from 'react'
import { Music, Palette, UtensilsCrossed, Church, PartyPopper, Dumbbell, Tag, Settings, Loader2, Plus, Trash2, X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  fetchEventCategoryCounts,
  fetchEventCategories,
  createEventCategory,
  deleteEventCategory,
  type EventCategoryCount,
  type EventCategory,
} from '@/lib/services/events.service'
import { useAuthStore } from '@/lib/auth/auth.store'

const CATEGORY_STYLES: Record<string, { border: string; bg: string; text: string; icon: React.ElementType }> = {
  Music:     { border: 'border-purple-500', bg: 'bg-purple-100', text: 'text-purple-600', icon: Music },
  Art:       { border: 'border-blue-500',   bg: 'bg-blue-100',   text: 'text-blue-600',   icon: Palette },
  Food:      { border: 'border-green-500',  bg: 'bg-green-100',  text: 'text-green-600',  icon: UtensilsCrossed },
  Culture:   { border: 'border-yellow-500', bg: 'bg-yellow-100', text: 'text-yellow-600', icon: Church },
  Festivals: { border: 'border-red-500',    bg: 'bg-red-100',    text: 'text-red-600',    icon: PartyPopper },
  Sports:    { border: 'border-teal-500',   bg: 'bg-teal-100',   text: 'text-teal-600',   icon: Dumbbell },
}

const FALLBACK = { border: 'border-gray-400', bg: 'bg-gray-100', text: 'text-gray-600', icon: Tag }

export default function EventCategories() {
  const user = useAuthStore((s) => s.user)
  const isAdmin = ['admin', 'owner', 'assistant'].includes(user?.role?.[0] ?? '')

  const [categories, setCategories] = useState<EventCategoryCount[]>([])
  const [loading, setLoading] = useState(true)

  // Manage dialog state
  const [open, setOpen] = useState(false)
  const [manageCats, setManageCats] = useState<EventCategory[]>([])
  const [loadingManage, setLoadingManage] = useState(false)
  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchEventCategoryCounts().then((data) => {
      setCategories(data)
      setLoading(false)
    })
  }, [])

  function openManage() {
    setOpen(true)
    setLoadingManage(true)
    fetchEventCategories().then((data) => {
      setManageCats(data)
      setLoadingManage(false)
    })
  }

  async function handleCreate() {
    const trimmed = newName.trim()
    if (!trimmed) return
    if (manageCats.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
      toast.error('A category with that name already exists.')
      return
    }
    setCreating(true)
    try {
      const created = await createEventCategory(trimmed)
      setManageCats((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)))
      setCategories((prev) => [...prev, { name: created.name, count: 0 }])
      setNewName('')
      toast.success(`"${created.name}" category created.`)
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to create category.')
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(cat: EventCategory) {
    setDeletingId(cat.id)
    try {
      await deleteEventCategory(cat.id)
      setManageCats((prev) => prev.filter((c) => c.id !== cat.id))
      setCategories((prev) => prev.filter((c) => c.name !== cat.name))
      toast.success(`"${cat.name}" deleted.`)
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to delete category.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <h2 className='font-antigua font-semibold'>Event Categories</h2>
        {isAdmin && (
          <Button variant='outline' size='sm' className='gap-1.5' onClick={openManage}>
            <Settings className='h-3.5 w-3.5' />
            Manage
          </Button>
        )}
      </div>

      {loading ? (
        <div className='flex items-center gap-2 py-2'>
          <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
          <span className='text-sm text-muted-foreground'>Loading categories…</span>
        </div>
      ) : categories.length === 0 ? (
        <p className='text-sm text-muted-foreground'>
          No event categories yet.{isAdmin && ' Use the Manage button to create one.'}
        </p>
      ) : (
        <div className='flex flex-wrap gap-2'>
          {categories.map(({ name, count }) => {
            const style = CATEGORY_STYLES[name] ?? FALLBACK
            const Icon = style.icon
            return (
              <div
                key={name}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${style.border} ${style.bg} ${style.text}`}
              >
                <Icon size={14} className='shrink-0' />
                <span>{name}</span>
                <span className='flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-xs font-medium'>
                  {count}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Manage Dialog ──────────────────────────────────────────────── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle className='font-antigua text-xl'>Manage Event Categories</DialogTitle>
          </DialogHeader>

          {/* Create new */}
          <div className='flex gap-2'>
            <Input
              placeholder='New category name…'
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleCreate() } }}
              maxLength={60}
            />
            <Button
              onClick={handleCreate}
              disabled={creating || !newName.trim()}
              className='gap-1.5 shrink-0'
            >
              {creating ? <Loader2 className='h-4 w-4 animate-spin' /> : <Plus className='h-4 w-4' />}
              Add
            </Button>
          </div>

          {/* List */}
          <div className='mt-1 space-y-1 max-h-72 overflow-y-auto'>
            {loadingManage ? (
              <div className='flex items-center justify-center py-8'>
                <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
              </div>
            ) : manageCats.length === 0 ? (
              <p className='py-6 text-center text-sm text-muted-foreground'>No categories yet.</p>
            ) : (
              manageCats.map((cat) => {
                const style = CATEGORY_STYLES[cat.name] ?? FALLBACK
                const Icon = style.icon
                return (
                  <div
                    key={cat.id}
                    className='flex items-center justify-between rounded-lg border px-3 py-2'
                  >
                    <div className='flex items-center gap-2'>
                      <Icon size={15} className={style.text} />
                      <span className='text-sm font-medium'>{cat.name}</span>
                    </div>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-7 w-7 text-muted-foreground hover:text-red-500'
                      onClick={() => handleDelete(cat)}
                      disabled={deletingId === cat.id}
                    >
                      {deletingId === cat.id
                        ? <Loader2 className='h-3.5 w-3.5 animate-spin' />
                        : <Trash2 className='h-3.5 w-3.5' />}
                    </Button>
                  </div>
                )
              })
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

