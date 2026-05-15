import Link from 'next/link';
import { Globe, BarChart2, Mic, BookOpen } from 'lucide-react';
import { AVATARS } from '@/data/avatars';

/* ─── Left: study supplies illustration ─── */
function StudyDecoration() {
  return (
    <svg viewBox="0 0 220 680" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cloud outlines */}
      <ellipse cx="60"  cy="80"  rx="48" ry="24" stroke="#312e81" strokeWidth="2" opacity="0.2"/>
      <ellipse cx="100" cy="160" rx="36" ry="18" stroke="#312e81" strokeWidth="2" opacity="0.15"/>

      {/* Pencil (rotated) */}
      <g transform="rotate(-25 80 240)">
        <rect x="62" y="160" width="22" height="110" rx="4" fill="#fbbf24" stroke="#312e81" strokeWidth="3"/>
        <polygon points="62,270 84,270 73,300" fill="#fde68a" stroke="#312e81" strokeWidth="2"/>
        <polygon points="66,298 80,298 73,312" fill="#fca5a5" stroke="#312e81" strokeWidth="2"/>
        <rect x="60" y="160" width="26" height="14" rx="2" fill="#d1d5db" stroke="#312e81" strokeWidth="2"/>
        <line x1="62" y1="168" x2="84" y2="168" stroke="#9ca3af" strokeWidth="1.5"/>
      </g>

      {/* Ruler */}
      <g transform="rotate(15 160 180)">
        <rect x="120" y="130" width="80" height="22" rx="3" fill="#a5b4fc" stroke="#312e81" strokeWidth="3"/>
        {[0,1,2,3,4,5,6,7].map(i => (
          <line key={i} x1={130 + i * 10} y1="130" x2={130 + i * 10} y2={i % 2 === 0 ? 140 : 136} stroke="#312e81" strokeWidth="1.5"/>
        ))}
      </g>

      {/* Open book */}
      <g transform="translate(10 360)">
        <rect x="0"  y="0" width="90" height="65" rx="4" fill="#e0e7ff" stroke="#312e81" strokeWidth="3"/>
        <rect x="90" y="0" width="90" height="65" rx="4" fill="#e0e7ff" stroke="#312e81" strokeWidth="3"/>
        <path d="M88 0 Q96 32 88 65" stroke="#312e81" strokeWidth="2" fill="none"/>
        {[12,24,36,48].map(y => <line key={y} x1="10"  y1={y} x2="80"  y2={y} stroke="#312e81" strokeWidth="1.5" opacity="0.4"/>)}
        {[12,24,36,48].map(y => <line key={y} x1="100" y1={y} x2="172" y2={y} stroke="#312e81" strokeWidth="1.5" opacity="0.4"/>)}
      </g>

      {/* Stack of books */}
      <rect x="5"  y="455" width="200" height="20" rx="4" fill="#f87171" stroke="#312e81" strokeWidth="3"/>
      <rect x="12" y="474" width="188" height="20" rx="4" fill="#60a5fa" stroke="#312e81" strokeWidth="3"/>
      <rect x="5"  y="493" width="200" height="20" rx="4" fill="#4ade80" stroke="#312e81" strokeWidth="3"/>
      <rect x="15" y="512" width="180" height="20" rx="4" fill="#fbbf24" stroke="#312e81" strokeWidth="3"/>

      {/* Apple */}
      <circle cx="165" cy="305" r="32" fill="#f87171" stroke="#312e81" strokeWidth="3"/>
      <path d="M165 273 Q172 258 182 263" stroke="#312e81" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <ellipse cx="179" cy="264" rx="6" ry="4" fill="#4ade80" stroke="#312e81" strokeWidth="2" transform="rotate(-30 179 264)"/>
      {/* Apple shine */}
      <ellipse cx="150" cy="295" rx="6" ry="10" fill="white" opacity="0.35" transform="rotate(-20 150 295)"/>

      {/* Stars */}
      <text x="170" y="55"  fontSize="28" fill="#fbbf24">★</text>
      <text x="20"  y="130" fontSize="18" fill="#a5b4fc">★</text>
      <text x="125" y="200" fontSize="14" fill="#6366f1" opacity="0.6">★</text>
      <text x="50"  y="320" fontSize="20" fill="#fbbf24" opacity="0.7">★</text>
    </svg>
  );
}

