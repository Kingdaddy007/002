# XBD COLLECTIVE — CINEMATIC SCROLL STORYBOARD
**Version:** Gold v2.0 (Compressed & Structured)  
**Target File:** `scroll_storyboard.md`  
**Brand:** XBD Collective (Architecture, Interior Design, Masterplan Design, Landscape Design)  
**Founder:** Ellen Søhoel (Positioning: "Reality-Makers")  
**Theme:** "The website behaves as a physical volume: a sequence of tactile stone-like spaces where the user's scroll unmasks the work and proves the transition from raw structure to finished design."

---

## EXECUTIVE SUMMARY & BRAND THESIS

XBD Collective projects represent massive, high-stakes physical architecture (e.g., the 76-story Rixos Residences tower, the Bvlgari Villa, W Residences Palm Jumeirah, St. Regis). However, its current digital footprint suffers from a severe **Perception Gap**—presenting global-tier design authorship through the lens of a regional contractor using a template-style interface. 

To resolve this gap, this storyboard details a **7-Room Cinematic Scroll Experience**. The website rejects passive carousels, default templates, and decorative gimmicks. Instead, the interface acts as a physical volume. By mapping structural wireframes (imagination), construction telemetry (engineering), and photorealistic spaces (reality), the website demonstrates that XBD are **Reality-Makers** who execute to the millimeter.

To achieve this, the following storyboard incorporates:
*   **30 Premium Design-Audit References** (`site-01-oryzo.md` to `site-30-nauta.md`) for grid, layout, and motion DNA.
*   **24 Storytelling Mechanics** (`01-inertial-disorientation.md` to `24-casual-glossary-immersion.md`) to structure the user's cognitive and emotional journey.

---

## THE 7-ROOM SCROLL EXPERIENCE

### SECTION 1: The Preloader (Foyer/Threshold)

*   **Beat # and Label:** Beat 1: The Foyer Reset
*   **Scroll Depth:** `0%` (Static landing, initial load gate)
*   **Controlling Idea:** Resetting sensory noise to prepare the viewer for spatial volume and calibrating scroll physics.
*   **What the User Sees:** A solid dark charcoal (`#121212`) viewport in absolute silence. In the center, a thin warm champagne (`#D4C5B3`) vector path slowly draws the XBD infinity monogram. Below it, a subtle, clinical interface prompts the user with three options: `[Stone] [Steel] [Wood]`. The cursor is a precise 3D coordinate crosshair. Pushing down on the scroll wheel initiates a slow, dampened forward camera push.
*   **What the User Feels:** Hush, anticipation, structural precision, quiet confidence.
*   **Register:** DARK
*   **Anchor Object:** The centering infinity monogram path.
*   **Copy Mode:** Clinical HUD-style micro-sans. Brackets and coordinates frame the initial material query: `[SELECT MATERIAL]` ➔ `[01/STONE]` `[02/STEEL]` `[03/WOOD]`.
*   **Transition Out:** The monogram path splits horizontally from the center. The background charcoal split-panels slide away left and right, acting as a camera shutter opening to reveal Section 2.
*   **Citations & Inspiration Log:**
    *   `17-identity-amnesia-onboarding.md`: Inspires the initial material selection prompt, forcing the user to interact with the brand's core raw materials before unlocking the main site.
    *   `02-urgency-calibration.md`: Inspires the dampened scroll physics, setting a low `0.2` wheel multiplier to force slow, focused attention on entry.
    *   `01-inertial-disorientation.md`: Inspires the initial camera coordination where the camera flies through abstract coordinates before stabilizing on the logo.
    *   `site-17-igloo.md`: Inspires the clinical "HUD Frame Overlay" with crosshairs and brackets, keeping UI pushed to the screen margins.
    *   `site-03-main.md`: Inspires the WebGL canvas setup with a persistent progress rail and coordinate overlay tags.
    *   `site-02-montfort.md`: Inspires the volumetric cloud/mist overlay plates that soften the entry transition and control contrast.
    *   `site-29-lounge-coffee.md`: Inspires the preloader split transition where a center-split path expands to reveal the page behind.
    *   `site-22-tea.md`: Inspires the meditative, slow temporal pacing, ensuring elements arrive in a deliberate sequence.

---

### SECTION 2: The Typographic Curtain (Hero / First Fold)

