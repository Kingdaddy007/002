# Performance and UI/UX Handoff Report

## 1. Observation
A static analysis of the XBD Collective codebase was performed across all requested files. Below are the exact file paths, line numbers, and verbatim code segments identified as performance, UI/UX responsiveness, or architectural concerns.

### Observation A: Brittle Header Scroll and Color Logic
*   **File Path**: `src/components/Header.tsx`
*   **Line Numbers**: 75–92 (Scroll listener) & 105–121 (Color transition)
*   **Code Segment**:
    ```typescript
    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        setIsScrolled(scrollY > 50);
        if (scrollY > 50) {
          setIsVisible(scrollY < lastScrollY.current);
        } else {
          setIsVisible(true);
        }
        lastScrollY.current = scrollY;
      };
      
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // initialize on mount
      // ...
    ```
    and:
    ```typescript
      // Toggle text color based on VideoHero pinned progress
      const t2 = ScrollTrigger.create({
        trigger: "#video-hero",
        start: "top top",
        end: "+=400%",
        onUpdate: (self) => {
          if (self.isActive) {
            const progress = self.progress;
            // Scene 2 and 3 are light backgrounds (roughly 0.15 to 0.6 progress)
            if (progress > 0.15 && progress < 0.6) {
              setIsLightText(false);
            } else {
              setIsLightText(true);
            }
          }
        }
      });
    ```

### Observation B: WCAG AA Contrast Failures on Muted Text
*   **File Path**: `src/app/globals.css`
*   **Line Numbers**: 28
*   **Code Segment**:
    ```css
    @theme {
      --color-xbd-bg: #F7F5F2;
      --color-xbd-bg-alt: #F0EBE3;
      --color-xbd-text: #2C2621;
      --color-xbd-muted: #706A60;
      --color-xbd-gold: #9C7B4D;
      ...
    }
    ```

### Observation C: Mobile Video Bottleneck (5 Simultaneous Videos)
*   **File Path**: `src/components/VideoHero.tsx`
*   **Line Numbers**: 24–30 (SCENES declaration) & 281–297 (DOM mounting)
*   **Code Segment**:
    ```typescript
    const SCENES: Scene[] = [
      { id: "scene-1", title: "SPATIAL MASTERY.", video: "/videos/scene1.mp4" },
      { id: "scene-2", title: "Private sanctuaries engineered for absolute discretion.", video: "/videos/scene2.mp4" },
      { id: "scene-3", title: "Singular estates. Coastal masterplans.", video: "/videos/scene3.mp4" },
      { id: "scene-4", title: "Material logic. Atmospheric control.", video: "/videos/scene4.mp4" },
      { id: "scene-5", title: "Commanding the skyline.", video: "/videos/scene5.mp4" }
    ];
    ```
    and:
    ```typescript
      return (
        <section ref={containerRef} id="video-hero" ...>
          <div ref={mediaContainerRef} className="absolute inset-0 z-0">
            <div ref={proj1Ref} className="absolute inset-0 z-10 w-full h-full overflow-hidden">
              <SceneMedia scene={SCENES[0]} preload="auto" />
            </div>
            <div ref={proj2Ref} className="absolute inset-0 z-20 w-full h-full overflow-hidden" style={stripsMaskStyle}>
              <SceneMedia scene={SCENES[1]} preload="metadata" />
            </div>
            ...
    ```

### Observation D: Hard-coded Colors Bypassing Theme Tokens
*   **File Path**: `src/components/DisciplinesSection.tsx` & `src/components/ConciergeSection.tsx`
*   **Line Numbers**: `DisciplinesSection.tsx`: 210 | `ConciergeSection.tsx`: 149, 153
*   **Code Segment**:
    ```typescript
    // DisciplinesSection.tsx:210
    className="img-frame relative w-full aspect-[4/3] md:aspect-video overflow-hidden bg-[#EAE5DF] cursor-pointer group"
    ```
    ```typescript
    // ConciergeSection.tsx:149, 153
    <div ref={footerWrapperRef} className="relative w-full h-[85vh] md:h-[100vh] overflow-hidden z-10 bg-[#1A1A1A]">
    ```

### Observation E: Lack of Cinematic Typography Entrance on Proof Section
*   **File Path**: `src/components/ProofSection.tsx`
*   **Line Numbers**: 51–65
*   **Code Segment**:
    ```typescript
    // Fade in the caption as the section reaches the center of the viewport
    gsap.fromTo(
      captionRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center+=20%",
          toggleActions: "play none none reverse",
        },
      }
    );
    ```

