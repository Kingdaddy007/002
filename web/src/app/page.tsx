"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    id: "proj-1",
    title: "Althuraya Island",
    location: "Sharjah Waterfront",
    image: "https://www.xbdesign.com/wp-content/uploads/2024/07/Villa_04-Night-scaled.jpg",
  },
  {
    id: "proj-2",
    title: "The Palm Sanctuary",
    location: "Palm Jumeirah",
    image: "https://www.xbdesign.com/wp-content/uploads/2022/12/XBD-Palm-Jumeirah-F91-40-795x450.jpg",
  },
  {
    id: "proj-3",
    title: "The Jungalows",
    location: "Dubai",
    image: "https://www.xbdesign.com/wp-content/uploads/2022/12/1.-The-Jungalows-1-795x450.jpg",
  },
  {
    id: "proj-4",
    title: "Emirates Hills",
    location: "Dubai",
    image: "https://www.xbdesign.com/wp-content/uploads/2022/12/02-Duplex-Living-795x450.jpg",
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const proj1Ref = useRef<HTMLDivElement>(null);
  const proj2Ref = useRef<HTMLDivElement>(null);
  const proj3Ref = useRef<HTMLDivElement>(null);
  const proj4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial Load Animation
      gsap.fromTo(
        proj1Ref.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
      );

      // 2. The Staggered Strips Reveal Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%", // 5 screens of scrub distance
          scrub: 1,
          pin: true,
        }
      });

      const hiddenVars = { "--s1": "0%", "--s2": "0%", "--s3": "0%", "--s4": "0%", "--s5": "0%" };

      // Phase 1: Project 2 Staggered Strip Reveal
      tl.to(proj1Ref.current, { scale: 1.1, duration: 1, ease: "none" }, 0)
        // Scale the incoming image slowly over the entire 1.0s duration
        .fromTo(proj2Ref.current, { scale: 1.1 }, { scale: 1, duration: 1, ease: "none" }, 0)
        // Stagger the 5 vertical columns shooting upwards
        .fromTo(proj2Ref.current, { ...hiddenVars }, { "--s1": "100%", duration: 0.6, ease: "power2.inOut" }, 0)
        .to(proj2Ref.current, { "--s2": "100%", duration: 0.6, ease: "power2.inOut" }, 0.1)
        .to(proj2Ref.current, { "--s3": "100%", duration: 0.6, ease: "power2.inOut" }, 0.2)
        .to(proj2Ref.current, { "--s4": "100%", duration: 0.6, ease: "power2.inOut" }, 0.3)
        .to(proj2Ref.current, { "--s5": "100%", duration: 0.6, ease: "power2.inOut" }, 0.4)
        
      // Phase 2: Hold Project 2
        .to(proj2Ref.current, { scale: 1.05, duration: 0.5, ease: "none" }, 1)
        
      // Phase 3: Project 3 Staggered Strip Reveal
        .to(proj2Ref.current, { scale: 1.15, duration: 1, ease: "none" }, 1.5)
        .fromTo(proj3Ref.current, { scale: 1.1 }, { scale: 1, duration: 1, ease: "none" }, 1.5)
        .fromTo(proj3Ref.current, { ...hiddenVars }, { "--s1": "100%", duration: 0.6, ease: "power2.inOut" }, 1.5)
        .to(proj3Ref.current, { "--s2": "100%", duration: 0.6, ease: "power2.inOut" }, 1.6)
        .to(proj3Ref.current, { "--s3": "100%", duration: 0.6, ease: "power2.inOut" }, 1.7)
        .to(proj3Ref.current, { "--s4": "100%", duration: 0.6, ease: "power2.inOut" }, 1.8)
        .to(proj3Ref.current, { "--s5": "100%", duration: 0.6, ease: "power2.inOut" }, 1.9)
        
      // Phase 4: Hold Project 3
        .to(proj3Ref.current, { scale: 1.05, duration: 0.5, ease: "none" }, 2.5)

      // Phase 5: Project 4 Staggered Strip Reveal
        .to(proj3Ref.current, { scale: 1.15, duration: 1, ease: "none" }, 3.0)
        .fromTo(proj4Ref.current, { scale: 1.1 }, { scale: 1, duration: 1, ease: "none" }, 3.0)
        .fromTo(proj4Ref.current, { ...hiddenVars }, { "--s1": "100%", duration: 0.6, ease: "power2.inOut" }, 3.0)
        .to(proj4Ref.current, { "--s2": "100%", duration: 0.6, ease: "power2.inOut" }, 3.1)
        .to(proj4Ref.current, { "--s3": "100%", duration: 0.6, ease: "power2.inOut" }, 3.2)
        .to(proj4Ref.current, { "--s4": "100%", duration: 0.6, ease: "power2.inOut" }, 3.3)
        .to(proj4Ref.current, { "--s5": "100%", duration: 0.6, ease: "power2.inOut" }, 3.4)
        
      // Phase 6: Hold Project 4
        .to(proj4Ref.current, { scale: 1.05, duration: 0.5, ease: "none" }, 4.0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Shared mask style for 5 VERTICAL columns
  const stripsMaskStyle = {
    "--s1": "0%", "--s2": "0%", "--s3": "0%", "--s4": "0%", "--s5": "0%",
    WebkitMaskImage: `
      linear-gradient(to top, black var(--s1), transparent var(--s1)),
      linear-gradient(to top, black var(--s2), transparent var(--s2)),
      linear-gradient(to top, black var(--s3), transparent var(--s3)),
      linear-gradient(to top, black var(--s4), transparent var(--s4)),
      linear-gradient(to top, black var(--s5), transparent var(--s5))
    `,
    WebkitMaskSize: "20% 100%, 20% 100%, 20% 100%, 20% 100%, 20% 100%",
    WebkitMaskPosition: "0 0, 25% 0, 50% 0, 75% 0, 100% 0",
    WebkitMaskRepeat: "no-repeat",
    maskImage: `
      linear-gradient(to top, black var(--s1), transparent var(--s1)),
      linear-gradient(to top, black var(--s2), transparent var(--s2)),
      linear-gradient(to top, black var(--s3), transparent var(--s3)),
      linear-gradient(to top, black var(--s4), transparent var(--s4)),
      linear-gradient(to top, black var(--s5), transparent var(--s5))
    `,
    maskSize: "20% 100%, 20% 100%, 20% 100%, 20% 100%, 20% 100%",
    maskPosition: "0 0, 25% 0, 50% 0, 75% 0, 100% 0",
    maskRepeat: "no-repeat",
  } as React.CSSProperties;

  return (
    <main className="bg-black">
      <Header />
      
      <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        
        {/* Project 1 (Base Layer) */}
        <div ref={proj1Ref} className="absolute inset-0 z-10 w-full h-full overflow-hidden">
          <img src={PROJECTS[0].image} alt={PROJECTS[0].title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="block text-white/90 font-body text-sm md:text-base tracking-[0.3em] uppercase mb-4 drop-shadow-lg">
              {PROJECTS[0].location}
            </span>
            <h2 className="text-white font-display text-5xl md:text-7xl lg:text-8xl drop-shadow-2xl">
              {PROJECTS[0].title}
            </h2>
          </div>
        </div>

        {/* Project 2 (Staggered Strips) */}
        <div ref={proj2Ref} className="absolute inset-0 z-20 w-full h-full overflow-hidden" style={stripsMaskStyle}>
          <img src={PROJECTS[1].image} alt={PROJECTS[1].title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="block text-white/90 font-body text-sm md:text-base tracking-[0.3em] uppercase mb-4 drop-shadow-lg">
              {PROJECTS[1].location}
            </span>
            <h2 className="text-white font-display text-5xl md:text-7xl lg:text-8xl drop-shadow-2xl">
              {PROJECTS[1].title}
            </h2>
          </div>
        </div>

        {/* Project 3 (Staggered Strips) */}
        <div ref={proj3Ref} className="absolute inset-0 z-30 w-full h-full overflow-hidden" style={stripsMaskStyle}>
          <img src={PROJECTS[2].image} alt={PROJECTS[2].title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="block text-white/90 font-body text-sm md:text-base tracking-[0.3em] uppercase mb-4 drop-shadow-lg">
              {PROJECTS[2].location}
            </span>
            <h2 className="text-white font-display text-5xl md:text-7xl lg:text-8xl drop-shadow-2xl">
              {PROJECTS[2].title}
            </h2>
          </div>
        </div>

        {/* Project 4 (Staggered Strips) */}
        <div ref={proj4Ref} className="absolute inset-0 z-40 w-full h-full overflow-hidden" style={stripsMaskStyle}>
          <img src={PROJECTS[3].image} alt={PROJECTS[3].title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="block text-white/90 font-body text-sm md:text-base tracking-[0.3em] uppercase mb-4 drop-shadow-lg">
              {PROJECTS[3].location}
            </span>
            <h2 className="text-white font-display text-5xl md:text-7xl lg:text-8xl drop-shadow-2xl">
              {PROJECTS[3].title}
            </h2>
          </div>
        </div>

      </section>

      {/* A dummy section below so you can scroll past the hero */}
      <section className="h-screen w-full bg-white text-xbd-text flex items-center justify-center relative z-50">
        <h2 className="font-display text-5xl">The Journey Continues</h2>
      </section>

    </main>
  );
}
