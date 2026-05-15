import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AVATARS } from '@/data/avatars';

function PathIllustration() {
  const stops = [
    { x: 185, y: 90,  avatar: AVATARS[0] },
    { x: 115, y: 280, avatar: AVATARS[1] },
    { x: 180, y: 465, avatar: AVATARS[2] },
  ];

  return (
    <svg viewBox="0 0 300 680" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shadow ribbon */}
      <path
        d="M185 40 C250 140 90 230 140 360 C190 490 80 570 140 670"
        stroke="#0f766e" strokeWidth="76" strokeLinecap="round"
      />
      {/* Main ribbon */}
      <path
        d="M185 40 C250 140 90 230 140 360 C190 490 80 570 140 670"
        stroke="#14b8a6" strokeWidth="68" strokeLinecap="round"
      />
      {/* Inner highlight */}
      <path
        d="M185 40 C250 140 90 230 140 360 C190 490 80 570 140 670"
        stroke="#5eead4" strokeWidth="30" strokeLinecap="round" opacity="0.5"
      />

      {/* Dashed centre line */}
      <path
        d="M185 40 C250 140 90 230 140 360 C190 490 80 570 140 670"
        stroke="white" strokeWidth="3" strokeLinecap="round"
        strokeDasharray="12 14" opacity="0.4"
      />

      {/* Frog avatar circles */}
      {stops.map(({ x, y, avatar }) => (
        <g key={avatar.id}>
          <circle cx={x} cy={y} r={46} fill="white" stroke="#312e81" strokeWidth="4" />
          <image href={avatar.image} x={x - 40} y={y - 46} width="80" height="92" />
        </g>
      ))}

      {/* Trophy circle at bottom */}
      <circle cx="140" cy="645" r="44" fill="#fbbf24" stroke="#312e81" strokeWidth="4" />
      <text x="140" y="660" textAnchor="middle" fontSize="36" dominantBaseline="middle">🏆</text>
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#edfdf8] font-sans text-[#1e293b] flex overflow-hidden">

      {/* ── Left content ── */}
      <div className="flex-1 flex flex-col justify-center px-14 py-12">

        {/* Logo chip — matches second image */}
        <div className="flex items-center gap-3 mb-10 w-fit bg-[#312e81] border-4 border-[#312e81] rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.25)] px-3 py-2">
          <div className="bg-white rounded-xl p-1 shrink-0">
            <img src={AVATARS[0].image} alt="RIBBIT" className="w-9 h-9 object-contain" />
          </div>
          <div>
            <div className="font-black text-xl uppercase italic text-white leading-none tracking-tight">RIBBIT</div>
            <div className="text-[9px] font-bold text-white/60 tracking-wider">대학생을 위한 영어 학습 플랫폼</div>
          </div>
        </div>

        {/* Greeting */}
        <p className="font-black text-xl text-teal-500 mb-3">Hello! 안녕하세요 👋</p>

        {/* Main heading */}
        <h1 className="font-black text-6xl leading-[1.05] tracking-tight mb-5">
          Welcome to<br />
          <span className="text-teal-500">RIBBIT</span>
        </h1>

        {/* Taglines */}
        <p className="font-bold text-base text-slate-600 mb-2">
          Your journey to English fluency starts here! 🎯
        </p>
        <p className="font-bold text-base text-slate-600 mb-6">
          대학생을 위한 재미있고 효과적인 영어 학습 플랫폼! 🚀
        </p>

        {/* Description */}
        <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-md mb-10">
          Practice real-world conversations, master pronunciation with AI feedback, and build
          confidence through interactive challenges. Learn English the fun way!
        </p>

        {/* START button */}
        <div className="mb-4">
          <Link
            href="/avatar"
            className="inline-flex items-center gap-3 px-10 py-5 bg-orange-400 text-white font-black uppercase text-xl rounded-full border-4 border-orange-600 shadow-[4px_4px_0px_0px_rgba(194,65,12,0.35)] hover:scale-105 active:scale-95 transition-all"
          >
            START <ArrowRight size={24} />
          </Link>
        </div>
      </div>

      {/* ── Right: path illustration ── */}
      <div className="hidden lg:flex w-80 xl:w-96 shrink-0 items-center justify-center bg-linear-to-b from-teal-100 to-teal-200 border-l-4 border-[#312e81]">
        <PathIllustration />
      </div>
    </div>
  );
}
