import gsap from 'gsap';

interface HeroAnimationProps {
  navbarRef: HTMLElement | null;
  headingCharsRef: HTMLElement[] | null;
  subtitleRef: HTMLElement | null;
  portraitContainerRef: HTMLElement | null;
  portraitImageRef: HTMLElement | null;
  widgetsRef: HTMLElement[] | null;
  ctaRef: HTMLElement | null;
  socialsRef: HTMLElement | null;
  scrollIndicatorRef: HTMLElement | null;
  glowsRef?: HTMLElement[] | null;
  glassesRef?: HTMLElement[] | null;
  svgsRef?: HTMLElement[] | null;
  particlesRef?: HTMLElement[] | null;
}

/**
 * Orchestrates the entry animation of the portfolio after preloading is complete
 */
export const animateHeroEntrance = ({
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
}: HeroAnimationProps) => {
  const tl = gsap.timeline({
    defaults: { ease: 'power4.out' },
  });

  // 0. Background Elements entrance
  if (glowsRef && glowsRef.length > 0) {
    tl.fromTo(
      glowsRef,
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2.2, ease: 'power2.out', stagger: 0.15 },
      '0'
    );
  }
  if (glassesRef && glassesRef.length > 0) {
    tl.fromTo(
      glassesRef,
      { scale: 0.5, opacity: 0, rotate: -15 },
      { scale: 1, opacity: 1, rotate: 0, duration: 2.0, ease: 'power3.out', stagger: 0.2 },
      '0.2'
    );
  }
  if (svgsRef && svgsRef.length > 0) {
    tl.fromTo(
      svgsRef,
      { opacity: 0 },
      { opacity: 0.2, duration: 2.5, ease: 'power2.out', stagger: 0.2 },
      '0.3'
    );
  }
  if (particlesRef && particlesRef.length > 0) {
    tl.fromTo(
      particlesRef,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.8, ease: 'power2.out', stagger: 0.1 },
      '0.4'
    );
  }

  // 1. Navbar entry
  if (navbarRef) {
    tl.fromTo(
      navbarRef,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      '0'
    );
  }

  // 2. Heading character slide up (staggered)
  if (headingCharsRef && headingCharsRef.length > 0) {
    tl.fromTo(
      headingCharsRef,
      { y: '105%' },
      { y: '0%', duration: 1.4, ease: 'power4.out', stagger: 0.03 },
      '0.2'
    );
  }

  // 3. Subtitle / Title description reveal
  if (subtitleRef) {
    tl.fromTo(
      subtitleRef,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '0.6'
    );
  }

  // 4. Portrait clip-path diagonal wipe & scale down
  if (portraitContainerRef && portraitImageRef) {
    tl.fromTo(
      portraitContainerRef,
      { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.6,
        ease: 'power4.inOut',
      },
      '0.4'
    );

    tl.fromTo(
      portraitImageRef,
      { scale: 1.2 },
      { scale: 1.0, duration: 1.8, ease: 'power3.out' },
      '0.4' // Runs concurrently with the clipPath reveal
    );
  }

  // 5. Floating widgets and technology badges
  if (widgetsRef && widgetsRef.length > 0) {
    tl.fromTo(
      widgetsRef,
      { scale: 0.9, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.15 },
      '0.8'
    );
  }

  // 6. Call to Action buttons
  if (ctaRef) {
    tl.fromTo(
      ctaRef,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '1.0'
    );
  }

  // 7. Social channels
  if (socialsRef) {
    tl.fromTo(
      socialsRef,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '1.2'
    );
  }

  // 8. Scroll indicator fade in
  if (scrollIndicatorRef) {
    tl.fromTo(
      scrollIndicatorRef,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.out' },
      '1.4'
    );
  }

  return tl;
};
