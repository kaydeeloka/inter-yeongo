'use client';

import React, { useState } from 'react';
import { Volume2, ChevronRight, CheckCircle2, RotateCcw, School } from 'lucide-react';

const SCHOOL_SUPPLIES: Array<{ id: number; word: string; meaning: string; imageUrl: string }> = [
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

export default function App() {
  const [step, setStep] = useState<'study' | 'quiz' | 'result'>('study');
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [quizIdx, setQuizIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong'; message: string } | null>(null);

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

  const handleQuizSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const currentWord = SCHOOL_SUPPLIES[quizIdx].word.toLowerCase().replace(/[^a-z]/g, '');
    const cleanInput = userInput.toLowerCase().replace(/[^a-z]/g, '');

    if (cleanInput === currentWord) {
      setScore(prev => prev + 1);
      setFeedback({ type: 'correct', message: '정답입니다! 참 잘했어요!' });
    } else {
      setFeedback({ type: 'wrong', message: `아쉬워요. 정답은 '${SCHOOL_SUPPLIES[quizIdx].word}'입니다.` });
    }

    setTimeout(() => {
      setFeedback(null);
      setUserInput('');
      if (quizIdx < SCHOOL_SUPPLIES.length - 1) {
        setQuizIdx(quizIdx + 1);
      } else {
        setStep('result');
      }
    }, 2000);
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
          <div className="max-w-md mx-auto animate-in">
            <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6">
                <span className="text-slate-300 font-black text-4xl">{quizIdx + 1}/10</span>
              </div>

              <div className="flex justify-center mb-8">
                <div className="w-48 h-48 bg-white rounded-3xl shadow-lg overflow-hidden border-4 border-white flex items-center justify-center">
                  <img 
                    src={SCHOOL_SUPPLIES[quizIdx].imageUrl} 
                    alt="Quiz" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <form onSubmit={handleQuizSubmit} className="space-y-6">
                <div className="text-center">
                  <p className="text-slate-500 font-bold mb-2">사진 속 물건의 영어 이름은?</p>
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

                <button 
                  type="submit"
                  disabled={!userInput || feedback !== null}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-black transition-all disabled:opacity-30"
                >
                  CHECK ANSWER
                </button>
              </form>

              {feedback && (
                <div className={`mt-6 p-4 rounded-2xl border-2 text-center animate-bounce ${feedback.type === 'correct' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-rose-50 border-rose-200 text-rose-600'}`}>
                  <p className="font-black text-lg">{feedback.message}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 'result' && (
          <div className="text-center py-20 bg-indigo-50 rounded-[3rem] border-4 border-dashed border-indigo-200 animate-in">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <CheckCircle2 className="w-12 h-12 text-indigo-600" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-2">학습 완료!</h2>
            <p className="text-indigo-600 font-bold text-2xl mb-10">점수: {score} / 10</p>
            <button 
              onClick={() => {
                setStep('study');
                setScore(0);
                setQuizIdx(0);
                setFlipped({});
              }} 
              className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 flex items-center gap-2 mx-auto shadow-lg"
            >
              <RotateCcw className="w-5 h-5" /> 다시 공부하기
            </button>
          </div>
        )}

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