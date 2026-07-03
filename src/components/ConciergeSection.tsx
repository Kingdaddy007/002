"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// --- SVG Icons ---
const InstagramIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const LinkedinIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const FacebookIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);
const YoutubeIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>);
const PinterestIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z"/></svg>);

export default function ConciergeSection() {
  const containerRef = useRef<HTMLElement>(null);
  const footerWrapperRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Form fade in
    const conciergeTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    const splitWords = gsap.utils.toArray(".split-word");

    conciergeTl
      .from(".concierge-tag", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" })
      .fromTo(splitWords, { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.04, duration: 1.0, ease: "power3.out" }, "-=0.6")
      .from(".form-group", { opacity: 0, y: 20, stagger: 0.15, duration: 0.8, ease: "power2.out" }, "-=0.6")
      .from(".concierge-btn", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.4");

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

  return (
    <div ref={containerRef} className="relative w-full bg-xbd-bg-alt flex flex-col z-10">
      
      {/* 1. The Concierge Form Section */}
      <section className="relative w-full bg-xbd-bg-alt text-xbd-text flex flex-col justify-center py-10 md:py-16 px-6 md:px-12 z-20 shadow-[0_20px_40px_rgba(0,0,0,0.05)]" id="concierge">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 md:gap-24">
          
          {/* Left Column: Typography */}
          <div className="w-full md:w-5/12 flex flex-col">
            <span className="concierge-tag font-sans text-[9px] md:text-[10px] font-medium text-xbd-gold tracking-[0.25em] block mb-4 uppercase">
              Selective Inquiry
            </span>
            <h2 className="concierge-title font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight text-xbd-text mb-8 flex flex-wrap">
              {"Your next space begins here.".split(" ").map((word, i) => (
                <span key={i} className="overflow-hidden inline-block mr-[0.25em]">
                  <span className="split-word inline-block transform-gpu">{word}</span>
                </span>
              ))}
            </h2>
            <p className="font-sans text-sm md:text-base text-xbd-text/70 leading-relaxed max-w-md">
              We selectively accept commissions for luxury residential, commercial, and masterplanning projects worldwide. Provide a brief overview of your vision, and our directors will be in touch.
            </p>
          </div>
          
          {/* Right Column: The Form */}
          <div className="w-full md:w-6/12">
            <form className="w-full flex flex-col gap-8 md:gap-10" id="inquiry-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group relative flex flex-col group">
                <label htmlFor="project-location" className="font-sans text-xs font-semibold tracking-[0.2em] text-xbd-gold mb-2 uppercase">Project Location</label>
                <input type="text" id="project-location" placeholder="e.g. Dubai, London, Riyadh" required className="bg-transparent border-none outline-none py-2 text-xbd-text placeholder:text-xbd-text/40 font-display text-lg md:text-xl font-light tracking-wide w-full transition-all duration-500 group-focus-within:pl-2" />
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10 transition-colors duration-500 group-focus-within:bg-xbd-gold"></span>
              </div>
              
              <div className="form-group relative flex flex-col group">
                <label htmlFor="project-scale" className="font-sans text-xs font-semibold tracking-[0.2em] text-xbd-gold mb-2 uppercase">Project Scale</label>
                <input type="text" id="project-scale" placeholder="e.g. Private Villa, Commercial Tower" required className="bg-transparent border-none outline-none py-2 text-xbd-text placeholder:text-xbd-text/40 font-display text-lg md:text-xl font-light tracking-wide w-full transition-all duration-500 group-focus-within:pl-2" />
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10 transition-colors duration-500 group-focus-within:bg-xbd-gold"></span>
              </div>
              
              <div className="form-group relative flex flex-col group">
                <label htmlFor="client-name" className="font-sans text-xs font-semibold tracking-[0.2em] text-xbd-gold mb-2 uppercase">Your Name</label>
                <input type="text" id="client-name" placeholder="John Doe" required className="bg-transparent border-none outline-none py-2 text-xbd-text placeholder:text-xbd-text/40 font-display text-lg md:text-xl font-light tracking-wide w-full transition-all duration-500 group-focus-within:pl-2" />
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10 transition-colors duration-500 group-focus-within:bg-xbd-gold"></span>
              </div>
              
              <div className="form-group relative flex flex-col group">
                <label htmlFor="client-contact" className="font-sans text-xs font-semibold tracking-[0.2em] text-xbd-gold mb-2 uppercase">Your Email</label>
                <input type="email" id="client-contact" placeholder="john@example.com" required className="bg-transparent border-none outline-none py-2 text-xbd-text placeholder:text-xbd-text/40 font-display text-lg md:text-xl font-light tracking-wide w-full transition-all duration-500 group-focus-within:pl-2" />
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10 transition-colors duration-500 group-focus-within:bg-xbd-gold"></span>
              </div>
              
              <button type="submit" aria-label="Submit Inquiry" className="concierge-btn self-start mt-2 bg-transparent border border-xbd-gold text-xbd-gold font-sans text-[9px] font-medium tracking-[0.25em] py-3 px-8 uppercase flex items-center gap-4 transition-all duration-500 hover:bg-xbd-gold hover:text-xbd-bg hover:-translate-y-1 group">
                <span className="btn-text">Request Consultation</span>
                <span className="btn-arrow transition-transform duration-500 group-hover:translate-x-1">➔</span>
              </button>
            </form>
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
                <span className="font-sans text-[9px] font-medium tracking-[0.2em] text-xbd-gold uppercase">Dubai HQ</span>
                <span className="font-display text-base md:text-lg font-light tracking-wide opacity-80 leading-relaxed">
                  Building 7, Dubai Design District<br/>
                  Dubai, UAE
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-sans text-[9px] font-medium tracking-[0.2em] text-xbd-gold uppercase">London</span>
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
                  <a href="#" aria-label="Instagram" className="hover:text-xbd-gold hover:opacity-100 transition-all">
                    <InstagramIcon />
                  </a>
                  <a href="#" aria-label="LinkedIn" className="hover:text-xbd-gold hover:opacity-100 transition-all">
                    <LinkedinIcon />
                  </a>
                  <a href="#" aria-label="Pinterest" className="hover:text-xbd-gold hover:opacity-100 transition-all">
                    <PinterestIcon />
                  </a>
                  <a href="#" aria-label="Facebook" className="hover:text-xbd-gold hover:opacity-100 transition-all">
                    <FacebookIcon />
                  </a>
                  <a href="#" aria-label="YouTube" className="hover:text-xbd-gold hover:opacity-100 transition-all">
                    <YoutubeIcon />
                  </a>
                </div>
                <div className="flex items-center gap-3 md:gap-4 opacity-80">
                  <a href="#" className="hover:text-xbd-gold hover:opacity-100 transition-colors">Privacy Policy</a>
                  <span className="opacity-40">|</span>
                  <a href="#" className="hover:text-xbd-gold hover:opacity-100 transition-colors">FAQ</a>
                </div>
              </div>
            </div>
          </div>

        </footer>
      </div>
    </div>
  );
}
