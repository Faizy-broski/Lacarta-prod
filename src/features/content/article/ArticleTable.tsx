'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Edit, Eye, Loader2, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'
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
import { toast } from 'sonner'
import { fetchArticles, deleteArticle, type Article } from '@/lib/services/articles.service'

const PAGE_SIZE = 10

export default function ArticleTable() {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const totalPages = Math.ceil(total / PAGE_SIZE)

  useEffect(() => {
    setLoading(true)
    fetchArticles({ limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE }).then(({ articles, total }) => {
      setArticles(articles)
      setTotal(total)
      setLoading(false)
    })
  }, [page])

  const confirmDelete = (article: Article) => {
    toast(`Delete "${article.title}"?`, {
      description: 'This action cannot be undone.',
      position: 'top-center',
      action: {
        label: 'Delete',
        onClick: () => performDelete(article),
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
      actionButtonStyle: { backgroundColor: '#ef4444', color: '#fff' },
      duration: 8000,
    })
  }

  const performDelete = async (article: Article) => {
    setDeletingId(article.id)
    try {
      await deleteArticle(article.id)
      setArticles((prev) => prev.filter((a) => a.id !== article.id))
      setTotal((t) => t - 1)
      toast.success('Article deleted successfully.')
    } catch {
      toast.error('Failed to delete article. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  const authorDisplay = (article: Article) => {
    const a = article.author
    if (!a) return '—'
    return a.full_name?.trim() || a.email?.trim() || '—'
  }

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-3'>
        <CardTitle className='font-antigua text-xl'>Articles</CardTitle>
        {total > 0 && (
          <span className='text-xs text-muted-foreground'>
            {total} total
          </span>
        )}
      </CardHeader>

      <CardContent className='p-0'>
        {loading ? (
          <div className='flex items-center justify-center py-12'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          </div>
        ) : articles.length === 0 ? (
          <div className='py-12 text-center text-sm text-muted-foreground'>
            No articles yet. Create your first article to get started.
          </div>
        ) : (
          <>
            <div className='overflow-x-auto'>
              <Table className='table-fixed w-full'>
                <TableHeader>
                  <TableRow className='border-b'>
                    <TableHead className='w-[38%] pl-6 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
                      Article
                    </TableHead>
                    <TableHead className='w-[16%] text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
                      Category
                    </TableHead>
                    <TableHead className='w-[20%] text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
                      Author
                    </TableHead>
                    <TableHead className='w-[14%] text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
                      Status
                    </TableHead>
                    <TableHead className='w-[12%] pr-6 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {articles.map((article) => (
                    <TableRow key={article.id} className='group border-b last:border-0 hover:bg-muted/40'>
                      {/* Article */}
                      <TableCell className='py-3 pl-6'>
                        <div className='flex items-center gap-3 min-w-0'>
                          {article.cover_image ? (
                            <img
                              src={article.cover_image}
                              alt=''
                              className='h-10 w-14 flex-shrink-0 rounded object-cover'
                            />
                          ) : (
                            <div className='h-10 w-14 flex-shrink-0 rounded bg-muted' />
                          )}
                          <span className='truncate text-sm font-medium text-foreground'>
                            {article.title}
                          </span>
                        </div>
                      </TableCell>

                      {/* Category */}
                      <TableCell className='py-3 text-sm text-muted-foreground truncate'>
                        {article.category?.name ?? '—'}
                      </TableCell>

                      {/* Author */}
                      <TableCell className='py-3 text-sm text-muted-foreground truncate'>
                        {authorDisplay(article)}
                      </TableCell>

                      {/* Status */}
                      <TableCell className='py-3'>
                        <Badge
                          className={cn(
                            'rounded-full text-xs font-medium',
                            article.status === 'published' && 'bg-green/20 text-green',
                            article.status === 'scheduled' && 'bg-gold/20 text-gold',
                            article.status === 'draft'     && 'bg-muted text-muted-foreground',
                            article.status === 'archived'  && 'bg-red/20 text-red-light'
                          )}
                        >
                          {article.status}
                        </Badge>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className='py-3 pr-6 text-right'>
                        <div className='flex items-center justify-end gap-1'>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8 text-muted-foreground hover:text-foreground'
                            onClick={() => window.open(`/blog/${article.slug}`, '_blank')}
                            title='View article'
                          >
                            <Eye className='h-4 w-4' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8 text-muted-foreground hover:text-foreground'
                            onClick={() => router.push(`/dashboard/content/articles/${article.id}/edit`)}
                            title='Edit article'
                          >
                            <Edit className='h-4 w-4' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8 text-muted-foreground hover:text-destructive'
                            onClick={() => confirmDelete(article)}
                            disabled={deletingId === article.id}
                            title='Delete article'
                          >
                            {deletingId === article.id
                              ? <Loader2 className='h-4 w-4 animate-spin' />
                              : <Trash2 className='h-4 w-4' />
                            }
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='flex items-center justify-between border-t px-6 py-3'>
                <span className='text-xs text-muted-foreground'>
                  Page {page} of {totalPages}
                </span>
                <div className='flex items-center gap-1'>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8'
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    <ChevronLeft className='h-4 w-4' />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Button
                      key={p}
                      variant={p === page ? 'default' : 'ghost'}
                      size='icon'
                      className='h-8 w-8 text-xs'
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </Button>
                  ))}
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8'
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    <ChevronRight className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
