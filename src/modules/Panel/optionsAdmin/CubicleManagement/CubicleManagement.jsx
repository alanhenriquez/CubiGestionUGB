import React, { useState } from 'react';
import './CubicleManagement.css';

const CubicleManagement = () => {
  const [cubicles, setCubicles] = useState([
    { id: 1, code: 'CUB-001', name: 'Cubículo 1', capacity: 4, status: 'Disponible' },
    { id: 2, code: 'CUB-002', name: 'Cubículo 2', capacity: 2, status: 'Ocupado' },
    { id: 3, code: 'CUB-003', name: 'Cubículo 3', capacity: 6, status: 'Disponible' },
    { id: 4, code: 'CUB-004', name: 'Cubículo 4', capacity: 3, status: 'Mantenimiento' },
  ]);

  return (
    <div className="cubicle-management">
      <h2>Gestionar Cubículos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Capacidad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cubicles.map((cubicle) => (
            <tr key={cubicle.id}>
              <td>{cubicle.id}</td>
              <td>{cubicle.code}</td>
              <td>{cubicle.name}</td>
              <td>{cubicle.capacity}</td>
              <td>{cubicle.status}</td>
              <td>
                <button onClick={() => console.log(`Edit ${cubicle.id}`)}>Editar</button>
                <button onClick={() => console.log(`Delete ${cubicle.id}`)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CubicleManagement;
