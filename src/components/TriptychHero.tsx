"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const disciplines = ["architecture", "interiors", "details"] as const;
type Discipline = typeof disciplines[number];

export default function TriptychHero() {
  const containerRef = useRef<HTMLElement>(null);
  const paneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const drawerRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [activeDiscipline, setActiveDiscipline] = useState<Discipline | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useGSAP(() => {
    // Bypass preloader immediately as requested
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.style.opacity = "1";
      mainContent.style.visibility = "visible";
    }
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";

    // Initialize header reveal
    gsap.set("#main-header", { opacity: 1, y: 0 });
    gsap.set(".pane-card", { opacity: 1, y: 0 });

    const triptychTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=120%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    triptychTl
      .to(".pane-left", { yPercent: -105, ease: "power2.inOut" }, 0)
      .to(".pane-right", { yPercent: 105, ease: "power2.inOut" }, 0)
      .to(".pane-center", { scale: 0.92, opacity: 0, ease: "power2.inOut" }, 0)
      .to(".pane-card", { opacity: 0, yPercent: 50, ease: "power1.inOut" }, 0);

    setTimeout(() => {
      // @ts-ignore
      if (globalThis.ScrollTrigger) globalThis.ScrollTrigger.refresh();
    }, 100);

  }, { scope: containerRef });

  const expandPane = (targetDiscipline: Discipline, index: number) => {
    if (activeDiscipline || isTransitioning) return;
    setIsTransitioning(true);
    setActiveDiscipline(targetDiscipline);
    
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    gsap.to(".pane-card", { opacity: 0, y: -20, duration: 0.4 });
    
    const targetPane = paneRefs.current[index];
    const drawer = drawerRefs.current[index];
    const otherPanes = paneRefs.current.filter((_, i) => i !== index);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
      }
    });

    tl.to(targetPane, { flex: "1 0 100%", duration: 0.8, ease: "power4.inOut" }, 0)
      .to(otherPanes, { flex: "0 0 0%", duration: 0.8, ease: "power4.inOut" }, 0)
      .set(drawer, { display: "block" }, 0.4)
      .to(drawer, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.5)
      .fromTo(drawer!.querySelectorAll(".drawer-left-col > *, .showcase-card, .drawer-edge-nav"), {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out"
      }, 0.6);
  };

  const collapsePane = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    const targetPane = paneRefs.current[index];
    const drawer = drawerRefs.current[index];
    const otherPanes = paneRefs.current.filter((_, i) => i !== index);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(drawer, { display: "none" });
        setActiveDiscipline(null);
        setIsTransitioning(false);
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";
      }
    });

    tl.to(drawer, { opacity: 0, duration: 0.4, ease: "power2.in" }, 0)
      .to(paneRefs.current, { flex: "1 1 0%", duration: 0.8, ease: "power3.inOut" }, 0.2)
      .to(".pane-card", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.6);
  };

  const transitionToPane = (fromIndex: number, toDiscipline: Discipline) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const toIndex = disciplines.indexOf(toDiscipline);
    const currentPane = paneRefs.current[fromIndex];
    const targetPane = paneRefs.current[toIndex];
    const currentDrawer = drawerRefs.current[fromIndex];
    const targetDrawer = drawerRefs.current[toIndex];
    const otherPanes = paneRefs.current.filter((_, i) => i !== toIndex);

    setActiveDiscipline(toDiscipline);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
      }
    });

    tl.to(currentDrawer, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        if(currentDrawer) currentDrawer.style.display = "none";
      }
    }, 0)
    .to(targetPane, { flex: "1 0 100%", duration: 0.8, ease: "power4.inOut" }, 0.3)
    .to(otherPanes, { flex: "0 0 0%", duration: 0.8, ease: "power4.inOut" }, 0.3)
    .set(targetDrawer, { display: "block" }, 0.7)
    .to(targetDrawer, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.8)
    .fromTo(targetDrawer!.querySelectorAll(".drawer-left-col > *, .showcase-card, .drawer-edge-nav"), {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.06,
      duration: 0.6,
      ease: "power3.out"
    }, 0.9);
  };

  return (
    <section className="hero-triptych" id="triptych-section" ref={containerRef}>
      {/* Column 1: Architecture */}
      <div 
        className="triptych-pane pane-left" 
        data-discipline="architecture"
        ref={(el) => { paneRefs.current[0] = el; }}
        onClick={() => {
          if (!activeDiscipline && !isTransitioning) expandPane("architecture", 0);
        }}
      >
        <img className="pane-img" src="/assets/bg-1.jpg" alt="XBD Architecture - Exterior Luxury Villa" />
        <div className="pane-overlay"></div>
        <div className="pane-card glass-panel">
          <div className="card-content" style={{ position: "relative", zIndex: 5 }}>
            <div className="card-subtitle">ARCHITECTURE</div>
            <div className="card-title">THE MONUMENTAL FRAME</div>
            <p className="card-desc">Defying gravity. Shaping skylines with global perspective and monumental scale.</p>
          </div>
        </div>
        
        <div 
          className="drawer-content" 
          data-liquid-ignore="true"
          ref={(el) => { drawerRefs.current[0] = el; }}
          onClick={(e) => {
            if (e.target === drawerRefs.current[0]) {
              e.stopPropagation();
              collapsePane(0);
            }
          }}
        >
          <button className="drawer-close-btn" aria-label="Close Drawer" onClick={(e) => { e.stopPropagation(); collapsePane(0); }}>CLOSE &times;</button>
          <div className="drawer-inner">
            <div className="drawer-left-col">
              <span className="drawer-meta">DISCIPLINE 01</span>
              <h2 className="drawer-title">ARCHITECTURE</h2>
              <p className="drawer-philosophy">Defying gravity. Shaping skylines with global perspective and monumental scale. We balance heavy mass with light reflection to create structural monuments that endure.</p>
              <div className="drawer-stats">
                <div className="stat-item"><span className="stat-val">15+</span><span className="stat-lbl">Global Awards</span></div>
                <div className="stat-item"><span className="stat-val">76</span><span className="stat-lbl">Stories High</span></div>
              </div>
            </div>
            <div className="drawer-right-col">
              <div className="drawer-showcase">
                <div className="showcase-card">
                  <img src="/assets/bg-1.jpg" alt="Solar House Exterior" className="showcase-img" />
                  <div className="showcase-meta">
                    <span className="showcase-title">SOLAR HOUSE</span>
                    <span className="showcase-desc">Private Villa | Dubai | 18,000 SQ FT</span>
                  </div>
                </div>
                <div className="showcase-card">
                  <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600" alt="Rixos Residences" className="showcase-img" />
                  <div className="showcase-meta">
                    <span className="showcase-title">RIXOS RESIDENCES</span>
                    <span className="showcase-desc">Developer Commission | 76 Stories | Downtown Dubai</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="drawer-edge-nav">
            <button className="edge-nav-link prev-link" disabled>✦</button>
            <button className="edge-nav-link next-link" onClick={(e) => { e.stopPropagation(); transitionToPane(0, "interiors"); }}>INTERIORS &nbsp; ➔</button>
          </div>
        </div>
      </div>

      {/* Column 2: Interiors */}
      <div 
        className="triptych-pane pane-center" 
        data-discipline="interiors"
        ref={(el) => { paneRefs.current[1] = el; }}
        onClick={() => {
          if (!activeDiscipline && !isTransitioning) expandPane("interiors", 1);
        }}
      >
        <img className="pane-img" src="/assets/bg-2.jpg" alt="XBD Interiors - Luxury Living Area" />
        <div className="pane-overlay"></div>
        <div className="pane-card glass-panel">
          <div className="card-content" style={{ position: "relative", zIndex: 5 }}>
            <div className="card-subtitle">INTERIORS</div>
            <div className="card-title">THE ATELIER'S SANCTUARY</div>
            <p className="card-desc">Spatially intimate volumes crafted to the structural millimeter.</p>
          </div>
        </div>
        
        <div 
          className="drawer-content" 
          data-liquid-ignore="true"
          ref={(el) => { drawerRefs.current[1] = el; }}
          onClick={(e) => {
            if (e.target === drawerRefs.current[1]) {
              e.stopPropagation();
              collapsePane(1);
            }
          }}
        >
          <button className="drawer-close-btn" aria-label="Close Drawer" onClick={(e) => { e.stopPropagation(); collapsePane(1); }}>CLOSE &times;</button>
          <div className="drawer-inner">
            <div className="drawer-left-col">
              <span className="drawer-meta">DISCIPLINE 02</span>
              <h2 className="drawer-title">INTERIOR DESIGN</h2>
              <p className="drawer-philosophy">Spatially intimate volumes crafted to the structural millimeter. We design from the inside out, detailing custom wood joinery, floating marble plinths, and integrated light wells.</p>
              <div className="drawer-stats">
                <div className="stat-item"><span className="stat-val">300+</span><span className="stat-lbl">Commissions</span></div>
                <div className="stat-item"><span className="stat-val">Elite</span><span className="stat-lbl">Residential Tier</span></div>
              </div>
            </div>
            <div className="drawer-right-col">
              <div className="drawer-showcase">
                <div className="showcase-card">
                  <img src="/assets/bg-2.jpg" alt="Luxury Living Area" className="showcase-img" />
                  <div className="showcase-meta">
                    <span className="showcase-title">BULGARI VILLA</span>
                    <span className="showcase-desc">Private Residence | Jumeirah | 12,000 SQ FT</span>
                  </div>
                </div>
                <div className="showcase-card">
                  <img src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=600" alt="Kata Restaurant Inside" className="showcase-img" />
                  <div className="showcase-meta">
                    <span className="showcase-title">KATA RESTAURANT</span>
                    <span className="showcase-desc">Commercial F&B | Dubai Mall | 6,500 SQ FT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="drawer-edge-nav">
            <button className="edge-nav-link prev-link" onClick={(e) => { e.stopPropagation(); transitionToPane(1, "architecture"); }}>✦ &nbsp; ARCHITECTURE</button>
            <button className="edge-nav-link next-link" onClick={(e) => { e.stopPropagation(); transitionToPane(1, "details"); }}>DETAILS &nbsp; ➔</button>
          </div>
        </div>
      </div>

      {/* Column 3: Details */}
      <div 
        className="triptych-pane pane-right" 
        data-discipline="details"
        ref={(el) => { paneRefs.current[2] = el; }}
        onClick={() => {
          if (!activeDiscipline && !isTransitioning) expandPane("details", 2);
        }}
      >
        <img className="pane-img" src="/assets/bg-3.jpg" alt="XBD Details - Tactile Stone Detail" />
        <div className="pane-overlay"></div>
        <div className="pane-card glass-panel">
          <div className="card-content" style={{ position: "relative", zIndex: 5 }}>
            <div className="card-subtitle">DETAILS</div>
            <div className="card-title">THE TECTONIC TOUCH</div>
            <p className="card-desc">Honoring materiality. Travertine, custom oak millwork, and stone detailing.</p>
          </div>
        </div>
        
        <div 
          className="drawer-content" 
          data-liquid-ignore="true"
          ref={(el) => { drawerRefs.current[2] = el; }}
          onClick={(e) => {
            if (e.target === drawerRefs.current[2]) {
              e.stopPropagation();
              collapsePane(2);
            }
          }}
        >
          <button className="drawer-close-btn" aria-label="Close Drawer" onClick={(e) => { e.stopPropagation(); collapsePane(2); }}>CLOSE &times;</button>
          <div className="drawer-inner">
            <div className="drawer-left-col">
              <span className="drawer-meta">DISCIPLINE 03</span>
              <h2 className="drawer-title">THE DETAILS</h2>
              <p className="drawer-philosophy">Honoring materiality. Travertine, custom oak millwork, brushed brass, and natural plaster. We control the execution down to the tectonic joints and final objects.</p>
              <div className="drawer-stats">
                <div className="stat-item"><span className="stat-val">100%</span><span className="stat-lbl">Bespoke Joinery</span></div>
                <div className="stat-item"><span className="stat-val">0.5mm</span><span className="stat-lbl">Precision Fit</span></div>
              </div>
            </div>
            <div className="drawer-right-col">
              <div className="drawer-showcase">
                <div className="showcase-card">
                  <img src="/assets/bg-3.jpg" alt="Stone Texture Detail" className="showcase-img" />
                  <div className="showcase-meta">
                    <span className="showcase-title">TECTONIC JOINTS</span>
                    <span className="showcase-desc">Travertine & Oak Millwork Detail</span>
                  </div>
                </div>
                <div className="showcase-card">
                  <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600" alt="Kitchen Detail" className="showcase-img" />
                  <div className="showcase-meta">
                    <span className="showcase-title">ALTHURAYA KITCHEN</span>
                    <span className="showcase-desc">Custom Marble Island & Oak Cabinetry</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="drawer-edge-nav">
            <button className="edge-nav-link prev-link" onClick={(e) => { e.stopPropagation(); transitionToPane(2, "interiors"); }}>✦ &nbsp; INTERIORS</button>
            <button className="edge-nav-link next-link" disabled>➔</button>
          </div>
        </div>
      </div>
    </section>
  );
}
