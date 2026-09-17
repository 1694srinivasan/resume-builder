import React from 'react';
import { ResumeTemplateProps } from './types';

export const ExecutiveLuxe: React.FC<ResumeTemplateProps> = ({ data }) => {
  const { basics, work, education, skills, projects, certifications, themeConfig } = data;
  const { primaryColor, accentColor } = themeConfig;

  return (
    <div className="w-full bg-white p-10 font-serif text-gray-800 text-left">
      {/* Header */}
      <div className="text-center pb-6 mb-6 border-b-2" style={{ borderColor: primaryColor }}>
        <h1 className="text-3xl font-extrabold tracking-wide uppercase mb-1" style={{ color: primaryColor }}>
          {basics.name || 'EXECUTIVE NAME'}
        </h1>
        {basics.label && (
          <div className="text-sm uppercase tracking-widest font-sans font-medium mb-3" style={{ color: accentColor }}>
            {basics.label}
          </div>
        )}
        <div className="flex justify-center items-center flex-wrap gap-x-3 gap-y-1 text-xs font-sans text-gray-600">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>• {basics.phone}</span>}
          {basics.location?.city && <span>• {basics.location.city}, {basics.location.region}</span>}
          {basics.url && <span>• {basics.url}</span>}
        </div>
      </div>

      {/* Summary */}
      {basics.summary && (
        <div className="mb-6">
          <h2 className="text-sm font-sans font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: primaryColor }}>
            Executive Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-700 italic">{basics.summary}</p>
        </div>
      )}

      {/* Experience */}
      {work && work.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-sans font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ color: primaryColor }}>
            Leadership & Work Experience
          </h2>
          <div className="space-y-4">
            {work.map((w) => (
              <div key={w.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-base text-gray-900">{w.position}</h3>
                  <span className="text-xs font-sans text-gray-500 font-medium">
                    {w.startDate} – {w.current ? 'Present' : w.endDate}
                  </span>
                </div>
                <div className="text-xs font-sans font-semibold mb-1" style={{ color: accentColor }}>
                  {w.company} {w.location ? `| ${w.location}` : ''}
                </div>
                {w.highlights && (
                  <ul className="list-disc ml-5 text-xs font-sans space-y-1 text-gray-700">
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

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-sans font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ color: primaryColor }}>
            Education & Academic Credentials
          </h2>
          <div className="space-y-2">
            {education.map((e) => (
              <div key={e.id} className="flex justify-between items-baseline font-sans text-xs">
                <div>
                  <span className="font-bold text-gray-900">{e.studyType} in {e.area}</span> — <span style={{ color: accentColor }}>{e.institution}</span>
                </div>
                <span className="text-gray-500">{e.startDate} – {e.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-sans font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: primaryColor }}>
            Core Competencies & Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-2 text-xs font-sans">
            {skills.map((s) => (
              <div key={s.id}>
                <span className="font-bold">{s.name}: </span>
                <span className="text-gray-600">{s.keywords.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
