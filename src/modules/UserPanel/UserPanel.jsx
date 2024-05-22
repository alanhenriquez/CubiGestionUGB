import React, { useState } from 'react';
import './UserPanel.css';
import ReservationForm from '../ReservationForm/ReservationForm';

const UserPanel = () => {
  const [activeSection, setActiveSection] = useState('reservations');

  const renderSection = () => {
    switch (activeSection) {
      case 'reservations':
      default:
        return <ReservationForm />;
    }
  };

  return (
    <div className="user-panel">
      <nav className="user-nav">
        <ul>
          <li onClick={() => setActiveSection('reservations')}>Realizar Reservaciones</li>
        </ul>
      </nav>
      <div className="user-content">
        {renderSection()}
      </div>
    </div>
  );
};

export default UserPanel;
