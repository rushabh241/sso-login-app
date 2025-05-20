// authConfig.js
export const msalConfig = {
  auth: {
    clientId: 'dcce8b92-b217-4487-8b06-eb5c73f31ab6',
    authority: 'https://login.microsoftonline.com/7c3207c7-c6a2-4271-9863-981e91fa6314',
    redirectUri: '/',
    postLogoutRedirectUri: '/',
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'localStorage', // or 'sessionStorage'
    storeAuthStateInCookie: false,
  },
};
