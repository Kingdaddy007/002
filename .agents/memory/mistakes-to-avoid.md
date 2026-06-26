# Mistakes to Avoid

## Session: 2026-06-22

### M1 — AI Prospect Research Without Manual Verification
**What happened:** The teamwork_preview subagent returned 3 leads. 2 of the 3 (Stephen Falcke, Donald Nxumalo) failed real-world manual verification. Instagram accounts were inactive; one lead had not posted since September 2025.
**Root cause:** AI research generates plausible-pattern matches from cached Google index data. It cannot confirm that an Instagram account is *currently* active and high-quality.
**Fix going forward:** After any AI prospect research run, ALWAYS manually check each lead's Instagram before investing any brand or concept work. The verification step is non-negotiable.

### M2 — Confusing Lead Numbering in Reports
**What happened:** The teamwork agent returned leads in one order. Anti-Gravity re-sorted them by score and presented them in a different order. User and agent referred to "Lead 1", "Lead 2", "Lead 3" with different mental maps, causing confusion about which lead was the actual target.
**Fix going forward:** When presenting prospect results, always keep the same order as the original report OR explicitly relabel and confirm with the user before referencing by number.

### M3 — Wrong Target Identified After User Correction
**What happened:** After user said the "second lead" was the good one, Anti-Gravity incorrectly identified Stephen Falcke as the target and began diagnosis work on the wrong person.
**Fix going forward:** When user references a lead by number, trace it back explicitly to the name before proceeding. Confirm: "You mean XBD Collective, correct?" Do not assume.

### M4 — Do Not Over-Rely on AI Research for Live Social Data
**What happened:** AI research for Instagram activity, follower quality, and post recency is unreliable without a live browser session.
**Fix going forward:** For Instagram research, use Chrome DevTools MCP (live browser) or user-provided screen recordings. Do not trust AI-generated Instagram activity data without real-time verification.

## Session: 2026-06-25

### M5 — Morphing Between Geometrically Discrepant Paths
**What happened:** Morphing between a generic horizontal infinity sign and the custom, asymmetric XBD monogram caused a visual jump/"zoom back" effect during the transition.
**Fix going forward:** Build visual drawings using trace segments matching the final path coordinates exactly. Do not morph from mismatched geometric placeholders.

### M6 — WebGL Canvas Covering Lower Z-index Elements
**What happened:** Setting target glass elements' z-indices lower than the maximum z-index of other target elements causes the WebGL canvas (rendered globally at `maxZ - 1`) to cover and obscure their content/text completely.
**Fix going forward:** Ensure all WebGL glass lens elements have the same high z-index stacking context (e.g. `z-index: 1000`) and structure their inner text wrappers at a higher relative index (e.g. `z-index: 5` within the container).

### M7 — Browser Caching on Local Server Development
**What happened:** Running `http-server` with default caching (3600 seconds) causes the browser to stubbornly load old stylesheets, images, and HTML, masking layout edits.
**Fix going forward:** Always run the development server with caching disabled (`-c-1`) and use query parameter versions (e.g. `style.css?v=2`) to bust browser cache when changing styles.