### Observation F: WebGL GPU Memory and Event Listener Leaks
*   **File Path**: `src/components/Preloader.tsx`
*   **Line Numbers**: 262–276 (WebGL destroy) & 365–438 (Events and unmount logic)
*   **Code Segment**:
    ```typescript
    const destroyWebGL = useCallback(() => {
      isDestroyedRef.current = true;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      const gl = glRef.current;
      if (gl && programRef.current) {
        gl.deleteProgram(programRef.current);
      }
      // Lose context to free GPU memory
      const ext = gl?.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
      glRef.current = null;
      programRef.current = null;
    }, []);
    ```

### Observation G: Redundant ScrollTrigger Instances in Disciplines
*   **File Path**: `src/components/DisciplinesSection.tsx`
*   **Line Numbers**: 99–163
*   **Code Segment**:
    Three separate ScrollTriggers are created per block (`imgContainer` reveal, `words` reveal, and `paragraph` reveal), all triggering on the same parent container (`block`) at nearly identical viewport positions (`top 75%` and `top 70%`).

### Observation H: High-Reflow Layout Animation and Unoptimized Images in Team Section
*   **File Path**: `src/components/TeamSection.tsx`
*   **Line Numbers**: 112–119 (GSAP left/top animation) & 234–239, 293–298 (Standard `<img>` tags)
*   **Code Segment**:
    ```typescript
    tl.to(".director-portrait", {
      left: function(i, target) { return target.getAttribute("data-left") || "50%"; },
      top: function(i, target) { return target.getAttribute("data-top") || "50%"; },
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
    }, 0); 
    ```
    and:
    ```typescript
    <img 
      src={member.img} 
      alt={member.name}
      className="w-full h-auto object-bottom grayscale"
      style={{ filter: "contrast(1.05)" }}
    />
    ```

### Observation I: Invalid configuration options in Next.js config
*   **File Path**: `next.config.ts`
*   **Line Numbers**: 5
*   **Code Segment**:
    ```typescript
    const nextConfig: NextConfig = {
      images: {
        qualities: [75, 100],
        ...
      }
    };
    ```

### Observation J: Lack of Lenis/ScrollTrigger Tick Synchronization
*   **File Path**: `src/components/SmoothScroll.tsx`
*   **Line Numbers**: 8–26
*   **Code Segment**:
    The component binds the custom Lenis `raf` update loop to the GSAP ticker, but it never registers `ScrollTrigger.update` to execute immediately on the Lenis scroll events, allowing a 1-frame scroll-calculation lag.

---

## 2. Logic Chain

### A. Brittle Header Scroll and Color Logic (Issue 1)
1.  **State Re-renders on Scroll**: Tying header visibility and background styling directly to React states (`setIsVisible`, `setIsScrolled`) inside a scroll event listener triggers a complete component re-render on every scroll direction change.
2.  **Scroll Performance Degradation**: Re-rendering DOM nodes on scroll interrupts browser thread processing, causing frame skips (jank) in smooth scrolling.
3.  **Fragile Math**: Toggling text color based on progress ratios of `t2` (e.g. `progress > 0.15 && progress < 0.6`) inside a `ScrollTrigger` is brittle because it is coupled to the exact scale ratio of the video container height.
4.  **Proposed Fix**: Refactor to leverage a single GSAP `ScrollTrigger` targeting the header element directly to toggle class names or animate properties via GPU transforms, bypassing React re-rendering altogether.

### B. WCAG AA Contrast Failures on Muted Text (Issue 3)
1.  **Context-Based Contrast Ratio**: The color token `--color-xbd-muted` (`#706A60`) is used on both light Limestone backgrounds: `--color-xbd-bg` (`#F7F5F2`) and `--color-xbd-bg-alt` (`#F0EBE3`).
2.  **Strict Compliance Deficit**:
    *   On `#F7F5F2`, the contrast ratio is `4.95:1` (Passes WCAG AA target of `4.5:1` for small text).
    *   On `#F0EBE3`, the contrast ratio is `4.497:1` (Fails WCAG AA target).
3.  **Proposed Fix**: Darkening the muted text color token from `#706A60` to `#6B655C` increases contrast on `#F0EBE3` to `4.84:1` (and `#F7F5F2` to `5.36:1`), securing WCAG AA compliance.

