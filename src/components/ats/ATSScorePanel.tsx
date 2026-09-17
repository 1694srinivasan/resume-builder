'use client';

import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { X, ShieldCheck, AlertCircle, CheckCircle2, AlertTriangle, Target, Lightbulb, Sparkles } from 'lucide-react';

export const ATSScorePanel: React.FC = () => {
  const {
    isATSPanelOpen,
    setATSPanelOpen,
    atsAnalysis,
    targetJobDescription,
    setTargetJobDescription,
  } = useResumeStore();

  if (!isATSPanelOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 text-slate-100 h-full overflow-y-auto flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80 sticky top-0 backdrop-blur">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-white">ATS Compliance Hub</h2>
              <p className="text-xs text-slate-400">Real-time Screening & Keyword Matcher</p>
            </div>
          </div>
          <button
            onClick={() => setATSPanelOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-6 flex-1">
          
          {/* Score Card Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-800 via-slate-800/90 to-slate-800/60 border border-slate-700/80 shadow-lg text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
            <div className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">Overall ATS Score</div>
            <div className="text-5xl font-extrabold my-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">
              {atsAnalysis.score}%
            </div>
            <p className="text-xs text-slate-300 font-medium max-w-xs mx-auto">
              {atsAnalysis.score >= 85
                ? 'Excellent! Your resume passes standard ATS filters with high readiness.'
                : 'Good start! Follow the recommendations below to boost your score above 85%.'}
            </p>
          </div>

          {/* Job Description Keyword Matcher Tool */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-400" />
              <h3 className="font-semibold text-sm text-white">Target Job Description Matcher</h3>
            </div>
            <p className="text-xs text-slate-400">
              Paste a target job posting below to match key technical terms and identify missing skills.
            </p>
            <textarea
              rows={3}
              value={targetJobDescription}
              onChange={(e) => setTargetJobDescription(e.target.value)}
              placeholder="Paste Job Description text here..."
              className="w-full text-xs p-3 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />

            {targetJobDescription && (
              <div className="space-y-2 pt-2 border-t border-slate-700/60">
                {atsAnalysis.matchedKeywords.length > 0 && (
                  <div>
                    <div className="text-[11px] font-semibold text-emerald-400 mb-1">
                      ✓ Matched Keywords ({atsAnalysis.matchedKeywords.length}):
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {atsAnalysis.matchedKeywords.map((kw, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {atsAnalysis.missingKeywords.length > 0 && (
                  <div>
                    <div className="text-[11px] font-semibold text-amber-400 mb-1">
                      ⚠ Missing Recommended Keywords ({atsAnalysis.missingKeywords.length}):
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {atsAnalysis.missingKeywords.map((kw, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Detailed Compliance Checklist */}
          <div>
            <h3 className="font-semibold text-sm text-white mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>ATS Screening Checklist</span>
            </h3>
            <div className="space-y-3">
              {atsAnalysis.checks.map((check) => (
                <div
                  key={check.id}
                  className={`p-3.5 rounded-xl border text-xs text-left transition-all ${
                    check.status === 'pass'
                      ? 'bg-slate-800/40 border-slate-800'
                      : check.status === 'warning'
                      ? 'bg-amber-950/20 border-amber-500/30'
                      : 'bg-red-950/20 border-red-500/30'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {check.status === 'pass' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                    {check.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
                    {check.status === 'fail' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <div className="font-semibold text-slate-200">{check.title}</div>
                      <div className="text-slate-400 mt-0.5">{check.description}</div>
                      {check.suggestion && (
                        <div className="mt-1.5 p-2 rounded bg-slate-900/80 text-blue-300 border border-blue-500/20 text-[11px] flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-blue-400 shrink-0" />
                          <span>{check.suggestion}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
