'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NAV_ITEMS } from '../../constants/navigation';
import { cn } from '../../lib/utils';
import { useCursor } from '../../providers/CursorProvider';

export const Navbar = () => {
  const { setCursorType } = useCursor();
  const [activeSection, setActiveSection] = useState('home');

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
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
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
      className="fixed top-0 left-0 w-full z-50 flex justify-center p-4"
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
          backdropFilter: 'blur(0px)',
          WebkitBackdropFilter: 'blur(0px)',
        }}
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

        {/* Navigation Links */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
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
      </nav>
    </header>
  );
};

export default Navbar;