### C. Mobile Video Bottleneck (Issue 4)
1.  **Browser Decoder Exhaustion**: Browsers (especially iOS Safari and mobile Chrome) have limited hardware video decoders. Mounting 5 `<video>` elements simultaneously, even if paused, causes decoder starvation.
2.  **Resource Overload**: Video files (`/videos/scene1.mp4` to `/videos/scene5.mp4`) are extremely heavy. preloading metadata or loading multiple videos in the background leads to major network and CPU bottlenecks.
3.  **Proposed Fix**: Implement mobile environment detection. If a user is on mobile, render optimized, lazy-loaded static Next.js `<Image>` components instead of the heavy `<video>` tags.

### D. Hard-coded Colors Bypassing Theme Tokens (Issue 5)
1.  **Bypassing Tailwind V4 Utility Engine**: Hard-coding hex colors like `#EAE5DF` and `#1A1A1A` breaks theme consistency and central control.
2.  **Proposed Fix**: Replace raw hex values with custom color tokens configured inside `globals.css` (Tailwind @theme layer) to ensure design token compliance.

### E. Lack of Cinematic Typography Entrance on Proof Section (Issue 6)
1.  **Visual Inconsistency**: The caption in `ProofSection.tsx` fades up as a single un-staggered block, which clashes with the premium staggered word-level and line-level animations present in `PhilosophyBridge` and `DisciplinesSection`.
2.  **Proposed Fix**: Refactor `ProofSection.tsx` to split the text lines, wrapping each in an `overflow-hidden` container and staggering their entrance.

### F. WebGL GPU Memory and Event Listener Leaks
1.  **Unreleased GPU Memory**: Creating buffers (`gl.createBuffer`) and textures (`gl.createTexture`) inside `Preloader.tsx` without deleting them on unmount allocates GPU resources permanently. Over multiple page mounts, this leads to Out Of Memory (OOM) GPU crashes.
2.  **Leaked Window Listeners**: Toggling `isGone` to `true` hides the markup, but the component remains in the React fiber tree. The `window` event listeners for `keydown` and `click` remain active.
3.  **Proposed Fix**: Call `gl.deleteBuffer()`, `gl.deleteTexture()`, and `gl.deleteShader()` explicitly on cleanup, and immediately clean up window listeners when dissolve is triggered.

### G. Redundant ScrollTrigger Instances in Disciplines
1.  **Scroll Loop Overhead**: GSAP's `ScrollTrigger` recalculates element bounding client rects on scroll ticks. Generating 12 separate `ScrollTrigger` instances across 3 disciplines creates redundant loops.
2.  **Proposed Fix**: Group all reveal transitions per discipline block into a unified GSAP timeline controlled by a single ScrollTrigger. This reduces the trigger count by 66%.

### H. High-Reflow Layout Animation and Unoptimized Images in Team Section
1.  **Continuous Reflows**: Animating `left` and `top` properties causes the browser to compute styling, layout, and repaint trees on every single scroll frame.
2.  **Large PNG File Payloads**: Using raw `<img>` tags with large local PNG assets bypasses Next.js's automated compression, webp/avif conversion, and responsive sizing.
3.  **Proposed Fix**: Position portrait images statically using CSS, then animate their offset using GPU-accelerated `x` and `y` properties. Convert portraits to `.webp` format and render them using Next.js's `<Image>` component.

### I. Invalid Configuration in Next.js config
1.  **Build Warns**: The Next.js image optimizer has no `qualities` option. It causes runtime warnings or build-time validation errors.
2.  **Proposed Fix**: Remove `qualities` and configure `formats: ['image/avif', 'image/webp']`.

### J. Lack of Lenis/ScrollTrigger Tick Synchronization
1.  **1-Frame Pin Jitter**: Driving Lenis from the GSAP ticker without updating ScrollTrigger concurrently allows the browser scroll event to fall out of step with the animation frames, producing visible jitter on high-frequency displays.
2.  **Proposed Fix**: Link Lenis events directly to GSAP's scroll updater: `lenis.on('scroll', ScrollTrigger.update)`.

---

## 3. Caveats
*   **Profiler Benchmarking**: Testing was done via read-only static analysis and logic tracing rather than active browser performance profilers (Chrome DevTools Performance tab / Lighthouse). The actual frames-per-second (FPS) and layout shift (CLS) scores must be measured live after implementing the suggested changes.
*   **Asset Presence**: It is assumed that corresponding fallback images (e.g. `/assets/bg-1.webp` etc.) exist or can be generated by extracting the first frame of the scene videos.

