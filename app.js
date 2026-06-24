document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Target the SVG path representing the XBD Symbol
  const symbolPath = document.querySelector(".symbol-path");
  
  if (symbolPath) {
    // 2. Measure the exact stroke length of the vector path
    const pathLength = symbolPath.getTotalLength();
    
    // 3. Set up the stroke-dash properties so the path is hidden initially
    symbolPath.style.strokeDasharray = pathLength;
    symbolPath.style.strokeDashoffset = pathLength;
    
    // 4. Create the main GSAP preloader timeline
    const tl = gsap.timeline({
      delay: 0.5 // Subtle pause before starting the trace
    });
    
    // Step 1: Trace the path outlines (invisible pen effect)
    tl.to(symbolPath, {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: "power2.inOut"
    })
    
    // Step 2: Fill the path with solid white (materialization effect)
    .to(symbolPath, {
      fill: "rgba(255, 255, 255, 1)",
      duration: 0.8,
      ease: "power1.inOut"
    }, "-=0.6") // Begins overlapping the last 0.6s of the trace
    
    // Step 3: Fade and slide up the primary display text "X B D"
    .to(".primary-brand-text", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    
    // Step 4: Fade in the secondary geometric text "COLLECTIVE"
    .to(".secondary-brand-text", {
      opacity: 1,
      duration: 0.8,
      ease: "power1.inOut"
    }, "-=0.3")
    
    // Step 5: Hold the complete logo lockup, then transition out
    .to("#preloader", {
      opacity: 0,
      duration: 1.0,
      ease: "power3.inOut"
    }, "+=0.8") // 0.8s pause at full clarity before fade-out
    
    // Step 6: Reveal the main page content simultaneously
    .to("#main-content", {
      opacity: 1,
      visibility: "visible",
      duration: 1.2,
      ease: "power2.out",
      onComplete: () => {
        // Remove preloader from DOM and restore scrolling
        document.getElementById("preloader").style.display = "none";
        document.body.style.overflow = "auto";
      }
    }, "-=1.0"); // Wipes in as the preloader fades out
  }
});
