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
    idle:      { label: '대기',   className: 'bg-[#312e81]/10 text-[#312e81] border-[#312e81]/20' },
    listening: { label: '듣는 중', className: 'bg-yellow-100 text-[#312e81] border-yellow-300' },
    pass:      { label: '통과',   className: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    retry:     { label: '재시도', className: 'bg-orange-100 text-orange-900 border-orange-300' },
  };
  const { label, className } = map[status];
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-black uppercase ${className}`}>
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
        'rounded-2xl border-4 transition-all duration-200 bg-white',
        expanded
          ? 'border-[#312e81] shadow-[6px_6px_0px_0px_rgba(49,46,129,1)]'
          : 'border-[#312e81]/30 shadow-[3px_3px_0px_0px_rgba(49,46,129,0.15)] hover:border-[#312e81] hover:shadow-[4px_4px_0px_0px_rgba(49,46,129,0.4)]',
        isPlaybackActive ? 'border-orange-400 shadow-[4px_4px_0px_0px_rgba(251,146,60,0.4)]' : '',
      ].join(' ')}
    >
      <div className="p-3.5 sm:p-4 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-[15px] sm:text-base font-black text-[#312e81] leading-snug tracking-tight">
              {challenge.sentence}
            </p>
            <p className="text-[13px] text-[#312e81]/60 font-semibold leading-relaxed">{challenge.korean}</p>
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
                  'inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 transition',
                  isPlaybackActive
                    ? 'border-orange-400 bg-orange-400 text-white shadow-[2px_2px_0px_0px_rgba(194,65,12,0.4)]'
                    : 'border-[#312e81]/40 bg-[#312e81]/5 text-[#312e81] hover:bg-yellow-100 hover:border-[#312e81] active:scale-95',
                  playDisabled ? 'opacity-35 pointer-events-none' : '',
                ].join(' ')}
              >
                {isPlaybackActive
                  ? <Volume2 className="w-4 h-4" aria-hidden />
                  : <Play className="w-4 h-4 translate-x-0.5" fill="currentColor" aria-hidden />}
              </button>
              <button
                type="button"
                onClick={onMic}
                disabled={micDisabled}
                title="말하기"
                aria-label="마이크로 말하기"
                className={[
                  'inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 transition',
                  status === 'listening'
                    ? 'border-rose-400 bg-rose-500 text-white shadow-[2px_2px_0px_0px_rgba(244,63,94,0.4)] ring-2 ring-rose-200'
                    : 'border-rose-300 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:border-rose-400 active:scale-95',
                  micDisabled ? 'opacity-35 pointer-events-none' : '',
                ].join(' ')}
              >
                <Mic className={`w-4 h-4 ${status === 'listening' ? 'animate-pulse' : ''}`} aria-hidden />
              </button>
            </div>
            <span className="text-[10px] text-[#312e81]/40 font-bold max-w-40 text-right leading-tight">
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
