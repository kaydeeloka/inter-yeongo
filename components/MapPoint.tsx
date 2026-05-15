'use client';

import { ReactNode } from 'react';

interface MapPointProps {
  x: string;
  y: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  onClick: () => void;
}

export default function MapPoint({ x, y, title, subtitle, icon, onClick }: MapPointProps) {
  return (
    <div
      onClick={onClick}
      style={{ left: x, top: y }}
      className="absolute group cursor-pointer -translate-x-1/2 -translate-y-1/2 z-10"
    >
      <div className="bg-white border-2 border-[#312e81] p-2 rounded-xl shadow-[3px_3px_0px_0px_rgba(49,46,129,1)] group-hover:-translate-y-1 group-hover:bg-yellow-100 transition-all flex flex-col items-center gap-1 min-w-[90px]">
        {icon}
        <span className="font-black text-[8px] uppercase tracking-tighter whitespace-nowrap">{title}</span>
        <span className="text-[7px] font-bold text-indigo-400">{subtitle}</span>
      </div>
    </div>
  );
}
