'use client'

import { useEffect, useState } from 'react'
import {
  Megaphone,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  ExternalLink,
  Image as ImageIcon,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { DatePicker } from '@/components/date-picker'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { useAuthStore } from '@/lib/auth/auth.store'
import {
  fetchAdSpaces,
  upsertAdSpace,
  deleteAdSpace,
  type AdSpace,
  type AdSpaceInsert,
} from '@/lib/services/ad-spaces.service'

type Placement = 'home' | 'category' | 'search' | 'blog'

const PLACEMENTS: { value: Placement; label: string }[] = [
  { value: 'home', label: 'Homepage' },
  { value: 'category', label: 'Category Page' },
  { value: 'search', label: 'Search Results' },
  { value: 'blog', label: 'Blog / Article' },
]

const placementBadge: Record<Placement, string> = {
  home: 'bg-blue-100 text-blue-700 border-blue-200',
  category: 'bg-purple-100 text-purple-700 border-purple-200',
  search: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  blog: 'bg-cyan-100 text-cyan-700 border-cyan-200',
}

const emptyForm = {
  placement: 'home' as Placement,
  image_url: '',
  link_url: '',
  is_active: true,
  starts_at: undefined as Date | undefined,
  expires_at: undefined as Date | undefined,
}

export function AdManagerPage() {
  const user = useAuthStore((s) => s.user)
  const [ads, setAds] = useState<AdSpace[]>([])
  const [loading, setLoading] = useState(true)

  // Dialog
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadAds()
  }, [])

  async function loadAds() {
    setLoading(true)
    const data = await fetchAdSpaces()
    setAds(data)
    setLoading(false)
  }

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  function openEdit(ad: AdSpace) {
    setEditingId(ad.id)
    setForm({
      placement: ad.placement,
      image_url: ad.image_url ?? '',
      link_url: ad.link_url ?? '',
      is_active: ad.is_active,
      starts_at: ad.starts_at ? new Date(ad.starts_at) : undefined,
      expires_at: ad.expires_at ? new Date(ad.expires_at) : undefined,
    })
    setDialogOpen(true)
  }

  async function handleSave() {
    if (!form.image_url.trim()) {
      toast.error('Image URL is required')
      return
    }

    setSaving(true)
    try {
      const payload: AdSpaceInsert & { id?: string } = {
        placement: form.placement,
        listing_id: null,
        image_url: form.image_url.trim(),
        link_url: form.link_url.trim() || null,
        is_active: form.is_active,
        created_by: user?.accountNo ?? null,
        starts_at: form.starts_at ? format(form.starts_at, 'yyyy-MM-dd') : null,
        expires_at: form.expires_at ? format(form.expires_at, 'yyyy-MM-dd') : null,
      }
      if (editingId) payload.id = editingId

      await upsertAdSpace(payload)
      toast.success(editingId ? 'Ad space updated' : 'Ad space created')
      setDialogOpen(false)
      loadAds()
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to save ad space')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this ad space?')) return
    try {
      await deleteAdSpace(id)
      toast.success('Ad space deleted')
      setAds((prev) => prev.filter((a) => a.id !== id))
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to delete')
    }
  }

  return (
    <>
      <Header />

      <Main>
        <div className='mb-6 flex h-20 items-center justify-between'>
          <div>
            <h1 className='font-antigua text-3xl font-bold tracking-tight'>
              Ad Manager
            </h1>
            <p className='text-xs text-muted-foreground'>
              Manage banner ads across placement slots on the portal.
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <Button onClick={openCreate} className='gap-1.5 bg-[#CF9921] hover:bg-[#b8871b] text-white'>
              <Plus className='h-4 w-4' />
              New Ad Space
            </Button>
            <Badge variant='secondary' className='gap-1'>
              <Megaphone className='h-3 w-3' />
              {loading ? '…' : ads.length} ads
            </Badge>
          </div>
        </div>

        {loading ? (
          <div className='flex items-center justify-center py-16'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          </div>
        ) : ads.length === 0 ? (
          <div className='py-16 text-center text-muted-foreground'>
            No ad spaces configured yet. Create one to get started.
          </div>
        ) : (
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Placement</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ads.map((ad) => (
                  <TableRow key={ad.id}>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className={`text-[10px] border ${placementBadge[ad.placement]}`}
                      >
                        {PLACEMENTS.find((p) => p.value === ad.placement)?.label ?? ad.placement}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {ad.image_url ? (
                        <div className='flex items-center gap-1.5'>
                          <ImageIcon className='h-3.5 w-3.5 text-muted-foreground' />
                          <span className='text-xs truncate max-w-[200px]'>{ad.image_url}</span>
                        </div>
                      ) : (
                        <span className='text-xs text-muted-foreground'>—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {ad.link_url ? (
                        <a
                          href={ad.link_url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center gap-1 text-xs text-[#CF9921] hover:underline'
                        >
                          <ExternalLink className='h-3 w-3' />
                          Link
                        </a>
                      ) : (
                        <span className='text-xs text-muted-foreground'>—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={ad.is_active ? 'default' : 'secondary'} className='text-[10px]'>
                        {ad.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-xs text-muted-foreground'>
                      {ad.starts_at
                        ? format(new Date(ad.starts_at), 'MMM d, yyyy')
                        : '—'}
                      {' → '}
                      {ad.expires_at
                        ? format(new Date(ad.expires_at), 'MMM d, yyyy')
                        : '—'}
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex items-center justify-end gap-1'>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8'
                          onClick={() => openEdit(ad)}
                        >
                          <Pencil className='h-3.5 w-3.5' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 text-destructive hover:text-destructive'
                          onClick={() => handleDelete(ad.id)}
                        >
                          <Trash2 className='h-3.5 w-3.5' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Main>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Ad Space' : 'New Ad Space'}</DialogTitle>
          </DialogHeader>

          <div className='space-y-4 py-2'>
            {/* Placement */}
            <div className='space-y-1.5'>
              <Label className='text-sm'>Placement</Label>
              <Select
                value={form.placement}
                onValueChange={(v) => setForm({ ...form, placement: v as Placement })}
              >
                <SelectTrigger className='h-9'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PLACEMENTS.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Image URL */}
            <div className='space-y-1.5'>
              <Label className='flex items-center gap-1 text-sm'>
                Image URL <span className='text-red-500'>*</span>
              </Label>
              <Input
                placeholder='https://cdn.example.com/banner.jpg'
                className='h-9'
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              />
            </div>

            {/* Link URL */}
            <div className='space-y-1.5'>
              <Label className='text-sm'>Click-through URL</Label>
              <Input
                type='url'
                placeholder='https://example.com/promo'
                className='h-9'
                value={form.link_url}
                onChange={(e) => setForm({ ...form, link_url: e.target.value })}
              />
            </div>

            {/* Dates */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1.5'>
                <Label className='text-sm'>Start Date</Label>
                <DatePicker
                  selected={form.starts_at}
                  onSelect={(d: Date | undefined) => setForm({ ...form, starts_at: d })}
                  placeholder='Start'
                />
              </div>
              <div className='space-y-1.5'>
                <Label className='text-sm'>Expires</Label>
                <DatePicker
                  selected={form.expires_at}
                  onSelect={(d: Date | undefined) => setForm({ ...form, expires_at: d })}
                  placeholder='End'
                />
              </div>
            </div>

            {/* Active toggle */}
            <div className='flex items-center justify-between'>
              <Label className='text-sm'>Active</Label>
              <Switch
                checked={form.is_active}
                onCheckedChange={(v) => setForm({ ...form, is_active: v })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant='outline' onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className='bg-[#CF9921] hover:bg-[#b8871b] text-white'
            >
              {saving && <Loader2 className='h-4 w-4 animate-spin mr-2' />}
              {editingId ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
