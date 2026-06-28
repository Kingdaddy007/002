import React from "react";
import Link from "next/link";

const FullLogo = () => (
  <div className="flex flex-col items-center justify-center text-current">
    {/* 
      We apply brightness-0 and invert to turn the original black logo 
      into pure white so it stands out against the dark video background 
    */}
    <img 
      src="/xbd-logo.png" 
      alt="XBD Logo Mark" 
      className="w-12 h-12 mb-0.5 object-contain filter brightness-0 invert" 
    />
    <span className="font-display text-[22px] tracking-[0.25em] leading-none mb-1.5 ml-1">X B D</span>
    <div className="flex flex-col items-center w-full">
      <span className="font-body text-[8px] tracking-[0.5em] leading-none mb-1 ml-[0.3em]">COLLECTIVE</span>
      <div className="h-[1px] w-full bg-current opacity-40"></div>
    </div>
  </div>
);

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-32 flex items-center justify-between text-white">
        
        {/* Left: Full Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <FullLogo />
        </Link>
        
        {/* Center: Navigation (Placeholder until we decide on the new structure) */}
        <nav className="hidden md:flex items-center gap-12 text-xs tracking-widest font-body uppercase">
          <Link href="#portfolio" className="hover:text-white/60 transition-colors">
            Portfolio
          </Link>
          <Link href="#studio" className="hover:text-white/60 transition-colors">
            Studio
          </Link>
          <Link href="#journal" className="hover:text-white/60 transition-colors">
            Journal
          </Link>
          <Link href="#contact" className="hover:text-white/60 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right: Hamburger / Menu for the new reference later */}
        <button className="hidden md:flex items-center gap-3 hover:opacity-70 transition-opacity">
          <span className="font-body text-xs tracking-widest uppercase">Menu</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 8H20M4 16H20" strokeLinecap="round"/>
          </svg>
        </button>

      </div>
    </header>
  );
}