*   **Beat # and Label:** Beat 2: The Typographic Curtain
*   **Scroll Depth:** `0% to 15%`
*   **Controlling Idea:** Establishing XBD's structural authority through large-scale display typography before showing portfolio renders.
*   **What the User Sees:** The charcoal panels slide away to reveal a clean dark canvas. Massive display typography dominates the center: `"THE REALITY OF THE EXTRAORDINARY."` rendered in high-contrast Canela display serif. In the margins, the logo `"X B D   C O L L E C T I V E"` is pinned in widely tracked caps. As the user scrolls, the letters of the central statement split apart vertically and slide off-screen to clear the viewport.
*   **What the User Feels:** Typographic weight, scale, and high-fashion editorial rigor.
*   **Register:** DARK
*   **Anchor Object:** The letters of the word `"REALITY"`.
*   **Copy Mode:** Oversized display serif (Canela) paired with thin geometric sans-serif (Space Grotesk).
*   **Transition Out:** The splitting letters slide off-screen, acting as a mask that reveals the dark night-sky background of Section 3.
*   **Citations & Inspiration Log:**
    *   `04-ontological-interface-disruption.md`: Inspires the projection of HTML text into the 3D scene, using a simplex noise shader to distort and break the text boundaries on scroll.
    *   `10-chorus-cascade-narrative-fragmentation.md`: Inspires the instanced floating text fragments that pan past the camera as the scroll progress advances.
    *   `12-dignified-evasion-architecture.md`: Inspires the strict copy restraint, keeping sentences short and letting punctuation marks fade in with a slight delay.
    *   `site-01-oryzo.md`: Inspires the text reveal mask where display typography slides up through a `clip-path: inset()` overflow wrapper.
    *   `site-06-elva.md`: Inspires the center stage layout pinning a single container where background billboard typography fades.
    *   `site-09-joby.md`: Inspires the transition structure, establishing a high-stakes hook before presenting any services or partner grids.
    *   `site-13-stringtune.md`: Inspires the outlined background typography and the shock-cut color inversion that occurs when scroll thresholds are crossed.
    *   `site-16-croptab.md`: Inspires the center-aligned hero with a floating 3D wireframe block positioned over a massive background logo.
    *   `site-25-indigo.md`: Inspires the bouncy, elastic GSAP curves (`back.out`) that handle the splitting letters' movement.

---

### SECTION 3: The Intimacy Anchor (Private Residential Room)

*   **Beat # and Label:** Beat 3: The Solar House Portal
*   **Scroll Depth:** `15% to 35%`
*   **Controlling Idea:** Grounding the brand in elite B2C residential design through a tactile, light-dampened architectural diorama.
*   **What the User Sees:** A full-screen, high-resolution night-to-dawn transition photograph of **Solar House** in Dubai. The scene shows a glowing infinity pool, fluted travertine columns, and a starry desert sky. The primary copy `"SOLAR HOUSE"` slides up behind the roofline. As the user scrolls, the camera pans slowly across the travertine wall. If the user stops scrolling, the shadow of a palm tree slowly tracks across the stone grain, driven by a directional sun shader.
*   **What the User Feels:** Deep intimacy, warmth, sensory indulgence, quiet luxury.
*   **Register:** LIGHT (warm sand and cream tones `#F2EDE6`)
*   **Anchor Object:** Travertine stone wall block.
*   **Copy Mode:** Poetic, immersive second-person copy detailing the physical sensation of the materials.
*   **Transition Out:** A massive limestone slab container slides vertically upward over the Solar House viewport.
*   **Citations & Inspiration Log:**
    *   `05-second-person-spatial-proximity.md`: Inspires the direct, poetic second-person copy (e.g., *"You step onto warm travertine. The desert heat stops at the threshold."*) and the flat focal depth of the WebGL camera scene.
    *   `15-linguistic-defamiliarization.md`: Inspires the technical geological description of materials, utilizing terms like `"Travertine Stratum"` and `"Diurnal Shadows"`.
    *   `19-voided-protagonist.md`: Inspires the composition where the columns split apart to frame the empty void of the desert landscape behind them.
    *   `site-18-estates.md`: Inspires the "Stacked Media Panels" where full-screen cards slide vertically over one another, casting soft drop-shadows to emphasize architectural sheet depth.
    *   `site-05-cartier.md`: Inspires the use of light and color temperature (warm gold and amber) to define the boundaries of the spatial diorama.
    *   `site-07-springs.md`: Inspires the magazine-style layout, using overlapping absolute cards and offset scroll speeds for parallax depth.
    *   `site-15-ibex.md`: Inspires the room-by-room color transition (dark to amber travertine to green landscape).
    *   `site-23-hool.md`: Inspires the low-amplitude ambient drift of organic elements (leaves, pool ripples) around the text layers.
    *   `site-28-calmm.md`: Inspires the "Depth Sandwich" composition, layering the sky gradient, headline, floating villa model, and blurred foreground foliage.

