'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ScrollIndicator = () => {
  return (
    <div className="flex flex-col items-center gap-2 select-none pointer-events-none">
      <span className="font-body text-[10px] md:text-xs font-semibold tracking-widest text-foreground/40 uppercase">
        Scroll
      </span>
      <div className="w-[18px] h-[30px] md:w-[22px] md:h-[36px] border border-foreground/20 rounded-full flex justify-center p-1">
        <motion.div
          className="w-1.2 h-1.5 md:w-1.5 md:h-2 bg-foreground/60 rounded-full"
          animate={{
            y: [0, 10, 0],
            opacity: [1, 0.4, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  );
};

export default ScrollIndicator;
