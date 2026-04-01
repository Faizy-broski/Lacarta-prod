// import { ReceiptText,
//   // Plus
//  } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import {
//   Tabs,
//   TabsContent,
//   // TabsList, TabsTrigger
// } from '@/components/ui/tabs'
import { Compass, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

// import { Separator } from '@/components/ui/separator'
// import { SidebarNav } from './components/sidebar-nav'
// import { ProfileDropdown } from '@/components/profile-dropdown'
// import { Search } from '@/components/search'
// import { ThemeSwitch } from '@/components/theme-switch'
// import ArticleTable from './article/ArticleTable'
// import CategoryCard from './category/CategoryCard'
// import DraftCard from './draft/DraftCard'
// import FeaturedStoryCard from './featured/FeaturedStoryCard'
// import TravelToolCard from './travelTool/TravelToolCard'
// import QuickActionCard from './components/quickActions'
// import TabsPage from './components/tabs'

// const sidebarNavItems = [
//   {
//     title: 'Article',
//     href: '/content'
//   },
//   {
//     title: 'Draft',
//     href: '/content/drafts'
//   },
//   {
//     title: 'Category',
//     href: '/content/categories'
//   },
//   {
//     title: 'Featured',
//     href: '/content/featured-stories'
//   },
//   {
//     title: 'Travel Tool',
//     href: '/content/travel-tools'
//   },
// ]

export function ContentPage({ children }: { children?: React.ReactNode }) {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header />

      <Main>
        <div className='mb-5 flex flex-col items-center justify-between space-y-2 sm:flex-row'>
          <div>
            <h1 className='font-antigua text-2xl font-bold tracking-tight'>
              Content
            </h1>
            <p className='text-sm text-muted-foreground'>
              Manage all editorial content across Lacarta
            </p>
          </div>
          <div className='flex gap-4'>
            <Button className='border bg-gray-100 text-black shadow hover:bg-gray-100 hover:text-black'>
              <Compass />
              Travel Tool
            </Button>
            <Button className='bg-gradient-to-r from-[#CF9921] to-[#D2BB6B] text-white shadow hover:bg-black hover:text-white'>
              <Plus size={30} /> New Article
            </Button>
          </div>
        </div>
        {/* <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'> */}

        {/* <div className='flex w-full overflow-y-hidden p-1'> */}
        {children}
        {/* </div> */}
      </Main>
    </>
  )
}
