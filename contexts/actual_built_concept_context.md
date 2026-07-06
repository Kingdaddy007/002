# XBD Collective Cinematic Concept Homepage — Built Context

This document serves as the absolute source of truth for **what was actually built** for the XBD Collective concept homepage. It bridges the gap between early outreach strategy drafts (which focused heavily on a single project, *Solar House*) and the fully-realized, immersive homepage experience showcasing the entire brand.

---

## 1. Overview & Brand Alignment
Instead of a simple portfolio carousel, this project is a fully custom, highly animated cinematic **homepage concept** designed as an "open-book pitch" for **Ellen Søhoel**, the founder of **XBD Collective** (luxury residential interior design and architecture based in Dubai and London).

The site behaves as a physical volume: a sequence of tactile stone-like spaces where the user's scroll unmasks the work and proves the transition from raw structure to finished design.

---

## 2. Core Architecture & Components

The homepage is structured as a single-page scrolling journey with the following sequential sections:

### Section 1: The Preloader / Foyer Reset
*   **File:** [Preloader.tsx](file:///C:/Users/Oviks/Documents/antigravity/calm-brahmagupta/src/components/Preloader.tsx)
*   **Visual Sensation:** Matte-dark canvas with a WebGL Simplex Noise Displacement Shader animating a fluted glass texture.
*   **Interaction:** 
    *   Locks scrolling (both native and Lenis) on load.
    *   Fades in the XBD Monogram and logo mark.
    *   A looping scroll cue invites the user to scroll.
    *   Upon scroll, keydown, or touch event, a GSAP timeline triggers a cinematic dissolve: the WebGL glass shader distorts organically (increasing amplitude and fading opacity) while the main logo fades out, unlocking scroll capability.

### Section 2: The Cinematic Video Hero
*   **File:** [VideoHero.tsx](file:///C:/Users/Oviks/Documents/antigravity/calm-brahmagupta/src/components/VideoHero.tsx)
*   **Visual Sensation:** 5 full-screen cinematic, AI-generated MP4 scenes showing the scales of XBD's design:
    1.  `scene-1`: "SPATIAL MASTERY."
    2.  `scene-2`: "Private sanctuaries engineered for absolute discretion."
    3.  `scene-3`: "Singular estates. Coastal masterplans."
    4.  `scene-4`: "Material logic. Atmospheric control."
    5.  `scene-5`: "Commanding the skyline."
*   **Motion & Transitions:**
    *   **Z-Axis Zoom:** Synced with the preloader's dissolve, the first video scales down from `1.1` to `1` over `3.5s` for a deep, immersive entrance.
    *   **Vertical Strip Wipe:** Pinned over a `400vh` scroll duration, scenes transition sequentially using a custom staggered vertical wipe mask (CSS `WebkitMaskImage` with 5 vertical strips) animated by GSAP.
    *   **Dynamic Performance Optimization:** Programmatically checks scroll progress to only play up to 2 videos concurrently, pausing off-screen videos to save CPU/GPU overhead.
    *   **Progress Tracking:** A right sidebar progress bar reflects the active scene and scroll depth.

### Section 3: Philosophy Bridge
*   **File:** [PhilosophyBridge.tsx](file:///C:/Users/Oviks/Documents/antigravity/calm-brahmagupta/src/components/PhilosophyBridge.tsx)
*   **Visual Sensation:** Transition into a bright, warm Limestone (`#F7F5F2`) and Espresso (`#2C2621`) theme.
*   **Motion & Pacing:**
    *   **Left Column:** Large, bold structural typography reveals "FROM CONCEPT TO REALITY." with staggered vertical reveals.
    *   **Divider:** A thin vertical divider scrubs in from top to bottom.
    *   **Right Column:** Staggered word-by-word reveal of the XBD Standard philosophy block, concluding with a signature block for founder Ellen Søhoel.

### Section 4: The Expertise / Disciplines Section
*   **File:** [DisciplinesSection.tsx](file:///C:/Users/Oviks/Documents/antigravity/calm-brahmagupta/src/components/DisciplinesSection.tsx)
*   **Visual Sensation:** Deep-focus parallax image block cards presenting XBD's three primary scales:
    1.  **Masterplan & Landscape**
    2.  **Architecture**
    3.  **Interiors**
*   **Spatial 3D Gallery (Interactive):**
    *   **File:** [CurvedCinemaGallery.tsx](file:///C:/Users/Oviks/Documents/antigravity/calm-brahmagupta/src/components/CurvedCinemaGallery.tsx)
    *   Hovering over any discipline card displays a custom "Click to Explore" button.
    *   Clicking mounts a React Three Fiber (`@react-three/fiber` & `@react-three/drei`) spatial 3D WebGL Cylinder Gallery.
    *   The user is placed at the exact center of a curved cylindrical screen. Image textures map to the inner faces.
    *   Endless OrbitControls panning around the 360-degree loop (radius dynamically sized based on the number of images to prevent seam gaps).
    *   The scene features a reflective dark floor (`MeshReflectorMaterial`), floating golden dust particles (`Sparkles`), fog, and a dynamic FOV calculation to normalize scale across galleries.

### Section 5: The Proof Moment (Solar House)
*   **File:** [ProofSection.tsx](file:///C:/Users/Oviks/Documents/antigravity/calm-brahmagupta/src/components/ProofSection.tsx)
*   **Visual Sensation:** An inline silent loop video of the completed "Solar House" project.
*   **Motion:** Subtle scroll parallax on the video background with an elegant caption reveal. This serves as an atmospheric proof point rather than the entire focus of the site.

### Section 6: The Team Orbit
*   **File:** [TeamSection.tsx](file:///C:/Users/Oviks/Documents/antigravity/calm-brahmagupta/src/components/TeamSection.tsx)
*   **Visual Sensation:** A radial planetary layout presenting the studio's key leadership.
*   **Motion & Transitions:**
    *   **Fly-Out Reveal:** Portraits of the 9 orbiting team members start collapsed at the absolute center behind Founder Ellen Søhoel and fly out radially to their respective orbits as the section pins.
    *   **Planetary Rotation:** As scrolling continues, the entire orbit container rotates 180 degrees, while individual portraits counter-rotate 180 degrees to remain upright.
    *   **Text & Parallax:** Background text ("COLLECTIVE") undergoes a scale-down reverse parallax. Structural corner statements ("Guided by a unified leadership orbit...") reveal their text with elegant line masks.

### Section 7: The Concierge & Interactive Footer
*   **File:** [ConciergeSection.tsx](file:///C:/Users/Oviks/Documents/antigravity/calm-brahmagupta/src/components/ConciergeSection.tsx)
*   **Visual Sensation:** A selective, low-friction inquiry form and a grounded interactive footer.
*   **Inquiry Form:** Designed with a clean 2-column input grid layout (Location, Scale, Name, Email, Budget Range, Execution Risk) using elegant animated typography and border fills.
*   **Parallax Footer Reveal:** The footer slides up behind the form.
*   **Interactive Location Hover:** Hovering over the Dubai HQ or London address details fades in and swaps background images representing architectural facades of Dubai D3 vs. London Mayfair.

---

## 3. Technology Stack & Core Tools
*   **Framework:** Next.js (Native TypeScript 7.0) with App Router.
*   **Animation System:** GSAP (GreenSock Animation Platform) using `@gsap/react` and `ScrollTrigger` for high-performance scroll pinning, scrubbed timelines, and layout toggles.
*   **WebGL 3D Rendering:** React Three Fiber (`three`, `@react-three/fiber`, and `@react-three/drei`) for immersive cylindrical projection galleries.
*   **Scrolling Coordination:** Lenis for smooth, unified scrolling across all devices.
*   **Styling:** Vanilla Tailwind CSS with custom HSL variables representing Limestone backgrounds and Espresso typography.
