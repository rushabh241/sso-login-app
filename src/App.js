// App.js
import React, { useState } from 'react';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './authConfig';
import Home from './home';

const msalInstance = new PublicClientApplication(msalConfig);
const microsoftLogo = "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg";

// Allowed email domains
const allowedDomains = ['iconcile.com', 'google.com'];

function LoginPage({ onGoogleLogin, onMicrosoftLogin }) {
  const { instance } = useMsal();

  const handleMicrosoftLogin = () => {
    instance.loginPopup({
      scopes: ['user.read'],
    })
      .then((response) => {
        console.log('Microsoft Login Success:', response);

        const account = response.account;
        const domain = account.username.split('@')[1]; // Extract domain

        if (allowedDomains.includes(domain)) {
          onMicrosoftLogin(account);
        } else {
          alert(`Access denied. Only users from ${allowedDomains.join(' or ')} are allowed.`);
        }
      })
      .catch((error) => {
        console.error('Microsoft Login Error:', error);
        alert('Microsoft login failed: ' + error.message);
      });
  };

  return (
    <div className="App">
      <h1>SSO Login Demo</h1>

      {/* Microsoft SSO Button */}
      <div className="sso-button">
        <button className="custom-sso-button" onClick={handleMicrosoftLogin}>
          <img src={microsoftLogo} alt="Microsoft" className="sso-logo" />
          <span>Sign in with Microsoft</span>
        </button>
      </div>

      <br /><br />

      {/* Google SSO Button */}
      <div className="sso-button">
        <GoogleLogin
          onSuccess={onGoogleLogin}
          onError={() => alert('Google login failed')}
          theme="outline"
          size="large"
        />
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleGoogleLogin = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('Google Login Success:', decoded);

    const domain = decoded.email.split('@')[1]; // Extract domain

    if (allowedDomains.includes(domain)) {
      setUser(decoded);
      navigate('/home');
    } else {
      alert(`Access denied. Only users from ${allowedDomains.join(' or ')} are allowed.`);
    }
  };

  const handleMicrosoftLogin = (account) => {
    setUser(account);
    navigate('/home');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LoginPage
            onGoogleLogin={handleGoogleLogin}
            onMicrosoftLogin={handleMicrosoftLogin}
          />
        }
      />
      <Route path="/home" element={<Home user={user} />} />
    </Routes>
  );
}

export default function WrappedApp() {
  return (
    <MsalProvider instance={msalInstance}>
      <Router > {/* Add basename here */}
        <App />
      </Router>
    </MsalProvider>
  );
}
