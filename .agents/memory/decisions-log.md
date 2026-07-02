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
