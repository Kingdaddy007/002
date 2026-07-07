"use client";

import React, { useEffect, useState } from "react";

export default function MobileBlocker({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Block anything below 1024px (phones and small tablets)
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const blockerUI = (
    <div className="fixed inset-0 z-[99999] bg-xbd-bg flex flex-col items-center justify-center text-center px-8 text-xbd-text h-[100dvh]">
      <div className="max-w-sm flex flex-col items-center justify-center">
        <div className="text-xbd-gold mb-8 opacity-80">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </div>
        <h1 className="text-xl md:text-2xl font-display uppercase tracking-widest text-xbd-gold mb-6">Desktop Optimized</h1>
        <p className="text-sm font-body opacity-70 leading-relaxed">
          This cinematic spatial experience is designed exclusively for large screens. Please open this link on a laptop or desktop computer to proceed.
        </p>
      </div>
    </div>
  );

  if (!mounted) {
    return (
      <>
        <div className="hidden lg:block">{children}</div>
        <div className="lg:hidden">
          {blockerUI}
        </div>
      </>
    );
  }

  if (isMobile) {
    return blockerUI;
  }

  return <>{children}</>;
}
