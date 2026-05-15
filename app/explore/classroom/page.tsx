import ExploreSubpageShell from '@/components/explore/ExploreSubpageShell';

export default function ExploreClassroomPage() {
  return (
    <ExploreSubpageShell titleKo="클래스룸" titleEn="Classroom" eyebrow="구역 3">
      <p className="text-sm font-medium leading-relaxed text-indigo-100/90">
        교수님·팀플·수업 발표 상황을 영어로 연습해요. 변명 대신 설명하는 연습, 곧 이어집니다.
      </p>
      <p className="mt-4 text-xs font-semibold text-amber-200/85">상태: 준비 중 · 스피킹 구역에서 발음을 먼저 다듬어 볼 수 있어요.</p>
    </ExploreSubpageShell>
  );
}
