import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router';
import App from './App.tsx';
import {StoriesProvider} from './lib/StoriesContext.tsx';
import {ProjectenProvider} from './lib/ProjectenContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StoriesProvider>
        <ProjectenProvider>
          <App />
        </ProjectenProvider>
      </StoriesProvider>
    </BrowserRouter>
  </StrictMode>,
);
