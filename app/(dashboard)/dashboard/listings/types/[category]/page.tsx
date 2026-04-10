import RoleGuard from '@/lib/auth/role.guard'
import { ListingTypesPage } from '@/features/listings/ListingTypesPage'

function slugToDisplayName(slug: string): string {
  return slug.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export default async function TypesManagePage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  return (
    <RoleGuard allowed={['owner', 'admin', 'assistant', 'editor']}>
      <ListingTypesPage
        listingType={category}
        displayName={slugToDisplayName(category)}
      />
    </RoleGuard>
  )
}
