'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { DynamicTemplateRenderer } from '../templates/DynamicTemplateRenderer';
import { STRUCTURAL_STYLES_CATALOG } from '../templates/stylesCatalog';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface ResumePreviewProps {
  printRef: React.RefObject<HTMLDivElement | null>;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ printRef }) => {
  const { resumeData } = useResumeStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomScale, setZoomScale] = useState<number>(0.85);
  const [isAutoFit, setIsAutoFit] = useState<boolean>(true);

  const styleId = resumeData.themeConfig.styleId || 'style-1';
  const activeStyle = STRUCTURAL_STYLES_CATALOG.find((s) => s.id === styleId) || STRUCTURAL_STYLES_CATALOG[0];

  const A4_WIDTH_PX = 794; // 210mm in 96dpi
  const A4_HEIGHT_PX = 1123; // 297mm in 96dpi

  const calculateFitScale = useCallback(() => {
    if (!containerRef.current) return 0.85;
    const containerWidth = containerRef.current.clientWidth;
    const padding = containerWidth < 640 ? 20 : 48;
    const availableWidth = Math.max(260, containerWidth - padding);
    return Math.min(1.2, Math.max(0.3, Number((availableWidth / A4_WIDTH_PX).toFixed(2))));
  }, [A4_WIDTH_PX]);

  const handleFitToWidth = useCallback(() => {
    const fit = calculateFitScale();
    setZoomScale(fit);
    setIsAutoFit(true);
  }, [calculateFitScale]);

  // Auto-fit on initial mount and resize
  useEffect(() => {
    handleFitToWidth();

    const handleResize = () => {
      if (window.innerWidth < 768 || isAutoFit) {
        handleFitToWidth();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleFitToWidth, isAutoFit]);

  const handleZoom = (delta: number) => {
    setIsAutoFit(false);
    setZoomScale((prev) => Math.max(0.3, Math.min(1.4, Number((prev + delta).toFixed(2)))));
  };

  const handleSetScale = (scale: number) => {
    setIsAutoFit(false);
    setZoomScale(scale);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 overflow-hidden relative">
      
      {/* Top Preview Control Strip */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400 gap-2 shrink-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="font-semibold text-slate-300 hidden xs:inline">Style:</span>
          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-medium truncate max-w-[130px] sm:max-w-[220px]">
            {activeStyle.name}
          </span>
          <span className="hidden lg:inline text-slate-500 text-[11px]">| Standard ATS A4 Layout</span>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1 bg-slate-950 px-1.5 sm:px-2 py-1 rounded-lg border border-slate-800 shrink-0">
          <button
            onClick={() => handleZoom(-0.08)}
            className="p-1 hover:text-white transition-colors cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          
          <span className="font-mono text-[11px] w-9 sm:w-11 text-center text-slate-300 font-medium select-none">
            {Math.round(zoomScale * 100)}%
          </span>
          
          <button
            onClick={() => handleZoom(0.08)}
            className="p-1 hover:text-white transition-colors cursor-pointer"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {/* Quick Fit Button */}
          <button
            onClick={handleFitToWidth}
            className={`px-1.5 py-0.5 text-[10px] font-semibold rounded transition-colors ml-1 border-l border-slate-800 pl-2 cursor-pointer ${
              isAutoFit ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
            title="Fit to Screen Width"
          >
            Fit
          </button>

          {/* 100% Zoom Button */}
          <button
            onClick={() => handleSetScale(1.0)}
            className={`px-1.5 py-0.5 text-[10px] font-semibold rounded transition-colors cursor-pointer ${
              zoomScale === 1.0 ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
            title="100% Real Size"
          >
            100%
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-2 sm:p-6 bg-slate-950/80 overscroll-contain flex flex-col"
      >
        {/*
          Sizing wrapper:
          Matches scaled dimensions precisely so the container scrolls and centers correctly
          without flex-justify-center negative-coordinate truncation bugs.
        */}
        <div
          style={{
            width: `${A4_WIDTH_PX * zoomScale}px`,
            minHeight: `${A4_HEIGHT_PX * zoomScale}px`,
          }}
          className="mx-auto my-2 sm:my-4 transition-all duration-150 relative shadow-2xl"
        >
          <div
            style={{
              width: `${A4_WIDTH_PX}px`,
              transform: `scale(${zoomScale})`,
              transformOrigin: 'top left',
              transition: 'transform 0.15s ease-out',
            }}
            className="rounded-sm"
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
    </div>
  );
};

