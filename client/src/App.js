import React, { useState } from 'react';
import GoogleAuth from './components/GoogleAuth';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      <h1>SSO App</h1>
      {user ? (
        <>
          <p>Welcome, {user.firstName} {user.lastName} ({user.email})</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <GoogleAuth onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
