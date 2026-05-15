'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Volume2, ChevronRight, CheckCircle2, School, Map as MapIcon } from 'lucide-react';
import { getSavedAvatar, getSavedName } from '@/lib/userStore';
import { AVATARS } from '@/data/avatars';
import type { Avatar } from '@/types';

type SupplyItem   = { id: number; word: string; meaning: string; imageUrl: string };
type Tile         = { id: number; itemId: number; type: 'image' | 'word'; content: string };
type QuizThreeItem = { id: number; prompt: string; options: string[]; answer: string };

const SCHOOL_SUPPLIES: SupplyItem[] = [
  { id: 1,  word: 'Pencil',      meaning: '연필',  imageUrl: '/img/classroom/pencil.png' },
  { id: 2,  word: 'Eraser',      meaning: '지우개', imageUrl: '/img/classroom/eraser.png' },
  { id: 3,  word: 'Notebook',    meaning: '공책',  imageUrl: '/img/classroom/notebook.png' },
  { id: 4,  word: 'Ballpoint Pen', meaning: '볼펜', imageUrl: '/img/classroom/pencil.png' },
  { id: 5,  word: 'Ruler',       meaning: '자',    imageUrl: '/img/classroom/ruler.png' },
  { id: 6,  word: 'Tablet',      meaning: '태블릿', imageUrl: '/img/classroom/tablet.png' },
  { id: 7,  word: 'Highlighter', meaning: '형광펜', imageUrl: '/img/classroom/highlighter.png' },
  { id: 8,  word: 'Backpack',    meaning: '책가방', imageUrl: '/img/classroom/backpack.png' },
  { id: 9,  word: 'Laptop',      meaning: '노트북', imageUrl: '/img/classroom/laptop.png' },
  { id: 10, word: 'Pencil Case', meaning: '필통',  imageUrl: '/img/classroom/pencil-case.png' },
];

const QUIZ1_ITEMS  = SCHOOL_SUPPLIES.slice(0, 3);
const MEMORY_ITEMS = SCHOOL_SUPPLIES.slice(0, 4);
const QUIZ3_ITEMS: QuizThreeItem[] = [
  { id: 1, prompt: '다음 중 "공책"에 해당하는 영어 단어는?',  options: ['Pencil', 'Notebook', 'Laptop'],          answer: 'Notebook' },
  { id: 2, prompt: '다음 중 "책가방"에 해당하는 영어 단어는?', options: ['Backpack', 'Eraser', 'Tablet'],           answer: 'Backpack' },
  { id: 3, prompt: '다음 중 "지우개"에 해당하는 영어 단어는?', options: ['Highlighter', 'Eraser', 'Ruler'],         answer: 'Eraser' },
];

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const createMemoryTiles = (): Tile[] =>
  shuffle(
    MEMORY_ITEMS.flatMap((item) => [
      { id: item.id * 2 - 1, itemId: item.id, type: 'image', content: item.imageUrl },
      { id: item.id * 2,     itemId: item.id, type: 'word',  content: item.word },
    ])
  );

