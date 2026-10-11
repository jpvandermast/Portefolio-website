import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { MotionConfig } from 'motion/react';
import App from './App.tsx';
import { StoriesProvider } from './lib/StoriesContext.tsx';
import { ProjectenProvider } from './lib/ProjectenContext.tsx';
import { ChatProvider } from './lib/ChatContext.tsx';
import { SearchProvider } from './lib/SearchContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* reducedMotion="user": motion volgt prefers-reduced-motion van het systeem */}
      <MotionConfig reducedMotion="user">
        <StoriesProvider>
          <ProjectenProvider>
            <ChatProvider>
              <SearchProvider>
                <App />
              </SearchProvider>
            </ChatProvider>
          </ProjectenProvider>
        </StoriesProvider>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
);
