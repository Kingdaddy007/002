"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAudio } from "@/components/AudioProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FullLogo = ({ isLightText }: { isLightText: boolean }) => (
  <div className="flex flex-col items-center justify-center text-current transform scale-75 md:scale-100 origin-left md:origin-center transition-transform">
    {/* 
      We apply brightness-0 and invert to turn the original black logo 
      into pure white when over the dark video background.
    */}
    <Image
      src="/xbd-logo.png" 
      alt="XBD Logo Mark" 
      width={48}
      height={48}
      className={`w-12 h-12 mb-0.5 object-contain transition-all duration-300 ${isLightText ? "filter brightness-0 invert" : ""}`} 
    />
    <span className="font-display text-[22px] tracking-[0.25em] leading-none mb-1.5 ml-1">X B D</span>
    <div className="flex flex-col items-center w-full">
      <span className="font-body text-[8px] tracking-[0.5em] leading-none mb-1 ml-[0.3em]">COLLECTIVE</span>
      <div className="h-[1px] w-full bg-current opacity-40"></div>
    </div>
  </div>
);

const AudioToggle = () => {
  const { isPlaying, isMuted, toggleMute } = useAudio();

  return (
    <button
      onClick={toggleMute}
      className="flex items-center gap-2 md:gap-3 cursor-pointer hover:opacity-75 transition-opacity py-2 focus:outline-none"
      aria-label={isPlaying ? "Mute background music" : "Play background music"}
    >
      <span className="font-body text-[8px] tracking-[0.2em] uppercase leading-none opacity-80 select-none">
        {isPlaying ? "Sound On" : "Sound Off"}
      </span>
      <div className="flex items-end gap-[2px] h-[16px] w-[14px]">
        <div
          className={`w-[2px] rounded-[1px] bg-current transition-all duration-300 ${
            isPlaying ? "animate-bounce-bar-1" : "h-[3px]"
          }`}
        />
        <div
          className={`w-[2px] rounded-[1px] bg-current transition-all duration-300 ${
            isPlaying ? "animate-bounce-bar-2" : "h-[3px]"
          }`}
        />
        <div
          className={`w-[2px] rounded-[1px] bg-current transition-all duration-300 ${
            isPlaying ? "animate-bounce-bar-3" : "h-[3px]"
          }`}
        />
      </div>
    </button>
  );
};

export default function Header() {
  const [isLightText, setIsLightText] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsScrolled(scrollY > 50);

      // Hide header when scrolling down, show when scrolling up
      if (scrollY > 50) {
        setIsVisible(scrollY < lastScrollY.current);
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

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    document.body.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isLightText ? "text-white" : "text-xbd-text"
    } ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
    } ${
      isScrolled 
        ? isLightText 
          ? "bg-[#1A1A1A]/85 backdrop-blur-md border-b border-white/5 shadow-lg" 
          : "bg-[#F7F5F2]/85 backdrop-blur-md border-b border-[#2C2621]/5 shadow-sm"
        : "bg-transparent border-b border-transparent shadow-none"
    }`}>
      <div className={`max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between transition-all duration-500 ${
        isScrolled ? "h-20 md:h-24" : "h-28 md:h-32"
      }`}>
        
        {/* Left: Full Logo */}
        <div className="hover:opacity-80 transition-opacity cursor-pointer" onClick={handleLogoClick}>
          <FullLogo isLightText={isLightText} />
        </div>
        
        {/* Right: Navigation & Mute Toggle */}
        <div className="flex items-center gap-8 md:gap-12">
          <nav className="hidden md:flex items-center gap-12 text-[10px] tracking-widest font-body uppercase">
            <a href="#philosophy" onClick={(e) => handleScrollTo(e, '#philosophy')} className="hover:opacity-60 transition-opacity cursor-pointer">
              Philosophy
            </a>
            <a href="#disciplines" onClick={(e) => handleScrollTo(e, '#disciplines')} className="hover:opacity-60 transition-opacity cursor-pointer">
              Expertise
            </a>
            <a href="#team" onClick={(e) => handleScrollTo(e, '#team')} className="hover:opacity-60 transition-opacity cursor-pointer">
              People
            </a>
            <a href="#concierge" onClick={(e) => handleScrollTo(e, '#concierge')} className="hover:opacity-60 transition-opacity cursor-pointer">
              Inquire
            </a>
          </nav>
          
          <AudioToggle />
        </div>

      </div>
    </header>
  );
}
