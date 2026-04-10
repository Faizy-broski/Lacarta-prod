'use client'
import { useParams } from 'next/navigation'
import BeachDetails from '@public/pages/Detailed-Beach'

export default function DetailedBeachPage() {
  const params = useParams()
  return <BeachDetails slug={params?.slug as string} />
}
