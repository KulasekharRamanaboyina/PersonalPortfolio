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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M5 2l1.5 17L12 22l5.5-3L19 2H5z" />
        <path d="M8 7h8l-.5 5H9.5l.2 2H15l-.4 4-2.6 1.5-2.6-1.5-.2-2" />
      </svg>
    ),
  },
  {
    name: 'CSS3',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M5 2l1.5 17L12 22l5.5-3L19 2H5z" />
        <path d="M8 7h8l-.6 6H9.4l.2 2H15l-.4 3-2.6 1.5-2.6-1.5-.2-2" />
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M15 9h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v4a2 2 0 0 1-2 2h-1" />
        <path d="M12 9v10" />
      </svg>
    ),
  },
  {
    name: 'React',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 animate-[spin_10s_linear_infinite]">
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M12 2A15.3 15.3 0 0 0 8 12a15.3 15.3 0 0 0 4 10 15.3 15.3 0 0 0 4-10 15.3 15.3 0 0 0-4-10z" />
        <path d="M2 12a15.3 15.3 0 0 1 10-4 15.3 15.3 0 0 1 10 4 15.3 15.3 0 0 1-10 4 15.3 15.3 0 0 1-10-4z" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
        <path d="M12 22V12" />
        <path d="M2 7l10 5 10-5" />
        <path d="M17 14.5a3 3 0 0 0-5-2.2" />
      </svg>
    ),
  },
  {
    name: 'Express.js',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M12 2C8.5 6.5 7 10 7 14c0 3 2 5 5 5s5-2 5-5c0-4-1.5-7.5-5-12z" />
        <path d="M12 2v19" />
      </svg>
    ),
  },
  {
    name: 'Bootstrap',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 7h4a2.5 2.5 0 0 1 0 5H8" />
        <path d="M8 12h5.5a2.5 2.5 0 0 1 0 5H8" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    icon: <GithubIcon size={18} />,
  },
  {
    name: 'Postman',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M4.5 16.5c-1.5 1.25-2.5 3-2.5 4.5h20c0-1.5-1-3.25-2.5-4.5" />
        <path d="M12 2L4.5 16.5h15L12 2z" />
        <circle cx="12" cy="11" r="2" />
      </svg>
    ),
  },
  {
    name: 'Core Java',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
        <path d="M6 2v3" />
        <path d="M10 2v3" />
        <path d="M14 2v3" />
      </svg>
    ),
  },
];

export const Skills = () => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const pillsRef    = useRef<HTMLDivElement>(null);   // the scrolling strip
  const viewportRef = useRef<HTMLDivElement>(null);   // the overflow-hidden viewport

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ── Desktop only: pin + horizontal scroll ──────────────────── */
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const pills    = pillsRef.current;
        const viewport = viewportRef.current;
        const section  = sectionRef.current;
        if (!pills || !viewport || !section) return;

        gsap.set(pills, { display: 'flex', flexWrap: 'wrap', alignItems: 'center', minWidth: 0 });

        // Wait one frame so layout is complete and scrollWidth is accurate
        const init = () => {
          const pillsWidth    = pills.scrollWidth;
          const viewportWidth = viewport.offsetWidth;
          const scrollDist    = pillsWidth - viewportWidth;

          if (scrollDist <= 0) return; // all pills already visible

          gsap.to(pills, {
            x: -scrollDist,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${Math.max(scrollDist + viewport.offsetHeight * 0.75, viewport.offsetHeight * 1.8)}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // After the Skills pin spacer is created, force ALL other
          // ScrollTriggers (especially Projects) to recalculate their
          // start positions so they don't fire while Skills is still pinned.
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 300);
        };

        // Small delay to let fonts/icons render so scrollWidth is correct
        const timer = setTimeout(init, 120);
        return () => clearTimeout(timer);
      });

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
      {/* Section must NOT have overflow-hidden so pin spacer works */}
      <section
        id="skills"
        className="relative w-full bg-white py-20 md:py-28 lg:py-32"
      >
        {/* Ambient orb */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[140px]" />
        </div>

        {/* ── Layout: heading left | pills right ─────────────────── */}
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* LEFT — sticky heading column */}
            <div className="skills-heading lg:col-span-4 flex flex-col items-start">
              <span className="skills-label font-body text-[10px] md:text-xs font-bold tracking-widest text-navy uppercase mb-3 block opacity-0">
                03 / CAPABILITIES
              </span>
              <Heading
                level={2}
                className="tracking-tighter about-heading font-logo italic font-light overflow-hidden py-1"
              >
                {['Tech', 'Stack'].map((word) => (
                  <span key={word} className="inline-block overflow-hidden mr-3">
                    <span className="skills-heading-word inline-block">
                      {word === 'Stack' ? (
                        <span className="text-transparent bg-gradient-to-r from-navy via-blue-500 to-navy bg-clip-text">
                          Stack
                        </span>
                      ) : word}
                    </span>
                  </span>
                ))}
              </Heading>
              <p className="mt-3 font-body text-sm text-neutral-500 font-light leading-relaxed max-w-xs">
                Languages, frameworks & tools I use to ship real products.
              </p>

              {/* Progress hint — desktop only */}
              <div className="hidden">
                <span className="font-body text-[10px] uppercase tracking-widest text-neutral-500">Scroll</span>
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* RIGHT — pill viewport (overflow-hidden clips the scrolling strip) */}
            <div
              ref={viewportRef}
              className="lg:col-span-8 overflow-visible relative"
            >
              {/* Right-edge fade mask */}
              <div className="hidden lg:block absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

              {/* The scrolling strip — GSAP translates this */}
              <div
                ref={pillsRef}
                className="flex items-center gap-3 md:gap-4 will-change-transform flex-wrap min-w-0"
              >
                {SKILLS_LIST.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 px-5 py-3 rounded-full
                               border border-neutral-200 bg-white flex-shrink-0
                               hover:border-navy/40 hover:shadow-[0_0_18px_rgba(37,99,235,0.12)]
                               hover:-translate-y-1
                               transition-all duration-300 group cursor-default select-none"
                  >
                    <span className="text-navy w-5 h-5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </span>
                    <span className="font-heading font-semibold text-xs sm:text-sm text-foreground tracking-wider uppercase whitespace-nowrap">
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