---

### SECTION 4: The Scale Transition (Commercial Developer Room)

*   **Beat # and Label:** Beat 4: The Rixos Scale
*   **Scroll Depth:** `35% to 55%`
*   **Controlling Idea:** Weaving landscape and architecture scales to prove commercial capacity via the Rixos Residences skyscraper.
*   **What the User Sees:** The limestone block container slides in. Inside is a daytime rendering of the **Rixos Residences** 76-story tower. An intricate network of SVG botanical lines grows dynamically on scroll across the margins (Landscape Design). The camera zooms vertically up the facade of the tower. Pinned on the left is a split-screen technical data column. The 3D tower coordinates are mapped as a point-cloud particle grid that morphs as the user scrolls, resolving from a flat topographical wave into structured geometric grids.
*   **What the User Feels:** Monumental scale, verticality, systemic coordination, urban power.
*   **Register:** LIGHT
*   **Anchor Object:** The vertical column lines of the Rixos facade.
*   **Copy Mode:** Technical developer specifications in monospace uppercase block.
*   **Transition Out:** The camera dollies deep into a glass panel of the tower facade, executing a WebGL "mesh breach" transition that unloads the scene.
*   **Citations & Inspiration Log:**
    *   `06-architectural-scale-implication.md`: Inspires the instanced column grids that recede into a dense volumetric fog, implying infinite height without explicit measurement.
    *   `09-slow-burn-atmospheric-poisoning.md`: Inspires the scroll-bound material transformation, where the visual texture transitions from polished chrome to raw concrete on scroll.
    *   `13-compression-cascade-syntax.md`: Inspires the dynamic narrowing of layout margins and grid padding to simulate the density of commercial master planning.
    *   `site-12-pioneer.md`: Inspires the 3D point-cloud coordinate morphing, shifting from landscape contours to architectural structures.
    *   `site-24-helios.md`: Inspires the generative WebGL simulation overlay with scrolling Z-axis depth traversal.
    *   `site-14-terminal.md`: Inspires the image sequence scrub playhead, preloading 300 WebP frames to allow smooth, weight-bearing scroll control.
    *   `site-26-goldhive.md`: Inspires the "2D-to-3D Breakout Illusion" where a flat sketch of the tower line work detaches and scales up as a 3D model on scroll.
    *   `site-27-setby.md`: Inspires the vector annotation lines that project from specific model vertices directly to HTML text boxes.
    *   `site-08-art-here.md`: Inspires the portal-window threshold layout, alternating between flat text acts and 3D scenes.

---

### SECTION 5: The Execution Proof (Drawing to Object)

