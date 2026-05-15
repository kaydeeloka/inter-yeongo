import ExploreSubpageShell from '@/components/explore/ExploreSubpageShell';

export default function ExploreSubjectsPage() {
  return (
    <ExploreSubpageShell titleKo="서브젝트" titleEn="Subjects" eyebrow="구역 4">
      <p className="text-sm font-medium leading-relaxed text-indigo-100/90">
        전공·수업 어휘와 스터디 상황 표현에 집중해요. 살아남는 단어 미션, 곧 오픈합니다.
      </p>
      <p className="mt-4 text-xs font-semibold text-sky-200/85">상태: 준비 중 · 클래스룸과 연계된 시나리오로 확장 예정이에요.</p>
    </ExploreSubpageShell>
  );
}
