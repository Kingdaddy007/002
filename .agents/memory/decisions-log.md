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


## Session: 2026-06-24
- **Workflow Paradigm:** We abandoned the 'give 3 predefined options' paradigm. The user explicitly requires co-creation on the fly. The next agent must code/build components directly and iterate with the user visually.
- **Hero & Opening Sequence:** We are rejecting the standard 'Reality Maker' wipe or standard architectural zoom. The user wants to invent a vastly superior, custom opening sequence combining the Entry and Hero section.
- **Copywriting Primacy:** The next agent MUST deeply analyze the copywriting and positioning of the references (AIR, Haven, Zorgen, Normal is Boring), not just their layout. Copywriting is the missing key.
- **Technical Progress:** 
  - The targeted_scrape.js script is running to extract high-res images from xbdesign.com. 
  - A Next.js app has been initialized in web/ with GSAP and Tailwind, ready for the next agent to use for live iteration.
  - The site structure (contexts/spatial-story.md) is LOCKED.

## Session: 2026-06-25
- **WWP Structural Alignment:** Locked the 6-section Information Architecture for the one-page pitch, strictly aligned with Blair Enns's "Win Without Pitching" (WWP) framework.
- **Removed Defensive Vendor Traps:** Replaced the proposed "Render vs Reality" section with "The Methodology" (Process Proof). Defending the ability to build is a vendor posture; explaining the control of scale is a practitioner posture.
- **Hero Lock:** Selected Concept 2 (The Continuous Push / Macro to Micro) as the Hero event to establish massive architectural scale instantly.

## 2026-06-25 - Hero Transition Pivot
* **Decision:** Used Staggered Vertical Columns (via GSAP and mask-image) for the Hero transition instead of Radial/Z-Axis wipes to maintain architectural structural aesthetic.
