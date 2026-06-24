# Reference Analysis: Haven
**Source:** Gemini Video transcript — luxury residential home builder
**Relevance:** Second reference for XBD Collective pitch concept
**Status:** To be assimilated alongside ZORGEN analysis and remaining transcripts

---

## What Kind of Site Is This?

Haven is a luxury custom home builder. "A Haven home is more than bricks and mortar. It's crafted, personal and shaped around you." B2C, premium residential, selling the experience of having a home designed *for you specifically*.

Closer in spirit to XBD than ZORGEN was — because Haven is selling a personal design relationship, not apartment units in a tower. The emotional register overlaps with the UHNWI private client we are targeting for XBD.

---

## What This Site Does — Section by Section

### The Preloader
- Solid royal blue screen — brand colour fills everything first
- Small white abstract logo appears in centre
- Blue screen **wipes upward** — like a curtain being lifted — to reveal the site beneath
- Contrast to ZORGEN: rectangle expanded outward. Haven lifts upward. The direction of the reveal carries meaning.

### The Hero — Typography Before Everything
- NO images visible in the first frame. None.
- The bottom half of the viewport is entirely the word **"HAVEN"** — massive, spanning the full screen width (likely `20–25vw`)
- Top right: small caption text. Top left: logo. Top right corner: "Let's Talk."
- The page sits completely still after the preloader. Nothing moves. It demands that the user make the first move.

**This is a philosophical stance, not just a design choice.** The brand name carries the entire first impression. The work has not been shown yet. The brand earns the right to show the work.

### The Signature Move — Video Takeover on Scroll
This is the most important technique on this site. The sequence:

1. User begins to scroll
2. "HAVEN" text moves upward slowly — parallax, slower than scroll speed
3. A video container slides UP from behind the text/white area
4. Video expands and scales to `100vw` × `100vh` — covering the "HAVEN" text entirely
5. Full-screen cinematic video now owns the viewport

The text was the frame. The scroll pulled the curtain up to reveal the work behind it.

**The result:** The visitor earns the imagery through interaction. It is not given to them immediately. When it arrives, it lands harder because they caused it.

### Pinned Image Sequence — "Bespoke / Luxury"
- A central media container pinned in the middle of the viewport
- The words "Bespoke" and "Luxury" appear on the far left and far right
- As the user scrolls, these words **move inward** toward the central image from both sides — slow, deliberate
- Simultaneously, the image inside the container scrubs through different images (mapped precisely to scroll position)
- Result: text and image breathe toward each other. The words frame the visual. The visual changes as the framing tightens.

### Asymmetric Parallax Image Grid
- Multiple project images arranged asymmetrically with massive white space between them
- **Each image moves at a different vertical speed** — some faster than scroll, some slower
- Creates a profound 2.5D depth effect — the grid feels like a physical space you're moving through, not a flat layout
- No two images are at the same visual depth at any moment
- Aspect ratios vary intentionally: some wide, some tall portrait

### Awards Section
- Minimalist list/table structure — no logo wall
- Thin divider lines animate from `0%` to `100%` width as they enter the viewport
- Text fades in and slides up subtly
- Clean, confident, authoritative without being declarative

### Footer — Colour Reversal
- The entire footer is the brand's blue — solid, full bleed
- Massive white "HAVEN" text at the bottom mirrors the hero
- The blue footer **slides up over** the previous white section — not a scroll-into, a takeover
- "Recently completed" project thumbnail with hover arrow — quiet, confident CTA
- The site ends the same way it began: brand colour. Brand name. Full stop.

---

## Section Transitions — The Key Difference from ZORGEN

ZORGEN used hard cuts (white to black, black to white) bridged by overlapping elements.

Haven uses **z-index layering**. New sections physically slide *over* the previous section. No cuts. No fades. A continuous physical stacking — like sheets of material being laid on top of each other.

This creates a fundamentally different feeling. ZORGEN feels like watching a film with deliberate scene changes. Haven feels like moving through a physical object — pulling layers apart, moving between them.

**For XBD:** The z-index layering approach is more appropriate. The brand diagnostic calls for "room sequence" — the feeling of moving through connected spaces. Sections sliding over each other is spatial. Hard cuts are editorial.

---

## Asset Quality Assessment
- Rating: 10/10
- Ratio: **60% Assets / 40% Code** — slightly more balanced than ZORGEN's 70/30
- The code technique (hero video takeover, image sequence scrubbing) is more distinctive here — it contributes more independently to the impression
- But asset quality remains non-negotiable: if the video footage or photography is mediocre, the hero technique reveals nothing worth waiting for

---

## Technical Stack Confirmed
Same as ZORGEN: GSAP + ScrollTrigger + Lenis/Locomotive Scroll. The pattern is now confirmed across two independent sites.

---

## What Is Directly Applicable to XBD

### ✅ Take These

**1. Typography-First Hero Concept.**

This is the most important discovery from this transcript.

Haven opens with the brand name — not an image. The text IS the hero. The work arrives as a reward through scroll.

