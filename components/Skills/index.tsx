'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Heading from '../ui/Heading';
import Reveal from '../ui/Reveal';
import SkillCard from '../ui/SkillCard';
import { GithubIcon } from '../ui/Icons';

interface Skill {
  name: string;
  icon: React.ReactNode;
}

export const Skills = () => {
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

  return (
    <Section id="skills" bg="white" className="!overflow-visible">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

        {/* Sticky section title wrapper */}
        <div className="lg:col-span-4 relative">
          <div className="lg:sticky lg:top-28 flex flex-col items-start h-fit">
            <Reveal animation="fade-up">
              <span className="font-body text-[10px] md:text-xs font-bold tracking-widest text-navy uppercase mb-3 block">
                03 / CAPABILITIES
              </span>
              {/* <Heading level={2} className="tracking-tighter font-semibold"> */}
              <Heading level={2} className="tracking-tighter about-heading font-logo italic font-light overflow-hidden py-1">

                Tech <span className="text-navy bg-gradient-to-r from-navy via-blue-500 to-navy bg-clip-text text-transparent">Stack</span>
              </Heading>
            </Reveal>
          </div>
        </div>

        {/* Skills Stack Container */}
        <div className="lg:col-span-8 flex flex-col items-center lg:items-start w-full relative">
          {SKILLS_LIST.map((skill, idx) => (
            <CardWrapper key={skill.name} skill={skill} index={idx} total={SKILLS_LIST.length} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

interface CardWrapperProps {
  skill: Skill;
  index: number;
  total: number;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ skill, index, total }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress of individual card wrapper
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 80%"],
  });

  // Check if user prefers reduced motion
  const shouldReduceMotion = useReducedMotion();

  // Scroll transitions: y, opacity, scale, rotateZ
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.8], [80, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.92, 1]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.8], [5, 0]);

  // Spring physics for natural, premium motion
  const springConfig = { damping: 25, stiffness: 120, mass: 1 };
  const opacitySpring = useSpring(opacity, springConfig);
  const ySpring = useSpring(y, springConfig);
  const scaleSpring = useSpring(scale, springConfig);
  const rotateSpring = useSpring(rotateZ, springConfig);

  // Fallback to static values if reduced motion is preferred
  const animatedOpacity = shouldReduceMotion ? 1 : opacitySpring;
  const animatedY = shouldReduceMotion ? 0 : ySpring;
  const animatedScale = shouldReduceMotion ? 1 : scaleSpring;
  const animatedRotate = shouldReduceMotion ? 0 : rotateSpring;

  // Z-index layering (keeps clean stack ordering in case of overlaps)
  const zIndex = index + 1;

  return (
    <div
      ref={ref}
      className="w-full relative mb-4 last:mb-0 max-w-lg"
      style={{
        zIndex,
      }}
    >
      <motion.div
        style={{
          opacity: animatedOpacity,
          y: animatedY,
          scale: animatedScale,
          rotateZ: animatedRotate,
        }}
        className="w-full origin-top-center"
      >
        <SkillCard name={skill.name} icon={skill.icon} />
      </motion.div>
    </div>
  );
};

export default Skills;
