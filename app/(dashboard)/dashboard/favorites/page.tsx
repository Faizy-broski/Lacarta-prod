'use client'
import RoleGuard from '@/lib/auth/role.guard'
import { FavouritesPage } from '@/features/favourites/index'

export default function Page() {
  return (
    <RoleGuard allowed={['subscriber']}>
      <FavouritesPage />
    </RoleGuard>
  )
}
