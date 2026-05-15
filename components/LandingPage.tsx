'use client';

import { School, Library } from 'lucide-react';
import FrogMascot from '@/components/FrogMascot';
import type { Avatar } from '@/types';

interface LandingPageProps {
  onStart: () => void;
  avatar: Avatar;
}

export default function LandingPage({ onStart, avatar }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#312e81] flex flex-col relative overflow-hidden font-sans">
      <div className="w-full h-14 bg-[#312e81] flex items-center justify-between px-6 z-20 shrink-0">
        <div className="text-white font-black text-xl flex items-center gap-2 italic uppercase">
          <School size={24} /> RIBBIT CAMPUS
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
        <div className="absolute top-10 left-4 opacity-10 pointer-events-none transform -rotate-6">
          <School size={80} strokeWidth={1} />
        </div>
        <div className="absolute bottom-20 right-4 opacity-10 pointer-events-none transform rotate-12">
          <Library size={70} strokeWidth={1} />
        </div>

        <div className="relative z-10 text-center max-w-lg w-full flex flex-col items-center">
          <div className="relative w-full">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90 hidden md:block">
              <span className="bg-[#312e81] text-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] rounded-sm">
                Campus
              </span>
            </div>
            <div className="absolute -right-8 top-1/4 rotate-12 hidden md:block">
              <div className="border-2 border-[#312e81] p-1 bg-white rounded-full">
                <div className="border border-dashed border-[#312e81] px-2 py-1 rounded-full text-[8px] font-black uppercase">
                  RIBBIT Graduate
                </div>
              </div>
            </div>

            <div className="mb-6 inline-block relative w-full px-6 py-8 bg-white border-4 border-[#312e81] rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(49,46,129,1)]">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <FrogMascot className="w-20 h-20" color={avatar.color} accessory={avatar.accessory} />
              </div>

              <h2 className="text-4xl font-black uppercase tracking-tight mb-2 leading-[0.9]">
                What if...<br />
                <span className="text-2xl">만약에...?</span>
              </h2>
              <div className="w-16 h-1 bg-[#312e81] mx-auto mb-4" />

              <p className="font-black text-sm mb-4">대학생을 위한 영어 학습 플랫폼</p>
              <p className="text-[11px] font-bold opacity-70 uppercase tracking-tight leading-snug">
                Master English through interactive learning paths. Practice real conversations, improve
                pronunciation, and track your progress along the way.
              </p>

              <button
                onClick={onStart}
                className="mt-8 px-10 py-4 bg-[#312e81] text-white font-black uppercase italic text-lg rounded-full shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] border-2 border-white hover:scale-105 active:scale-95 transition-all"
              >
                Let&apos;s Go! (시작하기)
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-8 bg-[#312e81] flex items-center justify-center gap-4 text-[8px] text-white font-bold uppercase opacity-80 mt-auto">
        <span>Mitwirkende</span>
        <span>Impressum</span>
        <span>Datenschutz</span>
        <span>Teilen</span>
      </div>
    </div>
  );
}
