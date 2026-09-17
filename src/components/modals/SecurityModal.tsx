'use client';

import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { encryptData } from '../../lib/crypto';
import { X, ShieldCheck, Lock, Unlock, Key, Download, CheckCircle2 } from 'lucide-react';
import { saveAs } from 'file-saver';

export const SecurityModal: React.FC = () => {
  const {
    isSecurityModalOpen,
    setSecurityModalOpen,
    isEncrypted,
    passcode,
    setPasscode,
    removePasscode,
    resumeData,
  } = useResumeStore();

  const [inputPasscode, setInputPasscode] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  if (!isSecurityModalOpen) return null;

  const handleSetPasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPasscode.trim()) return;
    const ok = await setPasscode(inputPasscode);
    if (ok) {
      setMsg('Custom passcode set! Your data is now encrypted with your key.');
      setInputPasscode('');
    }
  };

  const handleRemovePasscode = async () => {
    await removePasscode();
    setMsg('Vault reverted to default device encryption key.');
  };

  const handleExportVaultBackup = async () => {
    const encryptedStr = await encryptData(resumeData, passcode);
    const blob = new Blob([encryptedStr], { type: 'application/json' });
    saveAs(blob, `VaultResume_Backup_${Date.now()}.vault`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Local Privacy & Encryption Vault</h3>
              <p className="text-xs text-slate-400">Zero-Knowledge AES-GCM 256-Bit Protection</p>
            </div>
          </div>
          <button
            onClick={() => setSecurityModalOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-xs">
          
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 flex items-start gap-3">
            <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-200">100% Client-Side Privacy Guaranteed</div>
              <div className="text-slate-400 mt-1 leading-relaxed">
                Your personal details, work history, and contact information are encrypted right inside your browser before saving to local storage. No remote servers ever see your unencrypted data.
              </div>
            </div>
          </div>

          {msg && (
            <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{msg}</span>
            </div>
          )}

          {/* Passcode Configuration */}
          <form onSubmit={handleSetPasscode} className="space-y-3">
            <label className="block text-slate-300 font-semibold">
              Set Custom Passcode (Optional Vault Lock)
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Key className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={inputPasscode}
                  onChange={(e) => setInputPasscode(e.target.value)}
                  placeholder="Enter secret passcode..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors shrink-0"
              >
                Set Passcode
              </button>
            </div>
          </form>

          {isEncrypted && (
            <button
              onClick={handleRemovePasscode}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4 text-amber-400" />
              <span>Remove Custom Passcode</span>
            </button>
          )}

          <div className="border-t border-slate-800 pt-4">
            <button
              onClick={handleExportVaultBackup}
              className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span>Download Encrypted Vault Backup (.vault)</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
