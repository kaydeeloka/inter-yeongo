'use client';

import type { Avatar } from '@/types';

interface IntroPreviewProps {
  text: string;
  showPlaceholder: boolean;
  avatar?: Avatar;
}

export default function IntroPreview({ text, showPlaceholder, avatar }: IntroPreviewProps) {
  return (
    <section
      className="relative rounded-3xl border-4 border-[#312e81] bg-white p-6 shadow-[6px_6px_0px_0px_rgba(49,46,129,1)] pt-16"
      aria-labelledby="intro-preview-heading"
    >
      {avatar && (
        <div className="absolute -top-12 right-6 pointer-events-none">
          <img src={avatar.image} alt={avatar.name} className="w-24 h-24 object-contain drop-shadow-lg" />
        </div>
      )}
      <h2 id="intro-preview-heading" className="text-lg font-black uppercase italic text-[#312e81]">
        자기소개
      </h2>
      <div className="mt-3 min-h-20 rounded-2xl border-4 border-[#312e81]/20 bg-[#FFFBEB] px-4 py-4 text-sm font-bold leading-relaxed text-[#312e81]">
        {showPlaceholder ? (
          <p className="text-[#312e81]/40">
            위 칸을 채우면 여기에 짧은 영어 자기소개가 나타나요. 비워도 기본 예시 문장이 표시됩니다.
          </p>
        ) : (
          <p className="whitespace-pre-wrap">{text}</p>
        )}
      </div>
    </section>
  );
}
