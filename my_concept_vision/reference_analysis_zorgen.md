# Reference Analysis: ZORGEN Nº9
**Source:** Gemini Video transcript — luxury residential real estate development site
**Relevance:** First reference for XBD Collective pitch concept
**Status:** To be assimilated alongside other transcripts and second AI's analysis

---

## What Kind of Site Is This?

ZORGEN Nº9 is a luxury apartment development website. It is selling units in a high-end residential building to wealthy buyers. It is B2C, aspirational, sales-oriented.

XBD is a design studio establishing authority with developers and UHNWI individuals. Different purpose, different register. **We can steal the techniques but not the feeling.**

---

## What This Site Does — Section by Section

### The Preloader
- Pitch black screen
- Thin white rectangular outline, dead center
- Brand name + tagline appear inside
- Rectangle **expands outward**, masking the black to reveal the hero
- Result: the brand asserts itself before any image is shown. The visitor waits for the site to allow them in.

### The Hero — Layered 3D Parallax
The most important technique on this site. The hero image is **not a single flat image**. It is split into layers:
- Layer 1 (back): Background sky — JPG
- Layer 2 (middle): Giant outlined/stroke text — graphic element, not readable text
- Layer 3 (front): Foreground buildings — transparent PNG

All three layers move at different scroll speeds. As you scroll, the text passes *behind* buildings but *in front* of the sky. This creates the illusion of real spatial depth from still images.

**This is not a video. It is engineered from still layers.**

### Clip-Path Image Reveals — Their Signature Move
Images do not fade in. They are **unmasked from the bottom up** as they enter the viewport.

Technical detail:
- Outer container moves up on scroll
- Inner image is scaled at 1.2 and scales down to 1.0 simultaneously
- Duration: 0.8s–1.2s
- Easing: `power3.out` (fast start, glides to smooth stop)
- Result: feels heavy, deliberate, luxurious

Every photo on the site enters this way. It becomes a rhythm the visitor internalises.

### Materials Collage
- Physical material samples (marble, gold, dark stone, wood) floating as independent elements
- Each material moves at a different scroll speed independently
- One moves up faster, another shifts slightly sideways
- Creates a pseudo-3D floating effect driven entirely by scroll position
- No grid. No alignment. Deliberate beautiful disorder.

### Horizontal Scroll Gallery
- Section pins to viewport
- Vertical scrolling is translated into horizontal track movement
- Images inside the track move slightly rightward while the track moves left — window-pane parallax effect
- Background: pitch black for this section only
- Custom magnetic circular cursor replaces default cursor

### Pinned Sequential Slider
- Entire section locks to viewport
- Left side: animated content (clock, section title) updates
- Right side: images crossfade/slide sequentially
- Once sequence completes, section unpins and normal scroll resumes
- Effective for: sequential storytelling through time or through stages of a space

### Section Transitions
- Hard cuts between pure white and pure black — no gradients, no fades
- **Bridged by overlapping elements**: an image from the white section bleeds into the black section, pulling the eye across the boundary
- Creates rhythm and drama without feeling jarring

---

## The Most Important Insight: 70/30

> A developer could perfectly replicate the code, but without these specific, ultra-high-resolution, perfectly colour-graded assets, the site would look completely different.

**70% is the assets. 30% is the code.**

This changes the priority order for the XBD pitch:
1. Asset quality comes first — highest resolution Solar House photography available
2. Upscaling is not optional — it is a prerequisite
3. The layered parallax hero requires the image to be split into layers — this is design/Photoshop work before any code is written
4. The clip-path reveal technique will fail with low-resolution or poorly graded images

---

## Technical Stack Confirmed
- GSAP + ScrollTrigger (scroll-scrubbing, pinning, timeline orchestration)
- Lenis or Locomotive Scroll (smooth scroll interpolation)
- React/Next.js or Vue/Nuxt.js
- Complexity: 8.5/10 — individual animations are standard GSAP, but the parallax layer tuning requires human trial and error

---

