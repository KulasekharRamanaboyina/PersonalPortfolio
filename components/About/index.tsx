'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitWords } from '../../animations/text';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Heading from '../ui/Heading';

export const About = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Smoothly fade the About section background from transparent to solid white
    const bgScroll = gsap.fromTo(
      '.about-section',
      { backgroundColor: 'rgba(255, 255, 255, 0)' },
      {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      }
    );

    // 2. Editorial story indicator horizontal reveal
    const indicatorAnim = gsap.fromTo(
      '.about-indicator',
      { opacity: 0, x: -25 },
      {
        opacity: 1,
        x: 0,
        duration: 1.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-indicator',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );

    // 3. Heading word slide-up reveal
    const headingAnim = gsap.fromTo(
      '.about-heading-word',
      { y: '100%' },
      {
        y: '0%',
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.about-heading',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );

    // 4. Responsive line splitting and slide-up reveals
    const paragraphs = Array.from(document.querySelectorAll('.about-paragraph')) as HTMLElement[];
    paragraphs.forEach((p) => {
      if (!p.hasAttribute('data-original-html')) {
        p.setAttribute('data-original-html', p.innerHTML);
      }
    });

    const splitTextNodes = (el: HTMLElement) => {
      const childNodes = Array.from(el.childNodes);
      childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || '';
          const words = text.split(/(\s+)/);
          const fragment = document.createDocumentFragment();
          words.forEach((word) => {
            if (word.trim() === '') {
              fragment.appendChild(document.createTextNode(word));
            } else {
              const span = document.createElement('span');
              span.className = 'split-word inline-block';
              if (node.parentNode && (node.parentNode as HTMLElement).classList.contains('text-navy')) {
                span.classList.add('text-navy');
              }
              span.textContent = word;
              fragment.appendChild(span);
            }
          });
          node.parentNode?.replaceChild(fragment, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          splitTextNodes(node as HTMLElement);
        }
      });
    };

    let scrollTriggers: ScrollTrigger[] = [];

    const initLineAnimations = () => {
      // Clean up previous triggers
      scrollTriggers.forEach((st) => st.kill());
      scrollTriggers = [];

      paragraphs.forEach((p) => {
        const originalHTML = p.getAttribute('data-original-html')!;
        p.innerHTML = originalHTML;

        // Split text nodes into word spans
        splitTextNodes(p);

        const words = Array.from(p.querySelectorAll('.split-word')) as HTMLElement[];
        const linesMap: { [key: number]: HTMLElement[] } = {};

        words.forEach((word) => {
          gsap.set(word, { clearProps: 'all' });
          const top = word.offsetTop;
          if (!linesMap[top]) {
            linesMap[top] = [];
          }
          linesMap[top].push(word);
        });

        const sortedTops = Object.keys(linesMap).map(Number).sort((a, b) => a - b);
        p.innerHTML = '';
        const lineInners: HTMLElement[] = [];

        sortedTops.forEach((top) => {
          const lineWords = linesMap[top];
          const lineWrapper = document.createElement('div');
          lineWrapper.className = 'line-wrapper block overflow-hidden py-[0.05em] my-[-0.05em]';
          
          const lineInner = document.createElement('div');
          lineInner.className = 'line-inner inline-block w-full';
          
          lineWords.forEach((word, idx) => {
            lineInner.appendChild(word);
            if (idx < lineWords.length - 1) {
              lineInner.appendChild(document.createTextNode(' '));
            }
          });
          
          lineWrapper.appendChild(lineInner);
          p.appendChild(lineWrapper);
          lineInners.push(lineInner);
        });

        gsap.set(lineInners, { yPercent: 105 });
        gsap.set(p, { opacity: 1 });

        const st = ScrollTrigger.create({
          trigger: p,
          start: 'top 88%',
          toggleActions: 'play none none none',
          animation: gsap.to(lineInners, {
            yPercent: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.08,
          }),
        });
        scrollTriggers.push(st);
      });
    };

    const timeoutId = setTimeout(initLineAnimations, 100);

    const handleResize = () => {
      initLineAnimations();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      scrollTriggers.forEach((st) => st.kill());
      bgScroll.kill();
      indicatorAnim.kill();
      headingAnim.kill();
    };
  }, []);

  return (
    <Section id="about" bg="white" className="about-section z-10" style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Editorial Section Indicator - Grid Span 4 */}
        <div className="lg:col-span-4 flex flex-col items-start lg:sticky lg:top-28 h-fit select-none">
          <span className="font-body text-[10px] md:text-xs font-bold tracking-widest text-navy uppercase mb-3 block about-indicator opacity-0">
            01 / STORY
          </span>
          <Heading level={2} className="tracking-tighter about-heading font-logo italic font-light overflow-hidden py-1">
            {splitWords('About Me').map((word) => (
              <span key={word.id} className="inline-block overflow-hidden mr-3">
                <span className="about-heading-word inline-block translate-y-[100%] transition-colors duration-300 hover:text-navy">
                  {word.text === 'Me' ? (
                    <span className="text-navy bg-gradient-to-r from-navy via-blue-500 to-navy bg-clip-text text-transparent font-normal not-italic">
                      Me
                    </span>
                  ) : (
                    word.text
                  )}
                </span>
              </span>
            ))}
          </Heading>
        </div>

        {/* Narrative Columns - Grid Span 8 */}
        <div className="lg:col-span-8 flex flex-col gap-8 text-neutral-500 font-body text-base md:text-lg font-light leading-relaxed about-text-wrap select-none">
          <p className="text-[#0F0F0F] font-semibold text-lg md:text-xl leading-relaxed about-paragraph opacity-0">
            I am a <span className="text-navy">Computer Science and Business Systems</span> engineer driven by a passion for crafting high-fidelity digital systems and solving complex structural challenges.
          </p>

          <p className="about-paragraph opacity-0">
            What started as a curiosity about how websites operate quickly grew into a deep exploration of coding paradigms, modern frameworks, and full-stack software architectures. Over the course of my studies and independent builds, I have focused on creating fast, interactive, and modular applications.
          </p>

          <p className="about-paragraph opacity-0">
            My engineering background bridges traditional computer science foundations (algorithms, database systems, networks) with structural business thinking, helping me approach code with an eye for scalability, maintainability, and clean user experience.
          </p>

          <p className="about-paragraph opacity-0">
            Beyond development, I am guided by curiosity, creativity, and a constant drive to build. I value clean documentation, collaborative problem-solving, and clean, high-performance UI engineering.
          </p>
        </div>
      </Container>
    </Section>
  );
};

export default About;
