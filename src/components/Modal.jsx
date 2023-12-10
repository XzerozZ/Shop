import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ closeModal }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForms = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <div id="loginForm" style={{ display: isLogin ? 'block' : 'none' }}>
          <h2>Login</h2>
          {/* Your login form goes here */}
        </div>
        <div id="signupForm" style={{ display: isLogin ? 'none' : 'block' }}>
          <h2>Sign Up</h2>
          {/* Your signup form goes here */}
        </div>
        <button onClick={toggleForms}>
          {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
        </button>
      </div>
    </div>
  );
};

export default Modal;
