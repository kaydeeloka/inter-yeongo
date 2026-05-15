'use client';

import dynamic from 'next/dynamic';

const IntroductionMission = dynamic(() => import('@/components/introduction/IntroductionMission'), {
  ssr: false,
  loading: () => (
    <p className="text-sm font-medium text-[#6F6A8A]" role="status">
      미션 불러오는 중…
    </p>
  ),
});

export default function IntroductionPageClient() {
  return <IntroductionMission />;
}
