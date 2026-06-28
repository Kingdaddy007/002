"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ConciergeSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const conciergeTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    conciergeTl
      .from(".concierge-tag", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" })
      .from(".concierge-title", { opacity: 0, y: 30, duration: 1.0, ease: "power3.out" }, "-=0.6")
      .from(".form-group", { opacity: 0, y: 20, stagger: 0.15, duration: 0.8, ease: "power2.out" }, "-=0.6")
      .from(".concierge-btn", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.4");
  }, { scope: containerRef });

  return (
    <section className="scroll-section section-concierge" id="concierge-section" ref={containerRef}>
      <div className="concierge-wrap">
        <span className="concierge-tag">INQUIRY</span>
        <h2 className="concierge-title">A DIGITAL PRESENCE OF EQUAL WEIGHT.</h2>
        
        <form className="concierge-form" id="inquiry-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="client-name">MY NAME IS</label>
              <input type="text" id="client-name" placeholder="Ellen Sohoel" required />
              <span className="input-line"></span>
            </div>
            <div className="form-group">
              <label htmlFor="client-project">INTERESTED IN</label>
              <input type="text" id="client-project" placeholder="Residential Commissions" required />
              <span className="input-line"></span>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="client-contact">REACH ME AT</label>
              <input type="email" id="client-contact" placeholder="ellen@xbdcollective.com" required />
              <span className="input-line"></span>
            </div>
          </div>
          <button type="submit" className="concierge-btn">
            <span className="btn-text">COMMISSION THE INVISIBLE</span>
            <span className="btn-arrow">➔</span>
          </button>
        </form>
      </div>

      <footer className="main-footer">
        <div className="footer-left">
          <span>XBD COLLECTIVE &nbsp;|&nbsp; DUBAI & LONDON</span>
        </div>
        <div className="footer-right">
          <span>© 2026. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>
    </section>
  );
}
