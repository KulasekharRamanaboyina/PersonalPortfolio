'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLenis } from '../../providers/LenisProvider';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const activeLenis = lenis || (typeof window !== 'undefined' && (window as any).lenis);
    
    const toggleVisibility = () => {
      const scrollPos = activeLenis ? activeLenis.scroll : window.scrollY;
      if (scrollPos > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    if (activeLenis) {
      activeLenis.on('scroll', toggleVisibility);
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
        activeLenis.off('scroll', toggleVisibility);
      };
    }

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [lenis]);

  const scrollToTop = () => {
    const activeLenis = lenis || (typeof window !== 'undefined' && (window as any).lenis);
    if (activeLenis) {
      activeLenis.scrollTo(0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[99] flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white shadow-xl hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 cursor-pointer"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
