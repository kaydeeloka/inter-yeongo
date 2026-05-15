'use client';

import dynamic from 'next/dynamic';

const SpeakingPractice = dynamic(() => import('@/components/speaking/SpeakingPractice'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#f4f2fa] flex items-center justify-center text-indigo-800 text-sm font-medium">
      불러오는 중…
    </div>
  ),
});

export default function ExploreSpeakingPage() {
  return <SpeakingPractice />;
}
