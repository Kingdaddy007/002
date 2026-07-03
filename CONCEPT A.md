Here is a comprehensive, frame-by-frame analysis of the website experience captured in the video, documented for complete recreation.

### **1\. FIRST IMPRESSION (0-2 seconds)**

* **Initial View:** The instant the page loads, the user sees a large, central video playing within a container that features significant, smooth rounded corners (approx. 24-32px border radius). The video container does not touch the viewport edges; it has noticeable margins on all sides.  
* **Dominant Color:** The background outside the video is a soft, premium off-white/light gray (approx. \#f4f4f4).  
* **Hero Layout:** Centered, symmetric primary container holding media.  
* **Hero Media:** A high-quality, professional video tour of a modern corporate interior (Turkish Airlines).  
* **Typography:** The UI employs a clean, geometric, modernist sans-serif font (similar to Helvetica Now, Inter, or a custom geometric sans).  
* **UI Elements (Header/Navigation):**  
  * Top Left: A chunky, stylized black logo ("yoo") with smaller text beneath "ARCHITECTURE INTERIOR CONTRACT".  
  * Top Right: A minimalist hamburger menu consisting of two thin, horizontal black lines.  
  * Right Edge (Sticky): A small white rectangular tab pinned to the right side of the screen with vertical text "W. Nominee", rotated 90 degrees.  
* **Ambient Motion:** The background video plays automatically. As the user begins the very first scroll tick, massive outline text reading "EXPERTISE PROJECTS" begins to emerge from the bottom edge of the screen, and the video container shrinks slightly.  
* **Overall Mood:** Premium, architectural, sophisticated, and kinetic.

### **2\. SCROLL BEHAVIOR — Section by Section**

**Section 1: The Horizontal Media Gallery (0:02 \- 0:17)**

* **Layout & Composition:** This section pins to the viewport. It operates as a full-viewport experience where vertical scrolling is hijacked to control horizontal movement.  
* **Visual Elements:**  
  * Foreground: Massive, capitalized outline text (stroke only, no fill) reading "EXPERTISE" on the left and "PROJECTS" on the right. This text stays fixed in place in front of the moving media.  
  * Background/Midground: A horizontal row of different video clips contained in a continuous track.  
* **Color & Light:** The background remains off-white. The outline text is a dark gray/black. No visible overlays on the videos; they are bright and raw.  
* **Animation & Motion:**  
  * **Trigger:** Scroll-linked.  
  * **Action:** As the user scrolls vertically down, the track of videos slides linearly to the left (translateX).  
  * **Effect:** The fixed outline text acts as a window/foreground layer, creating a deep parallax effect against the sliding videos.  
* **Images & Media:** 5 distinct professional videos showing different interior spaces (jewelry, textured walls, living room, retail, bar). All maintain the same rounded-corner container style.

**Section 2: Interactive Typography Sequence (0:17 \- 0:38)**

* **Layout & Composition:** The page unpins and scrolls vertically into a clean, white section. The layout is mostly centered text, with UI elements anchored to the corners.  
* **Color & Light:** Solid white background. High contrast. Primary text is black. Highlight words are a distinct, deep brick red (approx. \#b32d2e).  
* **Typography:**  
  * A striking mix of typefaces within the same sentence. The primary body is a thin, elegant sans-serif. The highlighted words switch abruptly to a stylized, italicized serif font (resembling Garamond or a modern editorial serif).  
  * Text is left-aligned but centered in the viewport.  
* **Animation & Motion:**  
  * **Trigger:** Scroll-linked pinning. The section locks into the viewport.  
  * **Action:** As the user scrubs the scroll wheel, the first sentence ("Design begins with an idea...") translates upward (Y-axis) and fades out (Opacity 1 to 0). Simultaneously, the next sentence ("If a building becomes architecture...") translates up from the bottom and fades in.  
  * **Background Reveal:** Near the end of this pinned sequence, massive, light-gray block text reading "DESIGN BUILD" fades in on the right side.  
* **Interactive Elements:** A small, black circular button with a white right-facing arrow sits on the left. On hover (or scroll proximity), this circle expands horizontally into a pill shape, revealing the text "MORE DETAIL" pushing the arrow to the right.

**Section 3: Parallax Masonry Grid (0:38 \- 0:53)**

* **Layout & Composition:** A return to vertical scrolling. A staggered, multi-column image grid (masonry style). There is generous, airy whitespace between all images.  
* **Typography:** Small, bold sans-serif text is used for project categorization and titles below the images (e.g., "F\&B", "MADHU'S").  
* **Images & Media:** High-end architectural photography. Mixed aspect ratios (landscape, portrait, square). Crucially, *every* image features the exact same rounded border-radius established in the hero section.  
* **Animation & Motion:**  
  * **Trigger:** Continuous vertical scrolling.  
  * **Action:** Vertical parallax. The columns of images move upward at different speeds relative to the scroll position. The center column appears to scroll slightly faster than the outer columns, creating a sense of depth and fluidity.

**Section 4: Minimal Footer (0:53 \- 0:56)**

* **Layout & Composition:** A clean, asymmetrical text grid.  
* **Typography:** Thick, bold sans-serif links stacked vertically ("ABOUT", "CASE STUDY", etc.).  
* **Details:** Includes a minimalist newsletter input field with a bottom border and an arrow submit button.

**Section 5: Giant Logo & Image Trail Interaction (0:56 \- 1:18)**

* **Layout & Composition:** The bottom of the page is dominated by a monolithic, abstract black shape that spans the entire width—this is the stylized "yoo" logo.  
* **Color & Light:** Stark black shapes on a white background.  
* **Images & Media:** Small, rounded-rectangle thumbnails of previous projects.  
* **Animation & Motion (CRITICAL):**  
  * **Trigger:** Mouse movement (hover) over the giant black shapes.  
  * **Action:** A dynamic "image trail" or "mouse tracker" effect. As the cursor moves across the logo, images sequentially spawn at the cursor's exact X/Y coordinates.  
  * **Lifecycle:**  
    1. **In:** Image appears, scaling up rapidly from scale: 0 to scale: 1 and fading in opacity: 0 to 1.  
    2. **Hold:** The image stays briefly as the cursor moves away, overlapping with newly spawned images to create a "deck of cards" trail.  
    3. **Out:** After a short delay (approx. 0.5s), the images scale back down to 0 and fade out.  
  * **Easing:** The scale animations use a bouncy, elastic ease (like back.out or a spring animation) making the images feel tactile and poppy.

### **3\. SECTION TRANSITIONS**

* The site eschews hard color cuts or complex wipes. Transitions are handled entirely through **scroll hijacking (pinning)** and continuous scrolling over a unified, light background.  
* The transition from horizontal (Section 1\) to vertical (Section 2\) feels seamless because the background color remains consistent; the pinning simply releases, allowing standard vertical flow to resume.

### **4\. GLOBAL PATTERNS**

* **Design System:**  
  * **Shape:** The defining geometric rule of the site is the **rounded rectangle**. Every piece of media (video, grid image, cursor trail image) adheres to this border-radius.  
  * **Typography:** The contrasting pairing of a structural geometric sans-serif (for UI, massive headers, and structural sentences) with an elegant, red, italicized serif (for conceptual emphasis) is the core visual motif.  
  * **Color:** Monochromatic (Black/White/Gray) serving as a gallery wall for the vibrant architectural photography, punctuated only by a specific, muted red for emphasis.  
* **Motion System:**  
  * **Philosophy:** "Scrollytelling." The user's scroll wheel acts as a timeline scrubber. The motion is smooth, fluid, and heavily relies on hardware-accelerated transforms (translation and scale).  
  * **Signature Move:** The mouse-trail image reveal at the end is the most technically impressive and playful interaction on the site, contrasting with the structured scrolling above.  
* **Asset Quality:** 10/10. The design relies entirely on flawless, professional architectural media. Code alone cannot make this site look good; it requires top-tier imagery.

### **5\. TECHNICAL ESTIMATION**

* **Tech Stack:** React (Next.js highly likely for performance) or a highly optimized Webflow build.  
* **Animation Libraries:** **GSAP (GreenSock)** is almost certainly powering this. ScrollTrigger for the pinning and parallax, and GSAP core for the mouse trail. **Lenis** or **Locomotive Scroll** is likely being used to provide the buttery-smooth, interpolated scroll experience.  
* **Complexity Rating:** 8.5/10.  
* **AI Capability:** An AI could generate 80% of this (the layouts, the basic ScrollTriggers, the typography styling). However, the Image Trail effect (Section 5\) requires complex state management and performance optimization (managing DOM node creation/destruction on mouse move so the browser doesn't crash) that often requires human architectural thought to get perfectly smooth.

### **6\. GSAP/ANIMATION CODE ESTIMATION**

**Horizontal Scroll (Section 1):**  
JavaScript  
const horizontalTl \= gsap.timeline({  
  scrollTrigger: {  
    trigger: ".hero-horizontal-wrapper",  
    pin: true,  
    scrub: 1, // Smooth scrubbing  
    end: () \=\> "+=" \+ document.querySelector(".video-track").offsetWidth  
  }  
});

horizontalTl.to(".video-track", {  
  x: () \=\> \-(document.querySelector(".video-track").scrollWidth \- window.innerWidth),  
  ease: "none" // Linear movement tied exactly to scroll  
});  
// The outline text "EXPERTISE" would just be position: fixed or absolute within the pinned container

**Text Reveal Sequence (Section 2):**  
JavaScript  
const textTl \= gsap.timeline({  
  scrollTrigger: {  
    trigger: ".text-sequence-container",  
    pin: true,  
    scrub: 1,  
    start: "top top",  
    end: "+=300%" // Pin for 3 screen heights  
  }  
});

// Assuming sentences are stacked on top of each other absolutely  
textTl.to(".sentence-1", { y: \-100, opacity: 0, duration: 1 })  
      .fromTo(".sentence-2", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "\<")  
      .to(".sentence-2", { y: \-100, opacity: 0, duration: 1 }, "+=0.5")  
      .fromTo(".sentence-3", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "\<")

**Image Trail (Section 5 \- Conceptual Logic):**  
JavaScript  
// Requires tracking mouse coordinates and an array of image references  
let currentIndex \= 0;  
const images \= document.querySelectorAll('.trail-image'); // Pre-rendered, hidden in DOM

window.addEventListener("mousemove", (e) \=\> {  
    // Throttle this or check distance moved to prevent spawning too many  
    const img \= images\[currentIndex\];  
      
    // Set position to mouse coordinates  
    gsap.set(img, { x: e.clientX, y: e.clientY, xPercent: \-50, yPercent: \-50 });  
      
    // Animate In  
    gsap.fromTo(img,   
        { scale: 0, opacity: 0 },   
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }  
    );  
      
    // Animate Out after delay  
    gsap.to(img, { scale: 0, opacity: 0, duration: 0.4, ease: "power2.in", delay: 0.8 });  
      
    currentIndex \= (currentIndex \+ 1) % images.length;  
});

### **7\. REPRODUCTION CHECKLIST**

To rebuild this site, a team would need:

* \[ \] **Media Assets:** 5+ high-res, color-graded horizontal videos; 10+ high-res architectural photos; a massive SVG vector file for the bottom logo.  
* \[ \] **Design Decisions:** Finalize the exact geometric sans-serif and the italic serif fonts to purchase/license.  
* \[ \] **Libraries:** Install gsap, gsap/ScrollTrigger, and @studio-freight/lenis (for smooth scrolling).  
* \[ \] **Global CSS Setup:** Establish the core border-radius variable (e.g., \--global-radius: 24px) to apply to all media wrappers universally.  
* \[ \] **Human Craft:** The AI can scaffold the React components and GSAP timelines, but a human developer must fine-tune the scrub rates, the duration of the mouse-trail fades, and the exact y translation distances to make the motion feel heavy and expensive rather than floaty.

