'use client'
export const dynamic = 'force-dynamic'

import { use } from 'react'
import { ArticleEditPage } from '@/features/content/article/ArticleEditPage'

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  return <ArticleEditPage id={id} />
}
