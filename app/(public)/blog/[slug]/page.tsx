'use client'
import { use } from 'react'
import BlogDetailPage from '@/portal/pages/BlogDetailPage'

interface Props {
  params: Promise<{ slug: string }>
}

export default function BlogArticlePage({ params }: Props) {
  const { slug } = use(params)
  return <BlogDetailPage slug={slug} />
}
