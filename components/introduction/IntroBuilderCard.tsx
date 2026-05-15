'use client';

import type { IntroFields } from '@/lib/introduction-template';

const inputClass =
  'mt-1 w-full rounded-xl border-2 border-[#302B8F]/35 bg-white px-3 py-2.5 text-sm text-[#1F1D3D] shadow-sm outline-none transition placeholder:text-[#6F6A8A]/70 focus:border-[#302B8F] focus:ring-2 focus:ring-[#FFF176]/80';

interface IntroBuilderCardProps {
  values: IntroFields;
  onChange: (patch: Partial<IntroFields>) => void;
}

export default function IntroBuilderCard({ values, onChange }: IntroBuilderCardProps) {
  return (
    <section className="rounded-2xl border-2 border-[#302B8F] bg-[#FFFCF0] p-4 shadow-sm sm:p-5" aria-labelledby="intro-builder-heading">
      <h2 id="intro-builder-heading" className="text-base font-bold text-[#1F1D3D]">
        내 정보
      </h2>
      <p className="mt-1 text-xs text-[#6F6A8A]">간단히 적으면 아래에서 영어 문장이 만들어져요.</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-xs font-bold text-[#302B8F]">
          이름
          <input
            className={inputClass}
            value={values.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="예: Minji"
            autoComplete="name"
            maxLength={40}
          />
        </label>
        <label className="block text-xs font-bold text-[#302B8F]">
          전공
          <input
            className={inputClass}
            value={values.major}
            onChange={(e) => onChange({ major: e.target.value })}
            placeholder="예: Computer Science"
            maxLength={64}
          />
        </label>
        <label className="block text-xs font-bold text-[#302B8F] sm:col-span-2">
          관심사
          <input
            className={inputClass}
            value={values.interest}
            onChange={(e) => onChange({ interest: e.target.value })}
            placeholder="예: web development, films"
            maxLength={80}
          />
        </label>
        <label className="block text-xs font-bold text-[#302B8F] sm:col-span-2">
          목표
          <input
            className={inputClass}
            value={values.goal}
            onChange={(e) => onChange({ goal: e.target.value })}
            placeholder="예: presentations, part-time jobs"
            maxLength={80}
          />
        </label>
      </div>
    </section>
  );
}
