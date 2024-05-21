import React from 'react';
import './Header.css';

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="header-right">
        <img src={user.avatar} alt="User Avatar" className="header-avatar" />
        <button className="header-logout-button" onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
