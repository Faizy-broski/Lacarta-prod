'use client'
import { useParams } from 'next/navigation'
import ActivityDetails from '@public/pages/Detailed-Activity'

export default function DetailedActivityPage() {
  const params = useParams()
  return <ActivityDetails slug={params?.slug as string} />
}
