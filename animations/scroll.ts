import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Standardized ScrollTrigger reveal utility
 */
export const initScrollReveal = (
  element: HTMLElement,
  options: {
    y?: number;
    x?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    start?: string;
    stagger?: number;
  } = {}
) => {
  const {
    y = 30,
    x = 0,
    opacity = 0,
    duration = 1,
    delay = 0,
    ease = 'power3.out',
    start = 'top 85%',
    stagger = 0,
  } = options;

  return gsap.fromTo(
    element,
    { opacity, y, x },
    {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Creates scroll-driven parallax translations for elements
 */
export const initScrollParallax = (
  element: HTMLElement,
  speedMultiplier: number // negative value = scrolls slower, positive = scrolls faster
) => {
  return gsap.to(element, {
    yPercent: speedMultiplier * 50,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};
