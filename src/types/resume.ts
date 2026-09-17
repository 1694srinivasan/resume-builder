export type TemplateId = 
  | 'modern-minimalist'
  | 'executive-luxe'
  | 'tech-vanguard'
  | 'creative-studio'
  | 'compact-pro';

export type FontPairing = 'inter' | 'serif' | 'mono' | 'outfit';

export interface Basics {
  name: string;
  label: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: {
    address?: string;
    city?: string;
    region?: string;
    countryCode?: string;
  };
  profiles: {
    network: string;
    username: string;
    url: string;
  }[];
  avatarUrl?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  url?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  summary?: string;
  highlights: string[];
  location?: string;
}

export interface Education {
  id: string;
  institution: string;
  url?: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score?: string;
  highlights?: string[];
}

export interface SkillGroup {
  id: string;
  name: string;
  level?: string;
  keywords: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  keywords: string[];
  url?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Language {
  id: string;
  language: string;
  fluency: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  highlights?: string[];
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface ThemeConfig {
  templateId: TemplateId;
  styleId?: string; // 1 to 50 structural template style ID
  primaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  fontFamily: FontPairing;
  fontSize: number; // e.g. 14 (px baseline)
  lineHeight: number; // e.g. 1.4
  marginDensity: 'compact' | 'normal' | 'spacious';
  showIcons: boolean;
  showPhoto: boolean;
}

export interface ResumeData {
  basics: Basics;
  work: WorkExperience[];
  education: Education[];
  skills: SkillGroup[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  customSections: CustomSection[];
  sectionOrder: string[]; // e.g. ['summary', 'work', 'education', 'skills', 'projects', 'certifications', 'languages']
  themeConfig: ThemeConfig;
}

export interface ATSCheckItem {
  id: string;
  title: string;
  status: 'pass' | 'warning' | 'fail';
  description: string;
  suggestion?: string;
}

export interface ATSAnalysisResult {
  score: number; // 0 - 100
  checks: ATSCheckItem[];
  missingKeywords: string[];
  matchedKeywords: string[];
  actionVerbsCount: number;
}
