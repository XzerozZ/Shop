import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './popup.css';

const LoginForm = ({ close }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Logging in with:', { username, password });
    // Close the modal after handling login
    close();
  };

  return (
    <div className="modal">
      <button className="close" onClick={close}>
        &times;
      </button>
      <div className="header"> Login </div>
      <div className="content">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="actions">
        <button className="button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

const LoginPopup = () => (
  <Popup trigger={<button className="button">Open Modal</button>} modal nested>
    {(close) => <LoginForm close={close} />}
  </Popup>
);

export default LoginPopup;

