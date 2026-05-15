'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { EXPLORE_THEME } from '@/data/explore-theme';

interface ExploreSubpageShellProps {
  titleKo: string;
  titleEn: string;
  eyebrow?: string;
  children: React.ReactNode;
}

export default function ExploreSubpageShell({
  titleKo,
  titleEn,
  eyebrow = 'Explore',
  children,
}: ExploreSubpageShellProps) {
  return (
    <div
      className="flex min-h-[100dvh] flex-col font-sans [color-scheme:light] antialiased"
      style={{
        background: `linear-gradient(to bottom, ${EXPLORE_THEME.bg}, ${EXPLORE_THEME.bgSoft})`,
        color: EXPLORE_THEME.text,
      }}
    >
      <header
        className="sticky top-0 z-20 border-b-2 backdrop-blur-md"
        style={{
          borderColor: `${EXPLORE_THEME.primary}33`,
          backgroundColor: `${EXPLORE_THEME.bg}f2`,
        }}
      >
        <div className="mx-auto flex h-12 max-w-lg items-center gap-2 px-3">
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#302B8F] bg-white px-3 py-1.5 text-xs font-bold text-[#302B8F] shadow-sm transition hover:bg-[#FFF176]/35"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            로드맵
          </Link>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6F6A8A]">코스</span>
        </div>
      </header>
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6F6A8A]">{eyebrow}</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-[#1F1D3D]">{titleKo}</h1>
        <p className="mt-1 text-sm font-semibold text-[#6F6A8A]">{titleEn}</p>
        <div className="mt-8 rounded-2xl border-2 border-[#302B8F] bg-white p-5 shadow-md shadow-[#302B8F]/12">
          {children}
        </div>
      </main>
    </div>
  );
}
