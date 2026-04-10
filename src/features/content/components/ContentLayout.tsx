'use client'

import { Main } from '@/components/layout/main'
import TabsPage from './tabs'
import ArticleTable from '../article/ArticleTable'
import CategoryCard from '../category/CategoryCard'
import DraftCard from '../draft/DraftCard'
import FeaturedStoryCard from '../featured/FeaturedStoryCard'
// import TravelToolCard from '../travelTool/TravelToolCard'

/**
 * Single shared layout used by every content sub-page
 * (categories, travel-tools, etc.).
 * Renders the stats bar + all content cards in the correct order.
 */
export function ContentLayout() {
  return (
    <Main>
      {/* Stats bar */}
      <TabsPage />

      {/* Articles (paginated table) */}
      <ArticleTable />

      {/* Drafts */}
      <DraftCard />

      {/* Categories */}
      <CategoryCard />

      {/* Featured stories */}
      <FeaturedStoryCard />

      {/* Travel tools */}
      {/* <TravelToolCard /> */}
    </Main>
  )
}
