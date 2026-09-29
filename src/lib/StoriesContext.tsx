import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { StoryOverviewItem } from '../types';
import { getStoryOverview } from './stories';

interface StoriesState {
  status: 'loading' | 'error' | 'ready';
  stories: StoryOverviewItem[];
  reload: () => void;
}

const StoriesContext = createContext<StoriesState>({ status: 'loading', stories: [], reload: () => {} });

/** Haalt het story-overzicht bij elk bezoek op (niet tijdens de build). */
export const StoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<StoriesState['status']>('loading');
  const [stories, setStories] = useState<StoryOverviewItem[]>([]);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    getStoryOverview()
      .then((data) => {
        if (cancelled) return;
        setStories(data);
        setStatus('ready');
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Stories laden mislukt', err);
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  return <StoriesContext.Provider value={{ status, stories, reload }}>{children}</StoriesContext.Provider>;
};

export const useStories = () => useContext(StoriesContext);
