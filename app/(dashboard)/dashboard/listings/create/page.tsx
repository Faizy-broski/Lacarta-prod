'use client'
import { Suspense } from 'react'
import { ListingFormPage } from '@/features/listings/ListingFormPage'

export default function CreateListingPage() {
  return (
    <Suspense>
      <ListingFormPage />
    </Suspense>
  )
}