/* ─── Right: achievement & mascot illustration ─── */
function AchievementDecoration() {
  return (
    <svg viewBox="0 0 220 680" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cloud outlines */}
      <ellipse cx="160" cy="90"  rx="48" ry="24" stroke="#312e81" strokeWidth="2" opacity="0.2"/>
      <ellipse cx="80"  cy="170" rx="36" ry="18" stroke="#312e81" strokeWidth="2" opacity="0.15"/>

      {/* Globe */}
      <circle cx="120" cy="145" r="70"  fill="#dbeafe" stroke="#312e81" strokeWidth="3"/>
      <ellipse cx="120" cy="145" rx="32" ry="70"  stroke="#312e81" strokeWidth="2" fill="none"/>
      <ellipse cx="120" cy="145" rx="70" ry="28"  stroke="#312e81" strokeWidth="2" fill="none"/>
      <line x1="50"  y1="145" x2="190" y2="145" stroke="#312e81" strokeWidth="1.5"/>
      <line x1="120" y1="75"  x2="120" y2="215" stroke="#312e81" strokeWidth="1.5"/>
      {/* Globe stand */}
      <rect x="112" y="215" width="16" height="18" rx="2" fill="#312e81"/>
      <rect x="98"  y="230" width="44" height="10" rx="3" fill="#312e81"/>

      {/* Graduation cap */}
      <polygon points="30,320 110,290 190,320" fill="#312e81"/>
      <rect x="50" y="318" width="120" height="14" rx="2" fill="#312e81"/>
      <line x1="190" y1="320" x2="202" y2="362" stroke="#312e81" strokeWidth="3"/>
      <circle cx="202" cy="366" r="9" fill="#fbbf24" stroke="#312e81" strokeWidth="2"/>

      {/* Frog mascot on a book */}
      <rect x="55" y="430" width="120" height="25" rx="5" fill="#6366f1" stroke="#312e81" strokeWidth="3"/>
      <g transform="translate(85, 370)">
        {/* Body */}
        <ellipse cx="30" cy="50" rx="28" ry="24" fill="#4ade80" stroke="#312e81" strokeWidth="3"/>
        {/* Eyes */}
        <circle cx="18" cy="28" r="10" fill="#4ade80" stroke="#312e81" strokeWidth="3"/>
        <circle cx="42" cy="28" r="10" fill="#4ade80" stroke="#312e81" strokeWidth="3"/>
        <circle cx="18" cy="28" r="5"  fill="white"  stroke="#312e81" strokeWidth="1.5"/>
        <circle cx="42" cy="28" r="5"  fill="white"  stroke="#312e81" strokeWidth="1.5"/>
        <circle cx="18" cy="28" r="2.5" fill="#312e81"/>
        <circle cx="42" cy="28" r="2.5" fill="#312e81"/>
        {/* Smile */}
        <path d="M18 54 Q30 63 42 54" stroke="#312e81" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Graduation cap on frog */}
        <polygon points="5,22 30,12 55,22" fill="#312e81"/>
        <rect x="8" y="20" width="44" height="6" rx="1" fill="#312e81"/>
        <line x1="55" y1="22" x2="60" y2="38" stroke="#312e81" strokeWidth="2"/>
        <circle cx="60" cy="40" r="4" fill="#fbbf24"/>
      </g>

      {/* Certificate */}
      <rect x="100" y="500" width="110" height="75" rx="5" fill="#fef3c7" stroke="#312e81" strokeWidth="3"/>
      {[16,28,40].map(y => <line key={y} x1="115" y1={500+y} x2="198" y2={500+y} stroke="#312e81" strokeWidth="1.5" opacity="0.5"/>)}
      <text x="155" y="583" textAnchor="middle" fontSize="8" fill="#312e81" fontWeight="bold" fontFamily="sans-serif">CERTIFICATE</text>
      <polygon points="100,500 116,500 108,516" fill="#f87171" stroke="#312e81" strokeWidth="1.5"/>
      <polygon points="100,575 116,575 108,559" fill="#f87171" stroke="#312e81" strokeWidth="1.5"/>

      {/* Stars */}
      <text x="20"  y="55"  fontSize="26" fill="#fbbf24">★</text>
      <text x="185" y="200" fontSize="18" fill="#a5b4fc">★</text>
      <text x="30"  y="400" fontSize="20" fill="#fbbf24" opacity="0.7">★</text>
      <text x="170" y="460" fontSize="14" fill="#6366f1" opacity="0.6">★</text>
    </svg>
  );
}

