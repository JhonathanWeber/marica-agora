import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WebStories } from "@/components/WebStories";
import { NewsList } from "@/components/NewsList";
import { Sidebar } from "@/components/Sidebar";
import { BottomNav } from "@/components/BottomNav";

export default function Home() {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Header />

      <main className="container mx-auto md:py-6 md:px-4 md:grid md:grid-cols-12 md:gap-8">
        {/* COLUNA PRINCIPAL */}
        <div className="col-span-12 lg:col-span-8 space-y-2 md:space-y-8">
          <Hero />
          <WebStories />
          <NewsList />
        </div>

        {/* SIDEBAR */}
        <Sidebar />
      </main>

      <BottomNav />
    </div>
  );
}
