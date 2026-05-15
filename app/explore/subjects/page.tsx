'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, ChevronRight, CheckCircle2, RotateCcw, Brain, School, HelpCircle, Eye, Info } from 'lucide-react';

const SUBJECT_WORDS = [
  { id: 1, word: 'Science', meaning: '과학 - 자연 현상을 연구하는 과목' },
  { id: 2, word: 'History', meaning: '역사 - 과거의 사건을 배우는 과목' },
  { id: 3, word: 'Music', meaning: '음악 - 소리로 예술을 표현하는 과목' },
  { id: 4, word: 'Art', meaning: '미술 - 그림이나 조각 등을 배우는 과목' },
  { id: 5, word: 'Biology', meaning: '생물학 - 생명체를 연구하는 과학' },
  { id: 6, word: 'Physics', meaning: '물리학 - 물질과 에너지의 성질' },
  { id: 7, word: 'Math', meaning: '수학 - 수와 도형을 다루는 과목' },
  { id: 8, word: 'Library', meaning: '도서관 - 책을 읽고 빌리는 장소' },
  { id: 9, word: 'English', meaning: '영어 - 전 세계에서 공용어로 쓰이는 언어' },
  { id: 10, word: 'School', meaning: '학교 - 학생들이 배우는 장소' },
];

const GRID_LAYOUT = [
  ['1', ' ', ' ', ' ', ' ', ' ', ' ', '0', '0', '0'],
  [' ', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
  [' ', '0', '2', ' ', ' ', ' ', ' ', ' ', '0', '0'],
  [' ', '0', '0', '0', '0', '0', '0', ' ', '0', '3'],
  [' ', '0', '4', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', '0', ' ', '0', '0', '0', '0', ' ', '0', ' '],
  [' ', '0', '5', ' ', ' ', ' ', ' ', ' ', '0', ' '],
  [' ', '0', ' ', '0', '0', '0', '0', ' ', '0', ' '],
  ['6', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '0', '0'],
  ['0', '0', ' ', '0', '0', '0', '0', '0', '0', '0'],
];

const WORDS_CONFIG: Array<{ num: number; r: number; c: number; dir: 'across' | 'down'; word: string; clue: string }> = [
  { num: 1, r: 0, c: 0, dir: 'down', word: 'SCIENCE', clue: '자연의 원리를 실험하고 연구하는 과목' },
  { num: 1, r: 0, c: 0, dir: 'across', word: 'SCHOOL', clue: '공부하러 매일 가는 곳' },
  { num: 2, r: 2, c: 2, dir: 'across', word: 'MUSIC', clue: '노래 부르고 악기를 연주하는 시간' },
  { num: 3, r: 3, c: 9, dir: 'down', word: 'MATH', clue: '더하기, 빼기 등 숫자를 배우는 과목' },
  { num: 4, r: 4, c: 2, dir: 'across', word: 'ENGLISH', clue: '미국이나 영국에서 쓰는 언어' },
  { num: 5, r: 6, c: 2, dir: 'across', word: 'HISTORY', clue: '옛날 조상들의 이야기를 배우는 과목' },
  { num: 6, r: 8, c: 0, dir: 'across', word: 'LIBRARY', clue: '조용히 책을 읽거나 빌리는 곳' },
  { num: 7, r: 2, c: 7, dir: 'down', word: 'BIOLOGY', clue: '생물과 식물의 생태를 배우는 과학' },
  { num: 8, r: 4, c: 2, dir: 'down', word: 'PHYSICS', clue: '물체의 움직임과 에너지를 배우는 과학' },
  { num: 9, r: 4, c: 9, dir: 'down', word: 'ART', clue: '도화지에 그림을 그리는 과목' },
];

const buildInitialGridState = (): string[][] =>
  Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ''));

const normalizeLetter = (value: string): string => {
  const letter = value.trim().slice(0, 1).toUpperCase();
  return /[A-Z]/.test(letter) ? letter : '';
};

const formatDirection = (dir: 'across' | 'down'): string =>
  dir === 'across' ? '가로' : '세로';

