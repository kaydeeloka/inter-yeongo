'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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
    <div className="flex min-h-[100dvh] flex-col bg-gradient-to-b from-[#fdfbf6] to-[#eef4e6] font-sans text-stone-800 [color-scheme:light] antialiased">
      <header className="sticky top-0 z-20 border-b border-stone-200/70 bg-[#fdfbf6]/95 backdrop-blur-md">
        <div className="mx-auto flex h-12 max-w-lg items-center gap-2 px-3">
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-bold text-stone-700 shadow-sm hover:bg-stone-50"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            로드맵
          </Link>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800/60">코스</span>
        </div>
      </header>
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800/75">{eyebrow}</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-stone-900">{titleKo}</h1>
        <p className="mt-1 text-sm font-medium text-stone-500">{titleEn}</p>
        <div className="mt-8 rounded-2xl border border-stone-200/90 bg-white/80 p-5 shadow-md shadow-stone-200/60">
          {children}
        </div>
      </main>
    </div>
  );
}
