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
  /** When true, tab changes are blocked (recording or audio playback). */
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
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-2 rounded-2xl bg-white/80 border border-indigo-100/90 shadow-sm backdrop-blur-sm ${
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
              'min-w-0 flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl text-xs font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2',
              selected
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 ring-2 ring-indigo-300/60 scale-[1.02]'
                : 'text-indigo-900/75 hover:bg-indigo-50/95 hover:text-indigo-950 border border-transparent hover:border-indigo-100',
            ].join(' ')}
          >
            <Icon
              className={`w-4 h-4 shrink-0 ${selected ? 'text-indigo-100' : 'text-indigo-400'}`}
              strokeWidth={2.25}
              aria-hidden
            />
            <span className="truncate w-full text-center leading-tight">{cat.labelKo}</span>
            <span
              className={`truncate w-full text-center text-[9px] font-medium leading-tight ${
                selected ? 'text-indigo-100/90' : 'text-indigo-400/90'
              }`}
            >
              {cat.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
