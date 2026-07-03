import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import VideoHero from "@/components/VideoHero";
import PhilosophyBridge from "@/components/PhilosophyBridge";
import DisciplinesSection from "@/components/DisciplinesSection";
import ProofSection from "@/components/ProofSection";
import TeamSection from "@/components/TeamSection";
import ConciergeSection from "@/components/ConciergeSection";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-xbd-bg">
      <Preloader />
      <Header />
      <VideoHero />
      <PhilosophyBridge />
      <div id="main-content">
        {/* GSAP Top-Edge Freeze Bypass */}
        <div style={{ position: "absolute", top: 0, width: "100%", height: "1px", pointerEvents: "none", opacity: 0 }}></div>

        <DisciplinesSection />
        <ProofSection />
        <TeamSection />
        <ConciergeSection />
      </div>
    </main>
  );
}
