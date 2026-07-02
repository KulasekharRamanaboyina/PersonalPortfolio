'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Heading from '../ui/Heading';
import Reveal from '../ui/Reveal';

interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  period: string;
  type: 'ON-SITE' | 'VIRTUAL' | 'REMOTE';
  logoIcon: React.ReactNode;
  summary: string;
  responsibilities: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    year: '2023',
    role: 'Web Development Intern',
    company: 'Neural Arc Global Pvt. Ltd, Coimbatore',
    period: 'Jun 2023 – Jul 2023',
    type: 'ON-SITE',
    logoIcon: <Image src="/images/experience/neural-arc.jpg" alt="Neural Arc Global" width={48} height={48} className="w-full h-full object-cover" />,
    summary: 'Worked on developing and maintaining web applications and internal tools.',
    responsibilities: [
      'Developed responsive web pages using HTML, CSS, JavaScript.',
      'Worked on PHP based modules and bug fixes.',
      'Assisted in building UI components and integrating APIs.',
      'Optimized website performance and improved UI/UX.',
    ],
  },
  {
    year: '2024',
    role: 'Web Developer Intern',
    company: 'Coincent.ai',
    period: 'Jun 2024 – Jul 2024',
    type: 'VIRTUAL',
    logoIcon: <Image src="/images/experience/coincent.jpg" alt="Coincent.ai" width={48} height={48} className="w-full h-full object-cover" />,
    summary: 'Worked on building and maintaining web applications for AI-driven solutions.',
    responsibilities: [
      'Built responsive UI using React.js and Tailwind CSS.',
      'Integrated REST APIs and handled data efficiently.',
      'Optimized performance and improved user experience.',
      'Collaborated in an agile environment for continuous delivery.',
    ],
  },
  {
    year: '2025-26',
    role: "Founder's Office",
    company: 'all4Ps Private Limited',
    period: 'Aug 2025 – Jun 2026',
    type: 'ON-SITE',
    logoIcon: <Image src="/images/experience/all4ps.jpg" alt="all4Ps Private Limited" width={48} height={48} className="w-full h-full object-cover" />,
    summary: 'Worked closely with the founders on strategic initiatives and internal projects.',
    responsibilities: [
      'Led development of an internal Project Management Tool.',
      'Coordinated cross-functional teams and tracked execution.',
      'Supported lead generation, client coordination, and operations.',
      'Contributed to websites, AI initiatives, automation, and internal systems.',
    ],
  },
  {
    year: '2026',
    role: 'Software Engineer Trainee',
    company: 'Quantira Technologies',
    period: 'Jun 2026 – Present',
    type: 'ON-SITE',
    logoIcon: <Image src="/images/experience/quantira.jpg" alt="Quantira Technologies" width={48} height={48} className="w-full h-full object-cover" />,
    summary: 'Building modern web applications and learning advanced engineering practices.',
    responsibilities: [
      'Developing scalable applications using React and Next.js.',
      'Building reusable components and clean UI systems.',
      'Collaborating on production-level projects.',
      'Learning performance optimization and modern architectures.',
    ],
  },
];

interface ExperienceCardProps {
  exp: ExperienceItem;
  className?: string;
  isMobile?: boolean;
}

/**
 * Premium Apple Vision Pro style Stateful Solid White Card.
 * Tilts in 3D relative to mouse hover coordinates, sweeps blue radial spotlight sheens,
 * and displays concentric planetary arcs at the bottom.
 */
