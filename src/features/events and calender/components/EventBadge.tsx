import { Badge } from '@/components/ui/badge'

type EventCategory = 'music' | 'art' | 'food' | 'culture' | 'festivals' | 'sports' | 'business' | string

interface EventBadgeProps {
  category: EventCategory
}

const categoryStyles: Record<string, string> = {
  music: 'bg-purple-100 text-purple-700',
  art: 'bg-blue-100 text-blue-700',
  food: 'bg-green-100 text-green-700',
  culture: 'bg-yellow-100 text-yellow-700',
  festivals: 'bg-red-100 text-red-700',
  sports: 'bg-cyan-100 text-cyan-700',
  business: 'bg-gray-100 text-gray-700',
}

export default function EventBadge({ category }: EventBadgeProps) {
  const style = categoryStyles[category.toLowerCase()] ?? 'bg-gold/10 text-gold'
  return (
    <Badge variant='secondary' className={`rounded-full font-normal capitalize ${style}`}>
      {category}
    </Badge>
  )
}
