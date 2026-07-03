[P1] Issue: 5 simultaneous autoplaying videos causing high CPU/GPU load | Location: src/components/VideoHero.tsx | Fix: Implement active scene video playback control
[P1] Issue: Contrast failure on muted text (3.38:1 contrast) | Location: src/app/globals.css | Fix: Darken --color-xbd-muted to #706A60
[P1] Issue: Contrast failure on eyebrow text (3.89:1 contrast) | Location: src/components/PhilosophyBridge.tsx | Fix: Increase text opacity to text-xbd-text/80
[P1] Issue: Preloader is inaccessible to keyboard navigation | Location: src/components/Preloader.tsx | Fix: Convert scroll cue to focusable button with click handler
[P1] Issue: Brittle header visibility logic using vh calculations | Location: src/components/Header.tsx | Fix: Refactor to GSAP ScrollTrigger class toggles
[P1] Issue: HTML semantic hierarchy violation (H1 in Footer, H2 in Hero) | Location: src/components/ConciergeSection.tsx & src/components/VideoHero.tsx | Fix: Set scene-1 title as H1, change footer title to div
[P2] Issue: Unoptimized images bypassing Next.js optimization | Location: src/components/DisciplinesSection.tsx | Fix: Remove unoptimized={true} from image tags
[P2] Issue: Hard-coded colors bypassing theme tokens (#EAE5DF and #1A1A1A) | Location: src/components/DisciplinesSection.tsx, src/components/ConciergeSection.tsx | Fix: Map to theme variables var(--color-xbd-placeholder) and var(--color-xbd-dark-surface)
[P2] Issue: Missing focus outlines on interactive elements | Location: src/components/Header.tsx, src/components/Preloader.tsx | Fix: Add outline-none focus-visible:ring-1 classes
[P2] Issue: Form input text fields lack clear native focus styling | Location: src/components/ConciergeSection.tsx | Fix: Adjust underline border color on focus
[P3] Issue: Copy posture leaks vendor tone ("Request Consultation") | Location: src/components/ConciergeSection.tsx | Fix: Change button text to "Submit Project for Studio Intake"
[P3] Issue: Form intake lacks budget and constraint diagnostic filters | Location: src/components/ConciergeSection.tsx | Fix: Refactor form to include Budget and Primary Constraint fields
[P3] Issue: Proof Section caption reveal lacks cinematic pacing | Location: src/components/ProofSection.tsx | Fix: Implement staggered line transition for title and description
[P3] Issue: Missing Satoshi font-sans theme mapping | Location: src/app/globals.css | Fix: Redefine --font-sans to Satoshi to resolve fallback issues
