"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const fragmentShaderSource = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform sampler2D u_image;
  uniform float u_imageAspect;

  // Generic 2D simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    
    // Invert Y coordinate since WebGL texture Y is bottom-to-top
    vec2 uv = vec2(st.x, 1.0 - st.y);
    
    float screenAspect = u_resolution.x / u_resolution.y;
    
    // Object-fit: cover logic
    if (screenAspect < u_imageAspect) {
        float scale = screenAspect / u_imageAspect;
        uv.x = (uv.x - 0.5) * scale + 0.5;
    } else {
        float scale = u_imageAspect / screenAspect;
        uv.y = (uv.y - 0.5) * scale + 0.5;
    }

    // Gentle displacement
    float n = snoise(uv * 4.0 + u_time * 0.1);
    vec2 distortedUV = uv + vec2(n * 0.015);
    
    vec4 texColor = texture2D(u_image, distortedUV);
    
    // Add a very subtle vignette to keep the center focused
    float dist = distance(st, vec2(0.5));
    texColor.rgb *= smoothstep(0.8, 0.2, dist * 0.8);
    
    gl_FragColor = texColor;
  }
`;

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // WebGL Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const imageAspectLocation = gl.getUniformLocation(program, "u_imageAspect");

    const image = new window.Image();
    image.src = "/assets/fluted_glass.jpg.png";
    image.onload = () => {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      gl.uniform1f(imageAspectLocation, image.width / image.height);

      let startTime = performance.now();
      let animationFrameId: number;

      const render = (time: number) => {
        if (!canvasRef.current) return;
        
        // Resize canvas to match display size
        const displayWidth = window.innerWidth;
        const displayHeight = window.innerHeight;
        
        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
          canvas.width = displayWidth;
          canvas.height = displayHeight;
          gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        }

        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
        gl.uniform1f(timeLocation, (time - startTime) * 0.001);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        animationFrameId = requestAnimationFrame(render);
      };
      
      animationFrameId = requestAnimationFrame(render);

      return () => cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Scroll Lock & Event Listeners
  useEffect(() => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    if (!isUnlocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isUnlocked]);

  // Scroll to Dismiss
  useEffect(() => {
    if (!isUnlocked || isDismissed) return;

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsDismissed(true);
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => {
             if (containerRef.current) {
                containerRef.current.style.display = "none";
             }
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleScroll); // Catch trackpad attempts
    window.addEventListener("touchmove", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [isUnlocked, isDismissed]);

  // Choreography
  useGSAP(() => {
    const tl = gsap.timeline();

    // Fade in logo slowly
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 3.0, ease: "power2.out" },
      0.5
    );

    // After 4s total, show the scroll cue and unlock
    tl.add(() => {
      setIsUnlocked(true);
    }, 4.0);

    tl.fromTo(
      scrollCueRef.current,
      { opacity: 0, y: -10 },
      { opacity: 0.7, y: 0, duration: 1.5, ease: "power2.out" },
      4.0
    );

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#181615]"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0 opacity-80"
      />
      
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Full Logo Composite */}
        <div ref={logoRef} className="opacity-0 flex flex-col items-center justify-center px-8 pt-2 pb-4">
          <Image 
            src="/xbd-fav-icon.png" 
            alt="XBD Monogram" 
            width={75} 
            height={75} 
            className="opacity-95 mb-4 brightness-0 invert" 
            priority
          />
          <div className="flex flex-col items-center text-white">
            <span className="font-display text-[2.2rem] tracking-[0.4em] ml-[0.4em] leading-none">XBD</span>
            <span className="font-space text-[10px] tracking-[0.5em] uppercase mt-4 font-bold ml-[0.5em] opacity-80">Collective</span>
          </div>
        </div>

        {/* Scroll Cue */}
        <div 
          ref={scrollCueRef}
          className="absolute bottom-12 flex flex-col items-center opacity-0"
        >
          <span className="font-space text-[10px] font-bold tracking-[0.4em] text-white uppercase ml-[0.4em]">
            SCROLL
          </span>
          <span className="text-white mt-2 text-xs">↓</span>
        </div>
      </div>
    </div>
  );
}
