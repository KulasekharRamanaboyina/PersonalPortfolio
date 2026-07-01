'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * GSAP magnetic effect hook to draw elements toward the mouse pointer
 * @param strength Number between 0 and 1 representing the pull strength (default 0.35)
 */
export const useMagnetic = <T extends HTMLElement>(strength = 0.35) => {
  const magneticRef = useRef<T | null>(null);

  useEffect(() => {
    const element = magneticRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = element.getBoundingClientRect();
      
      // Calculate coordinates relative to the center of the element
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      // Animate the element toward the mouse
      gsap.to(element, {
        x: deltaX * strength,
        y: deltaY * strength,
        duration: 0.35,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      // Return smoothly to original position with elastic damping
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.75,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return magneticRef;
};

export default useMagnetic;
