'use client';

import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { parseResumeFile } from '../../lib/parser';
import { X, Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const UploadModal: React.FC = () => {
  const { isUploadModalOpen, setUploadModalOpen, importResumeData } = useResumeStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isUploadModalOpen) return null;

  const handleFile = async (file: File) => {
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const parsed = await parseResumeFile(file);
      importResumeData(parsed);
      setSuccessMsg(`Successfully parsed ${file.name}! Your resume data has been loaded.`);
      setTimeout(() => {
        setIsLoading(false);
        setUploadModalOpen(false);
      }, 1200);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Failed to parse file. Please ensure it is a valid PDF or Word (.docx) document.');
      setIsLoading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Upload Existing Resume</h3>
              <p className="text-xs text-slate-400">Supports PDF (.pdf) & Word (.docx)</p>
            </div>
          </div>
          <button
            onClick={() => setUploadModalOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-center">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            className={`border-2 border-dashed rounded-xl p-8 transition-all flex flex-col items-center justify-center cursor-pointer ${
              isDragging
                ? 'border-blue-500 bg-blue-500/10 scale-[1.01]'
                : 'border-slate-700 hover:border-slate-600 bg-slate-950/50'
            }`}
          >
            {isLoading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                <span className="text-xs text-slate-300 font-medium">Extracting and parsing resume data...</span>
              </div>
            ) : (
              <>
                <FileText className="w-10 h-10 text-slate-400 mb-3" />
                <p className="text-sm font-semibold text-slate-200 mb-1">
                  Drag & Drop your old resume here
                </p>
                <p className="text-xs text-slate-400 mb-4">
                  or browse files from your computer
                </p>
                <label className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer transition-colors shadow-md">
                  Choose File
                  <input
                    type="file"
                    accept=".pdf,.docx,.json,.txt"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFile(e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </>
            )}
          </div>

          {successMsg && (
            <div className="mt-4 p-3 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 text-xs flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
