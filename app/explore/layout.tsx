import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore | inter-yeongo',
  description: '영어 학습 로드맵 — 인트로, 스피킹, 클래스룸, 서브젝트 코스.',
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
