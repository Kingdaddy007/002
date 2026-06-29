# Architectural Decisions Log

## Spatial Motion Overhaul
- **Decision:** Shifted the project from standard web layouts to "Macro-Choreography" based on the `cinematic-motion` library.
- **Components Affected:** `TriptychHero.tsx` and `PhilosophyBridge.tsx`.
- **Selected Mechanics:** 
  1. `clip-path-cinematic-squeeze.md` (for the video transition).
  2. `scroll-driven-css-3d-cylinder-text-projection.md` (for the monumental typography).
  3. `assembly-layout-construction-pinning.md` (for the Philosophy section assembly).
- **Reasoning:** Standard fades and gradients fail the 100x premium test. The site requires physical, tactile, and spatial transitions to achieve an Awwwards-tier architectural feel.

## Transition Alignment & Pin Consolidation (June 2026)
- **Decision:** Moved the "Cinematic Aspect Ratio Squeeze" ScrollTrigger and timeline animations from `PhilosophyBridge.tsx` directly into the `VideoHero.tsx` component, extending its pinning by `100vh` and adding a negative margin-top (`-100vh`) on `PhilosophyBridge` to handle the scroll overlap.
- **Components Affected:** `VideoHero.tsx` and `PhilosophyBridge.tsx`.
- **Reasoning:** Cross-component ScrollTrigger targets resulted in z-index collision and timing mismatches because of GSAP's pin-spacer mechanics. Unifying the pinning and squeeze inside the parent component and adjusting the layout flow via CSS margin-top resolves all clashing and bleeding text issues cleanly.
