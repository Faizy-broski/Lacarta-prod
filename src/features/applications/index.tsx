'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Loader2, Building2, Mail, Phone, Globe, ChevronDown, ChevronUp } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/lib/auth/auth.store'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Application {
  id: string
  full_name: string
  email: string
  phone: string | null
  business_name: string
  category: string | null
  description: string | null
  website: string | null
  status: 'pending' | 'approved' | 'rejected'
  rejection_reason: string | null
  reviewed_at: string | null
  created_at: string
}

async function fetchApplications(status: string): Promise<Application[]> {
  const { data, error } = await supabase
    .from('client_applications')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false })
  if (error) { console.error('[applications]', error.message); return [] }
  return data as Application[]
}

function ApplicationCard({
  app,
  onApprove,
  onReject,
  acting,
}: {
  app: Application
  onApprove?: (id: string) => void
  onReject?: (id: string, reason: string) => void
  acting: string | null
}) {
  const [rejectOpen, setRejectOpen] = useState(false)
  const [reason, setReason] = useState('')

  return (
    <div className='rounded-xl border bg-card p-5 shadow-sm space-y-3'>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex items-start gap-3'>
          <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#CF9921]/10'>
            <Building2 className='h-5 w-5 text-[#CF9921]' />
          </div>
          <div>
            <p className='font-semibold leading-tight'>{app.business_name}</p>
            <p className='text-sm text-muted-foreground'>{app.full_name}</p>
          </div>
        </div>
        {app.category && (
          <Badge variant='secondary' className='shrink-0 text-[10px]'>{app.category}</Badge>
        )}
      </div>

      <div className='flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground'>
        <span className='flex items-center gap-1'><Mail className='h-3 w-3' />{app.email}</span>
        {app.phone && <span className='flex items-center gap-1'><Phone className='h-3 w-3' />{app.phone}</span>}
        {app.website && (
          <a href={app.website} target='_blank' rel='noopener noreferrer' className='flex items-center gap-1 hover:text-[#CF9921]'>
            <Globe className='h-3 w-3' />{app.website.replace(/^https?:\/\//, '')}
          </a>
        )}
      </div>

      {app.description && (
        <p className='text-sm text-muted-foreground line-clamp-2'>{app.description}</p>
      )}

      <p className='text-[11px] text-muted-foreground'>
        Submitted {new Date(app.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </p>

      {/* Rejection reason for rejected tab */}
      {app.status === 'rejected' && app.rejection_reason && (
        <p className='rounded bg-red-50 px-3 py-2 text-xs text-red-600'>
          Reason: {app.rejection_reason}
        </p>
      )}

      {onApprove && onReject && (
        <div className='space-y-2 pt-1'>
          <div className='flex gap-2'>
            <Button
              size='sm'
              className='h-8 gap-1.5 bg-green-600 hover:bg-green-700 text-white'
              disabled={acting === app.id}
              onClick={() => onApprove(app.id)}
            >
              {acting === app.id ? <Loader2 className='h-3.5 w-3.5 animate-spin' /> : <CheckCircle className='h-3.5 w-3.5' />}
              Approve & Send Invite
            </Button>
            <Button
              size='sm'
              variant='outline'
              className='h-8 gap-1.5 border-red-200 text-red-600 hover:bg-red-50'
              disabled={acting === app.id}
              onClick={() => setRejectOpen((v) => !v)}
            >
              <XCircle className='h-3.5 w-3.5' />
              Reject
              {rejectOpen ? <ChevronUp className='h-3 w-3' /> : <ChevronDown className='h-3 w-3' />}
            </Button>
          </div>
          {rejectOpen && (
            <div className='flex gap-2'>
              <input
                type='text'
                placeholder='Rejection reason (optional)'
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className='flex-1 rounded-md border px-3 py-1.5 text-sm outline-none focus:border-red-400'
              />
              <Button
                size='sm'
                variant='destructive'
                className='h-8 shrink-0'
                disabled={acting === app.id}
                onClick={() => { onReject(app.id, reason); setRejectOpen(false) }}
              >
                Confirm
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function ApplicationsPage() {
  const user = useAuthStore((s) => s.user)
  const [pending, setPending] = useState<Application[]>([])
  const [approved, setApproved] = useState<Application[]>([])
  const [rejected, setRejected] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [acting, setActing] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      fetchApplications('pending'),
      fetchApplications('approved'),
      fetchApplications('rejected'),
    ]).then(([p, a, r]) => {
      setPending(p)
      setApproved(a)
      setRejected(r)
      setLoading(false)
    })
  }, [])

  const handleApprove = async (id: string) => {
    const app = pending.find((a) => a.id === id)
    if (!app) return
    setActing(id)

    // Send invite email via existing admin invite API
    const res = await fetch('/api/admin/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: app.email, role: 'client', desc: app.business_name }),
    })
    const json = await res.json()

    if (!res.ok) {
      toast.error(json.error ?? 'Failed to send invite.')
      setActing(null)
      return
    }

    // Update application status
    await supabase
      .from('client_applications')
      .update({ status: 'approved', reviewed_by: user?.accountNo ?? null, reviewed_at: new Date().toISOString() })
      .eq('id', id)

    const updated = { ...app, status: 'approved' as const }
    setPending((prev) => prev.filter((a) => a.id !== id))
    setApproved((prev) => [updated, ...prev])
    toast.success(`Invite sent to ${app.email}`)
    setActing(null)
  }

  const handleReject = async (id: string, reason: string) => {
    const app = pending.find((a) => a.id === id)
    if (!app) return
    setActing(id)

    await supabase
      .from('client_applications')
      .update({
        status: 'rejected',
        rejection_reason: reason || null,
        reviewed_by: user?.accountNo ?? null,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id)

    const updated = { ...app, status: 'rejected' as const, rejection_reason: reason || null }
    setPending((prev) => prev.filter((a) => a.id !== id))
    setRejected((prev) => [updated, ...prev])
    toast.success('Application rejected.')
    setActing(null)
  }

  return (
    <>
      <Header />
      <Main>
        <div className='mb-6 flex h-20 items-center justify-between'>
          <div>
            <h1 className='font-antigua text-3xl font-bold tracking-tight'>Business Applications</h1>
            <p className='text-xs text-muted-foreground'>
              Review and approve new client applications. Approved applicants receive an invite email.
            </p>
          </div>
          <Badge variant='secondary' className='gap-1 text-sm'>
            {loading ? '…' : pending.length} pending
          </Badge>
        </div>

        {loading ? (
          <div className='flex items-center justify-center py-16'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          </div>
        ) : (
          <Tabs defaultValue='pending'>
            <TabsList className='mb-6'>
              <TabsTrigger value='pending'>
                Pending <Badge variant='secondary' className='ml-1.5 h-5 px-1.5 text-[10px]'>{pending.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value='approved'>
                Approved <Badge variant='secondary' className='ml-1.5 h-5 px-1.5 text-[10px]'>{approved.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value='rejected'>
                Rejected <Badge variant='secondary' className='ml-1.5 h-5 px-1.5 text-[10px]'>{rejected.length}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value='pending' className='space-y-4'>
              {pending.length === 0 ? (
                <p className='py-12 text-center text-muted-foreground'>No pending applications.</p>
              ) : (
                pending.map((app) => (
                  <ApplicationCard key={app.id} app={app} onApprove={handleApprove} onReject={handleReject} acting={acting} />
                ))
              )}
            </TabsContent>

            <TabsContent value='approved' className='space-y-4'>
              {approved.length === 0 ? (
                <p className='py-12 text-center text-muted-foreground'>No approved applications yet.</p>
              ) : (
                approved.map((app) => (
                  <ApplicationCard key={app.id} app={app} acting={null} />
                ))
              )}
            </TabsContent>

            <TabsContent value='rejected' className='space-y-4'>
              {rejected.length === 0 ? (
                <p className='py-12 text-center text-muted-foreground'>No rejected applications.</p>
              ) : (
                rejected.map((app) => (
                  <ApplicationCard key={app.id} app={app} acting={null} />
                ))
              )}
            </TabsContent>
          </Tabs>
        )}
      </Main>
    </>
  )
}
