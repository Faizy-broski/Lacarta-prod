'use client'

import { useEffect, useState } from 'react'
import { Loader2, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// ── Types ─────────────────────────────────────────────────────────────────────
interface Category {
  id: string
  name: string
  description: string | null
  type: string
  status: string
  article_count: number
}

type FormState = {
  name: string
  description: string
  type: string
  status: string
}

const EMPTY_FORM: FormState = { name: '', description: '', type: 'blog', status: 'active' }

// ── Color helpers ─────────────────────────────────────────────────────────────
const COLOR_CYCLE = ['yellow', 'red', 'purple', 'green', 'blue', 'orange', 'pink', 'teal']
const COLOR_MAP: Record<string, string> = {
  yellow: 'bg-yellow-100',
  red: 'bg-red-100',
  purple: 'bg-purple-100',
  green: 'bg-green-100',
  blue: 'bg-blue-100',
  orange: 'bg-orange-100',
  pink: 'bg-pink-100',
  teal: 'bg-teal-100',
}

// ── CategoryFormDialog ────────────────────────────────────────────────────────
function CategoryFormDialog({
  open,
  onOpenChange,
  initial,
  onSave,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  initial: FormState
  onSave: (form: FormState) => Promise<void>
}) {
  const [form, setForm] = useState<FormState>(initial)
  const [saving, setSaving] = useState(false)

  // Sync when dialog reopens with new initial data
  useEffect(() => {
    if (open) setForm(initial)
  }, [open, initial])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) {
      toast.error('Category name is required.')
      return
    }
    setSaving(true)
    await onSave(form)
    setSaving(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{initial.name ? 'Edit Category' : 'Add Category'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4 pt-2'>
          <div className='space-y-1'>
            <Label htmlFor='cat-name'>Name *</Label>
            <Input
              id='cat-name'
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder='e.g. Gastronomy'
            />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='cat-desc'>Description</Label>
            <Input
              id='cat-desc'
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder='Optional description'
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-1'>
              <Label>Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='blog'>Blog</SelectItem>
                  <SelectItem value='listing'>Listing</SelectItem>
                  <SelectItem value='event'>Event</SelectItem>
                  <SelectItem value='resource'>Resource</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-1'>
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm((f) => ({ ...f, status: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='active'>Active</SelectItem>
                  <SelectItem value='inactive'>Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className='pt-2'>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type='submit' disabled={saving}>
              {saving ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
              {initial.name ? 'Save Changes' : 'Add Category'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ── DeleteConfirmDialog ───────────────────────────────────────────────────────
function DeleteConfirmDialog({
  open,
  onOpenChange,
  name,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  name: string
  onConfirm: () => Promise<void>
}) {
  const [deleting, setDeleting] = useState(false)

  const handleConfirm = async () => {
    setDeleting(true)
    await onConfirm()
    setDeleting(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
        </DialogHeader>
        <p className='text-sm text-muted-foreground'>
          Are you sure you want to delete <span className='font-semibold text-foreground'>{name}</span>?
          Articles in this category will have their category cleared.
        </p>
        <DialogFooter className='pt-2'>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant='destructive' disabled={deleting} onClick={handleConfirm}>
            {deleting ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ── CategoryCard (main) ───────────────────────────────────────────────────────
export default function CategoryCard() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  // Dialog state
  const [formOpen, setFormOpen] = useState(false)
  const [formInitial, setFormInitial] = useState<FormState>(EMPTY_FORM)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deletingCat, setDeletingCat] = useState<Category | null>(null)

  // ── Load ──────────────────────────────────────────────────────────────────
  async function load() {
    setLoading(true)
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, description, type, status')
      .order('name', { ascending: true })

    if (error) {
      toast.error('Failed to load categories.')
      setLoading(false)
      return
    }

    const cats = data ?? []
    const counts = await Promise.all(
      cats.map((c: any) =>
        supabase
          .from('articles')
          .select('*', { count: 'exact', head: true })
          .eq('category_id', c.id)
          .then(({ count }) => ({ id: c.id, count: count ?? 0 }))
      )
    )
    const countMap = Object.fromEntries(counts.map((c) => [c.id, c.count]))

    setCategories(
      cats.map((c: any) => ({
        id: c.id,
        name: c.name as string,
        description: c.description ?? null,
        type: c.type as string,
        status: c.status as string,
        article_count: countMap[c.id] ?? 0,
      }))
    )
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  // ── Create ────────────────────────────────────────────────────────────────
  function openCreate() {
    setEditingId(null)
    setFormInitial(EMPTY_FORM)
    setFormOpen(true)
  }

  // ── Edit ──────────────────────────────────────────────────────────────────
  function openEdit(cat: Category) {
    setEditingId(cat.id)
    setFormInitial({
      name: cat.name,
      description: cat.description ?? '',
      type: cat.type,
      status: cat.status,
    })
    setFormOpen(true)
  }

  // ── Save (create or update) ───────────────────────────────────────────────
  async function handleSave(form: FormState) {
    if (editingId) {
      const { error } = await supabase
        .from('categories')
        .update({
          name: form.name.trim(),
          description: form.description.trim() || null,
          type: form.type,
          status: form.status,
        })
        .eq('id', editingId)

      if (error) {
        toast.error('Failed to update category: ' + error.message)
        return
      }
      toast.success('Category updated.')
    } else {
      const { error } = await supabase.from('categories').insert({
        name: form.name.trim(),
        description: form.description.trim() || null,
        type: form.type,
        status: form.status,
      })

      if (error) {
        toast.error('Failed to create category: ' + error.message)
        return
      }
      toast.success('Category created.')
    }

    setFormOpen(false)
    load()
  }

  // ── Delete ────────────────────────────────────────────────────────────────
  function openDelete(cat: Category) {
    setDeletingCat(cat)
    setDeleteOpen(true)
  }

  async function handleDelete() {
    if (!deletingCat) return
    const { error } = await supabase.from('categories').delete().eq('id', deletingCat.id)
    if (error) {
      toast.error('Failed to delete category: ' + error.message)
      return
    }
    toast.success(`"${deletingCat.name}" deleted.`)
    setDeleteOpen(false)
    setDeletingCat(null)
    load()
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <Card className='border-0 px-0 shadow-none'>
        <CardHeader className='flex flex-col items-center justify-between px-0 pb-2 sm:flex-row'>
          <CardTitle className='font-antigua self-start text-start text-xl'>Categories</CardTitle>
          <Button
            variant='outline'
            size='sm'
            className='border font-normal text-muted-foreground'
            onClick={openCreate}
          >
            + Add Category
          </Button>
        </CardHeader>
        <CardContent className='px-0'>
          {loading ? (
            <div className='flex justify-center py-8'>
              <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
            </div>
          ) : categories.length === 0 ? (
            <p className='py-8 text-center text-sm text-muted-foreground'>No categories yet.</p>
          ) : (
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
              {categories.map((cat, i) => {
                const bgClass = COLOR_MAP[COLOR_CYCLE[i % COLOR_CYCLE.length]]
                return (
                  <Card key={cat.id} className='group relative py-5'>
                    {/* Edit / Delete hover actions */}
                    <div className='absolute right-2 top-2 hidden gap-1 group-hover:flex'>
                      <Button
                        size='icon'
                        variant='ghost'
                        className='h-7 w-7'
                        onClick={() => openEdit(cat)}
                      >
                        <Pencil className='h-3.5 w-3.5' />
                      </Button>
                      <Button
                        size='icon'
                        variant='ghost'
                        className='h-7 w-7 text-destructive hover:text-destructive'
                        onClick={() => openDelete(cat)}
                      >
                        <Trash2 className='h-3.5 w-3.5' />
                      </Button>
                    </div>
                    <CardContent className='space-y-2 px-3'>
                      <span className={`h-min w-fit text-lg font-semibold ${bgClass} rounded-lg px-3 py-2 text-black`}>
                        {cat.name.charAt(0).toUpperCase()}
                      </span>
                      <h3 className='font-antigua mt-3 mb-0 pb-0 font-bold break-words'>{cat.name}</h3>
                      <p className='text-xs text-muted-foreground capitalize'>{cat.type}</p>
                      <p className='text-sm text-gray-400'>{cat.article_count} articles</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <CategoryFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        initial={formInitial}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        name={deletingCat?.name ?? ''}
        onConfirm={handleDelete}
      />
    </>
  )
}

