# CSS & Tailwind Layout Lessons

## 1. The "Invisible Element" Trap (Zero-Dimension Collapse)
**Context:** When an element with a background image or color is unexpectedly invisible, do NOT blindly assume it is a `z-index`, `opacity`, or file path issue. 
**The Bug:** Combining `inset` constraints (e.g., `inset-[-15%]`) with explicit percentage dimensions (`w-[130%] h-[130%]`) on absolute positioned elements can cause the browser layout engine to collapse the element to `0px x 0px`.
**The Fix:** Use explicit directional offsets (`-top-[15%] -left-[15%]`) when defining explicit dimensions (`w-[130%] h-[130%]`).

## 2. Mandatory CSS Debugging Protocol
Before attempting to fix a "missing" or "invisible" DOM element by guessing CSS classes:
1. **Stop Guessing.**
2. **Measure.** You MUST verify the element's actual computed dimensions. If browser DevTools are unavailable, write a short Puppeteer/Playwright script to dump the `offsetWidth`, `offsetHeight`, and `getComputedStyle` of the target element and its parents.
3. If `offsetWidth` or `offsetHeight` is 0, the issue is layout/sizing, NOT visibility or stacking context.
