# Master Design Director - Architectural Decisions

## Date: 2026-07-01

- **Decision:** Adopted a new 6-section emotional arc architecture based on the Master Design Director critique.
- **Decision:** Discarded all previous isolated design plans and context files. The ONLY active context files for the next build are `brand-diagnostics.md` and the new Master Implementation Plan / Storyboard.
- **Decision:** Transition format changed from a graphic Diagonal Wipe to a spatial Light Spill Reveal + Vertical Slab Lift, directly reflecting the physical, architectural nature of the brand.

## Date: 2026-07-02

- **Decision:** Threshold transition changed from timed slab lift to scroll-driven dissolve per user directive. The preloader is a fixed overlay that the user scrolls through, dissolving the fluted glass to reveal the Hero.
- **Decision:** Logo color switched from dark (#121212, designed for light fluid video) to light cream (#E5E0DA) for contrast against the darker fluted glass texture.
- **Decision:** WebGL simplex noise displacement chosen over CSS filter for the breathing effect — CSS cannot produce time-varying organic noise.
- **Decision:** "THE REALITY OF THE EXTRAORDINARY" moved from Preloader typography curtain to Hero Scene 1 title.
- **Implementation:** Preloader fully rewritten — old fluid videos, enter button, cursor, curtain all removed. New: WebGL canvas + simplex shader, 80vh scroll spacer, GSAP ScrollTrigger dissolve.
- **Decision:** Structural void removed. Preloader changed to a `fixed` overlay that completely unmounts after an event-triggered GSAP timeline, rather than a scroll-scrubbed document element.
- **Decision:** Logo contrast fixed: changed to pure white and replaced the glowing shadow with an ambient charcoal shadow (`rgba(0, 0, 0, 0.35)`) to achieve optical separation from the bright copper background.
- **Decision:** Logo positioned at optical center (`-mt-[10vh]`) rather than mathematical center.
- **Decision:** Implemented a hard lock on `ReactLenis` via `useLenis()` during the Preloader dissolve to prevent scroll event bleeding into the Hero section.

## [Session 2026-07-02] Light Theme Pivot & Hero Cut
- **Decision:** Pivoted the overarching color scheme from Dark (Espresso Plaster #181615) to Light (Limestone #F7F5F2 & Espresso typography #2C2621). This better matches the luxury, airy aesthetic the brand desires.
- **Decision:** Removed the bottom fade gradient from the VideoHero for a hard cut into the PhilosophyBridge per user instruction.
- **Decision:** Confirmed 3 disciplines (Masterplan, Architecture, Interiors) using an asymmetric scrolling layout.

## [2026-07-03] Footer & Concierge Form Refinements
- **Layout Compression:** Switched the Concierge Form structure from lex-col md:flex-row 4-row layout to a lex-col lg:flex-row with a 2-column input grid (grid-cols-2) to dramatically compress vertical height and prevent vertical scrolling on narrower viewports.
- **Form Typography:** Darkened placeholders to 	ext-xbd-text/40 for better contrast on cream backgrounds. Increased form labels to 	ext-[10px] md:text-xs for legibility.
- **GSAP Animation Fix:** Fixed the text clipping animation by setting starting opacity: 0 in GSAP .fromTo() so it doesn't leak out of the clipping mask before the scroll trigger fires.
- **Sub-Footer Layout:** Refactored the sub-footer to remove the redundant "Connect" column and bound the social icons to the floor using mt-auto.
- **Trigger Stability:** Removed play reverse play reverse from the footer scroll trigger because it caused the footer to actively vanish when scrolling to the absolute bottom.

## Date: 2026-07-03 (Phase 8 - Final Review & Polish)

- **TypeScript Ref Correction:** Fixed compilation error in `ConciergeSection.tsx` by correcting `containerRef` type from `HTMLElement` to `HTMLDivElement` to align with the rendered tag.
- **Video Playback Optimization:** Caged video playback inside `VideoHero.tsx` using `useRef` caching (`vidsRef.current`) to query video elements once on mount. This avoids doing five `document.getElementById` calls at 60fps inside the ScrollTrigger `onUpdate` loop.
- **Autoplay Safeguard:** Resolved autoplay freeze on load by passing `autoPlay={true}` to Scene 1 video inside `SceneMedia` and programmatically calling `play()` on initial mount, ensuring the threshold scene is active immediately.
- **Header Performance Refactoring:** Eliminated layout thrashing inside `Header.tsx` by replacing the scroll listener's `getBoundingClientRect()` queries with GSAP ScrollTriggers bound to `#philosophy` and `#video-hero`, achieving jank-free performance.
- **Concierge Form Visual Balancing:** Resolved the asymmetrical blank cell in the 2-column form grid by applying `col-span-2` to the `Project Budget` select dropdown container, creating a balanced visual alignment of fields.
