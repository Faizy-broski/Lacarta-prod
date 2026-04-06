import { Shield, UserCheck, Users, Edit3, Building2, UserCircle } from 'lucide-react'
import { type UserStatus } from './schema'

export const callTypes = new Map<UserStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
  ['invited', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [
    'suspended',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

export const roles = [
  {
    label: 'Owner',
    value: 'owner',
    icon: Shield,
  },
  {
    label: 'Admin',
    value: 'admin',
    icon: UserCheck,
  },
  {
    label: 'Assistant',
    value: 'assistant',
    icon: Users,
  },
  {
    label: 'Editor',
    value: 'editor',
    icon: Edit3,
  },
  {
    label: 'Client',
    value: 'client',
    icon: Building2,
  },
  {
    label: 'Subscriber',
    value: 'subscriber',
    icon: UserCircle,
  },
] as const
