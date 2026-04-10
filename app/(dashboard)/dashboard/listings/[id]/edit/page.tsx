'use client'
export const dynamic = 'force-dynamic'
import { Suspense } from 'react'
import { ListingFormPage } from '@/features/listings/ListingFormPage'

export default function EditListingPage() {
  return (
    <Suspense>
      <ListingFormPage />
    </Suspense>
  )
}
