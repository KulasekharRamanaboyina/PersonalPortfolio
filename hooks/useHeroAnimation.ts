'use client';

import { useEffect, useRef } from 'react';
import { animateHeroEntrance } from '../animations/hero';

/**
 * Custom hook to initiate the GSAP Hero Section entrance animation
 * @param startTrigger Boolean that triggers the animation once true (e.g., when the preloader ends)
 */
export const useHeroAnimation = (startTrigger: boolean) => {
  const heroContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!startTrigger) return;

    const container = heroContainerRef.current;
    if (!container) return;

    // Use specific class selectors to retrieve animate-ready nodes
    const navbarRef = document.getElementById('navbar');
    const headingCharsRef = Array.from(
      container.querySelectorAll('.hero-heading-char')
    ) as HTMLElement[];
    const subtitleRef = container.querySelector('.hero-subtitle') as HTMLElement;
    const portraitContainerRef = container.querySelector('.hero-portrait-wrap') as HTMLElement;
    const portraitImageRef = container.querySelector('.hero-portrait-img') as HTMLElement;
    const widgetsRef = Array.from(
      container.querySelectorAll('.hero-floating-badge')
    ) as HTMLElement[];
    const ctaRef = container.querySelector('.hero-cta-wrap') as HTMLElement;
    const socialsRef = container.querySelector('.hero-socials-wrap') as HTMLElement;
    const scrollIndicatorRef = container.querySelector('.hero-scroll-indicator') as HTMLElement;

    const glowsRef = Array.from(
      container.querySelectorAll('.bg-glow-element')
    ) as HTMLElement[];
    const glassesRef = Array.from(
      container.querySelectorAll('.bg-glass-element')
    ) as HTMLElement[];
    const svgsRef = Array.from(
      container.querySelectorAll('.bg-svg-element')
    ) as HTMLElement[];
    const particlesRef = Array.from(
      container.querySelectorAll('.bg-particle-element')
    ) as HTMLElement[];

    // Fire the animation sequence
    const animationTimeline = animateHeroEntrance({
      navbarRef,
      headingCharsRef,
      subtitleRef,
      portraitContainerRef,
      portraitImageRef,
      widgetsRef,
      ctaRef,
      socialsRef,
      scrollIndicatorRef,
      glowsRef,
      glassesRef,
      svgsRef,
      particlesRef,
    });

    // Clean up animation processes if element unmounts
    return () => {
      animationTimeline.kill();
    };
  }, [startTrigger]);

  return heroContainerRef;
};

export default useHeroAnimation;
