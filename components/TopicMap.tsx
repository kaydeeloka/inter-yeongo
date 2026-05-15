'use client';

import { ArrowLeft, Library, School, Users, Coffee, ShoppingBag } from 'lucide-react';
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

      {/* Fixed back button */}
      <button
        onClick={onBack}
        className="fixed left-4 top-4 z-50 bg-white p-2 border-4 border-[#312e81] rounded-xl shadow-[3px_3px_0px_0px_rgba(49,46,129,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Header title only */}
      <header className="w-full h-14 bg-[#312e81] flex items-center px-6">
        <div className="text-white font-black flex items-center gap-2 italic uppercase text-sm">
          <Library size={18} /> RIBBIT Knowledge Path
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center p-4 pt-6">
        <div className="relative w-full max-w-md aspect-4/5 bg-[#d1f582] border-4 border-[#312e81] rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(49,46,129,1)] overflow-hidden">

          {/* Title as SVG text path */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 125">
              <defs>
                <path id="titleArc"    d="M8 12 Q50 2 92 12" />
                <path id="subtitleArc" d="M14 18 Q50 10 86 18" />
              </defs>
              <text fill="#312e81" fontSize="6" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
                <textPath href="#titleArc" startOffset="50%">어디로 가볼까요?</textPath>
              </text>
              <text fill="#312e81" fontSize="3.2" fontWeight="700" fontFamily="sans-serif" textAnchor="middle" opacity="0.55" letterSpacing="0.8">
                <textPath href="#subtitleArc" startOffset="50%">CHOOSE YOUR DESTINATION</textPath>
              </text>

              {/* Dashed trail */}
              <path
                d="M25 28 Q50 38 75 43 T30 68 T70 86"
                fill="none"
                stroke="#312e81"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                opacity="0.2"
              />
            </svg>
          </div>

          {/* Frog inside the map */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
            <img src={avatar.image} alt={avatar.name} className="w-14 h-14 object-contain" />
          </div>

          <MapPoint
            x="25%" y="30%"
            title="Library & Academic" subtitle="학업/오피스"
            icon={<School size={20} />}
            onClick={() => onSelect('DAILY', '오피스/학업')}
          />
          <MapPoint
            x="75%" y="44%"
            title="Social Quad" subtitle="일상 대화"
            icon={<Users size={20} />}
            onClick={() => onSelect('DAILY', '일상 대화')}
          />
          <MapPoint
            x="30%" y="62%"
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
        </div>
      </div>
    </div>
  );
}
