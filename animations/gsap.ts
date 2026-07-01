import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger globally for client-side environments
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // Set default ease settings
  gsap.defaults({
    ease: 'power3.out',
    duration: 1,
  });
}

export { gsap, ScrollTrigger };
