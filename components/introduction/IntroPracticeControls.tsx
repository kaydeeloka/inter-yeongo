'use client';

import { Headphones, Mic, RotateCcw } from 'lucide-react';

interface IntroPracticeControlsProps {
  onListen: () => void;
  onPractice: () => void;
  onReset: () => void;
  listenDisabled: boolean;
  practiceDisabled: boolean;
  recognitionSupported: boolean;
}

export default function IntroPracticeControls({
  onListen,
  onPractice,
  onReset,
  listenDisabled,
  practiceDisabled,
  recognitionSupported,
}: IntroPracticeControlsProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <button
        type="button"
        onClick={onListen}
        disabled={listenDisabled}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[#302B8F] bg-white px-4 py-3 text-sm font-bold text-[#302B8F] shadow-sm transition hover:bg-[#FFF176]/35 disabled:cursor-not-allowed disabled:opacity-45"
      >
        <Headphones className="h-4 w-4 shrink-0" aria-hidden />
        듣기
      </button>
      <button
        type="button"
        onClick={onPractice}
        disabled={practiceDisabled || !recognitionSupported}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[#302B8F] bg-[#302B8F] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#25206F] disabled:cursor-not-allowed disabled:opacity-45"
      >
        <Mic className="h-4 w-4 shrink-0" aria-hidden />
        말하기 연습
      </button>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[#302B8F]/40 bg-white/90 px-4 py-3 text-sm font-bold text-[#6F6A8A] transition hover:border-[#302B8F] hover:text-[#302B8F] sm:flex-initial sm:min-w-[8rem]"
      >
        <RotateCcw className="h-4 w-4 shrink-0" aria-hidden />
        다시 작성
      </button>
    </div>
  );
}
