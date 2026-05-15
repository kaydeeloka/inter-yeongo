import ExploreSubpageShell from '@/components/explore/ExploreSubpageShell';
import IntroductionPageClient from '@/components/introduction/IntroductionPageClient';

export default function ExploreIntroductionPage() {
  return (
    <ExploreSubpageShell titleKo="Introduction" titleEn="자기소개 미션" eyebrow="구역 1">
      <p className="mb-6 text-sm font-medium leading-relaxed text-[#6F6A8A]">
        짧고 자연스럽게 나를 소개하는 연습이에요. 이름, 전공, 관심사, 목표를 넣고 영어로 말해 봐요.
      </p>
      <IntroductionPageClient />
    </ExploreSubpageShell>
  );
}
