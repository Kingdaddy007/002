[P1] Issue: Hard-coded colors bypassing theme tokens | Location: All components (bg-[#181615], text-[#E5E0DA]) | Fix: Replace arbitrary values with bg-xbd-bg, text-xbd-text
[P1] Issue: Missing image optimization and lazy loading | Location: DisciplinesSection.tsx | Fix: Use Next.js <Image> component or add loading="lazy"
[P1] Issue: Low contrast on eyebrow text | Location: PhilosophyBridge.tsx, DisciplinesSection.tsx (text-[#E5E0DA]/40) | Fix: Increase opacity to at least 60% for WCAG AA compliance
[P2] Issue: 5 simultaneous videos may impact performance | Location: VideoHero.tsx | Fix: Implement intersection observer to pause off-screen videos
[P2] Issue: Missing accessible labels on interactive elements | Location: Header.tsx, ConciergeSection.tsx | Fix: Add aria-label to buttons and ensure focus states exist
