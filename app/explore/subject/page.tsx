'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Volume2, ChevronRight, CheckCircle2, RotateCcw,
  Brain, Keyboard, Timer, Zap, GraduationCap, Map as MapIcon,
} from 'lucide-react';
import { getSavedAvatar, getSavedName } from '@/lib/userStore';
import { AVATARS } from '@/data/avatars';
import type { Avatar } from '@/types';

interface WordItem { id: number; word: string; meaning: string }

const ALL_SUBJECT_WORDS: WordItem[] = [
  { id: 1,  word: 'Science',           meaning: '과학 - 자연 현상을 연구하는 과목' },
  { id: 2,  word: 'History',           meaning: '역사 - 과거의 사건을 배우는 과목' },
  { id: 3,  word: 'Music',             meaning: '음악 - 소리로 예술을 표현하는 과목' },
  { id: 4,  word: 'Art',               meaning: '미술 - 그림이나 조각 등을 배우는 과목' },
  { id: 5,  word: 'English',           meaning: '영어 - 전 세계에서 공용어로 쓰이는 언어' },
  { id: 6,  word: 'Math',              meaning: '수학 - 수와 공간의 법칙을 배우는 과목' },
  { id: 7,  word: 'Physical Education',meaning: '체육 - 몸을 움직이고 운동을 배우는 과목' },
  { id: 8,  word: 'Geography',         meaning: '지리 - 세계의 지형과 환경을 배우는 과목' },
  { id: 9,  word: 'Social Studies',    meaning: '사회 - 사회의 현상과 구조를 배우는 과목' },
  { id: 10, word: 'Computer',          meaning: '컴퓨터 - 정보 기술과 코딩을 배우는 과목' },
];

