import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Project } from '../types';
import { getProjecten } from './projecten';

interface ProjectenState {
  status: 'loading' | 'error' | 'ready';
  projecten: Project[];
  reload: () => void;
}

const ProjectenContext = createContext<ProjectenState>({ status: 'loading', projecten: [], reload: () => {} });

/** Haalt projecten bij elk bezoek op, zodat ze zonder deploy verschijnen. */
export const ProjectenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<ProjectenState['status']>('loading');
  const [projecten, setProjecten] = useState<Project[]>([]);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    getProjecten()
      .then((data) => {
        if (cancelled) return;
        setProjecten(data);
        setStatus('ready');
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Projecten laden mislukt', err);
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  return <ProjectenContext.Provider value={{ status, projecten, reload }}>{children}</ProjectenContext.Provider>;
};

export const useProjecten = () => useContext(ProjectenContext);
