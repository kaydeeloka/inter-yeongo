'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Map } from 'lucide-react';

import ExploreMissionModal from '@/components/explore/ExploreMissionModal';
import RoadmapNode from '@/components/explore/RoadmapNode';
import RoadmapPath from '@/components/explore/RoadmapPath';
import { ROADMAP_LESSONS, roadmapPathForLayout } from '@/data/explore-roadmap';
import type { RoadmapLesson } from '@/data/explore-roadmap';
import { EXPLORE_THEME } from '@/data/explore-theme';
import { useWideRoadmapLayout } from '@/hooks/useWideRoadmapLayout';

export default function ExploreRoadmap() {
  const wide = useWideRoadmapLayout();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [modalLesson, setModalLesson] = useState<RoadmapLesson | null>(null);
  const modalOpen = modalLesson !== null;

  const pathD = wide ? roadmapPathForLayout(true) : '';
  const pathEmphasis = wide && hoveredId !== null;

  return (
    <div
      className="min-h-dvh font-sans scheme-light antialiased"
      style={{
        background: `linear-gradient(to bottom, ${EXPLORE_THEME.bg}, ${EXPLORE_THEME.bgSoft})`,
        color: EXPLORE_THEME.text,
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <header
        className="sticky top-0 z-20 border-b-2 backdrop-blur-md"
        style={{
          borderColor: `${EXPLORE_THEME.primary}33`,
          backgroundColor: `${EXPLORE_THEME.bg}f2`,
        }}
      >
        <div className="mx-auto flex h-12 w-full max-w-[min(96rem,calc(100vw-1.5rem))] items-center justify-between gap-3 px-3 sm:px-4">
          <Link
            href="/"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#302B8F] bg-white text-[#302B8F] shadow-sm transition hover:bg-[#FFF176]/35"
            aria-label="홈"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5">
            <Map className="h-4 w-4 shrink-0 text-[#302B8F]" aria-hidden />
            <span className="truncate text-sm font-bold text-[#1F1D3D]">영어 로드맵</span>
          </div>
          <div className="w-9 shrink-0" aria-hidden />
        </div>
      </header>

      <main className="relative z-1 mx-auto w-full max-w-[min(96rem,calc(100vw-1.5rem))] px-3 pb-16 pt-4 sm:px-5 sm:pt-5 md:pb-14 lg:px-8 lg:pb-16">
        <header className="mx-auto max-w-3xl text-center lg:max-w-4xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6F6A8A] sm:text-[11px]">
            Beginner path
          </p>
          <h1 className="mt-0.5 text-2xl font-black tracking-tight text-[#1F1D3D] sm:text-[1.75rem] lg:text-[1.9rem]">
            캠퍼스 영어 로드맵
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-pretty text-sm font-medium leading-relaxed text-[#6F6A8A] sm:text-[0.9375rem]">
            코스를 따라가며 구역을 열어요. 완료한 레슨은 체크로 표시됩니다.
          </p>
        </header>

        <div
          className={[
            'relative mx-auto mt-6 w-full rounded-[1.75rem] border-2 border-[#302B8F] bg-white shadow-[0_14px_40px_-14px_rgba(48,43,143,0.18)]',
            wide
              ? 'max-w-[min(92rem,calc(100vw-2rem))] overflow-hidden p-[clamp(0.75rem,3vw,2.5rem)] max-lg:max-w-5xl min-h-[clamp(380px,46vw,500px)]'
              : 'max-w-[min(100%,20rem)] overflow-x-hidden px-3 py-8 sm:max-w-88 sm:px-4 sm:py-10',
          ].join(' ')}
        >
          {wide ? (
            <>
              <RoadmapPath pathD={pathD} emphasized={pathEmphasis} />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 rounded-b-[1.6rem] bg-linear-to-t from-[#FFF9E8]/95 to-transparent md:h-1/5"
                aria-hidden
              />
              {ROADMAP_LESSONS.map((lesson) => (
                <RoadmapNode
                  key={lesson.id}
                  lesson={lesson}
                  layout="map"
                  center={lesson.center.wide}
                  disabled={modalOpen}
                  highlighted={hoveredId === lesson.id}
                  onHoverChange={setHoveredId}
                  onSelect={setModalLesson}
                />
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center gap-10 sm:gap-12">
              {ROADMAP_LESSONS.map((lesson, index) => (
                <div key={lesson.id} className="flex w-full flex-col items-center">
                  <RoadmapNode
                    lesson={lesson}
                    layout="stack"
                    disabled={modalOpen}
                    highlighted={hoveredId === lesson.id}
                    onHoverChange={setHoveredId}
                    onSelect={setModalLesson}
                  />
                  {index < ROADMAP_LESSONS.length - 1 && (
                    <div
                      className="mt-8 flex h-10 w-px shrink-0 border-l-2 border-dashed border-[#302B8F]/35 sm:mt-10 sm:h-12"
                      aria-hidden
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <ExploreMissionModal lesson={modalLesson} onClose={() => setModalLesson(null)} />
    </div>
  );
}
