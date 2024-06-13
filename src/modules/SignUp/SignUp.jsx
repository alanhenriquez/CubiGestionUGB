import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';
import { message } from 'antd';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');



  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      message.error('Passwords do not match');
      return;
    }

    fetch('https://localdbs.com/POST/signup.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          message.success(data.message);
        } else {
          message.error('Error registering user');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };



  return (
    <div className="signup-container">
      <div className="signup-video">
        <video src="src\assets\videos\video.mp4" autoPlay loop></video>
        <div className="bgdeco q"></div>
        <div className="bgdeco w"></div>
        <div className="bgdeco e"></div>
        <div className="bgdeco r"></div>
        <div className="bgdeco t"></div>
      </div>
      <div className="signup-logo">
        <img src="src\assets\images\ugb_icon_hor_light.38b2c33c.png" alt="Logo UGB" />
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-content">
          <h2>Registrarse</h2>
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Crear</button>
          <div className="change-form">
            <p>
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </p>
          </div>
        </div>
        <div className="blur-effect"></div>
      </form>
    </div>
  );
};

export default SignUp;