*   **Beat # and Label:** Beat 5: The Millimeter Audit
*   **Scroll Depth:** `55% to 75%`
*   **Controlling Idea:** Directly attacking the perception gap by proving that XBD builds what it draws.
*   **What the User Sees:** A split-screen layout. The left column (35% width) contains bold, clinical copywriting. The right column (65% width) displays a pinned WebGL diorama. The primary copy reads `"FROM DRAWING TO OBJECT."` The letters themselves act as window masks. Inside the letters, a video loop scrubs through architectural sketches, concrete foundation pours on the Dubai site, and the finished interior lobby. On the right, a 3D rotary concrete dial menu is visible. The user drags the dial to progress the scene through phases: `[01/ANALYSIS] ➔ [02/CASTING] ➔ [03/CURATION]`. The cursor transforms into a glowing laser-level marker.
*   **What the User Feels:** Absolute execution confidence, structural rigor, trust, authority.
*   **Register:** TRANSITION (Split contrast)
*   **Anchor Object:** The laser-level cursor indicator.
*   **Copy Mode:** Factual corporate audit tone, structured in newspaper columns.
*   **Transition Out:** Horizontal blind split panels wipe the screen to reveal the catalog room.
*   **Citations & Inspiration Log:**
    *   `07-cognitive-dissonance-programmed-unseeing.md`: Inspires the "Render vs. Reality" stencil buffer reveal, where the user sweeps their cursor to peel back a CAD wireframe and reveal a photo of the completed build in the exact same coordinates.
    *   `03-typographical-reality-framing.md`: Inspires the clinical drawing boundaries, restrict grids, and border coordinates that box the interactive canvas.
    *   `14-abrupt-reality-fracture.md`: Inspires the sudden camera dolly-back, fracturing a close-up marble detail shot to reveal it belongs inside a massive hotel lobby.
    *   `20-bloodied-in-media-res.md`: Inspires the raw site video footage of concrete pours and structural assembly, dropping the user into the real build process without introduction.
    *   `22-ritualized-paranoid-monologue.md`: Inspires the 3D rotary concrete dial navigation, requiring physical user interaction to progress the portfolio phases.
    *   `23-intimate-confessional-voice.md`: Inspires the hard-hitting copywriting stating that 90% of luxury towers in the Gulf are designed by firms that do not inspect the final build, contrasting XBD's meticulous inspections.
    *   `site-30-nauta.md`: Inspires the premium split layout and "Living Mockups" containing active data numbers that update dynamically on scroll via JavaScript tickers.
    *   `site-20-cartier.md`: Inspires the diorama procession, panning the camera through the different stages of craftsmanship (from architect to builder).
    *   `site-11-poly.md`: Inspires the skeuomorphic desk layout where physical paper blueprints extrude into 3D meshes on scroll.
    *   `site-10-obsidian.md`: Inspires the FLIP layout morph where individual elements detach from a grid to expand into full-screen showcases.
    *   `site-04-vase-shop.md`: Inspires the horizontal split transition and organic custom brush masks that separate the acts.

---

### SECTION 6: The Catalog Grid (Range)

*   **Beat # and Label:** Beat 6: The Portfolio Procession
*   **Scroll Depth:** `75% to 90%`
*   **Controlling Idea:** Showcasing XBD's diverse projects (Kata Restaurant, Althuraya Island, Opus Lobby) in a single fluid gesture.
*   **What the User Sees:** A warm champagne (`#D4C5B3`) background. A 3-column asymmetric grid. Left and right columns scroll upwards, while the center column scrolls downwards. The cards showcase the projects with wide-angle shots. A single continuous copper vector path weaves through the columns, connecting the corner vertices of the cards. As the columns scroll, the copper line stretches and bends dynamically. Pinned navigation links in the header dynamically change to match the active project scale.
*   **What the User Feels:** Discovery, curation, spatial continuity, rhythm.
*   **Register:** LIGHT
*   **Anchor Object:** The continuous copper vector line.
*   **Copy Mode:** Understated museum-tag captions and micro specs.
*   **Transition Out:** The columns accelerate and collapse into a solid vertical block.
*   **Citations & Inspiration Log:**
    *   `08-triple-helix-temporal-fracture.md`: Inspires the opposing scrolling columns that lock together in perfect visual alignment at a specific scroll trigger.
    *   `21-nested-narrative-labyrinth.md`: Inspires the continuous copper line that connects independent project cards visually across layout boundaries.
    *   `16-nested-narrative-layering.md`: Inspires the nested camera zooms, pushing the camera through the door threshold of one project card to unlock its sub-pages.
    *   `24-casual-glossary-immersion.md`: Inspires the dynamic navigation links that update from service labels to execution phases as the user scrolls.
    *   `site-19-nomada.md`: Inspires the desaturated 3D canvas backdrop over which DOM text cards slide.
    *   `site-21-tidescape.md`: Evaluated as the core negative pattern reference. XBD explicitly rejects this site's cheap, uniform vertical fade-ups and scattered polaroids, instead utilizing precise opposing vertical columns.

---

### SECTION 7: The Concierge Exit (Footer)

