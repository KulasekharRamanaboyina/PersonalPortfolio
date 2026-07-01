export interface SocialItem {
  name: string;
  url: string;
  icon: string; // Used for dynamic rendering if needed, or we can export React components
}

export const SOCIALS = [
  {
    name: 'GitHub',
    url: 'https://github.com/KulasekharRamanaboyina',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/kulasekhar-dev/',
    icon: 'linkedin',
  },
  {
    name: 'Email',
    url: 'mailto:kulasekhar981@gmail.com',
    icon: 'mail',
  },
] as const;
