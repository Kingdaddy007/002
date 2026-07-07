"use client";

import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function GsapProvider({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    const refreshScrollTriggers = () => {
      // Delay refresh by 2 frames so Lenis and the DOM can settle
      // after the preloader releases body overflow.
      // Without this, pin positions are stale on mobile.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    };

    if (window.hasPreloaderCompleted) {
      refreshScrollTriggers();
    }

    window.addEventListener("preloaderComplete", refreshScrollTriggers);

    return () => {
      window.removeEventListener("preloaderComplete", refreshScrollTriggers);
    };
  }, []);

  return <>{children}</>;
}
