import { decryptData, encryptData } from './crypto';
import { ResumeData } from '../types/resume';

const STORAGE_KEY = 'RESUME_BUILDER_VAULT_DATA';
const PASSCODE_FLAG_KEY = 'RESUME_BUILDER_HAS_PASSCODE';

export async function saveResumeToStorage(data: ResumeData, passcode?: string): Promise<boolean> {
  try {
    if (typeof window === 'undefined') return false;
    const encrypted = await encryptData(data, passcode);
    localStorage.setItem(STORAGE_KEY, encrypted);
    return true;
  } catch (err) {
    return false;
  }
}

export async function loadResumeFromStorage(passcode?: string): Promise<ResumeData | null> {
  try {
    if (typeof window === 'undefined') return null;
    const encrypted = localStorage.getItem(STORAGE_KEY);
    if (!encrypted) return null;

    const result = await decryptData<ResumeData>(encrypted, passcode);
    if (!result) {
      // If data was corrupted or unreadable, remove stale item
      localStorage.removeItem(STORAGE_KEY);
    }
    return result;
  } catch (err) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    return null;
  }
}

export function clearResumeStorage(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function setHasCustomPasscode(hasPasscode: boolean): void {
  if (typeof window !== 'undefined') {
    if (hasPasscode) {
      localStorage.setItem(PASSCODE_FLAG_KEY, 'true');
    } else {
      localStorage.removeItem(PASSCODE_FLAG_KEY);
    }
  }
}

export function checkHasCustomPasscode(): boolean {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(PASSCODE_FLAG_KEY) === 'true';
  }
  return false;
}
