document.addEventListener("DOMContentLoaded", () => {
  
  // Select drawing paths
  const diagLine1 = document.querySelector(".line-1");
  const diagLine2a = document.querySelector(".line-2a");
  const diagLine2b = document.querySelector(".line-2b");
  
  const draft1 = document.querySelector(".draft-1");
  const draft2 = document.querySelector(".draft-2");
  const draft3 = document.querySelector(".draft-3");
  const draft4 = document.querySelector(".draft-4");
  
  const symbolPath = document.querySelector(".symbol-path");
  
  // Pivot point: coordinates of the center intersection inside SVG space
  const pivotX = 3810.11;
  const pivotY = 182.17;

  // Set line-dash arrays and offsets for drawing animations
  const preparePath = (el) => {
    if (!el) return 0;
    const len = el.getTotalLength ? el.getTotalLength() : (el.tagName === "line" ? Math.sqrt(Math.pow(el.x2.baseVal.value - el.x1.baseVal.value, 2) + Math.pow(el.y2.baseVal.value - el.y1.baseVal.value, 2)) : 500);
    el.style.strokeDasharray = len;
    el.style.strokeDashoffset = len;
    return len;
  };

  const lenL1 = preparePath(diagLine1);
  const lenL2a = preparePath(diagLine2a);
  const lenL2b = preparePath(diagLine2b);
  
  const lenD1 = preparePath(draft1);
  const lenD2 = preparePath(draft2);
  const lenD3 = preparePath(draft3);
  const lenD4 = preparePath(draft4);
  
  const lenSymbol = preparePath(symbolPath);

  // Initial scales and states
  gsap.set([diagLine1, diagLine2a, diagLine2b], { transformOrigin: `${pivotX}px ${pivotY}px` });
  gsap.set([draft1, draft2, draft3, draft4], { transformOrigin: `${pivotX}px ${pivotY}px` });
  
  // Set starting values
  gsap.set([diagLine1, diagLine2a, diagLine2b, draft1, draft2, draft3, draft4], { opacity: 0 });
  gsap.set(symbolPath, { fill: "rgba(255, 255, 255, 0)", opacity: 0 });

  // 3. Build GSAP Timeline
  const tl = gsap.timeline({
    delay: 0.5
  });

  // Step 1: Twilight backdrop slowly fades/crossfades to black background
  tl.to(".preloader-bg", {
    opacity: 0,
    duration: 2.2,
    ease: "power2.inOut"
  })

  // Step 2: Diagonal lines start forming from center intersection (Frame 1-6)
  .set([diagLine1, diagLine2a, diagLine2b], { opacity: 1 }, "-=1.0")
  .to([diagLine1, diagLine2a, diagLine2b], {
    strokeDashoffset: 0,
    duration: 1.2,
    ease: "power3.out"
  }, "-=1.0")

  // Step 3: Official monogram loop outline begins tracing (Frame 6)
  .set(symbolPath, { opacity: 1 }, "-=0.3")
  .to(symbolPath, {
    strokeDashoffset: 0,
    duration: 1.6,
    ease: "power2.inOut"
  }, "-=0.3")

  // Step 4: Diagonals collapse/retract back to the center simultaneously (Frame 7-8)
  .to([diagLine1, diagLine2a, diagLine2b], {
    scale: 0,
    duration: 0.8,
    ease: "power3.in"
  }, "-=1.2")

  // Step 5: Horizontal drafting lines shoot out from center left/bottom-right
  .set([draft1, draft2, draft3, draft4], { opacity: 1 }, "-=0.2")
  .to([draft1, draft2, draft3, draft4], {
    strokeDashoffset: 0,
    duration: 0.5,
    ease: "power2.out"
  }, "-=0.2")

  // Step 6: Drafting lines retract (collapse) back into the center
  .to([draft1, draft2, draft3, draft4], {
    scale: 0,
    duration: 0.5,
    ease: "power2.in"
  })

  // Step 7: Smoothly fade in the solid filled monogram (no layout jump/shifting)
  .to(symbolPath, {
    fill: "rgba(255, 255, 255, 1)",
    duration: 0.6,
    ease: "power1.inOut"
  }, "-=0.3")

  // Step 8: Show "X B D" directly below symbol
  .to(".primary-brand-text", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.1")

  // Step 9: Horizontal divider line scales outwards from center
  .to(".divider-line", {
    opacity: 1,
    scaleX: 1,
    duration: 0.6,
    ease: "power2.inOut"
  }, "-=0.2")

  // Step 10: "COLLECTIVE" is revealed from center outwards
  .to(".secondary-brand-text", {
    opacity: 1,
    clipPath: "inset(0 0%)",
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.1")

  // Step 11: Palate cleanser finish: Fade out the preloader to reveal page
  .to("#preloader", {
    opacity: 0,
    duration: 0.8,
    ease: "power3.inOut"
  }, "+=1.2")
  
  .to("#main-content", {
    opacity: 1,
    visibility: "visible",
    duration: 1.0,
    ease: "power2.out",
    onComplete: () => {
      document.getElementById("preloader").style.display = "none";
      document.body.style.overflow = "auto";
    }
  }, "-=0.8");

});
