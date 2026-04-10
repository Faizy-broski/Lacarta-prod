import RoleGuard from '@/lib/auth/role.guard'
import { ClientStoryCreatePage } from '@/features/my-stories/ClientStoryCreatePage'

export default function CreateStoryPage() {
  return (
    <RoleGuard allowed={['client']}>
      <ClientStoryCreatePage />
    </RoleGuard>
  )
}
