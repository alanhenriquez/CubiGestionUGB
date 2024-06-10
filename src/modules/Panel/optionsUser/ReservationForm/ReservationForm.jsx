import React, { useState } from 'react';
import './ReservationForm.css';
import Table from '../../../../components/Table/Table';

const ReservationForm = () => {
  const [cubicle, setCubicle] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [subject, setSubject] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log('Reservation Details:', { cubicle, studentCode, date, startTime, endTime, subject });
  };

  // Datos de ejemplo para los cubículos disponibles
  const [cubicles, setCubicles] = useState([
    { id: 1, code: 'CUB-001', name: 'Cubículo 1', capacity: 4, status: 'Disponible' },
    { id: 2, code: 'CUB-002', name: 'Cubículo 2', capacity: 2, status: 'Ocupado' },
    { id: 3, code: 'CUB-003', name: 'Cubículo 3', capacity: 6, status: 'Disponible' },
    { id: 4, code: 'CUB-004', name: 'Cubículo 4', capacity: 3, status: 'Mantenimiento' },
    { id: 5, code: 'CUB-005', name: 'Cubículo 5', capacity: 3, status: 'Mantenimiento' },
  ]);

  const columns = [
    { Header: 'Código del cubículo', accessor: 'code' },
    { Header: 'Nombre del cubículo', accessor: 'name' },
    { Header: 'Capacidad de personas', accessor: 'capacity' },
    { Header: 'Estado', accessor: 'status' },
    { Header: 'Campus', accessor: 'campus' },
  ];

  return (
    <div className="reservation-container">
      <form className="reservation-form" onSubmit={handleSubmit}>
        <h2>Make a Reservation</h2>
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
        <button type="submit">Submit</button>
      </form>

      <Table columns={columns} data={cubicles} />
    </div>
  );
};

export default ReservationForm;
