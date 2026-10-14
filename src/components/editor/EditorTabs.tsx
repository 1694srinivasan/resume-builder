'use client';

import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { STRUCTURAL_STYLES_CATALOG, StructuralStyleDefinition } from '../templates/stylesCatalog';
import { FontPairing } from '../../types/resume';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderGit2, 
  Palette, 
  Plus, 
  Trash2, 
  Sparkles,
  Check,
  Search,
  Sliders,
  Type
} from 'lucide-react';

export const EditorTabs: React.FC = () => {
  const {
    resumeData,
    activeEditorTab,
    setActiveEditorTab,
    updateBasics,
    addWork,
    updateWork,
    deleteWork,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkill,
    updateSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
    updateThemeConfig,
  } = useResumeStore();

  const { basics, work, education, skills, projects, themeConfig } = resumeData;

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [styleSearch, setStyleSearch] = useState<string>('');

  const categories = ['All', 'ATS Standard', 'Executive', 'Developer', 'Modern', 'Creative', 'Compact', 'Minimalist', 'Corporate'];

  const filteredStyles = STRUCTURAL_STYLES_CATALOG.filter((style) => {
    const matchesCategory = selectedCategory === 'All' || style.category === selectedCategory;
    const matchesSearch = style.name.toLowerCase().includes(styleSearch.toLowerCase()) ||
                          style.description.toLowerCase().includes(styleSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-200">
      
      {/* Sub-Header Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-2 sm:p-2.5 bg-slate-950/60 border-b border-slate-800 overflow-x-auto no-scrollbar shrink-0">
        {[
          { id: 'basics', label: 'Basics', icon: User },
          { id: 'work', label: 'Work', icon: Briefcase },
          { id: 'education', label: 'Education', icon: GraduationCap },
          { id: 'skills', label: 'Skills', icon: Wrench },
          { id: 'projects', label: 'Projects', icon: FolderGit2 },
          { id: 'theme', label: '50+ Layout Styles', icon: Palette },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeEditorTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveEditorTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Editor Form Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 text-left text-xs pb-24 md:pb-6">
        
        {/* TAB 1: BASICS */}
        {activeEditorTab === 'basics' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-2">Personal Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  value={basics.name}
                  onChange={(e) => updateBasics({ name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Professional Title</label>
                <input
                  type="text"
                  value={basics.label}
                  onChange={(e) => updateBasics({ label: e.target.value })}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  value={basics.email}
                  onChange={(e) => updateBasics({ email: e.target.value })}
                  placeholder="john.doe@example.com"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Phone Number</label>
                <input
                  type="text"
                  value={basics.phone}
                  onChange={(e) => updateBasics({ phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">City / Location</label>
                <input
                  type="text"
                  value={basics.location?.city || ''}
                  onChange={(e) => updateBasics({ location: { ...basics.location, city: e.target.value } })}
                  placeholder="New York, NY"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Personal Website / Portfolio</label>
                <input
                  type="text"
                  value={basics.url}
                  onChange={(e) => updateBasics({ url: e.target.value })}
                  placeholder="https://johndoe.dev"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Professional Summary</label>
              <textarea
                rows={4}
                value={basics.summary}
                onChange={(e) => updateBasics({ summary: e.target.value })}
                placeholder="High-impact 2-4 sentence summary of your background and domain expertise..."
                className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* TAB 2: WORK EXPERIENCE */}
        {activeEditorTab === 'work' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-bold text-sm text-white">Work Experience</h3>
              <button
                onClick={() =>
                  addWork({
                    company: 'ABC Tech Solutions',
                    position: 'Senior Developer',
                    startDate: '2021-04',
                    endDate: 'Present',
                    current: true,
                    highlights: ['Spearheaded core microservices development...'],
                  })
                }
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors text-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Job</span>
              </button>
            </div>

            <div className="space-y-3">
              {work.map((w) => (
                <div key={w.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-slate-200">
                      {w.position || 'Position'} <span className="text-blue-400">@ {w.company || 'Company'}</span>
                    </div>
                    <button
                      onClick={() => deleteWork(w.id)}
                      className="p-1 rounded text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      value={w.company}
                      onChange={(e) => updateWork(w.id, { company: e.target.value })}
                      placeholder="Company Name (e.g. ABC Tech)"
                      className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200"
                    />
                    <input
                      type="text"
                      value={w.position}
                      onChange={(e) => updateWork(w.id, { position: e.target.value })}
                      placeholder="Role Title"
                      className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200"
                    />
                    <input
                      type="text"
                      value={w.startDate}
                      onChange={(e) => updateWork(w.id, { startDate: e.target.value })}
                      placeholder="Start Date"
                      className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200"
                    />
                    <input
                      type="text"
                      value={w.endDate}
                      onChange={(e) => updateWork(w.id, { endDate: e.target.value })}
                      placeholder="End Date"
                      className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Bullet Highlights (one per line)</label>
                    <textarea
                      rows={3}
                      value={w.highlights?.join('\n') || ''}
                      onChange={(e) => updateWork(w.id, { highlights: e.target.value.split('\n') })}
                      placeholder="• Architected high-throughput microservices...&#10;• Reduced load speed by 40%..."
                      className="w-full p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EDUCATION */}
        {activeEditorTab === 'education' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-bold text-sm text-white">Education & Degrees</h3>
              <button
                onClick={() =>
                  addEducation({
                    institution: 'State University',
                    area: 'Computer Science',
                    studyType: 'Bachelor of Science (B.S.)',
                    startDate: '2014',
                    endDate: '2018',
                  })
                }
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors text-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Education</span>
              </button>
            </div>

            <div className="space-y-3">
              {education.map((e) => (
                <div key={e.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-200">{e.institution || 'University'}</span>
                    <button onClick={() => deleteEducation(e.id)} className="text-red-400 hover:bg-red-500/10 p-1 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      value={e.institution}
                      onChange={(ev) => updateEducation(e.id, { institution: ev.target.value })}
                      placeholder="University Name"
                      className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200"
                    />
                    <input
                      type="text"
                      value={e.area}
                      onChange={(ev) => updateEducation(e.id, { area: ev.target.value })}
                      placeholder="Field of Study"
                      className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200"
                    />
                    <input
                      type="text"
                      value={e.studyType}
                      onChange={(ev) => updateEducation(e.id, { studyType: ev.target.value })}
                      placeholder="Degree Type"
                      className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200"
                    />
                    <input
                      type="text"
                      value={e.score || ''}
                      onChange={(ev) => updateEducation(e.id, { score: ev.target.value })}
                      placeholder="GPA or Honors"
                      className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SKILLS */}
        {activeEditorTab === 'skills' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-bold text-sm text-white">Skills & Competencies</h3>
              <button
                onClick={() =>
                  addSkill({
                    name: 'Core Technologies',
                    keywords: ['TypeScript', 'Next.js', 'Python'],
                  })
                }
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors text-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill Category</span>
              </button>
            </div>

            <div className="space-y-3">
              {skills.map((s) => (
                <div key={s.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      value={s.name}
                      onChange={(e) => updateSkill(s.id, { name: e.target.value })}
                      placeholder="Category Name"
                      className="font-semibold text-slate-200 bg-transparent border-b border-slate-700 px-1 py-0.5 focus:outline-none"
                    />
                    <button onClick={() => deleteSkill(s.id)} className="text-red-400 p-1 rounded hover:bg-red-500/10">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Skills list (comma separated)</label>
                    <input
                      type="text"
                      value={s.keywords.join(', ')}
                      onChange={(e) =>
                        updateSkill(s.id, {
                          keywords: e.target.value.split(',').map((k) => k.trim()).filter(Boolean),
                        })
                      }
                      placeholder="TypeScript, Next.js, Python..."
                      className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PROJECTS */}
        {activeEditorTab === 'projects' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-bold text-sm text-white">Featured Projects</h3>
              <button
                onClick={() =>
                  addProject({
                    name: 'XYZ Project Platform',
                    description: 'Real-time telemetry dashboard...',
                    keywords: ['React', 'Node.js'],
                    highlights: ['Processed 1M+ daily events...'],
                  })
                }
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors text-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-200">{p.name || 'Project'}</span>
                    <button onClick={() => deleteProject(p.id)} className="text-red-400 p-1 rounded hover:bg-red-500/10">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={p.name}
                    onChange={(e) => updateProject(p.id, { name: e.target.value })}
                    placeholder="Project Name (e.g. XYZ Platform)"
                    className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200"
                  />
                  <input
                    type="text"
                    value={p.description}
                    onChange={(e) => updateProject(p.id, { description: e.target.value })}
                    placeholder="Short description"
                    className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: 50+ STRUCTURAL TEMPLATE STYLES STUDIO */}
        {activeEditorTab === 'theme' && (
          <div className="space-y-5 animate-fade-in">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>50 Structural Layout Styles</span>
                </h3>
                <p className="text-[11px] text-slate-400">Select from 50 distinct structural template designs</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs font-mono font-bold">
                {filteredStyles.length} / 50 Variations
              </span>
            </div>

            {/* Category Filter Badges */}
            <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-800/80">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={styleSearch}
                onChange={(e) => setStyleSearch(e.target.value)}
                placeholder="Search styles by name or layout structure..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs"
              />
            </div>

            {/* Grid of 50 Structural Template Styles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredStyles.map((style) => {
                const isSelected = (themeConfig.styleId || 'style-1') === style.id;

                return (
                  <button
                    key={style.id}
                    onClick={() =>
                      updateThemeConfig({
                        styleId: style.id,
                        primaryColor: style.defaultPrimary,
                        accentColor: style.defaultAccent,
                      })
                    }
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 ring-1 ring-blue-500 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-100 text-xs flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block shrink-0 shadow-sm"
                          style={{ backgroundColor: style.defaultPrimary }}
                        ></span>
                        {style.name}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                    </div>

                    <p className="text-[10px] text-slate-400 leading-snug line-clamp-2">{style.description}</p>

                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        {style.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* COLOR & CUSTOMIZATION STUDIO SECTION */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <h4 className="font-bold text-sm text-white">Color & Typography Customization Studio</h4>
              </div>

              {/* Color Pickers Grid */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 font-medium">Primary Theme Color</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={themeConfig.primaryColor}
                      onChange={(e) => updateThemeConfig({ primaryColor: e.target.value })}
                      className="w-7 h-7 rounded border-none bg-transparent cursor-pointer"
                    />
                    <span className="font-mono text-[11px] text-slate-300">{themeConfig.primaryColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 font-medium">Accent Color</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={themeConfig.accentColor}
                      onChange={(e) => updateThemeConfig({ accentColor: e.target.value })}
                      className="w-7 h-7 rounded border-none bg-transparent cursor-pointer"
                    />
                    <span className="font-mono text-[11px] text-slate-300">{themeConfig.accentColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 font-medium">Text Body Color</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={themeConfig.textColor || '#1e293b'}
                      onChange={(e) => updateThemeConfig({ textColor: e.target.value })}
                      className="w-7 h-7 rounded border-none bg-transparent cursor-pointer"
                    />
                    <span className="font-mono text-[11px] text-slate-300">{themeConfig.textColor || '#1e293b'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 font-medium">Page Background</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={themeConfig.backgroundColor || '#ffffff'}
                      onChange={(e) => updateThemeConfig({ backgroundColor: e.target.value })}
                      className="w-7 h-7 rounded border-none bg-transparent cursor-pointer"
                    />
                    <span className="font-mono text-[11px] text-slate-300">{themeConfig.backgroundColor || '#ffffff'}</span>
                  </div>
                </div>
              </div>

              {/* Font Family Selection */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <label className="block text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-blue-400" />
                  <span>Font Family Pairing</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'inter', name: 'Inter (Sans)' },
                    { id: 'serif', name: 'Playfair (Serif)' },
                    { id: 'mono', name: 'Fira Code (Mono)' },
                  ].map((font) => (
                    <button
                      key={font.id}
                      onClick={() => updateThemeConfig({ fontFamily: font.id as FontPairing })}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        themeConfig.fontFamily === font.id
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {font.name}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
