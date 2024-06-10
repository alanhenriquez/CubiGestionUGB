import React, { useState } from 'react';
import './ReservationManagement.css';

const ReservationManagement = () => {
  const [reservations, setReservations] = useState([
    { id: 1, cubicle: 'Cubículo 1', studentCode: '12345', date: '2024-05-20', startTime: '09:00', endTime: '11:00', subject: 'Matemáticas' },
    { id: 2, cubicle: 'Cubículo 2', studentCode: '67890', date: '2024-05-21', startTime: '10:00', endTime: '12:00', subject: 'Física' },
    { id: 3, cubicle: 'Cubículo 3', studentCode: '54321', date: '2024-05-22', startTime: '13:00', endTime: '15:00', subject: 'Química' },
  ]);

  return (
    <div className="reservation-management">
      <h2>Gestionar Reservas</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cubículo</th>
            <th>Código de Estudiante</th>
            <th>Fecha</th>
            <th>Hora de Ingreso</th>
            <th>Hora de Salida</th>
            <th>Materia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.cubicle}</td>
              <td>{reservation.studentCode}</td>
              <td>{reservation.date}</td>
              <td>{reservation.startTime}</td>
              <td>{reservation.endTime}</td>
              <td>{reservation.subject}</td>
              <td>
                <button onClick={() => console.log(`Edit ${reservation.id}`)}>Editar</button>
                <button onClick={() => console.log(`Delete ${reservation.id}`)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationManagement;
