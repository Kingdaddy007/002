# Common Code Patterns

## Cinematic Overhaul Patterns
- **The CSS 3D Cylinder Installation:** When implementing monumental 3D text hooks, wrap the container in a `perspective` (e.g. `1200px`) and `preserve-3d` context. Rotate child text elements across the X-axis from `-80deg` (compressed) to `0deg` (crisp read state) to `80deg` (disappearing into depth).
- **Cinematic Aspect Ratio Squeeze:** Use GSAP to animate `clip-path: inset(5vh 55vw 5vh 5vw round 12px)` on a full-bleed hero video to squeeze it into a tight vertical portrait. This frees up massive negative space for subsequent architectural elements to flow into.
