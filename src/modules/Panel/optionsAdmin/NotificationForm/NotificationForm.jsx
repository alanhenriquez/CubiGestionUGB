import React, { useState } from 'react';
import './NotificationForm.css';
import { message } from 'antd';

const NotificationForm = () => {
  const [title, setTitle] = useState('');
  const [messageNoti, setMessageNoti] = useState('');
  const [recipients, setRecipients] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('https://localdbs.com/POST/saveNotification.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, message: messageNoti, recipients }),
      });

      const data = await response.json();
      if (data.code === 1) {
        message.success('Notificación enviada exitosamente');
        // Reiniciar formulario después de enviar
        setTitle('');
        setMessageNoti('');
        setRecipients('');
      } else {
        alert('Error al enviar la notificación');
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar la notificación');
    }
  };

  return (
    <div className="notification-form">
      <h2>Crear Notificación</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título de la notificación"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Mensaje"
          value={messageNoti}
          onChange={(e) => setMessageNoti(e.target.value)}
          required
        />
        <button type="submit">Enviar Notificación</button>
      </form>
    </div>
  );
};

export default NotificationForm;
