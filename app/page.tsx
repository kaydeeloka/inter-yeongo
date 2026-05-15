import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AVATARS } from '@/data/avatars';
import type { Avatar } from '@/types';

type FrogStop = { x: number; y: number; r: number; avatar: Avatar };

function SchoolScene({ frogs }: { frogs: FrogStop[] }) {
  return (
    <svg
      viewBox="0 0 800 520"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        {frogs.map(({ avatar, x, y, r }) => (
          <clipPath key={avatar.id} id={`fc-${avatar.id}`}>
            <circle cx={x} cy={y} r={r} />
          </clipPath>
        ))}
      </defs>

      {/* Sky */}
      <rect width="800" height="520" fill="#B3E5EE" />

      {/* Clouds */}
      <g>
        <ellipse cx="140" cy="75" rx="55" ry="22" fill="white" />
        <ellipse cx="185" cy="65" rx="42" ry="18" fill="white" />
        <ellipse cx="110" cy="82" rx="34" ry="15" fill="white" />
      </g>
      <g>
        <ellipse cx="600" cy="85" rx="50" ry="20" fill="white" />
        <ellipse cx="645" cy="74" rx="38" ry="16" fill="white" />
        <ellipse cx="570" cy="90" rx="30" ry="13" fill="white" />
      </g>

      {/* Ground */}
      <rect x="0" y="360" width="800" height="160" fill="#7CB342" />
      <rect x="0" y="360" width="800" height="10"  fill="#8BC34A" />

      {/* Pathway */}
      <polygon points="358,360 442,360 520,520 280,520" fill="#D4B896" />
      <polygon points="358,360 370,360 450,520 280,520" fill="#C8A87A" opacity="0.25" />

      {/* Trees — left */}
      <rect   x="90"  y="300" width="20" height="65" fill="#795548" />
      <circle cx="100" cy="250" r="70" fill="#4CAF50" />
      <circle cx="68"  cy="285" r="48" fill="#388E3C" />
      <rect   x="178" y="318" width="16" height="48" fill="#6D4C41" />
      <circle cx="186" cy="278" r="56" fill="#43A047" />
      <circle cx="160" cy="308" r="36" fill="#388E3C" />

      {/* Trees — right */}
      <rect   x="690" y="300" width="20" height="65" fill="#795548" />
      <circle cx="700" cy="250" r="70" fill="#4CAF50" />
      <circle cx="732" cy="285" r="48" fill="#388E3C" />
      <rect   x="606" y="318" width="16" height="48" fill="#6D4C41" />
      <circle cx="614" cy="278" r="56" fill="#43A047" />
      <circle cx="640" cy="308" r="36" fill="#388E3C" />

      {/* Ground plants */}
      <ellipse cx="135" cy="366" rx="22" ry="10" fill="#558B2F" />
      <ellipse cx="158" cy="363" rx="16" ry="8"  fill="#689F38" />
      <ellipse cx="665" cy="366" rx="22" ry="10" fill="#558B2F" />
      <ellipse cx="642" cy="363" rx="16" ry="8"  fill="#689F38" />

      {/* Building body */}
      <rect x="230" y="190" width="340" height="175" fill="#E8C97C" />
      <rect x="230" y="190" width="22"  height="175" fill="#DDB86A" />
      <rect x="548" y="190" width="22"  height="175" fill="#DDB86A" />
      <rect x="225" y="186" width="352" height="16"  fill="#B22222" rx="1" />
      <polygon points="308,186 492,186 400,106" fill="#C0392B" />

      {/* Clock */}
      <circle cx="400" cy="148" r="21" fill="white" stroke="#8B4513" strokeWidth="2.5" />
      <circle cx="400" cy="148" r="2"  fill="#333" />
      <line x1="400" y1="131" x2="400" y2="148" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      <line x1="400" y1="148" x2="413" y2="148" stroke="#333" strokeWidth="2" strokeLinecap="round" />

      {/* Top windows */}
      <rect x="248" y="208" width="50" height="40" fill="#67CDD4" rx="2" />
      <line x1="273" y1="208" x2="273" y2="248" stroke="#B0E8EB" strokeWidth="1.5" />
      <line x1="248" y1="228" x2="298" y2="228" stroke="#B0E8EB" strokeWidth="1" />
      <rect x="308" y="208" width="50" height="40" fill="#67CDD4" rx="2" />
      <line x1="333" y1="208" x2="333" y2="248" stroke="#B0E8EB" strokeWidth="1.5" />
      <line x1="308" y1="228" x2="358" y2="228" stroke="#B0E8EB" strokeWidth="1" />
      <rect x="442" y="208" width="50" height="40" fill="#67CDD4" rx="2" />
      <line x1="467" y1="208" x2="467" y2="248" stroke="#B0E8EB" strokeWidth="1.5" />
      <line x1="442" y1="228" x2="492" y2="228" stroke="#B0E8EB" strokeWidth="1" />
      <rect x="502" y="208" width="50" height="40" fill="#67CDD4" rx="2" />
      <line x1="527" y1="208" x2="527" y2="248" stroke="#B0E8EB" strokeWidth="1.5" />
      <line x1="502" y1="228" x2="552" y2="228" stroke="#B0E8EB" strokeWidth="1" />

      {/* SCHOOL sign */}
      <rect x="322" y="258" width="156" height="26" fill="#C0392B" rx="3" />
      <text x="400" y="276" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold"
            fontFamily="Arial, sans-serif" letterSpacing="2">SCHOOL</text>

      {/* Bottom windows */}
      <rect x="248" y="293" width="50" height="42" fill="#67CDD4" rx="2" />
      <line x1="273" y1="293" x2="273" y2="335" stroke="#B0E8EB" strokeWidth="1.5" />
      <line x1="248" y1="314" x2="298" y2="314" stroke="#B0E8EB" strokeWidth="1" />
      <rect x="308" y="293" width="50" height="42" fill="#67CDD4" rx="2" />
      <line x1="333" y1="293" x2="333" y2="335" stroke="#B0E8EB" strokeWidth="1.5" />
      <line x1="308" y1="314" x2="358" y2="314" stroke="#B0E8EB" strokeWidth="1" />
      <rect x="442" y="293" width="50" height="42" fill="#67CDD4" rx="2" />
      <line x1="467" y1="293" x2="467" y2="335" stroke="#B0E8EB" strokeWidth="1.5" />
      <line x1="442" y1="314" x2="492" y2="314" stroke="#B0E8EB" strokeWidth="1" />
      <rect x="502" y="293" width="50" height="42" fill="#67CDD4" rx="2" />
      <line x1="527" y1="293" x2="527" y2="335" stroke="#B0E8EB" strokeWidth="1.5" />
      <line x1="502" y1="314" x2="552" y2="314" stroke="#B0E8EB" strokeWidth="1" />

      {/* Entrance door */}
      <rect x="358" y="272" width="84" height="93" fill="#B22222" rx="3" />
      <rect x="362" y="276" width="36" height="85" fill="#67CDD4" rx="1" />
      <line x1="362" y1="319" x2="398" y2="319" stroke="#55B8BF" strokeWidth="1.5" />
      <rect x="402" y="276" width="36" height="85" fill="#67CDD4" rx="1" />
      <line x1="402" y1="319" x2="438" y2="319" stroke="#55B8BF" strokeWidth="1.5" />
      <circle cx="397" cy="323" r="3" fill="#FFD700" />
      <circle cx="403" cy="323" r="3" fill="#FFD700" />

      {/* Steps */}
      <rect x="336" y="359" width="128" height="10" fill="#7B1A1A" />
      <rect x="344" y="349" width="112" height="12" fill="#8B2222" />
      <rect x="352" y="339" width="96"  height="12" fill="#9B3333" />

      {/* Bushes */}
      <circle cx="248" cy="354" r="18" fill="#33691E" />
      <circle cx="268" cy="348" r="23" fill="#388E3C" />
      <circle cx="292" cy="354" r="17" fill="#33691E" />
      <circle cx="508" cy="354" r="17" fill="#33691E" />
      <circle cx="532" cy="348" r="23" fill="#388E3C" />
      <circle cx="552" cy="354" r="18" fill="#33691E" />

      {/* ── Frog avatars on path (drawn last = on top) ── */}
      {frogs.map(({ avatar, x, y, r }) => (
        <g key={avatar.id}>
          {/* Drop shadow */}
          <ellipse cx={x} cy={y + r + 3} rx={r * 0.65} ry={r * 0.18} fill="rgba(0,0,0,0.18)" />
          {/* White backing circle */}
          <circle cx={x} cy={y} r={r + 2.5} fill="white" stroke="#312e81" strokeWidth={r > 25 ? 3 : 2} />
          {/* Frog image clipped to circle */}
          <image
            href={avatar.image}
            x={x - r}
            y={y - r * 1.15}
            width={r * 2}
            height={r * 2.3}
            clipPath={`url(#fc-${avatar.id})`}
          />
        </g>
      ))}
    </svg>
  );
}

