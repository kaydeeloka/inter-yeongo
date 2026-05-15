'use client';

import { useEffect, useState } from 'react';

const WIDE_MQ = '(min-width: 768px)';

/**
 * `true` = md+ horizontal roadmap; `false` = narrow vertical stack curve.
 * SSR-safe default `false` until mount.
 */
export function useWideRoadmapLayout(): boolean {
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(WIDE_MQ);
    const apply = () => setWide(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return wide;
}
