'use client';

import { useCallback, useEffect, useId, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Mic, School, User, X } from 'lucide-react';

import type { RoadmapLesson, RoadmapModalIcon } from '@/data/explore-roadmap';

const HEADER_PINK = 'bg-[#ff4d8d]';
const CTA_PINK = 'bg-[#ff4d8d] hover:bg-[#ff3a84] active:bg-[#f2297a]';

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function ModalHeaderIcon({ icon }: { icon: RoadmapModalIcon }) {
  const cls = 'h-12 w-12 text-white sm:h-14 sm:w-14';
  switch (icon) {
    case 'speaking':
      return <Mic className={cls} strokeWidth={1.75} aria-hidden />;
    case 'classroom':
      return <School className={cls} strokeWidth={1.75} aria-hidden />;
    case 'subjects':
      return <BookOpen className={cls} strokeWidth={1.75} aria-hidden />;
    default:
      return <User className={cls} strokeWidth={1.75} aria-hidden />;
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

    const id = window.requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
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
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
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
      <button
        type="button"
        tabIndex={-1}
        className="absolute inset-0 bg-stone-900/45 backdrop-blur-[2px]"
        aria-label="닫기"
        onClick={onClose}
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={onPanelKeyDown}
        className="relative z-1 flex max-h-[min(92dvh,720px)] w-full max-w-md flex-col overflow-hidden rounded-[1.25rem] bg-white shadow-2xl shadow-stone-900/25 sm:max-w-lg"
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={`relative shrink-0 px-6 pb-8 pt-10 text-center text-white ${HEADER_PINK}`}>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="닫기"
          >
            <X className="h-5 w-5" strokeWidth={2.5} />
          </button>
          <div className="mx-auto flex justify-center">
            <ModalHeaderIcon icon={lesson.modal.icon} />
          </div>
          <h2 id={titleId} className="mt-4 text-xl font-bold leading-tight sm:text-2xl">
            {lesson.modal.title}
          </h2>
          <p className="mt-1 text-sm font-medium text-white/95">{lesson.modal.subtitleKo}</p>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
          <p className="text-sm leading-relaxed text-[#6F6A8A]">{lesson.modal.description}</p>
          <p className="mt-5 text-sm font-bold text-[#1F1D3D]">Features:</p>
          <ul className="mt-2 space-y-2.5">
            {lesson.modal.features.map((line) => (
              <li key={line} className="flex gap-2.5 text-sm leading-snug text-[#1F1D3D]">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full border-2 border-[#ff4d8d] bg-white"
                  aria-hidden
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <footer className="shrink-0 border-t border-[#302B8F]/12 bg-white px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={go}
            className={`w-full rounded-xl px-4 py-3.5 text-center text-sm font-bold text-white shadow-md transition ${CTA_PINK} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4d8d]`}
          >
            {lesson.modal.cta}
          </button>
          <p className="mt-2 text-center text-[11px] text-[#6F6A8A]">{lesson.modal.ctaHint}</p>
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
