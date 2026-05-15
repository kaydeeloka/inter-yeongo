'use client';

import { ArrowLeft, Library, School, Users, Coffee, ShoppingBag } from 'lucide-react';
import FrogMascot from '@/components/FrogMascot';
import MapPoint from '@/components/MapPoint';
import type { Avatar } from '@/types';

interface TopicMapProps {
  avatar: Avatar;
  onSelect: (track: string, cat: string) => void;
  onBack: () => void;
}

export default function TopicMap({ avatar, onSelect, onBack }: TopicMapProps) {
  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#312e81] flex flex-col font-sans">
      <header className="w-full h-14 bg-[#312e81] flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="text-white font-black flex items-center gap-2 italic uppercase text-sm">
          <Library size={18} /> RIBBIT Knowledge Path
        </div>
        <button
          onClick={onBack}
          className="bg-white p-1.5 border-2 border-[#312e81] rounded-lg shadow-[2px_2px_0px_0px_rgba(49,46,129,1)]"
        >
          <ArrowLeft size={18} />
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center p-4 pt-8">
        <div className="bg-white border-4 border-[#312e81] p-4 rounded-[2rem] shadow-[6px_6px_0px_0px_rgba(49,46,129,1)] relative mx-auto text-center mb-10 w-full max-w-[280px]">
          <p className="font-black text-base leading-tight">
            어디로 가볼까요?<br />
            <span className="text-indigo-400 text-[10px] italic uppercase tracking-tighter">
              Choose your destination
            </span>
          </p>
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <FrogMascot className="w-16 h-16" color={avatar.color} accessory={avatar.accessory} />
          </div>
        </div>

        <div className="relative w-full max-w-md aspect-[4/5] mt-6 bg-[#d1f582] border-4 border-[#312e81] rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(49,46,129,1)] overflow-hidden">
          <MapPoint
            x="25%" y="18%"
            title="Library & Academic" subtitle="학업/오피스"
            icon={<School size={20} />}
            onClick={() => onSelect('DAILY', '오피스/학업')}
          />
          <MapPoint
            x="75%" y="35%"
            title="Social Quad" subtitle="일상 대화"
            icon={<Users size={20} />}
            onClick={() => onSelect('DAILY', '일상 대화')}
          />
          <MapPoint
            x="30%" y="60%"
            title="Donut Cafe" subtitle="식당/카페"
            icon={<Coffee size={20} />}
            onClick={() => onSelect('TRAVEL', '식당/카페')}
          />
          <MapPoint
            x="70%" y="78%"
            title="Campus Store" subtitle="쇼핑/세금"
            icon={<ShoppingBag size={20} />}
            onClick={() => onSelect('TRAVEL', '쇼핑/세금')}
          />

          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full opacity-20" viewBox="0 0 100 100">
              <path
                d="M25 18 Q50 30 75 35 T30 60 T70 78"
                fill="none"
                stroke="#312e81"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
