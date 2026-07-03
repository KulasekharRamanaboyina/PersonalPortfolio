'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Check if we are running in browser context
    if (typeof window === 'undefined') return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (window.location.hash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }

    window.scrollTo(0, 0);

    const lenisInst = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    setLenis(lenisInst);
    if (typeof window !== 'undefined') {
      (window as any).lenis = lenisInst;
    }

    // Connect Lenis to ScrollTrigger
    lenisInst.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Synchronize GSAP ticker with Lenis raf
    const updateGsapTicker = (time: number) => {
      lenisInst.raf(time * 1000);
    };
    
    gsap.ticker.add(updateGsapTicker);
    gsap.ticker.lagSmoothing(0);

    // Clean up
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
      gsap.ticker.remove(updateGsapTicker);
      lenisInst.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      <div className="lenis-smooth">
        {children}
      </div>
    </LenisContext.Provider>
  );
};
export default LenisProvider;
