'use client';

import { ReactNode } from 'react';

interface NavBtnProps {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
  color: string;
}

export default function NavBtn({ active, onClick, icon, label, color }: NavBtnProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-3 rounded-2xl transition-all ${
        active
          ? `${color} border-2 border-[#312e81] scale-105 shadow-[2px_2px_0px_0px_rgba(49,46,129,1)]`
          : 'text-gray-400'
      }`}
    >
      {icon}
      <span className="text-[10px] font-black mt-1 uppercase">{label}</span>
    </button>
  );
}
