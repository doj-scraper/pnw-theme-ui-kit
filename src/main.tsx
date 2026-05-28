import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/table/lib/css/table.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import './index.css';
import App from './App.tsx';
// Uncomment to see the UI Kit showcase:
// import UIKitShowcase from './UIKitShowcase.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* Uncomment to see the UI Kit showcase: */}
    {/* <UIKitShowcase /> */}
  </StrictMode>,
);
