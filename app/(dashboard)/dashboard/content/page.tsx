'use client'
import RoleGuard from '@/lib/auth/role.guard'
import { ContentPage } from '@/features/content/index'
import TabsPage from '@/features/content/components/tabs'
import ArticleTable from '@/features/content/article/ArticleTable'
import DraftCard from '@/features/content/draft/DraftCard'
import CategoryCard from '@/features/content/category/CategoryCard'
import FeaturedStoryCard from '@/features/content/featured/FeaturedStoryCard'
// import TravelToolCard from '@/features/content/travelTool/TravelToolCard'

export default function ContentPageWrapper() {
  return (
    <RoleGuard allowed={['owner', 'admin', 'assistant', 'editor']}>
      <ContentPage>
        <TabsPage />
        <ArticleTable />
        <DraftCard />
        <CategoryCard />
        <FeaturedStoryCard />
        {/* <TravelToolCard /> */}
      </ContentPage>
    </RoleGuard>
  )
}