---

## 4. Conclusion
The XBD Collective codebase is visually stunning and leverages elite cinematic design archetypes. However, it contains several performance critical issues (specifically multi-video decoder exhaustion on mobile, layout reflows in scroll animations, GPU resource leaks in the WebGL preloader, and contrast violations) that must be addressed to guarantee a premium, responsive user experience. 

The following prioritized optimizations are highly recommended for implementation:

### Recommendation 1: Header Animation Refactoring (`src/components/Header.tsx`)
Replace the scroll listener state toggle with a ScrollTrigger animation using `self.direction` to prevent React re-renders on scroll.

**Proposed Code Change**:
```typescript
// Replace lines 75-92 with a single ScrollTrigger:
useEffect(() => {
  const header = document.querySelector("header");
  if (!header) return;

  const showHeader = gsap.from(header, {
    yPercent: -100,
    paused: true,
    duration: 0.3
  }).progress(1);

  const tScroll = ScrollTrigger.create({
    start: "top -50",
    end: 99999,
    onUpdate: (self) => {
      // Hide on scroll down, show on scroll up
      if (self.direction === 1) {
        showHeader.reverse();
      } else {
        showHeader.play();
      }
      
      // Toggle scrolled background style directly on DOM
      if (self.scroll() > 50) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    }
  });

  // Keep existing t1 (Philosophy) and t2 (VideoHero) ScrollTriggers...
  
  return () => {
    tScroll.kill();
    t1.kill();
    t2.kill();
  };
}, []);
```

### Recommendation 2: Darken Muted Text for WCAG AA (`src/app/globals.css`)
Darken `--color-xbd-muted` from `#706A60` to `#6B655C` to achieve compliance (> 4.5:1) on both Limestone backgrounds.

**Proposed Code Change**:
```css
/* Change globals.css Line 28: */
--color-xbd-muted: #6B655C;
```

### Recommendation 3: Mobile Image Fallbacks for VideoHero (`src/components/VideoHero.tsx`)
Detect mobile screen width and switch out heavy videos with optimized `<Image>` components.

**Proposed Code Change**:
```typescript
// 1. Update SCENES in src/components/VideoHero.tsx:
const SCENES: Scene[] = [
  { id: "scene-1", title: "SPATIAL MASTERY.", video: "/videos/scene1.mp4", image: "/assets/bg-1.webp" },
  { id: "scene-2", title: "Private sanctuaries engineered for absolute discretion.", video: "/videos/scene2.mp4", image: "/assets/bg-2.webp" },
  { id: "scene-3", title: "Singular estates. Coastal masterplans.", video: "/videos/scene3.mp4", image: "/assets/bg-3.webp" },
  { id: "scene-4", title: "Material logic. Atmospheric control.", video: "/videos/scene4.mp4", image: "/assets/dark_travertine.jpg" },
  { id: "scene-5", title: "Commanding the skyline.", video: "/videos/scene5.mp4", image: "/assets/shadow_wall.jpg" }
];

// 2. Update SceneMedia component:
const SceneMedia = ({ scene, autoPlay, preload = "none", isMobile }: { scene: Scene; autoPlay?: boolean; preload?: "auto" | "metadata" | "none"; isMobile: boolean }) => {
  if (scene.video && !isMobile) {
    return <video id={`video-${scene.id}`} src={scene.video} loop muted playsInline autoPlay={autoPlay} preload={preload} className="absolute inset-0 w-full h-full object-cover" />;
  }
  if (scene.image) {
    return <Image id={`img-${scene.id}`} src={scene.image} alt={scene.title} fill className="absolute inset-0 object-cover" sizes="100vw" priority={scene.id === "scene-1"} />;
  }
  return null;
};

// 3. Add mobile state detection inside VideoHero:
const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
  const media = window.matchMedia("(max-width: 768px)");
  setIsMobile(media.matches);
  const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}, []);

// 4. Pass isMobile to SceneMedia and return early in ScrollTrigger.onUpdate if isMobile:
// Inside ScrollTrigger onUpdate:
onUpdate: (self) => {
  if (isMobile) return;
  // ... rest of the play/pause logic
}
```

### Recommendation 4: Complete WebGL & Window Listener Cleanup in Preloader (`src/components/Preloader.tsx`)
Delete WebGL textures, buffers, and compiled shaders on unmount, and remove scroll/click listeners immediately once triggered.

