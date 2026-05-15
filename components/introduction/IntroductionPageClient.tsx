'use client';

import dynamic from 'next/dynamic';
import type { Avatar } from '@/types';

const IntroductionMission = dynamic(() => import('@/components/introduction/IntroductionMission'), {
  ssr: false,
  loading: () => (
    <p className="text-sm font-medium text-[#312e81]/60" role="status">
      미션 불러오는 중…
    </p>
  ),
});

interface IntroductionPageClientProps {
  avatar: Avatar;
}

export default function IntroductionPageClient({ avatar }: IntroductionPageClientProps) {
  return <IntroductionMission avatar={avatar} />;
}
