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
  NotebookPen,
  Inbox,
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
                { title: 'Story Submissions', url: '/dashboard/story-submissions', icon: Inbox },
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
              icon: Building2,
              items: [
                { title: 'All Hotels', url: '/dashboard/listings?category=hotels' },
                { title: 'Sub-Categories', url: '/dashboard/listings/categories/hotels' },
                { title: 'Types', url: '/dashboard/listings/types/hotels' },
              ],
            },
            {
              title: 'Beaches',
              icon: LayoutList,
              items: [
                { title: 'All Beaches', url: '/dashboard/listings?category=beaches' },
                { title: 'Sub-Categories', url: '/dashboard/listings/categories/beaches' },
                { title: 'Types', url: '/dashboard/listings/types/beaches' },
              ],
            },
            {
              title: 'Activities',
              icon: Command,
              items: [
                { title: 'All Activities', url: '/dashboard/listings?category=activities' },
                { title: 'Sub-Categories', url: '/dashboard/listings/categories/activities' },
                { title: 'Types', url: '/dashboard/listings/types/activities' },
              ],
            },
            {
              title: 'Boating',
              icon: Heart,
              items: [
                { title: 'All Boating', url: '/dashboard/listings?category=boating' },
                { title: 'Sub-Categories', url: '/dashboard/listings/categories/boating' },
                { title: 'Types', url: '/dashboard/listings/types/boating' },
              ],
            },
            {
              title: 'Gastronomy',
              icon: ListTodo,
              items: [
                { title: 'All Gastronomy', url: '/dashboard/listings?category=gastronomy' },
                { title: 'Sub-Categories', url: '/dashboard/listings/categories/gastronomy' },
                { title: 'Types', url: '/dashboard/listings/types/gastronomy' },
              ],
            },
            {
              title: 'Real Estate',
              icon: Package,
              items: [
                { title: 'All Real Estate', url: '/dashboard/listings?category=real_estate' },
                { title: 'Sub-Categories', url: '/dashboard/listings/categories/real_estate' },
                { title: 'Types', url: '/dashboard/listings/types/real_estate' },
              ],
            },
            { title: 'Users', url: '/dashboard/users', icon: Users },
            { title: 'Applications', url: '/dashboard/applications', icon: ClipboardCheck },
            { title: 'Subscriptions', url: '/dashboard/subscriptions', icon: Package },
            { title: 'Filters', url: '/dashboard/filters', icon: Package },
            { title: 'Comments', url: '/dashboard/comments', icon: MessageSquare },
            { title: 'Ad Manager', url: '/dashboard/ad-manager', icon: Megaphone },
            { title: 'Tasks', url: '/dashboard/tasks', icon: ClipboardList },
            { title: 'Our Team', url: '/dashboard/team', icon: Users },
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
                { title: 'Story Submissions', url: '/dashboard/story-submissions', icon: Inbox },
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
              icon: Building2,
              items: [
                { title: 'All Hotels', url: '/dashboard/listings?category=hotels' },
                { title: 'Sub-Categories', url: '/dashboard/listings/categories/hotels' },
                { title: 'Types', url: '/dashboard/listings/types/hotels' },
              ],
            },
            {
              title: 'Beaches',
              icon: LayoutList,
              items: [
                { title: 'All Beaches', url: '/dashboard/listings?category=beaches' },
                { title: 'Sub-Categories', url: '/dashboard/listings/categories/beaches' },
                { title: 'Types', url: '/dashboard/listings/types/beaches' },
              ],
            },
            {
              title: 'Activities',
              icon: Command,
              items: [
                { title: 'All Activities', url: '/dashboard/listings?category=activities' },
                { title: 'Sub-Categories', url: '/dashboard/listings/categories/activities' },
                { title: 'Types', url: '/dashboard/listings/types/activities' },
              ],
            },
            {
              title: 'Boating',
              icon: Heart,
              items: [
                { title: 'All Boating', url: '/dashboard/listings?category=boating' },
                { title: 'Sub-Categories', url: '/dashboard/listings/categories/boating' },
                { title: 'Types', url: '/dashboard/listings/types/boating' },
              ],
            },
            {
              title: 'Gastronomy',
              icon: ListTodo,
              items: [
                { title: 'All Gastronomy', url: '/dashboard/listings?category=gastronomy' },
                { title: 'Sub-Categories', url: '/dashboard/listings/categories/gastronomy' },
                { title: 'Types', url: '/dashboard/listings/types/gastronomy' },
              ],
            },
            {
              title: 'Real Estate',
              icon: Package,
              items: [
                { title: 'All Real Estate', url: '/dashboard/listings?category=real_estate' },
                { title: 'Sub-Categories', url: '/dashboard/listings/categories/real_estate' },
                { title: 'Types', url: '/dashboard/listings/types/real_estate' },
              ],
            },
            { title: 'Users', url: '/dashboard/users', icon: Users },
            { title: 'Applications', url: '/dashboard/applications', icon: ClipboardCheck },
            { title: 'Subscriptions', url: '/dashboard/subscriptions', icon: Package },
            { title: 'Filters', url: '/dashboard/filters', icon: Package },
            { title: 'Comments', url: '/dashboard/comments', icon: MessageSquare },
            { title: 'Ad Manager', url: '/dashboard/ad-manager', icon: Megaphone },
            { title: 'Our Team', url: '/dashboard/team', icon: Users },
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
                { title: 'Story Submissions', url: '/dashboard/story-submissions', icon: Inbox },
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
            {
              title: 'My Listings',
              icon: Building2,
              items: [
                { title: 'All Listings', url: '/dashboard/my-listings' },
                { title: 'Create Listing', url: '/dashboard/listings/create' },
              ],
            },
            {
              title: 'My Stories',
              icon: NotebookPen,
              items: [
                { title: 'All Stories', url: '/dashboard/my-stories' },
                { title: 'Write Story', url: '/dashboard/my-stories/create' },
              ],
            },
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
