import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import AuthContext from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);



  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('https://localdbs.com/POST/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Inicio de sesión exitoso") {
          alert(data.message);
          login(data.token, data.unique_id);
          navigate('/panel');
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };



  return (
    <div className="login-container">
      <div className="login-video">
        <video src="src\assets\videos\video.mp4" autoPlay loop></video>
        <div className="bgdeco q"></div>
        <div className="bgdeco w"></div>
        <div className="bgdeco e"></div>
        <div className="bgdeco r"></div>
        <div className="bgdeco t"></div>
      </div>
      <div className="login-logo">
        <img src="src\assets\images\ugb_icon_hor_light.38b2c33c.png" />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-content">
          <h2>bienvenido</h2>
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
          <button type="submit">Iniciar sesión</button>
          <div className="change-form">
            <p>
              ¿No tienes una cuenta? <Link to="/signup">Inscríbete aquí</Link>
            </p>
          </div>
        </div>
        <div className="blur-effect"></div>
      </form>
    </div>
  );
};

export default Login;
