import { Sparkles } from 'lucide-react';

export default function TravelAssistant() {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center border-4 border-dashed border-[#312e81] rounded-[2.5rem] bg-white opacity-60">
      <div className="bg-indigo-100 p-4 rounded-full mb-4">
        <Sparkles size={36} className="text-indigo-600" />
      </div>
      <p className="font-black text-lg mb-1">AI English Coach</p>
      <p className="text-[10px] font-bold opacity-60 uppercase">AI 코칭 기능 준비 중...</p>
    </div>
  );
}
