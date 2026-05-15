import ExploreSubpageShell from '@/components/explore/ExploreSubpageShell';

export default function ExploreIntroductionPage() {
  return (
    <ExploreSubpageShell titleKo="인트로덕션" titleEn="Introduction" eyebrow="구역 1">
      <p className="text-sm font-medium leading-relaxed text-indigo-100/90">
        첫 NPC와의 만남. 이름, 전공, 캠퍼스에서의 목표까지 — 자기소개로 영어 모험의 문을 열어요. 미션
        콘텐츠는 곧 연결됩니다.
      </p>
      <p className="mt-4 text-xs font-semibold text-violet-200/80">상태: 준비 중 · 허브에서 다른 구역도 둘러보세요.</p>
    </ExploreSubpageShell>
  );
}
