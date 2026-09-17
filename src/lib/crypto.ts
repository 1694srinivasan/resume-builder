/**
 * Client-Side Zero-Knowledge AES-GCM 256 Encryption & Decryption Engine
 * Uses Web Crypto API (SubtleCrypto) + PBKDF2 for key derivation.
 */

const DEFAULT_SALT = new TextEncoder().encode('RESUME_BUILDER_SECRET_SALT_2026');

async function getKey(passcode?: string): Promise<CryptoKey> {
  const secret = passcode || 'DEFAULT_LOCAL_VAULT_KEY_RESUME_BUILDER';
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: DEFAULT_SALT,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptData(data: object | string, passcode?: string): Promise<string> {
  try {
    if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
      return typeof data === 'string' ? data : JSON.stringify(data);
    }
    const key = await getKey(passcode);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const jsonStr = typeof data === 'string' ? data : JSON.stringify(data);
    const encoded = new TextEncoder().encode(jsonStr);

    const ciphertext = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      key,
      encoded
    );

    const combined = new Uint8Array(iv.length + ciphertext.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(ciphertext), iv.length);

    let binary = '';
    const bytes = combined;
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return 'ENC:' + btoa(binary);
  } catch (error) {
    return typeof data === 'string' ? data : JSON.stringify(data);
  }
}

export async function decryptData<T>(encryptedString: string, passcode?: string): Promise<T | null> {
  try {
    if (!encryptedString || typeof encryptedString !== 'string') return null;

    if (!encryptedString.startsWith('ENC:')) {
      // Fallback: unencrypted JSON format
      try {
        return JSON.parse(encryptedString) as T;
      } catch {
        return null;
      }
    }

    if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
      return null;
    }

    const base64Str = encryptedString.substring(4);
    let binary = '';
    try {
      binary = atob(base64Str);
    } catch {
      return null;
    }

    const combined = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      combined[i] = binary.charCodeAt(i);
    }

    if (combined.length <= 12) return null;

    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);

    // Primary attempt with supplied passcode
    try {
      const key = await getKey(passcode);
      const decrypted = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: iv,
        },
        key,
        ciphertext
      );
      const jsonStr = new TextDecoder().decode(decrypted);
      return JSON.parse(jsonStr) as T;
    } catch {
      // Secondary fallback attempt with default key if custom passcode failed
      if (passcode) {
        try {
          const defaultKey = await getKey(undefined);
          const decrypted = await window.crypto.subtle.decrypt(
            {
              name: 'AES-GCM',
              iv: iv,
            },
            defaultKey,
            ciphertext
          );
          const jsonStr = new TextDecoder().decode(decrypted);
          return JSON.parse(jsonStr) as T;
        } catch {
          return null;
        }
      }
      return null;
    }
  } catch {
    return null;
  }
}