export default function Home() {
  const pathFrogs: FrogStop[] = [
    { x: 400, y: 393, r: 17, avatar: AVATARS[0] },
    { x: 400, y: 451, r: 26, avatar: AVATARS[1] },
    { x: 400, y: 505, r: 36, avatar: AVATARS[2] },
  ];

  return (
    <div className="min-h-screen bg-[#edfdf8] font-sans text-[#1e293b] flex overflow-hidden">

      {/* ── Left content ── */}
      <div className="flex-1 flex flex-col justify-center px-14 py-12 min-w-0">

        {/* Logo chip */}
        <div className="flex items-center gap-3 mb-10 w-fit bg-[#312e81] border-4 border-[#312e81] rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.25)] px-3 py-2">
          <div className="bg-white rounded-xl p-1 shrink-0">
            <img src={AVATARS[0].image} alt="RIBBIT" className="w-9 h-9 object-contain" />
          </div>
          <div>
            <div className="font-black text-xl uppercase italic text-white leading-none tracking-tight">RIBBIT</div>
            <div className="text-[9px] font-bold text-white/60 tracking-wider">대학생을 위한 영어 학습 플랫폼</div>
          </div>
        </div>

        <p className="font-black text-xl text-teal-500 mb-3">Hello! 안녕하세요 👋</p>

        <h1 className="font-black text-6xl leading-[1.05] tracking-tight mb-5">
          Welcome to<br />
          <span className="text-teal-500">RIBBIT</span>
        </h1>

        <p className="font-bold text-base text-slate-600 mb-2">Your journey to English fluency starts here! 🎯</p>
        <p className="font-bold text-base text-slate-600 mb-6">대학생을 위한 재미있고 효과적인 영어 학습 플랫폼! 🚀</p>

        <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-md mb-10">
          Practice real-world conversations, master pronunciation with AI feedback, and build
          confidence through interactive challenges. Learn English the fun way!
        </p>

        <div className="mb-4">
          <Link
            href="/avatar"
            className="inline-flex items-center gap-3 px-10 py-5 bg-orange-400 text-white font-black uppercase text-xl rounded-full border-4 border-orange-600 shadow-[4px_4px_0px_0px_rgba(194,65,12,0.35)] hover:scale-105 active:scale-95 transition-all"
          >
            START <ArrowRight size={24} />
          </Link>
        </div>
      </div>

      {/* ── Right: school scene with frogs on path ── */}
      <div className="hidden lg:block w-[52%] shrink-0 self-stretch">
        <SchoolScene frogs={pathFrogs} />
      </div>
    </div>
  );
}
