import { TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { ReactNode } from 'react'

interface StatCardProps {
  title: string
  quantity: string
  subtitle: string
  icon: ReactNode
  color: string
  bg: string
  trend?: string
}

export default function StatCard({ title, quantity, subtitle, icon, color, bg, trend }: StatCardProps) {
  return (
    <Card className='border-gray-150 border-[1.5px] bg-white p-4 shadow-xs'>
      <CardHeader className='space-y-0 px-0 pb-0'>
        <div className='flex items-center justify-between'>
          <div className={`${bg} w-fit rounded-lg p-2`}>{icon}</div>
          {trend && (
            <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${color} ${bg}`}>
              <TrendingUp className='h-3 w-3' />
              {trend}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className='px-0 pt-3'>
        <div className='font-georgia mb-1 text-3xl font-extrabold'>{quantity}</div>
        <p className='text-xs font-semibold text-muted-foreground'>{subtitle}</p>
        <h2 className={`text-md font-semibold ${color}`}>{title}</h2>
      </CardContent>
    </Card>
  )
}
