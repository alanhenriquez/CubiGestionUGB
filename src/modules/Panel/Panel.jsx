import React, { useContext, useState, useEffect } from 'react';
import './Panel.css';
import UserManagement from './optionsAdmin/UserManagement/UserManagement';
import ReservationManagement from './optionsAdmin/ReservationManagement/ReservationManagement';
import Dashboard from './optionsAdmin/Dashboard/Dashboard';
import CubicleManagement from './optionsAdmin/CubicleManagement/CubicleManagement';
import NotificationForm from './optionsAdmin/NotificationForm/NotificationForm';
import NotificationHistory from './optionsAdmin/NotificationHistory/NotificationHistory';
import ReservationForm from './optionsUser/ReservationForm/ReservationForm';
import Profile from './optionsEveryone/Profile/Profile';
import AuthContext from '../../context/AuthContext';
import { Logout } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

const Panel = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [isAdmin, setIsAdmin] = useState(false);
    const { user, logout, verifyUserRole } = useContext(AuthContext);

    useEffect(() => {
        const checkUserRole = async () => {
            if (user && user.uniqueId) {
                const role = await verifyUserRole(user.uniqueId);
                setIsAdmin(role === 'admin');
            }
        };
        checkUserRole();
    }, [user, verifyUserRole]);

    const adminSections = [
        { name: 'profile', label: 'Perfil' },
        { name: 'dashboard', label: 'Dashboard' },
        { name: 'users', label: 'Gestionar Usuarios' },
        { name: 'reservations', label: 'Gestionar Reservas' },
        { name: 'cubicles', label: 'Gestionar Cubículos' },
        { name: 'notifications', label: 'Crear Notificaciones' },
        { name: 'notificationHistory', label: 'Historial de Notificaciones' },
    ];

    const userSections = [
        { name: 'profile', label: 'Perfil' },
        { name: 'reservations', label: 'Reservar Cubículo' },
        { name: 'notificationHistory', label: 'Historial de Notificaciones' },
    ];

    const renderSectionAdmin = () => {
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
                return <Dashboard />;
            case 'profile':
            default:
                return <Profile />;
        }
    };

    const renderSectionUser = () => {
        switch (activeSection) {
            case 'reservations':
                return <ReservationForm />;
            case 'notificationHistory':
                return <NotificationHistory />;
            case 'profile':
            default:
                return <Profile />;
        }
    };

    const sections = isAdmin ? adminSections : userSections;

    return (
        <div className="panel">
            <nav className="panel-nav">
                <div className="panel-logo">
                    <img src="src/assets/images/UGB_LOGOTIPO_BASICO.png" alt="Company Logo" />
                    <p>Cubi-Gestión UGB</p>
                </div>
                <div className="panel-options">
                    <ul>
                        {sections.map((section) => (
                            <li
                                key={section.name}
                                className={activeSection === section.name ? 'active' : ''}
                                onClick={() => setActiveSection(section.name)}
                            >
                                {section.label}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="panel-user">
                    <img src="https://via.placeholder.com/50" alt="User Avatar" />
                    <Tooltip title="Cerrar sesión"><button type="button" onClick={logout}><Logout /></button></Tooltip>
                </div>
            </nav>
            <div className="panel-content">
                {isAdmin ? renderSectionAdmin() : renderSectionUser()}
            </div>
        </div>
    );
};

export default Panel;
