import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SchoolBackground from '@/components/SchoolBackground';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden font-sans">

      {/* Animated campus background */}
      <SchoolBackground />

      {/* Text content — floats above background */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-14 py-12 max-w-xl pb-24">

        <p className="font-black text-xl text-teal-600 mb-3 drop-shadow-sm">Hello! 안녕하세요 👋</p>

        <h1 className="font-black text-6xl leading-[1.05] tracking-tight mb-5 text-[#1e293b] drop-shadow-sm">
          Welcome to<br />
          <span className="text-teal-500">RIBBIT</span>
        </h1>

        <p className="font-bold text-base text-slate-700 mb-2">
          Your journey to English fluency starts here! 🎯
        </p>
        <p className="font-bold text-base text-slate-700 mb-6">
          대학생을 위한 재미있고 효과적인 영어 학습 플랫폼! 🚀
        </p>

        <p className="text-sm font-semibold text-slate-600 leading-relaxed max-w-sm mb-10">
          Practice real-world conversations, master pronunciation with AI feedback, and build
          confidence through interactive challenges. Learn English the fun way!
        </p>

        <div className="mb-4">
          <Link
            href="/avatar"
            className="inline-flex items-center gap-3 px-10 py-5 bg-orange-400 text-white font-black uppercase text-xl rounded-full border-4 border-orange-600 shadow-[4px_4px_0px_0px_rgba(194,65,12,0.4)] hover:scale-105 active:scale-95 transition-all"
          >
            START <ArrowRight size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
