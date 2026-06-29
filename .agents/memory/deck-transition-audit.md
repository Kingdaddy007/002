# Deck Transition Audit — Mistakes and Lessons

## Date: 2026-06-29

### Bug: Empty `to({})` does NOT extend GSAP timeline duration
- **What happened:** The implementer used `masterTl.to({}, { duration: 1.5 }, startTime + 1.5)` to create a "hold" phase where text stays readable. This is a common GSAP misconception — a tween on an empty object `{}` does NOT actually extend the timeline's effective duration. GSAP requires real property changes on real targets to push the timeline's endTime.
- **Why it matters:** Without real duration, the roll-in (ending at `startTime + 1.5`) immediately transitioned into the roll-out (at `startTime + 3.0`), leaving only 1.5s of hold instead of the intended 2.5s. The user wouldn't have enough time to read the philosophy text.
- **Fix:** Removed the empty tween. The background parallax `fromTo` (duration: 6, starting at `startTime`) already stretches across the entire phase range. Pushed the roll-out start to `startTime + 4.0` to create 2.5s of genuine reading hold. The bg parallax tween is a real tween on a real DOM element, so it properly occupies timeline space.

### Safety: Always use `immediateRender: false` on competing tweens
- **What happened:** The implementer omitted `immediateRender: false` on the roll-out `.to()` tweens that target the same elements as earlier `.fromTo()` tweens.
- **Why it matters:** When GSAP creates a timeline, it may record initial values for all tweens at creation time. A roll-out `.to()` tween could record the "rolled-in" state before the roll-in `.fromTo()` has completed, creating subtle conflicts where GSAP tries to restore an incorrect initial state during reverse scrolling.
- **Fix:** Added `immediateRender: false` to both roll-out tweens.

### Selector scoping: Always query within containerRef
- **What happened:** The implementer used `gsap.utils.toArray(containerRef.current?.querySelectorAll(".cylinder-text") || [])` which is safe but loses TypeScript typing.
- **Fix:** Changed to a properly typed pattern with explicit null check.

### Architecture pattern (KEEP): forwardRef + useImperativeHandle for GSAP composition
- **Pattern:** Child components expose a `buildTimeline(tl, startTime)` function via `useImperativeHandle`. The parent composes all children's animations into a single master timeline with a single `pin: true`.
- **Why it works:** Eliminates the fundamental problem of sequential GSAP pin-spacers creating uncollapsible document flow gaps. Each component remains self-contained for its visual content while the parent controls scroll coordination.