For XBD, this creates a powerful alternative to opening with Solar House immediately. What if the first frame is a spatial statement — one line of text at enormous scale — and Solar House reveals itself from behind it as you scroll? The sequence becomes:

> The brand states itself → The work proves it.

This maps perfectly to the "Reality-Makers" positioning. You say who you are first. Then you show it.

**Copywriting implication:** Whatever text appears in that first frame matters enormously. It cannot be "XBD Collective" — a name means nothing to someone who just arrived. It needs to be a statement that creates a feeling before the image confirms it. This is a copywriting decision not yet made.

**2. The Z-Index Section Layering.**

Sections sliding over each other instead of cutting. This is the right transition method for XBD's "room sequence" concept. It is physically spatial. You move through the site the way you move through a sequence of connected rooms.

**3. The Inward-Moving Text Around a Central Image.**

Words approaching an image from both sides as you scroll. For XBD, this could frame the tension between their two worlds:
- "ARCHITECTURE" slides in from the left
- "INTERIORS" slides in from the right
- They converge around a project image that bridges both disciplines
- The brand language "from the structural frame to the final object" — made visible as motion

**4. The Asymmetric Parallax Image Grid.**

Every image at a different scroll speed. Massive white space between them. This section would replace the idea of a "filmstrip" or gallery. It is more dignified. Each image gets visual silence around it. The depth effect makes the collection feel like a curated environment, not a portfolio page.

**5. The Footer as Mirror of the Hero.**

The site ends the same way it begins — brand colour, brand name. For XBD: whatever the opening statement is, the footer echoes it or completes it. The site becomes a closed loop. The visitor arrives at a feeling and leaves confirmed in it.

---

## What Does NOT Fit XBD

| Haven Element | Why It Doesn't Transfer |
|:---|:---|
| Royal blue (`#0A369D`) colour scheme | Completely wrong for XBD. Cold, corporate, tech-adjacent. XBD needs warm limestone. |
| Literal "brand name as hero" typography | "Haven" is a single evocative word. "XBD Collective" is a studio name — different visual weight, different emotional function. This technique requires the right text, not just any text. |
| Construction/collaboration video montage | Wrong register. XBD does not show the process of building in a documentary way. They show finished spaces. The video must be of the space, not of the making of the space. |
| Video testimonials section | Too residential/consumer. Wrong format for a global architecture studio. |
| The "Let's Talk" CTA in the nav | Slightly too casual for XBD's selective inquiry posture. But the positioning (minimal, top right) is right. |

---

## Critical Questions This Transcript Raises for XBD

**1. Do we have video footage of any XBD project?**

The hero video takeover technique — the most powerful move on this site — requires real cinematic video. Still photography cannot do what this technique does. If we only have photography of Solar House, we have two options:
- Use an AI tool (Runway, Seedance, Higgsfield) to generate a slow cinematic pan/zoom from the still photography
- Choose a different hero technique that works with stills (the layered parallax from ZORGEN)

This is a decision point. It cannot be answered with text alone — it needs to be tested with the actual assets.

**2. What is the text that appears before Solar House?**

If we use the typography-first approach, the statement in that first frame defines everything that follows. It must:
- Create a feeling before the image confirms it
- Not be the studio name alone
- Be specific enough to be credible, broad enough to apply to all their work
- Sound like it came from Ellen Søhoel, not from a marketing brief

This is the most important copywriting decision in the entire pitch page. It is not yet made.

**3. Does Haven's approach (typography first, work second) match XBD's brand posture better than ZORGEN's approach (image first, immediately)?**

My read: Yes. And here is why.

ZORGEN's approach says: "The work speaks for itself. Enter and feel it."

Haven's approach says: "The brand speaks first. Then the work confirms it."

XBD's positioning as Reality-Makers — a studio with a specific philosophy about execution vs. concept — aligns with the brand-first approach. They are not just showing beautiful spaces. They are making a claim about how they work and what they believe. The typography-first hero can carry that claim before a single image appears.

---

## Pattern Emerging Across Two Transcripts

After two reference sites, a consistent architecture is forming:

| Element | Both Sites Agree |
|:---|:---|
| Preloader | Brand mark appears. Site opens around it. |
| First frame | Brand asserts itself (text or brand colour) before work is shown |
| Imagery | Revealed through scroll, not presented immediately |
| All motion | Scroll-scrubbed via GSAP + ScrollTrigger |
| Image entry | Earned — clip-path, z-index reveal, or video takeover |
| Section transitions | Layers, not cuts (or cuts bridged by overlapping elements) |
| Typography | Extreme scale contrast — nothing in the middle |
| Asset quality | 60–70% of the final impression. Non-negotiable prerequisite. |
| Tech stack | GSAP + ScrollTrigger + Lenis. This is the confirmed standard. |

**What the pattern tells us:** The premium standard is not a visual style — it is a philosophy. The visitor earns the experience through interaction. Nothing is given for free. The brand comes before the work. The work arrives as proof.

---

*Transcript 2 of [N]. Two more transcripts expected. Full concept synthesis to follow after all transcripts received.*
