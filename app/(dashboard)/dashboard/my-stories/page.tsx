import RoleGuard from '@/lib/auth/role.guard'
import { MyStoriesPage } from '@/features/my-stories'

export default function MyStoriesListPage() {
  return (
    <RoleGuard allowed={['client']}>
      <MyStoriesPage />
    </RoleGuard>
  )
}
