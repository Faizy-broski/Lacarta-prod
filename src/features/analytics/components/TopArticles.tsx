'use client'
import { useEffect, useState } from 'react'
import { Eye, Heart, MessageCircle, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getTopArticles } from '@/lib/services/analytics.service'

const CATEGORY_COLORS: Record<string, string> = {
  beaches: 'bg-yellow-100 text-yellow-700',
  gastronomy: 'bg-orange-100 text-orange-700',
  hotels: 'bg-red-100 text-red-600',
  activities: 'bg-green-100 text-green-700',
  boating: 'bg-blue-100 text-blue-700',
  'real estate': 'bg-purple-100 text-purple-700',
}

export function TopArticles({ className }: { className?: string }) {
  const [articles, setArticles] = useState<Awaited<ReturnType<typeof getTopArticles>>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTopArticles(5).then((data) => {
      setArticles(data)
      setLoading(false)
    })
  }, [])

  return (
    <Card className={`rounded-xl bg-[#F9FAFB] shadow-sm ${className ?? ''}`}>
      <CardHeader className='pb-2'>
        <h3 className='font-antigua text-lg font-semibold'>Top Performing Articles</h3>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className='flex items-center justify-center py-12'>
            <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
          </div>
        ) : articles.length === 0 ? (
          <p className='py-12 text-center text-sm text-muted-foreground'>No published articles yet.</p>
        ) : (
          <div className='space-y-6'>
            {articles.map((article, index) => {
              const catName = article.category?.name ?? ''
              const colorClass = CATEGORY_COLORS[catName.toLowerCase()] ?? 'bg-gray-100 text-gray-700'
              return (
                <div key={article.id} className='flex items-center justify-between'>
                  <div className='flex items-center gap-4'>
                    <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#CF9921]/20 text-xs font-bold text-[#CF9921]'>
                      {index + 1}
                    </span>
                    <div>
                      <p className='text-sm font-normal text-gray-900'>{article.title}</p>
                      {catName && (
                        <Badge className={`mt-1 rounded-full px-3 py-0.5 text-xs font-medium ${colorClass}`}>
                          {catName}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className='flex items-center gap-4 text-sm text-gray-500'>
                    <div className='flex items-center gap-1'>
                      <Eye className='h-4 w-4' />
                      {article.views.toLocaleString()}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
