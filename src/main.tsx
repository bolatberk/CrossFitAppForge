import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import AppV2 from './AppV2';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    'Uygulama başlatılamadı: #root elementi bulunamadı.'
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <AppV2 />
  </StrictMode>
);
