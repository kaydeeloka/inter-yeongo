'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, GraduationCap } from 'lucide-react';

import type { RoadmapDisplayStatus, RoadmapNodeCoords } from '@/data/explore-roadmap';
import type { RoadmapLesson } from '@/data/explore-roadmap';

interface RoadmapNodeProps {
  lesson: RoadmapLesson;
  center: RoadmapNodeCoords;
  disabled: boolean;
  highlighted: boolean;
  onHoverChange: (id: string | null) => void;
  onSelect: (lesson: RoadmapLesson) => void;
}

function ringClass(status: RoadmapDisplayStatus, highlighted: boolean): string {
  const glow = highlighted ? 'shadow-lg shadow-emerald-900/12' : 'shadow-md shadow-stone-900/8';
  if (status === 'current')
    return `ring-[3px] ring-emerald-400/95 shadow-[0_0_0_5px_rgba(167,243,208,0.45)] ${glow}`;
  if (status === 'completed') return `ring-2 ring-emerald-500/55 ${glow}`;
  return `ring-[1.5px] ring-stone-300/95 ${glow}`;
}

export default function RoadmapNode({
  lesson,
  center,
  disabled,
  highlighted,
  onHoverChange,
  onSelect,
}: RoadmapNodeProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const { displayStatus } = lesson;
  const isCurrent = displayStatus === 'current';
  const isDone = displayStatus === 'completed';

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
      <motion.button
        type="button"
        disabled={disabled}
        onClick={() => onSelect(lesson)}
        onFocus={() => onHoverChange(lesson.id)}
        onBlur={() => onHoverChange(null)}
        className="group flex w-full min-w-0 flex-col items-center rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f5] disabled:opacity-55"
        whileHover={disabled ? undefined : { y: -3 }}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
      >
        <div
          className={[
            'relative flex aspect-square w-[clamp(4.25rem,20vw,5.75rem)] shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-white to-stone-50 sm:w-[clamp(4.5rem,16vw,6.25rem)]',
            ringClass(displayStatus, highlighted),
          ].join(' ')}
        >
          {!imgFailed && (
            <Image
              src={lesson.imageSrc}
              alt=""
              fill
              sizes="(max-width: 767px) 96px, 112px"
              className="object-contain object-center p-2 transition-transform duration-300 group-hover:scale-[1.04]"
              onError={() => setImgFailed(true)}
            />
          )}
          {imgFailed && (
            <div className="flex h-full w-full flex-col items-center justify-center gap-0.5 bg-gradient-to-br from-emerald-100 to-teal-50 px-2 text-center">
              <GraduationCap className="h-7 w-7 text-emerald-700/85 sm:h-8 sm:w-8" aria-hidden />
              <span className="text-[8px] font-bold uppercase tracking-wide text-emerald-900/65">
                준비 중
              </span>
            </div>
          )}
          {isDone && (
            <span className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white shadow-md sm:h-7 sm:w-7">
              <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={3} aria-hidden />
            </span>
          )}
          {displayStatus === 'upcoming' && (
            <span className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 rounded-full border border-stone-200/90 bg-white/95 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-stone-500 shadow-sm">
              대기
            </span>
          )}
        </div>

        <div className="mt-2 w-full min-w-0 rounded-xl border border-stone-200/80 bg-white/92 px-2.5 py-2 text-center shadow-sm backdrop-blur-sm sm:px-3 sm:py-2.5">
          <div className="flex flex-wrap items-center justify-center gap-1">
            <span className="rounded-full bg-stone-100/95 px-2 py-0.5 text-[10px] font-bold tabular-nums text-stone-600">
              {lesson.progressCurrent}/{lesson.progressTotal}
            </span>
            {isCurrent && (
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                진행 중
              </span>
            )}
          </div>
          <h2 className="mt-1 text-[0.9375rem] font-bold leading-snug text-stone-900 sm:text-base">
            {lesson.titleKo}
          </h2>
          <p className="text-[10px] font-medium text-stone-500 sm:text-[11px]">{lesson.titleEn}</p>
          <p className="mt-1 line-clamp-2 text-left text-[10px] leading-snug text-stone-600 sm:text-[11px]">
            {lesson.missionShort}
          </p>
        </div>
      </motion.button>
    </motion.div>
  );
}
