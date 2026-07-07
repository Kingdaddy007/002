# Mistakes and Failed Approaches to Avoid

## GSAP Pinning Collisions and `clip-path`
- **The Mistake:** Attempting to control the `clip-path` of a previous sibling component (`#triptych-section`) from within a downstream component (`PhilosophyBridge`). 
- **The Impact:** When GSAP pins a container (like `TriptychHero`), it wraps it in a `.pin-spacer` which defaults to `z-index: 9999`. The subsequent component sliding over the pinned hero while simultaneously manipulating the hero's `clip-path` caused the high z-index hero text/elements to bleed right over the dark background of the next section, resulting in visual clashing and broken immersion.

## Sarcasm and Direct Instructions
- **The Mistake:** Assuming the user did not want `Scroll Choreography and Timeline Architecture` referenced because they said "We don't need a reference. That is not important" in a sarcastic tone.
- **The Lesson:** Always read the subtext. In luxury/premium architecture, the macro-choreography is the *most* important part of the layout. Never skip a folder in the `motion-library` skill.

## Raw Tailwind Hex Compiler Glitch
- **The Mistake:** Writing raw hex values in styling classes (e.g. `bg-[#1A1815]`) dynamically without verifying that Tailwind's JIT compiler has registered the utility.
- **The Impact:** Tailwind JIT failed to compile the dynamic arbitrary class, rendering the container completely transparent and letting the default white `body` background bleed through. This created a jarring white background block beneath the dark cinematic video section, confusing the design intent. Always register design system colors as semantic CSS variables or static Tailwind tokens.

## Structural Void in Fixed Preloaders
- **The Mistake:** Using an `80vh` physical spacer in the document flow to trigger a GSAP dissolve on a fixed preloader.
- **The Impact:** Treating an overlay like a structural DOM element leaves a massive blank space in the page layout. When a user scrolls "back up" from the Hero, they fall into an empty black void. Fixed preloaders must be purely event-driven and unmount themselves after dissolving.

## Smooth Scroll Event Bleed (ReactLenis)
- **The Mistake:** Setting `document.body.style.overflow = "hidden"` during a full-screen transition, but failing to explicitly stop the `ReactLenis` instance.
- **The Impact:** Lenis intercepts wheel events regardless of CSS overflow settings. While the preloader was dissolving (which took 3.2 seconds), Lenis was secretly scrubbing the `ScrollTrigger` timelines of the hidden Hero section underneath. By the time the preloader finished, the user had already scrubbed past the intro text of the first video. Always use `lenis.stop()` during full-page overlays, and ensure the `lenis.start()` callback doesn't suffer from a stale closure (use a `useRef` to track the active Lenis instance).

## [Session 2026-07-02] Tailwind v4 Variables Failure
- **Mistake:** Attempting to use var(--background) in the Tailwind @theme block when migrating colors via a script, which caused the variables to not resolve properly in production and fallback to pure white.
- **Fix/Avoidance:** In Tailwind v4, hardcode the hex values directly into the @theme block (e.g., --color-xbd-bg: #F7F5F2;) to ensure stable compilation and prevent visual failure during color migrations.

## [2026-07-03] Layout Stacking & GSAP Trigger Errors
- **Mistake**: Assuming md:flex-row would solve stacking on the user's desktop screen. 
  **Correction**: If the user's viewport triggers mobile breakpoints (e.g. snapped window), flex stacking creates massive vertical height. Always use grid grid-cols-2 for form inputs if minimizing vertical scrolling is a strict requirement, ensuring side-by-side fields on narrower viewports.
- **Mistake**: Setting GSAP scroll triggers with 	oggleActions: "play reverse play reverse" on sections that are at the absolute bottom of the page.
  **Correction**: This causes the section to aggressively hide itself when the user hits the bottom limit. Use "play none none reverse" instead.
- **Mistake**: Using pb-2 on overflow-hidden text masks.
  **Correction**: It leaks the hidden text below the mask. Remove padding and ensure opacity: 0 is applied to the starting state of the animated elements.
- **Mistake**: Keeping a fixed transparent header visible on scroll up in a one-page site with alternating light/dark sections.
  **Correction**: The header text and logo will clash violently with content underneath it if the user scrolls backwards. If building a tightly choreographed pitch without a solid header background, make the header disappear completely on scroll down and only reappear at `scrollY === 0`.
- **Mistake**: Leaving broken or unimplemented UI elements (like a hamburger menu) in a concept pitch.
  **Correction**: The pitch must feel flawless. If an element doesn't work, remove it entirely. A dead click ruins the illusion of a finished product.

- **Mistake**: Running Vercel CLI commands without setting Node system CA options on Windows systems with custom/corporate networks.
  **Correction**: This results in `UNABLE_TO_VERIFY_LEAF_SIGNATURE` certificate errors. Fix by running the command with the environment variable `$env:NODE_OPTIONS="--use-system-ca"`.

