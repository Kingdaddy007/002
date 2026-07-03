"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FullLogo = ({ isLightText }: { isLightText: boolean }) => (
  <div className="flex flex-col items-center justify-center text-current transform scale-75 md:scale-100 origin-left md:origin-center transition-transform">
    {/* 
      We apply brightness-0 and invert to turn the original black logo 
      into pure white when over the dark video background.
    */}
    <img 
      src="/xbd-logo.png" 
      alt="XBD Logo Mark" 
      className={`w-12 h-12 mb-0.5 object-contain transition-all duration-300 ${isLightText ? "filter brightness-0 invert" : ""}`} 
    />
    <span className="font-display text-[22px] tracking-[0.25em] leading-none mb-1.5 ml-1">X B D</span>
    <div className="flex flex-col items-center w-full">
      <span className="font-body text-[8px] tracking-[0.5em] leading-none mb-1 ml-[0.3em]">COLLECTIVE</span>
      <div className="h-[1px] w-full bg-current opacity-40"></div>
    </div>
  </div>
);

export default function Header() {
  const [isLightText, setIsLightText] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Only show header at the very top of the page
      if (scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = scrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize on mount
    
    // Toggle dark text when entering Philosophy through the bottom of the page
    const t1 = ScrollTrigger.create({
      trigger: "#philosophy",
      start: "top 80px",
      endTrigger: "#concierge",
      end: "bottom top",
      onEnter: () => setIsLightText(false),
      onLeave: () => setIsLightText(true),
      onEnterBack: () => setIsLightText(false),
      onLeaveBack: () => setIsLightText(true),
    });

    // Toggle text color based on VideoHero pinned progress
    const t2 = ScrollTrigger.create({
      trigger: "#video-hero",
      start: "top top",
      end: "+=400%",
      onUpdate: (self) => {
        if (self.isActive) {
          const progress = self.progress;
          // Scene 2 and 3 are light backgrounds (roughly 0.15 to 0.6 progress)
          if (progress > 0.15 && progress < 0.6) {
            setIsLightText(false);
          } else {
            setIsLightText(true);
          }
        }
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      t1.kill();
      t2.kill();
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isLightText ? "text-white" : "text-xbd-text"} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-32 flex items-center justify-between">
        
        {/* Left: Full Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <FullLogo isLightText={isLightText} />
        </Link>
        
        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center gap-12 text-xs tracking-widest font-body uppercase">
          <Link href="#philosophy" className="hover:opacity-60 transition-opacity">
            Concept
          </Link>
          <Link href="#disciplines" className="hover:opacity-60 transition-opacity">
            Expertise
          </Link>
          <Link href="#team" className="hover:opacity-60 transition-opacity">
            People
          </Link>
          <Link href="#concierge" className="hover:opacity-60 transition-opacity">
            Inquire
          </Link>
        </nav>

        {/* Right: Hamburger / Menu */}
        <button aria-label="Open Navigation Menu" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
          <span className="hidden md:inline-block font-body text-xs tracking-widest uppercase">Menu</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 8H20M4 16H20" strokeLinecap="round"/>
          </svg>
        </button>

      </div>
    </header>
  );
}
