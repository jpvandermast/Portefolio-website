import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router';
import App from './App.tsx';
import {StoriesProvider} from './lib/StoriesContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StoriesProvider>
        <App />
      </StoriesProvider>
    </BrowserRouter>
  </StrictMode>,
);
