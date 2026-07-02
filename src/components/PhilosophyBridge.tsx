"use client";

import React, { useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";

export interface PhilosophyBridgeHandle {
  buildTimeline: (tl: gsap.core.Timeline, startTime: number) => void;
}

const philosophyText = "True luxury is proven in physical execution. Whether we are engineering a 76-story architectural landmark or detailing the millimeter-precise joinery of a private interior, our discipline remains the same: we eliminate the drift between concept and reality.";
const philosophyWords = philosophyText.split(" ");

const PhilosophyBridge = forwardRef<PhilosophyBridgeHandle>((props, ref) => {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    buildTimeline: (masterTl: gsap.core.Timeline, startTime: number) => {
      // 1. Cinematic Left Typography Reveal
      // We start this at (startTime - 1.5) so it bleeds in WHILE the section is sliding up.
      const entranceStart = startTime - 1.5;
      
      const leftLines = containerRef.current 
        ? gsap.utils.toArray<HTMLElement>(containerRef.current.querySelectorAll(".reveal-left"))
        : [];
      
      masterTl.fromTo(leftLines, 
        { 
          yPercent: 100,
          opacity: 0
        }, 
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          duration: 2.0
        },
        entranceStart
      );

      // 2. Vertical Anchor Divider
      masterTl.fromTo(dividerRef.current,
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 1.5, ease: "power2.inOut" },
        entranceStart + 0.5
      );

      // 3. Right Typography "SplitText" Stagger Effect (The Scroll Typography Effect)
      const rightWords = containerRef.current
        ? gsap.utils.toArray<HTMLElement>(containerRef.current.querySelectorAll(".split-word"))
        : [];
      
      const eyebrow = containerRef.current?.querySelector(".reveal-eyebrow");
      
      const signatureElements = containerRef.current
        ? gsap.utils.toArray<HTMLElement>(containerRef.current.querySelectorAll(".reveal-signature"))
        : [];

      // Eyebrow appears quietly as context
      if (eyebrow) {
        masterTl.fromTo(eyebrow,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 1.5, ease: "power2.out" },
          entranceStart + 1.0
        );
      }

      // Body text scrubs in (starts right after eyebrow)
      masterTl.fromTo(rightWords,
        { opacity: 0, yPercent: 100 },
        { opacity: 1, yPercent: 0, stagger: 0.03, duration: 1.5, ease: "power3.out" },
        entranceStart + 1.2
      );

      // Closing hook and signature appear after the text finishes scrubbing
      masterTl.fromTo(signatureElements,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, stagger: 0.2, duration: 1.5, ease: "power2.out" },
        entranceStart + 3.0
      );

      // 4. Lock Phase (Holding text so it can be read)
      // Master timeline manages the scrub, so we give it 2 units of reading time before rollout.
      
      // 5. Roll Out Sequence (Slow, structural fade out)
      const rolloutStart = startTime + 2.0;
      
      masterTl.to(leftLines, {
        opacity: 0, y: -20, stagger: 0.1, duration: 1.5, ease: "power2.inOut", immediateRender: false
      }, rolloutStart);

      masterTl.to(dividerRef.current, {
        opacity: 0, duration: 1.5, ease: "power2.inOut", immediateRender: false
      }, rolloutStart + 0.2);

      masterTl.to(rightWords, {
        opacity: 0, stagger: 0.01, duration: 1.0, ease: "power2.inOut", immediateRender: false
      }, rolloutStart + 0.2);

      if (eyebrow) {
        masterTl.to(eyebrow, {
          opacity: 0, duration: 1.0, ease: "power2.inOut", immediateRender: false
        }, rolloutStart + 0.4);
      }

      masterTl.to(signatureElements, {
        opacity: 0, stagger: 0.1, duration: 1.0, ease: "power2.inOut", immediateRender: false
      }, rolloutStart + 0.4);
    }
  }));

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-xbd-bg text-xbd-text overflow-hidden flex items-center shadow-[0_-30px_60px_rgba(0,0,0,0.8)]"
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
            <div className="overflow-hidden"><div className="reveal-left transform-gpu">CONCEPT</div></div>
            <div className="overflow-hidden"><div className="reveal-left transform-gpu">TO</div></div>
            <div className="overflow-hidden"><div className="reveal-left transform-gpu">REALITY.</div></div>
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
              <p className="reveal-eyebrow text-[10px] tracking-[0.2em] text-xbd-text/60 mb-6 uppercase">
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
});

PhilosophyBridge.displayName = "PhilosophyBridge";
export default PhilosophyBridge;
