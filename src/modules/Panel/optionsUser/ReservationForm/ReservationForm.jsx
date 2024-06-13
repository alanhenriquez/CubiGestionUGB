import React, { useState, useEffect } from 'react';
import './ReservationForm.css';
import Table from '../../../../components/Table/Table';
import { message } from 'antd';

const ReservationForm = () => {
  const [cubicle, setCubicle] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [subject, setSubject] = useState('');
  const [cubicles, setCubicles] = useState([]);

  useEffect(() => {
    // Obtener los cubículos disponibles desde el backend (reemplazar con tu endpoint)
    fetch('https://localdbs.com/GET/getAllCubicles.php')
      .then(response => response.json())
      .then(data => {
        if (data.code === 1) {
          setCubicles(data.cubicles);
        } else {
          console.warn(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Enviar los datos de la reservación al backend
    fetch('https://localdbs.com/POST/saveReservation.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cubicle, student_code: studentCode, date, start_time: startTime, end_time: endTime, subject }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.code === 1) {
        message.success('Reservación guardada exitosamente');
        setCubicle('');
        setStudentCode('');
        setDate('');
        setStartTime('');
        setEndTime('');
        setSubject('');
      } else {
        message.error('Error al guardar la reservación');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleRowClick = (rowData) => {
    setCubicle(rowData.code);
  };

  return (
    <div className="reservation-container">
      <div className="reservation-table">
        <h2>Cubículos disponibles</h2>
        <Table
          data={[
            { id: 1, code: 'CUB-001', name: 'Cubículo 1', capacity: 4, status: 'Disponible' },
            { id: 2, code: 'CUB-002', name: 'Cubículo 2', capacity: 2, status: 'Ocupado' },
            { id: 3, code: 'CUB-003', name: 'Cubículo 3', capacity: 6, status: 'Disponible' },
            { id: 4, code: 'CUB-004', name: 'Cubículo 4', capacity: 3, status: 'Mantenimiento' },
          ]}
          editable={false}
          autoDetectHeaders={true}
          onRowClick={handleRowClick}
          resizableColumns
        />
      </div>
      <form className="reservation-form" onSubmit={handleSubmit}>
        <h2>Reserva tu cubículo</h2>
        <input
          type="text"
          placeholder="Cubículo seleccionado"
          value={cubicle}
          onChange={(e) => setCubicle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Código de los estudiantes"
          value={studentCode}
          onChange={(e) => setStudentCode(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="Hora de ingreso"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="Hora de salida"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Materia a estudiar"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ReservationForm;
