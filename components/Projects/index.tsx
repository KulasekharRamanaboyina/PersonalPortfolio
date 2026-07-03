'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Section from '../ui/Section';
import Container from '../ui/Container';
import Heading from '../ui/Heading';
import ProjectCard from '../ui/ProjectCard';
import { GithubIcon, GlobeIcon } from '../ui/Icons';

import { PROJECTS } from '../../constants/projects';
import { splitWords } from '../../animations/text';

export const Projects = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);   // the perspective stage

  const getBentoSpan = (index: number) => {
    switch (index) {
      case 0: return 'md:col-span-2 col-span-1';
      case 1: return 'md:col-span-1 col-span-1';
      case 2: return 'md:col-span-1 col-span-1';
      case 3: return 'md:col-span-2 col-span-1';
      case 4: return 'md:col-span-2 col-span-1';
      case 5: return 'md:col-span-1 col-span-1';
      case 6: return 'md:col-span-2 col-span-1';
      case 7: return 'md:col-span-1 col-span-1';
      default: return 'md:col-span-1 col-span-1';
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      // ── Heading reveal ────────────────────────────────────────────────────
      gsap.set('.projects-heading-word', { yPercent: 110 });
      gsap.set('.projects-label', { opacity: 0, x: -30 });
      gsap.set('.projects-description', { opacity: 0, y: 40, filter: 'blur(8px)' });

      gsap.timeline({ scrollTrigger: { trigger: '.projects-heading', start: 'top 88%' } })
        .to('.projects-label', { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
        .to('.projects-heading-word', { yPercent: 0, duration: 1, stagger: 0.08, ease: 'power4.out' }, '-=0.45')
        .to('.projects-description', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }, '-=0.65');

      const projectCards = gsap.utils.toArray<HTMLElement>('.project-card');

      ScrollTrigger.create({
        trigger: '.projects-grid',
        start: 'top 68%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            projectCards,
            {
              opacity: 0,
              x: (index) => {
                const column = window.matchMedia('(min-width: 768px)').matches ? index % 3 : index % 2;
                return column === 1 ? 120 : -120;
              },
              y: 26,
              scale: 0.96,
              filter: 'blur(10px)',
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 1.05,
              ease: 'power4.out',
              stagger: 0.09,
            }
          );
        },
      });

      // ── Desktop: 3D cube scroll ─────────────────────────────────────────
      if (!window.matchMedia('(min-width: 99999px)').matches) return;

      const stage = stageRef.current;
      const pinEl = document.getElementById('projects');
      if (!stage || !pinEl) return;

      const cards = Array.from(stage.querySelectorAll<HTMLElement>('.cube-face'));
      const dots = Array.from(document.querySelectorAll<HTMLElement>('.cube-dot'));
      const numEl = document.querySelector<HTMLElement>('.cube-num');

      if (!cards.length) return;

      // Make only card 0 visible — all others already hidden via CSS
      // (initial state is set inline in JSX so no flash on first paint)
      gsap.set(cards.slice(1), {
        visibility: 'hidden',
        autoAlpha: 0,
        rotateY: 90,
        transformOrigin: '50% 50%',
      });

      const perCardDistance = 140;
      const totalDistance = Math.max((cards.length - 1) * perCardDistance, window.innerHeight * 1.3);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: 'top 92%',
          end: () => `+=${totalDistance}`,
          pin: true,
          pinSpacing: false,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        if (i >= cards.length - 1) return;

        const next = cards[i + 1];
        const t = i; // each step occupies 1 time unit

        // Step 1 — rotate current card out to the left (-90 deg)
        // Step 2 — rotate next card in from the right (90 → 0)
        // Both run simultaneously so it looks like one cube turning
        tl
          .to(card, {
            rotateY: -90,
            autoAlpha: 0,
            duration: 0.9,
            ease: 'power2.inOut',
            transformOrigin: 'left center',
          }, t)
          .set(card, { visibility: 'hidden' }, t + 0.9)      // fully hide after done
          .set(next, { visibility: 'visible' }, t)             // make next visible before it animates in
          .fromTo(next,
            { rotateY: 90, autoAlpha: 0, transformOrigin: 'right center' },
            { rotateY: 0, autoAlpha: 1, duration: 0.9, ease: 'power2.inOut', transformOrigin: '50% 50%' },
            t,
          );

        // Update counter — fires AFTER the flip completes (t+1) so only
        // the newly-arrived card shows the updated number
        if (numEl) {
          tl.to(numEl, {
            innerHTML: String(i + 2).padStart(2, '0'),
            duration: 0.01,
          }, t + 0.9);
        }

        // Update dots — after flip completes so active dot matches visible card
        if (dots.length) {
          tl.to(dots[i],     { scale: 0.6, opacity: 0.3, duration: 0.25 }, t + 0.8)
            .to(dots[i + 1], { scale: 1.2, opacity: 1,   duration: 0.25 }, t + 0.8);
        }
      });

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative z-0">
      <Section id="projects" bg="white" className="projects-section relative py-20 md:py-28 lg:py-32 xl:py-40 lg:flex lg:flex-col lg:justify-center overflow-visible">

        {/* Ambient orbs */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-blue-500/5 blur-[140px]" />
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-navy/5 blur-[170px]" />
        </div>

        {/* ── Heading ──────────────────────────────────────────────────────── */}
        <Container className="relative z-10 mb-8 lg:mb-6 xl:mb-10">
          <div className="flex flex-col items-start projects-heading">
            <span className="projects-label font-body text-[10px] md:text-xs font-bold tracking-widest text-navy uppercase mb-3 block opacity-0">
              04 / GALLERY
            </span>
            <Heading level={2} className="tracking-tighter about-heading font-logo italic font-light overflow-hidden py-1">
              {splitWords('Featured Projects').map((word) => (
                <span key={word.id} className="inline-block overflow-hidden mr-3">
                  <span className="projects-heading-word inline-block">
                    {word.text === 'Projects' ? (
                      <span className="text-transparent bg-gradient-to-r from-navy via-blue-500 to-navy bg-clip-text">
                        Projects
                      </span>
                    ) : word.text}
                  </span>
                </span>
              ))}
            </Heading>
            <p className="projects-description mt-2 opacity-0 font-body text-neutral-500 font-light text-sm md:text-base max-w-xl leading-relaxed">
              A curated selection of machine learning applications, clean web clones, and structural software engines built to solve real-world problems.
            </p>
          </div>
        </Container>

        {/* ── Mobile / Tablet: Bento Grid ──────────────────────────────────── */}
        <Container className="relative z-10">
          <div className="projects-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pb-4 overflow-hidden">
            {PROJECTS.map((project, idx) => (
              <div
                key={project.title}
                className={`project-card ${getBentoSpan(idx)}`}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </Container>

        {/* ── Desktop: 3D Cube Card ────────────────────────────────────────── */}
        <div className="hidden items-center justify-center relative pb-6 xl:pb-12">

          {/* Counter */}
          <div className="absolute top-0 left-[10vw] flex items-baseline gap-1.5 z-10">
            <span className="cube-num font-heading text-5xl font-bold text-navy tabular-nums select-none">01</span>
            <span className="font-body text-sm text-neutral-400 select-none">
              / {String(PROJECTS.length).padStart(2, '0')}
            </span>
          </div>

          {/*
            Perspective stage — only ONE card is visible at a time.
            Initial visibility is set via inline style, not GSAP, to prevent flash.
          */}
          <div
            ref={stageRef}
            className="cube-stage relative w-[min(92vw,980px)] h-[560px] xl:h-[640px]"
            style={{ perspective: '1800px', transformStyle: 'preserve-3d' }}
          >
            {PROJECTS.map((project, idx) => (
              <div
                key={`cube-face-${idx}`}
                className="cube-face absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-white flex flex-col"
                style={{
                  /* Initial state in CSS so there's no flash before GSAP runs */
                  opacity: idx === 0 ? 1 : 0,
                  visibility: idx === 0 ? 'visible' : 'hidden',
                  transform: idx === 0 ? 'rotateY(0deg)' : 'rotateY(90deg)',
                  transformOrigin: '50% 50%',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform, opacity',
                  boxShadow: '0 4px 0 0 #1e3a8a, 0 8px 0 0 rgba(30,64,175,0.15), 0 24px 80px -10px rgba(30,58,138,0.20), 0 12px 32px -4px rgba(0,0,0,0.12)',
                  borderTop: '3px solid #1e40af',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Image */}
                <div className="cube-image-container relative h-[260px] xl:h-[300px] flex-shrink-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="520px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  {/* Glass sheen */}
                  <div className="absolute top-0 left-0 w-2/5 h-full bg-gradient-to-r from-white/12 to-transparent pointer-events-none" />
                  {/* Title on image */}
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="font-heading text-xl font-bold text-white drop-shadow-lg leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Card body */}
                <div className="flex-1 p-5 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold font-body uppercase tracking-wider bg-neutral-100 text-neutral-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="font-body text-xs text-neutral-500 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2.5">
                    {project.liveUrl && project.liveUrl !== '#projects' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 bg-navy text-white rounded-full text-xs font-semibold font-body hover:bg-navy/90 transition-colors"
                      >
                        <GlobeIcon className="w-3 h-3" />
                        Live Demo
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 border border-neutral-200 text-neutral-700 rounded-full text-xs font-semibold font-body hover:border-navy hover:text-navy transition-colors"
                    >
                      <GithubIcon className="w-3 h-3" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dot nav */}
          <div className="absolute right-[8vw] top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
            {PROJECTS.map((_, idx) => (
              <div
                key={`dot-${idx}`}
                className="cube-dot rounded-full bg-navy"
                style={{
                  width: '6px',
                  height: '6px',
                  opacity: idx === 0 ? 1 : 0.3,
                  transform: idx === 0 ? 'scale(1.2)' : 'scale(0.6)',
                }}
              />
            ))}
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
            <span className="font-body text-[10px] uppercase tracking-widest text-neutral-500">Scroll</span>
            <div className="w-px h-6 bg-gradient-to-b from-neutral-400 to-transparent" />
          </div>

        </div>

      </Section>
    </div>
  );
};

export default Projects;
