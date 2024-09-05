import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { UserProfileProvider } from './contexts/ProfileDataContext'; 
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <CurrentUserProvider>
        <UserProfileProvider>
          <App />
        </UserProfileProvider>
      </CurrentUserProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();