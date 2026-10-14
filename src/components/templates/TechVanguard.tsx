import React from 'react';
import { ResumeTemplateProps } from './types';

export const TechVanguard: React.FC<ResumeTemplateProps> = ({ data }) => {
  const { basics, work, education, skills, projects, themeConfig } = data;
  const { primaryColor, accentColor } = themeConfig;

  return (
    <div className="w-full bg-white p-8 font-sans text-gray-800 text-left">
      {/* Top Banner */}
      <div className="p-6 rounded-lg mb-6 text-white shadow-md" style={{ backgroundColor: primaryColor }}>
        <h1 className="text-2xl font-mono font-bold tracking-tight">{basics.name || 'Developer Name'}</h1>
        <p className="text-xs font-mono opacity-90 mt-0.5">{basics.label}</p>
        <div className="flex flex-wrap gap-3 mt-3 text-xs opacity-80 font-mono">
          {basics.email && <span>email: {basics.email}</span>}
          {basics.phone && <span>phone: {basics.phone}</span>}
          {basics.url && <span>web: {basics.url}</span>}
        </div>
      </div>

      {/* Summary */}
      {basics.summary && (
        <div className="mb-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500 mb-2">{"// About Me"}</h2>
          <p className="text-xs leading-relaxed text-gray-700">{basics.summary}</p>
        </div>
      )}

      {/* Skills Pill Grid */}
      {skills && skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500 mb-2">{"// Tech Stack & Skills"}</h2>
          <div className="space-y-2">
            {skills.map((s) => (
              <div key={s.id} className="text-xs">
                <span className="font-bold text-gray-900 mr-2">{s.name}:</span>
                <div className="inline-flex flex-wrap gap-1 mt-1">
                  {s.keywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono font-medium"
                      style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {work && work.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500 mb-3">{"// Experience"}</h2>
          <div className="space-y-4">
            {work.map((w) => (
              <div key={w.id} className="border-l-2 pl-3" style={{ borderColor: accentColor }}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-sm text-gray-900">{w.position}</h3>
                  <span className="text-[11px] font-mono text-gray-500">
                    {w.startDate} - {w.current ? 'Present' : w.endDate}
                  </span>
                </div>
                <div className="text-xs font-semibold text-gray-600 mb-1">{w.company}</div>
                {w.highlights && (
                  <ul className="list-disc ml-4 text-xs text-gray-700 space-y-1">
                    {w.highlights.map((hl, idx) => (
                      <li key={idx}>{hl}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500 mb-3">{"// Featured Projects"}</h2>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {projects.map((p) => (
              <div key={p.id} className="p-3 rounded border border-gray-200 bg-gray-50">
                <h4 className="font-bold text-gray-900 mb-1">{p.name}</h4>
                <p className="text-gray-600 text-[11px] mb-2">{p.description}</p>
                {p.keywords && (
                  <div className="flex flex-wrap gap-1">
                    {p.keywords.map((kw, i) => (
                      <span key={i} className="text-[10px] bg-white px-1.5 py-0.5 rounded border text-gray-600">
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div>
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500 mb-2">{"// Education"}</h2>
          {education.map((e) => (
            <div key={e.id} className="text-xs">
              <span className="font-bold">{e.studyType} in {e.area}</span> — {e.institution} ({e.startDate} - {e.endDate})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
