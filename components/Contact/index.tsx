'use client';

import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Heading from '../ui/Heading';
import Reveal from '../ui/Reveal';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

export const Contact = () => {
  const CONTACT_LINKS = [
    {
      name: 'Email',
      value: 'kulasekhar981@gmail.com',
      href: 'mailto:kulasekhar981@gmail.com',
      icon: <Mail className="w-5 h-5" />,
    },
    {
      name: 'LinkedIn',
      value: 'linkedin.com/in/kulasekhar-dev',
      href: 'https://www.linkedin.com/in/kulasekhar-dev/',
      icon: <LinkedinIcon size={18} />,
    },
    {
      name: 'GitHub',
      value: 'github.com/KulasekharRamanaboyina',
      href: 'https://github.com/KulasekharRamanaboyina',
      icon: <GithubIcon size={18} />,
    },
  ];

  return (
    <Section id="contact" bg="white">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Left Column - Contact Details */}
        <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28 h-fit">
          <Reveal animation="fade-up">
            <span className="font-body text-[10px] md:text-xs font-bold tracking-widest text-navy uppercase mb-3 block">
              07 / CONNECT
            </span>
            <Heading level={2} className="tracking-tighter about-heading font-logo italic font-light overflow-hidden py-1">
              Get in <span className="text-navy bg-gradient-to-r from-navy via-blue-500 to-navy bg-clip-text text-transparent">Touch</span>
            </Heading>
            <p className="font-body text-neutral-500 font-light text-sm md:text-base max-w-sm mb-8 leading-relaxed">
              If you would like to connect or discuss a software engineering idea, drop a message or reach out via socials.
            </p>
          </Reveal>

          {/* Cards for Email, Github, Linkedin */}
          <div className="w-full flex flex-col gap-4">
            {CONTACT_LINKS.map((link, idx) => (
              <Reveal key={link.name} animation="fade-up" delay={idx * 0.08}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between p-4 rounded-2xl border border-neutral-100 bg-neutral-50 hover:bg-white hover:border-navy/10 hover:shadow-md transition-all duration-300 w-full"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-navy/5 text-navy rounded-xl group-hover:bg-navy group-hover:text-white transition-colors duration-300">
                      {link.icon}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-heading font-bold text-[10px] text-neutral-400 tracking-wider uppercase">
                        {link.name}
                      </span>
                      <span className="font-body text-xs md:text-sm font-semibold text-foreground">
                        {link.value}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-navy group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right Column - Luxury Floating Label Contact Form */}
        <div className="lg:col-span-7 w-full">
          <Reveal animation="blur" delay={0.15}>
            <GlassCard className="border border-neutral-100 bg-white p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.03)]">
              <form action="https://formsubmit.co/kulasekhar981@gmail.com" method="POST" className="flex flex-col">
                {/* Disable Captcha */}
                <input type="hidden" name="_captcha" value="false" />

                {/* Name Input */}
                <div className="relative mb-6">
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    required
                    placeholder=" "
                    className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-100 focus:border-navy focus:bg-white rounded-xl focus:outline-none transition-all duration-300 font-body text-xs md:text-sm text-foreground peer"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-3.5 text-xs md:text-sm text-neutral-400 font-body transition-all duration-300 pointer-events-none peer-focus:-top-2 peer-focus:left-3 peer-focus:text-[9px] peer-focus:bg-white peer-focus:px-1.5 peer-focus:text-navy peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1.5"
                  >
                    Your Name
                  </label>
                </div>

                {/* Email Input */}
                <div className="relative mb-6">
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    required
                    placeholder=" "
                    className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-100 focus:border-navy focus:bg-white rounded-xl focus:outline-none transition-all duration-300 font-body text-xs md:text-sm text-foreground peer"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-3.5 text-xs md:text-sm text-neutral-400 font-body transition-all duration-300 pointer-events-none peer-focus:-top-2 peer-focus:left-3 peer-focus:text-[9px] peer-focus:bg-white peer-focus:px-1.5 peer-focus:text-navy peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1.5"
                  >
                    Your Email
                  </label>
                </div>

                {/* Message Input */}
                <div className="relative mb-8">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder=" "
                    className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-100 focus:border-navy focus:bg-white rounded-xl focus:outline-none transition-all duration-300 font-body text-xs md:text-sm text-foreground resize-none peer"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-4 top-3.5 text-xs md:text-sm text-neutral-400 font-body transition-all duration-300 pointer-events-none peer-focus:-top-2 peer-focus:left-3 peer-focus:text-[9px] peer-focus:bg-white peer-focus:px-1.5 peer-focus:text-navy peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1.5"
                  >
                    Message Details
                  </label>
                </div>

                {/* Submit button */}
                <Button type="submit" variant="primary" className="w-full">
                  Send Message
                </Button>
              </form>
            </GlassCard>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
};

export default Contact;
