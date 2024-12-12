import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { FundMeProvider } from './context/FundMeContext.jsx';

createRoot(document.getElementById('root')).render(
  <FundMeProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </FundMeProvider>
)
