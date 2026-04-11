import RoleGuard from '@/lib/auth/role.guard'
import { ListingSubmissionsContent } from '@/features/listing-submissions'

export default function ListingSubmissionsPage() {
  return (
    <RoleGuard allowed={['owner', 'admin', 'assistant', 'editor']}>
      <ListingSubmissionsContent />
    </RoleGuard>
  )
}
