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
