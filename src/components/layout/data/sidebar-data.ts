import {
  Construction,
  LayoutDashboard,
  Bug,
  ListTodo,
  FileX,
  HelpCircle,
  Lock,
  Package,
  ServerOff,
  Settings,
  UserCog,
  UserX,
  Users,
  MessagesSquare,
  ShieldCheck,
  AudioWaveform,
  LayoutList,
  Command,
  GalleryVerticalEnd,
  Heart,
  Download,
  Building2,
  MessageSquare,
  BarChart2,
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
              title: 'Content',
              icon: ListTodo,
              items: [
                { title: 'Articles', url: '/dashboard/content' },
                { title: 'Drafts', url: '/dashboard/content/drafts' },
                { title: 'Categories', url: '/dashboard/content/categories' },
                { title: 'Featured Stories', url: '/dashboard/content/featured-stories' },
                { title: 'Travel Tools', url: '/dashboard/content/travel-tools' },
              ],
            },
            {
              title: 'Events & Calendars',
              url: '/dashboard/events-&-calenders',
              icon: Package,
            },
            // {
            //   title: 'Analytics',
            //   icon: MessagesSquare,
            //   items: [
            //     { title: 'Admin Analytics', url: '/dashboard/analytics/admin-analytics' },
            //     { title: 'Owner Analytics', url: '/dashboard/analytics/owner-analytics' },
            //   ],
            // },
            {
              title: 'Lisings',
              url: '/dashboard/listings',
              icon: LayoutList,
            },
            { title: 'Subscriptions', url: '/dashboard/subscriptions', icon: Package },
            // {
            //   title: 'Deals',
            //   icon: Users,
            //   items: [
            //     { title: 'All Deals', url: '/dashboard/deals/all-deals' },
            //     { title: 'Active Deals', url: '/dashboard/deals/active-deals' },
            //   ],
            // },
            { title: 'Filters', url: '/dashboard/filters', icon: Package },
            // { title: 'Users', url: '/dashboard/users', icon: Users },
            // { title: 'Tasks', url: '/dashboard/tasks', icon: ListTodo },
            // { title: 'Chats', url: '/dashboard/chats', icon: MessageSquare },
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
              title: 'Analytics',
              url: '/dashboard/analytics/admin-analytics',
              icon: MessagesSquare,
            },
            {
              title: 'Content',
              icon: ListTodo,
              items: [
                { title: 'Articles', url: '/dashboard/content' },
                { title: 'Drafts', url: '/dashboard/content/drafts' },
                { title: 'Categories', url: '/dashboard/content/categories' },
                { title: 'Featured Stories', url: '/dashboard/content/featured-stories' },
                { title: 'Travel Tools', url: '/dashboard/content/travel-tools' },
              ],
            },
            {
              title: 'Events & Calendars',
              url: '/dashboard/events-&-calenders',
              icon: Package,
            },
            // {
            //   title: 'Analytics',
            //   icon: MessagesSquare,
            //   items: [
            //     { title: 'Admin Analytics', url: '/dashboard/analytics/admin-analytics' },
            //   ],
            // },
            { title: 'Subscriptions', url: '/dashboard/subscriptions', icon: Package },
            // {
            //   title: 'Deals',
            //   icon: Users,
            //   items: [
            //     { title: 'All Deals', url: '/dashboard/deals/all-deals' },
            //     { title: 'Active Deals', url: '/dashboard/deals/active-deals' },
            //   ],
            // },
            { title: 'Filters', url: '/dashboard/filters', icon: Package },
            // { title: 'Users', url: '/dashboard/users', icon: Users },
            // { title: 'Tasks', url: '/dashboard/tasks', icon: ListTodo },
            // { title: 'Chats', url: '/dashboard/chats', icon: MessageSquare },
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
            // {
            //   title: 'Dashboard',
            //   url: '/dashboard/assistant/dashboard',
            //   icon: LayoutDashboard,
            // },
            {
              title: 'Content',
              icon: ListTodo,
              items: [
                { title: 'Articles', url: '/dashboard/content' },
                { title: 'Drafts', url: '/dashboard/content/drafts' },
                { title: 'Categories', url: '/dashboard/content/categories' },
                { title: 'Featured Stories', url: '/dashboard/content/featured-stories' },
                { title: 'Travel Tools', url: '/dashboard/content/travel-tools' },
              ],
            },
            {
              title: 'Events & Calendars',
              url: '/dashboard/events-&-calenders',
              icon: Package,
            },
            // {
            //   title: 'Analytics',
            //   icon: BarChart2,
            //   items: [
            //     { title: 'Admin Analytics', url: '/dashboard/analytics/admin-analytics' },
            //   ],
            // },
            // {
            //   title: 'Deals',
            //   icon: Users,
            //   items: [
            //     { title: 'All Deals', url: '/dashboard/deals/all-deals' },
            //     { title: 'Active Deals', url: '/dashboard/deals/active-deals' },
            //   ],
            // },
            // { title: 'Users', url: '/dashboard/users', icon: Users },
            // { title: 'Chats', url: '/dashboard/chats', icon: MessageSquare },
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
            // {
            //   title: 'Dashboard',
            //   url: '/dashboard/editor/dashboard',
            //   icon: LayoutDashboard,
            // },
            {
              title: 'Content',
              icon: ListTodo,
              items: [
                { title: 'Articles', url: '/dashboard/content' },
                { title: 'Drafts', url: '/dashboard/content/drafts' },
                { title: 'Categories', url: '/dashboard/content/categories' },
                { title: 'Featured Stories', url: '/dashboard/content/featured-stories' },
                { title: 'Travel Tools', url: '/dashboard/content/travel-tools' },
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
            // {
            //   title: 'Dashboard',
            //   url: '/dashboard/client/dashboard',
            //   icon: LayoutDashboard,
            // },
            { title: 'My Listings', url: '/dashboard/my-listings', icon: Building2 },
            {
              title: 'Events & Calendars',
              url: '/dashboard/events-&-calenders',
              icon: Package,
            },
            // {
            //   title: 'Deals',
            //   icon: Users,
            //   items: [{ title: 'Active Deals', url: '/dashboard/deals/active-deals' }],
            // },
            { title: 'Subscriptions', url: '/dashboard/subscriptions', icon: Package },
            {
              title: 'Settings',
              icon: Settings,
              items: [{ title: 'Profile', url: '/dashboard/settings', icon: UserCog }],
            },
          ],
        },
      ]

    case 'subscriber':
      return [
        {
          items: [
            // {
            //   title: 'Dashboard',
            //   url: '/dashboard/subscriber/dashboard',
            //   icon: LayoutDashboard,
            // },
            // {
            //   title: 'Content',
            //   icon: ListTodo,
            //   items: [{ title: 'Articles', url: '/dashboard/content' }],
            // },
            { title: 'Favorites', url: '/dashboard/favorites', icon: Heart },
            { title: 'Resources', url: '/dashboard/resources', icon: Download },
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

// import { ClerkLogo } from '@/assets/clerk-logo'
// import { type SidebarData } from '../types'

export const sidebarData: any = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  // navGroups: [
  //   {
  //     title: 'General',
  //     items: [
  //       {
  //         title: 'Dashboard',
  //         url: '/dashboard',
  //         icon: LayoutDashboard,
  //       },
  //       {
  //         title: 'Content',
  //         icon: ListTodo,
  //          items: [
  //           {
  //             title: 'Articles',
  //             url: '/dashboard/content/articles',
  //           },
  //           {
  //             title: 'Drafts',
  //             url: '/dashboard/content/drafts',
  //           },
  //           {
  //             title: 'Categories',
  //             url: '/dashboard/content/categories',
  //           },
  //           {
  //             title: 'Featured Stories',
  //             url: '/dashboard/content/featured-stories',
  //           },
  //           {
  //             title: 'Travel Tools',
  //             url: '/dashboard/content/travel-tools',
  //           },
  //         ],
  //       },
  //       {
  //         title: 'Events & Calendars',
  //         url: '/dashboard/events-&-calenders',
  //         icon: Package,
  //       },
  //       {
  //         title: 'Analytics',
  //         icon: MessagesSquare,
  //         items: [
  //           {
  //             title: 'Admin Analytics',
  //             url: '/dashboard/analytics/admin-analytics',
  //           },
  //           {
  //             title: 'User Analytics',
  //             url: '/dashboard/analytics/user-analytics',
  //           },
  //           {
  //             title: 'Owner Analytics',
  //             url: '/dashboard/analytics/owner-analytics',
  //           },
  //         ],
  //       },
  //       {
  //         title: 'Subscriptions',
  //         url: '/dashboard/subscriptions',
  //         icon: Package,
  //       },
  //       {
  //         title: 'Deals',
  //         icon: Users,
  //         items: [
  //           {
  //             title: 'New Deals',
  //             url: '/dashboard/deals/new-deals',
  //           },
  //           {
  //             title: 'Hot Deals',
  //             url: '/dashboard/deals/hot-deals',
  //           },
  //         ],
  //       },
  //     ],
  //   },

  //   {
  //     title: 'Pages',
  //     items: [
  //       {
  //         title: 'Auth',
  //         icon: ShieldCheck,
  //         items: [
  //           {
  //             title: 'Sign In',
  //             url: '/dashboard/sign-in',
  //           },
  //           {
  //             title: 'Sign In (2 Col)',
  //             url: '/dashboard/sign-in-2',
  //           },
  //           {
  //             title: 'Sign Up',
  //             url: '/dashboard/sign-up',
  //           },
  //           {
  //             title: 'Forgot Password',
  //             url: '/dashboard/forgot-password',
  //           },
  //           {
  //             title: 'OTP',
  //             url: '/dashboard/otp',
  //           },
  //         ],
  //       },
  //       {
  //         title: 'Errors',
  //         icon: Bug,
  //         items: [
  //           {
  //             title: 'Unauthorized',
  //             url: '/dashboard/errors/unauthorized',
  //             icon: Lock,
  //           },
  //           {
  //             title: 'Forbidden',
  //             url: '/dashboard/errors/forbidden',
  //             icon: UserX,
  //           },
  //           {
  //             title: 'Not Found',
  //             url: '/dashboard/errors/not-found',
  //             icon: FileX,
  //           },
  //           {
  //             title: 'Internal Server Error',
  //             url: '/dashboard/errors/internal-server-error',
  //             icon: ServerOff,
  //           },
  //           {
  //             title: 'Maintenance Error',
  //             url: '/dashboard/errors/maintenance-error',
  //             icon: Construction,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     title: 'QUICK ACTIONS',
  //     items: [
  //       {
  //         title: 'Settings',
  //         icon: Settings,
  //         items: [
  //           {
  //             title: 'Profile',
  //             url: '/dashboard/settings',
  //             icon: UserCog,
  //           },
  //           {
  //             title: 'Account',
  //             url: '/dashboard/settings/account',
  //             icon: Wrench,
  //           },
  //           {
  //             title: 'Appearance',
  //             url: '/dashboard/settings/appearance',
  //             icon: Palette,
  //           },
  //           {
  //             title: 'Notifications',
  //             url: '/dashboard/settings/notifications',
  //             icon: Bell,
  //           },
  //           {
  //             title: 'Display',
  //             url: '/dashboard/settings/display',
  //             icon: Monitor,
  //           },
  //         ],
  //       },
  //       {
  //         title: 'New Article',
  //         url: '/dashboard/new-article',
  //         icon: HelpCircle,
  //       },
  //        {
  //         title: 'Listing from First Tier',
  //         url: '/dashboard/listing-tier',
  //         icon: HelpCircle,
  //       },
  //        {
  //         title: 'Upload Resourses',
  //         url: '/dashboard/upload-resourses',
  //         icon: HelpCircle,
  //       },
  //     ],
  //   },
  // ],
  navGroups: [
    {
      // title: 'General',
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
            {
              title: 'Articles',
              url: '/dashboard/content',
            },
            {
              title: 'Drafts',
              url: '/dashboard/content/drafts',
            },
            {
              title: 'Categories',
              url: '/dashboard/content/categories',
            },
            {
              title: 'Featured Stories',
              url: '/dashboard/content/featured-stories',
            },
            {
              title: 'Travel Tools',
              url: '/dashboard/content/travel-tools',
            },
          ],
        },
        {
          title: 'Events & Calendars',
          url: '/dashboard/events-&-calenders',
          icon: Package,
        },
        {
          title: 'Analytics',
          icon: MessagesSquare,
          items: [
            {
              title: 'Admin Analytics',
              url: '/dashboard/analytics/admin-analytics',
            },
            {
              title: 'User Analytics',
              url: '/dashboard/analytics/user-analytics',
            },
            {
              title: 'Owner Analytics',
              url: '/dashboard/analytics/owner-analytics',
            },
          ],
        },
        {
          title: 'Subscriptions',
          url: '/dashboard/subscriptions',
          icon: Package,
        },
        // {
        //   title: 'Deals',
        //   icon: Users,
        //   items: [
        //     {
        //       title: 'All Deals',
        //       url: '/dashboard/deals/all-deals',
        //     },
        //     {
        //       title: 'Active Deals',
        //       url: '/dashboard/deals/active-deals',
        //     },
        //   ],
        // },
        {
          title: 'Filters',
          url: '/dashboard/filters',
          icon: Package,
        },
        // ],
        // },

        // {
        //   title: 'Pages',
        // items: [
        {
          title: 'Auth',
          icon: ShieldCheck,
          items: [
            {
              title: 'Sign In',
              url: '/dashboard/sign-in',
            },
            {
              title: 'Sign In (2 Col)',
              url: '/dashboard/sign-in-2',
            },
            {
              title: 'Sign Up',
              url: '/dashboard/sign-up',
            },
            {
              title: 'Forgot Password',
              url: '/dashboard/forgot-password',
            },
            {
              title: 'OTP',
              url: '/dashboard/otp',
            },
          ],
        },
        {
          title: 'Errors',
          icon: Bug,
          items: [
            {
              title: 'Unauthorized',
              url: '/dashboard/errors/unauthorized',
              icon: Lock,
            },
            {
              title: 'Forbidden',
              url: '/dashboard/errors/forbidden',
              icon: UserX,
            },
            {
              title: 'Not Found',
              url: '/dashboard/errors/not-found',
              icon: FileX,
            },
            {
              title: 'Internal Server Error',
              url: '/dashboard/errors/internal-server-error',
              icon: ServerOff,
            },
            {
              title: 'Maintenance Error',
              url: '/dashboard/errors/maintenance-error',
              icon: Construction,
            },
          ],
        },
        //   ],
        // },
        // {
        //   title: 'QUICK ACTIONS',
        //   items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/dashboard/settings',
              icon: UserCog,
            },
            // {
            //   title: 'Account',
            //   url: '/dashboard/settings/account',
            //   icon: Wrench,
            // },
            // {
            //   title: 'Appearance',
            //   url: '/dashboard/settings/appearance',
            //   icon: Palette,
            // },
            // {
            //   title: 'Notifications',
            //   url: '/dashboard/settings/notifications',
            //   icon: Bell,
            // },
            // {
            //   title: 'Display',
            //   url: '/dashboard/settings/display',
            //   icon: Monitor,
            // },
          ],
        },
        {
          title: 'New Article',
          url: '/dashboard/new-article',
          icon: HelpCircle,
        },
        {
          title: 'Listing from First Tier',
          url: '/dashboard/listing-tier',
          icon: HelpCircle,
        },
        {
          title: 'Upload Resourses',
          url: '/dashboard/upload-resourses',
          icon: HelpCircle,
        },
      ],
    },
  ],
}
