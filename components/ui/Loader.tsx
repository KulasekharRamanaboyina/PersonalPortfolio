'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = ['CRAFTSMANSHIP', 'INNOVATION', 'ELEGANCE', 'WELCOME'];

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let start = 0;
    const duration = 2200; // 2.2 seconds total count-up time
    const stepTime = Math.floor(duration / 100);

    const timer = setInterval(() => {
      start += 1;
      if (start >= 100) {
        start = 100;
        setCount(100);
        clearInterval(timer);
        
        // Brief pause on 100% before starting wipe exit
        setTimeout(() => {
          setIsDone(true);
          // Allow exit clipPath animation to complete before clearing loader
          setTimeout(onComplete, 850);
        }, 300);
      } else {
        setCount(start);
      }

      // Cycle word index based on percentage checkpoints
      if (start < 30) setWordIndex(0);
      else if (start < 60) setWordIndex(1);
      else if (start < 85) setWordIndex(2);
      else setWordIndex(3);
    }, stepTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 bg-[#0F0F0F] z-[99999] flex flex-col justify-between p-8 sm:p-12 md:p-16 select-none"
          initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          exit={{
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Top Info */}
          <div className="flex justify-between items-start">
            <span className="font-heading text-[10px] md:text-xs font-semibold tracking-widest text-white/40 uppercase">
              Kulasekhar Ramanaboyina
            </span>
            <span className="font-heading text-[10px] md:text-xs font-semibold tracking-widest text-white/40 uppercase">
              Digital Portfolio Experience
            </span>
          </div>

          {/* Center Changing Text */}
          <div className="overflow-hidden h-24 md:h-32 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={wordIndex}
                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white text-center"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              >
                {WORDS[wordIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Counter & Copy */}
          <div className="flex justify-between items-end border-t border-white/10 pt-6">
            <span className="font-body text-[10px] md:text-xs font-medium text-white/40 tracking-wider">
              © 2026 / PERSONAL PORTFOLIO
            </span>
            <div className="font-heading text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-bold text-white tracking-tight leading-none tabular-nums select-none">
              {count}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