**Proposed Code Change**:
```typescript
// 1. Store buffer/texture references in WebGL init:
const buffersRef = useRef<{ position: WebGLBuffer | null; texCoord: WebGLBuffer | null }>({ position: null, texCoord: null });
const textureRef = useRef<WebGLTexture | null>(null);
const shadersRef = useRef<{ vs: WebGLShader | null; fs: WebGLShader | null }>({ vs: null, fs: null });

// Capture them during initWebGL:
const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
shadersRef.current = { vs, fs };

const positionBuffer = gl.createBuffer();
const texCoordBuffer = gl.createBuffer();
buffersRef.current = { position: positionBuffer, texCoord: texCoordBuffer };

const texture = gl.createTexture();
textureRef.current = texture;

// 2. Explicitly delete them inside destroyWebGL:
const destroyWebGL = useCallback(() => {
  isDestroyedRef.current = true;
  if (animFrameRef.current) {
    cancelAnimationFrame(animFrameRef.current);
  }
  const gl = glRef.current;
  if (gl) {
    if (programRef.current) gl.deleteProgram(programRef.current);
    if (buffersRef.current.position) gl.deleteBuffer(buffersRef.current.position);
    if (buffersRef.current.texCoord) gl.deleteBuffer(buffersRef.current.texCoord);
    if (textureRef.current) gl.deleteTexture(textureRef.current);
    if (shadersRef.current.vs) gl.deleteShader(shadersRef.current.vs);
    if (shadersRef.current.fs) gl.deleteShader(shadersRef.current.fs);
  }
  const ext = gl?.getExtension("WEBGL_lose_context");
  if (ext) ext.loseContext();
  glRef.current = null;
  programRef.current = null;
}, []);

// 3. Remove window listeners inside triggerDissolve immediately:
const triggerDissolve = () => {
  if (!isUnlockedRef.current || dissolveTriggered.current) return;
  dissolveTriggered.current = true;

  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("click", handleClick);
  // ... rest of timeline code
};
```

### Recommendation 5: Extract Hardcoded Colors (`src/components/DisciplinesSection.tsx` & `src/components/ConciergeSection.tsx`)
Ensure all background colors use configured Tailwind configuration tokens instead of hardcoded hex values.

**Proposed Code Change**:
```typescript
// Replace bg-[#EAE5DF] with bg-xbd-bg-alt:
className="img-frame ... bg-xbd-bg-alt ..."

// Replace bg-[#1A1A1A] with a theme utility class or text color matching:
className="... bg-neutral-900 ..." // or add custom footer color in @theme
```

### Recommendation 6: Staggered Entrance on Proof Section Caption (`src/components/ProofSection.tsx`)
Apply staggered transitions matching the other sections.

**Proposed Code Change**:
```typescript
// 1. Refactor GSAP timeline in ProofSection:
const lines = captionRef.current.querySelectorAll('.reveal-line');
gsap.fromTo(
  lines,
  { opacity: 0, yPercent: 100 },
  {
    opacity: 1,
    yPercent: 0,
    duration: 1.2,
    ease: "power3.out",
    stagger: 0.15,
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top center+=20%",
      toggleActions: "play none none reverse",
    },
  }
);

// 2. Wrap HTML inside JSX:
<div 
  ref={captionRef}
  className="absolute bottom-8 left-4 md:bottom-12 md:left-12 text-[#F7F5F2] font-body z-10"
>
  <div className="overflow-hidden">
    <p className="reveal-line text-xs md:text-sm uppercase tracking-[0.2em] opacity-80 mb-1">Solar House</p>
  </div>
  <div className="overflow-hidden">
    <p className="reveal-line text-sm md:text-base opacity-90">Architecture & Interiors</p>
  </div>
</div>
```

### Recommendation 7: Dynamic Video Play/Pause in Proof Section (`src/components/ProofSection.tsx`)
Pause the video when it scrolls off-screen to conserve CPU/GPU.

**Proposed Code Change**:
```typescript
const [isIntersecting, setIsIntersecting] = useState(false);

useEffect(() => {
  if (!containerRef.current) return;
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    },
    { rootMargin: "200px" }
  );
  observer.observe(containerRef.current);
  return () => observer.disconnect();
}, []);

useEffect(() => {
  const video = videoRef.current;
  if (!video) return;
  if (isIntersecting) {
    video.play().catch(() => {});
  } else {
    video.pause();
  }
}, [isIntersecting]);
```

