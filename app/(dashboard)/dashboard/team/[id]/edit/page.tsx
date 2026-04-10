import { use } from 'react'
import { notFound } from 'next/navigation'
import { fetchTeamMemberById } from '@/lib/services/team.service'
import { TeamMemberForm } from '@/features/team/TeamMemberForm'

export const metadata = { title: 'Edit Team Member | Lacarta Dashboard' }

export default function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  async function PageContent() {
    const member = await fetchTeamMemberById(id)
    if (!member) notFound()
    return <TeamMemberForm member={member} />
  }

  return <PageContent />
}
