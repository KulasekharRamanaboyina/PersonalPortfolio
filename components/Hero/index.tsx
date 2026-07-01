'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Mail, ArrowRight, Award } from 'lucide-react';
import { useParallax } from '../../hooks/useParallax';
import { useHeroAnimation } from '../../hooks/useHeroAnimation';
import { useCursor } from '../../providers/CursorProvider';
import { splitChars } from '../../animations/text';
import { SOCIALS } from '../../constants/socials';
import Button from '../ui/Button';
import GlassCard from '../ui/GlassCard';
import ScrollIndicator from '../ui/ScrollIndicator';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

interface HeroProps {
  isLoaded: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isLoaded }) => {
  // Bind entrance timeline selector hook
  const heroContainerRef = useHeroAnimation(isLoaded);

  // Bind mouse-parallax hooks with distinct speeds (strengths)
  const portraitParallax = useParallax<HTMLDivElement>(12);
  const widgetLeftParallax = useParallax<HTMLDivElement>(-22);
  const widgetRightParallax = useParallax<HTMLDivElement>(28);

  // Background Parallax layers with multiple depth coefficients
  const bgBackParallax = useParallax<HTMLDivElement>(6);
  const bgMidParallax = useParallax<HTMLDivElement>(-12);
  const bgFrontParallax = useParallax<HTMLDivElement>(18);

  const { setCursorType } = useCursor();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Pin the Hero Section
    const pin = ScrollTrigger.create({
      trigger: '#home',
      start: 'top top',
      end: '+=100%',
      pin: true,
      pinSpacing: false,
    });

    // Scrubbed exit animation timeline for Hero Elements
    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: '+=100%',
        scrub: true,
      }
    });

    // 1. Portrait: Scale down, shift slightly, and fade
    exitTl.to('.hero-portrait-wrap', {
      scale: 0.72,
      yPercent: -15,
      opacity: 0.05,
      ease: 'none'
    }, 0);

    // 2. Text Column (Heading, badge, paragraph, CTA buttons, socials)
    exitTl.to('#home .lg\\:col-span-7 > *', {
      yPercent: -20,
      opacity: 0,
      stagger: 0.03,
      ease: 'none'
    }, 0);

    // 3. Floating widget badges
    exitTl.to('.hero-floating-badge', {
      yPercent: -35,
      opacity: 0,
      stagger: 0.04,
      ease: 'none'
    }, 0);

    // 4. Background Ambient Elements (Parallax layers moving at offset directions)
    exitTl.to('.bg-glow-element', {
      yPercent: 30,
      opacity: 0,
      stagger: 0.03,
      ease: 'none'
    }, 0);

    exitTl.to('.bg-glass-element', {
      yPercent: -20,
      opacity: 0,
      stagger: 0.03,
      ease: 'none'
    }, 0);

    exitTl.to('.bg-svg-element', {
      yPercent: -35,
      opacity: 0,
      stagger: 0.04,
      ease: 'none'
    }, 0);

    exitTl.to('.bg-particle-element', {
      yPercent: -50,
      opacity: 0,
      ease: 'none'
    }, 0);

    // 5. Scroll indicator
    exitTl.to('.hero-scroll-indicator', {
      opacity: 0,
      yPercent: -15,
      ease: 'none'
    }, 0);

    return () => {
      pin.kill();
      exitTl.kill();
    };
  }, []);

  // Social icon mapper
  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github':
        return <GithubIcon className="w-5 h-5" />;
      case 'linkedin':
        return <LinkedinIcon className="w-5 h-5" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="home"
      ref={heroContainerRef}
      className="relative min-h-screen w-full flex items-center justify-center py-24 md:py-32 overflow-hidden bg-transparent select-none"
    >
      {/* Premium Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Layer 1: Vignette & Base Mesh Gradient */}
        <div className="hero-vignette" />
        <div className="mesh-bg-gradient" />

        {/* Layer 2: Back Parallax (Large Abstract Blobs, Radial Light Pools) */}
        <div ref={bgBackParallax} className="absolute inset-0 w-full h-full">
          {/* Blob 1: Large Navy Blur pool at Top-Left */}
          <div className="bg-glow-element absolute top-[-5%] left-[5%] w-[450px] h-[450px] rounded-full bg-navy/5 blur-[140px] animate-drift-blob-1 opacity-0" />

          {/* Blob 2: Indigo Blur pool at Bottom-Right */}
          <div className="bg-glow-element absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-indigo-500/4 blur-[160px] animate-drift-blob-2 opacity-0" />

          {/* Radial Light Source behind Heading */}
          <div className="bg-glow-element absolute top-[25%] left-[15%] w-[350px] h-[350px] rounded-full bg-navy/[0.03] blur-[100px] animate-pulse-glow-ambient opacity-0" />

          {/* Radial Light Source behind Portrait Column */}
          <div className="bg-glow-element absolute top-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-navy/[0.04] blur-[120px] animate-pulse-glow-ambient opacity-0" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Layer 3: Mid Parallax (Floating Blurred Glass Circles, Light Streaks, Editorial SVGs) */}
        <div ref={bgMidParallax} className="absolute inset-0 w-full h-full">
          {/* Elegant Floating Glass Circle 1 */}
          <div className="bg-glass-element absolute top-[15%] right-[25%] w-24 h-24 rounded-full border border-white/40 bg-white/20 backdrop-blur-[6px] shadow-[0_8px_32px_0_rgba(37,99,235,0.03)] animate-float-glass-ring opacity-0 z-10" />

          {/* Elegant Floating Glass Circle 2 */}
          <div className="bg-glass-element absolute bottom-[25%] left-[15%] w-32 h-32 rounded-full border border-white/30 bg-white/10 backdrop-blur-[8px] shadow-[0_12px_40px_0_rgba(37,99,235,0.04)] animate-float-glass-ring opacity-0 z-10" style={{ animationDelay: '2.5s' }} />

          {/* Glass Light Streak / Lens Flare */}
          <div className="bg-glass-element absolute top-[35%] left-[30%] w-[600px] h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-[35deg] opacity-0" />
          <div className="bg-glass-element absolute bottom-[40%] right-[20%] w-[500px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-[25deg] opacity-0" />

          {/* Abstract SVG shape 1: Double Rings (luxury editorial vibe) */}
          <svg
            className="bg-svg-element absolute top-[8%] left-[20%] w-48 h-48 stroke-neutral-300/40 fill-none opacity-0"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="40" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="32" strokeWidth="0.5" strokeDasharray="1 3" />
          </svg>

          {/* Abstract SVG shape 2: Curved Path */}
          <svg
            className="bg-svg-element absolute bottom-[8%] right-[15%] w-64 h-64 stroke-neutral-300/30 fill-none opacity-0"
            viewBox="0 0 100 100"
          >
            <path d="M10,90 Q50,10 90,90" strokeWidth="0.5" />
            <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.25" strokeDasharray="2 2" />
          </svg>
        </div>

        {/* Layer 4: Front Parallax (Subtle Floating Particles) */}
        <div ref={bgFrontParallax} className="absolute inset-0 w-full h-full z-10">
          <div className="bg-particle-element absolute top-[30%] left-[45%] w-2 h-2 rounded-full bg-navy/15 blur-[1px] animate-float-particle-micro opacity-0" />
          <div className="bg-particle-element absolute top-[60%] right-[30%] w-1.5 h-1.5 rounded-full bg-indigo-400/20 blur-[1px] animate-float-particle-micro opacity-0" style={{ animationDelay: '3s' }} />
          <div className="bg-particle-element absolute bottom-[20%] left-[35%] w-3 h-3 rounded-full bg-navy/10 blur-[2px] animate-float-particle-micro opacity-0" style={{ animationDelay: '6s' }} />
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">

        {/* Left Side Content - Grid Span 7 */}
        <div className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1">

          {/* Specialty Badge */}
          <div className="mb-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 bg-white text-[10px] md:text-xs font-semibold tracking-widest text-foreground/60 shadow-[0_4px_12px_rgba(0,0,0,0.01)] uppercase">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-navy"></span>
            </span>
            Based in India / Software Engineer
          </div>

          {/* Main Title Name Split */}
          <h1 className="font-logo italic text-3xl sm:text-4xl md:text-5xl lg:text-6.5xl xl:text-7.5xl leading-tight text-foreground mb-6 font-light tracking-wide">
            {splitChars('KULASEKHAR').map((char) => (
              <span
                key={char.id}
                className="inline-block overflow-hidden h-[1.15em] vertical-align-bottom"
              >
                <span className="hero-heading-char inline-block translate-y-[105%] transition-colors duration-300 hover:text-navy">
                  {char.text}
                </span>
              </span>
            ))}
          </h1>

          {/* Subtitle / Professional Description */}
          <p className="hero-subtitle opacity-0 font-body text-base sm:text-lg md:text-xl text-neutral-500 max-w-lg mb-10 leading-relaxed font-light">
            Computer Science and Business Systems graduate & Full Stack Web Developer. Proficient in React and MERN stack architectures.
          </p>

          {/* Action CTAs */}
          <div className="hero-cta-wrap opacity-0 flex flex-wrap gap-4 mb-8">
            <Button
              asLink
              href="#projects"
              variant="primary"
              className="group"
            >
              Explore My Work
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              asLink
              href="/resume/Kulasekhar-dev.pdf"
              download="Kulasekhar-dev.pdf"
              variant="outline"
              magneticStrength={0.15}
            >
              Download Resume
            </Button>
          </div>

          {/* Social Links */}
          <div className="hero-socials-wrap opacity-0 flex items-center gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="p-3 border border-neutral-200 hover:border-navy hover:text-navy text-neutral-500 bg-white hover:bg-neutral-50 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.01)] transition-all duration-300"
                onMouseEnter={() => setCursorType('hover')}
                onMouseLeave={() => setCursorType('default')}
                aria-label={social.name}
              >
                {getSocialIcon(social.name)}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side Portrait & Floating Cards - Grid Span 5 */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative order-1 lg:order-2">

          {/* Main Portrait Frame with Mouse Parallax */}
          <div
            ref={portraitParallax}
            className="hero-portrait-wrap relative w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] md:w-[350px] md:h-[440px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-neutral-200 bg-white"
            style={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
          >
            <Image
              src="/images/photo.png"
              alt="Kulasekhar Ramanaboyina"
              fill
              className="hero-portrait-img object-cover scale-[1.2]"
              priority
              sizes="(max-width: 768px) 300px, 400px"
            />
          </div>

          {/* Floating Widget 1 - CSBS Graduate (Top-Left Parallax) */}
          <div ref={widgetLeftParallax} className="hero-floating-badge absolute top-12 -left-6 sm:-left-12 opacity-0 z-20">
            <GlassCard className="py-2.5 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border-neutral-200 bg-white rounded-2xl flex items-center gap-3">
              <Award className="w-5 h-5 text-navy" />
              <div className="flex flex-col text-left">
                <span className="font-heading font-bold text-[10px] text-foreground tracking-wider uppercase">
                  B.Tech CSBS
                </span>
                <span className="font-body text-[9px] text-neutral-400 font-medium">
                  2021 - 2025 Graduate
                </span>
              </div>
            </GlassCard>
          </div>

          {/* Floating Widget 2 - MERN Stack (Bottom-Right Parallax) */}
          <div ref={widgetRightParallax} className="hero-floating-badge absolute bottom-12 -right-4 sm:-right-8 opacity-0 z-20">
            <GlassCard className="py-2.5 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border-neutral-200 bg-white rounded-2xl flex items-center gap-3">
              <span className="text-[10px] font-heading font-black text-navy tracking-tight border border-navy/20 px-1.5 py-0.5 rounded-md bg-navy/5">
                MERN
              </span>
              <div className="flex flex-col text-left">
                <span className="font-heading font-bold text-[10px] text-foreground tracking-wider uppercase">
                  React Developer
                </span>
                <span className="font-body text-[9px] text-neutral-400 font-medium">
                  Full Stack Engineer
                </span>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Floating Scroll Down Indicator */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 z-10">
        <ScrollIndicator />
      </div>
    </section>
  );
};

export default Hero;
