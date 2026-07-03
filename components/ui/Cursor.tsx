'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../../providers/CursorProvider';

export const Cursor = () => {
  const { cursorType, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Outer ring spring (slower, floating catch-up effect)
  const ringSpringConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  // Inner dot spring (faster, precise responsive effect)
  const dotSpringConfig = { damping: 40, stiffness: 450, mass: 0.15 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    // Hide mouse follower on touch screens
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  // Outer ring variants (colored blue with custom glow)
  const ringVariants = {
    default: {
      width: 28,
      height: 28,
      backgroundColor: 'rgba(37, 99, 235, 0.01)',
      border: '1.5px solid rgba(37, 99, 235, 0.45)',
      boxShadow: '0 0 12px rgba(37, 99, 235, 0.35), inset 0 0 8px rgba(37, 99, 235, 0.1)',
      opacity: 1,
    },
    hover: {
      width: 44,
      height: 44,
      backgroundColor: 'rgba(37, 99, 235, 0.08)',
      border: '2px solid rgba(37, 99, 235, 0.8)',
      boxShadow: '0 0 20px rgba(37, 99, 235, 0.6), inset 0 0 12px rgba(37, 99, 235, 0.3)',
      opacity: 1,
    },
    magnetic: {
      width: 56,
      height: 56,
      backgroundColor: 'rgba(37, 99, 235, 0.12)',
      border: '2px solid rgba(37, 99, 235, 0.9)',
      boxShadow: '0 0 25px rgba(37, 99, 235, 0.7), inset 0 0 16px rgba(37, 99, 235, 0.4)',
      opacity: 1,
    },
    text: {
      width: 0,
      height: 0,
      opacity: 0,
    },
    hide: {
      width: 0,
      height: 0,
      opacity: 0,
    },
  };

  // Inner dot variants
  const dotVariants = {
    default: {
      width: 6,
      height: 6,
      backgroundColor: '#2563eb',
      boxShadow: '0 0 8px rgba(37, 99, 235, 0.8)',
      borderRadius: '50%',
      opacity: 1,
    },
    hover: {
      width: 8,
      height: 8,
      backgroundColor: '#1d4ed8',
      boxShadow: '0 0 12px rgba(29, 78, 216, 0.9)',
      borderRadius: '50%',
      opacity: 1,
    },
    magnetic: {
      width: 4,
      height: 4,
      backgroundColor: '#1d4ed8',
      boxShadow: '0 0 8px rgba(29, 78, 216, 0.8)',
      borderRadius: '50%',
      opacity: 0.6,
    },
    text: {
      width: 2,
      height: 24,
      backgroundColor: '#2563eb',
      boxShadow: '0 0 8px rgba(37, 99, 235, 0.6)',
      borderRadius: '1px',
      opacity: 1,
    },
    hide: {
      width: 0,
      height: 0,
      opacity: 0,
    },
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] hidden md:flex items-center justify-center mix-blend-normal"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={cursorType}
        variants={ringVariants}
        transition={{ type: 'spring', ...ringSpringConfig }}
      >
        {cursorText && (
          <span className="text-[9px] text-[#2563eb] font-bold uppercase tracking-wider whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] hidden md:block mix-blend-normal"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={cursorType}
        variants={dotVariants}
        transition={{ type: 'spring', ...dotSpringConfig }}
      />
    </>
  );
};

export default Cursor;
