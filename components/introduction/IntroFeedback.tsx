'use client';

import type { SpeechScoreResult } from '@/lib/speech-scoring';

interface IntroFeedbackProps {
  transcript: string | null;
  score: SpeechScoreResult | null;
}

const PASS_MESSAGES = [
  '좋아요. 짧고 자연스럽게 전달됐어요.',
  '이 정도면 첫 만남에서 충분히 통합니다.',
] as const;

const RETRY_MESSAGES = [
  '거의 됐어요. 천천히 한 번 더 말해봐요.',
  '단어 순서를 조금 더 정확히 맞춰보세요.',
] as const;

function pickMessage(messages: readonly string[], seed: string): string {
  if (!seed) return messages[0];
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return messages[h % messages.length];
}

export default function IntroFeedback({ transcript, score }: IntroFeedbackProps) {
  if (!transcript && !score) return null;

  const seed = transcript ?? score?.normalizedTranscript ?? '';
  const message = score ? pickMessage(score.passed ? PASS_MESSAGES : RETRY_MESSAGES, seed) : null;
  const passed = score?.passed ?? false;

  return (
    <section
      className={`rounded-3xl border-4 p-5 shadow-[4px_4px_0px_0px_rgba(49,46,129,1)] ${
        passed
          ? 'border-emerald-500 bg-emerald-50'
          : 'border-[#312e81] bg-white'
      }`}
      aria-live="polite"
    >
      <h2 className="text-sm font-black uppercase italic text-[#312e81]">피드백</h2>
      {transcript && (
        <p className="mt-2 text-xs font-bold text-[#312e81]/60">
          <span className="text-[#312e81]">인식:</span> {transcript}
        </p>
      )}
      {score && (
        <>
          <p className={`mt-2 text-sm font-black ${passed ? 'text-emerald-700' : 'text-orange-600'}`}>
            유사도 {Math.round(score.similarity * 100)}점 · {passed ? '통과 ✓' : '다시 도전'}
          </p>
          {message && <p className="mt-1 text-sm font-bold leading-snug text-[#312e81]">{message}</p>}
        </>
      )}
    </section>
  );
}
