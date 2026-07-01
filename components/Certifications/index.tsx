'use client';

import React from 'react';
import { Award } from 'lucide-react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Heading from '../ui/Heading';
import Reveal from '../ui/Reveal';
import GlassCard from '../ui/GlassCard';

interface Certification {
  title: string;
  issuer: string;
  badge: string;
}

const CERTIFICATIONS_DATA: Certification[] = [
  {
    title: 'MERN Stack Development',
    issuer: 'Quality Thought Infosystems, Hyderabad',
    badge: 'MERN Specialist',
  },
  {
    title: 'Java Software Developer',
    issuer: 'Infosys Foundation & ICT Academy',
    badge: 'Java Certified',
  },
  {
    title: 'Database Management System',
    issuer: 'Great Learning',
    badge: 'DBMS Foundations',
  },
];

export const Certifications = () => {
  return (
    <Section id="certifications" bg="white">
      <Container className="flex flex-col gap-12">

        {/* Section header */}
        <div className="flex flex-col items-start">
          <Reveal animation="fade-up">
            <span className="font-body text-[10px] md:text-xs font-bold tracking-widest text-navy uppercase mb-3 block">
              06 / VALIDATION
            </span>
            <Heading level={2} className="tracking-tighter about-heading font-logo italic font-light overflow-hidden py-1">
              Featured <span className="text-navy bg-gradient-to-r from-navy via-blue-500 to-navy bg-clip-text text-transparent">Certifications</span>
            </Heading>
          </Reveal>
        </div>

        {/* 3-Column Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERTIFICATIONS_DATA.map((cert, idx) => (
            <Reveal key={cert.title} animation="fade-up" delay={idx * 0.1}>
              <GlassCard className="border border-neutral-100 bg-white p-6 sm:p-8 h-full flex flex-col justify-between hover:shadow-lg hover:border-navy/10 transition-all duration-300">
                <div className="text-left">
                  <Award className="w-8 h-8 text-navy mb-6" />
                  <h3 className="font-heading text-base md:text-lg font-bold text-foreground mb-2">
                    {cert.title}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-neutral-500 font-light leading-relaxed">
                    {cert.issuer}
                  </p>
                </div>
                <div className="border-t border-neutral-100 pt-4 mt-6 flex justify-between items-center">
                  <span className="text-[9px] font-bold font-body uppercase tracking-wider text-neutral-400">
                    Verified Credential
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[8px] font-bold font-body uppercase tracking-wider bg-navy/5 text-navy border border-navy/10">
                    {cert.badge}
                  </span>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Certifications;
