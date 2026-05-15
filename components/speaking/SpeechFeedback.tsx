'use client';

import { AlertCircle, CheckCircle2, Lightbulb, Sparkles } from 'lucide-react';

import type { SpeakingChallenge } from '@/data/speaking-challenges';

interface SpeechFeedbackProps {
  challenge: SpeakingChallenge;
  transcript: string;
  similarity: number;
  passed: boolean;
  onRetry: () => void;
  isListening: boolean;
}

export default function SpeechFeedback({
  challenge,
  transcript,
  similarity,
  passed,
  onRetry,
  isListening,
}: SpeechFeedbackProps) {
  const pct = Math.round(similarity * 100);
  const tone = passed
    ? 'from-emerald-50 via-white to-teal-50/90 border-emerald-200/90'
    : 'from-amber-50 via-white to-orange-50/80 border-amber-200/85';

  if (isListening) {
    return (
      <div className="mt-3 rounded-xl border border-indigo-200/80 bg-gradient-to-r from-indigo-50/90 to-violet-50/70 px-3 py-3 text-sm text-indigo-900">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 animate-pulse" aria-hidden />
          <span className="font-medium leading-snug">듣는 중… 편하게 말해 보세요.</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`mt-3 rounded-xl border bg-gradient-to-br ${tone} px-3 py-3 space-y-2.5 shadow-sm`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            passed ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
          }`}
        >
          {passed ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden />
              통과
            </>
          ) : (
            <>
              <AlertCircle className="w-3.5 h-3.5" aria-hidden />
              다시 도전
            </>
          )}
        </span>
        <span className="text-xs font-semibold text-indigo-900/70 tabular-nums">유사도 {pct}%</span>
      </div>
      <p className="text-xs text-indigo-800/90 leading-relaxed">
        <span className="font-semibold text-indigo-900">인식: </span>
        {transcript || '—'}
      </p>
      <p className="text-sm text-indigo-950 leading-snug flex gap-2">
        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" aria-hidden />
        <span>{passed ? challenge.passFeedback : challenge.failFeedback}</span>
      </p>
      <p className="text-[11px] text-indigo-700/85 leading-relaxed border-t border-indigo-900/5 pt-2 flex gap-1.5">
        <span className="font-semibold text-indigo-900/90 shrink-0">팁</span>
        <span>{challenge.nativeTip}</span>
      </p>
      {!passed && (
        <button
          type="button"
          onClick={onRetry}
          className="w-full sm:w-auto rounded-lg bg-indigo-600 text-white text-sm font-medium px-4 py-2 hover:bg-indigo-700 active:scale-[0.99] transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
        >
          다시 말하기
        </button>
      )}
    </div>
  );
}
