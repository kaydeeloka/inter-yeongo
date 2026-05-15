'use client';

import React, { useState } from 'react';
import { Volume2, ChevronRight, CheckCircle2, RotateCcw, School } from 'lucide-react';

type SupplyItem = { id: number; word: string; meaning: string; imageUrl: string };
type Tile = { id: number; itemId: number; type: 'image' | 'word'; content: string };
type QuizThreeItem = { id: number; prompt: string; options: string[]; answer: string };

const SCHOOL_SUPPLIES: SupplyItem[] = [
  { id: 1, word: 'Pencil', meaning: '연필', imageUrl: '/img/classroom/pencil.png' },
  { id: 2, word: 'Eraser', meaning: '지우개', imageUrl: '/img/classroom/eraser.png' },
  { id: 3, word: 'Notebook', meaning: '공책', imageUrl: '/img/classroom/notebook.png' },
  { id: 4, word: 'Ballpoint Pen', meaning: '볼펜', imageUrl: '/img/classroom/pencil.png' },
  { id: 5, word: 'Ruler', meaning: '자', imageUrl: '/img/classroom/ruler.png' },
  { id: 6, word: 'Tablet', meaning: '태블릿', imageUrl: '/img/classroom/tablet.png' },
  { id: 7, word: 'Highlighter', meaning: '형광펜', imageUrl: '/img/classroom/highlighter.png' },
  { id: 8, word: 'Backpack', meaning: '책가방', imageUrl: '/img/classroom/backpack.png' },
  { id: 9, word: 'Laptop', meaning: '노트북', imageUrl: '/img/classroom/laptop.png' },
  { id: 10, word: 'Pencil Case', meaning: '필통', imageUrl: '/img/classroom/pencil-case.png' },
];

const QUIZ1_ITEMS = SCHOOL_SUPPLIES.slice(0, 3);
const MEMORY_ITEMS = SCHOOL_SUPPLIES.slice(0, 4);
const QUIZ3_ITEMS: QuizThreeItem[] = [
  {
    id: 1,
    prompt: '다음 중 "공책"에 해당하는 영어 단어는?',
    options: ['Pencil', 'Notebook', 'Laptop'],
    answer: 'Notebook',
  },
  {
    id: 2,
    prompt: '다음 중 "책가방"에 해당하는 영어 단어는?',
    options: ['Backpack', 'Eraser', 'Tablet'],
    answer: 'Backpack',
  },
  {
    id: 3,
    prompt: '다음 중 "지우개"에 해당하는 영어 단어는?',
    options: ['Highlighter', 'Eraser', 'Ruler'],
    answer: 'Eraser',
  },
];

const shuffle = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

const createMemoryTiles = (): Tile[] =>
  shuffle(
    MEMORY_ITEMS.flatMap((item) => [
      { id: item.id * 2 - 1, itemId: item.id, type: 'image', content: item.imageUrl },
      { id: item.id * 2, itemId: item.id, type: 'word', content: item.word },
    ])
  );

