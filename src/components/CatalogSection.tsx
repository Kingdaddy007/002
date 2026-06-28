"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CatalogSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".col-left", { y: 100 }, {
      y: -100,
      ease: "none",
      scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1.0 }
    });

    gsap.fromTo(".col-center", { y: -80 }, {
      y: 80,
      ease: "none",
      scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1.0 }
    });

    gsap.fromTo(".col-right", { y: 60 }, {
      y: -60,
      ease: "none",
      scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1.0 }
    });
  }, { scope: containerRef });

  return (
    <section className="scroll-section section-catalog" id="catalog-section" ref={containerRef}>
      <div className="catalog-header">
        <span className="catalog-subtitle">SELECTED RANGE</span>
        <h2 className="catalog-title">THE WORKS</h2>
      </div>
      
      <div className="catalog-grid">
        <div className="catalog-col col-left">
          <div className="catalog-item">
            <div className="item-img-wrap">
              <img className="item-img" src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800" alt="Kata Restaurant" />
            </div>
            <div className="item-meta">
              <span className="item-category">COMMERCIAL F&B</span>
              <h3 className="item-title">KATA RESTAURANT</h3>
              <p className="item-specs">6,500 SQ FT | DUBAI</p>
            </div>
          </div>
        </div>

        <div className="catalog-col col-center">
          <div className="catalog-item">
            <div className="item-img-wrap">
              <img className="item-img" src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800" alt="Althuraya Island" />
            </div>
            <div className="item-meta">
              <span className="item-category">RESIDENTIAL</span>
              <h3 className="item-title">ALTHURAYA ISLAND</h3>
              <p className="item-specs">LUXURY WATERFRONT VILLAS</p>
            </div>
          </div>
        </div>

        <div className="catalog-col col-right">
          <div className="catalog-item">
            <div className="item-img-wrap">
              <img className="item-img" src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800" alt="Opus Commercial Lobby" />
            </div>
            <div className="item-meta">
              <span className="item-category">COMMERCIAL INTEGRATION</span>
              <h3 className="item-title">OPUS LOBBY</h3>
              <p className="item-specs">HIGH-END OFFICE ARCHITECTURE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
