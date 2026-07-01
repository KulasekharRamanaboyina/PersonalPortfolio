'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../../providers/CursorProvider';

export const Cursor = () => {
  const { cursorType, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor movement
  const springConfig = { damping: 35, stiffness: 350, mass: 0.35 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

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

  // Map cursorType to custom sizing, colors, and border shapes
  const variants = {
    default: {
      width: 14,
      height: 14,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      border: '1px solid #FFFFFF',
      opacity: 1,
    },
    hover: {
      width: 28,
      height: 28,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid #FFFFFF',
      opacity: 1,
    },
    magnetic: {
      width: 44,
      height: 44,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      border: '2px solid #FFFFFF', // Mix-blend-difference will render white as blue/invert
      opacity: 0.8,
    },
    text: {
      width: 4,
      height: 24,
      borderRadius: '2px',
      backgroundColor: '#FFFFFF',
      border: 'none',
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
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] hidden md:flex items-center justify-center mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={cursorType}
      variants={variants}
      transition={{ type: 'spring', ...springConfig }}
    >
      {cursorText && (
        <span className="text-[9px] text-white font-bold uppercase tracking-wider whitespace-nowrap">
          {cursorText}
        </span>
      )}
    </motion.div>
  );
};

export default Cursor;
