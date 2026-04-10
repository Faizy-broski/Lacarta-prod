'use client'
import { useParams } from 'next/navigation'
import BoatingDetails from '@public/pages/Detailed-Boating'

export default function DetailedBoatingPage() {
  const params = useParams()
  return <BoatingDetails slug={params?.slug as string} />
}
