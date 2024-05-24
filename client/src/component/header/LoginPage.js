import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      console.log(response.data); // Log the response for debugging
      // Redirect to home page or any other route after successful login
      //get user name from response
      const userName = response.data.userName;
      console.log(userName);
      localStorage.setItem('userName', userName);
      navigate('/home');

    } catch (error) {
      console.error('Login error:', error);
      // Handle login error, show message to user, etc.
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
