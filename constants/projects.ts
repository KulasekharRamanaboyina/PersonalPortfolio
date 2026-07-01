export interface Project {
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    title: "Letter Makr",
    description:
      "A professional newsletter creation platform featuring live editing, desktop and mobile previews, responsive email rendering, newsletter quality scoring, and one-click export for Gmail and Outlook.",
    image: "/images/projects/LetterMakr.png",

    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "HTML Email",
      "Responsive Design"
    ],

    githubUrl: "#projects",

    liveUrl: "https://lettermakr.yourdomain.com",

  },
  {
    title: "Lattice Project Management",
    description:
      "A modern SaaS project management platform designed to streamline task planning, collaboration, sprint execution, and workflow automation through an intuitive Kanban interface and real-time team collaboration.",

    image: "/images/projects/Lattice.png",

    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "MongoDB"
    ],

    githubUrl: "#projects", // no repository maintained as this is not a personal project

    liveUrl: "https://lattice.all4.com",

  },
  {
    title: 'Spammer Detection System',
    description: 'Built to spot fake Instagram accounts using a Random Forest ML model.',
    image: '/images/projects/spam detection.webp',
    liveUrl: '#projects', // No live demo listed in original, just a local anchor
    githubUrl: 'https://github.com/KulasekharRamanaboyina/Spammer-Detection',
    tags: ['Machine Learning', 'Python', 'Random Forest', 'Social Net'],
  },
  {
    title: 'Gemini AI Clone',
    description: "A sleek front-end clone of Google's Gemini AI chat, built using HTML, CSS & JavaScript.",
    image: '/images/projects/gemini ai.jpg',
    liveUrl: 'https://kulasekharramanaboyina.github.io/GeminiAIClone/',
    githubUrl: 'https://github.com/KulasekharRamanaboyina/GeminiAIClone',
    tags: ['HTML', 'CSS', 'JavaScript', 'Gemini API'],
  },
  {
    title: 'My Todo List',
    description: 'Smart React To-Do app to effortlessly manage and organize tasks by status.',
    image: '/images/projects/Todo.jpg',
    liveUrl: 'https://listflowtodo.netlify.app/',
    githubUrl: 'https://github.com/KulasekharRamanaboyina/Todo_list',
    tags: ['React', 'CSS', 'State Management'],
  },
  {
    title: 'QR Code Generator',
    description: 'A web app to instantly generate QR codes from text or URLs using JavaScript.',
    image: '/images/projects/QR code.jpg',
    liveUrl: 'https://kulasekharramanaboyina.github.io/QR_Generator/',
    githubUrl: 'https://github.com/KulasekharRamanaboyina/QR_Generator',
    tags: ['HTML', 'CSS', 'JavaScript', 'API Integration'],
  },
  {
    title: 'Travel Booking System',
    description: 'Java console project to book flights & hotels in tourist places with real-time availability checks.',
    image: '/images/projects/online-booking-engine.jpg',
    liveUrl: 'https://replit.com/@kulasekhar981/TravelBookingSystem',
    githubUrl: 'https://github.com/KulasekharRamanaboyina/Travel-Booking-System',
    tags: ['Java', 'Console Application', 'OOPs', 'Data Structures'],
  },
  {
    title: 'Fitness Tracking',
    description: 'A Python console app to log workouts, track fitness stats, and manage custom plans.',
    image: '/images/projects/fitness.webp',
    liveUrl: 'https://replit.com/@kulasekhar981/Fitness',
    githubUrl: 'https://github.com/KulasekharRamanaboyina/Fitness',
    tags: ['Python', 'Console Application', 'File I/O', 'Data Logs'],
  },
];
