'use client';

import { useId } from 'react';
import { motion } from 'framer-motion';

interface RoadmapPathProps {
  pathD: string;
  /** Emphasize path while user hovers a node */
  emphasized: boolean;
}

export default function RoadmapPath({ pathD, emphasized }: RoadmapPathProps) {
  const gid = useId().replace(/:/g, '');

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={`rp-line-${gid}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7aab84" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#5c8f6a" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#7aab84" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path
        d={pathD}
        fill="none"
        stroke={`url(#rp-line-${gid})`}
        strokeWidth={emphasized ? 1.55 : 1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1.2 2.8"
        className="transition-[stroke-width,opacity] duration-300"
        style={{ opacity: emphasized ? 1 : 0.88 }}
      />
      <motion.path
        d={pathD}
        fill="none"
        stroke="#6a9b78"
        strokeWidth={emphasized ? 0.65 : 0.45}
        strokeLinecap="round"
        strokeDasharray="4 6"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -28 }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'linear' }}
        style={{ opacity: emphasized ? 0.55 : 0.38 }}
      />
    </svg>
  );
}
