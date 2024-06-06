import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Header.css';

const Header = () => {


  const user = {
    avatar: 'https://via.placeholder.com/100', // Reemplaza con la URL de la imagen del avatar del usuario
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success.'
  };

  const handleLogout = () => {
    // Aquí puedes manejar el cierre de sesión del usuario
    console.log('User logged out');
  };


  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={toggleMenu}>
          <MenuIcon />
        </button>
        {menuOpen && (
          <div className="dropdown-menu">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/profile">Profile</a></li>
              <li><a href="/settings">Settings</a></li>
            </ul>
          </div>
        )}
      </div>
      <div className="header-right">
        <NotificationsIcon className="header-icon" />
        <img src={user.avatar} alt="User Avatar" className="header-avatar" />
        <button className="header-logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
