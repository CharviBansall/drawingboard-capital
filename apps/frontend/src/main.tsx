import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { DarkModeProvider } from './contexts/DarkModeContext';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </StrictMode>,
);
