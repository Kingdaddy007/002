document.addEventListener("DOMContentLoaded", () => {
  
  const infinityPath = document.querySelector(".infinity-path");
  const symbolPath = document.querySelector(".symbol-path");
  
  if (infinityPath && symbolPath) {
    // 1. Measure stroke lengths
    const lenInfinity = infinityPath.getTotalLength();
    const lenSymbol = symbolPath.getTotalLength();
    
    // 2. Initial state (hidden stroke paths)
    infinityPath.style.strokeDasharray = lenInfinity;
    infinityPath.style.strokeDashoffset = lenInfinity;
    
    symbolPath.style.strokeDasharray = lenSymbol;
    symbolPath.style.strokeDashoffset = lenSymbol;
    
    // 3. Build GSAP Timeline
    const tl = gsap.timeline({
      delay: 0.5
    });
    
    // Step 1: Draw the starting horizontal infinity symbol
    tl.set(infinityPath, { opacity: 1 })
    .to(infinityPath, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: "power2.inOut"
    })
    
    // Step 2: Morph/Dissolve starting loop into the complex monogram
    // The starting loop dissolves (fades & strokes out) while the monogram draws in
    .to(infinityPath, {
      strokeDashoffset: lenInfinity,
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut"
    })
    .to(symbolPath, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut"
    }, "-=1.2") // Overlaps exactly with the dissolve of the first shape
    
    // Step 3: Solid white fill for the finished monogram
    .to(symbolPath, {
      fill: "rgba(255, 255, 255, 1)",
      duration: 0.8,
      ease: "power1.inOut"
    }, "-=0.5")
    
    // Step 4: Display typography reveals
    .to(".primary-brand-text", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .to(".secondary-brand-text", {
      opacity: 1,
      duration: 0.8,
      ease: "power1.inOut"
    }, "-=0.3")
    
    // Step 5: Fade out the preloader overlay to show page content
    .to("#preloader", {
      opacity: 0,
      duration: 1.0,
      ease: "power3.inOut"
    }, "+=1.0")
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
