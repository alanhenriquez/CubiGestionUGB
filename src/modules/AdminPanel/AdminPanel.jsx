import React, { useState } from 'react';
import './AdminPanel.css';
import UserManagement from './UserManagement/UserManagement';
import ReservationManagement from './ReservationManagement/ReservationManagement';
import Dashboard from './Dashboard/Dashboard';
import CubicleManagement from './CubicleManagement/CubicleManagement';
import NotificationForm from './NotificationForm/NotificationForm';
import NotificationHistory from './NotificationHistory/NotificationHistory';

const AdminPanel = () => {
    const [activeSection, setActiveSection] = useState('dashboard');

    const renderSection = () => {
        switch (activeSection) {
            case 'users':
                return <UserManagement />;
            case 'reservations':
                return <ReservationManagement />;
            case 'cubicles':
                return <CubicleManagement />;
            case 'notifications':
                return <NotificationForm />;
            case 'notificationHistory':
                return <NotificationHistory />;
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
                    <li onClick={() => setActiveSection('cubicles')}>Gestionar Cubículos</li>
                    <li onClick={() => setActiveSection('notifications')}>Crear Notificaciones</li>
                    <li onClick={() => setActiveSection('notificationHistory')}>Historial de Notificaciones</li>
                </ul>
            </nav>
            <div className="admin-content">
                {renderSection()}
            </div>
        </div>
    );
};

export default AdminPanel;
