import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is authenticated on page load
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <h2>Welcome to the Dashboard!</h2>
          {/* Render main content here */}
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;