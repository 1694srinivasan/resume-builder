import React from 'react';
import { ResumeTemplateProps } from './types';
import { Mail, Phone, MapPin, Globe, Link2 } from 'lucide-react';

const GithubIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

export const ModernMinimalist: React.FC<ResumeTemplateProps> = ({ data }) => {
  const { basics, work, education, skills, projects, certifications, themeConfig, sectionOrder } = data;
  const { primaryColor, accentColor, textColor, fontSize, lineHeight } = themeConfig;

  const getProfileIcon = (network: string) => {
    const net = network.toLowerCase();
    if (net.includes('linkedin')) return <LinkedinIcon />;
    if (net.includes('github')) return <GithubIcon />;
    return <Globe className="w-3.5 h-3.5" />;
  };

  const renderSection = (sectionKey: string) => {
    switch (sectionKey) {
      case 'summary':
        if (!basics.summary) return null;
        return (
          <div key="summary" className="mb-6">
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">{basics.summary}</p>
          </div>
        );

      case 'work':
        if (!work || work.length === 0) return null;
        return (
          <div key="work" className="mb-6">
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Work Experience
            </h2>
            <div className="space-y-4">
              {work.map((w) => (
                <div key={w.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-gray-900 text-sm">
                      {w.position} <span style={{ color: accentColor }}>@ {w.company}</span>
                    </h3>
                    <span className="text-xs font-medium text-gray-500">
                      {w.startDate} — {w.current ? 'Present' : w.endDate}
                    </span>
                  </div>
                  {w.location && <div className="text-xs text-gray-500 italic mb-1.5">{w.location}</div>}
                  {w.highlights && w.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-gray-700">
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

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" className="mb-6">
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {education.map((e) => (
                <div key={e.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-sm">
                      {e.studyType} in {e.area}
                    </h3>
                    <span className="text-xs font-medium text-gray-500">
                      {e.startDate} — {e.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-medium" style={{ color: accentColor }}>
                    {e.institution}
                  </div>
                  {e.score && <div className="text-xs text-gray-600 italic mt-0.5">{e.score}</div>}
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" className="mb-6">
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 gap-2 text-xs">
              {skills.map((s) => (
                <div key={s.id} className="flex items-start">
                  <span className="font-bold text-gray-900 w-36 shrink-0">{s.name}:</span>
                  <span className="text-gray-700 flex-1">{s.keywords.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className="mb-6">
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-sm">{p.name}</h3>
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noreferrer" className="text-xs hover:underline" style={{ color: accentColor }}>
                        Link ↗
                      </a>
                    )}
                  </div>
                  {p.description && <p className="text-xs text-gray-600 mt-0.5 mb-1">{p.description}</p>}
                  {p.highlights && p.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-gray-700">
                      {p.highlights.map((hl, idx) => (
                        <li key={idx}>{hl}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" className="mb-6">
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Certifications & Credentials
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {certifications.map((c) => (
                <div key={c.id} className="flex justify-between items-center text-gray-800 font-medium">
                  <span>{c.name} ({c.issuer})</span>
                  <span className="text-gray-500 text-[10px]">{c.date}</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="w-full bg-white p-8 shadow-sm font-sans text-left"
      style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight, color: textColor }}
    >
      {/* Header */}
      <header className="mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold tracking-tight mb-1" style={{ color: primaryColor }}>
          {basics.name || 'Your Full Name'}
        </h1>
        {basics.label && (
          <p className="text-sm font-semibold mb-3" style={{ color: accentColor }}>
            {basics.label}
          </p>
        )}

        {/* Contact Links Bar */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-600">
          {basics.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-gray-400" />
              <span>{basics.email}</span>
            </div>
          )}
          {basics.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              <span>{basics.phone}</span>
            </div>
          )}
          {basics.location?.city && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <span>
                {basics.location.city}
                {basics.location.region ? `, ${basics.location.region}` : ''}
              </span>
            </div>
          )}
          {basics.url && (
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-gray-400" />
              <span>{basics.url.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
          {basics.profiles?.map((p, idx) => (
            <div key={idx} className="flex items-center gap-1">
              {getProfileIcon(p.network)}
              <span>{p.username || p.network}</span>
            </div>
          ))}
        </div>
      </header>

      {/* Dynamic Render Sections by Section Order */}
      {sectionOrder.map((key) => renderSection(key))}
    </div>
  );
};
