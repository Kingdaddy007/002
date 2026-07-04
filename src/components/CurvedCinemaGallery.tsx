"use client";

import React, { Suspense, useRef, useLayoutEffect, useEffect } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
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
    // Because we are looking at the inside of the cylinder (BackSide),
    // we need to flip the texture horizontally so it doesn't appear backwards.
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

function GalleryScene({ images }: { images: string[] }) {
  const N = images.length;
  
  // Room configuration
  // The panelWidth is relative to the 3D space. 
  // By calculating the radius based on N, the room scales dynamically
  // so the curvature always feels appropriate whether there are 4 or 11 images.
  const panelWidth = 12; 
  const gap = 0.15; // Extremely tight, hairline gap so it feels like architectural screens, not floating cards
  const effectivePanelWidth = panelWidth - gap;
  
  const circumference = panelWidth * N;
  const radius = circumference / (2 * Math.PI);
  
  // Height for a 16:9 ratio
  const height = effectivePanelWidth * (9 / 16);

  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // A subtle cinematic entry spin
    if (groupRef.current) {
      gsap.fromTo(groupRef.current.rotation, 
        { y: Math.PI / 8 }, 
        { y: 0, duration: 2, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <group ref={groupRef}>
      {images.map((url, i) => {
        const thetaStart = i * (2 * Math.PI / N);
        const thetaLength = effectivePanelWidth / radius;
        return (
          <GalleryPanel 
            key={url} 
            url={url} 
            radius={radius} 
            height={height} 
            thetaStart={thetaStart} 
            thetaLength={thetaLength} 
          />
        );
      })}
    </group>
  );
}

export default function CurvedCinemaGallery({ images, onClose }: CurvedCinemaGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    gsap.fromTo(containerRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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
      {/* Cinematic Ambient Background - Deep Warm Taupe instead of pure black */}
      <div 
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, #1c1a18 0%, #11100f 60%, #080807 100%)",
        }}
      />

      <button 
        onClick={handleClose}
        className="absolute top-8 right-8 z-50 text-white font-sans text-xs tracking-[0.2em] uppercase hover:opacity-70 transition-opacity cursor-pointer"
      >
        Close ✕
      </button>

      {/* The WebGL Canvas */}
      <div className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 0.001], fov: 60 }}>
          {/* Add fog to make the far edges of the cylinder fade smoothly into the background color */}
          <fog attach="fog" args={['#1c1a18', 5, 25]} />
          
          <Suspense fallback={null}>
            <GalleryScene images={images} />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableDamping={true}
            dampingFactor={0.05}
            // Restrict vertical looking so they can't see the empty top/bottom of the cylinder
            minPolarAngle={Math.PI / 2 - 0.15} 
            maxPolarAngle={Math.PI / 2 + 0.15}
          />
        </Canvas>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40 font-sans text-xs tracking-[0.3em] uppercase pointer-events-none z-20">
        Drag to Explore
      </div>
    </div>
  );
}