export default function SubjectPage() {
  const router = useRouter();
  const [avatar, setAvatar]   = useState<Avatar>(AVATARS[0]);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    setAvatar(getSavedAvatar());
    setNickname(getSavedName());
  }, []);

  const [step, setStep]             = useState<'study' | 'game'>('study');
  const [loadingAudio, setLoadingAudio] = useState<number | null>(null);
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<WordItem[]>([]);
  const [userInput, setUserInput]   = useState('');
  const [score, setScore]           = useState(0);
  const [timeLeft, setTimeLeft]     = useState(30);

  const inputRef  = useRef<HTMLInputElement>(null);
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSpeak = useCallback((text: string, id: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    setLoadingAudio(id);
    u.onend = () => setLoadingAudio(null);
    window.speechSynthesis.speak(u);
  }, []);

  const endGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameStatus('finished');
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

  useEffect(() => {
    if (gameStatus === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    } else if (timeLeft === 0 && gameStatus === 'playing') {
      endGame();
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameStatus, timeLeft, endGame]);

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#312e81] font-sans">

      {/* App-style header */}
      <header className="w-full bg-white border-b-4 border-[#312e81] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#312e81] shadow-[2px_2px_0px_0px_rgba(49,46,129,1)] rounded-full flex items-center justify-center bg-white shrink-0">
            <img src={avatar.image} alt={avatar.name} className="w-9 h-9 object-contain" />
          </div>
          <span className="font-black text-sm uppercase italic leading-none">{nickname}</span>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4" />
          <span className="font-black text-sm uppercase italic tracking-wide">과목 마스터</span>
        </div>
        <button
          onClick={() => router.push('/explore')}
          className="p-2 border-2 border-[#312e81] rounded-lg shadow-[3px_3px_0px_0px_rgba(49,46,129,1)] bg-white active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
        >
          <MapIcon size={24} />
        </button>
      </header>

      <div className="max-w-7xl mx-auto p-6 md:p-10">

        {/* Step tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-white border-4 border-[#312e81] rounded-2xl shadow-[4px_4px_0px_0px_rgba(49,46,129,1)] overflow-hidden">
            <button
              onClick={() => setStep('study')}
              className={`px-8 py-3 font-black uppercase text-sm flex items-center gap-2 transition-all ${
                step === 'study' ? 'bg-[#312e81] text-white' : 'text-[#312e81] hover:bg-yellow-100'
              }`}
            >
              <Brain className="w-4 h-4" /> 학습하기
            </button>
            <div className="w-1 bg-[#312e81]" />
            <button
              onClick={() => { setStep('game'); setGameStatus('idle'); }}
              className={`px-8 py-3 font-black uppercase text-sm flex items-center gap-2 transition-all ${
                step === 'game' ? 'bg-[#312e81] text-white' : 'text-[#312e81] hover:bg-yellow-100'
              }`}
            >
              <Zap className="w-4 h-4" /> 퀴즈도전
            </button>
          </div>
        </div>

        {/* Study mode */}
        {step === 'study' && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {ALL_SUBJECT_WORDS.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-3xl border-4 border-[#312e81] shadow-[4px_4px_0px_0px_rgba(49,46,129,1)] text-center hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(49,46,129,1)] transition-all duration-200"
                >
                  <button
                    onClick={() => handleSpeak(item.word, item.id)}
                    className={`h-12 w-12 flex items-center justify-center rounded-2xl mx-auto mb-5 border-2 border-[#312e81] transition-all ${
                      loadingAudio === item.id
                        ? 'bg-[#312e81] text-white scale-90'
                        : 'bg-yellow-100 text-[#312e81] hover:bg-[#312e81] hover:text-white'
                    }`}
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <h3 className="text-xl font-black mb-1 tracking-tight">{item.word}</h3>
                  <p className="text-[#312e81]/60 text-sm font-medium leading-relaxed">
                    {item.meaning.split(' - ')[1]}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-16">
              <button
                onClick={() => { setStep('game'); setGameStatus('idle'); }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-orange-400 text-white font-black uppercase text-xl rounded-full border-4 border-orange-600 shadow-[4px_4px_0px_0px_rgba(194,65,12,0.4)] hover:scale-105 active:scale-95 transition-all"
              >
                준비 완료! 퀴즈 시작 <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Game mode */}
        {step === 'game' && (
          <div className="flex flex-col items-center justify-center py-6">

            {gameStatus === 'idle' && (
              <div className="text-center bg-white p-12 rounded-3xl border-4 border-[#312e81] shadow-[8px_8px_0px_0px_rgba(49,46,129,1)] max-w-lg w-full">
                <div className="w-20 h-20 bg-yellow-100 border-4 border-[#312e81] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_rgba(49,46,129,1)]">
                  <Keyboard className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-black mb-3 uppercase italic">Challenge Mode</h2>
                <p className="text-[#312e81]/60 mb-10 font-bold">10개 단어 중 랜덤으로 5문제가 출제됩니다.</p>
                <button
                  onClick={startGame}
                  className="w-full bg-[#312e81] text-white py-4 rounded-2xl font-black uppercase text-lg border-4 border-[#312e81] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 transition-all"
                >
                  START GAME
                </button>
              </div>
            )}

            {gameStatus === 'playing' && (
              <div className="w-full max-w-2xl space-y-6">
                <div className="flex justify-between items-center bg-white px-8 py-4 rounded-2xl border-4 border-[#312e81] shadow-[4px_4px_0px_0px_rgba(49,46,129,1)]">
                  <div className="flex items-center gap-3">
                    <Timer className="text-orange-500 w-6 h-6" />
                    <span className="text-3xl font-black tabular-nums">{timeLeft}s</span>
                  </div>
                  <div className="text-lg font-black">Q. {currentWordIndex + 1} / 5</div>
                </div>

                <div className="text-center py-20 rounded-3xl bg-[#312e81] text-white border-4 border-[#312e81] shadow-[8px_8px_0px_0px_rgba(49,46,129,0.4)]">
                  <p className="text-white/50 font-bold uppercase tracking-widest text-xs mb-4">아래 뜻에 맞는 영어는?</p>
                  <h2 className="text-6xl font-black">{shuffledWords[currentWordIndex]?.meaning.split(' - ')[0]}</h2>
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
                        setCurrentWordIndex((p) => p + 1);
                        setScore((s) => s + 1);
                        setUserInput('');
                      } else {
                        endGame();
                      }
                    }
                  }}
                  className="w-full bg-white border-4 border-[#312e81] focus:border-orange-400 p-8 rounded-3xl text-4xl font-black text-center outline-none shadow-[4px_4px_0px_0px_rgba(49,46,129,1)] transition-all placeholder:text-[#312e81]/30"
                  placeholder="Enter..."
                />
              </div>
            )}

            {gameStatus === 'finished' && (
              <div className="text-center">
                <div className="inline-flex p-6 bg-yellow-100 border-4 border-[#312e81] rounded-full mb-6 shadow-[4px_4px_0px_0px_rgba(49,46,129,1)]">
                  <CheckCircle2 className="w-16 h-16 text-[#312e81]" />
                </div>
                <h2 className="text-5xl font-black mb-10 uppercase italic">참 잘했어요! 🎉</h2>
                <div className="flex gap-6 justify-center mb-12">
                  <div className="bg-white p-8 rounded-3xl border-4 border-[#312e81] shadow-[6px_6px_0px_0px_rgba(49,46,129,1)] w-48">
                    <p className="text-xs font-black uppercase tracking-widest opacity-50 mb-2">My Score</p>
                    <p className="text-5xl font-black">{score}/5</p>
                  </div>
                </div>
                <button
                  onClick={startGame}
                  className="inline-flex items-center gap-3 px-10 py-4 bg-[#312e81] text-white font-black uppercase rounded-2xl border-4 border-[#312e81] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 transition-all"
                >
                  <RotateCcw /> 다시 도전
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
