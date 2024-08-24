import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import WalletContextProvider from "./contexts/WalletContext";


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <WalletContextProvider>
    <App />
  </WalletContextProvider>
  </StrictMode>,
)