*   **Beat # and Label:** Beat 7: The Commission Gate
*   **Scroll Depth:** `90% to 100%`
*   **Controlling Idea:** Closing the spatial sequence with elite contact gates and an SVG sketch revelation.
*   **What the User Sees:** A solid dark charcoal (`#121212`) block slides vertically upward, returning the site to the dark mode register of Section 1. Centered in display typography is `"A digital presence of equal weight."` Below it is the link `"COMMISSION THE INVISIBLE"` in warm champagne. In the background, a slow-moving, jewel-toned dust-mote particle field floats. As the user hovers over the CTA, an SVG line-drawing of Ellen Søhoel's initial concept sketch of Solar House draws itself on the screen.
*   **What the User Feels:** Exclusivity, finality, absolute trust, elite status.
*   **Register:** DARK
*   **Anchor Object:** The drawing SVG sketch lines.
*   **Copy Mode:** Sophisticated first-person voice.
*   **Transition Out:** The scroll loops back to Section 1 or settles.
*   **Citations & Inspiration Log:**
    *   `11-confessional-misdirection-loop.md`: Inspires the first-person quote from Ellen Søhoel (e.g., *"We were told Dubai only cared about the render. That execution was secondary. We chose to prove them wrong."*) paired with subtle visual micro-jitters.
    *   `18-first-person-confessional.md`: Inspires the SVG drawing of the founder's personal sketches that executes dynamically upon reaching the scroll bottom.
    *   `site-18-estates.md`: Recited for the "Bento Decompression Grid" and "Invisible UI Framing" that finishes the layout, removing all boxes and input borders.
    *   `site-15-ibex.md`: Recited for the slow-moving, jewel-toned dust-mote particle field that occupies the empty spaces of the room.
    *   `site-09-joby.md`: Recited for its B2B credibility ladder ending in an aspirational, long-term brand vision.

---

## CITATION & INSPIRATION INDEX

The following index logs the precise integration of all 54 reference files (30 design-audit sites and 24 storytelling mechanics) across the storyboard.

