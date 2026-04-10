import RoleGuard from '@/lib/auth/role.guard'
import { ClientStoryEditPage } from '@/features/my-stories/ClientStoryEditPage'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditStoryPage({ params }: Props) {
  const { id } = await params
  return (
    <RoleGuard allowed={['client']}>
      <ClientStoryEditPage id={id} />
    </RoleGuard>
  )
}
