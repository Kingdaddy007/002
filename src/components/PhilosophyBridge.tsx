"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function PhilosophyBridge() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%", 
        end: "bottom 80%",
        toggleActions: "play none none reverse", 
      }
    });

    tl.fromTo(textRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(authorRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.6" 
    );

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[70vh] flex flex-col items-center justify-center bg-[#121212] text-white px-6 md:px-12 py-32 z-10"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* The Philosophy Quote */}
        <div ref={textRef} className="opacity-0 mb-12">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.2] tracking-tight text-[#D4C5B3]">
            "We don't design rooms. <br className="hidden md:block" />
            We design the silence between the walls."
          </h2>
        </div>

        {/* The Attribution */}
        <div ref={authorRef} className="opacity-0 flex flex-col items-center">
          <span className="font-body text-xs md:text-sm tracking-[0.3em] uppercase mb-2 text-white/80">
            Ellen Søhoel
          </span>
          <span className="font-body text-[10px] md:text-xs tracking-widest uppercase text-white/40">
            Founder & Design Director
          </span>
          <div className="w-[1px] h-12 bg-[#D4C5B3]/30 mt-8"></div>
        </div>
      </div>
    </section>
  );
}
