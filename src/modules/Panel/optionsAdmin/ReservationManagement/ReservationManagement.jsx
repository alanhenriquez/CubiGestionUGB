import React, { useState, useEffect } from 'react';
import './ReservationManagement.css';

const ReservationManagement = () => {
  const [reservations, setReservations] = useState([]);
  

  useEffect(() => {
    // Obtener todas las reservaciones desde el backend
    fetch('https://localdbs.com/GET/getAllReservations.php')
      .then(response => response.json())
      .then(data => {
        if (data.code === 1) {
          setReservations(data.reservations);
        } else {
          console.warn(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.cubicle}</td>
              <td>{reservation.student_code}</td>
              <td>{reservation.date}</td>
              <td>{reservation.start_time}</td>
              <td>{reservation.end_time}</td>
              <td>{reservation.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationManagement;
