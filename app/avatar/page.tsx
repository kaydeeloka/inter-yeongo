'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { AVATARS } from '@/data/avatars';
import { saveUser } from '@/lib/userStore';

export default function AvatarPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(AVATARS[0].id);
  const [name, setName] = useState('');

  const selectedAvatar = AVATARS.find((a) => a.id === selectedId)!;

  const handleContinue = () => {
    saveUser(selectedId, name.trim() || 'Student');
    router.push('/explore');
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#312e81] flex flex-col font-sans">

      {/* Header with back button + title */}
      <header className="w-full bg-white border-b-4 border-[#312e81] px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => router.push('/')}
          className="bg-[#FFFBEB] p-2 border-4 border-[#312e81] rounded-xl shadow-[3px_3px_0px_0px_rgba(49,46,129,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all shrink-0"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-black italic uppercase tracking-widest text-base">Pick Your Persona</h1>
      </header>

      <div className="flex-1 flex items-start justify-center px-8 pt-10 pb-10 gap-6 w-full">

        {/* Avatar grid */}
        <div className="grid grid-cols-3 gap-3 w-fit">
          {AVATARS.map((a) => {
            const isSelected = a.id === selectedId;
            return (
              <button
                key={a.id}
                onClick={() => setSelectedId(a.id)}
                className={`w-44 flex flex-col items-center gap-1.5 p-4 rounded-3xl border-4 transition-all
                  ${isSelected
                    ? 'border-[#312e81] bg-yellow-200 shadow-[4px_4px_0px_0px_rgba(49,46,129,1)] scale-105'
                    : 'border-[#312e81] bg-white shadow-[2px_2px_0px_0px_rgba(49,46,129,1)] hover:bg-indigo-50'
                  }`}
              >
                <img src={a.image} alt={a.name} className="w-24 h-24 object-contain" />
                <span className="font-black text-[9px] uppercase leading-tight text-center">{a.name}</span>
                <span className="text-[8px] font-bold text-indigo-400">{a.desc}</span>
              </button>
            );
          })}
        </div>

        {/* Selected avatar + name input */}
        <div className="w-120 shrink-0 bg-white border-4 border-[#312e81] rounded-4xl shadow-[6px_6px_0px_0px_rgba(49,46,129,1)] p-10 flex flex-col items-center gap-5 sticky top-4">
          <img src={selectedAvatar.image} alt={selectedAvatar.name} className="w-44 h-44 object-contain" />
          <div className="text-center">
            <div className="font-black text-xl uppercase">{selectedAvatar.name}</div>
            <div className="text-[10px] font-bold text-indigo-400">{selectedAvatar.desc}</div>
          </div>

          <div className="w-full">
            <label className="font-black text-[10px] uppercase tracking-widest opacity-60 mb-1.5 block">
              Nickname
            </label>
            <input
              type="text"
              placeholder="이름을 입력하세요..."
              maxLength={20}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border-4 border-[#312e81] font-black text-sm focus:outline-none bg-[#FFFBEB] placeholder:opacity-30 placeholder:font-bold rounded-lg"
            />
          </div>

          <button
            onClick={handleContinue}
            className="w-full py-3 bg-[#312e81] text-white font-black uppercase italic text-sm flex items-center justify-center gap-1 border-4 border-[#312e81] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 transition-all rounded-2xl"
          >
            Let&apos;s Go! <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
