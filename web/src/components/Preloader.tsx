'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoMarkRef = useRef<SVGSVGElement>(null);
  const textMarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Initial State: paths hidden via strokeDasharray & strokeDashoffset
      // Using a large number (200) to ensure the path length is fully covered
      gsap.set('.logo-path', {
        strokeDasharray: 200,
        strokeDashoffset: 200,
      });

      gsap.set(textMarkRef.current, {
        opacity: 0,
        y: 10,
      });

      // 2. The Blueprint Animation (Drawing the logo)
      tl.to('.logo-path', {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: 'power3.inOut',
        stagger: 0.15, // Draw each line slightly offset
      })
      // 3. Fade in text and elegant shift up
      .to(textMarkRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
      }, '-=1.0')
      // 4. Hold for a moment, then fade the entire preloader out
      .to(containerRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut',
        delay: 0.8,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1C1C1C] text-[#F2EDE6] pointer-events-none"
    >
      {/* The Blueprint Logo Mark */}
      <svg 
        ref={logoMarkRef}
        viewBox="0 0 48 48" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinejoin="miter"
        strokeMiterlimit="4"
        className="w-16 h-auto mb-4"
      >
        <path d="M 8 24 L 16 14 L 32 34 L 40 24 L 32 14 L 16 34 Z" className="logo-path" />
      </svg>
      
      {/* The Typography */}
      <div 
        ref={textMarkRef}
        className="flex flex-col items-center font-light"
      >
        <span className="text-3xl tracking-[0.35em] mb-3 ml-[0.35em]">XBD</span>
        <span className="text-xs tracking-[0.5em] border-b border-[#F2EDE6]/30 pb-3 ml-[0.5em]">
          COLLECTIVE
        </span>
      </div>
    </div>
  );
}
