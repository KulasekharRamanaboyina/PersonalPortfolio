'use client';

import { useState } from 'react';
import Loader from '../components/ui/Loader';
import Cursor from '../components/ui/Cursor';
import WebGLBackground from '../components/ui/WebGLBackground';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Achievements from '../components/Achievements';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* Interactive coordinate tracking canvas */}
      <WebGLBackground />

      {/* Cinematic count-up preloader */}
      <Loader onComplete={() => setIsLoaded(true)} />

      {/* Luxury mouse follower cursor */}
      <Cursor />

      {/* Floating glass navigation bar */}
      <Navbar />

      {/* Main Single Page Layout Container */}
      <main className="w-full relative min-h-screen">
        <Hero isLoaded={isLoaded} />

        {/* Combined About & Experience Horizontal Story Flow */}
        {/* <div id="story-flow" className="lg:flex lg:flex-row lg:flex-nowrap lg:h-screen lg:w-fit relative"> */}
        <About />
        <Experience />
        {/* </div> */}
        <Skills />
        <Projects />
        <Achievements />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
