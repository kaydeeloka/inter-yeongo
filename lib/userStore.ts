import type { Avatar } from '@/types';
import { AVATARS } from '@/data/avatars';

export const saveUser = (avatarId: string, name: string) => {
  localStorage.setItem('ribbit_avatar_id', avatarId);
  localStorage.setItem('ribbit_user_name', name);
};

export const saveLastTopic = (track: string, cat: string) => {
  localStorage.setItem('ribbit_track', track);
  localStorage.setItem('ribbit_cat', cat);
};

export const getSavedAvatar = (): Avatar =>
  AVATARS.find((a) => a.id === (localStorage.getItem('ribbit_avatar_id') ?? AVATARS[0].id)) ?? AVATARS[0];

export const getSavedName = (): string =>
  localStorage.getItem('ribbit_user_name') ?? '';

export const getSavedTopic = () => ({
  track: localStorage.getItem('ribbit_track') ?? 'DAILY',
  cat: localStorage.getItem('ribbit_cat') ?? '전체',
});
