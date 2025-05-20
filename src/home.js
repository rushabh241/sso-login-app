// home.js
import React from 'react';

const Home = ({ user }) => {
  return (
    <div>
      <h2>Welcome!</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default Home;
