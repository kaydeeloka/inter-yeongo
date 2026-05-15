'use client';

import { useState } from 'react';
import { Trophy, Volume2 } from 'lucide-react';
import FrogMascot from '@/components/FrogMascot';
import { EXPRESSIONS } from '@/data/expressions';
import { useAudio } from '@/hooks/useAudio';
import type { Avatar, Expression } from '@/types';

interface VarietyGameProps {
  avatar: Avatar;
}

type GameMode = 'CHOICE' | 'LISTENING';
type Feedback = 'correct' | 'wrong' | null;

function createRound(): { currentQ: Expression; options: Expression[]; mode: GameMode } {
  const nextQ = EXPRESSIONS[Math.floor(Math.random() * EXPRESSIONS.length)];
  const mode = (['CHOICE', 'LISTENING'] as GameMode[])[Math.floor(Math.random() * 2)];
  const decoys = EXPRESSIONS.filter((e) => e.id !== nextQ.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  const options = [...decoys, nextQ].sort(() => 0.5 - Math.random());
  return { currentQ: nextQ, options, mode };
}

export default function VarietyGame({ avatar }: VarietyGameProps) {
  const { playAudio } = useAudio();
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [round, setRound] = useState(createRound);
  const { currentQ, options, mode } = round;

  const initQuestion = () => {
    setRound(createRound());
    setFeedback(null);
  };

  const handleChoice = (id: number) => {
    if (id === currentQ.id) {
      setFeedback('correct');
      setScore((s) => s + 10);
      setTimeout(initQuestion, 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 800);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white border-4 border-[#312e81] p-3 shadow-[4px_4px_0px_0px_rgba(49,46,129,1)] rounded-2xl">
        <div className="flex items-center gap-2">
          <Trophy className="text-yellow-500" size={24} />
          <span className="font-black text-xl">{score}</span>
        </div>
        <div className="px-3 py-1 bg-[#312e81] text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-full">
          {mode === 'CHOICE' ? '단어 퀴즈 (Quiz)' : '리스닝 (Listening)'}
        </div>
      </div>

      <div
        className={`relative p-8 border-4 border-[#312e81] rounded-[2.5rem] text-center space-y-6 transition-all shadow-[8px_8px_0px_0px_rgba(49,46,129,1)] ${
          feedback === 'correct' ? 'bg-[#4ade80]' : feedback === 'wrong' ? 'bg-red-300' : 'bg-white'
        }`}
      >
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20">
          <FrogMascot
            color={avatar.color}
            accessory={avatar.accessory}
            mood={feedback === 'correct' ? 'happy' : feedback === 'wrong' ? 'sad' : 'thinking'}
          />
        </div>

        {mode === 'LISTENING' ? (
          <div className="space-y-4 pt-4">
            <button
              type="button"
              onClick={() => playAudio(currentQ.en, 'game')}
              className="w-16 h-16 bg-yellow-100 border-2 border-[#312e81] shadow-[4px_4px_0px_0px_rgba(49,46,129,1)] rounded-full mx-auto flex items-center justify-center hover:scale-105 active:scale-95"
            >
              <Volume2 size={32} />
            </button>
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Listen closely</p>
          </div>
        ) : (
          <div className="pt-2">
            <h2 className="text-2xl font-black leading-tight tracking-tighter text-indigo-900">
              {currentQ.kr}
            </h2>
            <p className="mt-2 text-[10px] font-bold opacity-40">Choose English</p>
          </div>
        )}
      </div>

      <div className="grid gap-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => handleChoice(opt.id)}
            className="w-full p-4 bg-white border-2 border-[#312e81] font-black text-left shadow-[4px_4px_0px_0px_rgba(49,46,129,1)] hover:bg-yellow-50 transition-all rounded-xl active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <span className="text-base tracking-tighter">
              {mode === 'LISTENING' ? opt.kr : opt.en}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
