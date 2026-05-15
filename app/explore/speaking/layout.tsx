import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '스피킹 연습 | inter-yeongo',
  description: '탭으로 주제를 고르고 문장을 따라 말하며 피드백을 받는 스피킹 챌린지.',
};

export default function ExploreSpeakingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
