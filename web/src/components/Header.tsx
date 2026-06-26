import React from "react";
import Link from "next/link";

const Logo = () => (
  <svg width="64" height="48" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Infinity Symbol */}
    <path
      d="M20 18C15.5817 18 12 14.4183 12 10C12 5.58172 15.5817 2 20 2C24.4183 2 28 5.58172 28 10C28 12.3905 26.9537 14.5367 25.2933 16"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M44 2C48.4183 2 52 5.58172 52 10C52 14.4183 48.4183 18 44 18C39.5817 18 36 14.4183 36 10C36 7.60948 37.0463 5.46328 38.7067 4"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M25.2933 16L38.7067 4M25.2933 4L38.7067 16"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    {/* Text Below */}
    <text x="32" y="32" fontSize="10" letterSpacing="4" textAnchor="middle" fill="currentColor" className="font-display font-medium">
      X B D
    </text>
    <text x="32" y="44" fontSize="5" letterSpacing="2" textAnchor="middle" fill="currentColor" className="font-body opacity-60">
      C O L L E C T I V E
    </text>
  </svg>
);

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-xl bg-white/40 border-b border-white/20">
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 h-24 flex items-center justify-between">
        <Link href="/" className="text-xbd-text hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex items-center gap-12 text-sm tracking-wide font-medium">
          <Link href="#architecture" className="text-xbd-text hover:text-xbd-gold transition-colors">
            ARCHITECTURE
          </Link>
          <Link href="#interiors" className="text-xbd-text hover:text-xbd-gold transition-colors">
            INTERIOR DESIGN
          </Link>
          <Link href="#media" className="text-xbd-text hover:text-xbd-gold transition-colors">
            MEDIA
          </Link>
          <Link href="#awards" className="text-xbd-text hover:text-xbd-gold transition-colors">
            AWARDS
          </Link>
          <Link href="#contact" className="text-xbd-text hover:text-xbd-gold transition-colors">
            CONTACT
          </Link>
        </nav>
      </div>
    </header>
  );
}
