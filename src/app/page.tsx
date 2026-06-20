import Hero from '@/components/features/Hero'
import LatestNews from '@/components/features/LatestNews'
import EventsSection from '@/components/features/Events'
import CommunitySection from '@/components/features/Community'

export default function Home() {
  return (
    <main>
      <Hero />
      <LatestNews />
      <EventsSection />
      <CommunitySection />
    </main>
  )
}
