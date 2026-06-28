# Architectural & Branding Decisions

- **Brand Positioning Thesis:** Adopted the "Reality-Makers" positioning to solve XBD's "Perception Gap". The website must act as a physical volume, not a digital brochure.
- **Structural Choice:** Locked in a 7-Room Cinematic Scroll Storyboard generated via the Teamwork Multi-Agent System.
- **Section 1 Strategy:** "The Foyer Reset". Using absolute darkness, a warm champagne monogram, and a tactile material selection (`[Stone] [Steel] [Wood]`) to ground the brand in physical matter before showing portfolio renders.
- **Section 1 Preloader Execution:** Locked in the "Z-Axis Push" transition (slowed to 2.8s) for a physical portal feel instead of sliding doors/curtains. Replaced literal invitation copy with an interaction-driven structural UI `[ ENTER ]` button featuring a precise mechanical hover squeeze. Rebuilt the logo from an image to a full HTML/CSS composite.
- **Section 1 & 2 Final Polish:** Completed the Typographic Curtain (Section 2) sequence. Reverted background to fluid videos pending final Midjourney asset generation. 
- **Scroll Management:** Enforced strict scroll-locking during the preloader using `overflow: hidden`, `window.scrollTo(0,0)`, and `history.scrollRestoration = 'manual'` to prevent the browser from skipping the cinematic opening on refresh.
