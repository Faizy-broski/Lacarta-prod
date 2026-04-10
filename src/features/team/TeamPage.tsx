'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2, GripVertical } from 'lucide-react'
import { toast } from 'sonner'
import { fetchTeamMembers, deleteTeamMember, updateTeamMember, type TeamMember } from '@/lib/services/team.service'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export function TeamPage() {
  const router = useRouter()
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = () => {
    setLoading(true)
    fetchTeamMembers(false).then((data) => {
      setMembers(data)
      setLoading(false)
    })
  }

  useEffect(() => { load() }, [])

  const handleTogglePublish = async (member: TeamMember) => {
    try {
      await updateTeamMember(member.id, { is_published: !member.is_published })
      setMembers((prev) =>
        prev.map((m) => m.id === member.id ? { ...m, is_published: !m.is_published } : m)
      )
      toast.success(member.is_published ? 'Member hidden' : 'Member published')
    } catch {
      toast.error('Failed to update visibility')
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await deleteTeamMember(deleteId)
      setMembers((prev) => prev.filter((m) => m.id !== deleteId))
      toast.success('Team member deleted')
    } catch {
      toast.error('Failed to delete team member')
    } finally {
      setDeleting(false)
      setDeleteId(null)
    }
  }

  return (
    <>
      <Header />
      <Main>
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='font-antigua text-2xl font-bold tracking-tight'>Our Team</h1>
            <p className='mt-1 text-sm text-muted-foreground'>
              Manage team members shown on the About Us page.
            </p>
          </div>
          <Button
            onClick={() => router.push('/dashboard/team/new')}
            className='bg-gradient-to-r from-[#CF9921] to-[#D2BB6B] text-white hover:brightness-110'
          >
            <Plus className='mr-2 h-4 w-4' />
            Add Member
          </Button>
        </div>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='font-antigua text-xl'>
              Team Members
              {!loading && (
                <span className='ml-2 text-sm font-normal text-muted-foreground'>
                  ({members.length})
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className='p-0'>
            {loading ? (
              <div className='flex items-center justify-center py-16'>
                <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
              </div>
            ) : members.length === 0 ? (
              <div className='py-16 text-center text-sm text-muted-foreground'>
                No team members yet.{' '}
                <button
                  onClick={() => router.push('/dashboard/team/new')}
                  className='text-gold underline-offset-2 hover:underline'
                >
                  Add the first one
                </button>
              </div>
            ) : (
              <div className='divide-y'>
                {members.map((member) => (
                  <div
                    key={member.id}
                    className='flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors'
                  >
                    <GripVertical className='h-4 w-4 flex-shrink-0 text-muted-foreground/40' />

                    {/* Photo */}
                    {member.photo_url ? (
                      <img
                        src={member.photo_url}
                        alt={member.name}
                        className='h-12 w-12 flex-shrink-0 rounded-full object-cover object-top'
                      />
                    ) : (
                      <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-muted text-lg font-semibold text-muted-foreground'>
                        {member.name.charAt(0)}
                      </div>
                    )}

                    {/* Info */}
                    <div className='min-w-0 flex-1'>
                      <div className='flex items-center gap-2'>
                        <span className='font-medium text-foreground'>{member.name}</span>
                        <Badge
                          className={
                            member.is_published
                              ? 'bg-green/20 text-green text-xs'
                              : 'bg-muted text-muted-foreground text-xs'
                          }
                        >
                          {member.is_published ? 'Published' : 'Hidden'}
                        </Badge>
                      </div>
                      <p className='mt-0.5 truncate text-sm text-muted-foreground'>{member.role}</p>
                    </div>

                    {/* Order */}
                    <span className='hidden text-xs text-muted-foreground sm:block'>
                      #{member.display_order}
                    </span>

                    {/* Actions */}
                    <div className='flex items-center gap-1'>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 text-muted-foreground hover:text-foreground'
                        onClick={() => handleTogglePublish(member)}
                        title={member.is_published ? 'Hide member' : 'Publish member'}
                      >
                        {member.is_published ? <Eye className='h-4 w-4' /> : <EyeOff className='h-4 w-4' />}
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 text-muted-foreground hover:text-foreground'
                        onClick={() => router.push(`/dashboard/team/${member.id}/edit`)}
                        title='Edit member'
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 text-muted-foreground hover:text-destructive'
                        onClick={() => setDeleteId(member.id)}
                        title='Delete member'
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </Main>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete team member?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the member from the About Us page. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              {deleting ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
