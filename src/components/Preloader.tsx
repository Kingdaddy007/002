"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slabRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const enterBtnRef = useRef<HTMLButtonElement>(null);
  const curtainTextRef = useRef<HTMLDivElement>(null);
  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const darkVideoRef = useRef<HTMLVideoElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  // Lock scrolling during preloader and reset to top
  useEffect(() => {
    // Force scroll to top on load/refresh before browser can restore
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Lock body scrolling
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Initialize cursor & mouse 3D tilt parallax (from cinematic motion references)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

      // 3D Tilt for the Main Invitation Card
      gsap.to(".main-card", {
        rotateY: x * 5,
        rotateX: -y * 5,
        x: x * 4,
        y: y * 4,
        duration: 0.8,
        ease: "power2.out",
      });

      // Custom cursor mapping
      gsap.to(".custom-cursor", {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Fluid video background softly fades and scales in (the "z-axis" feel)
    // Removed the blur() filter because blurring an actively playing video causes massive GPU lag/stuttering
    tl.fromTo(
      lightVideoRef.current,
      { opacity: 0, scale: 1.15 },
      { opacity: 1, scale: 1, duration: 2.5, ease: "power2.out" },
      0
    );

    // 2. Logo emerges with "The Wipe" (reveals from top to bottom like a curtain, not a fade)
    tl.fromTo(
      logoRef.current,
      { clipPath: "inset(0% 0 100% 0)", opacity: 0, y: 10 },
      { clipPath: "inset(0% 0 0% 0)", opacity: 0.9, y: 0, duration: 4.0, ease: "power2.inOut" },
      3.0 // Let the fluid video play alone for a full 3 seconds
    );

    // 3. Enter button fades in
    tl.fromTo(
      enterBtnRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
      "-=1.0" // Start near the end of the logo animation
    );

  }, { scope: containerRef });

  const handleEnter = () => {
    if (isLoaded) return;
    setIsLoaded(true);

    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
      }
    });

    // Fade out UI
    tl.to(enterBtnRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    }, 0);

    // Push the logo massively forward (scale up) - Slowed down
    tl.to(".main-card", {
      scale: 18,
      opacity: 0,
      duration: 2.8,
      ease: "power2.inOut"
    }, 0.1);

    // Crossfade the Light Video out and the Dark Video in
    tl.to(lightVideoRef.current, {
      opacity: 0,
      duration: 1.0, // Ends at 1.5s
      ease: "power2.inOut",
      onComplete: () => {
        if (lightVideoRef.current) lightVideoRef.current.pause();
      }
    }, 0.5);

    tl.to(darkVideoRef.current, {
      opacity: 1,
      duration: 1.5,
      ease: "power2.inOut"
    }, 0.5);
    
    // Fade out custom cursor
    tl.to(".custom-cursor", {
      opacity: 0,
      duration: 0.5
    }, 0.2);

    // Reveal Typographic Curtain structurally
    tl.set(curtainTextRef.current, { opacity: 1 }, 1.5);
    tl.fromTo(".curtain-char", {
      y: "120%"
    }, {
      y: "0%",
      duration: 1.2,
      stagger: 0.03,
      ease: "power4.out",
      force3D: true
    }, 1.6);

    // The text splits up and down violently
    tl.to(".curtain-char", {
      y: (i) => i % 2 === 0 ? "-150%" : "150%",
      opacity: 0,
      duration: 1.5,
      ease: "power3.inOut",
      force3D: true
    }, 6.0);

    // Fade out the dark slab to reveal the VideoHero
    tl.to(slabRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        if (darkVideoRef.current) darkVideoRef.current.pause();
        document.body.style.overflow = ""; // Unlock scrolling
        if (containerRef.current) {
          containerRef.current.style.pointerEvents = "none"; // Unlock clicking for the main page
        }
        setIsLoaded(true);
      }
    }, 6.0);
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-transparent cursor-none"
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
    >
      {/* Custom Cursor - Fine coordinate pointer */}
      <div className="custom-cursor fixed top-0 left-0 w-4 h-4 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-[#121212] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-12 h-[1px] bg-[#121212] opacity-35 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-[1px] h-12 bg-[#121212] opacity-35 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div ref={slabRef} className="absolute inset-0 bg-[#181615] origin-top z-0 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden">
        <video 
          ref={lightVideoRef}
          src="/videos/bg-light-fluid.mp4.mp4" 
          autoPlay 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-0"
        />
        <video 
          ref={darkVideoRef}
          src="/videos/bg-dark-fluid.mp4.mp4" 
          autoPlay 
          muted 
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-0"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center py-16 px-8 mt-[10%]">
        
        {/* Center Invitation Card */}
        <div 
          className="main-card flex flex-col items-center text-center pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          
          {/* Full Logo Composite */}
          <div ref={logoRef} className="opacity-0 mb-20 flex flex-col items-center justify-center px-8 pt-2 pb-4 drop-shadow-[0_0_20px_rgba(242,237,230,0.6)]">
            <Image 
              src="/xbd-fav-icon.png" 
              alt="XBD Monogram" 
              width={75} 
              height={75} 
              className="opacity-95 mb-4"
              priority
            />
            <div className="flex flex-col items-center text-[#121212]">
              <span className="font-display text-[2.2rem] tracking-[0.4em] ml-[0.4em] leading-none">XBD</span>
              <span className="font-space text-[10px] tracking-[0.5em] uppercase mt-4 font-bold ml-[0.5em] opacity-80">Collective</span>
              <div className="w-[140%] h-[1px] bg-[#121212] opacity-30 mt-5"></div>
            </div>
          </div>

          {/* Unique UI Enter Button */}
          <button
            ref={enterBtnRef}
            onClick={handleEnter}
            className="pointer-events-auto group relative flex flex-col items-center justify-center opacity-0 mt-4 cursor-none drop-shadow-[0_0_15px_rgba(242,237,230,0.6)]"
          >
            <div className="flex items-center gap-8 group-hover:gap-4 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]">
              <span className="w-8 h-[1px] bg-[#121212] opacity-60 group-hover:opacity-100 group-hover:w-3 transition-all duration-700"></span>
              <span className="font-space text-[11px] font-bold tracking-[0.5em] text-[#121212] uppercase ml-[0.5em]">
                Enter
              </span>
              <span className="w-8 h-[1px] bg-[#121212] opacity-60 group-hover:opacity-100 group-hover:w-3 transition-all duration-700"></span>
            </div>
            
            {/* Subtle architectural coordinates below */}
            <span className="absolute -bottom-6 font-space text-[7px] tracking-[0.3em] text-[#121212] opacity-0 group-hover:opacity-40 transition-opacity duration-500 delay-100 uppercase">
              INITIATE . VOL
            </span>
          </button>
        </div>

      </div>

      {/* The Typographic Curtain */}
      <div ref={curtainTextRef} className="absolute inset-0 z-50 flex items-center justify-center opacity-0 pointer-events-none">
        <h1 className="font-display text-[#D4C5B3] text-[5vw] tracking-widest text-center leading-[1.2] uppercase flex flex-col justify-center items-center">
          <div className="flex gap-4 overflow-hidden py-2">
             {"THE".split("").map((char, i) => <span key={`w1-${i}`} className="curtain-char inline-block will-change-transform">{char}</span>)}
             <span className="w-4"></span>
             {"REALITY".split("").map((char, i) => <span key={`w2-${i}`} className="curtain-char inline-block will-change-transform">{char}</span>)}
          </div>
          <div className="flex gap-4 overflow-hidden py-2 mt-2">
             {"OF".split("").map((char, i) => <span key={`w3-${i}`} className="curtain-char inline-block will-change-transform">{char}</span>)}
             <span className="w-4"></span>
             {"THE".split("").map((char, i) => <span key={`w4-${i}`} className="curtain-char inline-block will-change-transform">{char}</span>)}
          </div>
          <div className="flex gap-4 overflow-hidden py-2 mt-2">
             {"EXTRAORDINARY".split("").map((char, i) => <span key={`w5-${i}`} className="curtain-char inline-block will-change-transform">{char}</span>)}
          </div>
        </h1>
      </div>
    </div>
  );
}
