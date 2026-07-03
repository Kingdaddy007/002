"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const FullLogo = ({ isLightText }: { isLightText: boolean }) => (
  <div className="flex flex-col items-center justify-center text-current">
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Hide header when scrolling down past the top of the hero
      if (scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // In Phase 2, VideoHero is pinned for 400vh.
      // The timeline total duration is 6.5 units.
      const timelineUnit = (4.0 * vh) / 6.5;
      
      // Scene 2 (white interior) and Scene 3 (masterplan) are active 
      // roughly between timeline positions 0.5 and 3.3
      const scene2and3Start = 0.5 * timelineUnit;
      const scene2and3End = 3.3 * timelineUnit;
      
      // Philosophy now sits below VideoHero in normal flow.
      // VideoHero is 100vh + 400vh pin = 500vh total height.
      // Philosophy starts entering the screen at 400vh and is fully in at 500vh.
      // We trigger the dark header exactly as the light background hits the top of the screen.
      const philosophyStart = 4.9 * vh;

      if (scrollY >= scene2and3Start && scrollY <= scene2and3End) {
        setIsLightText(false); // Dark text for bright slides
      } else if (scrollY > philosophyStart) {
        setIsLightText(false); // Dark text for limestone sections
      } else {
        setIsLightText(true); // White text for everything else
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize on mount
    
    return () => window.removeEventListener("scroll", handleScroll);
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
        <button aria-label="Open Navigation Menu" className="hidden md:flex items-center gap-3 hover:opacity-70 transition-opacity">
          <span className="font-body text-xs tracking-widest uppercase">Menu</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 8H20M4 16H20" strokeLinecap="round"/>
          </svg>
        </button>

      </div>
    </header>
  );
}
