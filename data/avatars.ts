import type { Avatar } from '@/types';

export const AVATARS: Avatar[] = [
  { id: 'classic',  name: 'Freshman Frog', color: '#4ade80', accessory: 'none',       desc: '새내기 개구리', image: '/avatar/freshman.svg'  },
  { id: 'studious', name: 'Ace Frog',      color: '#60a5fa', accessory: 'glasses',    desc: '과탑 개구리',   image: '/avatar/ace.svg'       },
  { id: 'sporty',   name: 'Varsity Frog',  color: '#f87171', accessory: 'cap',        desc: '동아리 개구리', image: '/avatar/sporty.svg'    },
  { id: 'artist',   name: 'Creative Frog', color: '#fbbf24', accessory: 'beret',      desc: '예대 개구리',   image: '/avatar/artistic.svg'  },
  { id: 'gamer',    name: 'Gamer Frog',    color: '#a78bfa', accessory: 'headphones', desc: '게이머 개구리', image: '/avatar/gamer.svg'     },
  { id: 'coding',   name: 'Coding Frog',   color: '#f472b6', accessory: 'ribbon',     desc: '코딩 개구리',   image: '/avatar/coding.svg'    },
];
