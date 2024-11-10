import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/GlobeView.tsx';
import './index.css';
import './App.css';
import { ThemeWrapper } from './wrappers/theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { WireGuard } from './pages/WireGuard.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  { path: '/wireGuard', element: <WireGuard /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeWrapper>
      <RouterProvider router={router} />
    </ThemeWrapper>
  </React.StrictMode>,
);
