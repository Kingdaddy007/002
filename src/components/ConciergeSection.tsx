"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// --- SVG Icons ---
const InstagramIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const LinkedinIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const FacebookIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);
const YoutubeIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>);
const PinterestIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z"/></svg>);
const LocationPinIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>);

export default function ConciergeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const londonImgRef = useRef<HTMLImageElement>(null);
  const dubaiImgRef = useRef<HTMLImageElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  
  const footerWrapperRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const [londonTime, setLondonTime] = useState("");
  const [dubaiTime, setDubaiTime] = useState("");

  useEffect(() => {
    const updateTimes = () => {
      try {
        const formatterLondon = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: true });
        const formatterDubai = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', hour12: true });
        setLondonTime(formatterLondon.format(new Date()));
        setDubaiTime(formatterDubai.format(new Date()));
      } catch (e) {
        console.error("Time formatting error", e);
      }
    };
    updateTimes();
    const interval = setInterval(updateTimes, 10000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    // Reveal form elements on scroll into view
    gsap.from(".ledger-item", {
      scrollTrigger: {
        trigger: formSectionRef.current,
        start: "top 75%",
      },
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out"
    });

    // Grounded Footer Parallax Reveal
    gsap.fromTo(footerRef.current,
      { yPercent: -40 },
      {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: footerWrapperRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      }
    );
  }, { scope: containerRef });

  const handleHover = (city: 'london' | 'dubai' | null) => {
    if (city === 'london') {
      gsap.to(londonImgRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" });
      gsap.to(dubaiImgRef.current, { opacity: 0, duration: 0.6, ease: "power2.out" });
    } else if (city === 'dubai') {
      gsap.to(dubaiImgRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" });
      gsap.to(londonImgRef.current, { opacity: 0, duration: 0.6, ease: "power2.out" });
    } else {
      gsap.to([londonImgRef.current, dubaiImgRef.current], { opacity: 0, duration: 0.6, ease: "power2.out" });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full bg-[#0A0A0A] flex flex-col z-10">
      
      {/* 1. The Cinematic Split Screen Locations Section */}
      <section id="concierge" className="relative w-full min-h-screen flex flex-col lg:flex-row z-20">
        
        {/* Left Panel: The Interactive Imagery */}
        <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-screen overflow-hidden bg-[#111]">
          {/* Base Layer: Dark Background */}
          <div className="absolute inset-0 w-full h-full bg-[#111]"></div>
          
          {/* London Layer (Hidden by default) */}
          <div ref={londonImgRef} className="absolute inset-0 w-full h-full opacity-0 pointer-events-none">
            <img 
              src="/images/london_mayfair_facade_1783053217126.jpg" 
              alt="Mayfair London Atelier" 
              className="w-full h-full object-cover" 
            />
            {/* Subtle dark overlay for mood */}
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Dubai Layer (Hidden by default) */}
          <div ref={dubaiImgRef} className="absolute inset-0 w-full h-full opacity-0 pointer-events-none">
            <img 
              src="/images/dubai_d3_facade_1783053226216.jpg" 
              alt="Dubai Design District Atelier" 
              className="w-full h-full object-cover" 
            />
            {/* Subtle dark overlay for mood */}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>

        {/* Right Panel: The Private Ledger Form */}
        <div ref={formSectionRef} className="w-full lg:w-1/2 bg-[#0A0A0A] text-white flex flex-col justify-between py-16 lg:py-24 px-8 md:px-16 lg:px-24">
          
          {/* Top: Header */}
          <div className="ledger-item mb-16">
            <span className="font-sans text-[9px] md:text-[10px] font-medium text-[#C8B69E] tracking-[0.25em] block mb-3 uppercase">
              Private Commissions
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-none text-white">
              GET IN TOUCH
            </h2>
          </div>

          {/* Middle: The Minimal Ledger Form */}
          <form className="w-full flex flex-col gap-8 mb-24" id="inquiry-form" onSubmit={(e) => e.preventDefault()}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <div className="ledger-item relative flex flex-col group">
                <input type="text" id="client-name" placeholder="Name" required className="bg-transparent border-b border-white/20 outline-none py-3 text-white placeholder:text-white/40 font-sans text-xs md:text-sm tracking-widest uppercase transition-all duration-500 focus:border-[#C8B69E]" />
              </div>
              
              <div className="ledger-item relative flex flex-col group">
                <input type="email" id="client-email" placeholder="Email" required className="bg-transparent border-b border-white/20 outline-none py-3 text-white placeholder:text-white/40 font-sans text-xs md:text-sm tracking-widest uppercase transition-all duration-500 focus:border-[#C8B69E]" />
              </div>
            </div>

            <div className="ledger-item relative flex flex-col group w-full">
              <input type="text" id="project-phone" placeholder="Phone" className="bg-transparent border-b border-white/20 outline-none py-3 text-white placeholder:text-white/40 font-sans text-xs md:text-sm tracking-widest uppercase transition-all duration-500 focus:border-[#C8B69E]" />
            </div>
            
            <div className="ledger-item relative flex flex-col group w-full">
              <select id="project-budget" required defaultValue="" className="bg-transparent border-b border-white/20 outline-none py-3 text-white/40 font-sans text-xs md:text-sm tracking-widest uppercase transition-all duration-500 focus:border-[#C8B69E] appearance-none cursor-pointer">
                <option value="" disabled hidden>Budget Range</option>
                <option value="250k-500k" className="bg-[#111] text-white">$250k - $500k</option>
                <option value="500k-2m" className="bg-[#111] text-white">$500k - $2M</option>
                <option value="2m+" className="bg-[#111] text-white">$2M+</option>
              </select>
            </div>

            <div className="ledger-item relative flex flex-col group w-full">
              <textarea id="project-message" placeholder="Message" rows={2} required className="bg-transparent border-b border-white/20 outline-none py-3 text-white placeholder:text-white/40 font-sans text-xs md:text-sm tracking-widest uppercase transition-all duration-500 focus:border-[#C8B69E] resize-none"></textarea>
            </div>

            <div className="ledger-item mt-4">
              <button type="submit" aria-label="Submit Inquiry" className="text-white/60 hover:text-white font-sans text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase flex items-center gap-4 transition-all duration-500 group">
                <span className="btn-text">Send Message</span>
                <span className="btn-arrow transition-transform duration-500 group-hover:translate-x-2">➔</span>
              </button>
            </div>
          </form>

          {/* Bottom: Interactive Locations */}
          <div className="flex flex-col md:flex-row justify-between border-t border-white/10 pt-12 gap-12 md:gap-8">
            
            {/* LONDON */}
            <div 
              className="ledger-item group flex flex-col cursor-pointer flex-1"
              onMouseEnter={() => handleHover('london')}
              onMouseLeave={() => handleHover(null)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#C8B69E] transition-colors duration-500 group-hover:border-[#C8B69E] group-hover:bg-[#C8B69E]/10">
                  <LocationPinIcon />
                </div>
                <h3 className="font-sans text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-white transition-colors duration-500 group-hover:text-[#C8B69E]">London</h3>
              </div>
              <p className="font-sans text-[10px] text-white/50 leading-relaxed tracking-widest uppercase mb-4">
                25 Heddon Street<br/>
                London, W1B 4BH<br/>
                United Kingdom
              </p>
              <p className="font-sans text-[10px] text-white/70 tracking-widest uppercase mb-1">+44 20 7323 8416</p>
              <p className="font-sans text-[9px] text-[#C8B69E] tracking-widest uppercase flex items-center gap-2 mt-auto pt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                {londonTime} LOCAL
              </p>
            </div>

            {/* DIVIDER (Desktop) */}
            <div className="hidden md:block w-px bg-white/10 h-full"></div>

            {/* DUBAI */}
            <div 
              className="ledger-item group flex flex-col cursor-pointer flex-1"
              onMouseEnter={() => handleHover('dubai')}
              onMouseLeave={() => handleHover(null)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#C8B69E] transition-colors duration-500 group-hover:border-[#C8B69E] group-hover:bg-[#C8B69E]/10">
                  <LocationPinIcon />
                </div>
                <h3 className="font-sans text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-white transition-colors duration-500 group-hover:text-[#C8B69E]">Dubai</h3>
              </div>
              <p className="font-sans text-[10px] text-white/50 leading-relaxed tracking-widest uppercase mb-4">
                Burj Khalifa District<br/>
                Downtown Dubai<br/>
                United Arab Emirates
              </p>
              <p className="font-sans text-[10px] text-white/70 tracking-widest uppercase mb-1">+971 4 458 6298</p>
              <p className="font-sans text-[9px] text-[#C8B69E] tracking-widest uppercase flex items-center gap-2 mt-auto pt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                {dubaiTime} LOCAL
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 2. The Grounded Footer (Parallax Reveal) */}
      <div ref={footerWrapperRef} className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden z-10 bg-[#1A1A1A]">
        <footer ref={footerRef} className="absolute top-0 left-0 w-full h-full flex flex-col justify-between pt-16 pb-12 px-6 md:px-12 text-white">
          
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full z-0">
            <img 
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070" 
              alt="Luxury Interior Space" 
              className="w-full h-full object-cover brightness-[0.35]" 
            />
          </div>

          {/* Footer Content */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between pt-8">
            {/* Top Row: Links & Info */}
            <div className="w-full flex flex-col md:flex-row gap-12 md:gap-32">
              <div className="flex flex-col gap-3">
                <span className="font-sans text-[9px] font-medium tracking-[0.2em] text-[#C8B69E] uppercase">Dubai HQ</span>
                <span className="font-display text-base md:text-lg font-light tracking-wide opacity-80 leading-relaxed">
                  Building 7, Dubai Design District<br/>
                  Dubai, UAE
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-sans text-[9px] font-medium tracking-[0.2em] text-[#C8B69E] uppercase">London</span>
                <span className="font-display text-base md:text-lg font-light tracking-wide opacity-80 leading-relaxed">
                  Mayfair, London<br/>
                  United Kingdom
                </span>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col w-full mt-auto">
              {/* Logo & Copyright */}
              <div className="w-full flex flex-col md:flex-row justify-between items-end pb-4 border-b border-white/20 mb-4">
                <h1 className="font-display text-6xl md:text-8xl font-light tracking-tight leading-none">
                  X B D
                </h1>
                <div className="font-sans text-[9px] font-light tracking-[0.2em] uppercase opacity-60 mt-6 md:mt-0 pb-2">
                  © 2026 XBD COLLECTIVE. ALL RIGHTS RESERVED.
                </div>
              </div>

              {/* Sub-Footer: Socials & Policies */}
              <div className="w-full flex flex-row justify-between items-center opacity-60 text-[9px] md:text-[10px] tracking-widest uppercase">
                <div className="flex items-center gap-4 md:gap-6">
                  <a href="#" aria-label="Instagram" className="hover:text-[#C8B69E] hover:opacity-100 transition-all">
                    <InstagramIcon />
                  </a>
                  <a href="#" aria-label="LinkedIn" className="hover:text-[#C8B69E] hover:opacity-100 transition-all">
                    <LinkedinIcon />
                  </a>
                  <a href="#" aria-label="Pinterest" className="hover:text-[#C8B69E] hover:opacity-100 transition-all">
                    <PinterestIcon />
                  </a>
                  <a href="#" aria-label="Facebook" className="hover:text-[#C8B69E] hover:opacity-100 transition-all">
                    <FacebookIcon />
                  </a>
                  <a href="#" aria-label="YouTube" className="hover:text-[#C8B69E] hover:opacity-100 transition-all">
                    <YoutubeIcon />
                  </a>
                </div>
                <div className="flex items-center gap-3 md:gap-4 opacity-80">
                  <a href="#" className="hover:text-[#C8B69E] hover:opacity-100 transition-colors">Privacy Policy</a>
                  <span className="opacity-40">|</span>
                  <a href="#" className="hover:text-[#C8B69E] hover:opacity-100 transition-colors">FAQ</a>
                </div>
              </div>
            </div>
          </div>

        </footer>
      </div>
    </div>
  );
}
