import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import DraftCard from './../draft/DraftCard'

export function DraftContent() {
  return (
    <>
      <Header />
      <Main>
        <div className='mb-6'>
          <h1 className='font-antigua text-2xl font-bold tracking-tight'>Drafts</h1>
          <p className='mt-1 text-sm text-muted-foreground'>Articles awaiting review or completion</p>
        </div>
        <DraftCard />
      </Main>
    </>
  )
}
