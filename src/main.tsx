import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/table/lib/css/table.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
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

