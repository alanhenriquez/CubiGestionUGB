import React from 'react';
import './CubiclesTable.css';

const CubiclesTable = ({ cubicles }) => {
  return (
    <div className="cubicles-table">
      <h2>Cubículos Disponibles</h2>
      <table>
        <thead>
          <tr>
            <th>Código del cubículo</th>
            <th>Nombre del cubículo</th>
            <th>Capacidad de personas</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {cubicles.map((cubicle) => (
            <tr key={cubicle.code}>
              <td>{cubicle.code}</td>
              <td>{cubicle.name}</td>
              <td>{cubicle.capacity}</td>
              <td>{cubicle.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CubiclesTable;
