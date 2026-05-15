'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

import type { RoadmapLesson, RoadmapNodeCoords } from '@/data/explore-roadmap';

export type RoadmapNodeLayout = 'map' | 'stack';

interface RoadmapNodeProps {
  lesson: RoadmapLesson;
  layout: RoadmapNodeLayout;
  center?: RoadmapNodeCoords;
  disabled: boolean;
  highlighted: boolean;
  onHoverChange: (id: string | null) => void;
  onSelect: (lesson: RoadmapLesson) => void;
}

function NodeBody({
  lesson,
  disabled,
  highlighted,
  onHoverChange,
  onSelect,
  isDone,
  imgFailed,
  setImgFailed,
  compact,
}: {
  lesson: RoadmapLesson;
  disabled: boolean;
  highlighted: boolean;
  onHoverChange: (id: string | null) => void;
  onSelect: (lesson: RoadmapLesson) => void;
  isDone: boolean;
  imgFailed: boolean;
  setImgFailed: (v: boolean) => void;
  compact?: boolean;
}) {
  const imgSize = compact ? 'w-28 h-28 sm:w-32 sm:h-32' : 'w-40 h-40 sm:w-48 sm:h-48';

  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(lesson)}
      onFocus={() => onHoverChange(lesson.id)}
      onBlur={() => onHoverChange(null)}
      onMouseEnter={() => onHoverChange(lesson.id)}
      onMouseLeave={() => onHoverChange(null)}
      className="group flex w-full min-w-0 flex-col items-center rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#302B8F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF9E8] disabled:opacity-55"
      whileHover={disabled ? undefined : { y: -3 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
    >
      <div className={`relative shrink-0 ${imgSize} transition-transform duration-300 group-hover:scale-[1.06]`}>
        {!imgFailed ? (
          <Image
            src={lesson.imageSrc}
            alt=""
            fill
            sizes={compact ? '128px' : '192px'}
            className="object-contain object-center drop-shadow-md"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-2xl border-2 border-[#302B8F]/20 bg-white/60 text-[8px] font-bold text-[#302B8F]/60">
            준비 중
          </div>
        )}
        {isDone && (
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white shadow-md">
            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
          </span>
        )}
      </div>

      <div className={`mt-2 w-full min-w-0 rounded-2xl border-2 border-[#302B8F] bg-white px-2.5 py-2.5 text-center shadow-sm sm:px-3 sm:py-3 ${highlighted ? 'shadow-md' : ''}`}>
        <div className="flex flex-wrap items-center justify-center gap-1">
          <span className="rounded-full border border-[#302B8F]/15 bg-[#FFF176]/45 px-2 py-0.5 text-[10px] font-bold tabular-nums text-[#1F1D3D]">
            {lesson.progressCurrent}/{lesson.progressTotal}
          </span>
        </div>
        <h2 className="mt-1 text-[0.9375rem] font-bold leading-snug text-[#1F1D3D] sm:text-base">{lesson.titleKo}</h2>
        <p className="text-[10px] font-semibold text-[#6F6A8A] sm:text-[11px]">{lesson.titleEn}</p>
        <p className="mt-1.5 text-left text-[10px] leading-relaxed text-[#1F1D3D] sm:text-[11px]">{lesson.missionShort}</p>
      </div>
    </motion.button>
  );
}

export default function RoadmapNode({
  lesson,
  layout,
  center,
  disabled,
  highlighted,
  onHoverChange,
  onSelect,
}: RoadmapNodeProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const { displayStatus } = lesson;
  const isCurrent = displayStatus === 'current';

  if (layout === 'stack') {
    return (
      <div className="relative z-10 w-full max-w-70 shrink-0 px-1">
        <motion.div
          initial={false}
          animate={isCurrent ? { scale: [1, 1.015, 1] } : { scale: 1 }}
          transition={isCurrent ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : {}}
        >
          <NodeBody
            lesson={lesson}
            disabled={disabled}
            highlighted={highlighted}
            onHoverChange={onHoverChange}
            onSelect={onSelect}
            isDone={displayStatus === 'completed'}
            imgFailed={imgFailed}
            setImgFailed={setImgFailed}
            compact
          />
        </motion.div>
      </div>
    );
  }

  if (!center) return null;

  return (
    <motion.div
      className="absolute z-10 flex w-[max(0px,calc(100%-1.5rem))] max-w-[min(100%,13.5rem)] -translate-x-1/2 -translate-y-1/2 flex-col items-center sm:max-w-58 lg:max-w-60"
      style={{ left: `${center.xPct}%`, top: `${center.yPct}%` }}
      initial={false}
      animate={isCurrent ? { scale: [1, 1.02, 1] } : { scale: 1 }}
      transition={isCurrent ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : {}}
      onMouseEnter={() => onHoverChange(lesson.id)}
      onMouseLeave={() => onHoverChange(null)}
    >
      <NodeBody
        lesson={lesson}
        disabled={disabled}
        highlighted={highlighted}
        onHoverChange={onHoverChange}
        onSelect={onSelect}
        isDone={displayStatus === 'completed'}
        imgFailed={imgFailed}
        setImgFailed={setImgFailed}
      />
    </motion.div>
  );
}
