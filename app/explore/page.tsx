'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopicMap from '@/components/TopicMap';
import { getSavedAvatar, saveLastTopic } from '@/lib/userStore';
import { AVATARS } from '@/data/avatars';
import type { Avatar } from '@/types';

export default function ExplorePage() {
  const router = useRouter();
  const [avatar, setAvatar] = useState<Avatar>(AVATARS[0]);

  useEffect(() => {
    setAvatar(getSavedAvatar());
  }, []);

  const handleSelect = (track: string, cat: string) => {
    saveLastTopic(track, cat);
    router.push(track);
  };

  return (
    <TopicMap
      avatar={avatar}
      onSelect={handleSelect}
      onBack={() => router.push('/avatar')}
    />
  );
}
