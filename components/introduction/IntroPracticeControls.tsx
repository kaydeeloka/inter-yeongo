'use client';

import { Headphones, Mic, RotateCcw, StopCircle } from 'lucide-react';

interface IntroPracticeControlsProps {
  onListen: () => void;
  onPractice: () => void;
  onStop: () => void;
  onStopListen: () => void;
  onReset: () => void;
  listenDisabled: boolean;
  practiceDisabled: boolean;
  recognitionSupported: boolean;
  listening: boolean;
  ttsPlaying: boolean;
}

export default function IntroPracticeControls({
  onListen,
  onPractice,
  onStop,
  onStopListen,
  onReset,
  listenDisabled,
  practiceDisabled,
  recognitionSupported,
  listening,
  ttsPlaying,
}: IntroPracticeControlsProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {/* 듣기 / 중지(TTS) */}
      {ttsPlaying ? (
        <button
          type="button"
          onClick={onStopListen}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border-4 border-orange-500 bg-orange-400 px-4 py-3 text-sm font-black uppercase text-white shadow-[3px_3px_0px_0px_rgba(194,65,12,0.4)] transition hover:bg-orange-500 active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
        >
          <StopCircle className="h-4 w-4 shrink-0 animate-pulse" aria-hidden />
          재생 중지
        </button>
      ) : (
        <button
          type="button"
          onClick={onListen}
          disabled={listenDisabled}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border-4 border-[#312e81] bg-white px-4 py-3 text-sm font-black uppercase text-[#312e81] shadow-[3px_3px_0px_0px_rgba(49,46,129,1)] transition hover:bg-yellow-100 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-40 disabled:pointer-events-none"
        >
          <Headphones className="h-4 w-4 shrink-0" aria-hidden />
          듣기
        </button>
      )}

      {/* 말하기 연습 / 중지(STT) */}
      {listening ? (
        <button
          type="button"
          onClick={onStop}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border-4 border-rose-500 bg-rose-500 px-4 py-3 text-sm font-black uppercase text-white shadow-[3px_3px_0px_0px_rgba(244,63,94,0.4)] transition hover:bg-rose-600 active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
        >
          <StopCircle className="h-4 w-4 shrink-0 animate-pulse" aria-hidden />
          중지
        </button>
      ) : (
        <button
          type="button"
          onClick={onPractice}
          disabled={practiceDisabled || !recognitionSupported}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border-4 border-[#312e81] bg-[#312e81] px-4 py-3 text-sm font-black uppercase text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] transition hover:bg-[#25206F] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-40 disabled:pointer-events-none"
        >
          <Mic className="h-4 w-4 shrink-0" aria-hidden />
          말하기 연습
        </button>
      )}

      <button
        type="button"
        onClick={onReset}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border-4 border-[#312e81]/30 bg-white px-4 py-3 text-sm font-black uppercase text-[#312e81]/50 transition hover:border-[#312e81] hover:text-[#312e81] sm:flex-initial sm:min-w-32"
      >
        <RotateCcw className="h-4 w-4 shrink-0" aria-hidden />
        다시 작성
      </button>
    </div>
  );
}
