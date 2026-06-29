import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

// Register PWA Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => console.log('SW registered:', reg.scope))
      .catch((err) => console.warn('SW registration failed:', err));
  });
}

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);

// Remove app shell after React's first paint
// Double rAF: first frame = React DOM commit, second = browser paint
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const shell = document.getElementById('app-shell');
    if (!shell) return;
    shell.classList.add('fade-out');
    shell.addEventListener('transitionend', () => shell.remove(), { once: true });
  });
});
