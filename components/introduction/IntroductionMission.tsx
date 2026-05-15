'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';

import IntroBuilderCard from '@/components/introduction/IntroBuilderCard';
import IntroFeedback from '@/components/introduction/IntroFeedback';
import IntroPracticeControls from '@/components/introduction/IntroPracticeControls';
import IntroPreview from '@/components/introduction/IntroPreview';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { buildIntroductionEnglish, hasIntroInput, type IntroFields } from '@/lib/introduction-template';
import { cancelSpeech, isSpeechSynthesisSupported, speakEnglish } from '@/lib/speech-synthesis';
import { scoreSpeechMatch, type SpeechScoreResult } from '@/lib/speech-scoring';
import type { Avatar } from '@/types';

const emptyFields: IntroFields = { name: '', age: '', country: '', major: '', goodAt: '' };

interface IntroductionMissionProps {
  avatar: Avatar;
}

export default function IntroductionMission({ avatar }: IntroductionMissionProps) {
  const [fields, setFields] = useState<IntroFields>(emptyFields);
  const [ttsPlaying, setTtsPlaying] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [score, setScore] = useState<SpeechScoreResult | null>(null);
  const [hasAttemptedPractice, setHasAttemptedPractice] = useState(false);
  const [recError, setRecError] = useState<string | null>(null);

  const { supported: recognitionSupported, listening, start, abort } = useSpeechRecognition('en-US');
  const ttsSupported = isSpeechSynthesisSupported();

  const filled = useMemo(() => hasIntroInput(fields), [fields]);
  const generated = useMemo(() => buildIntroductionEnglish(fields), [fields]);

  const patchFields = useCallback((patch: Partial<IntroFields>) => {
    setFields((prev) => ({ ...prev, ...patch }));
    setTranscript(null);
    setScore(null);
    setRecError(null);
  }, []);

  const handleReset = useCallback(() => {
    cancelSpeech();
    abort();
    setFields(emptyFields);
    setTtsPlaying(false);
    setTranscript(null);
    setScore(null);
    setHasAttemptedPractice(false);
    setRecError(null);
  }, [abort]);

  const handleListen = useCallback(() => {
    if (!filled || !ttsSupported) return;
    setRecError(null);
    abort();
    setTtsPlaying(true);
    speakEnglish(generated, {
      onEnd: () => setTtsPlaying(false),
      onError: () => setTtsPlaying(false),
    });
  }, [abort, filled, generated, ttsSupported]);

  const handlePractice = useCallback(() => {
    if (!filled || listening || ttsPlaying || !recognitionSupported) return;
    cancelSpeech();
    setTtsPlaying(false);
    setTranscript(null);
    setScore(null);
    setRecError(null);
    start(
      {
        onResult: (t) => {
          setTranscript(t);
          const s = scoreSpeechMatch(generated, t);
          setScore(s);
          setHasAttemptedPractice(true);
        },
        onError: (code) => {
          if (code !== 'not-supported') setRecError(code);
        },
        onSessionEnd: () => {
          setHasAttemptedPractice(true);
        },
      },
      'en-US'
    );
  }, [filled, generated, listening, recognitionSupported, start, ttsPlaying]);

  const listenDisabled = !filled || !ttsSupported || listening || ttsPlaying;
  const practiceDisabled = !filled || listening || ttsPlaying || !recognitionSupported;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

      {/* Left: form */}
      <IntroBuilderCard values={fields} onChange={patchFields} />

      {/* Right: preview + controls + feedback */}
      <div className="flex flex-col gap-4">
        <IntroPreview text={generated} showPlaceholder={!filled} avatar={avatar} />

        {!recognitionSupported && (
          <p className="rounded-2xl border-4 border-yellow-400 bg-yellow-50 px-4 py-3 text-xs font-bold text-[#312e81]">
            말하기 연습은 Chrome에서 가장 안정적이에요. 듣기와 문장 확인은 그대로 이용할 수 있어요.
          </p>
        )}
        {!ttsSupported && (
          <p className="text-xs font-bold text-[#312e81]/50">이 브라우저에서는 음성 듣기(TTS)를 지원하지 않을 수 있어요.</p>
        )}

        <IntroPracticeControls
          onListen={handleListen}
          onPractice={handlePractice}
          onStop={abort}
          onStopListen={() => { cancelSpeech(); setTtsPlaying(false); }}
          onReset={handleReset}
          listenDisabled={listenDisabled}
          practiceDisabled={practiceDisabled}
          recognitionSupported={recognitionSupported}
          listening={listening}
          ttsPlaying={ttsPlaying}
        />

        {listening && (
          <p className="text-center text-xs font-black text-[#312e81] uppercase tracking-widest" aria-live="polite">
            듣고 있어요… 말씀해 주세요.
          </p>
        )}
        {recError && (
          <p className="text-center text-xs font-bold text-rose-700" role="status">
            인식 오류: {recError}
          </p>
        )}

        <IntroFeedback transcript={transcript} score={score} />

        <Link
          href="/explore/speaking"
          className={`flex items-center justify-center gap-2 rounded-2xl border-4 px-4 py-3 text-sm font-black uppercase transition-all ${
            hasAttemptedPractice || score?.passed
              ? 'border-orange-600 bg-orange-400 text-white shadow-[4px_4px_0px_0px_rgba(194,65,12,0.4)] hover:scale-105 active:scale-95'
              : 'border-[#312e81]/30 bg-white text-[#312e81]/50 hover:border-[#312e81] hover:text-[#312e81]'
          }`}
        >
          다음: 스피킹 연습
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
