'use client';

import { useMemo } from 'react';
import { Search, Volume2, RefreshCcw } from 'lucide-react';
import { CATEGORIES, EXPRESSIONS } from '@/data/expressions';
import { useAudio } from '@/hooks/useAudio';

interface ExpressionsListProps {
  activeTrack: string;
  setActiveTrack: (track: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  bookmarks: number[];
}

export default function ExpressionsList({
  activeTrack,
  setActiveTrack,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  bookmarks,
}: ExpressionsListProps) {
  const { loadingAudio, playAudio } = useAudio();

  const filteredExpressions = useMemo(() => {
    return EXPRESSIONS.filter((ex) => {
      const matchesSearch =
        ex.en.toLowerCase().includes(searchQuery.toLowerCase()) || ex.kr.includes(searchQuery);
      const matchesTrack = ex.track === activeTrack;
      const matchesCategory =
        activeCategory === '전체'
          ? true
          : activeCategory === '즐겨찾기'
          ? bookmarks.includes(ex.id)
          : ex.cat === activeCategory;
      return matchesSearch && matchesTrack && matchesCategory;
    });
  }, [searchQuery, activeTrack, activeCategory, bookmarks]);

  return (
    <div className="space-y-6">
      <div className="flex border-4 border-[#312e81] bg-white shadow-[6px_6px_0px_0px_rgba(49,46,129,1)] rounded-2xl overflow-hidden">
        <button
          onClick={() => { setActiveTrack('DAILY'); setActiveCategory('전체'); }}
          className={`flex-1 py-4 font-black text-xs uppercase tracking-widest transition-colors ${
            activeTrack === 'DAILY' ? 'bg-yellow-200' : 'hover:bg-gray-100'
          }`}
        >
          Campus Life (일상)
        </button>
        <button
          onClick={() => { setActiveTrack('TRAVEL'); setActiveCategory('전체'); }}
          className={`flex-1 py-4 font-black text-xs uppercase tracking-widest border-l-4 border-[#312e81] transition-colors ${
            activeTrack === 'TRAVEL' ? 'bg-yellow-200' : 'hover:bg-gray-100'
          }`}
        >
          Global Travel (교외)
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="상황이나 단어를 검색하세요..."
          className="w-full p-5 border-4 border-[#312e81] bg-white shadow-[6px_6px_0px_0px_rgba(49,46,129,1)] font-bold focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute right-5 top-1/2 -translate-y-1/2 opacity-30" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {['전체', '즐겨찾기', ...CATEGORIES[activeTrack]].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 border-2 border-[#312e81] font-black text-xs whitespace-nowrap shadow-[3px_3px_0px_0px_rgba(49,46,129,1)] transition-all ${
              activeCategory === cat ? 'bg-[#312e81] text-white' : 'bg-white hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {filteredExpressions.map((ex) => (
          <div
            key={ex.id}
            className="bg-white border-4 border-[#312e81] p-6 shadow-[8px_8px_0px_0px_rgba(49,46,129,1)] rounded-3xl"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-3xl font-black mb-1 tracking-tighter text-indigo-900">{ex.en}</h3>
                <p className="font-bold text-lg text-gray-600 mt-2">{ex.kr}</p>
              </div>
              <div className="flex flex-col gap-3 ml-4">
                <button
                  onClick={() => playAudio(ex.en, ex.id)}
                  className="w-14 h-14 bg-[#4ade80] border-2 border-[#312e81] shadow-[4px_4px_0px_0px_rgba(49,46,129,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] flex items-center justify-center transition-all"
                >
                  {loadingAudio === ex.id ? (
                    <RefreshCcw className="animate-spin" size={24} />
                  ) : (
                    <Volume2 size={24} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
