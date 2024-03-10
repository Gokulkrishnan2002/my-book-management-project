import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === 'pixstech' && password === 'tech') {
      navigate('/book'); 
    } else {
      alert('Invalid username or password!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-component">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            value={username}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <div><br /></div>
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <div><br /></div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
