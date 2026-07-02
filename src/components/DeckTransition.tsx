"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import VideoHero, { VideoHeroHandle } from "./VideoHero";
import PhilosophyBridge, { PhilosophyBridgeHandle } from "./PhilosophyBridge";

export default function DeckTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoHeroRef = useRef<VideoHeroHandle>(null);
  const philosophyBridgeRef = useRef<PhilosophyBridgeHandle>(null);
  const philosophyContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ============================================================
    // MASTER TIMELINE — Single Pinned Deck-of-Cards Architecture
    // ============================================================
    // Phase 1–4 (0.0 – 6.0):  VideoHero scene transitions (strips reveal)
    // Phase 5   (6.0 – 8.0):  Squeeze + PhilosophyBridge slides up
    // Phase 6   (7.5 – 9.5):  Philosophy text rolls in (3D cylinder)
    // Phase 7   (9.5 – 12.0): LOCK — text holds for reading
    // Phase 8   (12.0 – 13.7): Text rolls out + right column fades
    // Total: ~14 timeline units across 750% viewport scroll
    // ============================================================

    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=450%",
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    // 1. Attach VideoHero scene transitions (phases 1–5, times 0.0 – 8.0)
    if (videoHeroRef.current) {
      videoHeroRef.current.buildTimeline(masterTl);
    }

    // 2. The Deck Overlap — PhilosophyBridge slides up like a physical card
    //    Starts simultaneously with the VideoHero squeeze (time 6.0)
    masterTl.fromTo(philosophyContainerRef.current, 
      { yPercent: 100 },
      { 
        yPercent: 0, 
        duration: 2.0, 
        ease: "power2.inOut" 
      }, 
      6.0
    );

    // 3. Attach PhilosophyBridge internal animations (starts at 8.0)
    //    Text roll-in begins at 7.5 (overlaps last 0.5s of slide-up)
    //    Roll-out completes at ~13.7
    if (philosophyBridgeRef.current) {
      philosophyBridgeRef.current.buildTimeline(masterTl, 8.0);
    }

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-xbd-bg">
      <VideoHero ref={videoHeroRef} />
      
      {/* 
        This is the absolute wrapper for PhilosophyBridge.
        It sits safely inside the master pin.
        GSAP will animate its yPercent from 100 to 0.
      */}
      <div 
        ref={philosophyContainerRef} 
        className="absolute inset-0 z-30 w-full h-full"
      >
        <PhilosophyBridge ref={philosophyBridgeRef} />
      </div>
    </section>
  );
}
