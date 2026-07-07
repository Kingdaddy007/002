"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useLenis } from 'lenis/react';

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

  const [isGone, setIsGone] = useState(false);
  const dissolveTriggered = useRef(false);
  const isUnlockedRef = useRef(false);
  const dissolveTlRef = useRef<gsap.core.Timeline | null>(null);
  const previousBodyOverflowRef = useRef("");
  const lenis = useLenis();
  const lenisRef = useRef(lenis);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useEffect(() => {
    window.hasPreloaderCompleted = false;
    window.hasPreloaderDissolveStarted = false;
  }, []);

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
      new Uint8Array([247, 245, 242, 255])); // var(--background)

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
    
    // Hard lock native scrolling
    previousBodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    
    // Hard lock Lenis smooth scrolling (preventing ScrollTrigger bleed)
    if (lenis) {
      lenis.stop();
    }
    
    return () => {
      document.body.style.overflow = previousBodyOverflowRef.current;
      if (lenis) lenis.start();
    };
  }, [lenis]);

  // ─── Init WebGL on mount ───
  useEffect(() => {
    initWebGL();

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

  // ─── Animations ───
  useGSAP(() => {
    const container = containerRef.current;
    const scrollCue = scrollCueRef.current;
    if (!container) return;

    // ═══════════════════════════════════════════════
    // PHASE 1: Timed Logo Reveal (0 – 4.5s)
    // ═══════════════════════════════════════════════
    const introTl = gsap.timeline();

    introTl.fromTo(
      logoRef.current,
      { clipPath: "inset(0% 0 100% 0)", opacity: 0, y: 15 },
      {
        clipPath: "inset(0% 0 0% 0)",
        opacity: 0.95,
        y: 0,
        duration: 2.5,
        ease: "power2.inOut",
      },
      0.8
    );

    // At 4.5s: Unlock scroll logic + show scroll cue
    introTl.call(() => {
      isUnlockedRef.current = true;
    }, [], 4.5);

    introTl.fromTo(
      scrollCue,
      { opacity: 0, y: -5 },
      {
        opacity: 0.95,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      },
      4.5
    );

  }, { scope: containerRef });

  // ═══════════════════════════════════════════════
  // PHASE 2: Event-Driven Dissolve (No Spacer Void)
  // ═══════════════════════════════════════════════
  useEffect(() => {
    const triggerDissolve = () => {
      if (!isUnlockedRef.current || dissolveTriggered.current) return;
      dissolveTriggered.current = true;

      // Play the dissolve timeline
      const dissolveTl = gsap.timeline({
        onStart: () => {
          // Signal to the Hero to start playing the video now, so it plays while dissolving
          window.hasPreloaderDissolveStarted = true;
          window.dispatchEvent(new Event("preloaderDissolveStart"));
        },
        onComplete: () => {
          setIsGone(true);
          destroyWebGL();
          // ONLY unlock the body once the preloader is fully gone
          document.body.style.overflow = previousBodyOverflowRef.current;
          if (lenisRef.current) lenisRef.current.start();
          
          // Signal to the rest of the application that the preloader is fully gone
          dissolveTlRef.current = null;
          window.hasPreloaderCompleted = true;
          window.dispatchEvent(new Event("preloaderComplete"));
        }
      });
      dissolveTlRef.current = dissolveTl;

      // Fade out logo and cue quickly
      dissolveTl.to([logoRef.current, scrollCueRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
      }, 0);

      // Container fades out
      dissolveTl.to(containerRef.current, {
        opacity: 0,
        duration: 3.2,
        ease: "power2.inOut",
      }, 0.2);

      // Shader unfreezes and distorts
      dissolveTl.to(amplitudeRef, {
        current: 0.05,
        duration: 3.2,
        ease: "power2.in",
      }, 0);

      dissolveTl.to(opacityRef, {
        current: 0,
        duration: 3.2,
        ease: "power2.inOut",
      }, 0.2);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "Spacebar"].includes(e.key)) {
        triggerDissolve();
      }
    };

    const handleClick = () => triggerDissolve();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
      dissolveTlRef.current?.kill();
      dissolveTlRef.current = null;
    };
  }, [destroyWebGL]);

  if (isGone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ objectFit: "cover" }}
      />

      {/* Fallback Image */}
      <Image
        src="/assets/fluted_glass.jpg.png"
        alt="Fluted glass threshold"
        fill
        className="object-cover opacity-90 pointer-events-none"
        style={{ zIndex: -1 }}
        priority
      />

      {/* 
        Logo Sequence 
        We use a negative margin-top (-10vh) to pull it slightly above 
        mathematical center for correct optical weighting.
      */}
      <div className="relative z-10 flex flex-col items-center text-center -mt-[10vh]">
        <div
          ref={logoRef}
          className="opacity-0 flex flex-col items-center justify-center px-8 pt-2 pb-4"
          style={{ filter: "drop-shadow(0 4px 30px rgba(0, 0, 0, 0.35))" }}
        >
          <Image
            src="/xbd-fav-icon.png"
            alt="XBD Monogram"
            width={75}
            height={75}
            className="opacity-100 mb-4 invert"
            style={{ filter: "brightness(0) invert(1)" }}
            priority
          />
          <div className="flex flex-col items-center text-white">
            <span className="font-display text-[2.2rem] tracking-[0.4em] ml-[0.4em] leading-none drop-shadow-md">
              XBD
            </span>
            <span className="font-space text-[10px] tracking-[0.5em] uppercase mt-4 font-bold ml-[0.5em] opacity-90">
              Collective
            </span>
            <div className="w-[140%] h-[1px] bg-white opacity-40 mt-5" />
          </div>
        </div>
      </div>

      {/* 
        Scroll Cue 
        Pinned to the bottom. White vertical tracking line for maximum premium contrast.
      */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 flex flex-col items-center text-white cursor-pointer select-none"
        style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))" }}
      >
        <span className="font-space text-[10px] md:text-xs tracking-[0.45em] uppercase font-medium opacity-100 mb-6 ml-[0.45em]">
          Click to Enter
        </span>
        <div className="w-[2px] h-16 bg-white/30 relative overflow-hidden rounded-full shadow-[0_0_8px_rgba(255,255,255,0.3)]">
          <div className="absolute top-0 left-0 w-full h-full bg-white shadow-[0_0_4px_#fff] animate-[scrollLine_2.5s_ease-in-out_infinite]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
