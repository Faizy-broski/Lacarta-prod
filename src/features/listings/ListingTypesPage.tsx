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

interface ListingType {
  id: number
  name: string
  description: string | null
  status: string
}

interface ListingTypesPageProps {
  listingType: string   // URL slug e.g. 'hotels', 'real_estate'
  displayName: string   // e.g. 'Hotels', 'Real Estate'
}

// Converts a URL slug to a display-friendly name for DB lookup
function slugToDisplayName(slug: string): string {
  return slug.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

// ─── Page Component ───────────────────────────────────────────────────────────

export function ListingTypesPage({ listingType, displayName }: ListingTypesPageProps) {
  const router = useRouter()

  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [categoryError, setCategoryError] = useState(false)
  const [types, setTypes] = useState<ListingType[]>([])
  const [loading, setLoading] = useState(true)

  // Add dialog
  const [addOpen, setAddOpen] = useState(false)
  const [addName, setAddName] = useState('')
  const [addDesc, setAddDesc] = useState('')
  const [addSaving, setAddSaving] = useState(false)

  // Edit dialog
  const [editTarget, setEditTarget] = useState<ListingType | null>(null)
  const [editName, setEditName] = useState('')
  const [editDesc, setEditDesc] = useState('')
  const [editSaving, setEditSaving] = useState(false)

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<ListingType | null>(null)
  const [deleting, setDeleting] = useState(false)

  // Derived back URL uses actual category UUID so filter works correctly
  const backUrl = categoryId
    ? `/dashboard/listings?category=${categoryId}`
    : '/dashboard/listings'

  // ── Load parent category ID then types ────────────────────────────────────

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
        .from('listing_types')
        .select('id, name, description, status')
        .eq('category', catData.id)
        .order('name')

      if (error) {
        toast.error('Failed to load types', { description: error.message })
      } else {
        setTypes(data ?? [])
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
      .from('listing_types')
      .insert({
        name: addName.trim(),
        description: addDesc.trim() || null,
        category: categoryId,
        status: 'active',
      })
      .select('id, name, description, status')
      .single()

    if (error) {
      // Unique constraint violation — duplicate name in same category
      if (error.code === '23505') {
        toast.error(`"${addName.trim()}" already exists for ${displayName}.`)
      } else {
        toast.error('Failed to add type', { description: error.message })
      }
    } else {
      setTypes((prev) => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)))
      toast.success(`"${addName.trim()}" added`)
      setAddName('')
      setAddDesc('')
      setAddOpen(false)
    }
    setAddSaving(false)
  }

  // ── Edit ──────────────────────────────────────────────────────────────────

  function openEdit(t: ListingType) {
    setEditTarget(t)
    setEditName(t.name)
    setEditDesc(t.description ?? '')
  }

  async function handleEdit() {
    if (!editTarget || !editName.trim()) return
    setEditSaving(true)
    const { error } = await supabase
      .from('listing_types')
      .update({ name: editName.trim(), description: editDesc.trim() || null })
      .eq('id', editTarget.id)

    if (error) {
      toast.error('Failed to update type', { description: error.message })
    } else {
      setTypes((prev) =>
        prev
          .map((t) =>
            t.id === editTarget.id
              ? { ...t, name: editName.trim(), description: editDesc.trim() || null }
              : t
          )
          .sort((a, b) => a.name.localeCompare(b.name))
      )
      toast.success('Type updated')
      setEditTarget(null)
    }
    setEditSaving(false)
  }

  // ── Delete ────────────────────────────────────────────────────────────────

  async function handleDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    const { error } = await supabase
      .from('listing_types')
      .delete()
      .eq('id', deleteTarget.id)

    if (error) {
      toast.error('Failed to delete type', { description: error.message })
    } else {
      setTypes((prev) => prev.filter((t) => t.id !== deleteTarget.id))
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
            <Button variant='ghost' size='icon' onClick={() => router.push(backUrl)}>
              <ArrowLeft className='h-4 w-4' />
            </Button>
            <div>
              <h1 className='font-antigua text-2xl font-bold tracking-tight'>{displayName} — Types</h1>
              <p className='text-xs text-muted-foreground'>
                Manage types shown as filter pills on the public {displayName.toLowerCase()} page
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
            Add Type
          </Button>
        </div>
        <Card className='rounded-xl'>
          <CardHeader>
            <CardTitle className='text-base'>{displayName} Types</CardTitle>
            <p className='text-xs text-muted-foreground'>
              These types appear as filter pills on the public website and in the listing creation form under &ldquo;Type&rdquo;.
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
            ) : types.length === 0 ? (
              <div className='flex flex-col items-center gap-3 py-12 text-center'>
                <p className='text-sm text-muted-foreground'>
                  No types yet for {displayName}. Add types to enable frontend filtering.
                </p>
                <Button variant='outline' size='sm' onClick={() => setAddOpen(true)}>
                  <Plus className='mr-1.5 h-4 w-4' />
                  Add First Type
                </Button>
              </div>
            ) : (
              <div className='space-y-2'>
                {types.map((t) => (
                  <div
                    key={t.id}
                    className='flex items-center justify-between rounded-md border bg-muted/20 px-4 py-3'
                  >
                    <div>
                      <p className='text-sm font-medium'>{t.name}</p>
                      {t.description && (
                        <p className='text-xs text-muted-foreground'>{t.description}</p>
                      )}
                    </div>
                    <div className='flex items-center gap-1'>
                      <Button variant='ghost' size='icon' className='h-8 w-8' onClick={() => openEdit(t)}>
                        <Pencil className='h-3.5 w-3.5' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 text-destructive hover:text-destructive'
                        onClick={() => setDeleteTarget(t)}
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
            <DialogTitle>Add {displayName} Type</DialogTitle>
          </DialogHeader>
          <div className='space-y-3 py-2'>
            <div className='space-y-1.5'>
              <Label>Name <span className='text-destructive'>*</span></Label>
              <Input
                placeholder='e.g. Luxury Hotels, Boutique, Beachfront'
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
            <Button variant='outline' onClick={() => setAddOpen(false)}>Cancel</Button>
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
            <DialogTitle>Edit Type</DialogTitle>
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
            <Button variant='outline' onClick={() => setEditTarget(null)}>Cancel</Button>
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
            <DialogTitle>Delete Type</DialogTitle>
          </DialogHeader>
          <p className='py-2 text-sm text-muted-foreground'>
            Are you sure you want to delete{' '}
            <span className='font-semibold text-foreground'>&ldquo;{deleteTarget?.name}&rdquo;</span>?
            This cannot be undone. Listings using this type tag will retain the saved value but it will no longer appear as a filter option.
          </p>
          <DialogFooter>
            <Button variant='outline' onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant='destructive' onClick={handleDelete} disabled={deleting}>
              {deleting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
