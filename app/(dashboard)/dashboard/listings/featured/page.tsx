import RoleGuard from '@/lib/auth/role.guard'
import { FeaturedListingsManage } from '@/features/listings/featured/FeaturedListingsManage'

export default function FeaturedListingsPage() {
  return (
    <RoleGuard allowed={['owner', 'admin', 'assistant', 'editor']}>
      <FeaturedListingsManage />
    </RoleGuard>
  )
}
