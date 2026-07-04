"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

interface CurvedCinemaGalleryProps {
  images: string[];
  onClose: () => void;
}

export default function CurvedCinemaGallery({ images, onClose }: CurvedCinemaGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [panelWidth, setPanelWidth] = useState(600);
  
  const N = images.length;
  const theta = 360 / N;

  useEffect(() => {
    const handleResize = () => {
      setPanelWidth(window.innerWidth > 768 ? window.innerWidth * 0.5 : window.innerWidth * 0.85);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const radius = Math.round((panelWidth / 2) / Math.tan(Math.PI / N)) + 20;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    gsap.fromTo(containerRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    
    gsap.fromTo(ringRef.current,
      { scale: 0.8, rotateY: -30 },
      { scale: 1, rotateY: 0, duration: 1.2, ease: "power4.out" }
    );

    if (ringRef.current) {
      const proxy = document.createElement("div");
      
      Draggable.create(proxy, {
        trigger: containerRef.current,
        type: "x",
        onDrag: function() {
          const rotation = this.x * 0.3;
          gsap.set(ringRef.current, { rotateY: rotation });
        }
      });
    }

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
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden touch-none"
      style={{ perspective: "1200px" }}
    >
      <button 
        onClick={handleClose}
        className="absolute top-8 right-8 md:top-12 md:right-12 z-50 text-white font-sans text-xs tracking-[0.2em] uppercase hover:opacity-70 transition-opacity cursor-pointer"
      >
        Close ✕
      </button>

      <div 
        ref={ringRef}
        className="relative flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ 
          transformStyle: "preserve-3d", 
          width: panelWidth, 
          height: panelWidth * 0.5625 
        }}
      >
        {images.map((src, index) => {
          const rotation = index * theta;
          return (
            <div
              key={index}
              className="absolute top-0 left-0 w-full h-full"
              style={{
                transform: `rotateY(${rotation}deg) translateZ(${radius}px)`,
                backfaceVisibility: "hidden"
              }}
            >
              <div className="relative w-full h-full bg-[#111]">
                <Image 
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 85vw, 50vw"
                  unoptimized={true}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 font-sans text-xs tracking-widest uppercase pointer-events-none">
        Drag to Explore
      </div>
    </div>
  );
}
