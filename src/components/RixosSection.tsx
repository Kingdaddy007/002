"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function RixosSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".rixos-bg", { yPercent: -20 }, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: containerRef });

  return (
    <section className="scroll-section section-rixos" id="rixos-section" ref={containerRef}>
      <div className="rixos-bg"></div>
      <div className="rixos-content">
        <span className="rixos-subtitle">RIXOS RESIDENCES</span>
        <h2 className="rixos-title">THE TRANSITION OF SCALE</h2>
        <p className="rixos-desc">Developer Commission | 76 Stories | Downtown Dubai. The monumental counterweight to the intimate home.</p>
      </div>
    </section>
  );
}
