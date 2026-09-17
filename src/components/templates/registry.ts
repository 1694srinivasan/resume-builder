import React from 'react';
import { TemplateId } from '../../types/resume';
import { ResumeTemplateProps } from './types';
import { ModernMinimalist } from './ModernMinimalist';
import { ExecutiveLuxe } from './ExecutiveLuxe';
import { TechVanguard } from './TechVanguard';
import { CreativeStudio } from './CreativeStudio';
import { CompactPro } from './CompactPro';

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  description: string;
  category: 'ATS Standard' | 'Executive' | 'Developer' | 'Creative' | 'Compact';
  component: React.FC<ResumeTemplateProps>;
}

export const TEMPLATE_REGISTRY: Record<TemplateId, TemplateDefinition> = {
  'modern-minimalist': {
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
    description: 'Clean single-column ATS layout with crisp typography and subtle accent line.',
    category: 'ATS Standard',
    component: ModernMinimalist,
  },
  'executive-luxe': {
    id: 'executive-luxe',
    name: 'Executive Luxe',
    description: 'Classic serif typography, dark navy double borders, and leadership focus.',
    category: 'Executive',
    component: ExecutiveLuxe,
  },
  'tech-vanguard': {
    id: 'tech-vanguard',
    name: 'Tech Vanguard',
    description: 'Monospaced tech badges, code comment headers, and software stack focus.',
    category: 'Developer',
    component: TechVanguard,
  },
  'creative-studio': {
    id: 'creative-studio',
    name: 'Creative Studio',
    description: 'Vibrant accent sidebar, glassmorphic layout, and distinct visual hierarchy.',
    category: 'Creative',
    component: CreativeStudio,
  },
  'compact-pro': {
    id: 'compact-pro',
    name: 'Compact Pro',
    description: 'High-density 1-page resume layout optimized for extensive experience.',
    category: 'Compact',
    component: CompactPro,
  },
};
