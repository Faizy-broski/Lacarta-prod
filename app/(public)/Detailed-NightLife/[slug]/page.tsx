'use client'
import { useParams } from 'next/navigation'
import NightlifeDetails from '@public/pages/Detailed-NightLife'

export default function DetailedNightLifePage() {
  const params = useParams()
  return <NightlifeDetails slug={params?.slug as string} />
}
