'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2, Pencil, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

// ─── Types ────────────────────────────────────────────────────────────────────

interface SubCategory {
  id: number
  name: string
  description: string | null
  status: string
}

interface ListingCategoriesPageProps {
  listingType: string   // e.g. 'hotels', 'beaches', 'real_estate' (slug from URL param)
  displayName: string   // e.g. 'Hotels', 'Beaches', 'Real Estate'
}

// Converts a URL slug to a display-friendly name for DB lookup
// e.g. 'real_estate' → 'Real Estate', 'gastronomy' → 'Gastronomy'
function slugToDisplayName(slug: string): string {
  return slug.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

// ─── Page Component ───────────────────────────────────────────────────────────

export function ListingCategoriesPage({
  listingType,
  displayName,
}: ListingCategoriesPageProps) {
  const router = useRouter()

  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [categoryError, setCategoryError] = useState(false)
  const [subCategories, setSubCategories] = useState<SubCategory[]>([])
  const [loading, setLoading] = useState(true)

  // Derived back URL uses the actual category UUID so the filter works correctly
  const backUrl = categoryId
    ? `/dashboard/listings?category=${categoryId}`
    : '/dashboard/listings'

  // Add dialog
  const [addOpen, setAddOpen] = useState(false)
  const [addName, setAddName] = useState('')
  const [addDesc, setAddDesc] = useState('')
  const [addSaving, setAddSaving] = useState(false)

  // Edit dialog
  const [editTarget, setEditTarget] = useState<SubCategory | null>(null)
  const [editName, setEditName] = useState('')
  const [editDesc, setEditDesc] = useState('')
  const [editSaving, setEditSaving] = useState(false)

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<SubCategory | null>(null)
  const [deleting, setDeleting] = useState(false)

  // ── Load main category ID then sub-categories ─────────────────────────────

  useEffect(() => {
    async function load() {
      setLoading(true)
      setCategoryError(false)
      const catName = slugToDisplayName(listingType)

      const { data: catData, error: catErr } = await supabase
        .from('categories')
        .select('id')
        .ilike('name', catName)
        .eq('type', 'listing')
        .single()

      if (catErr || !catData) {
        toast.error(`Could not find category "${catName}"`)
        setCategoryError(true)
        setLoading(false)
        return
      }

      setCategoryId(catData.id)

      const { data, error } = await supabase
        .from('sub-categories')
        .select('id, name, description, status')
        .eq('category', catData.id)
        .order('name')

      if (error) {
        toast.error('Failed to load categories', { description: error.message })
      } else {
        setSubCategories(data ?? [])
      }
      setLoading(false)
    }
    load()
  }, [listingType])

  // ── Add ───────────────────────────────────────────────────────────────────

  async function handleAdd() {
    if (!addName.trim() || !categoryId) return
    setAddSaving(true)
    const { data, error } = await supabase
      .from('sub-categories')
      .insert({ name: addName.trim(), description: addDesc.trim() || null, category: categoryId, status: 'active' })
      .select('id, name, description, status')
      .single()

    if (error) {
      if (error.code === '23505') {
        toast.error(`"${addName.trim()}" already exists for ${displayName}.`)
      } else {
        toast.error('Failed to add', { description: error.message })
      }
    } else {
      setSubCategories((prev) => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)))
      toast.success(`"${addName.trim()}" added`)
      setAddName('')
      setAddDesc('')
      setAddOpen(false)
    }
    setAddSaving(false)
  }

  // ── Edit ──────────────────────────────────────────────────────────────────

  function openEdit(sc: SubCategory) {
    setEditTarget(sc)
    setEditName(sc.name)
    setEditDesc(sc.description ?? '')
  }

  async function handleEdit() {
    if (!editTarget || !editName.trim()) return
    setEditSaving(true)
    const { error } = await supabase
      .from('sub-categories')
      .update({ name: editName.trim(), description: editDesc.trim() || null })
      .eq('id', editTarget.id)

    if (error) {
      toast.error('Failed to update', { description: error.message })
    } else {
      setSubCategories((prev) =>
        prev
          .map((sc) =>
            sc.id === editTarget.id
              ? { ...sc, name: editName.trim(), description: editDesc.trim() || null }
              : sc
          )
          .sort((a, b) => a.name.localeCompare(b.name))
      )
      toast.success('Category updated')
      setEditTarget(null)
    }
    setEditSaving(false)
  }

  // ── Delete ────────────────────────────────────────────────────────────────

  async function handleDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    const { error } = await supabase
      .from('sub-categories')
      .delete()
      .eq('id', deleteTarget.id)

    if (error) {
      toast.error('Failed to delete', { description: error.message })
    } else {
      setSubCategories((prev) => prev.filter((sc) => sc.id !== deleteTarget.id))
      toast.success(`"${deleteTarget.name}" deleted`)
      setDeleteTarget(null)
    }
    setDeleting(false)
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <Header />

      <Main>
        {/* Page title row */}
        <div className='mb-5 flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => router.push(backUrl)}
            >
              <ArrowLeft className='h-4 w-4' />
            </Button>
            <div>
              <h1 className='font-antigua text-2xl font-bold tracking-tight'>{displayName} — Categories</h1>
              <p className='text-xs text-muted-foreground'>
                Manage sub-categories available when creating {displayName.toLowerCase()} listings
              </p>
            </div>
          </div>
          <Button
            size='sm'
            onClick={() => setAddOpen(true)}
            disabled={loading || !categoryId}
            className='bg-gradient-to-r from-gold to-gold-light text-white'
          >
            <Plus className='mr-1.5 h-4 w-4' />
            Add Category
          </Button>
        </div>
        <Card className='rounded-xl'>
          <CardHeader>
            <CardTitle className='text-base'>
              {displayName} Categories
            </CardTitle>
            <p className='text-xs text-muted-foreground'>
              These categories appear in the listing creation form under &ldquo;{displayName}&rdquo;.
            </p>
          </CardHeader>
          <Separator />
          <CardContent className='pt-4'>
            {loading ? (
              <div className='flex items-center justify-center py-12'>
                <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
              </div>
            ) : categoryError ? (
              <div className='py-12 text-center'>
                <p className='text-sm font-medium text-destructive'>Category "{displayName}" not found.</p>
                <p className='mt-1 text-xs text-muted-foreground'>Make sure a listing-type category with this name exists in the database.</p>
              </div>
            ) : subCategories.length === 0 ? (
              <div className='flex flex-col items-center gap-3 py-12 text-center'>
                <p className='text-sm text-muted-foreground'>
                  No categories yet for {displayName}.
                </p>
                <Button variant='outline' size='sm' onClick={() => setAddOpen(true)}>
                  <Plus className='mr-1.5 h-4 w-4' />
                  Add First Category
                </Button>
              </div>
            ) : (
              <div className='space-y-2'>
                {subCategories.map((sc) => (
                  <div
                    key={sc.id}
                    className='flex items-center justify-between rounded-md border bg-muted/20 px-4 py-3'
                  >
                    <div>
                      <p className='text-sm font-medium'>{sc.name}</p>
                      {sc.description && (
                        <p className='text-xs text-muted-foreground'>{sc.description}</p>
                      )}
                    </div>
                    <div className='flex items-center gap-1'>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8'
                        onClick={() => openEdit(sc)}
                      >
                        <Pencil className='h-3.5 w-3.5' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 text-destructive hover:text-destructive'
                        onClick={() => setDeleteTarget(sc)}
                      >
                        <Trash2 className='h-3.5 w-3.5' />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </Main>

      {/* ── Add Dialog ── */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add {displayName} Category</DialogTitle>
          </DialogHeader>
          <div className='space-y-3 py-2'>
            <div className='space-y-1.5'>
              <Label>Name <span className='text-destructive'>*</span></Label>
              <Input
                placeholder={`e.g. Boutique, Resort, B&B`}
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              />
            </div>
            <div className='space-y-1.5'>
              <Label>Description <span className='text-xs text-muted-foreground'>(optional)</span></Label>
              <Input
                placeholder='Short description'
                value={addDesc}
                onChange={(e) => setAddDesc(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={!addName.trim() || addSaving}>
              {addSaving && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Edit Dialog ── */}
      <Dialog open={!!editTarget} onOpenChange={(o) => !o && setEditTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className='space-y-3 py-2'>
            <div className='space-y-1.5'>
              <Label>Name <span className='text-destructive'>*</span></Label>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
              />
            </div>
            <div className='space-y-1.5'>
              <Label>Description <span className='text-xs text-muted-foreground'>(optional)</span></Label>
              <Input
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setEditTarget(null)}>
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={!editName.trim() || editSaving}>
              {editSaving && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirm Dialog ── */}
      <Dialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
          </DialogHeader>
          <p className='py-2 text-sm text-muted-foreground'>
            Are you sure you want to delete{' '}
            <span className='font-semibold text-foreground'>&ldquo;{deleteTarget?.name}&rdquo;</span>?
            This cannot be undone and will remove the category from any listings that use it.
          </p>
          <DialogFooter>
            <Button variant='outline' onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