## Global Design Patterns
| Element | ZORGEN Nº9 Approach |
|:---|:---|
| Colour | Pure white (#fff) · Pure black (#000) · Charcoal (#111) — accent only in photography |
| Typography | 120px+ display headings · 12-14px tiny tracked body · extreme scale contrast, no middle ground |
| Corners | 0px border radius everywhere — razor sharp, architectural |
| Motion philosophy | Scroll-dependent. Almost nothing animates on its own. |
| Easing signature | `power3.out` / `expo.out` — fast start, glides to stop |

---

## What Is Directly Applicable to XBD

### ✅ Take These

**1. The preloader concept.**
The white rectangle expanding to reveal the hero — adapted for XBD as the ∞ infinity mark that appears first, then the site opens around it. The brand asserts itself before the work is shown.

**2. The layered parallax hero.**
Solar House at night is a strong candidate for layer separation:
- Background layer: Night sky above Emirates Hills
- Midground layer: The main building volume
- Foreground layer: The pool terrace and glass edge detail

This would require Photoshop/AI work to isolate layers from the existing photography. But if done, the scroll depth this creates would be unlike anything in their current slider.

**3. The clip-path image reveal.**
This is the technique we use for every image entry across the pitch page. Images are not seen immediately — they are earned by the scroll. The 0.8s–1.2s duration with `power3.out` easing is the exact weight a luxury architecture site needs.

**4. The materials collage.**
XBD's taste world is defined by travertine, marble, brushed brass, smoked oak. A section showing physical material samples floating independently with different scroll speeds would be deeply aligned with the brand. It is also something their current website has never done.

**5. The typography contrast.**
Massive display heading + tiny tracked body. This maps directly to what we already specified in the brand diagnostic: Canela/Freight Display lineage at scale, quiet sans-serif for technical data. ZORGEN confirms this approach works at the luxury register.

**6. The pinned sequential section.**
Could be powerful for showing a project narrative: exterior establishing shot → interior space → material detail → atmosphere. The left panel could hold a brief project statement while the right panel moves through the photography sequence. This replaces the "case study" idea with something that feels spatial.

---

## What Does NOT Fit XBD

| ZORGEN Element | Why It Doesn't Transfer |
|:---|:---|
| Floor plan interactive applet | That's for apartment sales. XBD is a studio, not a developer. |
| "Day in the Life" clock concept | Too residential-development specific. |
| Studio/1BR/2BR navigation | Apartment product, not a design studio portfolio. |
| Pure white + pure black palette | ZORGEN uses cold stark contrast because it's selling bold architectural product. XBD's palette is warmer — limestone white (#F2EDE6), charcoal (#1C1C1C). The warmth is brand-accurate and cannot be sacrificed for visual boldness. |
| Custom cursor with "VIEW >" text | Could work, but needs to be evaluated. Might feel too playful against the "Reality-Makers" positioning. |

---

## The Key Difference in Register

ZORGEN says: *"Imagine living here. Here is the lifestyle."*

XBD needs to say: *"These people understand spaces at a level most firms never reach."*

ZORGEN is aspirational and inviting. XBD should feel like walking into the antechamber of a great building — serious before you fully understand it.

The techniques are tools. The feeling must come from the brand.

---

## Questions This Transcript Raises for XBD

1. **Can Solar House be split into layers?** The layered parallax hero is only possible if the photography can be separated. This needs to be tested in Photoshop or with AI masking tools before we commit to it as the hero technique.

2. **Do we have enough material photography?** The materials collage section requires macro-detail shots of physical materials. Does XBD's Instagram or website contain close-up material shots (marble veining, brass edge, oak grain)? If not, can AI-generated material textures serve as stand-ins for the pitch?

3. **Does the horizontal gallery fit?** It works for ZORGEN because they're showing apartment lifestyle imagery as a gallery. For XBD, this section would need to show project photography with intent — not as a gallery but as a curated sequence. Whether it earns its place depends on what images we have.

---

*Transcript 1 of [N]. More transcripts to follow before concept is finalised.*