export default function App() {
  const [step, setStep] = useState<'study' | 'quiz' | 'quiz1' | 'quiz2' | 'quiz3'>('study');
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  // 브라우저 기본 TTS 기능을 사용하여 발음 출력
  const handleSpeak = (e: React.MouseEvent<HTMLButtonElement>, text: string): void => {
    e.stopPropagation();
    if (!window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const toggleFlip = (id: number): void => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 bg-indigo-50 px-4 py-2 rounded-full text-indigo-600 mb-4">
            <School className="w-5 h-5" />
            <span className="text-sm font-bold tracking-tight">학교에서 사용하는 물건들</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">School Supplies Study</h1>
        </header>

        {step === 'study' && (
          <div className="animate-in">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
              {SCHOOL_SUPPLIES.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => toggleFlip(item.id)}
                  className="relative h-48 cursor-pointer group"
                  style={{ perspective: '1000px' }}
                >
                  <div className={`relative w-full h-full transition-transform duration-500 shadow-xl rounded-3xl border border-slate-100 ${flipped[item.id] ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d', transform: flipped[item.id] ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                    {/* Front: Image */}
                    <div className="absolute inset-0 backface-hidden bg-slate-50 flex flex-col items-center justify-center p-2 rounded-3xl overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={item.word} 
                        className="w-full h-full object-cover rounded-2xl"
                      />
                      <p className="absolute bottom-2 text-[8px] font-bold text-white bg-black/30 px-2 py-0.5 rounded-full uppercase tracking-widest">Click to flip</p>
                    </div>
                    {/* Back: Text */}
                    <div className="absolute inset-0 backface-hidden bg-indigo-600 flex flex-col items-center justify-center p-4 rounded-3xl text-white rotate-y-180" style={{ transform: 'rotateY(180deg)' }}>
                      <h3 className="text-lg font-black mb-1 leading-tight text-center">{item.word}</h3>
                      <p className="text-indigo-200 font-bold mb-4">{item.meaning}</p>
                      <button 
                        onClick={(e) => handleSpeak(e, item.word)} 
                        className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-all active:scale-90"
                        title="Pronunciation"
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
                className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-transform active:scale-95 flex items-center gap-3"
              >
                START QUIZ <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {step === 'quiz' && (
          <div className="grid gap-6 md:grid-cols-3 animate-in">
            <QuizCard
              title="퀴즈 1"
              description="사진을 보고 영어 단어를 입력하는 퀴즈입니다. 문제는 총 3개예요."
              onClick={() => setStep('quiz1')}
            />
            <QuizCard
              title="퀴즈 2"
              description="이미지와 영어 단어 타일을 연결하는 메모리 게임입니다."
              onClick={() => setStep('quiz2')}
            />
            <QuizCard
              title="퀴즈 3"
              description="뜻에 맞는 영어 단어를 골라보는 객관식 퀴즈입니다."
              onClick={() => setStep('quiz3')}
            />
          </div>
        )}

        {step === 'quiz1' && <QuizOne onBack={() => setStep('quiz')} />}
        {step === 'quiz2' && <QuizTwo onBack={() => setStep('quiz')} />}
        {step === 'quiz3' && <QuizThree onBack={() => setStep('quiz')} />}

      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
        
        :global(body) { 
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: white;
        }

        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        .animate-in {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function QuizCard({ title, description, onClick }: { title: string; description: string; onClick: () => void }) {
  return (
    <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl">
      <h2 className="text-xl font-black mb-4">{title}</h2>
      <p className="text-slate-600 mb-8">{description}</p>
      <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all" onClick={onClick}>
        시작하기
      </button>
    </div>
  );
}

function QuizOne({ onBack }: { onBack: () => void }) {
  const [quizIdx, setQuizIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong'; message: string } | null>(null);
  const [done, setDone] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const current = QUIZ1_ITEMS[quizIdx];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanInput = userInput.toLowerCase().replace(/[^a-z]/g, '');
    const correctWord = current.word.toLowerCase().replace(/[^a-z]/g, '');

    if (cleanInput === correctWord) {
      setScore((prev) => prev + 1);
      setFeedback({ type: 'correct', message: '정답입니다!' });
      setTimeout(() => {
        setFeedback(null);
        setUserInput('');
        setAttemptsLeft(3);
        if (quizIdx < QUIZ1_ITEMS.length - 1) {
          setQuizIdx(quizIdx + 1);
        } else {
          setDone(true);
        }
      }, 1200);
    } else {
      const nextAttempts = attemptsLeft - 1;
      if (nextAttempts > 0) {
        setAttemptsLeft(nextAttempts);
        setFeedback({ type: 'wrong', message: `아쉬워요. ${nextAttempts}번의 기회가 남았어요.` });
        setTimeout(() => {
          setFeedback(null);
          setUserInput('');
        }, 1200);
      } else {
        setFeedback({ type: 'wrong', message: `기회를 모두 사용했어요. 정답은 "${current.word}"입니다.` });
        setTimeout(() => {
          setFeedback(null);
          setUserInput('');
          setAttemptsLeft(3);
          if (quizIdx < QUIZ1_ITEMS.length - 1) {
            setQuizIdx(quizIdx + 1);
          } else {
            setDone(true);
          }
        }, 1400);
      }
    }
  };

  const reset = () => {
    setQuizIdx(0);
    setUserInput('');
    setScore(0);
    setFeedback(null);
    setDone(false);
    setAttemptsLeft(3);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in">
      <div className="flex justify-between mb-6">
        <button onClick={onBack} className="text-indigo-600 font-bold">◀ 돌아가기</button>
      </div>
      <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 shadow-2xl">
        <div className="text-center mb-8">
          <span className="text-slate-300 font-black text-4xl">{quizIdx + 1}/{QUIZ1_ITEMS.length}</span>
          <h2 className="text-3xl font-black mt-4">퀴즈 1: 단어 입력</h2>
          <p className="text-slate-600 mt-2">사진을 보고 영어 단어를 입력하세요.</p>
        </div>

        {done ? (
          <div className="text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <p className="text-2xl font-black mb-4">모든 문제를 완료했어요!</p>
            <p className="text-indigo-600 font-bold text-xl mb-10">점수: {score} / {QUIZ1_ITEMS.length}</p>
            <button onClick={reset} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all mr-4">다시 풀기</button>
            <button onClick={onBack} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-black transition-all">퀴즈 선택으로</button>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-8">
              <div className="w-48 h-48 bg-white rounded-3xl shadow-lg overflow-hidden border-4 border-white flex items-center justify-center">
                <img src={current.imageUrl} alt={current.word} className="w-full h-full object-cover" />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center">
                <p className="text-slate-500 font-bold mb-2">사진 속 물건의 영어 이름은?</p>
                <p className="text-slate-400 mb-4">남은 기회: {attemptsLeft}번</p>
                <input
                  autoFocus
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="단어를 입력하세요..."
                  className="w-full bg-white border-2 border-slate-200 focus:border-indigo-600 rounded-2xl px-6 py-4 text-center text-xl font-bold focus:outline-none transition-all shadow-sm"
                  disabled={feedback !== null}
                />
              </div>
              <button type="submit" disabled={!userInput || feedback !== null} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-black transition-all disabled:opacity-30">
                확인
              </button>
            </form>
            {feedback && (
              <div className={`mt-6 p-4 rounded-2xl border-2 text-center ${feedback.type === 'correct' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-rose-50 border-rose-200 text-rose-600'}`}>
                <p className="font-black text-lg">{feedback.message}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function QuizTwo({ onBack }: { onBack: () => void }) {
  const [tiles, setTiles] = useState<Tile[]>(createMemoryTiles);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [matchedItemIds, setMatchedItemIds] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleTileClick = (tile: Tile) => {
    if (completed) return;
    if (selectedIds.includes(tile.id)) return;
    if (matchedItemIds.includes(tile.itemId)) return;

    if (selectedIds.length === 0) {
      setSelectedIds([tile.id]);
      return;
    }

    const firstId = selectedIds[0];
    const firstTile = tiles.find((board) => board.id === firstId);
    if (!firstTile) return;

    const isMatch = firstTile.itemId === tile.itemId && firstTile.type !== tile.type;
    if (isMatch) {
      const nextMatched = [...matchedItemIds, tile.itemId];
      setMatchedItemIds(nextMatched);
      setFeedback('잘했어요! 한 쌍을 찾았습니다.');
      if (nextMatched.length === MEMORY_ITEMS.length) {
        setCompleted(true);
      }
    } else {
      setFeedback('틀렸어요. 다시 시도해보세요.');
    }

    setSelectedIds([firstId, tile.id]);
    setTimeout(() => {
      setSelectedIds([]);
      setFeedback(null);
    }, 1000);
  };

  const reset = () => {
    setTiles(createMemoryTiles());
    setSelectedIds([]);
    setMatchedItemIds([]);
    setFeedback(null);
    setCompleted(false);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in">
      <div className="flex justify-between mb-6">
        <button onClick={onBack} className="text-indigo-600 font-bold">◀ 돌아가기</button>
      </div>
      <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black">퀴즈 2: 이미지-단어 메모리</h2>
          <p className="text-slate-600 mt-2">이미지 타일과 단어 타일을 짝지어 보세요.</p>
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
                className={`h-32 rounded-3xl border border-slate-200 shadow-lg transition-all overflow-hidden ${isFlipped ? 'bg-white' : 'bg-slate-900'} ${isMatched ? 'ring-2 ring-emerald-400' : ''}`}
              >
                {isFlipped ? (
                  tile.type === 'image' ? (
                    <div className="w-full h-full p-3 bg-slate-100 flex items-center justify-center">
                      <img src={tile.content} alt="item" className="max-w-full max-h-full object-contain" />
                    </div>
                  ) : (
                    <span className="block h-full flex items-center justify-center text-xl font-black text-slate-900 px-3">{tile.content}</span>
                  )
                ) : (
                  <span className="text-white font-black text-lg">?</span>
                )}
              </button>
            );
          })}
        </div>
        <div className="text-center mb-6">
          <p className="text-slate-700">맞춘 쌍: {matchedItemIds.length} / {MEMORY_ITEMS.length}</p>
          {feedback && <p className="mt-2 text-indigo-600 font-bold">{feedback}</p>}
        </div>
        {completed && (
          <div className="text-center py-8 bg-emerald-50 rounded-3xl border border-emerald-200 mb-6">
            <p className="text-2xl font-black text-emerald-700 mb-3">모든 짝을 찾았어요!</p>
            <button onClick={reset} className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-all mr-3">다시하기</button>
            <button onClick={onBack} className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-black transition-all">퀴즈 선택으로</button>
          </div>
        )}
      </div>
    </div>
  );
}

function QuizThree({ onBack }: { onBack: () => void }) {
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong'; message: string } | null>(null);
  const [done, setDone] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const current = QUIZ3_ITEMS[quizIdx];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedOption) return;

    if (selectedOption === current.answer) {
      setScore((prev) => prev + 1);
      setFeedback({ type: 'correct', message: '정답입니다!' });
      setTimeout(() => {
        setFeedback(null);
        setSelectedOption('');
        setAttemptsLeft(3);
        if (quizIdx < QUIZ3_ITEMS.length - 1) {
          setQuizIdx(quizIdx + 1);
        } else {
          setDone(true);
        }
      }, 1200);
    } else {
      const nextAttempts = attemptsLeft - 1;
      if (nextAttempts > 0) {
        setAttemptsLeft(nextAttempts);
        setFeedback({ type: 'wrong', message: `아쉬워요. ${nextAttempts}번의 기회가 남았어요.` });
        setTimeout(() => {
          setFeedback(null);
          setSelectedOption('');
        }, 1200);
      } else {
        setFeedback({ type: 'wrong', message: `기회를 모두 사용했어요. 정답은 "${current.answer}"입니다.` });
        setTimeout(() => {
          setFeedback(null);
          setSelectedOption('');
          setAttemptsLeft(3);
          if (quizIdx < QUIZ3_ITEMS.length - 1) {
            setQuizIdx(quizIdx + 1);
          } else {
            setDone(true);
          }
        }, 1400);
      }
    }
  };

  const reset = () => {
    setQuizIdx(0);
    setSelectedOption('');
    setScore(0);
    setFeedback(null);
    setDone(false);
    setAttemptsLeft(3);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in">
      <div className="flex justify-between mb-6">
        <button onClick={onBack} className="text-indigo-600 font-bold">◀ 돌아가기</button>
      </div>
      <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black">퀴즈 3: 객관식 선택</h2>
          <p className="text-slate-600 mt-2">뜻에 맞는 영어 단어를 골라보세요.</p>
        </div>
        {done ? (
          <div className="text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <p className="text-2xl font-black mb-4">퀴즈를 모두 완료했어요!</p>
            <p className="text-indigo-600 font-bold text-xl mb-10">점수: {score} / {QUIZ3_ITEMS.length}</p>
            <button onClick={reset} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all mr-4">다시 풀기</button>
            <button onClick={onBack} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-black transition-all">퀴즈 선택으로</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <span className="text-slate-300 font-black text-4xl">{quizIdx + 1}/{QUIZ3_ITEMS.length}</span>
              <p className="text-2xl font-black mt-4">{current.prompt}</p>
              <p className="text-slate-400 mt-2">남은 기회: {attemptsLeft}번</p>
            </div>
            <div className="grid gap-4">
              {current.options.map((option) => (
                <label key={option} className="block rounded-3xl border border-slate-200 bg-white p-4 cursor-pointer hover:bg-indigo-50">
                  <input
                    type="radio"
                    name="quiz3"
                    value={option}
                    checked={selectedOption === option}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="mr-4"
                  />
                  <span className="text-xl font-bold">{option}</span>
                </label>
              ))}
            </div>
            <button type="submit" disabled={!selectedOption || feedback !== null} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-black transition-all disabled:opacity-30">
              확인
            </button>
            {feedback && (
              <div className={`mt-6 p-4 rounded-2xl border-2 text-center ${feedback.type === 'correct' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-rose-50 border-rose-200 text-rose-600'}`}>
                <p className="font-black text-lg">{feedback.message}</p>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
