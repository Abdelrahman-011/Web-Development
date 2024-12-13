import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace this with actual login logic if needed
    if (email === 'test@example.com' && password === 'password') {
      // Store token in localStorage
      localStorage.setItem('authToken', 'dummyAuthToken'); // Replace with real token if applicable
      
      // Redirect to home page
      window.location.href = '/home'; // Redirect to your home page after successful login
    } else {
      console.error('Invalid login credentials');
      alert('Invalid login credentials. Please try again.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

