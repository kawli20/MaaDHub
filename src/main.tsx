import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { LanguageProvider } from '@/hooks/useLanguage'
import { ClerkProvider } from '@/lib/clerk'
import './index.css'
import App from './App.tsx'

// Register Service Worker for caching (no install prompt)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ClerkProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ClerkProvider>
  </BrowserRouter>,
)
