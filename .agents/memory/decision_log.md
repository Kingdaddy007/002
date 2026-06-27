# Architecture Decision: Move to Next.js

## Context
In the `greeting-message-initialization` branch, the 3-pane Triptych hero section was built using Vanilla HTML, CSS, and JS (with GSAP).
A severe bug occurred where GSAP's `ScrollTrigger` with `pin: true` would permanently freeze the scroll at the very top of the page. Despite multiple deep debugging attempts (removing liquidGL, adding 1px spacers, using `normalizeScroll(true)`), the native scroll hijack persisted.

## Decision
The user directed a complete migration to the `add-hello-world-feature` branch, which is a Next.js / React / Tailwind / GSAP / Lenis stack.

## Tradeoffs
Vanilla was providing too much unmanaged conflict. Next.js enforces component boundaries and utilizes Lenis which bypasses the native browser scroll-locking bugs entirely.

## Directives for Next Session
1. **DO NOT** attempt to fix the vanilla HTML version anymore.
2. Checkout `add-hello-world-feature`.
3. Build the `<TriptychHero />` component using `@gsap/react` `useGSAP` hook.
