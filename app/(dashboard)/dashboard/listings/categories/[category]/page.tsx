import RoleGuard from '@/lib/auth/role.guard'
import { ListingCategoriesPage } from '@/features/listings/ListingCategoriesPage'

// Converts a URL slug to a human-readable display name
// e.g. 'real_estate' → 'Real Estate', 'gastronomy' → 'Gastronomy'
function slugToDisplayName(slug: string): string {
  return slug.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export default async function CategoryManagePage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  return (
    <RoleGuard allowed={['owner', 'admin', 'assistant', 'editor']}>
      <ListingCategoriesPage
        listingType={category}
        displayName={slugToDisplayName(category)}
      />
    </RoleGuard>
  )
}
