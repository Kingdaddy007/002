import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import DeckTransition from "@/components/DeckTransition";
import TriptychHero from "@/components/TriptychHero";
import RixosSection from "@/components/RixosSection";
import ExecutionSection from "@/components/ExecutionSection";
import CatalogSection from "@/components/CatalogSection";
import ConciergeSection from "@/components/ConciergeSection";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#121212]">
      <Preloader />
      <Header />
      <DeckTransition />
      <div id="main-content">
        {/* GSAP Top-Edge Freeze Bypass */}
        <div style={{ position: "absolute", top: 0, width: "100%", height: "1px", pointerEvents: "none", opacity: 0 }}></div>
        <TriptychHero />
        <RixosSection />
        <ExecutionSection />
        <CatalogSection />
        <ConciergeSection />
      </div>
    </main>
  );
}
