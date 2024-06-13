import React, { useState, useEffect } from 'react';
import './NotificationHistory.css';

const NotificationHistory = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = () => {
    fetch('https://localdbs.com/GET/getNotifications.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.code === 1) {
          setNotifications(data.notifications);
        } else {
          console.warn(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

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
