import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import App from './App.tsx';
// import UIKitShowcase from './UIKitShowcase.tsx';
import { CrodaDashboard } from './ui-kit';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CrodaDashboard />
    {/* Switch between: */}
    {/* <App /> - Original demo */}
    {/* <UIKitShowcase /> - UI Kit showcase */}
    {/* <CrodaDashboard /> - CRODA dashboard */}
  </StrictMode>,
);

