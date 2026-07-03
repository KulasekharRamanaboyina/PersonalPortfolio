# Portfolio Project Documentation

This document describes the structure, technology stack, and animation system used in this personal portfolio.

## Technology Stack

| Technology | Category | Purpose |
|---|---|---|
| Next.js 16 | Framework | Server-side rendering, App Router structure, and React 19 environment |
| React 19 | Library | UI component architecture and hooks management |
| TypeScript | Language | Static typing and compile-time code safety |
| TailwindCSS v4 | Styling | Utility-first styling and modular layouts |
| GreenSock (GSAP) | Animation Engine | Timeline staging, scrub controls, and advanced scroll interactions |
| Framer Motion | Animation Library | Viewport-driven transitions, spring dynamics, and custom mouse events |
| Lenis | Scroll Engine | Global smooth scrolling animation |
| Lucide React | Icons | Vector iconography |

## Project Sections

The single-page portfolio layout is composed of the following sections:

| Section | Component File | Key Functionality |
|---|---|---|
| Preloader | [Loader.tsx](file:///c:/Users/KULASEKHAR/PersonalPortfolio/components/ui/Loader.tsx) | Staged count-up loader from 0 to 100 before rendering page content |
| Canvas Background | [WebGLBackground.tsx](file:///c:/Users/KULASEKHAR/PersonalPortfolio/components/ui/WebGLBackground.tsx) | Draws coordinate labels tracking the cursor on a low-opacity canvas grid |
| Custom Cursor | [Cursor.tsx](file:///c:/Users/KULASEKHAR/PersonalPortfolio/components/ui/Cursor.tsx) | Dynamic custom cursor following mouse movement with spring physics |
| Navigation | [Navbar/index.tsx](file:///c:/Users/KULASEKHAR/PersonalPortfolio/components/Navbar/index.tsx) | Glassmorphic header with animated anchor links |
| Hero | [Hero/index.tsx](file:///c:/Users/KULASEKHAR/PersonalPortfolio/components/Hero/index.tsx) | Landing interface featuring staggered greetings and diagonal image mask wipe |
| About Me | [About/index.tsx](file:///c:/Users/KULASEKHAR/PersonalPortfolio/components/About/index.tsx) | Introduction layout with words sliding up progressively on scroll |
| Experience | [Experience/index.tsx](file:///c:/Users/KULASEKHAR/PersonalPortfolio/components/Experience/index.tsx) | Horizontal timeline layout translated via vertical scroll scrubbing |
| Skills | [Skills/index.tsx](file:///c:/Users/KULASEKHAR/PersonalPortfolio/components/Skills/index.tsx) | Categorised skills columns entering with staggered fade animations |
| Projects | [Projects/index.tsx](file:///c:/Users/KULASEKHAR/PersonalPortfolio/components/Projects/index.tsx) | Project portfolio grid featuring scroll reveal entries |
| Achievements | [Achievements/index.tsx](file:///c:/Users/KULASEKHAR/PersonalPortfolio/components/Achievements/index.tsx) | Key performance metrics and highlights |
| Certifications | [Certifications/index.tsx](file:///c:/Users/KULASEKHAR/PersonalPortfolio/components/Certifications/index.tsx) | Grid of credentials styled in glassmorphic cards |
| Contact | [Contact/index.tsx](file:///c:/Users/KULASEKHAR/PersonalPortfolio/components/Contact/index.tsx) | Social handles, contact links, and email inquiry trigger |
| Footer | [Footer/index.tsx](file:///c:/Users/KULASEKHAR/PersonalPortfolio/components/Footer/index.tsx) | Simple bottom links and copyright information |
| Scroll To Top | [ScrollToTop.tsx](file:///c:/Users/KULASEKHAR/PersonalPortfolio/components/ui/ScrollToTop.tsx) | Persistent button that scrolls view back to top on click |

## Animation Architecture

Animations are split between GreenSock (GSAP) for scroll-scrubbed transformations and Framer Motion for spring physics and simple viewport entrance states.

### Animation Sources and Imports

| Animation Feature | Source Library / File Path | Used In | Purpose |
|---|---|---|---|
| `gsap` / `ScrollTrigger` | `gsap` and `gsap/ScrollTrigger` | About, Experience, Skills, Projects, Navbar, Hero | Core trigger system for scroll-tied transformations |
| `useLenis` | [LenisProvider.tsx](file:///c:/Users/KULASEKHAR/PersonalPortfolio/providers/LenisProvider.tsx) | Page Layout | Connects smooth scroll updates with GSAP trigger updates |
| `animateHeroEntrance` | [hero.ts](file:///c:/Users/KULASEKHAR/PersonalPortfolio/animations/hero.ts) | Hero | Orchestrates the synchronized loading sequence when preloader exits |
| `splitWords` | [text.ts](file:///c:/Users/KULASEKHAR/PersonalPortfolio/animations/text.ts) | About, Projects | Separates paragraphs into individual word tokens for text animations |
| `splitChars` | [text.ts](file:///c:/Users/KULASEKHAR/PersonalPortfolio/animations/text.ts) | Hero | Separates strings into individual letter characters for staggered entry |
| `initScrollReveal` | [scroll.ts](file:///c:/Users/KULASEKHAR/PersonalPortfolio/animations/scroll.ts) | Project Cards | Triggers standard scroll-based fade-up animations |
| `initScrollParallax` | [scroll.ts](file:///c:/Users/KULASEKHAR/PersonalPortfolio/animations/scroll.ts) | Parallax elements | Shifts element coordinates relative to scrolling speeds |
| `Reveal` | [Reveal.tsx](file:///c:/Users/KULASEKHAR/PersonalPortfolio/components/ui/Reveal.tsx) | Achievements, Certifications | Motion wrapper for fade-up, blur, or clip-path reveals |
| Coordinate tracking | HTML Canvas 2D Context | WebGLBackground | Standard requestAnimationFrame loop rendering screen coordinate grids |
| Spring Follower | `framer-motion` | Cursor | Drives cursor position offsets using configurable springs |

### Specialized Animation Behaviors

- **Smooth Scrolling**: Lenis normalizes mouse wheel inputs across browsers, providing smooth inertial deceleration.
- **Horizontal Scrubbing**: The experience section pins the view vertically using GSAP ScrollTrigger and translates the timeline track horizontally as the user continues scrolling down.
- **Cursor Dampening**: Configures separate springs for the cursor outer ring (slow catch-up) and the inner dot (high responsive speed), creating a floating track effect.
- **Text Reveal**: Paragraphs in the About section split text into words, hidden below parent containers via clip paths. As the words enter the viewport, GSAP triggers a staggered slide-up effect.
