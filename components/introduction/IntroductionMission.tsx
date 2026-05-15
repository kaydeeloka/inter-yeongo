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

const emptyFields: IntroFields = { name: '', major: '', interest: '', goal: '' };

export default function IntroductionMission() {
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
    <div className="flex flex-col gap-5">
      <IntroBuilderCard values={fields} onChange={patchFields} />
      <IntroPreview text={generated} showPlaceholder={!filled} />

      {!recognitionSupported && (
        <p className="rounded-xl border border-[#FFF176] bg-[#FFF176]/25 px-3 py-2 text-xs font-medium text-[#1F1D3D]">
          말하기 연습은 브라우저마다 다를 수 있어요. Chrome에서 말하기 연습이 가장 안정적이에요. 듣기와
          문장 확인은 그대로 이용할 수 있어요.
        </p>
      )}
      {!ttsSupported && (
        <p className="text-xs text-[#6F6A8A]">이 브라우저에서는 음성 듣기(TTS)를 지원하지 않을 수 있어요.</p>
      )}

      <IntroPracticeControls
        onListen={handleListen}
        onPractice={handlePractice}
        onReset={handleReset}
        listenDisabled={listenDisabled}
        practiceDisabled={practiceDisabled}
        recognitionSupported={recognitionSupported}
      />

      {listening && (
        <p className="text-center text-xs font-semibold text-[#302B8F]" aria-live="polite">
          듣고 있어요… 말씀해 주세요.
        </p>
      )}
      {recError && (
        <p className="text-center text-xs text-red-700" role="status">
          인식 오류: {recError}
        </p>
      )}

      <IntroFeedback transcript={transcript} score={score} />

      <div className="pt-1">
        <Link
          href="/explore/speaking"
          className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-bold transition ${
            hasAttemptedPractice || score?.passed
              ? 'border-[#302B8F] bg-[#302B8F] text-white shadow-sm hover:bg-[#25206F]'
              : 'border-[#302B8F]/35 bg-white text-[#6F6A8A] hover:border-[#302B8F] hover:text-[#302B8F]'
          }`}
        >
          다음: 스피킹 연습
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <p className="mt-2 text-center text-[10px] text-[#6F6A8A]">Speaking practice · /explore/speaking</p>
      </div>
    </div>
  );
}
