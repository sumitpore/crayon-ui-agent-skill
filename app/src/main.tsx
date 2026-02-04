import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@crayonai/react-ui';
import App from './App';
import '@crayonai/react-ui/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
