import React from 'react';
import { ResumeTemplateProps } from './types';

export const CompactPro: React.FC<ResumeTemplateProps> = ({ data }) => {
  const { basics, work, education, skills, projects, themeConfig } = data;
  const { primaryColor, accentColor } = themeConfig;

  return (
    <div className="w-full bg-white p-6 font-sans text-gray-900 text-left text-xs leading-tight">
      {/* Header Compact */}
      <div className="flex justify-between items-end pb-3 mb-3 border-b-2" style={{ borderColor: primaryColor }}>
        <div>
          <h1 className="text-xl font-bold tracking-tight" style={{ color: primaryColor }}>
            {basics.name || 'Compact Name'}
          </h1>
          <p className="text-xs font-semibold" style={{ color: accentColor }}>
            {basics.label}
          </p>
        </div>
        <div className="text-right text-[10px] text-gray-600 space-y-0.5">
          <div>{basics.email} | {basics.phone}</div>
          <div>{basics.location?.city} {basics.url ? `| ${basics.url}` : ''}</div>
        </div>
      </div>

      {/* Summary */}
      {basics.summary && (
        <div className="mb-3">
          <p className="text-[11px] text-gray-700 leading-snug">{basics.summary}</p>
        </div>
      )}

      {/* Experience */}
      {work && work.length > 0 && (
        <div className="mb-3">
          <h2 className="font-bold uppercase text-[11px] border-b pb-0.5 mb-1.5" style={{ color: primaryColor }}>
            Experience
          </h2>
          <div className="space-y-2">
            {work.map((w) => (
              <div key={w.id}>
                <div className="flex justify-between font-bold">
                  <span>{w.position} — <span style={{ color: accentColor }}>{w.company}</span></span>
                  <span className="text-[10px] text-gray-500">{w.startDate} - {w.current ? 'Present' : w.endDate}</span>
                </div>
                {w.highlights && (
                  <ul className="list-disc ml-3 space-y-0.5 text-[11px] text-gray-700 mt-0.5">
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

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-3">
          <h2 className="font-bold uppercase text-[11px] border-b pb-0.5 mb-1.5" style={{ color: primaryColor }}>
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
            {skills.map((s) => (
              <div key={s.id}>
                <span className="font-bold">{s.name}: </span>
                <span className="text-gray-700">{s.keywords.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div>
          <h2 className="font-bold uppercase text-[11px] border-b pb-0.5 mb-1.5" style={{ color: primaryColor }}>
            Education
          </h2>
          <div className="space-y-1 text-[11px]">
            {education.map((e) => (
              <div key={e.id} className="flex justify-between">
                <span><strong className="text-gray-900">{e.studyType} in {e.area}</strong> — {e.institution}</span>
                <span className="text-gray-500 text-[10px]">{e.startDate} - {e.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
