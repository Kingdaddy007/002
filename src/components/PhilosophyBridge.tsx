"use client";

import React, { useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";

export interface PhilosophyBridgeHandle {
  buildTimeline: (tl: gsap.core.Timeline, startTime: number) => void;
}

const PhilosophyBridge = forwardRef<PhilosophyBridgeHandle>((props, ref) => {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    buildTimeline: (masterTl: gsap.core.Timeline, startTime: number) => {
      // Phase timings relative to startTime:
      // 0.0 – 1.5: Text rolls in (cylinder projection) + right column fades in
      // 1.5 – 4.0: LOCK PHASE — text holds steady for reading (2.5s of real timeline duration)
      // 4.0 – 5.5: Text rolls out + right column fades out

      // 1. Background Parallax during the entire pin (stretches across all phases)
      masterTl.fromTo(bgRef.current,
        { yPercent: -10 },
        { yPercent: 10, ease: "none", duration: 6 },
        startTime
      );

      // 2. CSS 3D Cylinder Projection — Roll In
      // Scope query to containerRef to avoid leaking into other components
      const textLines = containerRef.current 
        ? gsap.utils.toArray<HTMLElement>(containerRef.current.querySelectorAll(".cylinder-text"))
        : [];
      
      masterTl.fromTo(textLines, 
        { 
          rotationX: -60, 
          opacity: 0, 
          z: -100, 
          y: 100
        }, 
        {
          rotationX: 0,
          opacity: 1,
          z: 0,
          y: 0,
          stagger: 0.1,
          ease: "power2.out",
          duration: 1.5
        },
        startTime - 0.5 // Start slightly before the slide-up completes for seamless overlap
      );

      // 3. Right column (The Core content) fades in
      masterTl.fromTo(rightColRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          ease: "power2.out",
          duration: 1.5
        },
        startTime
      );

      // 4. LOCK PHASE — Hold the layout steady so the user can read.
      //    We use a real tween on a visible element to ensure the timeline
      //    actually occupies this duration (empty to({}) does NOT extend
      //    timeline length). The bg parallax already covers this range.
      //    Roll-out begins at startTime + 4.0, giving 2.5s of reading hold.

      // 5. Roll Out — Text disappears into depth
      masterTl.to(textLines, {
        rotationX: 80,
        opacity: 0,
        z: -300,
        y: -100,
        stagger: 0.1,
        ease: "power2.in",
        duration: 1.5,
        immediateRender: false // Prevent conflict with roll-in fromTo
      }, startTime + 4.0);

      // 6. Right column fades out
      masterTl.to(rightColRef.current, {
        opacity: 0,
        x: -50,
        duration: 1.5,
        ease: "power2.in",
        immediateRender: false // Prevent conflict with fade-in fromTo
      }, startTime + 4.2);
    }
  }));

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-[#050505] text-[#f4f0ec] overflow-hidden flex items-center shadow-[0_-30px_60px_rgba(0,0,0,1)] rounded-t-[40px]"
      style={{
        clipPath: "inset(0 0 0 0 round 40px 40px 0 0)" // Match the rounded top corners cleanly
      }}
    >
      {/* Heavy Monolithic Background Texture */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#050505]">
        <div ref={bgRef} className="absolute inset-[-20%] w-[140%] h-[140%]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent opacity-80 mix-blend-overlay"></div>
          {/* Noise texture to simulate stone pores */}
          <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1800px] mx-auto h-full grid grid-cols-1 md:grid-cols-12 pt-20 items-center">
        
        {/* Left Column (65% -> 8 columns): The Massive Hook with 3D Perspective */}
        <div 
          ref={leftColRef}
          className="md:col-span-8 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24 md:py-0"
          style={{ perspective: "1200px" }}
        >
          <div 
            ref={textWrapperRef}
            className="flex flex-col gap-8 lg:gap-16"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Hook 1 */}
            <h2 className="font-display text-[4rem] md:text-[6rem] lg:text-[7.5rem] xl:text-[8.5rem] leading-[0.85] tracking-[-0.03em] text-[#f4f0ec]">
              <div className="cylinder-text" style={{ transformOrigin: "50% 50% -200px" }}>Architecture that</div>
              <div className="cylinder-text" style={{ transformOrigin: "50% 50% -200px" }}>commands</div>
              <div className="cylinder-text" style={{ transformOrigin: "50% 50% -200px" }}>the skyline.</div>
            </h2>
            
            {/* Hook 2 */}
            <h2 className="font-display text-[4rem] md:text-[6rem] lg:text-[7.5rem] xl:text-[8.5rem] leading-[0.85] tracking-[-0.03em] text-[#f4f0ec]/40 ml-0 lg:ml-12">
              <div className="cylinder-text" style={{ transformOrigin: "50% 50% -200px" }}>Interiors that</div>
              <div className="cylinder-text" style={{ transformOrigin: "50% 50% -200px" }}>curate</div>
              <div className="cylinder-text" style={{ transformOrigin: "50% 50% -200px" }}>the silence.</div>
            </h2>
          </div>
        </div>

        {/* Right Column (35% -> 4 columns): The Core & Signature */}
        <div 
          ref={rightColRef}
          className="md:col-span-4 flex flex-col justify-end border-t md:border-t-0 md:border-l border-white/[0.08] px-6 md:px-10 lg:px-16 pb-24 md:pb-32 lg:pb-48 pt-12 md:pt-0"
        >
          <p className="font-body text-lg lg:text-xl leading-relaxed text-white/60 max-w-[400px]">
            We do not deal in abstract visions. From 76-story developments to microscopic joinery details, our methodology guarantees that <strong className="text-white/90 font-normal">what is designed is exactly what is built.</strong>
          </p>
          
          <div className="mt-16 lg:mt-24">
            <p className="text-[10px] tracking-[0.2em] text-white/40 mb-3">FOUNDER / DESIGN DIRECTOR</p>
            <p className="font-display text-2xl lg:text-3xl tracking-tight text-[#f4f0ec]">ELLEN SØHOEL</p>
          </div>
        </div>
      </div>
    </section>
  );
});

PhilosophyBridge.displayName = "PhilosophyBridge";
export default PhilosophyBridge;
