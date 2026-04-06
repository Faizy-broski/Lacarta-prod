'use client'

import { useEffect, useState } from 'react'
import {
  Edit,
  Eye,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { fetchArticles, type Article } from '@/lib/services/articles.service'

export default function ArticleTable() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticles({ limit: 10 }).then((data) => {
      setArticles(data)
      setLoading(false)
    })
  }, [])
  return (
    <Card>
      <CardHeader className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <CardTitle className='font-antigua text-xl'>Articles</CardTitle>
        <Button variant='link' className='self-start text-red sm:self-auto'>
          View All →
        </Button>
      </CardHeader>

      <CardContent className='px-5'>
        {loading ? (
          <div className='flex items-center justify-center py-12'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          </div>
        ) : articles.length === 0 ? (
          <div className='py-12 text-center text-muted-foreground'>
            No articles yet. Create your first article to get started.
          </div>
        ) : (
        <div className='overflow-x-auto'>
          <Table className='min-w-[800px]'>
            <TableHeader className='hidden md:table-header-group'>
              <TableRow className='text-gray-600'>
                <TableHead className='w-[250px] text-gray-600'>
                  ARTICLE
                </TableHead>
                <TableHead className='text-gray-600'>CATEGORY</TableHead>
                <TableHead className='text-gray-600'>AUTHOR</TableHead>
                <TableHead className='text-gray-600'>STATUS</TableHead>
                <TableHead className='text-gray-600'>VIEWS</TableHead>
                <TableHead className='text-gray-600'>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {articles.map((article) => (
                <TableRow
                  key={article.id}
                  className='flex flex-col border-b text-gray-600 md:table-row'
                >
                  {/* ARTICLE */}
                  <TableCell className='flex items-center gap-3'>
                    {article.cover_image ? (
                      <img src={article.cover_image} alt='' className='h-12 w-12 rounded-lg object-cover' />
                    ) : (
                      <div className='h-12 w-12 overflow-hidden rounded-lg bg-gray-800' />
                    )}
                    <div className='font-normal text-gray-800 dark:text-gray-200'>
                      {article.title}
                    </div>
                  </TableCell>

                  {/* Mobile Layout */}
                  <TableCell className='p-0 md:hidden' colSpan={6}>
                    <div className='flex flex-col gap-2 px-4 pb-4 text-sm'>
                      <span>
                        <strong>Category:</strong> {article.category?.name ?? '—'}
                      </span>
                      <span>
                        <strong>Author:</strong> {article.author?.full_name ?? '—'}
                      </span>
                      <span className='flex items-center gap-2'>
                        <strong>Status:</strong>
                        <Badge
                          className={cn(
                            'rounded-full',
                            article.status === 'published' &&
                              'bg-green/20 text-green',
                            article.status === 'scheduled' &&
                              'bg-gold/20 text-gold',
                            article.status === 'draft' &&
                              'bg-muted text-muted-foreground'
                          )}
                        >
                          {article.status}
                        </Badge>
                      </span>
                      <span>
                        <strong>Views:</strong> {article.views.toLocaleString()}
                      </span>
                    </div>
                  </TableCell>

                  {/* Desktop Only Cells */}
                  <TableCell className='hidden md:table-cell'>
                    {article.category?.name ?? '—'}
                  </TableCell>

                  <TableCell className='hidden md:table-cell'>
                    {article.author?.full_name ?? '—'}
                  </TableCell>

                  <TableCell className='hidden md:table-cell'>
                    <Badge
                      className={cn(
                        article.status === 'published' &&
                          'bg-green/20 text-green',
                        article.status === 'scheduled' &&
                          'bg-gold/20 text-gold',
                        article.status === 'draft' &&
                          'bg-muted text-muted-foreground'
                      )}
                    >
                      {article.status}
                    </Badge>
                  </TableCell>

                  <TableCell className='hidden md:table-cell'>
                    {article.views.toLocaleString()}
                  </TableCell>

                  <TableCell className='flex justify-end gap-2 p-4 md:table-cell md:text-right'>
                    <Button variant='ghost' size='icon'>
                      <Eye className='h-4 w-4' />
                    </Button>
                    <Button variant='ghost' size='icon'>
                      <Edit className='h-4 w-4' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        )}
      </CardContent>
    </Card>
  )
}
