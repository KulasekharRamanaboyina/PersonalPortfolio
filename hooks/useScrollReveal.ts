'use client';

import { useEffect, useRef } from 'react';
import { initScrollReveal } from '../animations/scroll';

/**
 * GSAP hook to bind a DOM node to a ScrollTrigger reveal animation
 * @param options GSAP configurations for position offsets, opacity, stagger, and delays
 */
export const useScrollReveal = <T extends HTMLElement>(
  options: Parameters<typeof initScrollReveal>[1] = {}
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const animation = initScrollReveal(element, options);

    return () => {
      animation.kill();
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
    };
    // Only run on mount to prevent trigger recreation on render updates
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
};

export default useScrollReveal;
