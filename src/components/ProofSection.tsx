"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProofSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !videoRef.current || !captionRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle parallax effect on the video
      gsap.to(videoRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade in the caption as the section reaches the center of the viewport
      gsap.fromTo(
        captionRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center+=20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden"
    >
      <video
        ref={videoRef}
        src="/videos/solar-house-proof.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-[-10%] left-0 w-full h-[120%] object-cover pointer-events-none"
      />
      
      {/* Subtle vignette gradient to ensure caption legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2C2621]/60 via-transparent to-transparent pointer-events-none" />

      {/* Caption */}
      <div 
        ref={captionRef}
        className="absolute bottom-8 left-4 md:bottom-12 md:left-12 text-[#F7F5F2] font-body z-10"
      >
        <p className="text-xs md:text-sm uppercase tracking-[0.2em] opacity-80 mb-1">Solar House</p>
        <p className="text-sm md:text-base opacity-90">Architecture & Interiors</p>
      </div>
    </section>
  );
}
