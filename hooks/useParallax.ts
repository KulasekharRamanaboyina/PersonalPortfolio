'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * GSAP mouse movement parallax effect hook
 * Translates elements based on the cursor's displacement from the screen center
 * @param strength Distance in pixels the element is allowed to travel (default 30)
 */
export const useParallax = <T extends HTMLElement>(strength = 30) => {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    // Disable on touch devices for accessibility and performance
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const element = elementRef.current;
      if (!element) return;

      const { clientX, clientY } = e;
      
      // Calculate normalized position (-1 to 1) relative to screen center
      const normX = (clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const normY = (clientY - window.innerHeight / 2) / (window.innerHeight / 2);

      // Smoothly animate translations based on strength coefficients
      gsap.to(element, {
        x: normX * strength,
        y: normY * strength,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [strength]);

  return elementRef;
};

export default useParallax;
