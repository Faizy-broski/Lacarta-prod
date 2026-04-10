import RoleGuard from '@/lib/auth/role.guard'
import { SubmissionEditPage } from '@/features/story-submissions/SubmissionEditPage'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditSubmissionPage({ params }: Props) {
  const { id } = await params
  return (
    <RoleGuard allowed={['owner', 'admin', 'assistant', 'editor']}>
      <SubmissionEditPage id={id} />
    </RoleGuard>
  )
}
