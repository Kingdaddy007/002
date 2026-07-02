"use client";

import React, { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────
// GLSL: Simplex Noise Displacement Shader
// Creates organic "breathing" distortion on a texture.
// Ashima Arts simplex noise (public domain), embedded for zero deps.
// ─────────────────────────────────────────────────────────────

const VERTEX_SHADER = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D u_image;
  uniform float u_time;
  uniform float u_amplitude;
  uniform float u_opacity;

  // --- Simplex 2D noise (Ashima Arts) ---
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289v2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289v2(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                            + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x_) - 0.5;
    vec3 ox = floor(x_ + 0.5);
    vec3 a0 = x_ - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    // Two octaves of noise at different frequencies for organic feel
    float n1 = snoise(v_texCoord * 3.0 + u_time * 0.15);
    float n2 = snoise(v_texCoord * 6.0 - u_time * 0.08);
    float noise = (n1 * 0.7 + n2 * 0.3);

    // Displace UV coordinates
    vec2 displaced = v_texCoord + vec2(noise, noise * 0.8) * u_amplitude;

    vec4 color = texture2D(u_image, displaced);
    color.a *= u_opacity;
    gl_FragColor = color;
  }
`;

// ─────────────────────────────────────────────────────────────
// WebGL Helpers
// ─────────────────────────────────────────────────────────────

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  // WebGL state stored in refs to persist across renders
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformsRef = useRef<{
    u_time: WebGLUniformLocation | null;
    u_amplitude: WebGLUniformLocation | null;
    u_opacity: WebGLUniformLocation | null;
  }>({ u_time: null, u_amplitude: null, u_opacity: null });
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const amplitudeRef = useRef<number>(0.008); // Subliminal base amplitude
  const opacityRef = useRef<number>(1.0);
  const isDestroyedRef = useRef<boolean>(false);

  // ─── WebGL Initialization ───
  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Size to viewport
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) {
      console.warn("WebGL not supported — falling back to static image");
      return;
    }
    glRef.current = gl;

    // Compile shaders
    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = createProgram(gl, vs, fs);
    if (!program) return;
    programRef.current = program;
    gl.useProgram(program);

    // Geometry: fullscreen quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1,  -1, 1,
      -1,  1,  1, -1,   1, 1,
    ]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Tex coords
    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0, 1,  1, 1,  0, 0,
      0, 0,  1, 1,  1, 0,
    ]), gl.STATIC_DRAW);

    const texLoc = gl.getAttribLocation(program, "a_texCoord");
    gl.enableVertexAttribArray(texLoc);
    gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    uniformsRef.current = {
      u_time: gl.getUniformLocation(program, "u_time"),
      u_amplitude: gl.getUniformLocation(program, "u_amplitude"),
      u_opacity: gl.getUniformLocation(program, "u_opacity"),
    };

    // Load texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Placeholder pixel while image loads
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([24, 22, 21, 255])); // #181615

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (isDestroyedRef.current) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      // Clamp for non-power-of-2 textures
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };
    img.src = "/assets/fluted_glass.jpg.png";

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Render loop
    startTimeRef.current = performance.now();
    const render = () => {
      if (isDestroyedRef.current) return;

      const elapsed = (performance.now() - startTimeRef.current) / 1000;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform1f(uniformsRef.current.u_time, elapsed);
      gl.uniform1f(uniformsRef.current.u_amplitude, amplitudeRef.current);
      gl.uniform1f(uniformsRef.current.u_opacity, opacityRef.current);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animFrameRef.current = requestAnimationFrame(render);
    };
    animFrameRef.current = requestAnimationFrame(render);
  }, []);

  // ─── Cleanup WebGL resources ───
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

  // ─── Scroll lock + reset ───
  useEffect(() => {
    window.scrollTo(0, 0);
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // ─── Init WebGL on mount ───
  useEffect(() => {
    initWebGL();

    // Handle resize
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas && !isDestroyedRef.current) {
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      destroyWebGL();
    };
  }, [initWebGL, destroyWebGL]);

  // ─── Logo Sequence + Scroll Unlock + Dissolve ───
  useGSAP(() => {
    const container = containerRef.current;
    const scrollCue = scrollCueRef.current;
    if (!container) return;

    // ═══════════════════════════════════════════════
    // PHASE 1: Timed Logo Reveal (0 – 4.5s)
    // ═══════════════════════════════════════════════
    const introTl = gsap.timeline();

    // Logo wipes in from top (clip-path curtain reveal)
    introTl.fromTo(
      logoRef.current,
      { clipPath: "inset(0% 0 100% 0)", opacity: 0, y: 10 },
      {
        clipPath: "inset(0% 0 0% 0)",
        opacity: 0.95,
        y: 0,
        duration: 2.5,
        ease: "power2.inOut",
      },
      0.8 // Let the glass breathe alone for 0.8s
    );

    // At 4.5s: Unlock scroll + show scroll cue
    introTl.call(() => {
      document.body.style.overflow = "";
      ScrollTrigger.refresh();
    }, [], 4.5);

    // Fade in the scroll cue
    introTl.fromTo(
      scrollCue,
      { opacity: 0, y: -5 },
      {
        opacity: 0.6,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      },
      4.5
    );

    // Subtle floating animation on the scroll cue (loops)
    introTl.to(
      scrollCue,
      {
        y: 6,
        duration: 2.0,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      },
      5.5
    );

    // ═══════════════════════════════════════════════
    // PHASE 2: Scroll-Driven Dissolve
    // ═══════════════════════════════════════════════
    // The spacer div creates scrollable distance behind the fixed preloader.
    // As user scrolls, the threshold dissolves away.

    const dissolveTl = gsap.timeline({
      scrollTrigger: {
        trigger: spacerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
        onLeave: () => {
          // One-shot: remove preloader from DOM flow
          if (container) {
            container.style.display = "none";
            container.style.pointerEvents = "none";
          }
          destroyWebGL();
        },
      },
    });

    // Fade out the logo
    dissolveTl.to(logoRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.3,
      ease: "power2.in",
    }, 0);

    // Fade out scroll cue
    dissolveTl.to(scrollCue, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    }, 0);

    // Dissolve the entire preloader container
    dissolveTl.to(container, {
      opacity: 0,
      duration: 1.0,
      ease: "power2.inOut",
    }, 0.1);

    // Ramp up shader amplitude during dissolve (glass "unfreezes")
    dissolveTl.to(amplitudeRef, {
      current: 0.035,
      duration: 1.0,
      ease: "power2.in",
    }, 0);

    // Ramp down shader opacity
    dissolveTl.to(opacityRef, {
      current: 0,
      duration: 1.0,
      ease: "power2.inOut",
    }, 0.1);

  }, { scope: containerRef });

  return (
    <>
      {/* ─── The Threshold ─── */}
      <div
        ref={containerRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#181615" }}
      >
        {/* WebGL Canvas — simplex noise displacement on fluted glass */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover" }}
        />

        {/* Fallback static image (behind canvas, visible if WebGL fails) */}
        <Image
          src="/assets/fluted_glass.jpg.png"
          alt="Fluted glass threshold"
          fill
          className="object-cover opacity-90"
          style={{ zIndex: -1 }}
          priority
        />

        {/* Logo Sequence */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div
            ref={logoRef}
            className="opacity-0 flex flex-col items-center justify-center px-8 pt-2 pb-4"
            style={{ filter: "drop-shadow(0 0 30px rgba(229, 224, 218, 0.25))" }}
          >
            <Image
              src="/xbd-fav-icon.png"
              alt="XBD Monogram"
              width={75}
              height={75}
              className="opacity-95 mb-4 invert brightness-200"
              priority
            />
            <div className="flex flex-col items-center text-[#E5E0DA]">
              <span className="font-display text-[2.2rem] tracking-[0.4em] ml-[0.4em] leading-none">
                XBD
              </span>
              <span className="font-space text-[10px] tracking-[0.5em] uppercase mt-4 font-bold ml-[0.5em] opacity-80">
                Collective
              </span>
              <div className="w-[140%] h-[1px] bg-[#E5E0DA] opacity-30 mt-5" />
            </div>
          </div>

          {/* Scroll Cue */}
          <div
            ref={scrollCueRef}
            className="opacity-0 flex flex-col items-center mt-16 text-[#E5E0DA]"
          >
            <span className="font-space text-[9px] tracking-[0.4em] uppercase opacity-60 mb-3">
              Scroll
            </span>
            <span className="text-[18px] opacity-40 leading-none">↓</span>
          </div>
        </div>
      </div>

      {/* ─── Scroll Spacer ───
          Creates scrollable distance for the dissolve ScrollTrigger.
          Height = 80vh gives a comfortable scroll distance for the fade. */}
      <div
        ref={spacerRef}
        className="relative w-full pointer-events-none"
        style={{ height: "80vh" }}
        aria-hidden="true"
      />
    </>
  );
}
