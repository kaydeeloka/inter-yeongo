'use client';

import { useCallback, useState } from 'react';
import { ArrowRight, CheckCircle2, Mic, RotateCcw, StopCircle, Volume2 } from 'lucide-react';

import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { cancelSpeech, isSpeechSynthesisSupported, speakEnglish } from '@/lib/speech-synthesis';
import type { Avatar } from '@/types';

const QUESTIONS = [
  { q: "What's your name?",      hint: 'My name is …' },
  { q: 'How old are you?',       hint: 'I am … years old.' },
  { q: 'Where are you from?',    hint: "I'm from …" },
  { q: 'What is your major?',    hint: "I'm majoring in …" },
  { q: 'What are you good at?',  hint: "I'm good at …" },
];

interface IntroConversationProps {
  avatar: Avatar;
}

export default function IntroConversation({ avatar }: IntroConversationProps) {
  const [step, setStep]           = useState(0);
  const [transcript, setTranscript] = useState('');
  const [answered, setAnswered]   = useState(false);
  const [finished, setFinished]   = useState(false);
  const [ttsPlaying, setTtsPlaying] = useState(false);
  const [answers, setAnswers]     = useState<string[]>([]);

  const { supported, listening, start, abort } = useSpeechRecognition('en-US');
  const ttsSupported = isSpeechSynthesisSupported();

  const current = QUESTIONS[step];
  const isLast  = step === QUESTIONS.length - 1;

  const speakQuestion = useCallback(() => {
    if (!ttsSupported) return;
    cancelSpeech();
    setTtsPlaying(true);
    speakEnglish(current.q, {
      onEnd:  () => setTtsPlaying(false),
      onError: () => setTtsPlaying(false),
    });
  }, [current.q, ttsSupported]);

  const handleRecord = useCallback(() => {
    if (!supported || listening) return;
    cancelSpeech();
    setTranscript('');
    setAnswered(false);
    start(
      {
        onResult: (t) => {
          setTranscript(t);
          setAnswered(true);
          setAnswers((prev) => { const next = [...prev]; next[step] = t; return next; });
        },
        onError: () => {},
        onSessionEnd: () => {},
      },
      'en-US'
    );
  }, [supported, listening, start, step]);

  const handleNext = () => {
    if (isLast) { setFinished(true); }
    else { setStep((s) => s + 1); setTranscript(''); setAnswered(false); }
  };

  const handleRestart = () => {
    abort(); cancelSpeech();
    setStep(0); setTranscript(''); setAnswered(false); setFinished(false); setAnswers([]);
    setTtsPlaying(false);
  };

  /* ── Finished screen ── */
  if (finished) {
    return (
      <div className="flex flex-col items-center gap-6 py-8 text-center">
        <div className="inline-flex p-5 bg-yellow-100 border-4 border-[#312e81] rounded-full shadow-[4px_4px_0px_0px_rgba(49,46,129,1)]">
          <CheckCircle2 className="w-14 h-14 text-[#312e81]" />
        </div>
        <h2 className="text-3xl font-black uppercase italic text-[#312e81]">잘했어요! 🎉</h2>
        <div className="w-full max-w-sm bg-white border-4 border-[#312e81] rounded-3xl shadow-[6px_6px_0px_0px_rgba(49,46,129,1)] p-6 text-left space-y-3">
          {QUESTIONS.map((q, i) => (
            <div key={i} className="space-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#312e81]/50">{q.q}</p>
              <p className="text-sm font-bold text-[#312e81] italic">"{answers[i] ?? '—'}"</p>
            </div>
          ))}
        </div>
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#312e81] text-white font-black uppercase italic rounded-2xl border-4 border-[#312e81] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 transition-all"
        >
          <RotateCcw className="w-4 h-4" /> 다시 도전
        </button>
      </div>
    );
  }

  /* ── Conversation screen ── */
  return (
    <div className="flex flex-col items-center gap-5 py-4">

      {/* Progress dots */}
      <div className="flex gap-2">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`h-2.5 rounded-full border-2 border-[#312e81] transition-all duration-300 ${
              i < step ? 'w-8 bg-[#312e81]' : i === step ? 'w-8 bg-yellow-300' : 'w-8 bg-white'
            }`}
          />
        ))}
      </div>

      {/* Speech bubble + avatar */}
      <div className="flex flex-col items-center w-full max-w-sm">
        {/* Bubble */}
        <div className="relative w-full bg-white border-4 border-[#312e81] rounded-3xl shadow-[4px_4px_0px_0px_rgba(49,46,129,1)] p-5 mb-2">
          <p className="font-black text-xl italic text-[#312e81] text-center leading-snug">
            "{current.q}"
          </p>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#312e81]/40 text-center mt-2">
            Hint: {current.hint}
          </p>
          {/* Bubble tail */}
          <div className="absolute -bottom-[18px] left-1/2 -translate-x-1/2">
            <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[18px] border-l-transparent border-r-transparent border-t-[#312e81]" />
          </div>
        </div>

        {/* Avatar */}
        <img
          src={avatar.image}
          alt={avatar.name}
          className={`w-28 h-28 object-contain drop-shadow-lg mt-2 transition-transform duration-300 ${
            listening ? 'scale-110 animate-bounce' : ''
          }`}
        />

        {/* Speak question button */}
        {ttsSupported && (
          <button
            onClick={ttsPlaying ? () => { cancelSpeech(); setTtsPlaying(false); } : speakQuestion}
            disabled={listening}
            className={`mt-2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl border-2 text-xs font-black uppercase transition-all ${
              ttsPlaying
                ? 'border-orange-400 bg-orange-400 text-white'
                : 'border-[#312e81]/30 bg-white text-[#312e81]/60 hover:border-[#312e81] hover:text-[#312e81]'
            } disabled:opacity-40 disabled:pointer-events-none`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            {ttsPlaying ? '중지' : '질문 듣기'}
          </button>
        )}
      </div>

      {/* Answer card */}
      <div className="w-full max-w-sm bg-[#FFFBEB] border-4 border-[#312e81] rounded-3xl shadow-[6px_6px_0px_0px_rgba(49,46,129,1)] p-6">

        {/* Transcript */}
        {answered && transcript && (
          <div className="mb-4 bg-white border-4 border-[#312e81]/20 rounded-2xl px-4 py-3 text-center">
            <p className="font-black text-[#312e81] italic">"{transcript}"</p>
          </div>
        )}

        {!supported && (
          <p className="text-xs font-bold text-[#312e81]/50 text-center mb-3">
            Chrome에서 마이크 기능이 가장 잘 작동해요.
          </p>
        )}

        {/* Buttons */}
        {!answered ? (
          listening ? (
            <button
              onClick={abort}
              className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl border-4 border-rose-500 bg-rose-500 text-white font-black uppercase shadow-[3px_3px_0px_0px_rgba(244,63,94,0.4)] transition hover:bg-rose-600 active:shadow-none"
            >
              <StopCircle className="w-5 h-5 animate-pulse" /> 중지
            </button>
          ) : (
            <button
              onClick={handleRecord}
              disabled={!supported || ttsPlaying}
              className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl border-4 border-[#312e81] bg-[#312e81] text-white font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] transition hover:bg-[#25206F] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-40 disabled:pointer-events-none"
            >
              <Mic className="w-5 h-5" /> 답변하기
            </button>
          )
        ) : (
          <div className="flex flex-col gap-3">
            <button
              onClick={handleNext}
              className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl border-4 border-orange-600 bg-orange-400 text-white font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(194,65,12,0.4)] transition hover:scale-105 active:scale-95"
            >
              {isLast ? '완료! 🎉' : '다음 질문'} <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => { setAnswered(false); setTranscript(''); }}
              className="text-[10px] font-black uppercase tracking-widest text-[#312e81]/40 hover:text-[#312e81] transition text-center"
            >
              다시 말하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
