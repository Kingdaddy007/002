"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const disciplines = [
  {
    title: "Masterplan & Landscape",
    text: "We shape the environments that shape the architecture. True luxury begins long before the foundation is poured—it starts with how a structure breathes within its geography.",
    img: "/assets/Masterplan%20&%20Landscape.jpg"
  },
  {
    title: "Architecture",
    text: "Silhouettes that command the skyline while honoring their context. We design structures that are engineered not just for visual impact, but for enduring permanence.",
    img: "/assets/Architecture.jpg"
  },
  {
    title: "Interiors",
    text: "The spaces where life is actually lived. We choreograph light, material, and volume to create private sanctuaries defined by uncompromising tactile execution.",
    img: "/assets/Interiors.jpg"
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
          <h2 className="section-heading font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-xbd-muted flex overflow-hidden">
            {"EXPERTISE".split("").map((char, i) => (
              <div key={i} className="overflow-hidden">
                <div className="reveal-char transform-gpu inline-block">
                  {char}
                </div>
              </div>
            ))}
          </h2>
        </div>

        <div className="flex flex-col gap-32 md:gap-48">
          {disciplines.map((disc, index) => {
            // Index 0 (Masterplan): Text Left, Image Right -> flex-row
            // Index 1 (Architecture): Text Right, Image Left -> flex-row-reverse
            // Index 2 (Interiors): Text Left, Image Right -> flex-row
            const isTextLeft = index % 2 === 0;

            return (
              <div 
                key={index} 
                className={`discipline-block flex flex-col ${isTextLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
              >
                {/* Text Side */}
                <div className={`w-full md:w-1/2 flex flex-col ${!isTextLeft ? 'md:items-start md:text-left' : 'md:items-start md:text-left'}`}>
                  {/* Notice: we keep text left-aligned inside its column for reading comfort, 
                      but we place it on the correct side of the screen using the flex direction above */}
                  <div className="text-wrap flex flex-col max-w-xl">
                    <h3 className="font-display text-5xl md:text-6xl lg:text-7xl mb-8 tracking-tight text-xbd-text flex flex-wrap leading-[1.1]">
                      {splitIntoWords(disc.title)}
                    </h3>
                    <p className="desc-text font-body text-base md:text-lg leading-relaxed text-xbd-muted">
                      {disc.text}
                    </p>
                  </div>
                </div>

                {/* Image Side */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                  <div className={`img-frame relative w-full md:w-[35vw] h-[60vh] md:h-[75vh] overflow-hidden bg-[#EAE5DF] ${isTextLeft ? 'md:ml-auto' : 'md:mr-auto'}`}>
                    <Image 
                      src={disc.img} 
                      alt={disc.title}
                      fill
                      className="parallax-img object-cover origin-center"
                      sizes="(max-width: 768px) 100vw, 35vw"
                      priority={index === 0}
                      quality={100}
                      unoptimized={true}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
