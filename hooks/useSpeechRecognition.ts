'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** Minimal typing for Web Speech API (constructor name varies by browser). */
interface SpeechRecognitionAlternativeLike {
  readonly transcript: string;
}

interface SpeechRecognitionResultItemLike {
  readonly length: number;
  [index: number]: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionEventLike {
  readonly results: {
    readonly length: number;
    [index: number]: SpeechRecognitionResultItemLike;
  };
}

interface SpeechRecognitionErrorEventLike {
  readonly error?: string;
}

interface BrowserSpeechRecognition {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((ev: SpeechRecognitionErrorEventLike) => void) | null;
  onresult: ((ev: SpeechRecognitionEventLike) => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type SpeechRecognitionCtor = new () => BrowserSpeechRecognition;

function getRecognitionConstructor(): SpeechRecognitionCtor | null {
  if (typeof window === 'undefined') return null;
  const w = window as Window & {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function isSpeechRecognitionSupported(): boolean {
  return getRecognitionConstructor() !== null;
}

export interface StartSpeechRecognitionHandlers {
  onResult: (transcript: string) => void;
  onError?: (code: string) => void;
  /** After recognition stops (including no-match / engine end). Not called from onresult directly—follows `onend` / `onerror`. */
  onSessionEnd?: () => void;
}

export function useSpeechRecognition(defaultLang = 'en-US') {
  const [listening, setListening] = useState(false);
  const [supported] = useState<boolean>(() => getRecognitionConstructor() !== null);
  const recRef = useRef<BrowserSpeechRecognition | null>(null);
  const handlersRef = useRef<StartSpeechRecognitionHandlers | null>(null);

  const abort = useCallback(() => {
    try {
      recRef.current?.abort();
    } catch {
      // ignore
    }
    recRef.current = null;
    setListening(false);
  }, []);

  const start = useCallback(
    (handlers: StartSpeechRecognitionHandlers, lang: string = defaultLang) => {
      const Ctor = getRecognitionConstructor();
      if (!Ctor) {
        handlers.onError?.('not-supported');
        return;
      }
      handlersRef.current = handlers;
      try {
        abort();
        const rec = new Ctor();
        rec.lang = lang;
        rec.interimResults = false;
        rec.continuous = false;
        rec.onstart = () => setListening(true);
        rec.onend = () => {
          setListening(false);
          recRef.current = null;
          handlersRef.current?.onSessionEnd?.();
        };
        rec.onerror = (ev: SpeechRecognitionErrorEventLike) => {
          setListening(false);
          recRef.current = null;
          const code = ev.error ?? 'unknown';
          if (code !== 'aborted') {
            handlersRef.current?.onError?.(code);
          }
          handlersRef.current?.onSessionEnd?.();
        };
        rec.onresult = (ev: SpeechRecognitionEventLike) => {
          let text = '';
          const { results } = ev;
          for (let i = 0; i < results.length; i += 1) {
            text += results[i][0].transcript;
          }
          const trimmed = text.trim();
          handlersRef.current?.onResult(trimmed);
          setListening(false);
          try {
            rec.stop();
          } catch {
            // ignore
          }
        };
        recRef.current = rec;
        rec.start();
      } catch {
        setListening(false);
        handlers.onError?.('start-failed');
      }
    },
    [abort, defaultLang]
  );

  useEffect(() => () => abort(), [abort]);

  return { supported, listening, start, abort };
}
