import React, { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useFocusTrap } from '../../lib/useFocusTrap';

export interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

/** Afbeelding vergroot: focus-trap, Esc sluit alleen de lightbox, pijltjes bladeren. */
export const Lightbox: React.FC<LightboxProps> = ({ images, index, onIndexChange, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const image = images[index];
  const multiple = images.length > 1;

  useFocusTrap(ref, true);

  const go = useCallback(
    (delta: number) => onIndexChange((index + delta + images.length) % images.length),
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      } else if (multiple && e.key === 'ArrowLeft') go(-1);
      else if (multiple && e.key === 'ArrowRight') go(1);
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [go, multiple, onClose]);

  if (!image) return null;

  const btn =
    'absolute grid place-items-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white ring-1 ring-white/15 backdrop-blur transition-colors';

  return createPortal(
    <motion.div
      ref={ref}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Afbeelding vergroot"
      className="on-dark fixed inset-0 z-[90] bg-night/92 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-12"
      onClick={onClose}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <button ref={closeRef} type="button" onClick={onClose} aria-label="Afbeelding sluiten" className={`${btn} top-4 right-4`}>
        <X className="w-5 h-5" />
      </button>
      {multiple && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Vorige afbeelding"
            className={`${btn} left-3 sm:left-6 top-1/2 -translate-y-1/2`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Volgende afbeelding"
            className={`${btn} right-3 sm:right-6 top-1/2 -translate-y-1/2`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
      <motion.img
        key={image.src}
        src={image.src}
        alt={image.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-[78vh] object-contain rounded-card bg-white shadow-panel"
        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      <p className="mt-4 max-w-3xl text-center text-[0.875rem] text-white/85" onClick={(e) => e.stopPropagation()}>
        {image.alt}
        {multiple && (
          <span className="block mt-1 font-mono text-[0.75rem] text-white/60">
            {index + 1} / {images.length}
          </span>
        )}
      </p>
    </motion.div>,
    document.body,
  );
};
