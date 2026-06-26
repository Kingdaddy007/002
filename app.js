document.addEventListener("DOMContentLoaded", () => {

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

  // Initialize triptych pane states
  gsap.set(".pane-card", { opacity: 1, y: 0 });

  // Initialize interactive systems
  initTriptychDrawer();
  initScrollChoreography();
  initLiquidGL();

  // ==========================================
  // TRIPTYCH DRAWER click-EXPANSION SYSTEM
  // ==========================================
  function initTriptychDrawer() {
    const panes = document.querySelectorAll(".triptych-pane");
    let activeDiscipline = null;
    let isTransitioning = false;

    panes.forEach(pane => {
      const disciplineName = pane.getAttribute("data-discipline");
      const card = pane.querySelector(".pane-card");
      const drawer = pane.querySelector(".drawer-content");
      const closeBtn = pane.querySelector(".drawer-close-btn");

      // Pane click expands the drawer
      pane.addEventListener("click", (e) => {
        // Prevent click if we are already expanded, transitioning, or if clicking close/nav buttons
        if (activeDiscipline || isTransitioning || e.target.closest(".drawer-close-btn") || e.target.closest(".drawer-edge-nav")) {
          return;
        }
        expandPane(pane);
      });

      // Close button handler
      if (closeBtn) {
        closeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          collapsePane(pane);
        });
      }

      // Edge prev/next navigation button click handlers
      const edgeNavLinks = pane.querySelectorAll(".edge-nav-link");
      edgeNavLinks.forEach(link => {
        link.addEventListener("click", (e) => {
          e.stopPropagation();
          const targetDiscipline = link.getAttribute("data-target");
          if (targetDiscipline) {
            transitionToPane(targetDiscipline);
          }
        });
      });
    });

    // Expand pane function
    function expandPane(targetPane) {
      isTransitioning = true;
      activeDiscipline = targetPane.getAttribute("data-discipline");
      
      // Lock scroll while drawer is open
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const otherPanes = Array.from(panes).filter(p => p !== targetPane);
      const card = targetPane.querySelector(".pane-card");
      const drawer = targetPane.querySelector(".drawer-content");

      // Hide all pane title cards and fade backgrounds
      gsap.to(".pane-card", { opacity: 0, y: -20, duration: 0.4 });
      
      const tl = gsap.timeline({
        onComplete: () => {
          isTransitioning = false;
        }
      });

      // 1. Animate column widths (Target pane to 100%, others to 0%)
      tl.to(targetPane, {
        flex: "1 0 100%",
        duration: 0.8,
        ease: "power4.inOut"
      }, 0)
      .to(otherPanes, {
        flex: "0 0 0%",
        duration: 0.8,
        ease: "power4.inOut"
      }, 0)
      
      // 2. Open drawer content overlay
      .set(drawer, { display: "block" }, 0.4)
      .to(drawer, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, 0.5)
      
      // 3. Stagger reveal inner text/elements
      .fromTo(drawer.querySelectorAll(".drawer-left-col > *, .showcase-card, .drawer-edge-nav"), {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out"
      }, 0.6);
    }

    // Collapse pane function
    function collapsePane(targetPane) {
      isTransitioning = true;
      const otherPanes = Array.from(panes).filter(p => p !== targetPane);
      const drawer = targetPane.querySelector(".drawer-content");

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(drawer, { display: "none" });
          activeDiscipline = null;
          isTransitioning = false;
          // Unlock scroll
          document.body.style.overflow = "auto";
          document.documentElement.style.overflow = "auto";
        }
      });

      // Fade out drawer content
      tl.to(drawer, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      }, 0)
      // Restore columns to equal widths
      .to(panes, {
        flex: "1 1 0%",
        duration: 0.8,
        ease: "power3.inOut"
      }, 0.2)
      // Fade title cards back in
      .to(".pane-card", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, 0.6);
    }

    // Transition directly from one open drawer to another
    function transitionToPane(targetDisciplineName) {
      if (isTransitioning) return;
      isTransitioning = true;

      const currentPane = document.querySelector(`.triptych-pane[data-discipline="${activeDiscipline}"]`);
      const targetPane = document.querySelector(`.triptych-pane[data-discipline="${targetDisciplineName}"]`);
      const currentDrawer = currentPane.querySelector(".drawer-content");
      const targetDrawer = targetPane.querySelector(".drawer-content");
      const otherPanes = Array.from(panes).filter(p => p !== targetPane);

      activeDiscipline = targetDisciplineName;

      const tl = gsap.timeline({
        onComplete: () => {
          isTransitioning = false;
        }
      });

      // 1. Fade out current drawer content
      tl.to(currentDrawer, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          currentDrawer.style.display = "none";
        }
      }, 0)
      
      // 2. Animate column widths (swap 100% and 0% properties)
      .to(targetPane, {
        flex: "1 0 100%",
        duration: 0.8,
        ease: "power4.inOut"
      }, 0.3)
      .to(otherPanes, {
        flex: "0 0 0%",
        duration: 0.8,
        ease: "power4.inOut"
      }, 0.3)
      
      // 3. Open target drawer content overlay
      .set(targetDrawer, { display: "block" }, 0.7)
      .to(targetDrawer, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, 0.8)
      
      // 4. Stagger reveal target content details
      .fromTo(targetDrawer.querySelectorAll(".drawer-left-col > *, .showcase-card, .drawer-edge-nav"), {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.6,
        ease: "power3.out"
      }, 0.9);
    }

    // Static Hover Zoom & Parallax listener (active only when NO drawer is open)
    panes.forEach(pane => {
      pane.addEventListener("mouseenter", () => {
        if (activeDiscipline) return;
        gsap.to(pane.querySelector(".pane-img"), {
          scale: 1.08,
          duration: 0.8,
          ease: "power2.out"
        });
        gsap.to(pane.querySelector(".pane-card"), {
          y: -12,
          borderColor: "rgba(0, 0, 0, 0.15)",
          duration: 0.6,
          ease: "power2.out"
        });
      });

      pane.addEventListener("mouseleave", () => {
        if (activeDiscipline) return;
        gsap.to(pane.querySelector(".pane-img"), {
          scale: 1.02,
          duration: 0.8,
          ease: "power2.out"
        });
        gsap.to(pane.querySelector(".pane-card"), {
          y: 0,
          borderColor: "rgba(255, 255, 255, 0.2)",
          duration: 0.6,
          ease: "power2.out"
        });
      });
    });
  }

  // ==========================================
  // SCROLL CHOREOGRAPHY FOR LATER SECTIONS
  // ==========================================
  function initScrollChoreography() {
    // 1. Triptych Curtain Reveal (slides off-screen on scroll to reveal Section rixos)
    const triptychTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-triptych",
        start: "top top",
        end: "+=120%",
        scrub: 1.2,
        pin: true,
        invalidateOnRefresh: true
      }
    });

    triptychTl
      .to(".pane-left", {
        yPercent: -105,
        ease: "power2.inOut"
      }, 0)
      .to(".pane-right", {
        yPercent: 105,
        ease: "power2.inOut"
      }, 0)
      .to(".pane-center", {
        scale: 0.92,
        opacity: 0,
        ease: "power2.inOut"
      }, 0)
      .to(".pane-card", {
        opacity: 0,
        yPercent: 50,
        ease: "power1.inOut"
      }, 0);

    // 2. Section rixos background parallax
    gsap.fromTo(".rixos-bg", {
      yPercent: -20
    }, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: "#rixos-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // 3. Section 5: Execution Proof (Reveal paragraph and line under mask)
    const execTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#execution-section",
        start: "top 65%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    execTl
      .to(".execution-paragraph", {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power3.out"
      })
      .to(".execution-line", {
        opacity: 1,
        scaleX: 1,
        duration: 0.6,
        ease: "power2.inOut"
      }, "-=0.6");

    // 4. Section 6: Catalog Grid Opposing Scroll Parallax
    gsap.fromTo(".col-left", {
      y: 100
    }, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: "#catalog-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.0
      }
    });

    gsap.fromTo(".col-center", {
      y: -80
    }, {
      y: 80,
      ease: "none",
      scrollTrigger: {
        trigger: "#catalog-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.0
      }
    });

    gsap.fromTo(".col-right", {
      y: 60
    }, {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: "#catalog-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.0
      }
    });

    // 5. Section 7: Concierge Exit (Reveal elements on entry)
    const conciergeTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#concierge-section",
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    conciergeTl
      .from(".concierge-tag", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(".concierge-title", {
        opacity: 0,
        y: 30,
        duration: 1.0,
        ease: "power3.out"
      }, "-=0.6")
      .from(".form-group", {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6")
      .from(".concierge-btn", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");
  }

  // ==========================================
  // WebGL LIQUID GLASSMORPHISM INITIALIZER
  // ==========================================
  function initLiquidGL() {
    try {
      if (typeof liquidGL === "function") {
        liquidGL({
          target: ".glass-panel, #main-header",
          snapshot: "body",
          resolution: 2.0,
          refraction: 0.04,
          bevelDepth: 0.1,
          bevelWidth: 0.18,
          frost: 3.5,
          shadow: true,
          specular: true,
          tilt: true,
          tiltFactor: 10
        });
        console.log("WebGL liquidGL loaded successfully!");
      } else {
        console.warn("liquidGL function not found.");
      }
    } catch (e) {
      console.warn("liquidGL initialization failed, falling back to CSS backdrop-filter:", e);
    }
  }

});
