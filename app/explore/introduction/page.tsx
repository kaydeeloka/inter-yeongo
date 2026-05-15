'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Map as MapIcon, User } from 'lucide-react';
import { getSavedAvatar, getSavedName } from '@/lib/userStore';
import { AVATARS } from '@/data/avatars';
import type { Avatar } from '@/types';
import IntroductionPageClient from '@/components/introduction/IntroductionPageClient';

export default function ExploreIntroductionPage() {
  const router = useRouter();
  const [avatar, setAvatar] = useState<Avatar>(AVATARS[0]);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    setAvatar(getSavedAvatar());
    setNickname(getSavedName());
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#312e81] font-sans pb-20">
      <header className="w-full bg-white border-b-4 border-[#312e81] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#312e81] shadow-[2px_2px_0px_0px_rgba(49,46,129,1)] rounded-full flex items-center justify-center bg-white shrink-0">
            <img src={avatar.image} alt={avatar.name} className="w-9 h-9 object-contain" />
          </div>
          <span className="font-black text-sm uppercase italic leading-none">{nickname}</span>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          <User className="w-4 h-4" />
          <span className="font-black text-sm uppercase italic tracking-wide">자기소개</span>
        </div>
        <button
          onClick={() => router.push('/explore')}
          className="p-2 border-2 border-[#312e81] rounded-lg shadow-[3px_3px_0px_0px_rgba(49,46,129,1)] bg-white active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
        >
          <MapIcon size={24} />
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8 mt-6">
        <IntroductionPageClient avatar={avatar} />
      </main>
    </div>
  );
}
