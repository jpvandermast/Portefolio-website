import { useEffect, useState } from 'react';
import type { SprintLuBeoordeling } from '../types';
import { getSprintLuBeoordelingen } from './stories';

/** Zelfbeoordeling per sprint en leeruitkomst (tabel sprint_leeruitkomsten). Faalt stil: dan geen niveau-chips. */
export function useSprintLu() {
  const [items, setItems] = useState<SprintLuBeoordeling[]>([]);
  useEffect(() => {
    let cancelled = false;
    getSprintLuBeoordelingen()
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch((err) => console.error('Zelfbeoordelingen laden mislukt', err));
    return () => {
      cancelled = true;
    };
  }, []);
  return { items };
}