export default function App() {
  const [step, setStep] = useState<'study' | 'game'>('study');
  const [loadingAudio, setLoadingAudio] = useState<number | null>(null);
  const [gridState, setGridState] = useState<string[][]>(buildInitialGridState());
  const [gameComplete, setGameComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showHints, setShowHints] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);

  useEffect(() => {
    inputRefs.current = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => null));
  }, []);

  useEffect(() => {
    window.speechSynthesis.cancel();
  }, [step]);

  const handleSpeak = (text: string, id: number): void => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    setLoadingAudio(id);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

    utterance.onend = () => {
      setLoadingAudio(null);
    };
    utterance.onerror = () => {
      setLoadingAudio(null);
      console.error('Speech synthesis failed for', text);
    };
  };

  const handleGridInput = (row: number, col: number, value: string): void => {
    const letter = normalizeLetter(value);
    setGridState((prev) => {
      const next = prev.map((line) => [...line]);
      next[row][col] = letter;
      return next;
    });
    setErrorMessage('');
  };

  const getWordFromGrid = (config: (typeof WORDS_CONFIG)[number]): string => {
    const letters: string[] = [];
    for (let index = 0; index < config.word.length; index += 1) {
      const row = config.r + (config.dir === 'down' ? index : 0);
      const col = config.c + (config.dir === 'across' ? index : 0);
      letters.push(gridState[row]?.[col] || '');
    }
    return letters.join('');
  };

  const checkGame = (): void => {
    let allCorrect = true;

    WORDS_CONFIG.forEach((config) => {
      const entry = getWordFromGrid(config);
      if (entry !== config.word) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      setGameComplete(true);
      setErrorMessage('');
    } else {
      setErrorMessage('아직 틀린 부분이 있거나 빈칸이 있어요! 다시 한번 확인해 볼까요?');
    }
  };

  const resetGame = (): void => {
    setGridState(buildInitialGridState());
    setGameComplete(false);
    setErrorMessage('');
    setShowHints(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100">
        <header className="bg-white border-b border-slate-100 p-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <School className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-indigo-600">Learning Center</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">과목 영단어 마스터 🎓</h1>
            <p className="text-slate-500 mt-1">단어를 듣고 배우며 십자말 풀이에 도전하세요!</p>
          </div>
          <div className="flex items-center gap-3">
            <Brain className="w-12 h-12 text-indigo-100" />
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>말하기 버튼을 눌러 단어 발음을 들어보세요.</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex bg-slate-50/50 p-2 gap-2">
          <button
            onClick={() => setStep('study')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${step === 'study' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            1. 단어 공부하기
          </button>
          <button
            onClick={() => setStep('game')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${step === 'game' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            2. 십자말 풀이 게임
          </button>
        </div>

        <main className="p-6 md:p-10 min-h-[600px]">
          {step === 'study' && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="grid gap-4">
                {SUBJECT_WORDS.map((item) => (
                  <div key={item.id} className="group flex items-center gap-4 bg-white border border-slate-100 p-5 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/10 transition-all duration-200 shadow-sm">
                    <button
                      onClick={() => handleSpeak(item.word, item.id)}
                      disabled={loadingAudio === item.id}
                      className={`flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 text-indigo-600 transition ${loadingAudio === item.id ? 'bg-indigo-100 text-indigo-400' : 'bg-slate-50 hover:bg-indigo-600 hover:text-white'}`}
                      aria-label="Listen pronunciation"
                    >
                      <Volume2 className={`w-6 h-6 ${loadingAudio === item.id ? 'animate-bounce' : ''}`} />
                    </button>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="text-2xl font-black text-slate-900">{item.word}</span>
                        <span className="text-xs font-bold text-indigo-400">SUBJECT</span>
                      </div>
                      <p className="text-slate-600 font-medium">{item.meaning}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setStep('game')}
                  className="flex items-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-95"
                >
                  학습 완료! 게임하러 가기 <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}

          {step === 'game' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {gameComplete ? (
                <div className="text-center py-20 bg-green-50/30 rounded-3xl border border-green-100">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-600 rounded-full mb-6 shadow-inner">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">참 잘했어요! 완벽해요! 🌟</h2>
                  <p className="text-slate-600 text-lg mb-12 max-w-md mx-auto leading-relaxed">모든 과목 단어를 완벽하게 마스터했습니다. 이제 다른 과목 공부도 자신 있게 할 수 있겠네요!</p>
                  <button
                    onClick={resetGame}
                    className="flex items-center gap-2 mx-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg"
                  >
                    <RotateCcw className="w-5 h-5" /> 다시 시작
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-10">
                  <div className="flex items-center gap-3 bg-amber-50 p-4 rounded-2xl border border-amber-100 text-amber-800 text-sm">
                    <Info className="w-5 h-5 flex-shrink-0" />
                    <p>학습한 단어들을 떠올리며 빈칸을 채워보세요. 힌트를 켜면 더 쉽게 풀 수 있어요.</p>
                  </div>

                  {errorMessage && (
                    <div className="bg-rose-50 text-rose-600 p-4 rounded-xl border border-rose-100 font-bold animate-pulse">
                      {errorMessage}
                    </div>
                  )}

                  <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-slate-800 font-bold text-lg">퍼즐 보드</p>
                        <p className="text-slate-500 text-sm">빈칸에 알맞은 단어를 채워 넣어 보세요.</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => setShowHints((prev) => !prev)}
                          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                        >
                          <HelpCircle className="w-4 h-4" /> {showHints ? '힌트 숨기기' : '힌트 보기'}
                        </button>
                        <button
                          onClick={resetGame}
                          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                        >
                          <Eye className="w-4 h-4" /> 다시 시작
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-1 grid-cols-[repeat(10,minmax(0,1fr))]">
                      {GRID_LAYOUT.map((row, rowIndex) =>
                        row.map((cell, colIndex) => {
                          const isBlocked = cell === '0';
                          const isNumber = cell !== '0' && cell !== ' ';
                          return (
                            <div
                              key={`${rowIndex}-${colIndex}`}
                              className={`relative h-16 overflow-hidden rounded-2xl border ${isBlocked ? 'border-slate-200 bg-slate-300' : 'border-slate-200 bg-slate-50'}`}
                            >
                              {isNumber && (
                                <span className="absolute left-2 top-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{cell}</span>
                              )}
                              <input
                                type="text"
                                maxLength={1}
                                value={gridState[rowIndex][colIndex]}
                                onChange={(e) => handleGridInput(rowIndex, colIndex, e.target.value)}
                                disabled={isBlocked}
                                className={`h-full w-full border-none bg-transparent text-center text-2xl font-black uppercase tracking-[0.35em] focus:outline-none ${isBlocked ? 'cursor-not-allowed opacity-50' : 'text-slate-900'}`}
                              />
                            </div>
                          );
                        })
                      )}
                    </div>

                    {showHints && (
                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {WORDS_CONFIG.map((item) => (
                          <div key={`${item.num}-${item.dir}`} className="rounded-3xl border border-slate-100 bg-slate-50 p-4 shadow-sm">
                            <div className="flex items-center justify-between gap-3 mb-2">
                              <span className="text-sm font-black text-slate-900">{item.num}. {formatDirection(item.dir)}</span>
                              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.word.length}글자</span>
                            </div>
                            <p className="text-slate-600">{item.clue}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="sticky bottom-4 md:bottom-8 bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-slate-100 shadow-xl">
                    <button
                      onClick={checkGame}
                      className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3"
                    >
                      정답 확인하기! <CheckCircle2 className="w-7 h-7" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        <footer className="bg-slate-50 p-6 text-center border-t border-slate-100">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">Easy Learning for Students</p>
        </footer>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&display=swap');
        
        :global(body) {
          font-family: 'Noto Sans KR', sans-serif;
          background-color: #f8fafc;
        }

        .animate-in {
          animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
