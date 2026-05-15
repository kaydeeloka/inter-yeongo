'use client';

/**
 * Browser SpeechSynthesis helper (en-US).
 * Used for target-sentence playback. User replay prefers recorded Blob audio;
 * if that fails, callers may fall back to speakEnglish(transcript) — still TTS, not raw mic.
 */

const DEFAULT_LANG = 'en-US';

function pickEnglishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  const en = voices.filter((v) => v.lang?.toLowerCase().startsWith('en'));
  const us = en.find((v) => v.lang?.toLowerCase() === 'en-us');
  if (us) return us;
  const local = en.find((v) => v.localService);
  if (local) return local;
  return en[0] ?? null;
}

let voicesListenerAttached = false;

function ensureVoicesLoaded(): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  if (window.speechSynthesis.getVoices().length > 0) return;
  if (voicesListenerAttached) return;
  voicesListenerAttached = true;
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    voicesListenerAttached = false;
  });
}

export function cancelSpeech(): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  onEnd?: () => void;
  onError?: () => void;
}

export function speakEnglish(text: string, options: SpeakOptions = {}): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  const { rate = 0.95, pitch = 1, volume = 1, onEnd, onError } = options;
  cancelSpeech();
  ensureVoicesLoaded();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = DEFAULT_LANG;
  utter.rate = rate;
  utter.pitch = pitch;
  utter.volume = volume;
  utter.onend = () => onEnd?.();
  utter.onerror = () => onError?.();
  const voice = pickEnglishVoice();
  if (voice) utter.voice = voice;
  window.speechSynthesis.speak(utter);
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}
