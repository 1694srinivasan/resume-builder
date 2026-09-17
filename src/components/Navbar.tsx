'use client';

import React, { useRef } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { exportToWordDocx } from '../lib/exportDocx';
import { 
  FileText, 
  Upload, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  CheckCircle, 
  ChevronDown,
  FileCode,
  RotateCcw
} from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

interface NavbarProps {
  printRef: React.RefObject<HTMLDivElement | null>;
}

export const Navbar: React.FC<NavbarProps> = ({ printRef }) => {
  const {
    resumeData,
    isEncrypted,
    atsAnalysis,
    loadSampleData,
    resetResume,
    setATSPanelOpen,
    setUploadModalOpen,
    setSecurityModalOpen,
  } = useResumeStore();

  const [exportOpen, setExportOpen] = React.useState(false);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${(resumeData.basics.name || 'Resume').replace(/\s+/g, '_')}_Resume`,
  });

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-900/90 border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-lg shadow-blue-500/20">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              VaultResume <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium">ATS Pro</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">Free, Encrypted & ATS-Approved Resume Generator</p>
          </div>
        </div>

        {/* Center - Real-time ATS Score Badge */}
        <button
          onClick={() => setATSPanelOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 transition-all cursor-pointer group shadow-sm"
        >
          <div className="relative flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <span className="text-xs font-semibold text-slate-200">ATS Score:</span>
          <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
            atsAnalysis.score >= 80 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
          }`}>
            {atsAnalysis.score}%
          </span>
        </button>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Security Vault Indicator */}
          <button
            onClick={() => setSecurityModalOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              isEncrypted
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/50'
                : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
            title="Encrypted Local Storage Vault Settings"
          >
            {isEncrypted ? <Lock className="w-3.5 h-3.5 text-emerald-400" /> : <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />}
            <span className="hidden sm:inline">{isEncrypted ? 'Vault Encrypted' : 'Local Storage'}</span>
          </button>

          {/* Load Sample Data */}
          <button
            onClick={loadSampleData}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-all"
            title="Load Pre-filled Sample Data"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Sample Data</span>
          </button>

          {/* Upload Resume */}
          <button
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-all"
          >
            <Upload className="w-3.5 h-3.5 text-blue-400" />
            <span>Upload (PDF/DOCX)</span>
          </button>

          {/* Dual Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setExportOpen(!exportOpen)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Output</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </button>

            {exportOpen && (
              <div
                className="absolute right-0 mt-2 w-52 rounded-xl bg-slate-800 border border-slate-700 shadow-2xl py-1 z-50 text-left"
                onMouseLeave={() => setExportOpen(false)}
              >
                <button
                  onClick={() => {
                    setExportOpen(false);
                    handlePrint();
                  }}
                  className="w-full px-4 py-2.5 text-xs text-slate-200 hover:bg-slate-700/80 flex items-center gap-2.5 transition-colors font-medium cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-red-400" />
                  <div>
                    <div className="font-semibold text-white">Export to PDF</div>
                    <div className="text-[10px] text-slate-400">ATS Print-Ready PDF file</div>
                  </div>
                </button>
                <div className="border-t border-slate-700/80 my-1"></div>
                <button
                  onClick={() => {
                    setExportOpen(false);
                    exportToWordDocx(resumeData);
                  }}
                  className="w-full px-4 py-2.5 text-xs text-slate-200 hover:bg-slate-700/80 flex items-center gap-2.5 transition-colors font-medium cursor-pointer"
                >
                  <FileCode className="w-4 h-4 text-blue-400" />
                  <div>
                    <div className="font-semibold text-white">Export to Word (.docx)</div>
                    <div className="text-[10px] text-slate-400">Native MS Word document</div>
                  </div>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
