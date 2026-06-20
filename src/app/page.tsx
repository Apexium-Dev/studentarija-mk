import Hero from '@/components/features/Hero'
import LatestNews from '@/components/features/LatestNews'
import EventsSection from '@/components/features/Events'
import CommunitySection from '@/components/features/Community'
import SponsorsSection from '@/components/features/Sponsors'

export default function Home() {
  return (
    <main>
      <Hero />
      <LatestNews />
      <EventsSection />
      <CommunitySection />
      <SponsorsSection />
    </main>
  )
}
