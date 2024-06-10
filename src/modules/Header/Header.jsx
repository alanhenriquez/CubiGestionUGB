import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Header.css';
import AuthContext from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
              <li><a href="/user">Panel</a></li>
            </ul>
          </div>
        )}
      </div>
      <div className="header-right">
        <NotificationsIcon className="header-icon" />
        <img src={user?.avatar || 'https://via.placeholder.com/100'} alt="User Avatar" className="header-avatar" />
        <button className="header-logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
