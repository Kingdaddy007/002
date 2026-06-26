# Decisions Log

## Session: 2026-06-22

### D1 — Target Client Selected
**Decision:** XBD Collective (Dubai, UAE) is the sole active target.
**Founder:** Ellen Søhoel
**Instagram:** https://www.instagram.com/xbdcollective/
**Website:** https://xbdesign.com
**Reason:** Only valid lead from the prospect research run. Active daily posting, award-winning, ultra-luxury Palm Jumeirah residential interiors. Website is a static template with standard carousels — massive gap relative to their Instagram quality. Score: 83/100 Elite Tier.

### D2 — Other Leads Rejected
**Decision:** Stephen Falcke and Donald Nxumalo were disqualified after manual verification.
**Reason:** Both profiles showed inactive/dead Instagram accounts and websites that did not meet minimum ICP thresholds. Lead data from the teamwork AI research agent was not reliable without manual verification. Always verify leads manually before investing work.

### D3 — Geographic Focus
**Decision:** Dubai and South Africa (Johannesburg, Cape Town). Nigeria excluded by user preference.
**Reason:** User's explicit instruction. Not a quality judgment on Nigeria market.

### D4 — Deliverable Type
**Decision:** The concept for XBD Collective is an "open book" pitch — a cinematic homepage concept built from public information only, framed as a proof of understanding, not a final deliverable.
**Purpose:** Instagram outreach. Tag them in a post or send as a DM visual proof to trigger a conversation.
**Framing:** "This is what we built from what we could see. Imagine what we can do when we work together."

### D5 — No Outreach Copy in This Sprint
**Decision:** The sales-enablement / copywriting skill will handle outreach separately. This sprint is concept-only: brand diagnosis → spatial concept → homepage sections → hero event.

### D6 — Research Tool Strategy
**Decision:** Hybrid research approach for brand diagnosis.
- User: Screen record Instagram → send to Gemini with brand-strategy skill as system prompt
- Anti-Gravity: Chrome DevTools MCP on xbdesign.com for site audit (technical gaps, sitemap dates, structure)
- Combine both outputs to produce a single brand diagnostic document

## Session: 2026-06-25

### D7 — Refined Preloader Outline Geometry
**Decision:** Remove morphing from horizontal infinity loops to resolve the visual "zoom back" shift. Recreate the precise architectural grid lines and loops from the official brand intro: double diagonals bottom-left to top-right, single diagonal top-left to bottom-right, drafting shooter lines (three leftward, one bottom-right) scaling out and collapsing into center intersection `(3810.11px, 182.17px)`, and horizontal `clip-path` reveal for `"COLLECTIVE"`.

### D8 — Triptych Hero & Scroll Transition Pivot
**Decision:** Replaced the day-to-night residential timeline with a Cinematic Triptych Hero layout.
**Reason:** Showing a single residential timelapse undersells XBD's multi-disciplinary scale. The triptych shows Architecture, Interiors, and Details simultaneously. Added a ScrollTrigger "curtain reveal" (panes slide vertically off-screen on scroll) to transition to Section 4.

### D9 — WebGL liquidGL Shader Integration
**Decision:** Integrated `liquidGL.js` (cloned from naughtyduk/liquidGL) to power glassmorphism elements.
**Reason:** Standard CSS `backdrop-filter` is a flat blur. Real luxury WebGL glass requires actual background refraction, bevel depth, and light specular highlights.

### D10 — Z-index Stacking Context for WebGL Glass Overlay
**Decision:** Changed the `.pane-card` z-index to `1000` (matching the header's z-index) so that the glassmorphism card content sits above the WebGL canvas (which renders globally at `999`). We also moved `<header id="main-header">` below the `<main>` tag in the HTML body to preserve correct vertical stacking when scrolling.
**Reason:** Resolve WebGL canvas covering card text content.

### D11 — Local HTTP Server Cache Disabling & Cache Busting
**Decision:** Stopped the default HTTP server and restarted it with caching disabled completely (`npx -y http-server -p 8080 -c-1`). Also appended `?v=2` versioning query parameter to the `style.css` stylesheet link in `index.html`.
**Reason:** Prevent the browser from loading cached assets (old gradient placeholders and CSS rules) during development.

### D12 — Reconsideration of Hero Accordion Layout
**Decision:** Put a pin in the current hover accordion layout to evaluate its suitability as a homepage hero section. The user noted that the widening motion on hover might not be the most premium interaction for a landing hero. We will review this and plan the text arrangement/animation in the next chat session, deciding whether to refine, reposition, or repurpose the triptych grid.

### D13 — Pivot to Static Triptych Grid with Card Translations
**Decision:** Changed the Triptych Hero layout to keep the three vertical columns at static equal widths (`flex: 1` or `33.33vw`) instead of resizing on hover. Hover effects are now focused on image zoom, WebGL liquid refraction, and vertical card transitions.
**Reason:** Layout widening shifts are distracting and cause text reflows. Static columns preserve architectural alignment and clean symmetry.

### D14 — Horizontal Typographic Curtain Split
**Decision:** Implemented a fixed Typographic Curtain section (`#typographic-curtain`) with two panels that split and slide out horizontally (`xPercent: -102` and `102`) using ScrollTrigger, revealing the Triptych Hero underneath.
**Reason:** Creates a powerful, narrative threshold transition on scroll, drawing visitor focus to the visual thesis.

### D15 — SVG Text Masking for Execution Proof Video
**Decision:** Used an SVG `<mask>` containing white background and black text on a limestone `<rect>` element, overlaid on top of an HTML5 `<video>` tag, to mask the video inside the text `"FROM DRAWING TO OBJECT."`
**Reason:** Direct CSS `background-clip: text` on videos has poor cross-browser compatibility. SVG masks are reliable, highly performant, and render identical cut-outs.

### D16 — Asymmetric Opposing Parallax for Catalog Grid
**Decision:** Arranged the Section 6 portfolio grid as an asymmetric masonry layout, using ScrollTrigger to slide the left and right columns upwards while translating the center column downwards.
**Reason:** Creates an organic sense of depth and catalog discovery, avoiding standard carousel widgets.

### D17 — High-End Concierge Input Styling
**Decision:** Designed inquiry form fields using large displaying serif fonts with absolute underline bars that expand in gold on focus.
**Reason:** Replaces standard text input boxes to preserve the editorial, high-trust atelier posture.

### D18 — Adopt Satoshi & Gambetta Light Gallery Theme
**Decision:** Updated stylesheet and HTML head to load Satoshi and Gambetta fonts from Fontshare, and swapped variables to a pure white background, dark charcoal text, and gold accents.
**Reason:** Consistency with target design tokens in `design.json`.

### D19 — Repurpose Triptych Grid as Section 2: Duality
**Decision:** Moved the triptych out of the Hero role, placing it as Section 2: Focus Proof (The Duality), representing the tension between Architecture (Macro), Interiors (Micro), and Details (Tactile).
**Reason:** Aligns with the pitch roadmap in `contexts/spatial-story.md`.

### D20 — Full-Bleed Drawer Click Expansion
**Decision:** Implemented click listeners on columns to expand them to `flex: 1 0 100%` and collapse the others to `flex: 0 0 0%`. Inner detailed drawers fade and slide in, scroll locking the page while open.
**Reason:** Satisfies the interactive portfolio inspection requirement.

### D21 — Prev/Next Edge Navigation for Drawers
**Decision:** Placed edge navigation buttons (`prev-link` and `next-link`) at the left/right viewport borders to swap widths and drawer contents directly.
**Reason:** Solves the navigation layout issue by letting users slide directly between expanded pillars.


