'use client';

import React from 'react';
import { Trophy, Award } from 'lucide-react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Heading from '../ui/Heading';
import Reveal from '../ui/Reveal';
import GlassCard from '../ui/GlassCard';

interface Achievement {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    title: '3rd Rank in HACK-A-QUEST 2K24',
    subtitle: 'Arjun College of Technology, Coimbatore',
    description:
      'Secured third rank and title of "PRO HACKERS" in a competitive hackathon event, awarded with prize money and certifications of excellence.',
    icon: <Trophy className="w-5 h-5 text-navy" />,
  },
  {
    title: 'QCFI Gold Award Winner',
    subtitle: 'Convention on Quality Circle Education 2023',
    description:
      'Led the team to win the Gold Award in the Quality Circle Case Study on "Enhancing Communication" held at KPR Institute of Engineering and Technology.',
    icon: <Award className="w-5 h-5 text-navy" />,
  },
];

const PAPER_PIECES = Array.from({ length: 14 }, (_, index) => index);

export const Achievements = () => {
  return (
    <Section id="achievements" bg="white">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

        {/* Sticky side heading */}
        <div className="lg:col-span-4 flex flex-col items-start lg:sticky lg:top-28 h-fit">
          <Reveal animation="fade-up">
            <span className="font-body text-[10px] md:text-xs font-bold tracking-widest text-navy uppercase mb-3 block">
              05 / RECOGNITION
            </span>
            <Heading level={2} className="tracking-tighter about-heading font-logo italic font-light overflow-hidden py-1">
              Key <span className="text-navy bg-gradient-to-r from-navy via-blue-500 to-navy bg-clip-text text-transparent">Achievements</span>
            </Heading>
          </Reveal>
        </div>

        {/* Honors Items List */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {ACHIEVEMENTS_DATA.map((item, idx) => (
            <Reveal key={item.title} animation="fade-up" delay={idx * 0.15}>
              <GlassCard className="achievement-card group border border-neutral-100 bg-white p-6 sm:p-8 flex gap-6 items-start hover:shadow-xl hover:border-navy/20 hover:-translate-y-1 transition-all duration-300 relative overflow-visible">
                <div className="paper-blast pointer-events-none absolute inset-0 z-0" aria-hidden="true">
                  {PAPER_PIECES.map((piece) => (
                    <span key={piece} className="paper-piece" />
                  ))}
                </div>

                <div className="relative z-10 p-3 bg-navy/5 rounded-2xl flex-shrink-0 group-hover:bg-navy group-hover:[&_svg]:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <div className="relative z-10 flex flex-col text-left">
                  <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <h4 className="font-heading text-xs md:text-sm font-semibold text-navy mb-3">
                    {item.subtitle}
                  </h4>
                  <p className="font-body text-xs md:text-sm text-neutral-500 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Achievements;
