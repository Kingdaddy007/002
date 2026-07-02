"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DisciplinesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Gentle scroll-driven parallax for images
    const images = gsap.utils.toArray<HTMLElement>(".parallax-img");
    
    images.forEach((img) => {
      // The parent needs overflow-hidden. We scale the image to 115% so there is room to move.
      gsap.fromTo(img,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });

    // Fade in text blocks as they enter the viewport
    const textBlocks = gsap.utils.toArray<HTMLElement>(".discipline-text");
    textBlocks.forEach((block) => {
      gsap.fromTo(block,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative z-10 w-full bg-xbd-bg text-xbd-text pt-24 pb-32 md:pt-48 md:pb-64 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-32 md:gap-64">
        
        {/* Block 1: Masterplan & Landscape (Macro Scale) */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
          <div className="w-full md:w-7/12 h-[50vh] md:h-[80vh] overflow-hidden relative">
            <img 
              src="https://www.xbdesign.com/wp-content/uploads/2024/07/NORVISKA_-XBD-Collective_Thuraya-Island-Masterplan_View05_a09-scaled.jpg" 
              alt="Thuraya Island Masterplan" 
              loading="lazy"
              className="parallax-img absolute inset-0 w-full h-full object-cover scale-[1.15] origin-center"
            />
          </div>
          <div className="discipline-text w-full md:w-4/12 text-left">
            <span className="text-[10px] tracking-[0.2em] text-xbd-text/60 uppercase mb-4 block">01 / The Macro</span>
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">Masterplan & Landscape</h3>
            <p className="font-body text-sm md:text-base leading-relaxed text-xbd-muted max-w-sm">
              We shape the environments that shape the architecture. True luxury begins long before the foundation is poured—it starts with how a structure breathes within its geography.
            </p>
          </div>
        </div>

        {/* Block 2: Architecture (Building Scale - Reversed) */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-20 md:-mt-[10vh]">
          <div className="w-full md:w-6/12 h-[60vh] md:h-[90vh] overflow-hidden relative">
            <img 
              src="https://www.xbdesign.com/wp-content/uploads/2024/07/Villa_03_Rear-view-night-scaled.jpg" 
              alt="Villa Rear View Night" 
              loading="lazy"
              className="parallax-img absolute inset-0 w-full h-full object-cover scale-[1.15] origin-center"
            />
          </div>
          <div className="discipline-text w-full md:w-4/12 md:text-right flex flex-col items-start md:items-end">
            <span className="text-[10px] tracking-[0.2em] text-xbd-text/60 uppercase mb-4 block">02 / The Form</span>
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">Architecture</h3>
            <p className="font-body text-sm md:text-base leading-relaxed text-xbd-muted max-w-sm md:ml-auto">
              Silhouettes that command the skyline while honoring their context. We design structures that are engineered not just for visual impact, but for enduring permanence.
            </p>
          </div>
        </div>

        {/* Block 3: Interiors (Human Scale) */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20 md:-mt-[15vh]">
          <div className="w-full md:w-8/12 h-[50vh] md:h-[70vh] overflow-hidden relative">
            <img 
              src="https://www.xbdesign.com/wp-content/uploads/2023/02/XBD-Emirates-Hills-E157-Finals-HD-60-scaled.jpg" 
              alt="Emirates Hills Interiors" 
              loading="lazy"
              className="parallax-img absolute inset-0 w-full h-full object-cover scale-[1.15] origin-center"
            />
          </div>
          <div className="discipline-text w-full md:w-4/12 text-left">
            <span className="text-[10px] tracking-[0.2em] text-xbd-text/60 uppercase mb-4 block">03 / The Intimate</span>
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">Interiors</h3>
            <p className="font-body text-sm md:text-base leading-relaxed text-xbd-muted max-w-sm">
              The spaces where life is actually lived. We choreograph light, material, and volume to create private sanctuaries defined by uncompromising tactile execution.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
