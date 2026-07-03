"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  { 
    name: "Ellen Søhoel", 
    title: "Founder / Design Director", 
    img: "/assets/XBD%20COLLECTIVE%20(1)/Ellen-Sohoel_portrait-8_450x290_BW-02%201.png",
    isCenter: true,
  },
  { 
    name: "Tareq Ayyad", 
    title: "General Manager", 
    img: "/assets/XBD%20COLLECTIVE%20(1)/Tareq-Ayyad_portrait_450x290_BW%201.png",
    isCenter: false,
  },
  { 
    name: "Mostafa El Gizawi", 
    title: "Projects Director", 
    img: "/assets/XBD%20COLLECTIVE%20(1)/Mostafa-El-Gizawi_portrait_450x290_BW%201.png",
    isCenter: false,
  },
  { 
    name: "Noel Shannon", 
    title: "Finance Director", 
    img: "/assets/XBD%20COLLECTIVE%20(1)/Web-450-x-290_-BW_0007_Noel-Shannon%201.png",
    isCenter: false,
  },
  { 
    name: "Rohit Krishnan", 
    title: "Operations Manager", 
    img: "/assets/XBD%20COLLECTIVE%20(1)/Rohit-Krishnan_Operations-Manager_450x290%201.png",
    isCenter: false,
  },
  { 
    name: "Farah Istieteih", 
    title: "Design Manager", 
    img: "/assets/XBD%20COLLECTIVE%20(1)/Farah-Istieteih%201.png",
    isCenter: false,
  },
  { 
    name: "Lee Johnston", 
    title: "Project Director", 
    img: "/assets/XBD%20COLLECTIVE%20(1)/Lee-Johnston%201.png",
    isCenter: false,
  },
  { 
    name: "Olena Vasylieva", 
    title: "Design Manager", 
    img: "/assets/XBD%20COLLECTIVE%20(1)/Olena-Vasylieva%201.png",
    isCenter: false,
  },
  { 
    name: "Adegunwa Odulana", 
    title: "Project Architect", 
    img: "/assets/XBD%20COLLECTIVE%20(1)/Adegunwa-Odulana%201.png",
    isCenter: false,
  },
  { 
    name: "Gbade Giwa", 
    title: "Project Architect", 
    img: "/assets/XBD%20COLLECTIVE%20(1)/Gbade-Giwa%201.png",
    isCenter: false,
  }
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!mounted) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%", 
        pin: pinRef.current,
        scrub: 1, 
      }
    });

    // REVERSE PARALLAX: The massive background text scales DOWN and moves UP
    tl.to(".bg-text-parallax", {
      y: "-20vh",
      scale: 0.85,
      opacity: 0.05,
      duration: 4.5,
      ease: "none"
    }, 0);

    // Phase 1: Fly Out from Center (0s to 1.5s)
    tl.to(".director-portrait", {
      left: function(i, target) { return target.getAttribute("data-left") || "50%"; },
      top: function(i, target) { return target.getAttribute("data-top") || "50%"; },
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
    }, 0); 

    // Ellen scales up (0s to 1.5s)
    tl.fromTo(".founder-portrait", 
      { scale: 0.9 },
      { scale: 1, duration: 1.5, ease: "power2.out" },
      0
    );

    // Independent, non-scrubbed trigger for the corner statements
    const cornerWords = sectionRef.current ? gsap.utils.toArray(".corner-word") : [];
    gsap.fromTo(cornerWords,
      { opacity: 0, yPercent: 100 },
      { 
        opacity: 1, 
        yPercent: 0, 
        stagger: 0.03, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    gsap.fromTo(".corner-divider",
      { scaleX: 0 },
      { 
        scaleX: 1, 
        duration: 1, 
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // Phase 2: Fade in Names (1.5s to 2.0s)
    // They appear only AFTER the flyout is finished
    tl.fromTo(".team-text",
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" },
      1.5
    );

    // Phase 3: Planetary Rotation (2.0s to 5.0s)
    tl.to(".orbit-container", {
      rotation: 180,
      duration: 3,
      ease: "none"
    }, 2.0);

    tl.to(".director-portrait", {
      rotation: -180,
      duration: 3,
      ease: "none"
    }, 2.0); 

    // Phase 4: Fade out Names (4.5s to 5.0s)
    // They disappear right as the rotation finishes locking into its second position
    tl.to(".team-text", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    }, 4.5);

  }, { scope: sectionRef, dependencies: [mounted] });

  const centerPerson = teamMembers.find(m => m.isCenter);
  const orbiters = teamMembers.filter(m => !m.isCenter);

  return (
    <section 
      id="people"
      ref={sectionRef}
      className="relative z-10 w-full bg-xbd-bg text-xbd-text"
    >
      <div 
        ref={pinRef} 
        className="w-full h-screen relative overflow-hidden flex items-center justify-center bg-xbd-bg"
      >
        
        {/* Massive Background Typography (Reverse Parallax) */}
        <div className="bg-text-parallax absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none w-full text-center flex flex-col items-center justify-center">
          <h2 className="font-display text-[16vw] text-xbd-text opacity-[0.08] leading-none tracking-tighter mix-blend-multiply">
            COLLECTIVE
          </h2>
        </div>

        {/* The Structural Corner Statements (Replaces the bottom center text) */}
        <div className="corner-statement absolute top-12 left-6 md:top-16 md:left-12 z-50 pointer-events-none text-left max-w-[200px] md:max-w-[280px]">
          <p className="font-sans text-[10px] md:text-xs tracking-[0.15em] uppercase text-black font-medium leading-relaxed drop-shadow-sm flex flex-wrap">
            {"Guided by a unified leadership orbit.".split(" ").map((word, i) => (
              <span key={`p1-${i}`} className="overflow-hidden inline-block mr-[0.25em] mb-[0.2em]">
                <span className="corner-word inline-block transform-gpu">{word}</span>
              </span>
            ))}
          </p>
          <div className="corner-divider w-12 h-[1px] bg-black opacity-40 mt-3 mb-3 origin-left"></div>
          <p className="font-sans text-[9px] md:text-[11px] tracking-[0.15em] uppercase text-xbd-text leading-relaxed drop-shadow-sm flex flex-wrap">
            {"Executed by a studio of 60+ professionals.".split(" ").map((word, i) => (
              <span key={`p2-${i}`} className="overflow-hidden inline-block mr-[0.25em] mb-[0.2em]">
                <span className="corner-word inline-block transform-gpu">{word}</span>
              </span>
            ))}
          </p>
        </div>

        {/* Render Founder (Top Z-Index, Absolute Center) */}
        {centerPerson && (
          <div className="founder-portrait absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-50 w-32 md:w-48">
            <img 
              src={centerPerson.img} 
              alt={centerPerson.name}
              className="w-full h-auto object-bottom grayscale" 
              style={{ filter: "contrast(1.05)" }}
            />
            <div className="team-text absolute top-full mt-4 flex flex-col items-center text-center w-[200%] opacity-0">
              <h3 className="font-display text-xl md:text-3xl text-black font-semibold tracking-tight leading-tight drop-shadow-md">
                {centerPerson.name}
              </h3>
              <p className="font-sans text-[9px] md:text-[11px] uppercase tracking-[0.2em] text-xbd-text font-medium mt-1 drop-shadow-md">
                {centerPerson.title}
              </p>
            </div>
          </div>
        )}

        {/* The Rotating Radial Grid Container */}
        <div className="orbit-container absolute inset-0 w-full max-w-[1800px] h-full mx-auto z-40 origin-center">
          
          {mounted && orbiters.map((member, index) => {
            const totalOrbiters = orbiters.length;
            const angle = (index / totalOrbiters) * Math.PI * 2;
            const offsetAngle = angle - Math.PI / 2; 

            // Keep large radii so they don't overlap Ellen
            const rx = typeof window !== 'undefined' && window.innerWidth < 768 ? 42 : 36; 
            const ry = typeof window !== 'undefined' && window.innerWidth < 768 ? 45 : 40; 

            const targetLeft = `calc(50% + ${Math.cos(offsetAngle) * rx}vw)`;
            const targetTop = `calc(50% + ${Math.sin(offsetAngle) * ry}vh)`;

            // Radial Text Positioning Logic
            const sin = Math.sin(offsetAngle);
            const cos = Math.cos(offsetAngle);
            
            let textPositionClass = "";
            if (sin < -0.5) {
               // Top Area
               textPositionClass = "bottom-full mb-3 left-1/2 -translate-x-1/2 text-center flex-col";
            } else if (sin > 0.5) {
               // Bottom Area
               textPositionClass = "top-full mt-3 left-1/2 -translate-x-1/2 text-center flex-col";
            } else if (cos > 0) {
               // Right Area
               textPositionClass = "top-1/2 -translate-y-1/2 left-full ml-4 text-left flex-col items-start";
            } else {
               // Left Area
               textPositionClass = "top-1/2 -translate-y-1/2 right-full mr-4 text-right flex-col items-end";
            }

            return (
              <div 
                key={index}
                className="director-portrait absolute -translate-x-1/2 -translate-y-1/2 w-20 md:w-28 lg:w-32 opacity-0 scale-75 origin-center"
                data-left={targetLeft}
                data-top={targetTop}
                style={{ left: "50%", top: "50%" }} 
              >
                <img 
                  src={member.img} 
                  alt={member.name}
                  className="w-full h-auto object-bottom grayscale"
                  style={{ filter: "contrast(1.05)" }}
                />
                
                {/* Dynamically Positioned Text */}
                <div className={`team-text absolute flex w-[250%] opacity-0 pointer-events-none ${textPositionClass}`}>
                  <h3 className="font-display text-sm md:text-lg text-black font-semibold tracking-tight leading-tight whitespace-nowrap drop-shadow-md">
                    {member.name}
                  </h3>
                  <p className="font-sans text-[7px] md:text-[9px] uppercase tracking-[0.2em] text-xbd-text font-medium mt-1 whitespace-nowrap drop-shadow-md">
                    {member.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
