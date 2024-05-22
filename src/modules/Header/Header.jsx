import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Header.css';

const Header = ({ user, onLogout }) => {
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
        <button className="header-logout-button" onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
