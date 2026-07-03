'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../../constants/navigation';
import { cn } from '../../lib/utils';
import { useCursor } from '../../providers/CursorProvider';

export const Navbar = () => {
  const { setCursorType } = useCursor();
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Smoothly shrink and blur navbar on scroll using ScrollTrigger scrub
    const navAnim = gsap.to('#navbar nav', {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: '+=120',
        scrub: true,
      },
      paddingTop: '8px',
      paddingBottom: '8px',
      paddingLeft: '24px',
      paddingRight: '24px',
      maxWidth: '640px',
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
      borderColor: 'rgba(15, 15, 15, 0.05)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
      '--nav-blur': '16px',
      ease: 'none',
    });

    // 2. Track active section to update navigation active links
    const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
    const triggers = sections.map((id) => {
      return ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(id);
          }
        },
      });
    });

    return () => {
      navAnim.kill();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <header
      id="navbar"
      className="fixed top-0 left-0 w-full z-50 flex flex-col items-center p-4"
    >
      <nav
        className="flex items-center justify-between rounded-full w-full border font-body select-none transition-all duration-300"
        style={{
          paddingTop: '20px',
          paddingBottom: '20px',
          paddingLeft: '32px',
          paddingRight: '32px',
          maxWidth: '1024px',
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderColor: 'rgba(15, 15, 15, 0)',
          backdropFilter: 'blur(var(--nav-blur))',
          WebkitBackdropFilter: 'blur(var(--nav-blur))',
          '--nav-blur': '0px',
        } as React.CSSProperties}
      >
        {/* Brand Initial */}
        <a
          href="#home"
          className="font-logo italic font-semibold text-xl tracking-wider text-foreground hover:text-navy transition-colors duration-300"
          onMouseEnter={() => setCursorType('hover')}
          onMouseLeave={() => setCursorType('default')}
        >
          KS.
        </a>

        {/* Navigation Links - Desktop Only */}
        <div className="hidden md:flex items-center gap-4 sm:gap-6 md:gap-8">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  'text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 relative py-1',
                  isActive ? 'text-navy font-bold' : 'text-foreground/60 hover:text-navy'
                )}
                onMouseEnter={() => setCursorType('hover')}
                onMouseLeave={() => setCursorType('default')}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-[1.5px] bg-navy rounded-full nav-active-underline" />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200/50 bg-white/50 text-foreground hover:text-navy transition-colors cursor-pointer"
          onMouseEnter={() => setCursorType('hover')}
          onMouseLeave={() => setCursorType('default')}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-x-4 top-24 z-40 md:hidden rounded-3xl p-6 flex flex-col gap-4 border border-neutral-200/50 shadow-2xl"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-xs font-bold tracking-widest uppercase transition-all duration-300 py-3.5 px-5 rounded-2xl flex items-center justify-between',
                      isActive
                        ? 'text-navy bg-blue-500/5 font-black'
                        : 'text-foreground/75 hover:text-navy hover:bg-neutral-50'
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-navy animate-pulse" />
                    )}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
