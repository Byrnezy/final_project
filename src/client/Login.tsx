import React, { useState } from 'react';
import './Login.css';
import { Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

let theme = createTheme({
    // Theme customization goes here as usual, including tonalOffset and/or
    // contrastThreshold as the augmentColor() function relies on these
  });
  
  theme = createTheme(theme, {
    // Custom colors created with augmentColor go here
    palette: {
      salmon: theme.palette.augmentColor({
        color: {
          main: '#554481',
        },
        name: 'purple',
      }),
    },
  });

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Username:', username);
    console.log('Password:', password);

    const response = await fetch ("/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 403) {
      alert("Incorrect username or password");
    } else if (response.status === 200) {
      const json = await response.json();
      if (json.new === "new") {
        alert("User created");
      }
      navigate('/Home');
    }

  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button variant="contained" type="submit" className="login-button" sx={{ backgroundColor: 'purple', color: 'white' }} onClick={handleSubmit}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
