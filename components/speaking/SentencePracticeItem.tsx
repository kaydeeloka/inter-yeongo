'use client';

import { Mic, Play, Volume2 } from 'lucide-react';

import type { SpeakingChallenge } from '@/data/speaking-challenges';
import SpeechFeedback from '@/components/speaking/SpeechFeedback';

export type RowStatus = 'idle' | 'listening' | 'pass' | 'retry';

export interface SentenceAttempt {
  transcript: string;
  similarity: number;
  passed: boolean;
  recordedAudioUrl: string | null;
  recordedAt: number | null;
}

interface SentencePracticeItemProps {
  challenge: SpeakingChallenge;
  status: RowStatus;
  expanded: boolean;
  attempt?: SentenceAttempt;
  isListening: boolean;
  onPlay: () => void;
  onMic: () => void;
  onRetry: () => void;
  playDisabled: boolean;
  micDisabled: boolean;
  isPlaybackActive: boolean;
}

function StatusBadge({ status }: { status: RowStatus }) {
  const map: Record<RowStatus, { label: string; className: string }> = {
    idle: { label: '대기', className: 'bg-slate-100/90 text-slate-600 border-slate-200' },
    listening: { label: '듣는 중', className: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
    pass: { label: '통과', className: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    retry: { label: '재시도', className: 'bg-amber-100 text-amber-900 border-amber-200' },
  };
  const { label, className } = map[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${className}`}
    >
      {label}
    </span>
  );
}

export default function SentencePracticeItem({
  challenge,
  status,
  expanded,
  attempt,
  isListening,
  onPlay,
  onMic,
  onRetry,
  playDisabled,
  micDisabled,
  isPlaybackActive,
}: SentencePracticeItemProps) {
  const hasRecording = Boolean(attempt?.recordedAudioUrl);
  const hasTranscript = Boolean(attempt?.transcript);
  const playLabel = hasRecording ? '내 녹음 듣기' : hasTranscript ? '내 발음(TTS)' : '원문 듣기';

  return (
    <article
      className={[
        'rounded-2xl border transition-all duration-200 ease-out',
        expanded
          ? 'border-indigo-400/70 bg-white shadow-lg shadow-indigo-900/12 ring-2 ring-indigo-200/50'
          : 'border-indigo-100/85 bg-white/85 hover:border-indigo-200/90 hover:bg-white hover:shadow-sm',
        isPlaybackActive ? 'ring-2 ring-teal-300/80 border-teal-200/80' : '',
      ].join(' ')}
    >
      <div className="p-3.5 sm:p-4 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-[15px] sm:text-base font-semibold text-indigo-950 leading-snug tracking-tight">
              {challenge.sentence}
            </p>
            <p className="text-[13px] text-indigo-600/90 leading-relaxed">{challenge.korean}</p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <StatusBadge status={status} />
              <button
                type="button"
                onClick={onPlay}
                disabled={playDisabled}
                title={playLabel}
                aria-label={hasRecording ? '녹음된 내 음성 재생' : '목표 문장 또는 안내 음성 재생'}
                className={[
                  'inline-flex h-10 w-10 items-center justify-center rounded-xl border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400',
                  isPlaybackActive
                    ? 'border-teal-400 bg-teal-500 text-white shadow-md shadow-teal-500/25 scale-105'
                    : 'border-indigo-200 bg-indigo-50/90 text-indigo-800 hover:bg-indigo-100 active:scale-95',
                  playDisabled ? 'opacity-35 pointer-events-none' : '',
                ].join(' ')}
              >
                {isPlaybackActive ? (
                  <Volume2 className="w-4 h-4" aria-hidden />
                ) : (
                  <Play className="w-4 h-4 translate-x-0.5" fill="currentColor" aria-hidden />
                )}
              </button>
              <button
                type="button"
                onClick={onMic}
                disabled={micDisabled}
                title="말하기"
                aria-label="마이크로 말하기"
                className={[
                  'inline-flex h-10 w-10 items-center justify-center rounded-xl border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400',
                  status === 'listening'
                    ? 'border-rose-400 bg-rose-500 text-white shadow-lg shadow-rose-500/30 ring-2 ring-rose-200/80'
                    : 'border-rose-200 bg-rose-50/95 text-rose-700 hover:bg-rose-100',
                  micDisabled ? 'opacity-35 pointer-events-none' : '',
                ].join(' ')}
              >
                <Mic className={`w-4 h-4 ${status === 'listening' ? 'animate-pulse' : ''}`} aria-hidden />
              </button>
            </div>
            <span className="text-[10px] text-indigo-400/95 font-medium max-w-40 text-right leading-tight">
              {playLabel}
            </span>
          </div>
        </div>
      </div>
      {expanded && (
        <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 -mt-1">
          <SpeechFeedback
            challenge={challenge}
            transcript={attempt?.transcript ?? ''}
            similarity={attempt?.similarity ?? 0}
            passed={attempt?.passed ?? false}
            onRetry={onRetry}
            isListening={isListening}
          />
        </div>
      )}
    </article>
  );
}
