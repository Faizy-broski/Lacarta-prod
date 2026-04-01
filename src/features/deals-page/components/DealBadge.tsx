import { Badge } from '@/components/ui/badge'

type DealStatus = 'Active' | 'Expired' | 'Scheduled' | 'Draft'

interface DealBadgeProps {
  status: DealStatus
}

const statusStyles: Record<DealStatus, string> = {
  Active: 'bg-green-50 text-green-600 border-green-200',
  Expired: 'bg-red-50 text-red-600 border-red-200',
  Scheduled: 'bg-blue-50 text-blue-600 border-blue-200',
  Draft: 'bg-yellow-50 text-yellow-600 border-yellow-200',
}

export default function DealBadge({ status }: DealBadgeProps) {
  return (
    <Badge
      variant='outline'
      className={`font-semibold text-xs ${statusStyles[status] ?? 'bg-gray-50 text-gray-600'}`}
    >
      {status}
    </Badge>
  )
}
