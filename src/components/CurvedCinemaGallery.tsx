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

  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
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
            key={`fg-${url}`} 
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
      {/* 
        A clean, premium architectural dark taupe background.
        This provides atmospheric depth without risking WebGL blur artifacts.
      */}
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
          {/* Subtle 3D fog matching the CSS background color so the cylinder fades gracefully */}
          <fog attach="fog" args={['#1c1a18', 5, 30]} />
          
          <Suspense fallback={null}>
            <GalleryScene images={images} />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableDamping={true}
            dampingFactor={0.05}
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
