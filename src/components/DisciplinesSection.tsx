"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CurvedCinemaGallery from "./CurvedCinemaGallery";

gsap.registerPlugin(ScrollTrigger);

const disciplines = [
  {
    title: "Masterplan & Landscape",
    text: "We shape the environments that shape the architecture. True luxury begins long before the foundation is poured—it starts with how a structure breathes within its geography.",
    images: [
      "/assets/Masterplan%20&%20Landscape.jpg",
      "/landscape/02-1-scaled.jpg",
      "/landscape/6.-The-Jungalows-1.jpg",
      "/landscape/NORVISKA_-XBD-Collective_Thuraya-Island-Masterplan_View05_a09-scaled.jpg",
      "/landscape/NORVISKA_XBD-COLLECTIVE_THURAYA-ISLAND-MASTERPLAN_View02_05-scaled.jpg"
    ]
  },
  {
    title: "Architecture",
    text: "Silhouettes that command the skyline while honoring their context. We design structures that are engineered not just for visual impact, but for enduring permanence.",
    images: [
      "/assets/Architecture.jpg",
      "/architecture/1.-Ariant-Residence-1568x882.jpg",
      "/architecture/19-1920x1080_Riviera_Arch_XBD-Palm-Jumeirah-F91-76.jpg",
      "/architecture/3.-Golf-Views-1.jpg",
      "/architecture/Front-view_01-1-scaled.jpg",
      "/architecture/Villa_02-Rear-view-Night-scaled.jpg"
    ]
  },
  {
    title: "Interiors",
    text: "The spaces where life is actually lived. We choreograph light, material, and volume to create private sanctuaries defined by uncompromising tactile execution.",
    images: [
      "/assets/Interiors.jpg",
      "/interior/03-A-Interior-Design_P55-Villa_287-Pinto_7.-Family-Living_1920x1080.jpg",
      "/interior/20231130-Penthouse-bedroom-_2000-scaled.jpg",
      "/interior/2_Edit-copy-1.jpg",
      "/interior/Basement-Entertainment-opt-1_Post-scaled.jpg",
      "/interior/D-01.1-GF-Lobby-scaled.jpg",
      "/interior/Duplex-Terrace_2000-scaled.jpg",
      "/interior/Master-Ensuite-5k-scaled.jpg",
      "/interior/Type-4-Entrance-option-2-scaled.jpg",
      "/interior/Villa_04-Front-view-scaled.jpg",
      "/interior/XBD-Emirates-Hills-E157-Finals-HD-73.jpg",
      "/interior/duplex-final-_2000-scaled.jpg"
    ]
  }
];

// Helper to split text into word divs for staggered animation
const splitIntoWords = (text: string) => {
  return text.split(" ").map((word, i) => (
    <div key={i} className="inline-block overflow-hidden mr-[0.2em] last:mr-0 pb-1">
      <div className="title-word transform-gpu inline-block origin-bottom">{word}</div>
    </div>
  ));
};

export default function DisciplinesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeGallery, setActiveGallery] = useState<string[] | null>(null);

  useGSAP(() => {
    // Section Heading Animation
    gsap.fromTo(".section-heading .reveal-char",
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".section-heading",
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    const blocks = gsap.utils.toArray<HTMLElement>(".discipline-block");
    
    blocks.forEach((block) => {
      const imgContainer = block.querySelector(".img-frame");
      const img = block.querySelector(".parallax-img");
      const words = block.querySelectorAll(".title-word");
      const paragraph = block.querySelector(".desc-text");
      
      // Cinematic image reveal
      gsap.fromTo(imgContainer,
        { clipPath: "inset(15% 15% 15% 15%)", scale: 0.95 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 75%",
            toggleActions: "play reverse play reverse"
          }
        }
      );

      // Deep parallax for the image inside
      gsap.fromTo(img, 
        { yPercent: -15, scale: 1.2 },
        {
          yPercent: 15,
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: imgContainer,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

      // Staggered Title Words Reveal
      gsap.fromTo(words,
        { yPercent: 110, rotateZ: 2 },
        {
          yPercent: 0,
          rotateZ: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: block,
            start: "top 70%",
            toggleActions: "play reverse play reverse"
          }
        }
      );

      // Paragraph floats up elegantly
      gsap.fromTo(paragraph,
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0,
          duration: 1.2,
          delay: 0.2, // slightly after title starts
          ease: "power2.out",
          scrollTrigger: {
            trigger: block,
            start: "top 70%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    });

  }, { scope: sectionRef });

  return (
    <section 
      id="disciplines"
      ref={sectionRef}
      className="relative z-10 w-full bg-xbd-bg text-xbd-text py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Main Section Heading */}
        <div className="mb-24 md:mb-40 flex justify-center md:justify-start">
          <h2 className="section-heading font-sans text-sm md:text-base tracking-[0.4em] uppercase text-xbd-muted flex overflow-hidden">
            {"EXPERTISE".split("").map((char, i) => (
              <div key={i} className="overflow-hidden">
                <div className="reveal-char transform-gpu inline-block">
                  {char}
                </div>
              </div>
            ))}
          </h2>
        </div>

        <div className="flex flex-col gap-32 md:gap-40">
          {disciplines.map((disc, index) => {
            return (
              <div 
                key={index} 
                className="discipline-block flex flex-col items-start gap-12 md:gap-16 w-full"
              >
                {/* Text Side (Now full width, stacked above) */}
                <div className="w-full flex flex-col items-start text-left">
                  <div className="text-wrap flex flex-col max-w-3xl">
                    <h3 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6 md:mb-8 tracking-tight text-xbd-text flex flex-wrap leading-[1.1]">
                      {splitIntoWords(disc.title)}
                    </h3>
                    <p className="desc-text font-body text-base md:text-lg leading-relaxed text-xbd-muted max-w-2xl">
                      {disc.text}
                    </p>
                  </div>
                </div>

                {/* Image Side (Now full width 16:9 ratio below text) */}
                <div className="w-full flex justify-center">
                  <div 
                    className="img-frame relative w-full aspect-[4/3] md:aspect-video overflow-hidden bg-[#EAE5DF] cursor-pointer group"
                    onClick={() => setActiveGallery(disc.images)}
                  >
                    <Image 
                      src={disc.images[0]} 
                      alt={disc.title}
                      fill
                      className="parallax-img object-cover origin-center transition-transform duration-700 group-hover:scale-105"
                      sizes="100vw"
                      priority={index === 0}
                      quality={100}
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center z-10 pointer-events-none">
                       <span className="opacity-0 group-hover:opacity-100 text-white font-sans text-xs tracking-[0.2em] uppercase transition-opacity duration-500 bg-black/40 px-6 py-3 rounded-full backdrop-blur-md">
                         Click to Explore
                       </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeGallery && (
        <CurvedCinemaGallery 
          images={activeGallery} 
          onClose={() => setActiveGallery(null)} 
        />
      )}
    </section>
  );
}
