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
    // We let Lenis handle smooth scrolling instead of normalizeScroll
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  return <>{children}</>;
}
