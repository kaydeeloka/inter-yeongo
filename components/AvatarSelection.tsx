'use client';

import { ArrowLeft } from 'lucide-react';
import { AVATARS } from '@/data/avatars';
import type { Avatar } from '@/types';

interface AvatarSelectionProps {
  onSelect: (avatar: Avatar) => void;
  onBack: () => void;
}

export default function AvatarSelection({ onSelect, onBack }: AvatarSelectionProps) {
  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#312e81] flex flex-col p-4 font-sans">
      <header className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="p-2 border-2 border-[#312e81] rounded-xl bg-white shadow-[2px_2px_0px_0px_rgba(49,46,129,1)]"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-black text-xl uppercase italic">Pick Your Persona</h2>
        <div className="w-10" />
      </header>

      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto overflow-y-auto pb-4">
        {AVATARS.map((a) => (
          <button
            key={a.id}
            onClick={() => onSelect(a)}
            className="bg-white border-4 border-[#312e81] p-4 rounded-4xl shadow-[4px_4px_0px_0px_rgba(49,46,129,1)] hover:bg-indigo-50 hover:-translate-y-1 transition-all flex flex-col items-center gap-2 group"
          >
            <img src={a.image} alt={a.name} className="w-20 h-20 object-contain group-hover:scale-105 transition-transform" />
            <div className="text-center">
              <div className="font-black text-[10px] uppercase leading-tight">{a.name}</div>
              <div className="text-[8px] font-bold text-indigo-400 mt-0.5">{a.desc}</div>
            </div>
          </button>
        ))}
      </div>

      <p className="text-center mt-auto py-4 font-black text-[8px] uppercase tracking-widest opacity-40 italic">
        Select the character that represents your campus style!
      </p>
    </div>
  );
}
