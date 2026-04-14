import AnnouncementCard from "@/components/AnnouncementCard";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import QuickNavigation from "@/components/QuickNavigation";
import PostsSection from "@/components/PostsSection";

export default function Home() {
  const announcements = [
    {
      id: 1,
      type: "announcement",
      title: "Известување",
      description: "Апликациите за студентски домови се отворени",
    },
    {
      id: 2,
      type: "critical",
      title: "Критичен рок",
      description: "Рокот за стипендии истекува за 3 дена",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <section className="px-4 md:px-8 pt-4 pb-2 shrink-0">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm font-bold text-[#1a1a1a]">
            Последни известувања
          </h2>
          <button className="text-xs font-semibold text-[#166534] hover:underline">
            Види сите
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {announcements.map((item) => (
            <AnnouncementCard
              key={item.id}
              type={item.type as "announcement" | "critical"}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <Hero />
      <QuickNavigation />
      <PostsSection />
    </main>
  );
}
