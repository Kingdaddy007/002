# Mistakes & Anti-Patterns to Avoid

- **Anti-pattern:** Using generic 3D sliders, standard templates, or loose margins. 
- **Mistake:** Implementing UI mechanics simply because they "look cool" without a firm brand positioning backup. Every animation must serve the "Reality-Maker" spatial thesis.
- **Anti-pattern:** Uniform vertical fade-ups. We explicitly rejected this in favor of precise opposing vertical columns.
- **Mistake:** Using soft, theatrical animations like a "cotton/curtain split" for an architectural firm. Animations must feel structural, heavy, and use friction (e.g., Z-Axis push).
- **Mistake:** Using literal copywriting like "An invitation to experience..." when the interface interaction itself can serve as the invitation. Show, don't tell.
- **Performance Anti-Pattern:** Applying `filter: blur()` to DOM elements that are simultaneously undergoing massive `scale` transformations (e.g., `scale: 18`). This causes severe GPU thrashing and lag. Rely on pure opacity/scale fades instead.
- **Mistake:** Assuming placeholder images (e.g., `bg-1.webp`) were the final generated AI assets and replacing approved background videos with them without confirmation. Always verify that final assets are generated before executing structural file replacements.
