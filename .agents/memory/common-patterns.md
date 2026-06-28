# Common Patterns & Conventions

- **Storyboard-Driven Execution:** Always reference `scroll_storyboard.md` for section structure and mechanic citations.
- **Color Palette:** Dark Mode base (`#121212` charcoal, `#D4C5B3` warm champagne). Light Mode base (`#F2EDE6` warm sand/cream).
- **Typography:** Display serif (Canela) paired with clinical geometric sans-serif (Space Grotesk).
- **Interaction as Invitation:** Replace literal CTA text with mechanical, high-tension interactive elements (e.g., the wide-bracket squeeze on hover).
- **Composite Branding:** Use raw text layered with SVGs/images rather than flat logo PNGs to allow for precise tracking (`tracking-[0.4em]`) and rendering sharpness at scale.
- **Scroll-Locking Preloaders:** Always use a combination of `window.scrollTo(0,0)`, `history.scrollRestoration = 'manual'`, and `document.body.style.overflow = "hidden"` for fixed full-screen intro sequences to ensure they always play from the top, even on refresh. Remember to dynamically set `pointer-events: none` on the container after the sequence finishes.
