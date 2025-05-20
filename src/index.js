import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId='654292158988-jshva4oousf3q4qar7j70t26cjqfbmtf.apps.googleusercontent.com'>
    <App />
  </GoogleOAuthProvider>
)