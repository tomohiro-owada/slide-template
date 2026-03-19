import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DeckViewer } from './DeckViewer.tsx'

// ?deck=deck.json があれば DeckViewer、なければテンプレート一覧
const params = new URLSearchParams(window.location.search);
const deckUrl = params.get('deck');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {deckUrl ? <DeckViewer deckUrl={deckUrl} /> : <App />}
  </StrictMode>,
)
