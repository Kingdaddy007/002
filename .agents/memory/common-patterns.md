# Common Patterns

## Session: 2026-06-22

### P1 — Prospect Research → Manual Verification Gate
**Pattern:** After any AI-powered prospect research run, insert a mandatory manual verification gate before any brand/concept work begins.
**Steps:**
1. AI produces candidate list (teamwork_preview or self research)
2. User manually checks each lead's Instagram and website
3. User confirms the valid leads back to Anti-Gravity
4. Only then does brand diagnosis begin

### P2 — Lead Numbering Convention
**Pattern:** Always reference prospects by studio name, not by list number. Numbers shift when lists are reordered. Names are stable.
**Example:** "Let's work on XBD Collective" not "Let's work on lead 2."

### P3 — Concept Pitch Framing for Interior Design Prospects
**Pattern:** All spec concepts for cold outreach should be framed as "open book" — built from public information, not a finished deliverable.
**Copy angle:** "This is what we understood from the outside. We believe we can do much more when we work together."
**Purpose:** Removes pressure, signals confidence, opens conversation.

### P4 — Brand Diagnosis Before Any Visual Work
**Pattern:** brand-strategy skill → spatial-experience-design skill → visual thesis → three concept directions → user picks one → build.
**Never skip:** Perception gap and taste world must be evidence-based before any hero section or loading sequence is designed.

### P5 — Hybrid Research for Brand Diagnosis
**Pattern:** Two parallel tracks for auditing a prospect brand:
- Track A: User screen-records Instagram → sends to Gemini with brand-strategy skill as system prompt → Gemini returns structured brand read
- Track B: Anti-Gravity uses Chrome DevTools MCP on their website → inspects sitemap dates, page structure, technical gaps
- Combine both tracks into a single brand-diagnostic document before proceeding to spatial concept

## Session: 2026-06-25

### P6 — Precise SVG Tracing Instead of Rough Morphing
**Pattern:** For complex geometric brand marks, trace their exact skeletons using single-stroke paths matching the geometry of the final fill path. Do not use generic placeholders (e.g. standard infinity loops) to morph into custom asymmetric curves, as it introduces layout shifts ("zoom back").

### P7 — Center-Point GSAP Scaling & Clip-Path Reveals
**Pattern:** When animating construction lines shooting/collapsing, set `transformOrigin: "pXpx pYpx"` matching the center intersection. Use CSS `clip-path: inset(0 50%)` to reveal text horizontally from the center outward.

### P8 — Stacking Context & WebGL Layering
**Pattern:** When working with WebGL overlays like `liquidGL` which inject a global fullscreen canvas at `maxZ - 1`, set all target glass containers to the same maximum z-index (e.g. `z-index: 1000`) and structure their inner text wrappers at a higher relative index (e.g. `z-index: 5` within the container). Move absolute/fixed elements like headers later in the DOM body to control vertical scroll overlap.

### P9 — Cache-Busting Stylesheets
**Pattern:** Always append a query string parameter (e.g. `?v=2`) to `<link rel="stylesheet">` elements in the HTML head when editing styles under active caching, ensuring browser-level caches reload the stylesheet immediately.


