'use client';

import React, { useRef, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { EditorTabs } from '../components/editor/EditorTabs';
import { ResumePreview } from '../components/preview/ResumePreview';
import { ATSScorePanel } from '../components/ats/ATSScorePanel';
import { UploadModal } from '../components/modals/UploadModal';
import { SecurityModal } from '../components/modals/SecurityModal';
import { useResumeStore } from '../store/useResumeStore';

export default function Home() {
  const printRef = useRef<HTMLDivElement>(null);
  const { initializeStore } = useResumeStore();

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans antialiased text-slate-100 selection:bg-blue-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar printRef={printRef} />

      {/* Main Workspace Split Layout */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left Half: Form Editor Panel */}
        <section className="w-full md:w-1/2 lg:w-[45%] xl:w-[40%] h-1/2 md:h-full overflow-hidden flex flex-col z-10 border-r border-slate-800">
          <EditorTabs />
        </section>

        {/* Right Half: Live Zoomable Preview */}
        <section className="w-full md:w-1/2 lg:w-[55%] xl:w-[60%] h-1/2 md:h-full overflow-hidden flex flex-col bg-slate-950">
          <ResumePreview printRef={printRef} />
        </section>

      </main>

      {/* Slide-over & Modal Overlays */}
      <ATSScorePanel />
      <UploadModal />
      <SecurityModal />
    </div>
  );
}
