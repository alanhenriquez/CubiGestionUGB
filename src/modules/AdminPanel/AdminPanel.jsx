import React, { useState } from 'react';
import './AdminPanel.css';
import UserManagement from './UserManagement/UserManagement';
import ReservationManagement from './ReservationManagement/ReservationManagement';
import Dashboard from './Dashboard/Dashboard';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'users':
        return <UserManagement />;
      case 'reservations':
        return <ReservationManagement />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-panel">
      <nav className="admin-nav">
        <ul>
          <li onClick={() => setActiveSection('dashboard')}>Dashboard</li>
          <li onClick={() => setActiveSection('users')}>Gestionar Usuarios</li>
          <li onClick={() => setActiveSection('reservations')}>Gestionar Reservas</li>
        </ul>
      </nav>
      <div className="admin-content">
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminPanel;
