import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import DeckTransition from "@/components/DeckTransition";
import DisciplinesSection from "@/components/DisciplinesSection";

import ConciergeSection from "@/components/ConciergeSection";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#181615]">
      <Preloader />
      <Header />
      <DeckTransition />
      <div id="main-content">
        {/* GSAP Top-Edge Freeze Bypass */}
        <div style={{ position: "absolute", top: 0, width: "100%", height: "1px", pointerEvents: "none", opacity: 0 }}></div>

        <DisciplinesSection />
        <ConciergeSection />
      </div>
    </main>
  );
}
