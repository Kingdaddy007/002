"use client";

import React, { Suspense, useRef, useLayoutEffect, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture, Sparkles, MeshReflectorMaterial } from "@react-three/drei";
import gsap from "gsap";

interface CurvedCinemaGalleryProps {
  images: string[];
  onClose: () => void;
}

function GalleryPanel({ 
  url, 
  radius, 
  height, 
  thetaStart, 
  thetaLength 
}: { 
  url: string;
  radius: number;
  height: number;
  thetaStart: number;
  thetaLength: number;
}) {
  const texture = useTexture(url);
  
  useLayoutEffect(() => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = -1;
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <mesh>
      <cylinderGeometry args={[radius, radius, height, 64, 1, true, thetaStart, thetaLength]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} toneMapped={false} />
    </mesh>
  );
}

function GalleryScene({ images, onReady }: { images: string[], onReady: () => void }) {
  const N = images.length;
  
  // By calculating the radius based exactly on N * panelWidth, 
  // the ring perfectly closes 360 degrees no matter how many images there are.
  // This allows endless panning without ever hitting an "empty void".
  const panelWidth = 12; 
  const gap = 0.15; 
  const effectivePanelWidth = panelWidth - gap;
  
  const circumference = panelWidth * N;
  const radius = circumference / (2 * Math.PI);
  
  // Height for a 16:9 ratio
  const height = effectivePanelWidth * (9 / 16);

  // Removed the GSAP rotation animation here to prevent fighting with OrbitControls
  // and to provide a clean, soft entry without "rambling".

  // Notify parent when textures are loaded and component is mounted
  useEffect(() => {
    onReady();
  }, [onReady]);

  return (
    <>
      <fog attach="fog" args={['#1c1a18', radius * 0.8, radius * 1.5]} />
      <group>
      {images.map((url, i) => {
        const thetaStart = i * (2 * Math.PI / N);
        const thetaLength = effectivePanelWidth / radius;
        return (
          <GalleryPanel 
            key={`fg-${url}`} 
            url={url} 
            radius={radius} 
            height={height} 
            thetaStart={thetaStart} 
            thetaLength={thetaLength} 
          />
        );
      })}
      
      {/* Floating dust particles made brighter and larger */}
      <Sparkles 
        count={800} 
        scale={[radius * 2, height * 2, radius * 2]} 
        size={6} 
        speed={0.3} 
        opacity={0.6} 
        color="#e8dcc8" 
      />

      {/* Dark reflective floor to ground the room and reflect the images */}
      <mesh position={[0, -height / 2 - 1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[radius * 4, radius * 4]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={2}
          roughness={0.8}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0a0a09"
          metalness={0.5}
          mirror={0.5}
        />
      </mesh>
    </group>
    </>
  );
}

export default function CurvedCinemaGallery({ images, onClose }: CurvedCinemaGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // DYNAMIC ZOOM: We want all galleries (whether N=4 or N=11) to look exactly the same size.
  // The user identified N=6 as the perfect size, but wanted it a "tiny bit closer".
  // So we use baseN = 6 and baseFov = 35 (slightly closer than 40).
  const N = images.length;
  const baseN = 6;
  const baseFov = 35; 
  const baseTan = Math.tan((baseFov / 2) * (Math.PI / 180));
  const targetTan = (baseN / N) * baseTan;
  const dynamicFov = 2 * Math.atan(targetTan) * (180 / Math.PI);

  // DYNAMIC VERTICAL LIMIT: Prevent the camera from "sliding up" too much when heavily zoomed in.
  // We limit the vertical look (polar angle) to exactly 8% of whatever the current FOV is.
  // This gives the user a tiny bit of nice vertical freedom without letting the images drift off-screen.
  const polarLimit = (dynamicFov * (Math.PI / 180)) * 0.08;

  const [isReady, setIsReady] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    // Fade in the background immediately to give user feedback
    gsap.fromTo(containerRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (isReady) {
      // Fade out loader
      gsap.to(loaderRef.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" });
      // Cinematic fade and scale in for the 3D scene
      gsap.fromTo(canvasRef.current, 
        { opacity: 0, scale: 1.05 }, 
        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.2 }
      );
    }
  }, [isReady]);

  const handleClose = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: onClose
    });
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black text-white touch-none"
    >
      {/* 
        A clean, premium architectural dark taupe background.
        This provides atmospheric depth without risking WebGL blur artifacts.
      */}
      <div 
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, #2a2622 0%, #151311 50%, #080807 100%)",
        }}
      />

      <button 
        onClick={handleClose}
        className="absolute top-8 right-8 md:top-12 md:right-12 z-50 flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 group cursor-pointer"
        title="Close Viewer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transform group-hover:rotate-90 transition-transform duration-300">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Loading State */}
      <div 
        ref={loaderRef} 
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white/50 pointer-events-none"
      >
        <div className="w-12 h-12 border border-white/20 border-t-white/80 rounded-full animate-spin mb-6"></div>
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase">INITIALIZING SPATIAL VIEW</span>
      </div>

      {/* The WebGL Canvas */}
      <div ref={canvasRef} className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing opacity-0">
        {/* Dynamic FOV normalizes the scale so every gallery looks perfectly consistent! */}
        <Canvas camera={{ position: [0, 0, 0.001], fov: dynamicFov }}>
          <Suspense fallback={null}>
            <GalleryScene images={images} onReady={() => setIsReady(true)} />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableDamping={true}
            dampingFactor={0.05}
            autoRotate={true}
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 2 - polarLimit} 
            maxPolarAngle={Math.PI / 2 + polarLimit}
          />
        </Canvas>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/40 pointer-events-none z-30 transition-opacity duration-1000" style={{ opacity: isReady ? 1 : 0 }}>
        <svg width="32" height="12" viewBox="0 0 32 12" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-70">
          <path d="M1 6h30M1 6l5-5M1 6l5 5M31 6l-5-5M31 6l-5 5" />
        </svg>
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase">Pan to Explore</span>
      </div>
    </div>
  );
}
