"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const philosophyText = "True luxury is proven in physical execution. Whether we are engineering a 76-story architectural landmark or detailing the millimeter-precise joinery of a private interior, our discipline remains the same: we eliminate the drift between concept and reality.";
const philosophyWords = philosophyText.split(" ");

const PhilosophyBridge = () => {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
      const leftLines = containerRef.current 
        ? gsap.utils.toArray<HTMLElement>(containerRef.current.querySelectorAll(".reveal-left"))
        : [];
        
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse"
        }
      });
      
      // 1. Cinematic Left Typography Reveal
      tl.fromTo(leftLines, 
        { 
          yPercent: 100,
          opacity: 0
        }, 
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          duration: 1.5
        },
        0
      );

      // 2. Vertical Anchor Divider
      tl.fromTo(dividerRef.current,
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 1.5, ease: "power2.inOut" },
        0.5
      );

      // 3. Right Typography "SplitText" Stagger Effect
      const rightWords = containerRef.current
        ? gsap.utils.toArray<HTMLElement>(containerRef.current.querySelectorAll(".split-word"))
        : [];
      
      const eyebrow = containerRef.current?.querySelector(".reveal-eyebrow");
      
      const signatureElements = containerRef.current
        ? gsap.utils.toArray<HTMLElement>(containerRef.current.querySelectorAll(".reveal-signature"))
        : [];

      // Eyebrow appears quietly as context
      if (eyebrow) {
        tl.fromTo(eyebrow,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 1.0, ease: "power2.out" },
          1.0
        );
      }

      // Body text scrubs in
      tl.fromTo(rightWords,
        { opacity: 0, yPercent: 100 },
        { opacity: 1, yPercent: 0, stagger: 0.03, duration: 1.0, ease: "power3.out" },
        1.2
      );

      // Closing hook and signature appear after the text
      tl.fromTo(signatureElements,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, stagger: 0.2, duration: 1.0, ease: "power2.out" },
        2.5
      );

  }, { scope: containerRef });

  return (
    <section 
      id="philosophy"
      ref={containerRef}
      className="relative z-30 w-full h-screen bg-xbd-bg-alt text-xbd-text overflow-hidden flex items-center"
    >
      {/* 
        Using items-center to ensure vertical centering.
        Reduced max-w and adjusted grid to ensure no vertical overflow.
      */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto h-full grid grid-cols-1 md:grid-cols-12 items-center px-6 md:px-12 lg:px-20">
        
        {/* Left Column (7 columns): The Monumental Scope */}
        <div 
          ref={leftColRef}
          className="md:col-span-7 flex flex-col justify-center gap-8 lg:gap-16 pt-16 md:pt-0"
        >
          {/* Monumental Scope */}
          <h2 className="font-display text-[2rem] md:text-[4rem] lg:text-[5rem] xl:text-[6.5rem] leading-[1.0] tracking-[-0.03em] text-xbd-text">
            <div className="overflow-hidden"><div className="reveal-left transform-gpu">FROM</div></div>
            <div className="overflow-hidden"><div className="reveal-left transform-gpu"><span className="text-xbd-gold italic">CONCEPT</span></div></div>
            <div className="overflow-hidden"><div className="reveal-left transform-gpu">TO</div></div>
            <div className="overflow-hidden"><div className="reveal-left transform-gpu"><span className="text-xbd-gold italic">REALITY.</span></div></div>
          </h2>
        </div>

        {/* Right Column (5 columns): The Standard / The Philosophy */}
        <div 
          ref={rightColRef}
          className="md:col-span-5 flex flex-col justify-center h-full relative pl-0 md:pl-12 lg:pl-16 mt-12 md:mt-0 pb-16 md:pb-0"
        >
          {/* Animated Vertical Divider */}
          <div 
            ref={dividerRef}
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[1px] bg-white/[0.15] h-[50%]"
          />

          <div className="flex flex-col gap-10 lg:gap-14">
            <div>
              <p className="reveal-eyebrow text-xs tracking-[0.25em] text-xbd-text/80 mb-6 uppercase font-bold">
                THE XBD STANDARD
              </p>
              
              {/* Staggered Word Reveal */}
              <p className="font-body text-base lg:text-[1.1rem] xl:text-[1.25rem] leading-relaxed text-xbd-text/70 max-w-[440px] flex flex-wrap">
                {philosophyWords.map((word, i) => (
                  <span key={i} className="overflow-hidden inline-block mr-[0.25em] mb-[0.2em]">
                    <span className="split-word inline-block transform-gpu">{word}</span>
                  </span>
                ))}
              </p>

              <div className="reveal-signature mt-6">
                <strong className="text-xbd-text font-normal text-base lg:text-[1.1rem] xl:text-[1.25rem]">
                  What we design is exactly what we build.
                </strong>
              </div>
            </div>
            
            <div className="reveal-signature">
              <p className="font-display text-2xl lg:text-[1.75rem] tracking-tight text-xbd-text mb-1">ELLEN SØHOEL</p>
              <p className="text-[10px] tracking-[0.2em] text-xbd-text/60">FOUNDER / DESIGN DIRECTOR</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
PhilosophyBridge.displayName = "PhilosophyBridge";
export default PhilosophyBridge;
