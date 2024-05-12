import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import NavMenu from './components/NavMenu.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import Footer from './components/Footer.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavMenu />
    <div id="App">
      <App />
      <Footer />
    </div>
  </React.StrictMode>,
)
