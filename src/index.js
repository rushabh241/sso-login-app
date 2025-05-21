import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId='914058030545-pnuc7l4r9qk2dtc9jb1oq41cioajm3tk.apps.googleusercontent.com'>
    <App />
  </GoogleOAuthProvider>
)