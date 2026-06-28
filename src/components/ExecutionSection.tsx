"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ExecutionSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const execTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 65%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    execTl
      .to(".execution-paragraph", { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" })
      .to(".execution-line", { opacity: 1, scaleX: 1, duration: 0.6, ease: "power2.inOut" }, "-=0.6");
  }, { scope: containerRef });

  return (
    <section className="scroll-section section-execution" id="execution-section" ref={containerRef}>
      <div className="execution-container">
        <video className="execution-video" autoPlay loop muted playsInline>
          <source src="https://assets.mixkit.co/videos/preview/mixkit-architect-drawing-a-blueprint-41584-large.mp4" type="video/mp4" />
        </video>
        <svg className="execution-mask-svg" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="execution-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <text x="50%" y="42%" textAnchor="middle" dominantBaseline="middle" className="mask-text-bold">FROM DRAWING</text>
              <text x="50%" y="62%" textAnchor="middle" dominantBaseline="middle" className="mask-text-bold">TO OBJECT.</text>
            </mask>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="var(--color-limestone)" mask="url(#execution-mask)" />
        </svg>
      </div>
      <div className="execution-content">
        <p className="execution-paragraph">We build what others only render. Real materials, executed to the structural millimeter.</p>
        <div className="execution-line"></div>
      </div>
    </section>
  );
}
