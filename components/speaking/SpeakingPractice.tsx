'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Headphones,
  LayoutList,
  MessageCircle,
  Mic,
  Sparkles,
} from 'lucide-react';

import {
  SPEAKING_CATEGORIES,
  challengesByCategory,
  type SpeakingCategoryId,
  type SpeakingChallenge,
} from '@/data/speaking-challenges';
import { scoreSpeechMatch } from '@/lib/speech-scoring';
import { speakEnglish, cancelSpeech, isSpeechSynthesisSupported } from '@/lib/speech-synthesis';
import { createChunkedRecorder, isMediaRecorderSupported, type RecordUntilStoppedResult } from '@/lib/speech-recording';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

import CategoryTabs from '@/components/speaking/CategoryTabs';
import SentencePracticeItem, { type RowStatus, type SentenceAttempt } from '@/components/speaking/SentencePracticeItem';

const MIN_RECORDING_BYTES = 256;

export default function SpeakingPractice() {
  const [categoryId, setCategoryId] = useState<SpeakingCategoryId>('cafe');
  const [attempts, setAttempts] = useState<Record<string, SentenceAttempt>>({});
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(null);
  /** Sentence id currently holding the mic session (recognition may still be starting). */
  const [activeRecordingSentenceId, setActiveRecordingSentenceId] = useState<string | null>(null);
  const [activePlaybackSentenceId, setActivePlaybackSentenceId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const { supported, listening, start, abort } = useSpeechRecognition('en-US');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recorderSessionRef = useRef<ReturnType<typeof createChunkedRecorder> | null>(null);

  const sentences = useMemo(() => challengesByCategory(categoryId), [categoryId]);

  const recReady = supported;
  const recUnsupported = !supported;

  const isAnyRecording = Boolean(activeRecordingSentenceId) || listening;
  const isAnyPlaying = activePlaybackSentenceId !== null;

  const finalizeRecordingSession = useCallback((): Promise<RecordUntilStoppedResult | null> => {
    const s = recorderSessionRef.current;
    recorderSessionRef.current = null;
    if (!s) return Promise.resolve(null);
    return s.stop().catch(() => null);
  }, []);

  const stopPlayback = useCallback(() => {
    cancelSpeech();
    const a = audioRef.current;
    if (a) {
      a.pause();
      a.src = '';
      a.load();
      audioRef.current = null;
    }
    setActivePlaybackSentenceId(null);
  }, []);

  const emergencyResetMedia = useCallback(async () => {
    stopPlayback();
    await finalizeRecordingSession();
    abort();
    setActiveRecordingSentenceId(null);
  }, [abort, finalizeRecordingSession, stopPlayback]);

  const handleCategoryChange = async (id: SpeakingCategoryId) => {
    if (isAnyRecording || isAnyPlaying) {
      await emergencyResetMedia();
    }
    setActiveSentenceId(null);
    setCategoryId(id);
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.getVoices();
    const fn = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener('voiceschanged', fn);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', fn);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const attemptsRef = useRef(attempts);
  useEffect(() => {
    attemptsRef.current = attempts;
  }, [attempts]);

  useEffect(
    () => () => {
      stopPlayback();
      void finalizeRecordingSession();
      Object.values(attemptsRef.current).forEach((a) => {
        if (a.recordedAudioUrl) URL.revokeObjectURL(a.recordedAudioUrl);
      });
    },
    [finalizeRecordingSession, stopPlayback]
  );

  const revokeAttemptAudio = useCallback((a: SentenceAttempt | undefined) => {
    if (a?.recordedAudioUrl) {
      URL.revokeObjectURL(a.recordedAudioUrl);
    }
  }, []);

  const clearAttempt = (id: string) => {
    setAttempts((prev) => {
      const next = { ...prev };
      const cur = next[id];
      revokeAttemptAudio(cur);
      delete next[id];
      return next;
    });
  };

  const handleRetry = (id: string) => {
    if (activePlaybackSentenceId === id) stopPlayback();
    clearAttempt(id);
    cancelSpeech();
  };

  const handlePlay = (challenge: SpeakingChallenge) => {
    if (isAnyRecording) return;
    if (isAnyPlaying) return;
    const att = attempts[challenge.id];

    stopPlayback();
    cancelSpeech();

    if (att?.recordedAudioUrl) {
      const audio = new Audio(att.recordedAudioUrl);
      audioRef.current = audio;
      setActivePlaybackSentenceId(challenge.id);
      audio.onended = () => {
        stopPlayback();
      };
      audio.onerror = () => {
        // Fallback: recorded blob failed to play — use TTS on transcript (not original mic waveform).
        const t = att.transcript;
        stopPlayback();
        if (t && isSpeechSynthesisSupported()) {
          setActivePlaybackSentenceId(challenge.id);
          speakEnglish(t, {
            onEnd: () => setActivePlaybackSentenceId(null),
            onError: () => setActivePlaybackSentenceId(null),
          });
        }
        setToast('녹음 재생에 실패해서 텍스트 음성으로 들려드릴게요.');
      };
      void audio.play().catch(() => {
        stopPlayback();
        setToast('오디오 재생을 시작할 수 없어요.');
      });
      return;
    }

    if (!isSpeechSynthesisSupported()) {
      setToast('이 브라우저에서는 음성 재생을 지원하지 않을 수 있어요.');
      return;
    }

    const text = att?.transcript ? att.transcript : challenge.sentence;
    setActivePlaybackSentenceId(challenge.id);
    speakEnglish(text, {
      onEnd: () => setActivePlaybackSentenceId(null),
      onError: () => setActivePlaybackSentenceId(null),
    });
  };

  const handleMic = async (challenge: SpeakingChallenge) => {
    if (!recReady) return;
    if (isAnyRecording || isAnyPlaying) return;

    await emergencyResetMedia();

    setAttempts((prev) => {
      const next = { ...prev };
      const cur = next[challenge.id];
      revokeAttemptAudio(cur);
      delete next[challenge.id];
      return next;
    });

    setActiveSentenceId(challenge.id);
    setActiveRecordingSentenceId(challenge.id);

    if (isMediaRecorderSupported()) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        recorderSessionRef.current = createChunkedRecorder(stream);
      } catch {
        recorderSessionRef.current = null;
        setToast('마이크 녹음을 켤 수 없어요. 음성 인식만 진행할게요.');
      }
    } else {
      recorderSessionRef.current = null;
    }

    start(
      {
        onResult: (transcript) => {
          void finalizeRecordingSession().then((recResult) => {
            let recordedAudioUrl: string | null = null;
            const recordedAt: number | null = Date.now();
            if (recResult && recResult.blob.size >= MIN_RECORDING_BYTES) {
              try {
                recordedAudioUrl = URL.createObjectURL(recResult.blob);
              } catch {
                recordedAudioUrl = null;
              }
            }
            const { similarity, passed } = scoreSpeechMatch(challenge.sentence, transcript);
            setAttempts((prev) => ({
              ...prev,
              [challenge.id]: {
                transcript,
                similarity,
                passed,
                recordedAudioUrl,
                recordedAt,
              },
            }));
            setActiveRecordingSentenceId(null);
          });
        },
        onError: (code) => {
          if (code === 'not-supported' || code === 'service-not-allowed') {
            setToast(
              code === 'service-not-allowed'
                ? '마이크 권한이 필요해요. 브라우저 설정에서 허용해 주세요.'
                : '음성 인식을 시작할 수 없어요.'
            );
          } else if (code !== 'aborted') {
            setToast('음성 인식 중 문제가 생겼어요. 잠시 후 다시 시도해 주세요.');
          }
        },
        onSessionEnd: () => {
          void finalizeRecordingSession();
          setActiveRecordingSentenceId(null);
        },
      },
      'en-US'
    );
  };

  const runDemoJudge = () => {
    const list = challengesByCategory(categoryId);
    const targetChallenge =
      activeSentenceId && list.some((c) => c.id === activeSentenceId)
        ? (list.find((c) => c.id === activeSentenceId) as SpeakingChallenge)
        : list[0];
    if (!targetChallenge) return;
    const transcript = targetChallenge.sentence;
    const { similarity, passed } = scoreSpeechMatch(targetChallenge.sentence, transcript);
    setAttempts((prev) => {
      const next = { ...prev };
      const cur = next[targetChallenge.id];
      revokeAttemptAudio(cur);
      next[targetChallenge.id] = {
        transcript,
        similarity,
        passed,
        recordedAudioUrl: null,
        recordedAt: null,
      };
      return next;
    });
    setActiveSentenceId(targetChallenge.id);
  };

  const rowStatus = (id: string): RowStatus => {
    if (activeRecordingSentenceId === id && !attempts[id]) return 'listening';
    const a = attempts[id];
    if (!a) return 'idle';
    return a.passed ? 'pass' : 'retry';
  };

  const isExpanded = (id: string) =>
    activeSentenceId === id && (activeRecordingSentenceId === id || Boolean(attempts[id]));

  const interactionLocked = isAnyRecording || isAnyPlaying;

  return (
    <div className="min-h-screen bg-[#f0eef8] text-indigo-950 font-sans pb-20 relative overflow-x-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        aria-hidden
      >
        <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-violet-200/60 blur-3xl" />
        <div className="absolute top-40 -left-20 w-64 h-64 rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-amber-100/70 blur-2xl" />
        <svg className="absolute bottom-0 left-0 w-full h-32 text-indigo-200/40" viewBox="0 0 400 80" preserveAspectRatio="none">
          <path
            fill="currentColor"
            d="M0,40 Q100,10 200,35 T400,25 L400,80 L0,80 Z"
          />
        </svg>
      </div>

      <header className="sticky top-0 z-20 border-b border-indigo-100/90 bg-white/90 backdrop-blur-md shadow-sm shadow-indigo-900/5">
        <div className="max-w-lg mx-auto px-4 h-[3.25rem] flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-200/90 bg-white text-indigo-800 hover:bg-indigo-50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            aria-label="홈으로"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="text-center min-w-0 flex-1 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" aria-hidden />
            <div>
              <h1 className="text-[15px] font-bold tracking-tight text-indigo-950 leading-none">스피킹 챌린지</h1>
              <p className="text-[10px] text-indigo-500 font-semibold mt-0.5 tracking-wide">Speaking Lab</p>
            </div>
          </div>
          <div className="w-10 shrink-0" aria-hidden />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-5 space-y-4 relative z-10">
        <div className="rounded-2xl border border-indigo-100/90 bg-white/75 backdrop-blur-sm px-3 py-3 shadow-sm">
          <p className="text-[11px] font-semibold text-indigo-500 uppercase tracking-wider text-center mb-2">
            이렇게 하면 돼요
          </p>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="flex flex-col items-center gap-1">
              <LayoutList className="w-4 h-4 text-indigo-500" aria-hidden />
              <span className="text-[10px] text-indigo-800/90 leading-tight font-medium">탭</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <MessageCircle className="w-4 h-4 text-indigo-500" aria-hidden />
              <span className="text-[10px] text-indigo-800/90 leading-tight font-medium">문장</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Headphones className="w-4 h-4 text-indigo-500" aria-hidden />
              <span className="text-[10px] text-indigo-800/90 leading-tight font-medium">듣기</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Mic className="w-4 h-4 text-rose-500" aria-hidden />
              <span className="text-[10px] text-indigo-800/90 leading-tight font-medium">말하기</span>
            </div>
          </div>
        </div>

        {recUnsupported && (
          <div className="rounded-2xl border border-amber-200/90 bg-amber-50/95 px-3 py-3 text-sm text-amber-950 space-y-2 shadow-sm">
            <p>Chrome에서 마이크 판정이 가장 안정적이에요.</p>
            <button
              type="button"
              onClick={runDemoJudge}
              className="w-full rounded-xl bg-amber-600 text-white text-sm font-semibold py-2.5 hover:bg-amber-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
            >
              데모 판정
            </button>
          </div>
        )}

        {toast && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-900" role="status">
            {toast}
          </div>
        )}

        <CategoryTabs
          categories={SPEAKING_CATEGORIES}
          activeId={categoryId}
          onChange={handleCategoryChange}
          interactionLocked={interactionLocked}
        />

        <ul className="space-y-3 list-none p-0 m-0">
          {sentences.map((c) => (
            <li key={c.id}>
              <SentencePracticeItem
                challenge={c}
                status={rowStatus(c.id)}
                expanded={isExpanded(c.id)}
                attempt={attempts[c.id]}
                isListening={activeRecordingSentenceId === c.id && listening}
                onPlay={() => handlePlay(c)}
                onMic={() => void handleMic(c)}
                onRetry={() => handleRetry(c.id)}
                playDisabled={interactionLocked}
                micDisabled={!recReady || interactionLocked}
                isPlaybackActive={activePlaybackSentenceId === c.id}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
