import React from 'react';
import { ResumeData } from '../../types/resume';
import { STRUCTURAL_STYLES_CATALOG, StructuralStyleDefinition } from './stylesCatalog';
import { Mail, Phone, MapPin, Globe, Link2 } from 'lucide-react';

interface DynamicTemplateRendererProps {
  data: ResumeData;
}

export const DynamicTemplateRenderer: React.FC<DynamicTemplateRendererProps> = ({ data }) => {
  const { basics, work, education, skills, projects, certifications, themeConfig, sectionOrder } = data;
  const {
    styleId = 'style-1',
    primaryColor = '#0f172a',
    accentColor = '#2563eb',
    textColor = '#1e293b',
    backgroundColor = '#ffffff',
    fontFamily = 'inter',
    fontSize = 14,
    lineHeight = 1.45,
  } = themeConfig;

  // Resolve structural style definition from catalog
  const currentStyle: StructuralStyleDefinition =
    STRUCTURAL_STYLES_CATALOG.find((s) => s.id === styleId) || STRUCTURAL_STYLES_CATALOG[0];

  const fontClass =
    fontFamily === 'serif'
      ? 'font-serif'
      : fontFamily === 'mono'
      ? 'font-mono'
      : fontFamily === 'outfit'
      ? 'font-sans'
      : 'font-sans';

  // --- RENDER SECTION HEADER helper ---
  const renderSectionHeader = (title: string) => {
    switch (currentStyle.sectionHeaderStyle) {
      case 'left-border':
        return (
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-3 pl-2.5 border-l-4"
            style={{ color: primaryColor, borderColor: accentColor }}
          >
            {title}
          </h2>
        );
      case 'solid-pill':
        return (
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-3 px-3 py-1 rounded inline-block text-white"
            style={{ backgroundColor: primaryColor }}
          >
            {title}
          </h2>
        );
      case 'centered-double-line':
        return (
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 border-b border-gray-300"></div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-center" style={{ color: primaryColor }}>
              {title}
            </h2>
            <div className="flex-1 border-b border-gray-300"></div>
          </div>
        );
      case 'bracket-style':
        return (
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider mb-3" style={{ color: accentColor }}>
            [ {title} ]
          </h2>
        );
      case 'glass-bg':
        return (
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-3 p-1.5 rounded bg-slate-100 border-b-2"
            style={{ color: primaryColor, borderColor: accentColor }}
          >
            {title}
          </h2>
        );
      case 'top-accent-border':
        return (
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-3 pt-1 border-t-2"
            style={{ color: primaryColor, borderColor: accentColor }}
          >
            {title}
          </h2>
        );
      case 'minimal-caps':
        return (
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3 text-gray-400">
            // {title}
          </h2>
        );
      case 'underline':
      default:
        return (
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b"
            style={{ color: primaryColor, borderColor: primaryColor }}
          >
            {title}
          </h2>
        );
    }
  };

  // --- RENDER HEADER LAYOUT ---
  const renderHeader = () => {
    const contactElements = (
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-600 mt-2">
        {basics.email && (
          <div className="flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 opacity-60" />
            <span>{basics.email}</span>
          </div>
        )}
        {basics.phone && (
          <div className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 opacity-60" />
            <span>{basics.phone}</span>
          </div>
        )}
        {basics.location?.city && (
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 opacity-60" />
            <span>
              {basics.location.city}
              {basics.location.region ? `, ${basics.location.region}` : ''}
            </span>
          </div>
        )}
        {basics.url && (
          <div className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 opacity-60" />
            <span>{basics.url.replace(/^https?:\/\//, '')}</span>
          </div>
        )}
      </div>
    );

    if (currentStyle.headerLayout === 'two-tone-banner') {
      return (
        <div className="p-6 rounded-lg mb-6 text-white shadow-sm" style={{ backgroundColor: primaryColor }}>
          <h1 className="text-2xl font-bold tracking-tight mb-1">{basics.name || 'Your Full Name'}</h1>
          {basics.label && <p className="text-xs opacity-90 font-medium">{basics.label}</p>}
          <div className="mt-3 text-xs opacity-80">{contactElements}</div>
        </div>
      );
    }

    if (currentStyle.headerLayout === 'centered-hero') {
      return (
        <div className="text-center pb-5 mb-6 border-b-2" style={{ borderColor: primaryColor }}>
          <h1 className="text-3xl font-extrabold tracking-wide uppercase mb-1" style={{ color: primaryColor }}>
            {basics.name || 'Your Full Name'}
          </h1>
          {basics.label && (
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: accentColor }}>
              {basics.label}
            </p>
          )}
          <div className="flex justify-center">{contactElements}</div>
        </div>
      );
    }

    if (currentStyle.headerLayout === 'top-accent-bar') {
      return (
        <div className="pt-3 border-t-8 mb-6" style={{ borderColor: accentColor }}>
          <h1 className="text-2xl font-bold tracking-tight mb-0.5" style={{ color: primaryColor }}>
            {basics.name || 'Your Full Name'}
          </h1>
          {basics.label && (
            <p className="text-xs font-semibold mb-2" style={{ color: accentColor }}>
              {basics.label}
            </p>
          )}
          {contactElements}
        </div>
      );
    }

    // Default Left Column Header
    return (
      <header className="mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold tracking-tight mb-1" style={{ color: primaryColor }}>
          {basics.name || 'Your Full Name'}
        </h1>
        {basics.label && (
          <p className="text-xs font-semibold mb-2" style={{ color: accentColor }}>
            {basics.label}
          </p>
        )}
        {contactElements}
      </header>
    );
  };

  // --- RENDER SECTION CONTENTS ---
  const renderSummarySection = () => {
    if (!basics.summary) return null;
    return (
      <div key="summary" className="mb-6">
        {renderSectionHeader('Professional Summary')}
        <p className="text-gray-700 leading-relaxed text-xs">{basics.summary}</p>
      </div>
    );
  };

  const renderWorkSection = () => {
    if (!work || work.length === 0) return null;
    return (
      <div key="work" className="mb-6">
        {renderSectionHeader('Work Experience')}
        <div className="space-y-4">
          {work.map((w) => (
            <div
              key={w.id}
              className={`break-inside-avoid ${
                currentStyle.workStyle === 'border-left-card' ? 'pl-3 border-l-2' : ''
              }`}
              style={{ borderColor: accentColor }}
            >
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="font-bold text-gray-900 text-xs">
                  {w.position} <span style={{ color: accentColor }}>@ {w.company}</span>
                </h3>
                <span className="text-[11px] font-medium text-gray-500">
                  {w.startDate} — {w.current ? 'Present' : w.endDate}
                </span>
              </div>
              {w.highlights && w.highlights.length > 0 && (
                <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-gray-700 mt-1">
                  {w.highlights.map((hl, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {hl}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEducationSection = () => {
    if (!education || education.length === 0) return null;
    return (
      <div key="education" className="mb-6">
        {renderSectionHeader('Education')}
        <div className="space-y-3">
          {education.map((e) => (
            <div key={e.id} className="break-inside-avoid">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-900 text-xs">
                  {e.studyType} in {e.area}
                </h3>
                <span className="text-[11px] font-medium text-gray-500">
                  {e.startDate} — {e.endDate}
                </span>
              </div>
              <div className="text-xs font-medium" style={{ color: accentColor }}>
                {e.institution}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSkillsSection = () => {
    if (!skills || skills.length === 0) return null;
    return (
      <div key="skills" className="mb-6">
        {renderSectionHeader('Technical Skills')}
        <div className="space-y-2 text-xs">
          {skills.map((s) => (
            <div key={s.id} className="flex flex-col sm:flex-row sm:items-start gap-1">
              <span className="font-bold text-gray-900 shrink-0 min-w-[120px]">{s.name}:</span>
              {currentStyle.skillStyle === 'badge-pills' ? (
                <div className="flex flex-wrap gap-1">
                  {s.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[11px] font-medium"
                      style={{ backgroundColor: `${accentColor}18`, color: primaryColor }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-gray-700">{s.keywords.join(', ')}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProjectsSection = () => {
    if (!projects || projects.length === 0) return null;
    return (
      <div key="projects" className="mb-6">
        {renderSectionHeader('Projects')}
        <div className="space-y-3 text-xs">
          {projects.map((p) => (
            <div key={p.id} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-gray-900">
                <span>{p.name}</span>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer" className="text-[11px]" style={{ color: accentColor }}>
                    Link ↗
                  </a>
                )}
              </div>
              {p.description && <p className="text-gray-600 mt-0.5 mb-1">{p.description}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Dispatch section by key
  const renderSectionByKey = (key: string) => {
    switch (key) {
      case 'summary':
        return renderSummarySection();
      case 'work':
        return renderWorkSection();
      case 'education':
        return renderEducationSection();
      case 'skills':
        return renderSkillsSection();
      case 'projects':
        return renderProjectsSection();
      default:
        return null;
    }
  };

  // --- TWO COLUMN LAYOUT HANDLING ---
  const isTwoColumn =
    currentStyle.columnLayout === 'two-column-left-30' || currentStyle.columnLayout === 'two-column-left-40';

  if (isTwoColumn) {
    const sidebarWidthClass = currentStyle.columnLayout === 'two-column-left-40' ? 'w-2/5' : 'w-1/3';
    const mainWidthClass = currentStyle.columnLayout === 'two-column-left-40' ? 'w-3/5' : 'w-2/3';

    return (
      <div
        className={`w-full bg-white flex text-left ${fontClass}`}
        style={{ backgroundColor, fontSize: `${fontSize}px`, lineHeight, color: textColor }}
      >
        {/* Left Column Sidebar */}
        <div className={`${sidebarWidthClass} p-6 text-white`} style={{ backgroundColor: primaryColor }}>
          <h1 className="text-xl font-bold mb-1">{basics.name || 'Your Full Name'}</h1>
          <p className="text-xs opacity-90 mb-6 font-medium">{basics.label}</p>

          <div className="space-y-2 text-xs opacity-85 mb-6 border-b border-white/20 pb-4">
            {basics.email && <div>{basics.email}</div>}
            {basics.phone && <div>{basics.phone}</div>}
            {basics.location?.city && (
              <div>
                {basics.location.city}, {basics.location.region}
              </div>
            )}
            {basics.url && <div className="break-all">{basics.url}</div>}
          </div>

          {/* Skills in Sidebar */}
          {skills && skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-white/90">Skills</h3>
              <div className="space-y-2 text-xs">
                {skills.map((s) => (
                  <div key={s.id}>
                    <div className="font-semibold text-white/95">{s.name}</div>
                    <div className="text-[11px] text-white/70">{s.keywords.join(', ')}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education in Sidebar */}
          {education && education.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-white/90">Education</h3>
              {education.map((e) => (
                <div key={e.id} className="text-xs mb-2">
                  <div className="font-bold text-white/95">{e.studyType}</div>
                  <div className="text-[11px] text-white/70">{e.institution}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Main Column */}
        <div className={`${mainWidthClass} p-8`}>
          {renderSummarySection()}
          {renderWorkSection()}
          {renderProjectsSection()}
        </div>
      </div>
    );
  }

  // --- DEFAULT SINGLE COLUMN LAYOUT ---
  return (
    <div
      className={`w-full bg-white p-8 text-left ${fontClass}`}
      style={{ backgroundColor, fontSize: `${fontSize}px`, lineHeight, color: textColor }}
    >
      {renderHeader()}
      {sectionOrder.map((key) => renderSectionByKey(key))}
    </div>
  );
};
