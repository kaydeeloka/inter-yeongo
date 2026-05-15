'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { getSavedAvatar, getSavedName } from '@/lib/userStore';
import { AVATARS } from '@/data/avatars';
import type { Avatar } from '@/types';

import ExploreMissionModal from '@/components/explore/ExploreMissionModal';
import RoadmapNode from '@/components/explore/RoadmapNode';
import RoadmapPath from '@/components/explore/RoadmapPath';
import { ROADMAP_LESSONS, roadmapPathForLayout } from '@/data/explore-roadmap';
import type { RoadmapLesson } from '@/data/explore-roadmap';
import { EXPLORE_THEME } from '@/data/explore-theme';
import { useWideRoadmapLayout } from '@/hooks/useWideRoadmapLayout';

export default function ExploreRoadmap() {
  const router = useRouter();
  const wide = useWideRoadmapLayout();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [modalLesson, setModalLesson] = useState<RoadmapLesson | null>(null);
  const [avatar, setAvatar] = useState<Avatar>(AVATARS[0]);
  const [nickname, setNickname] = useState('');
  const modalOpen = modalLesson !== null;

  useEffect(() => {
    setAvatar(getSavedAvatar());
    setNickname(getSavedName());
  }, []);

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

      <header className="w-full bg-white border-b-4 border-[#312e81] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#312e81] shadow-[2px_2px_0px_0px_rgba(49,46,129,1)] rounded-full flex items-center justify-center bg-white shrink-0">
            <img src={avatar.image} alt={avatar.name} className="w-9 h-9 object-contain" />
          </div>
          <span className="font-black text-sm uppercase italic leading-none text-[#312e81]">{nickname}</span>
        </div>
        <button
          onClick={() => router.push('/avatar')}
          className="bg-white p-1.5 border-2 border-[#312e81] rounded-lg shadow-[2px_2px_0px_0px_rgba(49,46,129,1)]"
        >
          <ArrowLeft size={18} />
        </button>
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
