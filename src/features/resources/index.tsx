'use client'

import { useEffect, useState } from 'react'
import { Download, FileText, Map, BookOpen, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { fetchResources, incrementDownload, type Resource } from '@/lib/services/resources.service'

const fileTypeIcon: Record<string, typeof FileText> = {
  pdf: FileText,
  doc: BookOpen,
  zip: Download,
  image: Map,
  other: FileText,
}

export function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResources({ status: 'active' }).then((data) => {
      setResources(data)
      setLoading(false)
    })
  }, [])

  const handleDownload = async (resource: Resource) => {
    await incrementDownload(resource.id)
    setResources((prev) =>
      prev.map((r) => (r.id === resource.id ? { ...r, downloads: r.downloads + 1 } : r))
    )
    window.open(resource.file_url, '_blank')
  }

  return (
    <>
      <Header />

      <Main>
        <div className='mb-6 flex h-20 items-center justify-between'>
          <div>
            <h1 className='font-antigua text-3xl font-bold tracking-tight'>
              Resources
            </h1>
            <p className='text-xs text-muted-foreground'>
              Download guides, planners and travel tools.
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <Badge variant='secondary' className='gap-1'>
              <Download className='h-3 w-3' />
              {loading ? '…' : resources.length} available
            </Badge>
          </div>
        </div>

        {loading ? (
          <div className='flex items-center justify-center py-16'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          </div>
        ) : resources.length === 0 ? (
          <div className='py-16 text-center text-muted-foreground'>
            No resources available yet.
          </div>
        ) : (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {resources.map((resource) => {
            const Icon = fileTypeIcon[resource.file_type] ?? FileText
            return (
              <Card key={resource.id} className='group cursor-pointer transition-shadow hover:shadow-md'>
                <CardHeader className='pb-2'>
                  <div className='flex items-start justify-between gap-2'>
                    <div className='flex items-center gap-2'>
                      <div className='rounded-lg bg-[#CF9921]/10 p-2'>
                        <Icon className='h-4 w-4 text-[#CF9921]' />
                      </div>
                      <Badge variant='outline' className='text-[10px]'>
                        {resource.category?.name ?? resource.file_type.toUpperCase()}
                      </Badge>
                    </div>
                    {resource.file_size && (
                      <span className='text-[10px] text-muted-foreground'>
                        {resource.file_size}
                      </span>
                    )}
                  </div>
                  <h2 className='font-antigua pt-2 text-base font-semibold leading-snug tracking-tight'>
                    {resource.title}
                  </h2>
                </CardHeader>
                <CardContent className='pt-0'>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs text-muted-foreground'>
                      {resource.downloads.toLocaleString()} downloads
                    </span>
                    <Button
                      size='sm'
                      className='h-7 gap-1.5 bg-[#CF9921] px-3 text-xs text-white hover:bg-[#CF9921]/90'
                      onClick={() => handleDownload(resource)}
                    >
                      <Download className='h-3 w-3' />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        )}
      </Main>
    </>
  )
}
