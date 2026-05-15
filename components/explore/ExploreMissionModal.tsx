'use client';

import { useCallback, useEffect, useId, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, ChevronRight, Mic, School, User, X } from 'lucide-react';

import type { RoadmapLesson, RoadmapModalIcon } from '@/data/explore-roadmap';

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function ModalHeaderIcon({ icon }: { icon: RoadmapModalIcon }) {
  const cls = 'h-12 w-12 sm:h-14 sm:w-14 text-white';
  switch (icon) {
    case 'speaking': return <Mic className={cls} strokeWidth={1.75} aria-hidden />;
    case 'classroom': return <School className={cls} strokeWidth={1.75} aria-hidden />;
    case 'subjects': return <BookOpen className={cls} strokeWidth={1.75} aria-hidden />;
    default: return <User className={cls} strokeWidth={1.75} aria-hidden />;
  }
}

function ModalInner({ lesson, onClose }: { lesson: RoadmapLesson; onClose: () => void }) {
  const router = useRouter();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const getFocusables = useCallback((): HTMLElement[] => {
    const root = panelRef.current;
    if (!root) return [];
    return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
    );
  }, []);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    const id = window.requestAnimationFrame(() => { closeBtnRef.current?.focus(); });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.cancelAnimationFrame(id);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus?.();
    };
  }, [onClose]);

  const onPanelKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== 'Tab' || !panelRef.current) return;
      const els = getFocusables();
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else if (document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    },
    [getFocusables]
  );

  const go = useCallback(() => {
    router.push(lesson.route);
    onClose();
  }, [lesson.route, onClose, router]);

  return (
    <motion.div
      className="fixed inset-0 z-200 flex items-end justify-center p-3 sm:items-center sm:p-4 scheme-light"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <button
        type="button"
        tabIndex={-1}
        className="absolute inset-0 bg-[#312e81]/30 backdrop-blur-[2px]"
        aria-label="닫기"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={onPanelKeyDown}
        className="relative z-1 flex max-h-[min(92dvh,680px)] w-full max-w-md flex-col overflow-hidden rounded-3xl border-4 border-[#312e81] bg-white shadow-[8px_8px_0px_0px_rgba(49,46,129,1)] sm:max-w-lg"
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="relative shrink-0 bg-[#312e81] px-6 pb-8 pt-10 text-center text-white">
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl border-2 border-white/30 text-white transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="닫기"
          >
            <X className="h-5 w-5" strokeWidth={2.5} />
          </button>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white/20 bg-white/10">
            <ModalHeaderIcon icon={lesson.modal.icon} />
          </div>
          <h2 id={titleId} className="text-xl font-black uppercase italic leading-tight tracking-tight sm:text-2xl">
            {lesson.modal.title}
          </h2>
          <p className="mt-1 text-sm font-bold text-white/70">{lesson.modal.subtitleKo}</p>
        </header>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#FFFBEB] px-6 py-5">
          <p className="text-sm font-medium leading-relaxed text-[#312e81]/70">{lesson.modal.description}</p>
          <p className="mt-5 text-xs font-black uppercase tracking-widest text-[#312e81]">Features</p>
          <ul className="mt-3 space-y-2.5">
            {lesson.modal.features.map((line) => (
              <li key={line} className="flex gap-3 text-sm font-bold leading-snug text-[#312e81]">
                <span
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[#312e81] bg-yellow-300"
                  aria-hidden
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <footer className="shrink-0 border-t-4 border-[#312e81] bg-white px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={go}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border-4 border-orange-600 bg-orange-400 px-4 py-3.5 text-center text-sm font-black uppercase italic text-white shadow-[4px_4px_0px_0px_rgba(194,65,12,0.4)] transition hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            {lesson.modal.cta}
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
          <p className="mt-2 text-center text-[11px] font-bold text-[#312e81]/40">{lesson.modal.ctaHint}</p>
        </footer>
      </motion.div>
    </motion.div>
  );
}

interface ExploreMissionModalProps {
  lesson: RoadmapLesson | null;
  onClose: () => void;
}

export default function ExploreMissionModal({ lesson, onClose }: ExploreMissionModalProps) {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {lesson ? <ModalInner key={lesson.id} lesson={lesson} onClose={onClose} /> : null}
    </AnimatePresence>,
    document.body
  );
}
