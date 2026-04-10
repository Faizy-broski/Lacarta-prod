import RoleGuard from '@/lib/auth/role.guard'
import { StorySubmissionsContent } from '@/features/story-submissions'

export default function StorySubmissionsPage() {
  return (
    <RoleGuard allowed={['owner', 'admin', 'assistant', 'editor']}>
      <StorySubmissionsContent />
    </RoleGuard>
  )
}
