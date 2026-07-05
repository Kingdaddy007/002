"use client";

import React, { useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";

type Scene = {
  id: string;
  title: string;
  image?: string;
  video?: string;
};

const SceneMedia = ({ scene, autoPlay }: { scene: Scene; autoPlay?: boolean }) => {
  if (scene.video) {
    return <video id={`video-${scene.id}`} src={scene.video} loop muted playsInline autoPlay={autoPlay} className="absolute inset-0 w-full h-full object-cover" />;
  }
  return <img id={`img-${scene.id}`} src={scene.image} alt={scene.title} className="absolute inset-0 w-full h-full object-cover" />;
};

const SCENES: Scene[] = [
  { id: "scene-1", title: "SPATIAL MASTERY.", video: "/videos/scene1.mp4" },
  { id: "scene-2", title: "Private sanctuaries engineered for absolute discretion.", video: "/videos/scene2.mp4" },
  { id: "scene-3", title: "Singular estates. Coastal masterplans.", video: "/videos/scene3.mp4" },
  { id: "scene-4", title: "Material logic. Atmospheric control.", video: "/videos/scene4.mp4" },
  { id: "scene-5", title: "Commanding the skyline.", video: "/videos/scene5.mp4" }
];

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const vidsRef = useRef<(HTMLVideoElement | null)[]>([]);

  const proj1Ref = useRef<HTMLDivElement>(null);
  const proj2Ref = useRef<HTMLDivElement>(null);
  const proj3Ref = useRef<HTMLDivElement>(null);
  const proj4Ref = useRef<HTMLDivElement>(null);
  const proj5Ref = useRef<HTMLDivElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);

  const sidebarProgressRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const bottomGradientRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
      const textContainer = textContainerRef.current;
      if (!textContainer || !containerRef.current) return;

      const getTextNodes = (): HTMLElement[] =>
        Array.from(textContainer.querySelectorAll<HTMLElement>(".scene-text-wrapper"));
      const getInnerTextNodes = (): HTMLElement[] =>
        Array.from(textContainer.querySelectorAll<HTMLElement>(".scene-text-inner"));
      const getHeroWords = (): HTMLElement[] =>
        Array.from(textContainer.querySelectorAll<HTMLElement>(".hero-word"));

      const textNodes = getTextNodes();
      const innerTextNodes = getInnerTextNodes();
      const heroWords = getHeroWords();
      
      // Text is initially pushed down via inline style `transform: translateY(110%)`
      // so it is perfectly hidden during server-side render and before GSAP runs.

      // Cache the video elements once on mount
      vidsRef.current = [
        document.getElementById('video-scene-1') as HTMLVideoElement,
        document.getElementById('video-scene-2') as HTMLVideoElement,
        document.getElementById('video-scene-3') as HTMLVideoElement,
        document.getElementById('video-scene-4') as HTMLVideoElement,
        document.getElementById('video-scene-5') as HTMLVideoElement
      ];

      // 1. Initial Load Animation (Now synchronized with Preloader)
      // Set to opacity 1 so it's fully visible underneath the preloader, 
      // preventing any white background flash.
      gsap.set(proj1Ref.current, { scale: 1.1, opacity: 1 });

      const playHeroSequence = () => {
        // Z-axis entrance feel (scaling from 1.1 to 1)
        gsap.to(proj1Ref.current, { 
          scale: 1, 
          duration: 3.5, 
          ease: "power2.out"
        });

        if (heroWords.length > 0) {
          gsap.to(heroWords, {
            y: 0,
            yPercent: 0,
            duration: 1.5,
            delay: 0.2, // Drastically reduced since the preloader took 3.2s to dissolve
            stagger: 0.15,
            ease: "power4.out",
          });
        }
      };

      const handlePreloaderComplete = () => {
        // The video is already playing (started at dissolve).
        // Do not reset currentTime. Just trigger the text sequence.
        playHeroSequence();
      };

      const handlePreloaderDissolveStart = () => {
        const v1 = vidsRef.current[0];
        if (v1 && v1.paused) {
          v1.play().catch(() => {});
        }
      };

      if ((window as any).hasPreloaderCompleted) {
        handlePreloaderComplete();
      } else {
        window.addEventListener("preloaderDissolveStart", handlePreloaderDissolveStart);
        window.addEventListener("preloaderComplete", handlePreloaderComplete);
      }

      const hiddenVars = { "--s1": "0%", "--s2": "0%", "--s3": "0%", "--s4": "0%", "--s5": "0%" };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // 400vh pin duration for 4 transitions
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Fast lookup helper using ref caching to prevent DOM querying in render loop
            const getVid = (idx: number, id: string): HTMLVideoElement | null => {
              if (vidsRef.current[idx]) return vidsRef.current[idx];
              const el = document.getElementById(id) as HTMLVideoElement;
              if (el) vidsRef.current[idx] = el;
              return el;
            };

            const v1 = getVid(0, 'video-scene-1');
            const v2 = getVid(1, 'video-scene-2');
            const v3 = getVid(2, 'video-scene-3');
            const v4 = getVid(3, 'video-scene-4');
            const v5 = getVid(4, 'video-scene-5');

            const safePlay = (vid: HTMLVideoElement | null) => { if (vid && vid.paused) { vid.play().catch(() => {}); } };
            const safePause = (vid: HTMLVideoElement | null) => { if (vid && !vid.paused) { vid.pause(); } };

            if (progress < 0.25) {
              safePlay(v1); safePlay(v2); safePause(v3); safePause(v4); safePause(v5);
            } else if (progress < 0.5) {
              safePause(v1); safePlay(v2); safePlay(v3); safePause(v4); safePause(v5);
            } else if (progress < 0.75) {
              safePause(v1); safePause(v2); safePlay(v3); safePlay(v4); safePause(v5);
            } else {
              safePause(v1); safePause(v2); safePause(v3); safePlay(v4); safePlay(v5);
            }
          }
        }
      });

      // Phase 1
      tl.fromTo(proj1Ref.current, { scale: 1 }, { scale: 1.1, duration: 1, ease: "none", immediateRender: false }, 0)
        .fromTo(proj2Ref.current, { scale: 1.1 }, { scale: 1, duration: 1, ease: "none" }, 0)
        .fromTo(proj2Ref.current, { ...hiddenVars }, { "--s1": "100%", duration: 0.6, ease: "power2.inOut" }, 0)
        .to(proj2Ref.current, { "--s2": "100%", duration: 0.6, ease: "power2.inOut" }, 0.1)
        .to(proj2Ref.current, { "--s3": "100%", duration: 0.6, ease: "power2.inOut" }, 0.2)
        .to(proj2Ref.current, { "--s4": "100%", duration: 0.6, ease: "power2.inOut" }, 0.3)
        .to(proj2Ref.current, { "--s5": "100%", duration: 0.6, ease: "power2.inOut" }, 0.4)
        .to(proj2Ref.current, { scale: 1.05, duration: 0.5, ease: "none" }, 1);
        
      // Phase 1 (Scroll 0 -> 1)
      if (textNodes[0]) tl.to(textNodes[0], { autoAlpha: 0, yPercent: -50, duration: 0.5, ease: "power2.inOut" }, 0);
      
      const text2 = textNodes[1]?.querySelector('.scene-text-inner') as HTMLElement;
      if (text2) tl.fromTo(text2, { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: "power2.inOut" }, 0.5);
      
      tl.to(sidebarProgressRef.current, { yPercent: 100, duration: 0.2, ease: "power2.inOut" }, 0.5);

      // Phase 2 (Scroll 1.5 -> 2.5)
      tl.to(proj2Ref.current, { scale: 1.15, duration: 1, ease: "none" }, 1.5)
        .fromTo(proj3Ref.current, { scale: 1.1 }, { scale: 1, duration: 1, ease: "none" }, 1.5)
        .fromTo(proj3Ref.current, { ...hiddenVars }, { "--s1": "100%", duration: 0.6, ease: "power2.inOut" }, 1.5)
        .to(proj3Ref.current, { "--s2": "100%", duration: 0.6, ease: "power2.inOut" }, 1.6)
        .to(proj3Ref.current, { "--s3": "100%", duration: 0.6, ease: "power2.inOut" }, 1.7)
        .to(proj3Ref.current, { "--s4": "100%", duration: 0.6, ease: "power2.inOut" }, 1.8)
        .to(proj3Ref.current, { "--s5": "100%", duration: 0.6, ease: "power2.inOut" }, 1.9)
        .to(proj3Ref.current, { scale: 1.05, duration: 0.5, ease: "none" }, 2.5);

      if (text2) tl.to(text2, { yPercent: -110, duration: 0.5, ease: "power2.inOut" }, 1.5);
      
      const text3 = textNodes[2]?.querySelector('.scene-text-inner') as HTMLElement;
      if (text3) tl.fromTo(text3, { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: "power2.inOut" }, 2.0);
      
      tl.to(sidebarProgressRef.current, { yPercent: 200, duration: 0.2, ease: "power2.inOut" }, 2.0);

      // Phase 3 (Scroll 3.0 -> 4.0)
      tl.to(proj3Ref.current, { scale: 1.15, duration: 1, ease: "none" }, 3.0)
        .fromTo(proj4Ref.current, { scale: 1.1 }, { scale: 1, duration: 1, ease: "none" }, 3.0)
        .fromTo(proj4Ref.current, { ...hiddenVars }, { "--s1": "100%", duration: 0.6, ease: "power2.inOut" }, 3.0)
        .to(proj4Ref.current, { "--s2": "100%", duration: 0.6, ease: "power2.inOut" }, 3.1)
        .to(proj4Ref.current, { "--s3": "100%", duration: 0.6, ease: "power2.inOut" }, 3.2)
        .to(proj4Ref.current, { "--s4": "100%", duration: 0.6, ease: "power2.inOut" }, 3.3)
        .to(proj4Ref.current, { "--s4": "100%", duration: 0.6, ease: "power2.inOut" }, 3.4)
        .to(proj4Ref.current, { scale: 1.05, duration: 0.5, ease: "none" }, 4.0);

      if (text3) tl.to(text3, { yPercent: -110, duration: 0.5, ease: "power2.inOut" }, 3.0);
      
      const text4 = textNodes[3]?.querySelector('.scene-text-inner') as HTMLElement;
      if (text4) tl.fromTo(text4, { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: "power2.inOut" }, 3.5);
      
      tl.to(sidebarProgressRef.current, { yPercent: 300, duration: 0.2, ease: "power2.inOut" }, 3.5);

      // Phase 4 (Scroll 4.5 -> 5.5)
      tl.to(proj4Ref.current, { scale: 1.15, duration: 1, ease: "none" }, 4.5)
        .fromTo(proj5Ref.current, { scale: 1.1 }, { scale: 1, duration: 1, ease: "none" }, 4.5)
        .fromTo(proj5Ref.current, { ...hiddenVars }, { "--s1": "100%", duration: 0.6, ease: "power2.inOut" }, 4.5)
        .to(proj5Ref.current, { "--s2": "100%", duration: 0.6, ease: "power2.inOut" }, 4.6)
        .to(proj5Ref.current, { "--s3": "100%", duration: 0.6, ease: "power2.inOut" }, 4.7)
        .to(proj5Ref.current, { "--s4": "100%", duration: 0.6, ease: "power2.inOut" }, 4.8)
        .to(proj5Ref.current, { "--s5": "100%", duration: 0.6, ease: "power2.inOut" }, 4.9)
        .to(proj5Ref.current, { scale: 1.05, duration: 0.5, ease: "none" }, 5.5);

      if (text4) tl.to(text4, { yPercent: -110, duration: 0.5, ease: "power2.inOut" }, 4.5);
      
      const text5 = textNodes[4]?.querySelector('.scene-text-inner') as HTMLElement;
      if (text5) tl.fromTo(text5, { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: "power2.inOut" }, 5.0);
      
      tl.to(sidebarProgressRef.current, { yPercent: 400, duration: 0.2, ease: "power2.inOut" }, 5.0);

      // Final Exit
      if (text5) tl.to(text5, { yPercent: -110, duration: 0.5, ease: "power2.inOut" }, 6.0);
      if (sidebarRef.current) tl.to(sidebarRef.current, { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" }, 6.0);
      
      // Removed Phase 5 squeeze and brightness changes as VideoHero now completes naturally.
      
      return () => {
        window.removeEventListener("preloaderDissolveStart", handlePreloaderDissolveStart);
        window.removeEventListener("preloaderComplete", handlePreloaderComplete);
      };
  }, { scope: containerRef });

  const stripsMaskStyle = {
    "--s1": "0%", "--s2": "0%", "--s3": "0%", "--s4": "0%", "--s5": "0%",
    WebkitMaskImage: `
      linear-gradient(to top, black var(--s1), transparent var(--s1)),
      linear-gradient(to top, black var(--s2), transparent var(--s2)),
      linear-gradient(to top, black var(--s3), transparent var(--s3)),
      linear-gradient(to top, black var(--s4), transparent var(--s4)),
      linear-gradient(to top, black var(--s5), transparent var(--s5))
    `,
    WebkitMaskSize: "20.5% 100%, 20.5% 100%, 20.5% 100%, 20.5% 100%, 20.5% 100%",
    WebkitMaskPosition: "0 0, 25% 0, 50% 0, 75% 0, 100% 0",
    WebkitMaskRepeat: "no-repeat",
    maskImage: `
      linear-gradient(to top, black var(--s1), transparent var(--s1)),
      linear-gradient(to top, black var(--s2), transparent var(--s2)),
      linear-gradient(to top, black var(--s3), transparent var(--s3)),
      linear-gradient(to top, black var(--s4), transparent var(--s4)),
      linear-gradient(to top, black var(--s5), transparent var(--s5))
    `,
    maskSize: "20.5% 100%, 20.5% 100%, 20.5% 100%, 20.5% 100%, 20.5% 100%",
    maskPosition: "0 0, 25% 0, 50% 0, 75% 0, 100% 0",
    maskRepeat: "no-repeat",
  } as React.CSSProperties;

  return (
    <section ref={containerRef} id="video-hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-xbd-bg z-20">
      <div ref={mediaContainerRef} className="absolute inset-0 z-0">
        <div ref={proj1Ref} className="absolute inset-0 z-10 w-full h-full overflow-hidden">
          <SceneMedia scene={SCENES[0]} />
        </div>
        <div ref={proj2Ref} className="absolute inset-0 z-20 w-full h-full overflow-hidden" style={stripsMaskStyle}>
          <SceneMedia scene={SCENES[1]} />
        </div>
        <div ref={proj3Ref} className="absolute inset-0 z-30 w-full h-full overflow-hidden" style={stripsMaskStyle}>
          <SceneMedia scene={SCENES[2]} />
        </div>
        <div ref={proj4Ref} className="absolute inset-0 z-40 w-full h-full overflow-hidden" style={stripsMaskStyle}>
          <SceneMedia scene={SCENES[3]} />
        </div>
        <div ref={proj5Ref} className="absolute inset-0 z-50 w-full h-full overflow-hidden" style={stripsMaskStyle}>
          <SceneMedia scene={SCENES[4]} />
        </div>
      </div>

      <div ref={textContainerRef} className="absolute inset-0 z-[100] pointer-events-none">
        {SCENES.map((scene, index) => {
          if (index === 0) {
            return (
              <div
                key={scene.id}
                className="scene-text-wrapper absolute inset-0 flex flex-col justify-center items-center text-center px-4"
              >
                <div className="max-w-4xl pt-4 pb-4 -mt-4 -mb-4">
                  <h2 className="text-white font-display text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[8rem] drop-shadow-2xl leading-[1.05] tracking-tight">
                    <span className="overflow-hidden inline-block mr-[0.2em] pb-2"><span className="hero-word inline-block transform-gpu" style={{ transform: "translateY(110%)" }}>SPATIAL</span></span>
                    <span className="overflow-hidden inline-block pb-2"><span className="hero-word inline-block transform-gpu" style={{ transform: "translateY(110%)" }}>MASTERY.</span></span>
                  </h2>
                </div>
              </div>
            );
          }

          return (
            <div
              key={scene.id}
              className="scene-text-wrapper absolute inset-0 flex flex-col justify-end items-start px-8 md:px-16 lg:px-24 pb-16 md:pb-24 lg:pb-32 text-left"
            >
              <div className="max-w-3xl overflow-hidden pt-4 pb-4 -mt-4 -mb-4">
                <h2 className="scene-text-inner text-white font-display text-4xl md:text-5xl lg:text-[4rem] drop-shadow-2xl leading-[1.1] transform-gpu" style={{ transform: "translateY(110%)" }}>
                  {scene.title}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      <div ref={sidebarRef} className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 z-[110] flex flex-col items-center justify-center mix-blend-difference text-white">
        <div className="h-32 w-[1px] bg-white/20 relative overflow-hidden rounded-full">
          <div
            ref={sidebarProgressRef}
            className="absolute top-0 left-0 w-full bg-white"
            style={{ height: "20%" }}
          />
        </div>
      </div>

      {/* Removed Bottom Gradient per user request */}
    </section>
  );
};
VideoHero.displayName = "VideoHero";
export default VideoHero;
