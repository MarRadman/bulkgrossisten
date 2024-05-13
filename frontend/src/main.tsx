import React from 'react';
import ReactDOM from 'react-dom/client';
import NavMenu from './components/NavMenu';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import App from './router/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavMenu />
    <div id="App">
      <App />
    </div>
    <Footer />
  </React.StrictMode>,
)
