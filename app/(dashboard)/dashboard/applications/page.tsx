import RoleGuard from '@/lib/auth/role.guard'
import { ApplicationsPage } from '@/features/applications'

export default function Page() {
  return (
    <RoleGuard allowed={['owner', 'admin', 'assistant']}>
      <ApplicationsPage />
    </RoleGuard>
  )
}
