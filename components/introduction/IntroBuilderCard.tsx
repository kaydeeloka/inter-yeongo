'use client';

import type { IntroFields } from '@/lib/introduction-template';

const inputClass =
  'mt-1 w-full rounded-xl border-4 border-[#312e81] bg-white px-3 py-2.5 text-sm font-bold text-[#312e81] outline-none transition placeholder:text-[#312e81]/30 placeholder:font-bold focus:border-orange-400';

interface IntroBuilderCardProps {
  values: IntroFields;
  onChange: (patch: Partial<IntroFields>) => void;
}

export default function IntroBuilderCard({ values, onChange }: IntroBuilderCardProps) {
  return (
    <section
      className="rounded-3xl border-4 border-[#312e81] bg-[#FFFBEB] p-6 shadow-[6px_6px_0px_0px_rgba(49,46,129,1)]"
      aria-labelledby="intro-builder-heading"
    >
      <h2 id="intro-builder-heading" className="text-lg font-black uppercase italic text-[#312e81]">
        내 정보
      </h2>
      <p className="mt-1 text-xs font-bold text-[#312e81]/50">간단히 적으면 아래에서 영어 문장이 만들어져요.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-xs font-black uppercase tracking-widest text-[#312e81]">
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
        <label className="block text-xs font-black uppercase tracking-widest text-[#312e81]">
          나이
          <input
            className={inputClass}
            value={values.age}
            onChange={(e) => onChange({ age: e.target.value })}
            placeholder="예: 20"
            maxLength={3}
            inputMode="numeric"
          />
        </label>
        <label className="block text-xs font-black uppercase tracking-widest text-[#312e81]">
          국적
          <input
            className={inputClass}
            value={values.country}
            onChange={(e) => onChange({ country: e.target.value })}
            placeholder="예: South Korea"
            maxLength={40}
          />
        </label>
        <label className="block text-xs font-black uppercase tracking-widest text-[#312e81]">
          전공
          <input
            className={inputClass}
            value={values.major}
            onChange={(e) => onChange({ major: e.target.value })}
            placeholder="예: Computer Science"
            maxLength={64}
          />
        </label>
        <label className="block text-xs font-black uppercase tracking-widest text-[#312e81] sm:col-span-2">
          잘하는 것
          <input
            className={inputClass}
            value={values.goodAt}
            onChange={(e) => onChange({ goodAt: e.target.value })}
            placeholder="예: public speaking, coding"
            maxLength={80}
          />
        </label>
      </div>
    </section>
  );
}
