document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Target the SVG elements
  const symbolPath = document.querySelector(".symbol-path");
  const line1 = document.querySelector(".line-1");
  const line2 = document.querySelector(".line-2");
  
  if (symbolPath && line1 && line2) {
    // 2. Measure the exact stroke lengths for animation
    const pathLength = symbolPath.getTotalLength();
    const len1 = line1.getTotalLength();
    const len2 = line2.getTotalLength();
    
    // 3. Configure initial stroke dash properties (hidden at start)
    symbolPath.style.strokeDasharray = pathLength;
    symbolPath.style.strokeDashoffset = pathLength;
    
    line1.style.strokeDasharray = len1;
    line1.style.strokeDashoffset = len1;
    
    line2.style.strokeDasharray = len2;
    line2.style.strokeDashoffset = len2;
    
    // 4. Create the main GSAP preloader timeline
    const tl = gsap.timeline({
      delay: 0.5
    });
    
    // Step 1: Make diagonal lines visible and draw them sequentially
    tl.set(".diag-line", { opacity: 1 })
    
    // Draw first diagonal line
    .to(line1, {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: "power2.inOut"
    })
    
    // Draw second diagonal line (forming the "X" cross)
    .to(line2, {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: "power2.inOut"
    }, "-=0.3") // 0.3s overlap for fluid tracing
    
    // Step 2: Trace the curved infinity loops
    .to(symbolPath, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut"
    }, "-=0.2")
    
    // Step 3: Contract the diagonal lines back into the center point
    // Intersection point is exactly at (3810.11px, 182.17px) in the group space
    .to(".diag-line", {
      scale: 0,
      transformOrigin: "3810.11px 182.17px",
      duration: 0.6,
      ease: "power2.in"
    }, "-=0.8")
    
    // Step 4: Fill the loop symbol with solid white simultaneously
    .to(symbolPath, {
      fill: "rgba(255, 255, 255, 1)",
      duration: 0.8,
      ease: "power1.inOut"
    }, "-=0.6")
    
    // Step 5: Fade and slide up "X B D" text
    .to(".primary-brand-text", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    
    // Step 6: Fade in the geometric "COLLECTIVE" text
    .to(".secondary-brand-text", {
      opacity: 1,
      duration: 0.8,
      ease: "power1.inOut"
    }, "-=0.3")
    
    // Step 7: Pause, then fade out the preloader overlay
    .to("#preloader", {
      opacity: 0,
      duration: 1.0,
      ease: "power3.inOut"
    }, "+=1.0")
    
    // Step 8: Reveal the homepage content
    .to("#main-content", {
      opacity: 1,
      visibility: "visible",
      duration: 1.2,
      ease: "power2.out",
      onComplete: () => {
        document.getElementById("preloader").style.display = "none";
        document.body.style.overflow = "auto";
      }
    }, "-=1.0");
  }
});
