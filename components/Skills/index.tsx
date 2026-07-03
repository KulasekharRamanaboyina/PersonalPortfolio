'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Heading from '../ui/Heading';
import { GithubIcon } from '../ui/Icons';

interface Skill {
  name: string;
  icon: React.ReactNode;
}

const SKILLS_LIST: Skill[] = [
  {
    name: 'HTML5',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 0h21l-1.9 21.2L12 24 3.4 21.2L1.5 0z" fill="#E34F26"/>
        <path d="M12 2.2v19.4l6.9-1.9L20.4 4H12v-1.8z" fill="#EF652A"/>
        <path d="M12 9.6H7.9l.3 3.4H12v3.2l-3.9-1.1-.3-2.7H4.6l.5 5.9 6.9 1.9V9.6zm0-5.6H7.3l.3 3.3H12V4zm0 5.6h3.9l-.4 4.1-3.5 1v3.2l6.9-1.9.9-9.8H12v3.4zm0-5.6V4h7.5l-.3 3.3H12V4z" fill="#FFF"/>
      </svg>
    ),
  },
  {
    name: 'CSS3',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 0h21l-1.9 21.2L12 24 3.4 21.2L1.5 0z" fill="#1572B6"/>
        <path d="M12 2.2v19.4l6.9-1.9L20.4 4H12v-1.8z" fill="#33A9DC"/>
        <path d="M12 9.6H7.9l.3 3.4H12v3.2l-3.9-1.1-.3-2.7H4.6l.5 5.9 6.9 1.9V9.6zm0-5.6H4.3l.3 3.2H12V4.0z" fill="#EBEBEB"/>
        <path d="M12 9.6h3.9l-.4 4.1-3.5 1v3.2l6.9-1.9.9-9.8H12v3.4zm0-5.6h7.5l-.3 3.2H12V4.0z" fill="#FFF"/>
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 rounded-[3px] overflow-hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0V0z" fill="#F7DF1E"/>
        <path d="M12.9 18.2c.4.7.9 1.3 1.8 1.3.8 0 1.3-.4 1.3-.9 0-.6-.5-.8-1.4-1.2l-.5-.2c-1.3-.5-2.2-1.2-2.2-2.7 0-1.4 1.1-2.5 2.8-2.5 1.2 0 2 .5 2.6 1.4l-1.4.9c-.3-.5-.7-.8-1.2-.8-.5 0-.8.3-.8.7 0 .5.3.7 1 .9l.5.2c1.5.6 2.6 1.3 2.6 2.9 0 1.6-1.2 2.7-3.2 2.7-1.8 0-2.8-.9-3.2-1.9l1.4-.9zm-6.1-2.2c.2.6.7 1 1.4 1 .5 0 .9-.2.9-.8v-4.3H11v6.1c0 1.7-1 2.6-2.8 2.6-1.6 0-2.6-.9-2.9-2.2l1.6-.9z" fill="#000"/>
      </svg>
    ),
  },
  {
    name: 'React',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 animate-[spin_20s_linear_infinite]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 24c-.16 0-.32-.04-.46-.12L2.74 18.8c-.46-.26-.74-.75-.74-1.28V6.48c0-.53.28-1.02.74-1.28L11.54.12c.28-.16.6-.16.88 0l8.8 5.08c.46.26.74.75.74 1.28v11.04c0 .53-.28 1.02-.74 1.28l-8.8 5.08c-.14.08-.3.12-.46.12zm-8-6.28l8 4.62 8-4.62V6.76l-8-4.62-8 4.62v10.96zm8-3.03v-4.14l-3.58 2.07V10.5l3.58-2.07v4.14H9v7.76h2v-4.64l4 2.31v-2.31l-3-1.73z" fill="#339933"/>
      </svg>
    ),
  },
  {
    name: 'Express.js',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12s5.373 12 12 12 12-5.373 12-12zm-14.9 4.5c-1.396 0-2.327-.938-2.327-2.312V9.812c0-1.374.931-2.312 2.327-2.312h1.8c1.396 0 2.327.938 2.327 2.312V12h-4.127v1.813H11v-.75h1.8v1.125c0 1.374-.931 2.312-2.327 2.312zm8.434 0h2.334L15.3 12l4.567-4.5h-2.334L13 12l4.434 4.5z" fill="#FFFFFF"/>
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.193 9.555c-.244-1.282-.871-2.909-1.921-4.708-.43-.728-.888-1.428-1.365-2.091a14.86 14.86 0 00-.776-1.018 2.5 2.5 0 00-.54-.537 1.258 1.258 0 00-.916 0 2.5 2.5 0 00-.54.537c-.245.305-.503.645-.776 1.018-.477.663-.935 1.363-1.365 2.091-1.05 1.799-1.677 3.426-1.921 4.708-.344 1.803-.024 3.753.86 5.437.893 1.696 2.378 3.636 4.397 5.766.195.205.352.205.547 0 2.019-2.13 3.504-4.07 4.397-5.766.884-1.684 1.204-3.634.86-5.437zm-5.193-4.59v13.626C10.741 17.518 9.555 15.65 9.555 13c0-2.65 1.186-4.518 2.445-5.591v-2.444z" fill="#47A248" />
      </svg>
    ),
  },
  {
    name: 'Bootstrap',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4.5A4.5 4.5 0 0 0 19.5 0h-15A4.5 4.5 0 0 0 0 4.5v15A4.5 4.5 0 0 0 4.5 24h15a4.5 4.5 0 0 0 4.5-4.5v-15zM15.42 15.228c0 1.258-1.02 2.278-2.278 2.278H8.354V6.494h4.788c1.258 0 2.278 1.02 2.278 2.278 0 .762-.38 1.417-.96 1.82.58.403.96 1.058.96 1.82v2.816zm-4.788-6.456h2.51c.423 0 .768-.345.768-.768 0-.423-.345-.768-.768-.768h-2.51v1.536zm0 4.596h2.51c.423 0 .768-.345.768-.768s-.345-.768-.768-.768h-2.51v1.536z" fill="#7952B3"/>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
  {
    name: 'Postman',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm4.56 12.87a1.07 1.07 0 0 1-.76.31 1.05 1.05 0 0 1-.76-.31l-.7-.7a1.08 1.08 0 0 1 0-1.52l1.08-1.08a1.08 1.08 0 0 1 1.52 0l.7.7a1.08 1.08 0 0 1 0 1.52l-1.08 1.08zm-2.88-2.88a1.08 1.08 0 0 1-1.52 0l-.7-.7a1.08 1.08 0 0 1 0-1.52l1.08-1.08a1.08 1.08 0 0 1 1.52 0l.7.7a1.08 1.08 0 0 1 0 1.52l-1.08 1.08zm-2.16-2.16a1.08 1.08 0 0 1-1.52 0l-.7-.7a1.08 1.08 0 0 1 0-1.52l1.08-1.08a1.08 1.08 0 0 1 1.52 0l.7.7a1.08 1.08 0 0 1 0 1.52l-1.08 1.08zm-2.16-2.16a1.08 1.08 0 0 1-1.52 0l-.7-.7a1.08 1.08 0 0 1 0-1.52L9.2 2.23a1.08 1.08 0 0 1 1.52 0l.7.7a1.08 1.08 0 0 1 0 1.52l-1.08 1.08zM6.96 16.56a1.08 1.08 0 0 1-1.52 0l-.7-.7a1.08 1.08 0 0 1 0-1.52l1.08-1.08a1.08 1.08 0 0 1 1.52 0l.7.7a1.08 1.08 0 0 1 0 1.52l-1.08 1.08z" fill="#FF6C37"/>
      </svg>
    ),
  },
  {
    name: 'Core Java',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.28 3.5c-.32-1.36-1.63-2.3-3.08-2.3H6.84a.45.45 0 0 0-.45.45v3.15c0 1.99 1.44 3.73 3.4 3.93 2.18.23 3.99-1.46 3.99-3.6V4.1l.5.03c.53.03.95.48.95 1.01 0 .56-.46 1.01-1.02 1.01-.25 0-.45.2-.45.45s.2.45.45.45c1.06 0 1.92-.86 1.92-1.91 0-1.01-.78-1.86-1.8-1.94l-.5-.03zm-3.99-1.4h.87v3.15c0 1.25-.97 2.34-2.22 2.41a2.25 2.25 0 0 1-2.28-2.24V2.1h3.63z" fill="#5382A1"/>
        <path d="M9.18 10.35c.16-.62.77-1.04 1.41-1.04H14.1c1.07 0 1.83.99 1.58 2.03l-1.07 4.29a3.75 3.75 0 0 1-3.64 2.84H9.1c-1.84 0-3.32-1.63-3.07-3.46l.87-3.46a.45.45 0 0 1 .44-.34h1.84zm4.49.8H10.8v3.6h2.25l.62-2.48a.45.45 0 0 0-.3-.32z" fill="#5382A1"/>
        <path d="M4.5 21h15" stroke="#3A6073" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9.5 3c0 2-1.5 3-1.5 4.5S9.5 9 9.5 10.5M12.5 2c0 2.5-2 3.5-2 5.5s2 4 2 5.5" stroke="#F5821F" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export const Skills = () => {
  const sectionRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ── Heading reveal (all screen sizes) ──────────────────────── */
      gsap.fromTo(
        '.skills-label',
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.skills-heading', start: 'top 88%' },
        }
      );
      gsap.fromTo(
        '.skills-heading-word',
        { yPercent: 110 },
        {
          yPercent: 0, duration: 1, stagger: 0.1, ease: 'power4.out',
          scrollTrigger: { trigger: '.skills-heading', start: 'top 88%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative z-10 w-full">
      <section
        id="skills"
        className="relative w-full bg-[#0F0F0F] py-20 md:py-28 lg:py-32 border-t border-white/5"
      >
        {/* Ambient orb */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[140px]" />
        </div>

        {/* ── Layout: heading left | pills right ─────────────────── */}
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* LEFT — heading column */}
            <div className="skills-heading lg:col-span-4 flex flex-col items-start">
              <span className="skills-label font-body text-[10px] md:text-xs font-bold tracking-widest text-blue-400 uppercase mb-3 block opacity-0">
                03 / CAPABILITIES
              </span>
              <Heading
                level={2}
                className="tracking-tighter about-heading font-logo italic font-light overflow-hidden py-1 text-white"
              >
                {['Tech', 'Stack'].map((word) => (
                  <span key={word} className="inline-block overflow-hidden mr-3">
                    <span className="skills-heading-word inline-block">
                      {word === 'Stack' ? (
                        <span className="text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 bg-clip-text">
                          Stack
                        </span>
                      ) : word}
                    </span>
                  </span>
                ))}
              </Heading>
              <p className="mt-3 font-body text-sm text-neutral-300 font-light leading-relaxed max-w-xs">
                Languages, frameworks & tools I use to ship real products.
              </p>
            </div>

            {/* RIGHT — pill container */}
            <div className="lg:col-span-8 relative">
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 md:gap-4 min-w-0">
                {SKILLS_LIST.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 px-5 py-3 rounded-full
                               border border-white/10 bg-white/[0.03] flex-shrink-0
                               hover:border-blue-500/50 hover:bg-white/[0.07] hover:shadow-[0_0_18px_rgba(37,99,235,0.22)]
                               hover:-translate-y-1
                               transition-all duration-300 group cursor-default select-none"
                  >
                    <span className="text-blue-400 w-5 h-5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </span>
                    <span className="font-heading font-semibold text-xs sm:text-sm text-white group-hover:text-blue-400 tracking-wider uppercase whitespace-nowrap transition-colors duration-300">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;
