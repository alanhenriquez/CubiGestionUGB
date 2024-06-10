import React, { useState } from 'react';
import './NotificationHistory.css';

const NotificationHistory = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Actualización de la App', message: 'Se ha lanzado una nueva versión de la app.', date: '2024-05-21' },
    { id: 2, title: 'Mantenimiento Programado', message: 'Habrá un mantenimiento el 23 de mayo.', date: '2024-05-20' },
    { id: 3, title: 'Nuevo Evento', message: 'No te pierdas el próximo evento.', date: '2024-05-18' },
  ]);

  return (
    <div className="notification-history">
      <h2>Historial de Notificaciones</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Mensaje</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification) => (
            <tr key={notification.id}>
              <td>{notification.id}</td>
              <td>{notification.title}</td>
              <td>{notification.message}</td>
              <td>{notification.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationHistory;
