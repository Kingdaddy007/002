"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Scene = {
  id: string;
  title: string;
  image?: string;
  video?: string;
};

const SceneMedia = ({ scene }: { scene: Scene }) => {
  if (scene.video) {
    return <video src={scene.video} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />;
  }
  return <img src={scene.image} alt={scene.title} className="absolute inset-0 w-full h-full object-cover" />;
};

const SCENES: Scene[] = [
  {
    id: "scene-1",
    title: "Architecture that challenges gravity and convention.",
    video: "/videos/scene1.mp4",
  },
  {
    id: "scene-2",
    title: "Sanctuaries of uncompromising private luxury.",
    video: "/videos/scene2.mp4",
  },
  {
    id: "scene-3",
    title: "From singular estates to visionary coastal masterplans.",
    video: "/videos/scene3.mp4",
  },
  {
    id: "scene-4",
    title: "Curating mood, texture, and light.",
    video: "/videos/scene4.mp4",
  },
  {
    id: "scene-5",
    title: "Commanding the skyline.",
    video: "/videos/scene5.mp4",
  }
];

export default function VideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const proj1Ref = useRef<HTMLDivElement>(null);
  const proj2Ref = useRef<HTMLDivElement>(null);
  const proj3Ref = useRef<HTMLDivElement>(null);
  const proj4Ref = useRef<HTMLDivElement>(null);
  const proj5Ref = useRef<HTMLDivElement>(null);

  const activeIndexRef = useRef<number>(-1);
  const sidebarProgressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const textContainer = textContainerRef.current;
    if (!textContainer) return;

    const getTextNodes = (): HTMLElement[] =>
      Array.from(textContainer.querySelectorAll<HTMLElement>(".scene-text-wrapper"));

    const textNodes = getTextNodes();
    textNodes.forEach((node, i) => {
      if (i > 0) gsap.set(node, { autoAlpha: 0, y: 50 });
      else gsap.set(node, { autoAlpha: 0, y: 50 }); 
    });

    // 1. Initial Load Animation
    gsap.fromTo(
      proj1Ref.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
    );

    activeIndexRef.current = 0;
    if (textNodes[0]) {
      gsap.to(textNodes[0], {
        y: 0,
        autoAlpha: 1,
        duration: 1.1,
        delay: 0.6,
        ease: "power4.out",
      });
    }

    const hiddenVars = { "--s1": "0%", "--s2": "0%", "--s3": "0%", "--s4": "0%", "--s5": "0%" };
    const BREAKPOINTS = [0.16, 0.41, 0.66, 0.91];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=350%",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const p = self.progress;
          let newIndex: number;
          if (p < BREAKPOINTS[0])      newIndex = 0;
          else if (p < BREAKPOINTS[1]) newIndex = 1;
          else if (p < BREAKPOINTS[2]) newIndex = 2;
          else if (p < BREAKPOINTS[3]) newIndex = 3;
          else                          newIndex = 4;

          if (newIndex !== activeIndexRef.current) {
            activeIndexRef.current = newIndex;
            if (sidebarProgressRef.current) {
              sidebarProgressRef.current.style.transform = `translateY(${newIndex * 100}%)`;
            }
          }
        },
      }
    });

    // Phase 1
    tl.to(proj1Ref.current, { scale: 1.1, duration: 1, ease: "none" }, 0)
      .fromTo(proj2Ref.current, { scale: 1.1 }, { scale: 1, duration: 1, ease: "none" }, 0)
      .fromTo(proj2Ref.current, { ...hiddenVars }, { "--s1": "100%", duration: 0.6, ease: "power2.inOut" }, 0)
      .to(proj2Ref.current, { "--s2": "100%", duration: 0.6, ease: "power2.inOut" }, 0.1)
      .to(proj2Ref.current, { "--s3": "100%", duration: 0.6, ease: "power2.inOut" }, 0.2)
      .to(proj2Ref.current, { "--s4": "100%", duration: 0.6, ease: "power2.inOut" }, 0.3)
      .to(proj2Ref.current, { "--s5": "100%", duration: 0.6, ease: "power2.inOut" }, 0.4)
      .to(proj2Ref.current, { scale: 1.05, duration: 0.5, ease: "none" }, 1);
      
    if (textNodes[0]) tl.fromTo(textNodes[0], { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -50, duration: 0.5, ease: "power2.inOut", immediateRender: false }, 0);
    if (textNodes[1]) tl.fromTo(textNodes[1], { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.inOut" }, 0.5);

    // Phase 2
    tl.to(proj2Ref.current, { scale: 1.15, duration: 1, ease: "none" }, 1.5)
      .fromTo(proj3Ref.current, { scale: 1.1 }, { scale: 1, duration: 1, ease: "none" }, 1.5)
      .fromTo(proj3Ref.current, { ...hiddenVars }, { "--s1": "100%", duration: 0.6, ease: "power2.inOut" }, 1.5)
      .to(proj3Ref.current, { "--s2": "100%", duration: 0.6, ease: "power2.inOut" }, 1.6)
      .to(proj3Ref.current, { "--s3": "100%", duration: 0.6, ease: "power2.inOut" }, 1.7)
      .to(proj3Ref.current, { "--s4": "100%", duration: 0.6, ease: "power2.inOut" }, 1.8)
      .to(proj3Ref.current, { "--s5": "100%", duration: 0.6, ease: "power2.inOut" }, 1.9)
      .to(proj3Ref.current, { scale: 1.05, duration: 0.5, ease: "none" }, 2.5);

    if (textNodes[1]) tl.to(textNodes[1], { autoAlpha: 0, y: -50, duration: 0.5, ease: "power2.inOut" }, 1.5);
    if (textNodes[2]) tl.fromTo(textNodes[2], { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.inOut" }, 2.0);

    // Phase 3
    tl.to(proj3Ref.current, { scale: 1.15, duration: 1, ease: "none" }, 3.0)
      .fromTo(proj4Ref.current, { scale: 1.1 }, { scale: 1, duration: 1, ease: "none" }, 3.0)
      .fromTo(proj4Ref.current, { ...hiddenVars }, { "--s1": "100%", duration: 0.6, ease: "power2.inOut" }, 3.0)
      .to(proj4Ref.current, { "--s2": "100%", duration: 0.6, ease: "power2.inOut" }, 3.1)
      .to(proj4Ref.current, { "--s3": "100%", duration: 0.6, ease: "power2.inOut" }, 3.2)
      .to(proj4Ref.current, { "--s4": "100%", duration: 0.6, ease: "power2.inOut" }, 3.3)
      .to(proj4Ref.current, { "--s5": "100%", duration: 0.6, ease: "power2.inOut" }, 3.4)
      .to(proj4Ref.current, { scale: 1.05, duration: 0.5, ease: "none" }, 4.0);

    if (textNodes[2]) tl.to(textNodes[2], { autoAlpha: 0, y: -50, duration: 0.5, ease: "power2.inOut" }, 3.0);
    if (textNodes[3]) tl.fromTo(textNodes[3], { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.inOut" }, 3.5);

    // Phase 4
    tl.to(proj4Ref.current, { scale: 1.15, duration: 1, ease: "none" }, 4.5)
      .fromTo(proj5Ref.current, { scale: 1.1 }, { scale: 1, duration: 1, ease: "none" }, 4.5)
      .fromTo(proj5Ref.current, { ...hiddenVars }, { "--s1": "100%", duration: 0.6, ease: "power2.inOut" }, 4.5)
      .to(proj5Ref.current, { "--s2": "100%", duration: 0.6, ease: "power2.inOut" }, 4.6)
      .to(proj5Ref.current, { "--s3": "100%", duration: 0.6, ease: "power2.inOut" }, 4.7)
      .to(proj5Ref.current, { "--s4": "100%", duration: 0.6, ease: "power2.inOut" }, 4.8)
      .to(proj5Ref.current, { "--s5": "100%", duration: 0.6, ease: "power2.inOut" }, 4.9)
      .to(proj5Ref.current, { scale: 1.05, duration: 0.5, ease: "none" }, 5.5);

    if (textNodes[3]) tl.to(textNodes[3], { autoAlpha: 0, y: -50, duration: 0.5, ease: "power2.inOut" }, 4.5);
    if (textNodes[4]) tl.fromTo(textNodes[4], { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.inOut" }, 5.0);

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
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      <div className="absolute inset-0 z-0">
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
        {SCENES.map((scene) => (
          <div
            key={scene.id}
            className="scene-text-wrapper absolute inset-0 flex flex-col justify-end items-start px-8 md:px-16 lg:px-24 pb-16 md:pb-24 lg:pb-32 text-left"
          >
            <div className="max-w-3xl">
              <h2 className="text-white font-display text-4xl md:text-5xl lg:text-[4rem] drop-shadow-2xl leading-[1.1]">
                {scene.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 z-[110] flex flex-col items-center justify-center mix-blend-difference text-white">
        <div className="h-32 w-[1px] bg-white/20 relative overflow-hidden rounded-full">
          <div
            ref={sidebarProgressRef}
            className="absolute top-0 left-0 w-full bg-white transition-transform duration-500 ease-out"
            style={{ height: "20%" }}
          />
        </div>
      </div>

      {/* Seamless Bottom Gradient Blend into PhilosophyBridge */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#121212] to-transparent z-[100] pointer-events-none"></div>
    </section>
  );
}
