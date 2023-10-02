import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'sonner'

import App from './App.tsx'
import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster richColors position="top-right" theme="dark" />
  </React.StrictMode>,
)
