'use client'
import { useParams } from 'next/navigation'
import GastronomyDetails from '@public/pages/Detailed-Gastronomy'

export default function DetailedGastronomyPage() {
  const params = useParams()
  return <GastronomyDetails slug={params?.slug as string} />
}