const FEATURES = [
  { icon: <Globe size={24} />,     title: 'Real-world Practice', kr: '실생활 연습',    desc: 'Practice English in 5 authentic scenarios', bg: 'bg-blue-50'   },
  { icon: <BarChart2 size={24} />, title: 'Track Progress',      kr: '진행 상황 추적', desc: 'Earn badges and see your improvement',        bg: 'bg-pink-50'   },
  { icon: <Mic size={24} />,       title: 'AI Feedback',         kr: 'AI 피드백',      desc: 'Get instant pronunciation correction',        bg: 'bg-indigo-50' },
];

const STATS = [
  { value: '10+',  label: 'Learning Modules',  kr: '학습 모듈'    },
  { value: '5',    label: 'Practice Scenarios', kr: '실습 시나리오' },
  { value: '100%', label: 'Free to Start',      kr: '무료 시작'    },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFBEB] font-sans text-[#312e81] flex flex-col">

      {/* ── 3-column main area ── */}
      <div className="flex flex-1">

        {/* Left illustration */}
        <div className="hidden lg:flex w-56 xl:w-64 shrink-0 items-end pb-4 pl-2">
          <StudyDecoration />
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center px-6 pt-8 pb-6 min-w-0">

          {/* Logo */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-[#312e81] rounded-2xl border-4 border-[#312e81] shadow-[4px_4px_0px_0px_rgba(49,46,129,1)] flex items-center justify-center shrink-0">
              <img src={AVATARS[0].image} alt={AVATARS[0].name} className="w-12 h-12 object-contain" />
            </div>
            <div>
              <div className="font-black text-2xl uppercase italic tracking-tight leading-none">RIBBIT</div>
              <div className="text-[10px] font-bold opacity-50 tracking-widest">대학생을 위한 영어 학습 플랫폼</div>
            </div>
          </div>

          {/* Hero */}
          <div className="w-full max-w-2xl text-center mb-8">
            <h1 className="font-black text-6xl tracking-tighter leading-[1.02] mb-5">
              What if you could
              <br />
              <span className="bg-linear-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                master English fluency
              </span>
              <br />
              in one semester?
            </h1>
            <p className="font-black text-lg text-indigo-700 mb-2">
              만약 한 학기 안에 영어를 유창하게 할 수 있다면?
            </p>
            <p className="text-sm font-bold opacity-55 leading-relaxed mb-8 max-w-lg mx-auto">
              Interactive learning paths designed specifically for Korean university students.
              Practice real-world conversations, master academic English, and boost your confidence.
            </p>

            <Link
              href="/avatar"
              className="inline-flex items-center gap-3 px-12 py-5 bg-[#312e81] text-white font-black uppercase italic text-xl rounded-full border-4 border-[#312e81] shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 transition-all"
            >
              <BookOpen size={24} />
              Enter School
              <span className="font-bold not-italic text-base opacity-75">학교 입장하기</span>
            </Link>
            <p className="mt-3 text-xs font-bold opacity-35 tracking-wide">
              No credit card required • Free to start • Progress tracking included
            </p>
          </div>

          {/* Feature cards */}
          <div className="w-full max-w-2xl grid grid-cols-3 gap-5 mb-6">
            {FEATURES.map((f) => (
              <div key={f.title} className={`${f.bg} border-4 border-[#312e81] p-5 rounded-3xl shadow-[5px_5px_0px_0px_rgba(49,46,129,1)] text-center flex flex-col items-center gap-2`}>
                <div className="text-[#312e81] mb-1">{f.icon}</div>
                <div className="font-black text-xs uppercase leading-tight">{f.title}</div>
                <div className="text-[10px] font-bold text-purple-500">{f.kr}</div>
                <div className="text-[10px] font-bold opacity-50 leading-snug">{f.desc}</div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="w-full max-w-2xl flex gap-5">
            {STATS.map((s) => (
              <div key={s.value} className="flex-1 text-center bg-white/80 border-4 border-[#312e81] rounded-2xl shadow-[4px_4px_0px_0px_rgba(49,46,129,1)] py-5">
                <div className="font-black text-4xl tracking-tight">{s.value}</div>
                <div className="font-bold text-[10px] uppercase opacity-50 leading-tight mt-1">{s.label}</div>
                <div className="font-bold text-[9px] text-indigo-400">{s.kr}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right illustration */}
        <div className="hidden lg:flex w-56 xl:w-64 shrink-0 items-end pb-4 pr-2">
          <AchievementDecoration />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full h-10 bg-[#312e81] flex items-center justify-center gap-8 text-[9px] text-white font-bold uppercase opacity-90 shrink-0">
        <span>Mitwirkende</span><span>Impressum</span><span>Datenschutz</span><span>Teilen</span>
      </div>
    </div>
  );
}
