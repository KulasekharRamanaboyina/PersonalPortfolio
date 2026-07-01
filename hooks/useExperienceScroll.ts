'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom GSAP ScrollTrigger hook to create a pinned horizontal scrolling experience.
 * Incorporates 3D Y-rotation tilt, active-scaling (1.05), inactive-scale (0.95), opacity (0.75), 
 * 3D translateZ depth shifts, stagger entry blurs, and progress connector tracking.
 */
export const useExperienceScroll = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  scrollRef: React.RefObject<HTMLDivElement | null>,
  progressRef: React.RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    const container = document.getElementById('story-flow') || containerRef.current;
    const scrollEl = scrollRef.current;
    const progressBar = progressRef.current;

    if (!container || !scrollEl) return;

    // Apply horizontal scroll triggers on viewport widths matching lg (1024px)
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    
    const initScrollAnimation = () => {
      if (!mediaQuery.matches) return;

      const totalScrollWidth = container.scrollWidth;
      const viewportWidth = window.innerWidth;
      
      // Horizontal offset translations
      const xTranslation = -(totalScrollWidth - viewportWidth);

      // Pinned parent ScrollTrigger
      const trigger = ScrollTrigger.create({
        trigger: container,
        pin: true,
        scrub: 1.2,
        start: 'top top',
        end: () => `+=${totalScrollWidth - viewportWidth}`,
        invalidateOnRefresh: true,
        animation: gsap.to(container, {
          x: xTranslation,
          ease: 'none',
        }),
      });

      // Synchronize timeline progress line connector
      let progressTrigger = null;
      if (progressBar) {
        progressTrigger = ScrollTrigger.create({
          trigger: container,
          start: 'top top',
          end: () => `+=${totalScrollWidth - viewportWidth + 300}`,
          scrub: 1.2,
          animation: gsap.fromTo(
            progressBar,
            { scaleX: 0 },
            { scaleX: 1, ease: 'none', transformOrigin: 'left' }
          ),
        });
      }

      const cards = scrollEl.querySelectorAll('.experience-card-horizontal');

      // Staggered viewport entrance transitions on load (blur-to-sharp reveals)
      const cardAnimations = Array.from(cards).map((card) => {
        return ScrollTrigger.create({
          trigger: card,
          containerAnimation: trigger.animation,
          start: 'left 95%',
          toggleActions: 'play none none reverse',
          animation: gsap.fromTo(
            card,
            { opacity: 0, y: 70, scale: 0.93, filter: 'blur(8px)' },
            { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' }
          ),
        });
      });

      // Active card 3D rotation, scaling (1.05 active / 0.95 inactive), and depth offsets
      const activeCardTriggers = Array.from(cards).map((card) => {
        const innerCard = card.querySelector('.exp-inner-card');
        if (!innerCard) return null;

        // Two-stage timeline: scale up to 1.05 and translateZ forward, then scale back down
        const tl = gsap.timeline();
        tl.fromTo(
          innerCard,
          { 
            scale: 0.96, 
            opacity: 0.85, 
            rotateY: 6,
            translateZ: -15,
            transformPerspective: 1000,
            borderColor: 'rgba(0, 0, 0, 0.05)',
          },
          { 
            scale: 1.03, 
            opacity: 1, 
            rotateY: 0,
            translateZ: 20,
            transformPerspective: 1000,
            borderColor: 'rgba(11, 61, 145, 0.3)',
            duration: 0.5,
            ease: 'power1.out',
          }
        ).to(
          innerCard,
          { 
            scale: 0.96, 
            opacity: 0.85, 
            rotateY: -6,
            translateZ: -15,
            transformPerspective: 1000,
            borderColor: 'rgba(0, 0, 0, 0.05)',
            duration: 0.5,
            ease: 'power1.in',
          }
        );

        return ScrollTrigger.create({
          trigger: card,
          containerAnimation: trigger.animation,
          start: 'left right', 
          end: 'right left',   
          scrub: true,
          animation: tl,
        });
      }).filter(Boolean) as ScrollTrigger[];

      return { trigger, progressTrigger, cardAnimations, activeCardTriggers };
    };

    let animationObj = initScrollAnimation();

    const handleResize = () => {
      if (animationObj) {
        animationObj.trigger.kill();
        animationObj.progressTrigger?.kill();
        animationObj.cardAnimations.forEach((anim) => anim.kill());
        animationObj.activeCardTriggers.forEach((anim) => anim.kill());
      }
      ScrollTrigger.refresh();
      animationObj = initScrollAnimation();
    };

    mediaQuery.addEventListener('change', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
      window.removeEventListener('resize', handleResize);
      if (animationObj) {
        animationObj.trigger.kill();
        animationObj.progressTrigger?.kill();
        animationObj.cardAnimations.forEach((anim) => anim.kill());
        animationObj.activeCardTriggers.forEach((anim) => anim.kill());
      }
    };
  }, [containerRef, scrollRef, progressRef]);
};

export default useExperienceScroll;