### Recommendation 8: Group ScrollTriggers in Disciplines (`src/components/DisciplinesSection.tsx`)
Merge the individual triggers into a single timeline per block to reduce layout calculations by 66%.

**Proposed Code Change**:
```typescript
blocks.forEach((block) => {
  const imgContainer = block.querySelector(".img-frame");
  const words = block.querySelectorAll(".title-word");
  const paragraph = block.querySelector(".desc-text");

  const blockTl = gsap.timeline({
    scrollTrigger: {
      trigger: block,
      start: "top 75%",
      toggleActions: "play reverse play reverse"
    }
  });

  blockTl
    .fromTo(imgContainer, { clipPath: "inset(15% 15% 15% 15%)", scale: 0.95 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.5, ease: "power3.out" }, 0)
    .fromTo(words, { yPercent: 110, rotateZ: 2 }, { yPercent: 0, rotateZ: 0, duration: 1.2, ease: "power4.out", stagger: 0.05 }, 0.1)
    .fromTo(paragraph, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, 0.3);
});
```

### Recommendation 9: GPU Transforms & Next.js Image Optimization for Team Section (`src/components/TeamSection.tsx`)
Avoid reflow-inducing `left`/`top` animation. Use Next.js `<Image>` and convert files to WebP.

**Proposed Code Change**:
```typescript
// 1. Position portraits statically at their radial locations in CSS/JSX.
// 2. Animate x and y from center:
const rx = typeof window !== 'undefined' && window.innerWidth < 768 ? 42 : 36; 
const ry = typeof window !== 'undefined' && window.innerWidth < 768 ? 45 : 40; 
const startX = -Math.cos(offsetAngle) * rx + "vw";
const startY = -Math.sin(offsetAngle) * ry + "vh";

// GSAP code:
tl.fromTo(".director-portrait", 
  {
    x: (i, target) => target.getAttribute("data-start-x") || 0,
    y: (i, target) => target.getAttribute("data-start-y") || 0,
    scale: 0.75,
    opacity: 0
  },
  {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
    duration: 1.5,
    ease: "power2.out",
  }, 0);

// 3. Replace <img> tags with optimized Next.js <Image> components:
<Image
  src={member.img}
  alt={member.name}
  fill
  sizes="(max-width: 768px) 33vw, 20vw"
  className="object-cover object-bottom grayscale"
/>
```

### Recommendation 10: Sync ScrollTrigger with Lenis Ticker (`src/components/SmoothScroll.tsx`)
Link scroll triggers back to Lenis scroll event callbacks to eliminate the 1-frame rendering lag.

**Proposed Code Change**:
```typescript
useEffect(() => {
  const lenisInstance = lenisRef.current?.lenis;
  if (lenisInstance) {
    lenisInstance.on('scroll', ScrollTrigger.update);
  }

  function update(time: number) {
    lenisRef.current?.lenis?.raf(time * 1000);
  }

  gsap.ticker.add(update);
  return () => {
    gsap.ticker.remove(update);
    lenisInstance?.off('scroll', ScrollTrigger.update);
  };
}, []);
```

---

## 5. Verification Method
To independently verify the validity of these optimizations:
1.  **Check for build errors**: Run `bun run build` (or `npm run build`) in the root workspace. This will verify that `next.config.ts` changes compile successfully and Next.js Image types resolve properly.
2.  **Lint Check**: Run `bun run lint` (or `npm run lint` / `npx eslint .`) to confirm that all React Hook dependencies and new structures pass typescript and eslint checks.
3.  **Check GPU Memory Allocation (Preloader WebGL Leak)**: Open Chrome DevTools, navigate to the **Performance** tab or the **Memory** tab, and take a heap snapshot before and after unmounting the preloader. Confirm that the WebGL program, textures, and buffers are fully garbage collected.
4.  **Confirm 60 FPS scrolling (Reflow removal)**: Open Chrome DevTools, check the **Rendering** tab, enable **Paint flashing** and **Layout Shift Regions**. Scroll through the `TeamSection` and confirm that no layout shifts or red paint blocks flash inside the portraits wrapper.
5.  **Verify WCAG Contrast**: Use the DevTools element inspector to check the contrast ratio of any text using `--color-xbd-muted` on both `#F7F5F2` and `#F0EBE3` backgrounds. Ensure it reports `>= 4.5:1`.
