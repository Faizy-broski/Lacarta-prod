import { Compass, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Main } from '@/components/layout/main'
import ArticleTable from '../article/ArticleTable'
import CategoryCard from '../category/CategoryCard'
import TabsPage from '../components/tabs'
import DraftCard from '../draft/DraftCard'
import FeaturedStoryCard from '../featured/FeaturedStoryCard'
import TravelToolCard from '../travelTool/TravelToolCard'
import QuickActionCard from './QuickActionCard'

export function ArticleContent() {
  return (
    <>
      <Main>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='mb-5 space-y-4'
        >
          <TabsContent value='overview' className='space-y-4'>
            <TabsPage />
          </TabsContent>
        </Tabs>

        <ArticleTable />

        {/* DRAFTS */}

        <DraftCard />

        {/* CATEGORIES */}

        <CategoryCard />

        {/* FEATURED STORIES */}
        <FeaturedStoryCard />

        {/* TRAVEL TOOLS */}

        <TravelToolCard />

        {/* QUICKACTIONS */}
        <QuickActionCard />
      </Main>
    </>
  )
}
