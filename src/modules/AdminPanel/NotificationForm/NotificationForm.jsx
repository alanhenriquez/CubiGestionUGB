import React, { useState } from 'react';
import './NotificationForm.css';

const NotificationForm = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario de notificaciones
    console.log('Notification Details:', { title, message, recipients });
    // Reiniciar formulario después de enviar
    setTitle('');
    setMessage('');
    setRecipients('');
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Destinatarios (separar por comas)"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          required
        />
        <button type="submit">Enviar Notificación</button>
      </form>
    </div>
  );
};

export default NotificationForm;
