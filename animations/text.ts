import React from 'react';

/**
 * Helper to split text into words, preserving spaces
 */
export const splitWords = (text: string) => {
  return text.split(' ').map((word, idx) => ({
    text: word,
    id: `w-${idx}`,
  }));
};

/**
 * Helper to split text into individual characters (letters)
 */
export const splitChars = (text: string) => {
  return Array.from(text).map((char, idx) => ({
    text: char === ' ' ? '\u00A0' : char, // Use non-breaking space for layout
    id: `c-${idx}`,
  }));
};

/**
 * Common GSAP configuration for text split reveal (letters/words sliding up)
 */
export const textRevealAnimation = (
  targets: string | HTMLElement | HTMLElement[],
  delay = 0,
  stagger = 0.02
) => {
  return {
    y: '0%',
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out',
    stagger: stagger,
    delay: delay,
  };
};
