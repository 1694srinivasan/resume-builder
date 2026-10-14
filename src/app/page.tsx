'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { EditorTabs } from '../components/editor/EditorTabs';
import { ResumePreview } from '../components/preview/ResumePreview';
import { ATSScorePanel } from '../components/ats/ATSScorePanel';
import { UploadModal } from '../components/modals/UploadModal';
import { SecurityModal } from '../components/modals/SecurityModal';
import { useResumeStore } from '../store/useResumeStore';
import { Edit3, Eye, Sparkles } from 'lucide-react';

export default function Home() {
  const printRef = useRef<HTMLDivElement>(null);
  const { initializeStore, atsAnalysis } = useResumeStore();
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans antialiased text-slate-100 selection:bg-blue-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar printRef={printRef} />

      {/* Main Workspace: Split on desktop (md:flex-row), Full-screen tabbed on mobile */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left: Form Editor Panel */}
        <section
          className={`w-full md:w-1/2 lg:w-[45%] xl:w-[40%] h-full overflow-hidden flex flex-col z-10 border-r border-slate-800 ${
            mobileTab === 'editor' ? 'flex' : 'hidden md:flex'
          }`}
        >
          <EditorTabs />
        </section>

        {/* Right: Live Zoomable Preview */}
        <section
          className={`w-full md:w-1/2 lg:w-[55%] xl:w-[60%] h-full overflow-hidden flex flex-col bg-slate-950 ${
            mobileTab === 'preview' ? 'flex' : 'hidden md:flex'
          }`}
        >
          <ResumePreview printRef={printRef} />
        </section>

      </main>

      {/* Mobile Floating Bottom Switcher (Only visible on screens < md) */}
      <nav aria-label="Mobile View Navigation" className="md:hidden shrink-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 px-4 py-2 flex items-center justify-around z-30 shadow-2xl safe-area-pb">
        <button
          onClick={() => setMobileTab('editor')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 mx-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            mobileTab === 'editor'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Details</span>
        </button>

        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 mx-1 rounded-xl text-xs font-semibold transition-all cursor-pointer relative ${
            mobileTab === 'preview'
              ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Live Preview</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold">
            {atsAnalysis.score}%
          </span>
        </button>
      </nav>

      {/* Slide-over & Modal Overlays */}
      <ATSScorePanel />
      <UploadModal />
      <SecurityModal />
    </div>
  );
}

