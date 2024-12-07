import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/themeModeContext.jsx'
import { CollapseProvider } from './context/collapseContext.jsx'
import "./i18n"
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <CollapseProvider>
        <App />
      </CollapseProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
