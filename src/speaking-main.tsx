import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import SpeakingApp from './SpeakingApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SpeakingApp />
  </StrictMode>,
)
