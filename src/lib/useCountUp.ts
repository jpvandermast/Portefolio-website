import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

/** Telt op van 0 naar `target` (ease-out). Bij reduced motion meteen de eindwaarde. */
export function useCountUp(target: number | null, duration = 1100): number | null {
  const reduce = useReducedMotion();
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    if (target === null) return setValue(null);
    if (reduce || target === 0) return setValue(target);
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, reduce]);

  return value;
}
