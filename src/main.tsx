import ReactDOM from 'react-dom/client';
import TopPage from './pages/TopPage';
import './global.css';
import { Provider } from 'jotai';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