| File ID | File Name | Section(s) | Specific Concept & Integration |
| :--- | :--- | :--- | :--- |
| **site-01** | `site-01-oryzo.md` | Section 2 | Overflow mask reveals and scrollbar-timeline typography slide-up transitions. |
| **site-02** | `site-02-montfort.md` | Section 1 | Volumetric cloud plates and camera wipes to control contrast. |
| **site-03** | `site-03-main.md` | Section 1 | Continuous WebGL canvas stage with vertical progress rail and overlays. |
| **site-04** | `site-04-vase-shop.md` | Section 5 | Horizontal curtain-reveal splits and organic brush-stroke masking. |
| **site-05** | `site-05-cartier.md` | Section 3 | Spotlights, shadows, and color temperatures (gold/amber) to define boundaries. |
| **site-06** | `site-06-elva.md` | Section 2 | Fixed center viewport stage with billboard typography and high-contrast void. |
| **site-07** | `site-07-springs.md` | Section 3 | Overlapping lookbook grids and offset parallax speeds. |
| **site-08** | `site-08-art-here.md` | Section 4 | "Multiverse" pacing, alternating between flat text cards and 3D rooms. |
| **site-09** | `site-09-joby.md` | Section 2, 7 | Aspirational B2B credibility hook sequence and long-term ecosystem vision. |
| **site-10** | `site-10-obsidian.md` | Section 5 | FLIP layout-morphing and technical museum catalog tags. |
| **site-11** | `site-11-poly.md` | Section 5 | Skeuomorphic architect desk where physical paper blueprints extrude into 3D meshes. |
| **site-12** | `site-12-pioneer.md` | Section 4 | Point-cloud particle coordinate morphs from landscape to building. |
| **site-13** | `site-13-stringtune.md` | Section 2 | Outlined typography backgrounds and snappy kinetic velocity curves. |
| **site-14** | `site-14-terminal.md` | Section 4 | WebP frame sequence scrub playhead with heavy scroll inertia. |
| **site-15** | `site-15-ibex.md` | Section 3, 7 | Room-by-room color thresholds and slow-moving dust-mote particle field. |
| **site-16** | `site-16-croptab.md` | Section 2 | Center-aligned layout with 3D elements floating over a giant back logo. |
| **site-17** | `site-17-igloo.md` | Section 1 | "HUD Frame Overlay" containing crosshairs, coordinates, and brackets. |
| **site-18** | `site-18-estates.md` | Section 3, 7 | Stacked media panels with drop shadows and "Invisible UI Framing." |
| **site-19** | `site-19-nomada.md` | Section 6 | Composite layouts where DOM cards slide over a desaturated 3D canvas. |
| **site-20** | `site-20-cartier.md` | Section 5 | Diorama chamber procession panning the camera through building craftsmen. |
| **site-21** | `site-21-tidescape.md` | Section 6 | Anti-pattern guide: avoided uniform fade-up presets and loose margins. |
| **site-22** | `site-22-tea.md` | Section 1 | Meditative, sequential arrival of elements to control scroll speed. |
| **site-23** | `site-23-hool.md` | Section 3 | Low-amplitude ambient drift of surrounding foliage around typography layers. |
| **site-24** | `site-24-helios.md` | Section 4 | Generative WebGL simulation coordinate morphs on Z-axis scroll depth. |
| **site-25** | `site-25-indigo.md` | Section 2 | Elastic, bouncy GSAP curves and semicircular fanning transform origins. |
| **site-26** | `site-26-goldhive.md` | Section 4 | "2D-to-3D Breakout Illusion" where sketch lines lift off to form a 3D model. |
| **site-27** | `site-27-setby.md` | Section 4 | Vertices vector projection lines drawing from 3D models to HTML boxes. |
| **site-28** | `site-28-calmm.md` | Section 3 | Layered 2.5D "Depth Sandwich" diorama with foreground camera blurs. |
| **site-29** | `site-29-lounge-coffee.md` | Section 1 | Preloader split transition where a center-split path reveals the page. |
| **site-30** | `site-30-nauta.md` | Section 5 | Product-register split layout and dynamic JavaScript number updates. |
| **mech-01** | `01-inertial-disorientation.md` | Section 1 | High-velocity camera entry stabilizing into interactive alignment. |
| **mech-02** | `02-urgency-calibration.md` | Section 1 | Choking scroll speed to build focus and temporal tension. |
| **mech-03** | `03-typographical-reality-framing.md` | Section 5 | Bounding boxes restricting a WebGL canvas to mimic structural drawing sheets. |
| **mech-04** | `04-ontological-interface-disruption.md` | Section 2 | Projecting HTML into 3D space and dissolving it with simplex shaders. |
| **mech-05** | `05-second-person-spatial-proximity.md` | Section 3 | Poetic second-person copy combined with a 100mm focal depth. |
| **mech-06** | `06-architectural-scale-implication.md` | Section 4 | Monolithic column grids receding into a volumetric fog. |
| **mech-07** | `07-cognitive-dissonance-programmed-unseeing.md` | Section 5 | Stencil buffer reveal showing completed photography over unbuilt wireframes. |
| **mech-08** | `08-triple-helix-temporal-fracture.md` | Section 6 | Asymmetric column tracks scrolling at different speeds and syncing up. |
| **mech-09** | `09-slow-burn-atmospheric-poisoning.md` | Section 4 | Materials degrading/changing from synthetic chrome to concrete on scroll. |
| **mech-10** | `10-chorus-cascade-narrative-fragmentation.md` | Section 2 | Fragmented text blocks floating in 3D that scroll past the camera lens. |
| **mech-11** | `11-confessional-misdirection-loop.md` | Section 7 | First-person copy from the founder paired with subtle visual jitters. |
| **mech-12** | `12-dignified-evasion-architecture.md` | Section 2 | Strict typographic withholding where punctuation fades in with a delay. |
| **mech-13** | `13-compression-cascade-syntax.md` | Section 4 | Narrowing grid layout padding to simulate masterplan density. |
| **mech-14** | `14-abrupt-reality-fracture.md` | Section 5 | Camera dollies back aggressively from close detail to macro tower. |
| **mech-15** | `15-linguistic-defamiliarization.md` | Section 3 | Raw geological taxonomy and slow-moving dust particle fields. |
| **mech-16** | `16-nested-narrative-layering.md` | Section 6 | Camera pushes through door portals to navigate sub-levels. |
| **mech-17** | `17-identity-amnesia-onboarding.md` | Section 1 | Prompt gate asking user to select their raw material to load the site. |
| **mech-18** | `18-first-person-confessional.md` | Section 7 | SVG drawing of the founder's initial concept sketches. |
| **mech-19** | `19-voided-protagonist.md` | Section 3 | Center columns splitting to frame the empty void of the desert landscape. |
| **mech-20** | `20-bloodied-in-media-res.md` | Section 5 | Pushing the user directly into raw on-site construction footage. |
| **mech-21** | `21-nested-narrative-labyrinth.md` | Section 6 | Continuous copper line weaving and connecting project cards. |
| **mech-22** | `22-ritualized-paranoid-monologue.md` | Section 5 | Interactive 3D rotary dial menu requiring user drag to progress phases. |
| **mech-23** | `23-intimate-confessional-voice.md` | Section 5 | Hard-hitting corporate facts regarding Gulf region inspections. |
| **mech-24** | `24-casual-glossary-immersion.md` | Section 6 | Navigation links shifting from general tags to technical milestones. |
