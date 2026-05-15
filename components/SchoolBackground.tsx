'use client';

import SchoolBuilding from '@/components/SchoolBuilding';
import { AVATARS } from '@/data/avatars';

/* Darker greens so leaves contrast against the green ground strip */
const Tree = ({ scale = 1 }: { scale?: number }) => (
  <svg width={60 * scale} height={90 * scale} viewBox="0 0 60 90">
    <rect x="26" y="52" width="8" height="38" fill="#92400e" />
    <circle cx="30" cy="32" r="28" fill="#15803d" />
    <circle cx="16" cy="20" r="18" fill="#16a34a" />
    <circle cx="44" cy="24" r="14" fill="#166534" />
    <circle cx="30" cy="14" r="12" fill="#22c55e" />
  </svg>
);

const Cloud = () => (
  <svg width="130" height="65" viewBox="0 0 120 60" fill="white">
    <circle cx="30" cy="35" r="20" />
    <circle cx="60" cy="25" r="25" />
    <circle cx="90" cy="35" r="20" />
    <rect x="30" y="35" width="60" height="20" />
  </svg>
);

const SchoolBus = ({ color, label }: { color: string; label: string }) => (
  <svg width="160" height="60" viewBox="0 0 160 60">
    <path d="M10 10 H130 L150 30 V50 H10 Z" fill={color} stroke="#000" strokeWidth="3" />
    <rect x="20" y="15" width="25" height="15" fill="#bae6fd" stroke="#000" strokeWidth="2" />
    <rect x="55" y="15" width="25" height="15" fill="#bae6fd" stroke="#000" strokeWidth="2" />
    <rect x="90" y="15" width="25" height="15" fill="#bae6fd" stroke="#000" strokeWidth="2" />
    <rect x="125" y="20" width="15" height="10" fill="#bae6fd" stroke="#000" strokeWidth="2" />
    <circle cx="40" cy="50" r="10" fill="#333" />
    <circle cx="120" cy="50" r="10" fill="#333" />
    <circle cx="40" cy="50" r="4" fill="#999" />
    <circle cx="120" cy="50" r="4" fill="#999" />
    <text x="75" y="42" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
      {label}
    </text>
  </svg>
);

const TREES = [
  { left: '1%',  scale: 0.80 },
  { left: '6%',  scale: 1.10 },
  { left: '13%', scale: 0.65 },
  { left: '19%', scale: 1.20 },
  { left: '26%', scale: 0.90 },
  { left: '32%', scale: 1.05 },
];

/* Frogs look like students approaching the entrance — spread diagonally */
const FROGS = [
  { size: 68, bottom: 84,  left: '53%', avatar: AVATARS[2] }, // front/closest
  { size: 52, bottom: 112, left: '59%', avatar: AVATARS[1] }, // mid
  { size: 38, bottom: 138, left: '64%', avatar: AVATARS[0] }, // near door/smallest
];

const ROAD_H = 80;
const GRASS_H = 110;

export default function SchoolBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes ribbitDrift {
          from { transform: translateX(-160px); }
          to   { transform: translateX(110vw);  }
        }
        @keyframes ribbitDrive {
          from { transform: translateX(-200px); }
          to   { transform: translateX(calc(100vw + 200px)); }
        }
        @keyframes ribbitFloat {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-12px); }
        }
      `}</style>

      {/* Sky */}
      <div className="absolute inset-0 bg-linear-to-b from-sky-300 to-blue-50" />

      {/* Sun */}
      <div className="absolute top-6 right-16 w-28 h-28"
           style={{ animation: 'ribbitFloat 8s ease-in-out infinite' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="30" fill="#fbbf24" />
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1="50" y1="8" x2="50" y2="22"
              stroke="#fbbf24" strokeWidth="5" strokeLinecap="round"
              transform={`rotate(${i * 45} 50 50)`} />
          ))}
        </svg>
      </div>

      {/* Clouds */}
      <div className="absolute top-[10%] opacity-80"
           style={{ left: '-160px', animation: 'ribbitDrift 38s linear infinite' }}>
        <Cloud />
      </div>
      <div className="absolute top-[24%] opacity-50"
           style={{ left: '-160px', animation: 'ribbitDrift 55s linear 10s infinite' }}>
        <Cloud />
      </div>
      <div className="absolute top-[5%] opacity-55"
           style={{ left: '-160px', animation: 'ribbitDrift 48s linear 22s infinite' }}>
        <Cloud />
      </div>

      {/* Green grass strip above road */}
      <div className="absolute left-0 right-0 bg-green-500 border-t-2 border-green-700"
           style={{ bottom: ROAD_H, height: GRASS_H }} />

      {/* School building — 54% wide, sits on grass */}
      <div className="absolute right-0" style={{ bottom: ROAD_H, width: '54%' }}>
        <SchoolBuilding buildingOnly className="w-full" />
      </div>

      {/* Trees sitting on grass */}
      {TREES.map(({ left, scale }, i) => (
        <div key={i} className="absolute" style={{ bottom: ROAD_H, left }}>
          <Tree scale={scale} />
        </div>
      ))}

      {/* Frog students walking toward entrance */}
      {FROGS.map(({ size, bottom, left, avatar }) => (
        <div
          key={avatar.id}
          className="absolute rounded-full border-4 border-[#312e81] bg-white overflow-hidden shadow-[3px_3px_0px_0px_rgba(49,46,129,0.35)]"
          style={{ width: size, height: size, bottom, left }}
        >
          <img src={avatar.image} alt={avatar.name} className="w-full h-full object-contain" />
        </div>
      ))}

      {/* Road */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-slate-500 border-t-4 border-slate-600 flex items-center gap-3 px-4 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="shrink-0 w-10 h-1.5 bg-white/50 rounded-full" />
        ))}
      </div>

      {/* School Bus */}
      <div className="absolute" style={{ bottom: '18px', left: '-170px', animation: 'ribbitDrive 14s linear infinite' }}>
        <SchoolBus color="#fbbf24" label="SCHOOL BUS" />
      </div>
    </div>
  );
}
