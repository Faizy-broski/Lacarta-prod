'use client'
import { useParams } from 'next/navigation'
import DetailedHotel from '@public/pages/Detailed-Hotel'

export default function DetailedHotelPage() {
  const params = useParams()
  return <DetailedHotel slug={params?.slug as string} />
}
