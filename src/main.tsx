import ReactDOM from 'react-dom/client';
import TopPage from './pages/TopPage';
import './global.css';
import { Provider } from 'jotai';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider>
    <TopPage />
  </Provider>
);
