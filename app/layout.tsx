import type { Metadata } from 'next';
import { Space_Grotesk, Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import LenisProvider from '../providers/LenisProvider';
import CursorProvider from '../providers/CursorProvider';
import './globals.css';

// Google Fonts configuration
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Kulasekhar Ramanaboyina | Interactive Portfolio & Developer Experience',
  description:
    'Handcrafted premium digital portfolio of Kulasekhar Ramanaboyina. Computer Science and Business Systems graduate & Full Stack React/MERN Web Developer.',
  keywords: [
    'Kulasekhar Ramanaboyina',
    'Full Stack Developer',
    'React Developer',
    'MERN Stack',
    'Portfolio',
    'Software Engineer',
  ],
  authors: [{ name: 'Kulasekhar Ramanaboyina' }],
  creator: 'Kulasekhar Ramanaboyina',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${playfairDisplay.variable} antialiased scroll-smooth`}
    >
      <body className="font-body text-[#0F0F0F] bg-white min-h-screen relative">
        {/* Global Fixed Noise Texture Layer */}
        <div className="noise-bg" aria-hidden="true" />
        
        {/* Scroll and Custom Cursor Context Providers */}
        <LenisProvider>
          <CursorProvider>
            {children}
          </CursorProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
