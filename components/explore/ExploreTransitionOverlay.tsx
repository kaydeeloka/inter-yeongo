'use client';

import { AnimatePresence, motion } from 'framer-motion';

interface ExploreTransitionOverlayProps {
  open: boolean;
}

export default function ExploreTransitionOverlay({ open }: ExploreTransitionOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white/75 px-6 backdrop-blur-[2px] [color-scheme:light]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            className="flex max-w-xs flex-col items-center rounded-2xl border border-emerald-200/80 bg-white px-8 py-6 shadow-lg shadow-emerald-900/10"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          >
            <motion.div
              className="mb-3 h-10 w-10 rounded-full border-2 border-emerald-400 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
              aria-hidden
            />
            <p className="text-center text-sm font-bold text-stone-800">구역으로 이동 중...</p>
            <p className="mt-1 text-center text-xs text-stone-500">잠시만 기다려 주세요</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
