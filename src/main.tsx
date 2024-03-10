import React from 'react';
import ReactDOM from 'react-dom/client';
import TopPage from './pages/TopPage';
import './global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LendingPage from './pages/LendingPage';
import ReturnPage from './pages/ReturnPage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/lending" element={<LendingPage />} />
        <Route path="/return" element={<ReturnPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
