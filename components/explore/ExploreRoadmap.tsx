'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Map } from 'lucide-react';

import ExploreTransitionOverlay from '@/components/explore/ExploreTransitionOverlay';
import RoadmapNode from '@/components/explore/RoadmapNode';
import RoadmapPath from '@/components/explore/RoadmapPath';
import { ROADMAP_LESSONS, roadmapPathForLayout } from '@/data/explore-roadmap';
import type { RoadmapLesson } from '@/data/explore-roadmap';
import { useWideRoadmapLayout } from '@/hooks/useWideRoadmapLayout';

const NAV_MS = 300;

export default function ExploreRoadmap() {
  const router = useRouter();
  const wide = useWideRoadmapLayout();
  const [navOpen, setNavOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const lockingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const go = useCallback(
    (lesson: RoadmapLesson) => {
      if (lockingRef.current) return;
      lockingRef.current = true;
      setNavOpen(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        router.push(lesson.route);
        setNavOpen(false);
        lockingRef.current = false;
        timerRef.current = null;
      }, NAV_MS);
    },
    [router]
  );

  const pathD = roadmapPathForLayout(wide);
  const pathEmphasis = hoveredId !== null;

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#fdfbf6] via-[#f5f7ef] to-[#eaf2e4] font-sans text-stone-800 [color-scheme:light] antialiased">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <header className="sticky top-0 z-20 border-b border-stone-200/60 bg-[#fdfbf6]/90 backdrop-blur-md">
        <div className="mx-auto flex h-12 w-full max-w-[min(96rem,calc(100vw-1.5rem))] items-center justify-between gap-3 px-3 sm:px-4">
          <Link
            href="/"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-sm hover:bg-stone-50"
            aria-label="홈"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 text-stone-800">
            <Map className="h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
            <span className="truncate text-sm font-bold">영어 로드맵</span>
          </div>
          <div className="w-9 shrink-0" aria-hidden />
        </div>
      </header>

      <main className="relative z-[1] mx-auto w-full max-w-[min(96rem,calc(100vw-1.5rem))] px-3 pb-14 pt-4 sm:px-5 sm:pt-5 lg:px-8 lg:pb-16">
        <header className="mx-auto max-w-3xl text-center lg:max-w-4xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-800/75 sm:text-[11px]">
            Beginner path
          </p>
          <h1 className="mt-0.5 text-2xl font-black tracking-tight text-stone-900 sm:text-[1.75rem] lg:text-[1.9rem]">
            캠퍼스 영어 로드맵
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-pretty text-sm font-medium leading-relaxed text-stone-600 sm:text-[0.9375rem]">
            코스를 따라가며 구역을 열어요. 완료한 레슨은 체크로 표시됩니다.
          </p>
        </header>

        <div
          className={[
            'relative mx-auto mt-6 w-full overflow-hidden rounded-[1.75rem] border border-stone-200/90 bg-white/70 shadow-[0_12px_40px_-12px_rgba(60,80,60,0.16)] backdrop-blur-[2px]',
            'p-[clamp(0.75rem,3vw,2.5rem)]',
            wide
              ? 'max-w-[min(92rem,calc(100vw-2rem))] min-h-[clamp(380px,46vw,500px)] max-lg:max-w-5xl'
              : 'max-w-md min-h-[clamp(520px,112vw,700px)] sm:max-w-lg',
          ].join(' ')}
        >
          <RoadmapPath pathD={pathD} emphasized={pathEmphasis} />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 rounded-b-[1.6rem] bg-gradient-to-t from-[#f4f7ef]/85 to-transparent md:h-1/5"
            aria-hidden
          />
          {ROADMAP_LESSONS.map((lesson) => (
            <RoadmapNode
              key={lesson.id}
              lesson={lesson}
              center={wide ? lesson.center.wide : lesson.center.narrow}
              disabled={navOpen}
              highlighted={hoveredId === lesson.id}
              onHoverChange={setHoveredId}
              onSelect={go}
            />
          ))}
        </div>
      </main>

      <ExploreTransitionOverlay open={navOpen} />
    </div>
  );
}
