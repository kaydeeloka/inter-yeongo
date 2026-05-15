'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, GraduationCap } from 'lucide-react';

import { EXPLORE_THEME } from '@/data/explore-theme';
import type { RoadmapDisplayStatus, RoadmapLesson, RoadmapNodeCoords } from '@/data/explore-roadmap';

export type RoadmapNodeLayout = 'map' | 'stack';

interface RoadmapNodeProps {
  lesson: RoadmapLesson;
  layout: RoadmapNodeLayout;
  /** Map layout only — node anchor in panel %-space */
  center?: RoadmapNodeCoords;
  disabled: boolean;
  highlighted: boolean;
  onHoverChange: (id: string | null) => void;
  onSelect: (lesson: RoadmapLesson) => void;
}

function ringClass(status: RoadmapDisplayStatus, highlighted: boolean): string {
  const glow = highlighted ? 'shadow-lg shadow-[#302B8F]/18' : 'shadow-md shadow-[#302B8F]/10';
  if (status === 'current')
    return `ring-2 ring-[#302B8F] ring-offset-2 ring-offset-[#FFF176] shadow-[0_0_0_3px_rgba(255,241,118,0.5)] ${glow}`;
  if (status === 'completed') return `ring-2 ring-emerald-600/80 ${glow}`;
  return `ring-2 ring-[#302B8F]/35 ${glow}`;
}

function NodeBody({
  lesson,
  disabled,
  highlighted,
  onHoverChange,
  onSelect,
  isCurrent,
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
  isCurrent: boolean;
  isDone: boolean;
  imgFailed: boolean;
  setImgFailed: (v: boolean) => void;
  compact?: boolean;
}) {
  const circleSize = compact
    ? 'aspect-square w-[3.75rem] shrink-0 sm:w-16'
    : 'aspect-square w-[clamp(4.25rem,16vw,5.75rem)] shrink-0 sm:w-[clamp(4.5rem,14vw,6.25rem)]';

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
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
    >
      <div
        className={[
          'relative flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-white to-[#FFFCF0]',
          circleSize,
          ringClass(lesson.displayStatus, highlighted),
        ].join(' ')}
      >
        {!imgFailed && (
          <Image
            src={lesson.imageSrc}
            alt=""
            fill
            sizes={compact ? '72px' : '(max-width: 767px) 96px, 112px'}
            className="object-contain object-center p-2 transition-transform duration-300 group-hover:scale-[1.04]"
            onError={() => setImgFailed(true)}
          />
        )}
        {imgFailed && (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-0.5 px-2 text-center"
            style={{ background: `linear-gradient(to bottom right, ${EXPLORE_THEME.primary}18, ${EXPLORE_THEME.primary}08)` }}
          >
            <GraduationCap className="h-6 w-6 text-[#302B8F]/80 sm:h-7 sm:w-7" aria-hidden />
            <span className="text-[7px] font-bold uppercase tracking-wide text-[#302B8F]/75">준비 중</span>
          </div>
        )}
        {isDone && (
          <span className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white shadow-md sm:h-7 sm:w-7">
            <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={3} aria-hidden />
          </span>
        )}
        {lesson.displayStatus === 'upcoming' && (
          <span className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 rounded-full border-2 border-[#302B8F]/30 bg-white px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide text-[#6F6A8A] shadow-sm">
            대기
          </span>
        )}
      </div>

      <div className="mt-2.5 w-full min-w-0 rounded-2xl border-2 border-[#302B8F] bg-white px-2.5 py-2.5 text-center shadow-sm sm:px-3 sm:py-3">
        <div className="flex flex-wrap items-center justify-center gap-1">
          <span className="rounded-full border border-[#302B8F]/15 bg-[#FFF176]/45 px-2 py-0.5 text-[10px] font-bold tabular-nums text-[#1F1D3D]">
            {lesson.progressCurrent}/{lesson.progressTotal}
          </span>
          {isCurrent && (
            <span className="rounded-full border border-[#302B8F]/25 bg-[#FFF176] px-2 py-0.5 text-[10px] font-bold text-[#1F1D3D]">
              진행 중
            </span>
          )}
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
      <div className="relative z-10 w-full max-w-[17.5rem] shrink-0 px-1">
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
            isCurrent={isCurrent}
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
      className="absolute z-10 flex w-[max(0px,calc(100%-1.5rem))] max-w-[min(100%,13.5rem)] -translate-x-1/2 -translate-y-1/2 flex-col items-center sm:max-w-[14.5rem] lg:max-w-[15rem]"
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
        isCurrent={isCurrent}
        isDone={displayStatus === 'completed'}
        imgFailed={imgFailed}
        setImgFailed={setImgFailed}
      />
    </motion.div>
  );
}
