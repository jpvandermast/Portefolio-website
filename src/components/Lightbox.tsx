import React, { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useFocusTrap } from '../lib/useFocusTrap';

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

export const Lightbox: React.FC<LightboxProps> = ({ images, index, onIndexChange, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const image = images[index];
  const multiple = images.length > 1;

  useFocusTrap(ref, true);

  const go = useCallback(
    (delta: number) => onIndexChange((index + delta + images.length) % images.length),
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previous?.focus();
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
    'absolute w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white';

  return createPortal(
    <div
      ref={ref}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Afbeelding vergroot"
      className="fixed inset-0 z-[80] bg-black/90 flex flex-col items-center justify-center p-4 sm:p-10"
      onClick={onClose}
    >
      <button ref={closeRef} type="button" onClick={onClose} aria-label="Afbeelding sluiten" className={`${btn} top-4 right-4`}>
        <X className="w-6 h-6" />
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
            <ChevronLeft className="w-6 h-6" />
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
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
      <img
        src={image.src}
        alt={image.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-[80vh] object-contain rounded-[4px] bg-white"
      />
      <p className="mt-4 max-w-3xl text-center text-[13px] text-white/90" onClick={(e) => e.stopPropagation()}>
        {image.alt}
        {multiple && <span className="block mt-1 text-white/60">{index + 1} / {images.length}</span>}
      </p>
    </div>,
    document.body,
  );
};
