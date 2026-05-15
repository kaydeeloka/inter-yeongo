'use client';

import { useState } from 'react';
import { Map as MapIcon, Gamepad2, LayoutGrid, MessageSquare } from 'lucide-react';

import FrogMascot from '@/components/FrogMascot';
import LandingPage from '@/components/LandingPage';
import AvatarSelection from '@/components/AvatarSelection';
import TopicMap from '@/components/TopicMap';
import ExpressionsList from '@/components/ExpressionsList';
import VarietyGame from '@/components/VarietyGame';
import TravelAssistant from '@/components/TravelAssistant';
import NavBtn from '@/components/NavBtn';
import { AVATARS } from '@/data/avatars';
import type { Avatar } from '@/types';

type View = 'landing' | 'avatars' | 'topics' | 'app';
type Tab = 'expressions' | 'game' | 'assistant';

export default function Home() {
  const [view, setView] = useState<View>('landing');
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar>(AVATARS[0]);
  const [activeTab, setActiveTab] = useState<Tab>('expressions');
  const [activeTrack, setActiveTrack] = useState('DAILY');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('전체');
  const [bookmarks] = useState<number[]>([]);

  if (view === 'landing') {
    return <LandingPage onStart={() => setView('avatars')} avatar={selectedAvatar} />;
  }
  if (view === 'avatars') {
    return (
      <AvatarSelection
        onSelect={(a) => { setSelectedAvatar(a); setView('topics'); }}
        onBack={() => setView('landing')}
      />
    );
  }
  if (view === 'topics') {
    return (
      <TopicMap
        avatar={selectedAvatar}
        onSelect={(track, cat) => { setActiveTrack(track); setActiveCategory(cat); setView('app'); }}
        onBack={() => setView('avatars')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col font-sans text-[#312e81]">
      <header className="bg-white border-b-4 border-[#312e81] p-4 sticky top-0 z-50 flex justify-between items-center">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setView('landing')}
        >
          <div className="w-10 h-10 border-2 border-[#312e81] shadow-[2px_2px_0px_0px_rgba(49,46,129,1)] rounded-full flex items-center justify-center bg-white relative">
            <FrogMascot className="w-9 h-9 translate-y-0.5" color={selectedAvatar.color} accessory={selectedAvatar.accessory} />
          </div>
          <h1 className="font-black text-xl tracking-tighter uppercase italic">RIBBIT</h1>
        </div>
        <button
          onClick={() => setView('topics')}
          className="p-2 hover:bg-indigo-50 rounded-lg border-2 border-[#312e81] shadow-[3px_3px_0px_0px_rgba(49,46,129,1)] bg-white active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
        >
          <MapIcon size={24} />
        </button>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-4 pt-8 pb-32">
        {activeTab === 'expressions' && (
          <ExpressionsList
            activeTrack={activeTrack}
            setActiveTrack={setActiveTrack}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            bookmarks={bookmarks}
          />
        )}
        {activeTab === 'game' && <VarietyGame avatar={selectedAvatar} />}
        {activeTab === 'assistant' && <TravelAssistant />}
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-white border-4 border-[#312e81] shadow-[8px_8px_0px_0px_rgba(49,46,129,1)] rounded-3xl flex justify-around items-center p-3 z-50">
        <NavBtn active={activeTab === 'expressions'} onClick={() => setActiveTab('expressions')} icon={<LayoutGrid size={24} />} label="표현" color="bg-yellow-200" />
        <NavBtn active={activeTab === 'game'} onClick={() => setActiveTab('game')} icon={<Gamepad2 size={24} />} label="게임" color="bg-pink-300" />
        <NavBtn active={activeTab === 'assistant'} onClick={() => setActiveTab('assistant')} icon={<MessageSquare size={24} />} label="질문" color="bg-indigo-300" />
      </nav>
    </div>
  );
}
