'use client'
import { useParams } from 'next/navigation'
import RealEstateDetails from '@public/pages/Detailed-realEstate'

export default function DetailedRealEstatePage() {
  const params = useParams()
  return <RealEstateDetails slug={params?.slug as string} />
}
