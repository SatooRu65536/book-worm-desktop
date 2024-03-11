import React from 'react';
import ReactDOM from 'react-dom/client';
import TopPage from './pages/TopPage';
import './global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TopPage />
  </React.StrictMode>
);
