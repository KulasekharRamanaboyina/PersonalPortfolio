'use client';

import React from 'react';
import { NAV_ITEMS } from '../../constants/navigation';
import { SOCIALS } from '../../constants/socials';
import { useCursor } from '../../providers/CursorProvider';

export const Footer = () => {
  const { setCursorType } = useCursor();

  return (
    <footer className="w-full bg-[#0F0F0F] text-white py-12 md:py-16 select-none font-body">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="font-logo italic font-semibold text-lg md:text-xl tracking-wider mb-2 block text-white">
            KS.
          </span>
          <p className="text-[10px] md:text-xs text-neutral-400 font-light tracking-wide">
            © 2026 Kulasekhar Ramanaboyina. All rights reserved.
          </p>
        </div>

        {/* Links and Nav Shortcuts */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex flex-wrap justify-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors duration-300"
                onMouseEnter={() => setCursorType('hover')}
                onMouseLeave={() => setCursorType('default')}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Social Handles */}
          <div className="flex gap-4">
            {SOCIALS.map((soc) => (
              <a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] md:text-xs text-neutral-400 hover:text-white transition-colors duration-300 font-medium tracking-wide"
                onMouseEnter={() => setCursorType('hover')}
                onMouseLeave={() => setCursorType('default')}
              >
                {soc.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
