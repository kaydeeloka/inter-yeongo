'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, School, Users, Coffee, ShoppingBag } from 'lucide-react';
import MapPoint from '@/components/MapPoint';
import { getSavedName } from '@/lib/userStore';
import type { Avatar } from '@/types';

interface TopicMapProps {
  avatar: Avatar;
  onSelect: (track: string, cat: string) => void;
  onBack: () => void;
}

export default function TopicMap({ avatar, onSelect, onBack }: TopicMapProps) {
  const [nickname, setNickname] = useState('');
  useEffect(() => { setNickname(getSavedName()); }, []);

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#312e81] flex flex-col font-sans">

      {/* Header: avatar + title on left, back button on right */}
      <header className="w-full bg-white border-b-4 border-[#312e81] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#312e81] shadow-[2px_2px_0px_0px_rgba(49,46,129,1)] rounded-full flex items-center justify-center bg-white shrink-0">
            <img src={avatar.image} alt={avatar.name} className="w-9 h-9 object-contain" />
          </div>
          <h1 className="font-black text-base tracking-tighter uppercase italic leading-none text-[#312e81]">{nickname}</h1>
        </div>
        <button
          onClick={onBack}
          className="bg-white p-1.5 border-2 border-[#312e81] rounded-lg shadow-[2px_2px_0px_0px_rgba(49,46,129,1)]"
        >
          <ArrowLeft size={18} />
        </button>
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

          {/* ribbit inside the map */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
            <img src={avatar.image} alt={avatar.name} className="w-14 h-14 object-contain" />
          </div>

          <MapPoint
            x="25%" y="30%"
            title="Introduction" subtitle="자기소개"
            icon={<School size={20} />}
            onClick={() => onSelect('/explore/introduction', '자기소개')}
          />
          <MapPoint
            x="75%" y="44%"
            title="Speaking" subtitle="일상 회화"
            icon={<Users size={20} />}
            onClick={() => onSelect('/explore/speaking', '일상 회화')}
          />
          <MapPoint
            x="30%" y="62%"
            title="Classroom" subtitle="강의실"
            icon={<Coffee size={20} />}
            onClick={() => onSelect('/explore/classroom', '강의실')}
          />
          <MapPoint
            x="70%" y="78%"
            title="Academic" subtitle="과목"
            icon={<ShoppingBag size={20} />}
            onClick={() => onSelect('/explore/subject', '과목/세금')}
          />
        </div>
      </div>
    </div>
  );
}
