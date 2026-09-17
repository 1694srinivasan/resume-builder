import { ResumeData } from '../types/resume';

export const SAMPLE_RESUME_DATA: ResumeData = {
  basics: {
    name: 'John Doe',
    label: 'Senior Software Engineer & Full Stack Developer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    url: 'https://johndoe.dev',
    summary: 'Results-driven Senior Software Engineer with 6+ years of experience designing scalable web applications, RESTful microservices, and modern frontend platforms. Experienced in leading agile developer teams, optimizing cloud infrastructure, and building robust enterprise products.',
    location: {
      city: 'New York',
      region: 'NY',
      countryCode: 'US',
    },
    profiles: [
      {
        network: 'LinkedIn',
        username: 'in/johndoe-dev',
        url: 'https://linkedin.com/in/johndoe-dev',
      },
      {
        network: 'GitHub',
        username: 'johndoe-dev',
        url: 'https://github.com/johndoe-dev',
      },
    ],
    avatarUrl: '',
  },
  work: [
    {
      id: 'work-1',
      company: 'ABC Tech Solutions',
      position: 'Senior Full Stack Developer',
      url: 'https://abctech.example.com',
      startDate: '2021-04',
      endDate: 'Present',
      current: true,
      location: 'New York, NY',
      summary: 'Leading core web engineering initiatives for client SaaS platforms.',
      highlights: [
        'Architected high-throughput microservices using Next.js, Node.js, and TypeScript, improving web application load speed by 42%.',
        'Spearheaded cloud migration to AWS serverless architecture, reducing infrastructure operational costs by $85,000 annually.',
        'Mentored 6 junior and mid-level developers, establishing automated CI/CD deployment pipelines and code review standards.'
      ],
    },
    {
      id: 'work-2',
      company: 'ABC Global Enterprises',
      position: 'Software Engineer',
      startDate: '2018-06',
      endDate: '2021-03',
      current: false,
      location: 'Boston, MA',
      summary: 'Developed customer portal web modules and SQL database procedures.',
      highlights: [
        'Built interactive analytics dashboard serving over 500,000 active monthly users using React and Tailwind CSS.',
        'Optimized PostgreSQL database queries and Redis caching, cutting peak server response times from 850ms to 120ms.'
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'State University of Technology',
      area: 'Computer Science',
      studyType: 'Bachelor of Science (B.S.)',
      startDate: '2014-08',
      endDate: '2018-05',
      score: '3.8 GPA',
      highlights: ['Dean’s List Graduate', 'Computer Science Society Vice President'],
    },
  ],
  skills: [
    {
      id: 'skill-1',
      name: 'Programming & Core',
      level: 'Expert',
      keywords: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'Go', 'HTML5/CSS3', 'SQL'],
    },
    {
      id: 'skill-2',
      name: 'Frameworks & Frontend',
      level: 'Expert',
      keywords: ['Next.js', 'React', 'Tailwind CSS', 'Redux', 'Zustand', 'REST APIs', 'GraphQL'],
    },
    {
      id: 'skill-3',
      name: 'Backend & Cloud',
      level: 'Advanced',
      keywords: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS (S3, Lambda)'],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'XYZ Analytics Platform',
      description: 'Real-time telemetry and data visualization dashboard.',
      url: 'https://github.com/johndoe-dev/xyz-analytics',
      keywords: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
      highlights: [
        'Developed end-to-end encrypted real-time analytics engine processing 1M+ daily events.',
        'Featured in tech blogs with over 5,000 active GitHub stars.'
      ],
    },
    {
      id: 'proj-2',
      name: 'XYZ Cloud Vault',
      description: 'Privacy-focused browser vault for encrypted document storage.',
      url: 'https://github.com/johndoe-dev/xyz-vault',
      keywords: ['Web Crypto API', 'React', 'AES-256'],
      highlights: ['Implemented client-side AES-GCM 256-bit encryption with zero server logging.'],
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-01',
    },
  ],
  languages: [
    {
      id: 'lang-1',
      language: 'English',
      fluency: 'Native / Fluent',
    },
  ],
  customSections: [],
  sectionOrder: ['summary', 'work', 'education', 'skills', 'projects', 'certifications', 'languages'],
  themeConfig: {
    templateId: 'modern-minimalist',
    primaryColor: '#0f172a',
    accentColor: '#2563eb',
    textColor: '#1e293b',
    backgroundColor: '#ffffff',
    fontFamily: 'inter',
    fontSize: 14,
    lineHeight: 1.45,
    marginDensity: 'normal',
    showIcons: true,
    showPhoto: false,
  },
};
