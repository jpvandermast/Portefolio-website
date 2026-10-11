import { learningOutcomes } from '../../shared/portfolioContent';
import type { LearningOutcome } from '../types';

/**
 * Vaste kleur per leeruitkomst. Klassen staan hier voluit (geen string-opbouw), zodat Tailwind ze vindt.
 * `color` is de CSS-variabele voor SVG en inline stijlen.
 */
export const LU_STYLES: Record<number, { dot: string; ink: string; soft: string; ring: string; color: string }> = {
  1: { dot: 'bg-lu-1', ink: 'text-lu-1-ink', soft: 'bg-lu-1-soft', ring: 'ring-lu-1/25', color: 'var(--color-lu-1)' },
  2: { dot: 'bg-lu-2', ink: 'text-lu-2-ink', soft: 'bg-lu-2-soft', ring: 'ring-lu-2/25', color: 'var(--color-lu-2)' },
  3: { dot: 'bg-lu-3', ink: 'text-lu-3-ink', soft: 'bg-lu-3-soft', ring: 'ring-lu-3/30', color: 'var(--color-lu-3)' },
  4: { dot: 'bg-lu-4', ink: 'text-lu-4-ink', soft: 'bg-lu-4-soft', ring: 'ring-lu-4/25', color: 'var(--color-lu-4)' },
  5: { dot: 'bg-lu-5', ink: 'text-lu-5-ink', soft: 'bg-lu-5-soft', ring: 'ring-lu-5/25', color: 'var(--color-lu-5)' },
};

export function getLearningOutcome(nummer: number): LearningOutcome | undefined {
  return learningOutcomes.find((lu) => lu.nummer === nummer);
}

/** "lu3" -> 3; ongeldig -> null */
export function parseLuParam(value: string | undefined | null): number | null {
  const match = /^lu([1-5])$/i.exec(value ?? '');
  return match ? Number(match[1]) : null;
}

export const luPath = (nummer: number) => `/leeruitkomsten/lu${nummer}`;