const ExperienceCard: React.FC<ExperienceCardProps> = ({ exp, className = '', isMobile = false }) => {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return; // Disable interactive tilt on mobile to preserve touch stability

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Relatives from card center (-0.5 to 0.5)
    const relativeX = x / rect.width - 0.5;
    const relativeY = y / rect.height - 0.5;

    // Max 8 degrees tilt rotation
    const tiltX = (relativeY * -8).toFixed(2);
    const tiltY = (relativeX * 8).toFixed(2);

    // Percentage of spotlight coordinates (0% to 100%)
    const lightX = (x / rect.width) * 100;
    const lightY = (y / rect.height) * 100;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px) scale(1.005)`,
      boxShadow: `0 12px 35px rgba(0, 0, 0, 0.05), 0 0 20px rgba(11, 61, 145, 0.08)`,
      backgroundImage: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(11, 61, 145, 0.05) 0%, transparent 60%)`,
      backgroundColor: '#ffffff',
      borderColor: 'rgba(11, 61, 145, 0.35)',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)`,
      boxShadow: `0 8px 30px rgba(0, 0, 0, 0.03)`,
      backgroundImage: `none`,
      backgroundColor: '#ffffff',
      borderColor: 'rgba(0, 0, 0, 0.06)',
    });
  };

  return (
    <div
      className={`exp-inner-card bg-white frosted-noise rounded-[24px] p-6 text-left select-none relative group cursor-pointer overflow-hidden border border-neutral-200/60 transition-all duration-500 ${className}`}
      style={{
        backgroundColor: '#ffffff',
        ...tiltStyle
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic blue dot on top right corner */}
      <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] z-20" />

      {/* Floating blue particles */}
      <div className="absolute top-[20%] left-[30%] w-1.5 h-1.5 bg-navy/40 rounded-full blur-[1px] animate-float-particle-1 pointer-events-none z-0" />
      <div className="absolute bottom-[25%] right-[25%] w-2 h-2 bg-navy/35 rounded-full blur-[2px] animate-float-particle-2 pointer-events-none z-0" />

      {/* Concentric planetary crescents at the bottom */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 h-32 rounded-t-full border-t border-navy/20 bg-gradient-to-t from-navy/5 to-transparent blur-[1.5px] pointer-events-none z-0" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-72 h-36 rounded-t-full border-t border-neutral-200/40 pointer-events-none z-0" />

      {/* Blue ambient backlighting overlay blur */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-navy/5 rounded-full blur-[80px] pointer-events-none z-0 transition-opacity duration-500 group-hover:bg-navy/10" />

      {/* Decorative accent top border glass element */}
      <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-neutral-200/30 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Header - Logo on left, Duration on right */}
          <div className="flex justify-between items-center mb-4 w-full">
            <div className="w-12 h-12 rounded-full border border-neutral-200 bg-neutral-900 flex items-center justify-center group-hover:border-navy/40 transition-all duration-300 flex-shrink-0 overflow-hidden">
              {exp.logoIcon}
            </div>
            <span className="font-body text-xs font-semibold text-neutral-500">
              {exp.period}
            </span>
          </div>

          {/* Job title */}
          <h3 className="font-heading text-lg md:text-xl font-bold text-neutral-900 mb-1.5 leading-snug">
            {exp.role}
          </h3>

          {/* Company and badge */}
          <div className="flex items-center gap-2 mb-4">
            <h4 className="font-heading text-xs md:text-sm font-semibold text-navy">
              {exp.company}
            </h4>
            <span className="px-2 py-0.5 rounded border border-navy/20 bg-navy/5 text-navy font-body text-[8px] font-bold uppercase tracking-wider">
              {exp.type}
            </span>
          </div>

          {/* Professional summary */}
          <p className="font-body text-xs text-neutral-600 font-light mb-4 leading-relaxed">
            {exp.summary}
          </p>

          {/* Dividing line separator */}
          <div className="border-t border-neutral-200/50 w-full mb-4 pointer-events-none" />

          {/* Responsibilities list with custom blue dots */}
          <ul className="space-y-2">
            {exp.responsibilities.map((resp, rIdx) => (
              <li
                key={rIdx}
                className="font-body text-xs text-neutral-700 font-light leading-relaxed flex items-start gap-2.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-navy mt-1.5 flex-shrink-0 shadow-[0_0_4px_rgba(11,61,145,0.6)] animate-pulse" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const Experience = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;

    if (!section || !viewport || !track) return;

    const ctx = gsap.context(() => {
      const setupHorizontalScroll = () => {
        const scrollDistance = Math.max(0, track.scrollWidth - viewport.clientWidth);

        gsap.set(track, { x: 0 });
        if (progress) {
          gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' });
        }

        if (scrollDistance < 8) {
          return undefined;
        }

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${scrollDistance + Math.round(window.innerHeight * 0.35)}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(track, { x: -scrollDistance }, 0);

        if (progress) {
          timeline.to(progress, { scaleX: 1 }, 0);
        }

        const cards = gsap.utils.toArray<HTMLElement>('.experience-slide-card');
        const cardTriggers = cards.map((card) =>
          ScrollTrigger.create({
            trigger: card,
            containerAnimation: timeline,
            start: 'left 80%',
            end: 'right 20%',
            scrub: true,
            animation: gsap
              .timeline()
              .fromTo(
                card,
                { opacity: 0.55, scale: 0.94, y: 24 },
                { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out' }
              )
              .to(card, { opacity: 0.7, scale: 0.96, y: -10, duration: 0.5, ease: 'power2.in' }),
          })
        );

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
          cardTriggers.forEach((trigger) => trigger.kill());
        };
      };

      let cleanup = setupHorizontalScroll();

      const handleResize = () => {
        cleanup?.();
        cleanup = setupHorizontalScroll();
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        cleanup?.();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <Section
      ref={sectionRef}
      id="experience"
      bg="white"
      className="py-16 md:py-20 lg:py-24 min-h-screen flex items-center overflow-hidden"
    >
      <Container className="flex flex-col gap-10 lg:gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-5">
            <Reveal animation="fade-up">
              <span className="font-body text-[10px] md:text-xs font-bold tracking-widest text-navy uppercase mb-3 block">
                02 / HISTORY
              </span>
              <Heading level={2} className="tracking-tighter font-logo italic font-light overflow-hidden py-1">
                Experience <span className="text-navy bg-gradient-to-r from-navy via-blue-500 to-navy bg-clip-text text-transparent">Timeline</span>
              </Heading>
            </Reveal>
          </div>

          <Reveal animation="fade-up" delay={0.08} className="lg:col-span-7">
            <p className="font-body text-sm md:text-base text-neutral-500 font-light leading-relaxed max-w-2xl lg:ml-auto">
              Scroll down to move through the roles, internships, and product work that shaped my engineering practice.
            </p>
          </Reveal>
        </div>

        <div className="relative">
          <div
            ref={viewportRef}
            className="overflow-hidden"
          >
            <div
              ref={trackRef}
              className="flex w-max items-stretch gap-5 sm:gap-6 lg:gap-8 will-change-transform"
            >
              {EXPERIENCES.map((exp) => (
                <div
                  key={`${exp.company}-${exp.year}`}
                  className="experience-slide-card relative w-[calc(100vw-3rem)] max-w-[380px] sm:w-[420px] sm:max-w-none lg:w-[470px] flex-shrink-0 py-6"
                >
                <div className="absolute -top-5 right-5 font-heading text-5xl md:text-6xl font-black text-neutral-100 select-none pointer-events-none z-0">
                  {exp.year}
                </div>
                  <ExperienceCard exp={exp} className="h-full min-h-[360px]" isMobile={true} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-neutral-200 overflow-hidden">
              <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-navy" />
            </div>
            <span className="font-body text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              Scroll
            </span>
              </div>
        </div>
      </Container>
    </Section>
  );
};

export default Experience;
