import {
  LayoutDashboard,
  ListTodo,
  Settings,
  UserCog,
  UserCircle,
  Users,
  LayoutList,
  Command,
  Heart,
  Download,
  Building2,
  BarChart2,
  Package,
  Calendar,
  Tag,
  Megaphone,
  MessageSquare,
  ClipboardList,
  ClipboardCheck,
} from 'lucide-react'

export type UserRole =
  | 'owner'
  | 'admin'
  | 'assistant'
  | 'editor'
  | 'client'
  | 'subscriber'

export function getSidebarNavForRole(role: UserRole | string | undefined) {
  switch (role) {
    case 'owner':
      return [
        {
          items: [
            {
              title: 'Dashboard',
              url: '/dashboard',
              icon: LayoutDashboard,
            },
            {
              title: 'Analytics',
              icon: BarChart2,
              items: [
                { title: 'Owner Analytics', url: '/dashboard/analytics/owner-analytics' },
                { title: 'Admin Analytics', url: '/dashboard/analytics/admin-analytics' },
              ],
            },
            {
              title: 'Content',
              icon: ListTodo,
              items: [
                { title: 'Articles', url: '/dashboard/content' },
                { title: 'Drafts', url: '/dashboard/content/drafts' },
                { title: 'Categories', url: '/dashboard/content/categories' },
              ],
            },
            {
              title: 'Events & Calendars',
              url: '/dashboard/events-and-calenders',
              icon: Calendar,
            },
            {
              title: 'Deals',
              url: '/dashboard/deals',
              icon: Tag,
            },
            {
              title: 'Hotels',
              url: '/dashboard/listings?category=hotels',
              icon: Building2,
            },
            {
              title: 'Beaches',
              url: '/dashboard/listings?category=beaches',
              icon: LayoutList,
            },
            {
              title: 'Activities',
              url: '/dashboard/listings?category=activities',
              icon: Command,
            },
            {
              title: 'Boating',
              url: '/dashboard/listings?category=boating',
              icon: Heart,
            },
            {
              title: 'Gastronomy',
              url: '/dashboard/listings?category=gastronomy',
              icon: ListTodo,
            },
            {
              title: 'Real Estate',
              url: '/dashboard/listings?category=real_estate',
              icon: Package,
            },
            { title: 'Users', url: '/dashboard/users', icon: Users },
            { title: 'Applications', url: '/dashboard/applications', icon: ClipboardCheck },
            { title: 'Subscriptions', url: '/dashboard/subscriptions', icon: Package },
            { title: 'Filters', url: '/dashboard/filters', icon: Package },
            { title: 'Comments', url: '/dashboard/comments', icon: MessageSquare },
            { title: 'Ad Manager', url: '/dashboard/ad-manager', icon: Megaphone },
            { title: 'Tasks', url: '/dashboard/tasks', icon: ClipboardList },
            {
              title: 'Settings',
              icon: Settings,
              items: [{ title: 'Profile', url: '/dashboard/settings', icon: UserCog }],
            },
          ],
        },
      ]

    case 'admin':
      return [
        {
          items: [
            {
              title: 'Dashboard',
              url: '/dashboard',
              icon: LayoutDashboard,
            },
            {
              title: 'Content',
              icon: ListTodo,
              items: [
                { title: 'Articles', url: '/dashboard/content' },
                { title: 'Drafts', url: '/dashboard/content/drafts' },
                { title: 'Categories', url: '/dashboard/content/categories' },
              ],
            },
            {
              title: 'Events & Calendars',
              url: '/dashboard/events-and-calenders',
              icon: Calendar,
            },
            {
              title: 'Deals',
              url: '/dashboard/deals',
              icon: Tag,
            },
            {
              title: 'Listings',
              url: '/dashboard/listings',
              icon: LayoutList,
            },
            { title: 'Users', url: '/dashboard/users', icon: Users },
            { title: 'Applications', url: '/dashboard/applications', icon: ClipboardCheck },
            { title: 'Subscriptions', url: '/dashboard/subscriptions', icon: Package },
            { title: 'Filters', url: '/dashboard/filters', icon: Package },
            { title: 'Comments', url: '/dashboard/comments', icon: MessageSquare },
            { title: 'Ad Manager', url: '/dashboard/ad-manager', icon: Megaphone },
            {
              title: 'Settings',
              icon: Settings,
              items: [{ title: 'Profile', url: '/dashboard/settings', icon: UserCog }],
            },
          ],
        },
      ]

    case 'assistant':
      return [
        {
          items: [
            {
              title: 'Analytics',
              url: '/dashboard/analytics/admin-analytics',
              icon: BarChart2,
            },
            {
              title: 'Content',
              icon: ListTodo,
              items: [
                { title: 'Articles', url: '/dashboard/content' },
                { title: 'Drafts', url: '/dashboard/content/drafts' },
                { title: 'Categories', url: '/dashboard/content/categories' },
              ],
            },
            {
              title: 'Events & Calendars',
              url: '/dashboard/events-and-calenders',
              icon: Calendar,
            },
            {
              title: 'Deals',
              url: '/dashboard/deals',
              icon: Tag,
            },
            { title: 'Users', url: '/dashboard/users', icon: Users },
            { title: 'Applications', url: '/dashboard/applications', icon: ClipboardCheck },
            {
              title: 'Settings',
              icon: Settings,
              items: [{ title: 'Profile', url: '/dashboard/settings', icon: UserCog }],
            },
          ],
        },
      ]

    case 'editor':
      return [
        {
          items: [
            {
              title: 'Content',
              icon: ListTodo,
              items: [
                { title: 'Articles', url: '/dashboard/content' },
                { title: 'Drafts', url: '/dashboard/content/drafts' },
                { title: 'Categories', url: '/dashboard/content/categories' },
              ],
            },
            {
              title: 'Settings',
              icon: Settings,
              items: [{ title: 'Profile', url: '/dashboard/settings', icon: UserCog }],
            },
          ],
        },
      ]

    case 'client':
      return [
        {
          items: [
            { title: 'My Listings', url: '/dashboard/my-listings', icon: Building2 },
            {
              title: 'Events & Calendars',
              url: '/dashboard/events-and-calenders',
              icon: Calendar,
            },
            { title: 'Deals', url: '/dashboard/deals', icon: Tag },
            { title: 'Subscriptions', url: '/dashboard/subscriptions', icon: Package },
            {
              title: 'Settings',
              icon: Settings,
              items: [{ title: 'Profile', url: '/dashboard/settings', icon: UserCog }],
            },
          ],
        },
      ]

    default:
      return []
  }
}

export const sidebarData = {
  user: {
    name: 'La Carta',
    email: 'admin@lacarta.co',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'La Carta',
      logo: Command,
      plan: 'Tourism Platform',
    },
  ],
}
