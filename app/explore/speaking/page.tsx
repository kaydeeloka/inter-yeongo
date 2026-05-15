'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';

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
import { getSavedAvatar, getSavedName } from '@/lib/userStore';
import { AVATARS } from '@/data/avatars';
import type { Avatar } from '@/types';

import CategoryTabs from '@/components/speaking/CategoryTabs';
import SentencePracticeItem, { type RowStatus, type SentenceAttempt } from '@/components/speaking/SentencePracticeItem';

const MIN_RECORDING_BYTES = 256;

export default function SpeakingPage() {
  const router = useRouter();
  const [avatar, setAvatar] = useState<Avatar>(AVATARS[0]);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    setAvatar(getSavedAvatar());
    setNickname(getSavedName());
  }, []);

  const [categoryId, setCategoryId] = useState<SpeakingCategoryId>('cafe');
  const [attempts, setAttempts] = useState<Record<string, SentenceAttempt>>({});
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(null);
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

  const finalizeRecordingSession = useCallback(async (): Promise<RecordUntilStoppedResult | null> => {
    const s = recorderSessionRef.current;
    recorderSessionRef.current = null;
    if (!s) return null;
    return s.stop().catch(() => null);
  }, []);

  const stopPlayback = useCallback(() => {
    cancelSpeech();
    const a = audioRef.current;
    if (a) { a.pause(); a.src = ''; a.load(); audioRef.current = null; }
    setActivePlaybackSentenceId(null);
  }, []);

  const emergencyResetMedia = useCallback(async () => {
    stopPlayback();
    await finalizeRecordingSession();
    abort();
    setActiveRecordingSentenceId(null);
  }, [abort, finalizeRecordingSession, stopPlayback]);

  const handleCategoryChange = async (id: SpeakingCategoryId) => {
    if (isAnyRecording || isAnyPlaying) await emergencyResetMedia();
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
  useEffect(() => { attemptsRef.current = attempts; }, [attempts]);

  useEffect(() => () => {
    stopPlayback();
    void finalizeRecordingSession();
    Object.values(attemptsRef.current).forEach((a) => {
      if (a.recordedAudioUrl) URL.revokeObjectURL(a.recordedAudioUrl);
    });
  }, [finalizeRecordingSession, stopPlayback]);

  const revokeAttemptAudio = useCallback((a: SentenceAttempt | undefined) => {
    if (a?.recordedAudioUrl) URL.revokeObjectURL(a.recordedAudioUrl);
  }, []);

  const clearAttempt = (id: string) => {
    setAttempts((prev) => {
      const next = { ...prev };
      revokeAttemptAudio(next[id]);
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
    if (isAnyRecording || isAnyPlaying) return;
    const att = attempts[challenge.id];
    stopPlayback();
    cancelSpeech();
    if (att?.recordedAudioUrl) {
      const audio = new Audio(att.recordedAudioUrl);
      audioRef.current = audio;
      setActivePlaybackSentenceId(challenge.id);
      audio.onended = () => stopPlayback();
      audio.onerror = () => {
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
      void audio.play().catch(() => { stopPlayback(); setToast('오디오 재생을 시작할 수 없어요.'); });
      return;
    }
    if (!isSpeechSynthesisSupported()) { setToast('이 브라우저에서는 음성 재생을 지원하지 않을 수 있어요.'); return; }
    const text = att?.transcript ?? challenge.sentence;
    setActivePlaybackSentenceId(challenge.id);
    speakEnglish(text, {
      onEnd: () => setActivePlaybackSentenceId(null),
      onError: () => setActivePlaybackSentenceId(null),
    });
  };

  const handleMic = async (challenge: SpeakingChallenge) => {
    if (!recReady || isAnyRecording || isAnyPlaying) return;
    await emergencyResetMedia();
    setAttempts((prev) => {
      const next = { ...prev };
      revokeAttemptAudio(next[challenge.id]);
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
            if (recResult && recResult.blob.size >= MIN_RECORDING_BYTES) {
              try { recordedAudioUrl = URL.createObjectURL(recResult.blob); } catch { recordedAudioUrl = null; }
            }
            const { similarity, passed } = scoreSpeechMatch(challenge.sentence, transcript);
            setAttempts((prev) => ({
              ...prev,
              [challenge.id]: { transcript, similarity, passed, recordedAudioUrl, recordedAt: Date.now() },
            }));
            setActiveRecordingSentenceId(null);
          });
        },
        onError: (code) => {
          if (code === 'not-supported' || code === 'service-not-allowed') {
            setToast(code === 'service-not-allowed'
              ? '마이크 권한이 필요해요. 브라우저 설정에서 허용해 주세요.'
              : '음성 인식을 시작할 수 없어요.');
          } else if (code !== 'aborted') {
            setToast('음성 인식 중 문제가 생겼어요. 잠시 후 다시 시도해 주세요.');
          }
        },
        onSessionEnd: () => { void finalizeRecordingSession(); setActiveRecordingSentenceId(null); },
      },
      'en-US'
    );
  };

  const runDemoJudge = () => {
    const list = challengesByCategory(categoryId);
    const target = (activeSentenceId && list.find((c) => c.id === activeSentenceId)) ?? list[0];
    if (!target) return;
    const { similarity, passed } = scoreSpeechMatch(target.sentence, target.sentence);
    setAttempts((prev) => {
      const next = { ...prev };
      revokeAttemptAudio(next[target.id]);
      next[target.id] = { transcript: target.sentence, similarity, passed, recordedAudioUrl: null, recordedAt: null };
      return next;
    });
    setActiveSentenceId(target.id);
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
    <div className="min-h-screen bg-[#FFFBEB] text-[#312e81] font-sans pb-20">

      {/* App-style header */}
      <header className="w-full bg-white border-b-4 border-[#312e81] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#312e81] shadow-[2px_2px_0px_0px_rgba(49,46,129,1)] rounded-full flex items-center justify-center bg-white shrink-0">
            <img src={avatar.image} alt={avatar.name} className="w-9 h-9 object-contain" />
          </div>
          <div className="font-black text-sm uppercase italic leading-none">{nickname}</div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="font-black text-sm uppercase italic tracking-wide">Speaking Lab</span>
        </div>
        <button
          onClick={() => router.push('/explore')}
          className="p-2 border-2 border-[#312e81] rounded-lg shadow-[3px_3px_0px_0px_rgba(49,46,129,1)] bg-white active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
        >
          <ArrowLeft size={24} />
        </button>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-5 space-y-4">

        {recUnsupported && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-3 text-sm text-amber-950 space-y-2">
            <p>Chrome에서 마이크 판정이 가장 안정적이에요.</p>
            <button
              type="button"
              onClick={runDemoJudge}
              className="w-full rounded-xl bg-amber-600 text-white text-sm font-semibold py-2.5 hover:bg-amber-700 transition"
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
