'use client';

import React, { useRef, useState } from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Heading from '../ui/Heading';
import Reveal from '../ui/Reveal';
import { useExperienceScroll } from '../../hooks/useExperienceScroll';

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
    logoIcon: <img src="/images/experience/neural-arc.jpg" alt="Neural Arc Global" className="w-full h-full object-cover" />,
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
    logoIcon: <img src="/images/experience/coincent.jpg" alt="Coincent.ai" className="w-full h-full object-cover" />,
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
    logoIcon: <img src="/images/experience/all4ps.jpg" alt="all4Ps Private Limited" className="w-full h-full object-cover" />,
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
    logoIcon: <img src="/images/experience/quantira.jpg" alt="Quantira Technologies" className="w-full h-full object-cover" />,
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
    <div id='experience'
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  // Initialize horizontal scrolling ScrollTrigger for desktop viewports
  useExperienceScroll(containerRef, scrollRef, progressRef);

  return (
    <>
      {/* 1. DESKTOP LAYOUT - Horizontal Scroll Track (1024px and up) */}
      <div
        ref={containerRef}
        className="hidden lg:block relative h-screen bg-white flex-shrink-0 overflow-hidden"
        style={{ width: 'fit-content' }}
      >
        <div className="absolute inset-0 mesh-gradient pointer-events-none" />

        <div className="h-full flex flex-row items-center relative z-10 select-none">
          {/* Header Column */}
          {/* <div className="w-[35vw] flex-shrink-0 px-16 flex flex-col items-start justify-center text-left"> */}
          <div className="w-[35vw] flex-shrink-0 pl-90 pr-8 flex flex-col items-start justify-center text-left">
            <span className="font-body text-xs font-bold tracking-widest text-navy uppercase mb-2 block">
              02 / HISTORY
            </span>
            {/* <Heading level={2} className="tracking-tighter text-5xl font-extrabold text-neutral-900 mb-3 leading-tight"> */}
            <Heading level={2} className="tracking-tighter about-heading font-logo italic font-light overflow-hidden py-1">

              Experience <br></br><span className="text-navy bg-gradient-to-r from-navy via-blue-500 to-navy bg-clip-text text-transparent">Timeline</span>
            </Heading>
            <p className="font-body text-sm text-neutral-400 max-w-sm font-light leading-relaxed">
              A journey of continuous learning, building, and creating impact through technology and&nbsp;innovation.
            </p>
          </div>

          {/* Horizontal Cards Column */}
          <div
            ref={scrollRef}
            className="flex flex-row items-center pl-8 pr-[20vw] relative select-none mt-4"
          >
            {EXPERIENCES.map((exp, idx) => (
              <React.Fragment key={`h-fragment-${idx}`}>
                <div
                  className="experience-card-horizontal w-[460px] md:w-[480px] flex-shrink-0 relative z-10"
                >
                  {/* Year Watermark */}
                  <div className="absolute -top-16 -right-4 font-heading text-8xl font-black text-neutral-100/60 select-none pointer-events-none z-0">
                    {exp.year}
                  </div>

                  <ExperienceCard exp={exp} className="h-[370px]" />
                </div>

                {/* Horizontal timeline connector dots */}
                {idx < EXPERIENCES.length - 1 && (
                  <div className="w-20 flex-shrink-0 flex items-center justify-center relative h-[370px] z-0">
                    <div className="w-full h-[1.5px] bg-navy/35 shadow-[0_0_4px_rgba(11,61,145,0.2)]" />
                    <div className="absolute w-5 h-5 rounded-full border border-navy/40 bg-[#0F0F0F] flex items-center justify-center shadow-[0_0_15px_rgba(11,61,145,0.2)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-navy animate-pulse" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* 2. TABLET LAYOUT - Horizontal Swipe Track (768px to 1024px) */}
      <div className="hidden md:block lg:hidden">
        <Section id="experience-tablet" bg="white" className="py-24">
          <Container className="flex flex-col gap-16">
            <div className="flex flex-col items-start">
              <span className="font-body text-xs font-bold tracking-widest text-navy uppercase mb-2 block">
                02 / HISTORY
              </span>
              <Heading level={2} className="tracking-tighter font-extrabold text-neutral-900 mb-2">
                Experience <span className="text-navy bg-gradient-to-r from-navy via-blue-500 to-navy bg-clip-text text-transparent">Timeline</span>
              </Heading>
              <p className="font-body text-sm text-neutral-400 max-w-2xl font-light">
                A journey of continuous learning, building, and creating impact through technology and&nbsp;innovation.
              </p>
            </div>

            {/* Swipeable row with native snap physics */}
            <div className="flex flex-row overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 pb-8 px-4">
              {EXPERIENCES.map((exp, idx) => (
                <div key={`t-${idx}`} className="snap-center flex-shrink-0 w-[420px] relative">
                  <div className="absolute -top-12 -right-2 font-heading text-6xl font-black text-neutral-100/60 pointer-events-none select-none">
                    {exp.year}
                  </div>
                  <ExperienceCard exp={exp} className="h-[370px]" isMobile={true} />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </div>

      {/* 3. MOBILE LAYOUT - Elegant Vertical Stacking (under 768px) */}
      <div className="block md:hidden">
        <Section id="experience" bg="white" className="py-20">
          <Container className="flex flex-col gap-14">

            {/* Title */}
            <div className="flex flex-col items-start">
              <Reveal animation="fade-up">
                <span className="font-body text-xs font-bold tracking-widest text-navy uppercase mb-2 block">
                  02 / HISTORY
                </span>
                <Heading level={2} className="tracking-tighter font-extrabold text-neutral-900 mb-2">
                  Experience <span className="text-navy bg-gradient-to-r from-navy via-blue-500 to-navy bg-clip-text text-transparent">Timeline</span>
                </Heading>
                <p className="font-body text-xs text-neutral-400 font-light max-w-lg">
                  A journey of continuous learning, building, and creating impact through technology and&nbsp;innovation.
                </p>
              </Reveal>
            </div>

            {/* Vertical timeline stack */}
            <div className="relative pl-5">
              <div className="absolute left-2 top-2 bottom-6 w-[1px] bg-neutral-200" />

              <div className="flex flex-col gap-8">
                {EXPERIENCES.map((exp, idx) => (
                  <div key={`m-${idx}`} className="relative">
                    <div className="absolute -left-[25px] top-6 w-2.5 h-2.5 rounded-full border border-navy bg-white z-10" />

                    <Reveal animation="fade-up" delay={idx * 0.08}>
                      <ExperienceCard exp={exp} className="h-auto" isMobile={true} />
                    </Reveal>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
};

export default Experience;
