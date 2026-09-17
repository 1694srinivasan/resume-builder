import React from 'react';
import { ResumeTemplateProps } from './types';

export const CreativeStudio: React.FC<ResumeTemplateProps> = ({ data }) => {
  const { basics, work, education, skills, projects, themeConfig } = data;
  const { primaryColor, accentColor } = themeConfig;

  return (
    <div className="w-full bg-white flex text-left font-sans text-gray-800 min-h-[1000px]">
      {/* Left Accent Sidebar */}
      <div className="w-1/3 p-6 text-white" style={{ backgroundColor: primaryColor }}>
        <h1 className="text-xl font-bold mb-1">{basics.name || 'Creative Name'}</h1>
        <p className="text-xs opacity-90 mb-6 font-medium">{basics.label}</p>

        {/* Contact info */}
        <div className="space-y-2 text-xs opacity-85 mb-8 border-b border-white/20 pb-6">
          {basics.email && <div>{basics.email}</div>}
          {basics.phone && <div>{basics.phone}</div>}
          {basics.location?.city && <div>{basics.location.city}, {basics.location.region}</div>}
          {basics.url && <div className="break-all">{basics.url}</div>}
        </div>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-white/90">Skillset</h3>
            <div className="space-y-3 text-xs">
              {skills.map((s) => (
                <div key={s.id}>
                  <div className="font-semibold text-white/95 mb-1">{s.name}</div>
                  <div className="text-[11px] text-white/70">{s.keywords.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-white/90">Education</h3>
            {education.map((e) => (
              <div key={e.id} className="text-xs mb-3">
                <div className="font-bold text-white/95">{e.studyType}</div>
                <div className="text-white/80">{e.area}</div>
                <div className="text-[11px] text-white/60">{e.institution}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Right Content */}
      <div className="w-2/3 p-8">
        {basics.summary && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accentColor }}>
              Profile Overview
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed">{basics.summary}</p>
          </div>
        )}

        {work && work.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ color: accentColor }}>
              Experience History
            </h2>
            <div className="space-y-4">
              {work.map((w) => (
                <div key={w.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-sm text-gray-900">{w.position}</h3>
                    <span className="text-[11px] text-gray-500">{w.startDate} - {w.current ? 'Present' : w.endDate}</span>
                  </div>
                  <div className="text-xs font-semibold mb-1" style={{ color: primaryColor }}>{w.company}</div>
                  {w.highlights && (
                    <ul className="list-disc ml-4 text-xs text-gray-600 space-y-1">
                      {w.highlights.map((hl, i) => (
                        <li key={i}>{hl}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {projects && projects.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ color: accentColor }}>
              Selected Projects
            </h2>
            <div className="space-y-3 text-xs">
              {projects.map((p) => (
                <div key={p.id}>
                  <div className="font-bold text-gray-900">{p.name}</div>
                  <p className="text-gray-600 text-[11px]">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
