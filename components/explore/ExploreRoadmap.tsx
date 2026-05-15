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
      {/* Dot grid */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(48,43,143,0.13) 1.5px, transparent 1.5px)',
          backgroundSize: '44px 44px',
        }}
        aria-hidden
      />

      {/* Map decorations */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
          {/* Subtle contour lines */}
          <path d="M -100 30% Q 20% 22% 45% 28% Q 65% 34% 85% 24% Q 105% 14% 120% 22%" fill="none" stroke="#302B8F" strokeOpacity="0.07" strokeWidth="1.5" strokeDasharray="6 4" />
          <path d="M -100 55% Q 20% 48% 45% 54% Q 65% 60% 85% 50% Q 105% 40% 120% 48%" fill="none" stroke="#302B8F" strokeOpacity="0.07" strokeWidth="1.5" strokeDasharray="6 4" />
          <path d="M -100 78% Q 20% 72% 45% 78% Q 65% 84% 85% 74% Q 105% 64% 120% 72%" fill="none" stroke="#302B8F" strokeOpacity="0.07" strokeWidth="1.5" strokeDasharray="6 4" />
        </svg>

        {/* Trees */}
        {[
          { left: '5%', top: '18%' }, { left: '20%', top: '72%' },
          { left: '42%', top: '12%' }, { left: '60%', top: '68%' },
          { left: '78%', top: '16%' }, { left: '90%', top: '58%' },
          { left: '35%', top: '82%' }, { left: '70%', top: '80%' },
        ].map((pos, i) => (
          <svg key={i} style={{ position: 'absolute', left: pos.left, top: pos.top }} width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="9" y="18" width="4" height="8" rx="1" fill="#302B8F" fillOpacity="0.14" />
            <circle cx="11" cy="12" r="9" fill="#302B8F" fillOpacity="0.1" />
            <circle cx="11" cy="9" r="6" fill="#302B8F" fillOpacity="0.09" />
          </svg>
        ))}

        {/* Compass rose */}
        <svg style={{ position: 'absolute', right: '2.5rem', bottom: '2rem' }} width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="26" cy="26" r="22" stroke="#302B8F" strokeOpacity="0.15" strokeWidth="1.5" />
          <circle cx="26" cy="26" r="3" fill="#302B8F" fillOpacity="0.2" />
          <polygon points="26,6 28,24 26,26 24,24" fill="#302B8F" fillOpacity="0.3" />
          <polygon points="26,46 28,28 26,26 24,28" fill="#302B8F" fillOpacity="0.15" />
          <polygon points="6,26 24,24 26,26 24,28" fill="#302B8F" fillOpacity="0.15" />
          <polygon points="46,26 28,24 26,26 28,28" fill="#302B8F" fillOpacity="0.3" />
          <text x="26" y="4" textAnchor="middle" fill="#302B8F" fillOpacity="0.35" fontSize="7" fontWeight="800" fontFamily="sans-serif">N</text>
        </svg>
      </div>

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
            'ml-14 relative mx-auto mt-6 w-full',
            wide
              ? 'max-w-[min(92rem,calc(100vw-2rem))] overflow-visible p-[clamp(0.75rem,3vw,2.5rem)] max-lg:max-w-5xl min-h-[clamp(380px,46vw,500px)]'
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
