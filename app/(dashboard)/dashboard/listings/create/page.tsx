import { Suspense } from 'react'
import { ListingFormPage } from '@/features/listings/ListingFormPage'

export const dynamic = 'force-dynamic'

export default function CreateListingPage() {
  return (
    <Suspense>
      <ListingFormPage />
    </Suspense>
  )
}