export default function ClassroomPage() {
  const router = useRouter();
  const [avatar,   setAvatar]   = useState<Avatar>(AVATARS[0]);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    setAvatar(getSavedAvatar());
    setNickname(getSavedName());
  }, []);

  const [step,    setStep]    = useState<'study' | 'quiz' | 'quiz1' | 'quiz2' | 'quiz3'>('study');
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const handleSpeak = (e: React.MouseEvent<HTMLButtonElement>, text: string) => {
    e.stopPropagation();
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.8;
    window.speechSynthesis.speak(u);
  };

  const toggleFlip = (id: number) => setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#312e81] font-sans">
      <style>{`
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180    { transform: rotateY(180deg); }
      `}</style>

      {/* App-style header */}
      <header className="w-full bg-white border-b-4 border-[#312e81] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#312e81] shadow-[2px_2px_0px_0px_rgba(49,46,129,1)] rounded-full flex items-center justify-center bg-white shrink-0">
            <img src={avatar.image} alt={avatar.name} className="w-9 h-9 object-contain" />
          </div>
          <span className="font-black text-sm uppercase italic leading-none">{nickname}</span>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          <School className="w-4 h-4" />
          <span className="font-black text-sm uppercase italic tracking-wide">School Supplies</span>
        </div>
        <button
          onClick={() => router.push('/explore')}
          className="p-2 border-2 border-[#312e81] rounded-lg shadow-[3px_3px_0px_0px_rgba(49,46,129,1)] bg-white active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
        >
          <MapIcon size={24} />
        </button>
      </header>

      <div className="max-w-4xl mx-auto p-6 md:p-10">

        {/* Study: flip cards */}
        {step === 'study' && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mb-12">
              {SCHOOL_SUPPLIES.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleFlip(item.id)}
                  className="relative h-48 cursor-pointer"
                  style={{ perspective: '1000px' }}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-500 rounded-3xl border-4 border-[#312e81] shadow-[4px_4px_0px_0px_rgba(49,46,129,1)]"
                    style={{ transformStyle: 'preserve-3d', transform: flipped[item.id] ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-[#FFFBEB] flex flex-col items-center justify-center p-2 rounded-3xl overflow-hidden">
                      <img src={item.imageUrl} alt={item.word} className="w-full h-full object-cover rounded-2xl" />
                      <p className="absolute bottom-2 text-[8px] font-black text-white bg-[#312e81]/70 px-2 py-0.5 rounded-full uppercase tracking-widest">Click to flip</p>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden bg-[#312e81] flex flex-col items-center justify-center p-4 rounded-3xl text-white rotate-y-180" style={{ transform: 'rotateY(180deg)' }}>
                      <h3 className="text-lg font-black mb-1 leading-tight text-center">{item.word}</h3>
                      <p className="text-white/60 font-bold mb-4">{item.meaning}</p>
                      <button
                        onClick={(e) => handleSpeak(e, item.word)}
                        className="p-2 rounded-full bg-yellow-300/20 hover:bg-yellow-300/40 text-yellow-200 transition-all active:scale-90"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => setStep('quiz')}
                className="inline-flex items-center gap-3 px-10 py-5 bg-orange-400 text-white font-black uppercase text-xl rounded-full border-4 border-orange-600 shadow-[4px_4px_0px_0px_rgba(194,65,12,0.4)] hover:scale-105 active:scale-95 transition-all"
              >
                START QUIZ <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Quiz selection */}
        {step === 'quiz' && (
          <div className="flex flex-col gap-6">
            <div className="grid gap-6 md:grid-cols-3">
              <QuizCard title="퀴즈 1" description="사진을 보고 영어 단어를 입력하는 퀴즈입니다. 문제는 총 3개예요." onClick={() => setStep('quiz1')} />
              <QuizCard title="퀴즈 2" description="이미지와 영어 단어 타일을 연결하는 메모리 게임입니다."           onClick={() => setStep('quiz2')} />
              <QuizCard title="퀴즈 3" description="뜻에 맞는 영어 단어를 골라보는 객관식 퀴즈입니다."             onClick={() => setStep('quiz3')} />
            </div>
            <Link
              href="/explore/subject"
              className="flex items-center justify-center gap-2 rounded-2xl border-4 border-[#312e81]/30 bg-white px-4 py-3 text-sm font-black uppercase text-[#312e81]/50 transition-all hover:border-[#312e81] hover:text-[#312e81]"
            >
              다음: 서브젝트
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        )}

        {step === 'quiz1' && <QuizOne onBack={() => setStep('quiz')} />}
        {step === 'quiz2' && <QuizTwo onBack={() => setStep('quiz')} />}
        {step === 'quiz3' && <QuizThree onBack={() => setStep('quiz')} />}
      </div>
    </div>
  );
}

function QuizCard({ title, description, onClick }: { title: string; description: string; onClick: () => void }) {
  return (
    <div className="bg-white p-8 rounded-3xl border-4 border-[#312e81] shadow-[4px_4px_0px_0px_rgba(49,46,129,1)]">
      <h2 className="text-xl font-black mb-3 uppercase italic">{title}</h2>
      <p className="text-[#312e81]/60 font-semibold mb-8 text-sm leading-relaxed">{description}</p>
      <button
        onClick={onClick}
        className="w-full bg-[#312e81] text-white py-4 rounded-2xl font-black uppercase border-4 border-[#312e81] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 transition-all"
      >
        시작하기
      </button>
    </div>
  );
}

function BackBtn({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      className="mb-6 inline-flex items-center gap-2 px-4 py-2 border-2 border-[#312e81] rounded-xl font-black text-sm uppercase shadow-[2px_2px_0px_0px_rgba(49,46,129,1)] bg-white hover:bg-yellow-100 active:shadow-none transition-all"
    >
      ◀ 돌아가기
    </button>
  );
}

function QuizOne({ onBack }: { onBack: () => void }) {
  const [quizIdx, setQuizIdx]         = useState(0);
  const [userInput, setUserInput]     = useState('');
  const [score, setScore]             = useState(0);
  const [feedback, setFeedback]       = useState<{ type: 'correct' | 'wrong'; message: string } | null>(null);
  const [done, setDone]               = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const current = QUIZ1_ITEMS[quizIdx];

  const advance = () => {
    setUserInput('');
    setAttemptsLeft(3);
    if (quizIdx < QUIZ1_ITEMS.length - 1) setQuizIdx((i) => i + 1);
    else setDone(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const clean  = userInput.toLowerCase().replace(/[^a-z]/g, '');
    const target = current.word.toLowerCase().replace(/[^a-z]/g, '');
    if (clean === target) {
      setScore((s) => s + 1);
      setFeedback({ type: 'correct', message: '정답입니다!' });
      setTimeout(() => { setFeedback(null); advance(); }, 1200);
    } else {
      const next = attemptsLeft - 1;
      if (next > 0) {
        setAttemptsLeft(next);
        setFeedback({ type: 'wrong', message: `아쉬워요. ${next}번의 기회가 남았어요.` });
        setTimeout(() => { setFeedback(null); setUserInput(''); }, 1200);
      } else {
        setFeedback({ type: 'wrong', message: `정답은 "${current.word}"입니다.` });
        setTimeout(() => { setFeedback(null); advance(); }, 1400);
      }
    }
  };

  const reset = () => { setQuizIdx(0); setUserInput(''); setScore(0); setFeedback(null); setDone(false); setAttemptsLeft(3); };

  return (
    <div className="max-w-2xl mx-auto">
      <BackBtn onBack={onBack} />
      <div className="bg-white p-10 rounded-3xl border-4 border-[#312e81] shadow-[6px_6px_0px_0px_rgba(49,46,129,1)]">
        <div className="text-center mb-8">
          <span className="text-[#312e81]/20 font-black text-4xl">{quizIdx + 1}/{QUIZ1_ITEMS.length}</span>
          <h2 className="text-3xl font-black mt-3 uppercase italic">퀴즈 1: 단어 입력</h2>
          <p className="text-[#312e81]/50 font-semibold mt-1">사진을 보고 영어 단어를 입력하세요.</p>
        </div>
        {done ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-[#312e81] mx-auto mb-4" />
            <p className="text-2xl font-black mb-2 uppercase italic">완료!</p>
            <p className="font-black text-xl mb-10">점수: {score} / {QUIZ1_ITEMS.length}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={reset} className="px-6 py-3 bg-orange-400 text-white font-black uppercase rounded-2xl border-4 border-orange-600 shadow-[3px_3px_0px_0px_rgba(194,65,12,0.4)] hover:scale-105 active:scale-95 transition-all">다시 풀기</button>
              <button onClick={onBack} className="px-6 py-3 bg-[#312e81] text-white font-black uppercase rounded-2xl border-4 border-[#312e81] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 transition-all">퀴즈 선택으로</button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-8">
              <div className="w-48 h-48 bg-[#FFFBEB] rounded-3xl border-4 border-[#312e81] shadow-[4px_4px_0px_0px_rgba(49,46,129,1)] overflow-hidden flex items-center justify-center">
                <img src={current.imageUrl} alt={current.word} className="w-full h-full object-cover" />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-center text-[#312e81]/50 font-bold">남은 기회: {attemptsLeft}번</p>
              <input
                autoFocus
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="단어를 입력하세요..."
                className="w-full bg-[#FFFBEB] border-4 border-[#312e81] focus:border-orange-400 rounded-2xl px-6 py-4 text-center text-xl font-black focus:outline-none transition-all placeholder:text-[#312e81]/30"
                disabled={feedback !== null}
              />
              <button type="submit" disabled={!userInput || feedback !== null} className="w-full bg-[#312e81] text-white py-4 rounded-2xl font-black uppercase text-lg border-4 border-[#312e81] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 transition-all disabled:opacity-30">확인</button>
            </form>
            {feedback && (
              <div className={`mt-5 p-4 rounded-2xl border-4 text-center font-black ${feedback.type === 'correct' ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-rose-50 border-rose-400 text-rose-700'}`}>
                {feedback.message}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function QuizTwo({ onBack }: { onBack: () => void }) {
  const [tiles, setTiles]               = useState<Tile[]>(createMemoryTiles);
  const [selectedIds, setSelectedIds]   = useState<number[]>([]);
  const [matchedItemIds, setMatchedItemIds] = useState<number[]>([]);
  const [feedback, setFeedback]         = useState<string | null>(null);
  const [completed, setCompleted]       = useState(false);

  const handleTileClick = (tile: Tile) => {
    if (completed || selectedIds.includes(tile.id) || matchedItemIds.includes(tile.itemId)) return;
    if (selectedIds.length === 0) { setSelectedIds([tile.id]); return; }
    const first = tiles.find((t) => t.id === selectedIds[0]);
    if (!first) return;
    const isMatch = first.itemId === tile.itemId && first.type !== tile.type;
    if (isMatch) {
      const next = [...matchedItemIds, tile.itemId];
      setMatchedItemIds(next);
      setFeedback('잘했어요! 한 쌍을 찾았습니다.');
      if (next.length === MEMORY_ITEMS.length) setCompleted(true);
    } else {
      setFeedback('틀렸어요. 다시 시도해보세요.');
    }
    setSelectedIds([selectedIds[0], tile.id]);
    setTimeout(() => { setSelectedIds([]); setFeedback(null); }, 1000);
  };

  const reset = () => { setTiles(createMemoryTiles()); setSelectedIds([]); setMatchedItemIds([]); setFeedback(null); setCompleted(false); };

  return (
    <div className="max-w-2xl mx-auto">
      <BackBtn onBack={onBack} />
      <div className="bg-white p-10 rounded-3xl border-4 border-[#312e81] shadow-[6px_6px_0px_0px_rgba(49,46,129,1)]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black uppercase italic">퀴즈 2: 이미지-단어 메모리</h2>
          <p className="text-[#312e81]/50 font-semibold mt-1">이미지 타일과 단어 타일을 짝지어 보세요.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {tiles.map((tile) => {
            const isFlipped = selectedIds.includes(tile.id) || matchedItemIds.includes(tile.itemId);
            const isMatched = matchedItemIds.includes(tile.itemId);
            return (
              <button
                key={tile.id}
                type="button"
                onClick={() => handleTileClick(tile)}
                className={`h-32 rounded-2xl border-4 transition-all overflow-hidden font-black text-lg ${
                  isFlipped
                    ? isMatched
                      ? 'bg-yellow-100 border-[#312e81] shadow-[3px_3px_0px_0px_rgba(49,46,129,1)]'
                      : 'bg-white border-[#312e81] shadow-[3px_3px_0px_0px_rgba(49,46,129,1)]'
                    : 'bg-[#312e81] border-[#312e81] text-white shadow-[3px_3px_0px_0px_rgba(49,46,129,0.5)] hover:scale-105'
                }`}
              >
                {isFlipped ? (
                  tile.type === 'image'
                    ? <div className="w-full h-full p-2 bg-[#FFFBEB] flex items-center justify-center"><img src={tile.content} alt="item" className="max-w-full max-h-full object-contain" /></div>
                    : <span className="h-full flex items-center justify-center text-[#312e81] px-3 text-center">{tile.content}</span>
                ) : (
                  <span className="text-white font-black text-2xl">?</span>
                )}
              </button>
            );
          })}
        </div>
        <p className="text-center font-bold text-[#312e81]/60 mb-3">맞춘 쌍: {matchedItemIds.length} / {MEMORY_ITEMS.length}</p>
        {feedback && <p className="text-center font-black text-[#312e81] mb-3">{feedback}</p>}
        {completed && (
          <div className="text-center py-6 bg-yellow-100 rounded-2xl border-4 border-[#312e81] shadow-[4px_4px_0px_0px_rgba(49,46,129,1)] mt-4">
            <p className="text-2xl font-black uppercase italic mb-4">모든 짝을 찾았어요! 🎉</p>
            <div className="flex gap-3 justify-center">
              <button onClick={reset}   className="px-5 py-2.5 bg-orange-400 text-white font-black uppercase rounded-xl border-4 border-orange-600 shadow-[3px_3px_0px_0px_rgba(194,65,12,0.4)] hover:scale-105 transition-all">다시하기</button>
              <button onClick={onBack}  className="px-5 py-2.5 bg-[#312e81] text-white font-black uppercase rounded-xl border-4 border-[#312e81] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] hover:scale-105 transition-all">퀴즈 선택으로</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function QuizThree({ onBack }: { onBack: () => void }) {
  const [quizIdx, setQuizIdx]           = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore]               = useState(0);
  const [feedback, setFeedback]         = useState<{ type: 'correct' | 'wrong'; message: string } | null>(null);
  const [done, setDone]                 = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const current = QUIZ3_ITEMS[quizIdx];

  const advance = () => { setSelectedOption(''); setAttemptsLeft(3); if (quizIdx < QUIZ3_ITEMS.length - 1) setQuizIdx((i) => i + 1); else setDone(true); };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedOption) return;
    if (selectedOption === current.answer) {
      setScore((s) => s + 1);
      setFeedback({ type: 'correct', message: '정답입니다!' });
      setTimeout(() => { setFeedback(null); advance(); }, 1200);
    } else {
      const next = attemptsLeft - 1;
      if (next > 0) {
        setAttemptsLeft(next);
        setFeedback({ type: 'wrong', message: `아쉬워요. ${next}번의 기회가 남았어요.` });
        setTimeout(() => { setFeedback(null); setSelectedOption(''); }, 1200);
      } else {
        setFeedback({ type: 'wrong', message: `정답은 "${current.answer}"입니다.` });
        setTimeout(() => { setFeedback(null); advance(); }, 1400);
      }
    }
  };

  const reset = () => { setQuizIdx(0); setSelectedOption(''); setScore(0); setFeedback(null); setDone(false); setAttemptsLeft(3); };

  return (
    <div className="max-w-2xl mx-auto">
      <BackBtn onBack={onBack} />
      <div className="bg-white p-10 rounded-3xl border-4 border-[#312e81] shadow-[6px_6px_0px_0px_rgba(49,46,129,1)]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black uppercase italic">퀴즈 3: 객관식 선택</h2>
          <p className="text-[#312e81]/50 font-semibold mt-1">뜻에 맞는 영어 단어를 골라보세요.</p>
        </div>
        {done ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-[#312e81] mx-auto mb-4" />
            <p className="text-2xl font-black uppercase italic mb-2">완료!</p>
            <p className="font-black text-xl mb-10">점수: {score} / {QUIZ3_ITEMS.length}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={reset}  className="px-6 py-3 bg-orange-400 text-white font-black uppercase rounded-2xl border-4 border-orange-600 shadow-[3px_3px_0px_0px_rgba(194,65,12,0.4)] hover:scale-105 active:scale-95 transition-all">다시 풀기</button>
              <button onClick={onBack} className="px-6 py-3 bg-[#312e81] text-white font-black uppercase rounded-2xl border-4 border-[#312e81] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 transition-all">퀴즈 선택으로</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center">
              <span className="text-[#312e81]/20 font-black text-4xl">{quizIdx + 1}/{QUIZ3_ITEMS.length}</span>
              <p className="text-2xl font-black mt-3">{current.prompt}</p>
              <p className="text-[#312e81]/40 font-bold mt-1">남은 기회: {attemptsLeft}번</p>
            </div>
            <div className="grid gap-3">
              {current.options.map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-4 cursor-pointer font-black transition-all ${
                    selectedOption === option
                      ? 'bg-yellow-100 border-[#312e81] shadow-[3px_3px_0px_0px_rgba(49,46,129,1)]'
                      : 'bg-white border-[#312e81]/30 hover:border-[#312e81] hover:bg-yellow-50'
                  }`}
                >
                  <input type="radio" name="quiz3" value={option} checked={selectedOption === option} onChange={(e) => setSelectedOption(e.target.value)} className="accent-[#312e81]" />
                  <span className="text-lg">{option}</span>
                </label>
              ))}
            </div>
            <button type="submit" disabled={!selectedOption || feedback !== null} className="w-full bg-[#312e81] text-white py-4 rounded-2xl font-black uppercase text-lg border-4 border-[#312e81] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 transition-all disabled:opacity-30">확인</button>
            {feedback && (
              <div className={`p-4 rounded-2xl border-4 text-center font-black ${feedback.type === 'correct' ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-rose-50 border-rose-400 text-rose-700'}`}>
                {feedback.message}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
