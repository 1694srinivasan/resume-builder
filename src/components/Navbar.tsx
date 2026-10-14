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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-lg shadow-blue-500/20 shrink-0">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-sm sm:text-base tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400 flex items-center gap-1 sm:gap-1.5">
              <span>VaultResume</span>
              <span className="text-[10px] sm:text-xs px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium">ATS Pro</span>
            </h1>
            <p className="hidden md:block text-[11px] text-slate-400 font-medium">Free, Encrypted & ATS-Approved Resume Generator</p>
          </div>
        </div>

        {/* Center - Real-time ATS Score Badge (Desktop full, Mobile compact) */}
        <button
          onClick={() => setATSPanelOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 transition-all cursor-pointer group shadow-sm shrink-0"
          title="Open ATS Compliance Hub"
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
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">

          {/* Mobile ATS score badge */}
          <button
            onClick={() => setATSPanelOpen(true)}
            className="flex md:hidden items-center gap-1 px-2 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-bold text-emerald-400 cursor-pointer"
            title="ATS Compliance Score"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{atsAnalysis.score}%</span>
          </button>

          {/* Security Vault Indicator */}
          <button
            onClick={() => setSecurityModalOpen(true)}
            className={`flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
              isEncrypted
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/50'
                : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
            title="Encrypted Local Storage Vault Settings"
          >
            {isEncrypted ? <Lock className="w-3.5 h-3.5 text-emerald-400" /> : <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />}
            <span className="hidden lg:inline">{isEncrypted ? 'Vault Encrypted' : 'Local Storage'}</span>
          </button>

          {/* Load Sample Data (Desktop only) */}
          <button
            onClick={loadSampleData}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-all cursor-pointer"
            title="Load Pre-filled Sample Data"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Sample Data</span>
          </button>

          {/* Upload Resume */}
          <button
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-all cursor-pointer"
            title="Upload Existing Resume"
          >
            <Upload className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Upload (PDF/DOCX)</span>
            <span className="sm:hidden text-xs">Upload</span>
          </button>

          {/* Dual Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setExportOpen(!exportOpen)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xs:inline sm:inline">Export</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </button>

            {exportOpen && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-800 border border-slate-700 shadow-2xl py-1 z-50 text-left animate-fade-in"
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

                {/* Mobile-friendly helpers inside dropdown */}
                <div className="md:hidden border-t border-slate-700/80 my-1"></div>
                <button
                  onClick={() => {
                    setExportOpen(false);
                    loadSampleData();
                  }}
                  className="md:hidden w-full px-4 py-2 text-xs text-slate-200 hover:bg-slate-700/80 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Load Sample Data</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
