'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  animation?: 'fade-up' | 'blur' | 'clip';
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  animation = 'fade-up',
  className,
}) => {
  const variants = {
    'fade-up': {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    blur: {
      hidden: { opacity: 0, filter: 'blur(8px)', y: 15 },
      visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
    },
    clip: {
      hidden: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
      visible: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-15%' }}
      variants={variants[animation]}
      transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
