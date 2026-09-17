'use client';

import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { DynamicTemplateRenderer } from '../templates/DynamicTemplateRenderer';
import { STRUCTURAL_STYLES_CATALOG } from '../templates/stylesCatalog';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface ResumePreviewProps {
  printRef: React.RefObject<HTMLDivElement | null>;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ printRef }) => {
  const { resumeData } = useResumeStore();
  const [zoomScale, setZoomScale] = useState<number>(0.9);

  const styleId = resumeData.themeConfig.styleId || 'style-1';
  const activeStyle = STRUCTURAL_STYLES_CATALOG.find((s) => s.id === styleId) || STRUCTURAL_STYLES_CATALOG[0];

  const handleZoom = (delta: number) => {
    setZoomScale((prev) => Math.max(0.5, Math.min(1.3, Number((prev + delta).toFixed(2)))));
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 overflow-hidden relative">
      
      {/* Top Preview Control Strip */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-300">Active Style:</span>
          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-medium">
            {activeStyle.name}
          </span>
          <span className="hidden sm:inline text-slate-500">| Standard ATS A4 Print Layout</span>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
          <button
            onClick={() => handleZoom(-0.1)}
            className="p-1 hover:text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] w-10 text-center text-slate-300 font-medium">
            {Math.round(zoomScale * 100)}%
          </span>
          <button
            onClick={() => handleZoom(0.1)}
            className="p-1 hover:text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomScale(0.9)}
            className="p-1 hover:text-white transition-colors ml-1 border-l border-slate-800 pl-2"
            title="Reset Zoom"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start bg-slate-950/80">
        
        {/* Paper Container matching print dimensions */}
        <div
          style={{
            transform: `scale(${zoomScale})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className="shadow-2xl rounded-sm transition-all"
        >
          <div
            ref={printRef}
            className="w-[210mm] min-h-[297mm] bg-white text-black shadow-2xl overflow-hidden text-left"
          >
            <DynamicTemplateRenderer data={resumeData} />
          </div>
        </div>

      </div>
    </div>
  );
};
