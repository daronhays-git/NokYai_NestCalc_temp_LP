import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Fade in body after fonts are ready
if (document.fonts?.ready) {
  document.fonts.ready.then(() => document.body.classList.add('loaded'))
} else {
  window.addEventListener('load', () => document.body.classList.add('loaded'))
}
