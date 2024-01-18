import './index.css';
import App from './App';
import React from 'react';
import '../src/font/font.css';
import { BrowserRouter } from 'react-router-dom';
import TabBar from './components/ui/tabBar/tabBar';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <TabBar />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
