'use client';

import type { LucideIcon } from 'lucide-react';
import { Coffee, Store, GraduationCap, Heart, ShoppingBag } from 'lucide-react';

import type { SpeakingCategory, SpeakingCategoryId } from '@/data/speaking-challenges';

const CATEGORY_ICONS: Record<SpeakingCategoryId, LucideIcon> = {
  cafe: Coffee,
  convenience: Store,
  class: GraduationCap,
  date: Heart,
  shopping: ShoppingBag,
};

interface CategoryTabsProps {
  categories: SpeakingCategory[];
  activeId: SpeakingCategoryId;
  onChange: (id: SpeakingCategoryId) => void;
  interactionLocked?: boolean;
}

export default function CategoryTabs({
  categories,
  activeId,
  onChange,
  interactionLocked = false,
}: CategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="문장 카테고리"
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-2 rounded-2xl bg-white border-4 border-[#312e81] shadow-[4px_4px_0px_0px_rgba(49,46,129,1)] ${
        interactionLocked ? 'opacity-60' : ''
      }`}
    >
      {categories.map((cat) => {
        const selected = cat.id === activeId;
        const Icon = CATEGORY_ICONS[cat.id];
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={selected}
            disabled={interactionLocked}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(cat.id)}
            className={[
              'min-w-0 flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl text-xs font-black uppercase transition-all outline-none',
              selected
                ? 'bg-[#312e81] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]'
                : 'text-[#312e81] hover:bg-yellow-100 border-2 border-transparent hover:border-[#312e81]/20',
            ].join(' ')}
          >
            <Icon
              className={`w-4 h-4 shrink-0 ${selected ? 'text-yellow-300' : 'text-[#312e81]/60'}`}
              strokeWidth={2.25}
              aria-hidden
            />
            <span className="truncate w-full text-center leading-tight">{cat.labelKo}</span>
            <span className={`truncate w-full text-center text-[9px] font-bold leading-tight ${selected ? 'text-white/70' : 'text-[#312e81]/40'}`}>
              {cat.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
