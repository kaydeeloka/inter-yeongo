'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Volume2, ChevronRight, CheckCircle2, RotateCcw, Brain, 
  Keyboard, Timer, Trophy, Target, Zap, GraduationCap 
} from 'lucide-react';

interface WordItem {
  id: number;
  word: string;
  meaning: string;
}

const ALL_SUBJECT_WORDS: WordItem[] = [
  { id: 1, word: 'Science', meaning: '과학 - 자연 현상을 연구하는 과목' },
  { id: 2, word: 'History', meaning: '역사 - 과거의 사건을 배우는 과목' },
  { id: 3, word: 'Music', meaning: '음악 - 소리로 예술을 표현하는 과목' },
  { id: 4, word: 'Art', meaning: '미술 - 그림이나 조각 등을 배우는 과목' },
  { id: 5, word: 'English', meaning: '영어 - 전 세계에서 공용어로 쓰이는 언어' },
  { id: 6, word: 'Math', meaning: '수학 - 수와 공간의 법칙을 배우는 과목' },
  { id: 7, word: 'Physical Education', meaning: '체육 - 몸을 움직이고 운동을 배우는 과목' },
  { id: 8, word: 'Geography', meaning: '지리 - 세계의 지형과 환경을 배우는 과목' },
  { id: 9, word: 'Social Studies', meaning: '사회 - 사회의 현상과 구조를 배우는 과목' },
  { id: 10, word: 'Computer', meaning: '컴퓨터 - 정보 기술과 코딩을 배우는 과목' },
];

export default function App() {
  const [step, setStep] = useState<'study' | 'game'>('study');
  const [loadingAudio, setLoadingAudio] = useState<number | null>(null);
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<WordItem[]>([]);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSpeak = useCallback((text: string, id: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    setLoadingAudio(id);
    utterance.onend = () => setLoadingAudio(null);
    window.speechSynthesis.speak(utterance);
  }, []);

  const startGame = () => {
    const selected = [...ALL_SUBJECT_WORDS].sort(() => Math.random() - 0.5).slice(0, 5);
    setShuffledWords(selected);
    setGameStatus('playing');
    setCurrentWordIndex(0);
    setScore(0);
    setTimeLeft(30);
    setUserInput('');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const endGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameStatus('finished');
  }, []);

  useEffect(() => {
    if (gameStatus === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && gameStatus === 'playing') {
      endGame();
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameStatus, timeLeft, endGame]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-indigo-600 font-black uppercase tracking-[0.2em] text-xs">
              <GraduationCap className="w-5 h-5" /> English Subject Master
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">과목 영단어 타자 퀴즈</h1>
          </div>
          
          <div className="flex bg-slate-200/50 p-1.5 rounded-2xl gap-2 w-fit">
            <button
              onClick={() => setStep('study')}
              className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${step === 'study' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500'}`}
            >
              <Brain className="w-4 h-4" /> 학습하기
            </button>
            <button
              onClick={() => { setStep('game'); setGameStatus('idle'); }}
              className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${step === 'game' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500'}`}
            >
              <Zap className="w-4 h-4" /> 퀴즈도전
            </button>
          </div>
        </header>

        <main>
          {step === 'study' && (
            <div className="animate-in fade-in duration-700">
              {/* 5 columns on desktop, 2 on tablet, 1 on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                {ALL_SUBJECT_WORDS.map((item) => (
                  <div 
                    key={item.id} 
                    className="group bg-white p-7 rounded-4xl border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2 transition-all duration-300 text-center"
                  >
                    <button
                      onClick={() => handleSpeak(item.word, item.id)}
                      className={`h-14 w-14 flex items-center justify-center rounded-2xl mx-auto mb-6 transition-all ${
                        loadingAudio === item.id 
                          ? 'bg-indigo-600 text-white scale-90' 
                          : 'bg-indigo-50 text-indigo-500 hover:bg-indigo-500 hover:text-white'
                      }`}
                    >
                      <Volume2 className="w-6 h-6" />
                    </button>

                    <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">
                      {item.word}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                      {item.meaning.split(' - ')[1]}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="flex justify-center mt-20">
                <button 
                  onClick={() => { setStep('game'); setGameStatus('idle'); }}
                  className="bg-indigo-600 text-white px-12 py-6 rounded-full font-black text-2xl shadow-2xl shadow-indigo-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
                >
                  준비 완료! 퀴즈 시작 <ChevronRight className="w-7 h-7" />
                </button>
              </div>
            </div>
          )}

          {step === 'game' && (
            <div className="flex flex-col items-center justify-center py-10">
              {gameStatus === 'idle' && (
                <div className="text-center bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 max-w-lg">
                  <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Keyboard className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-black mb-4">Challenge Mode</h2>
                  <p className="text-slate-500 mb-10 font-medium">10개 단어 중 랜덤으로 5문제가 출제됩니다.</p>
                  <button onClick={startGame} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-indigo-600 transition-colors shadow-lg">START GAME</button>
                </div>
              )}

              {gameStatus === 'playing' && (
                <div className="w-full max-w-4xl space-y-8">
                  <div className="flex justify-between items-center bg-white px-10 py-5 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3"><Timer className="text-rose-500 w-6 h-6" /><span className="text-3xl font-black tabular-nums">{timeLeft}s</span></div>
                    <div className="text-xl font-black text-indigo-600">Q. {currentWordIndex + 1} / 5</div>
                  </div>
                  
                  <div className="text-center py-24 rounded-[4rem] bg-indigo-600 text-white shadow-2xl relative overflow-hidden">
                    <p className="text-indigo-200 font-bold uppercase tracking-widest text-xs mb-4">아래 뜻에 맞는 영어는?</p>
                    <h2 className="text-7xl font-black">{shuffledWords[currentWordIndex]?.meaning.split(' - ')[0]}</h2>
                  </div>

                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      setUserInput(val);
                      const target = shuffledWords[currentWordIndex].word;
                      if (val.toLowerCase().trim() === target.toLowerCase().trim()) {
                        handleSpeak(target, -1);
                        if (currentWordIndex + 1 < 5) {
                          setCurrentWordIndex(prev => prev + 1);
                          setScore(s => s + 1);
                          setUserInput('');
                        } else {
                          endGame();
                        }
                      }
                    }}
                    className="w-full bg-white border-4 border-slate-100 focus:border-indigo-500 p-10 rounded-[2.5rem] text-5xl font-black text-center outline-none shadow-2xl transition-all"
                    placeholder="Enter..."
                  />
                </div>
              )}

              {gameStatus === 'finished' && (
                <div className="text-center animate-in zoom-in-95">
                  <div className="inline-flex p-6 bg-green-100 rounded-full text-green-600 mb-6 shadow-inner"><CheckCircle2 className="w-16 h-16" /></div>
                  <h2 className="text-5xl font-black mb-10">참 잘했어요! 🎉</h2>
                  <div className="flex gap-6 justify-center mb-12">
                    <div className="bg-white p-8 rounded-4xl shadow-lg w-48 border border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-2">My Score</p>
                      <p className="text-4xl font-black text-indigo-600">{score}/5</p>
                    </div>
                  </div>
                  <button onClick={startGame} className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-indigo-600 transition-all flex items-center gap-3 mx-auto shadow-xl"><RotateCcw /> 다시 도전</button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
