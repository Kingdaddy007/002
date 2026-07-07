# Project: XBD Collective Website Codebase Audit

## Architecture
This project is a Next.js (App Router) website utilizing GSAP (GreenSock) for scroll-driven animations, Lenis for scroll smoothing, and Three.js/React Three Fiber (R3F) for WebGL components (e.g. Preloader, Curved Cinema Gallery).

The system consists of the following components:
- **Preloader**: WebGL simplex noise preloader threshold (`Preloader.tsx`).
- **Header & Navigation**: Responsive dynamic navigation (`Header.tsx`).
- **Video Hero**: Pinned scroll-scrubbed video grid with mask slicing (`VideoHero.tsx`).
- **Philosophy Bridge**: Typographical statement with split-text reveal (`PhilosophyBridge.tsx`).
- **Disciplines Section**: Parallax column section with hover clips (`DisciplinesSection.tsx`).
- **Curved Cinema Gallery**: WebGL 3D cylinder image viewer (`CurvedCinemaGallery.tsx`).
- **Team Section**: radial layout team reveal with rotation (`TeamSection.tsx`).
- **Proof Section**: Section demonstrating build proof (`ProofSection.tsx`).
- **Concierge Section**: Inquiry form and footer parallax (`ConciergeSection.tsx`).

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Workspace & Planning Setup | Initialize `.agents/orchestrator/` configuration files | None | DONE |
| M2 | Copywriting & Expert Positioning | Audit all user-facing text for brand positioning and copywriting quality | M1 | DONE |
| M3 | Performance & UI/UX Audit | Review GSAP animations, performance, asset preloading, and responsiveness breakpoints | M1 | DONE |
| M4 | Code Quality & Bug Hunt | Review codebase for memory leaks, TypeScript compilation types, and runtime bugs | M1 | DONE |
| M5 | Build & Integration Check | Run build compilation and check for errors | M4 | DONE |
| M6 | Report Synthesis | Compile all audits into `final_audit_report.md` | M2, M3, M5 | DONE |

## Interface Contracts
- **GSAP Registration**: GSAP must be registered via `GsapProvider.tsx` or globally before execution to prevent SSR hydration errors or layout thrashing.
- **Scroll Hijacking**: Lenis smooth scroll must integrate with GSAP ScrollTrigger via custom refresh/update cycles.
