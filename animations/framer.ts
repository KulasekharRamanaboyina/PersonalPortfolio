import { Variants } from 'framer-motion';

export const EASE_PRESETS = {
  luxury: [0.16, 1, 0.3, 1] as [number, number, number, number], // Custom cubic-bezier for high-end luxury feel
  fast: [0.25, 1, 0.5, 1] as [number, number, number, number],
  bounce: [0.175, 0.885, 0.32, 1.275] as [number, number, number, number],
};

export const fadeInUp = (delay = 0, duration = 0.8): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: EASE_PRESETS.luxury, delay },
  },
});

export const fadeIn = (delay = 0, duration = 0.5): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration, ease: 'easeOut', delay },
  },
});

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const blurReveal = (delay = 0): Variants => ({
  hidden: { opacity: 0, filter: 'blur(8px)', y: 15 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.8, ease: EASE_PRESETS.luxury, delay },
  },
});

export const clipPathReveal = (delay = 0): Variants => ({
  hidden: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
  visible: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: { duration: 1.2, ease: EASE_PRESETS.luxury, delay },
  },
});

export const scaleReveal = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_PRESETS.luxury, delay },
  },
});
