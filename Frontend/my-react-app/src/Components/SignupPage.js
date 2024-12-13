import React, { useState } from 'react';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Simulating API call and response
      console.log('User sign-up data:', { email, password });
      // You can simulate a successful sign-up here (for example, by checking if email and password are provided)
      
      setMessage('Sign-up successful! Redirecting to login...');
      setTimeout(() => {
        // Redirect to the login page (for now, we'll simulate with a console log)
        console.log('Redirecting to /login...');
      }, 2000); // Simulating redirect after 2 seconds
    } catch (error) {
      console.error('Sign up failed:', error);
      setMessage('Sign-up failed, please try again.');
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
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
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUpPage;
