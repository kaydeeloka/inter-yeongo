'use client';

import SchoolBuilding from '@/components/SchoolBuilding';

const Cloud = () => (
  <svg width="130" height="65" viewBox="0 0 120 60" fill="white">
    <circle cx="30" cy="35" r="20" />
    <circle cx="60" cy="25" r="25" />
    <circle cx="90" cy="35" r="20" />
    <rect x="30" y="35" width="60" height="20" />
  </svg>
);

const Tree = ({ scale = 1 }: { scale?: number }) => (
  <svg width={60 * scale} height={100 * scale} viewBox="0 0 60 100">
    <rect x="25" y="60" width="10" height="40" fill="#78350f" />
    <circle cx="30" cy="40" r="30" fill="#22c55e" />
    <circle cx="20" cy="25" r="20" fill="#4ade80" />
    <circle cx="45" cy="35" r="15" fill="#16a34a" />
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
      <div className="absolute top-8 right-20 w-16 h-16"
           style={{ animation: 'ribbitFloat 8s ease-in-out infinite' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="30" fill="#fbbf24" />
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1="50" y1="10" x2="50" y2="22"
              stroke="#fbbf24" strokeWidth="4" strokeLinecap="round"
              transform={`rotate(${i * 45} 50 50)`} />
          ))}
        </svg>
      </div>

      {/* Clouds */}
      <div className="absolute top-[10%] opacity-70"
           style={{ left: '-160px', animation: 'ribbitDrift 38s linear infinite' }}>
        <Cloud />
      </div>
      <div className="absolute top-[22%] opacity-45"
           style={{ left: '-160px', animation: 'ribbitDrift 55s linear 10s infinite' }}>
        <Cloud />
      </div>
      <div className="absolute top-[6%] opacity-50"
           style={{ left: '-160px', animation: 'ribbitDrift 48s linear 22s infinite' }}>
        <Cloud />
      </div>

      {/* Distant hills */}
      <div className="absolute w-full opacity-20" style={{ bottom: '80px', height: '180px' }}>
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0 100 C 200 0, 400 80, 600 20 C 800 80, 1000 40, 1000 100 Z" fill="#86efac" />
        </svg>
      </div>

      {/* School Building — fills right portion */}
      <div className="absolute right-0 top-0 w-[58%] h-full">
        <SchoolBuilding asBackground={true} />
      </div>

      {/* Road */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-slate-400 border-t-4 border-slate-500 flex items-center gap-3 px-4 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="shrink-0 w-10 h-1.5 bg-white/50 rounded-full" />
        ))}
      </div>

      {/* School Bus 1 */}
      <div className="absolute" style={{ bottom: '20px', left: '-170px', animation: 'ribbitDrive 14s linear infinite' }}>
        <SchoolBus color="#fbbf24" label="SCHOOL BUS" />
      </div>

      {/* Foreground trees */}
      <div className="absolute bottom-16 left-[1%]">  <Tree scale={0.9} /></div>
      <div className="absolute bottom-14 left-[19%]"> <Tree scale={1.3} /></div>
    </div>
  );
}
