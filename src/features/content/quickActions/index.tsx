export { ContentLayout as ArticleContent } from '../components/ContentLayout'

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

      </Main>
    </>
  )
}
