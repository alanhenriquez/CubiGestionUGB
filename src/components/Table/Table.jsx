import React, { useState, useEffect, useRef } from 'react';
import './Table.css';

/**
 * Componente Table
 * 
 * Este componente representa una tabla con capacidades de edición y detección automática de encabezados.
 * 
 * @component
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {Array} [props.columns] - Las columnas de la tabla, cada columna debe tener las propiedades 'Header' y 'accessor'.
 * @param {Array} [props.data] - Los datos iniciales de la tabla.
 * @param {boolean} [props.autoDetectHeaders] - Si es true, detecta automáticamente los encabezados de las columnas a partir de los datos.
 * @param {Function} [props.onRowClick] - Función de devolución de llamada que se ejecuta cuando se hace clic en una fila. Recibe como argumento la fila clickeada.
 * @param {boolean} [props.editable] - Si es true, permite la edición de las filas.
 * @param {Function} [props.onBlurOutside] - Función de devolución de llamada que se ejecuta cuando se hace clic fuera de la tabla mientras se edita una fila. Recibe como argumento las filas modificadas.
 * @param {Array} [props.actionButtons] - Botones de acción que se muestran en todo momento. Cada botón debe tener las propiedades 'label' y 'onClick'.
 * @param {Array} [props.conditionalActionButtons] - Botones de acción que se muestran cuando hay filas modificadas. Cada botón debe tener las propiedades 'label' y 'onClick'.
 * @param {boolean} [props.updateOriginalOnBlur] - Si es true, actualiza originalData con los datos modificados después de llamar a onBlurOutside.
 * @param {boolean} [props.resizableColumns] - Si es true, permite ajustar el tamaño de las columnas desde el encabezado.
 * 
 * @returns {JSX.Element} El componente Table.
 * 
 * @example
 * // Ejemplo de uso
 * const columns = [
 *   { Header: 'Nombre', accessor: 'name' },
 *   { Header: 'Edad', accessor: 'age' },
 *   { Header: 'Correo', accessor: 'email' }
 * ];
 * 
 * const data = [
 *   { name: 'Juan', age: 28, email: 'juan@example.com' },
 *   { name: 'Ana', age: 22, email: 'ana@example.com' },
 *   { name: 'Luis', age: 35, email: 'luis@example.com' }
 * ];
 * 
 * const handleRowClick = (row) => {
 *   console.log('Fila clickeada:', row);
 * };
 * 
 * const handleBlurOutside = (modifiedRows) => {
 *   console.log('Filas modificadas:', modifiedRows);
 * };
 * 
 * const actionButtons = [
 *   { label: 'Agregar', onClick: (data) => console.log('Agregar:', data) },
 *   { label: 'Eliminar', onClick: (data) => console.log('Eliminar:', data) }
 * ];
 * 
 * const conditionalActionButtons = [
 *   { label: 'Guardar Cambios', onClick: (data) => console.log('Guardar Cambios:', data) },
 *   { label: 'Descartar Cambios', onClick: (data) => console.log('Descartar Cambios:', data) }
 * ];
 * 
 * <Table
 *   columns={columns}
 *   data={data}
 *   autoDetectHeaders={true}
 *   onRowClick={handleRowClick}
 *   editable={true}
 *   onBlurOutside={handleBlurOutside}
 *   actionButtons={actionButtons}
 *   conditionalActionButtons={conditionalActionButtons}
 *   updateOriginalOnBlur={true}
 *   resizableColumns={true}
 * />
 */
const Table = ({
  columns = [],
  data: initialData = [],
  autoDetectHeaders = false,
  onRowClick = () => {},
  editable = false,
  onBlurOutside = () => {},
  actionButtons = [],
  conditionalActionButtons = [],
  updateOriginalOnBlur = false,
  resizableColumns = false
}) => {
  


  /*/////////////////////////////////////////////////////////////////////////////////////////////*/
  /*consts --------------------------------------------------------------------------------------*/
  /*/////////////////////////////////////////////////////////////////////////////////////////////*/



  const [data, setData] = useState(initialData);
  const [originalData, setOriginalData] = useState(initialData.map(row => ({ ...row })));
  const [editableRowIndex, setEditableRowIndex] = useState(null);
  const [modifiedRows, setModifiedRows] = useState([]);
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState([]);
  const resizingColumnIndex = useRef(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);




  /*/////////////////////////////////////////////////////////////////////////////////////////////*/
  /*utils ---------------------------------------------------------------------------------------*/
  /*/////////////////////////////////////////////////////////////////////////////////////////////*/



  // Función para detectar automáticamente los encabezados de las columnas
  const getHeaders = (data) => {
    if (data.length > 0) {
      return Object.keys(data[0]).map(key => ({ Header: key, accessor: key }));
    }
    return [];
  };
  
  //actualizar el estado {modifiedRows} cada vez que hay un cambio en los datos de la tabla.
  const updateModifiedRows = (updatedData) => {
    const newModifiedRows = updatedData.filter((row, index) => JSON.stringify(row) !== JSON.stringify(originalData[index]));
    setModifiedRows(newModifiedRows);
  };

  // Determinar las columnas a usar
  const tableColumns = autoDetectHeaders ? getHeaders(data) : columns;
  


  /*/////////////////////////////////////////////////////////////////////////////////////////////*/
  /*handlers ------------------------------------------------------------------------------------*/
  /*/////////////////////////////////////////////////////////////////////////////////////////////*/



  const handleRowClick = (row, rowIndex) => {
    onRowClick(row);
    if (editable) {
      setEditableRowIndex(rowIndex);
    }
  };

  const handleInputChange = (e, accessor, rowIndex) => {
    const updatedData = data.map((row, i) => (i === rowIndex ? { ...row, [accessor]: e.target.value } : row));
    setData(updatedData);
    updateModifiedRows(updatedData);
  };

  const handleClickOutside = (e) => {
    if (tableRef.current && !tableRef.current.contains(e.target)) {
      if (onBlurOutside) {
        const modifiedRows = data.filter((row, index) => {
          return JSON.stringify(row) !== JSON.stringify(originalData[index]);
        });
        if (modifiedRows.length > 0) {
          onBlurOutside(modifiedRows);
          if (updateOriginalOnBlur) {
            setOriginalData(data.map(row => ({ ...row })));
          }
        }
      }
      setEditableRowIndex(null);
    }
  };

  const handleMouseDown = (index, e) => {
    resizingColumnIndex.current = index;
    startXRef.current = e.clientX;
    startWidthRef.current = columnWidths[index];
    document.body.classList.add('resize-active'); // Activar cursor de redimensión
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (resizingColumnIndex.current !== null) {
      requestAnimationFrame(() => {
        const newWidths = [...columnWidths];
        const newWidth = startWidthRef.current + (e.clientX - startXRef.current);
        if (newWidth > 50) { // Establecer un ancho mínimo para las columnas
          newWidths[resizingColumnIndex.current] = newWidth;
          setColumnWidths(newWidths);
        }
      });
    }
  };

  const handleMouseUp = () => {
    resizingColumnIndex.current = null;
    document.body.classList.remove('resize-active'); // Desactivar cursor de redimensión
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleConditionalActionButtonClick = (button, modifiedRows) => {
    const result = button.onClick(modifiedRows);
    if (result === true) {
      setData(originalData.map(row => ({ ...row }))); // Revertir los cambios
      setModifiedRows([]);
    }
  };


  /*/////////////////////////////////////////////////////////////////////////////////////////////*/
  /*useEffects ----------------------------------------------------------------------------------*/
  /*/////////////////////////////////////////////////////////////////////////////////////////////*/
  


  // Actualizar el estado de datos cuando el prop initialData cambie
  useEffect(() => {
    setData(initialData);
    setOriginalData(initialData.map(row => ({ ...row })));
    setColumnWidths(tableColumns.map(() => 150)); // Establecer un ancho inicial más razonable
    updateModifiedRows(originalData); // Actualizar las filas modificadas con los nuevos datos
  }, [initialData]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [data, originalData]);


  
  /*/////////////////////////////////////////////////////////////////////////////////////////////*/
  /*returns -------------------------------------------------------------------------------------*/
  /*/////////////////////////////////////////////////////////////////////////////////////////////*/
  const minWidth = tableColumns.length * 150; // Asumiendo 150px de ancho mínimo por columna// Determinar si hay filas modificadas
  


  return (
    <div className="table-container" ref={tableRef}>
      {actionButtons && (
        <div className="action-buttons-container">
          {actionButtons.map((button, index) => (
            <button
              key={index}
              onClick={() => button.onClick(data)}
              className="action-button"
            >
              {button.label}
            </button>
          ))}
        </div>
      )}
      {modifiedRows.length > 0 && conditionalActionButtons && (
        <div className="conditional-action-buttons-container">
          {conditionalActionButtons.map((button, index) => (
            <button
              key={index}
              onClick={() => handleConditionalActionButtonClick(button, modifiedRows)}
              className="conditional-action-button"
            >
              {button.label}
            </button>
          ))}
        </div>
      )}
      <table style={{ minWidth: minWidth }}>
        <thead>
          <tr>
            {tableColumns.map((column, index) => (
              <th
                key={column.accessor}
                style={{ width: columnWidths[index] }}
              >
                <div className="header-content">
                  {column.Header}
                  {resizableColumns && (
                    <div
                      className="resize-handle"
                      onMouseDown={(e) => handleMouseDown(index, e)}
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={editable && rowIndex === editableRowIndex ? 'editable-row' : ''}
              onClick={() => handleRowClick(row, rowIndex)}
            >
              {tableColumns.map((column, columnIndex) => (
                <td key={column.accessor} style={{ width: columnWidths[columnIndex] }}>
                  {editable && rowIndex === editableRowIndex ? (
                    <input
                      type="text"
                      value={row[column.accessor]}
                      onChange={(e) => handleInputChange(e, column.accessor, rowIndex)}
                    />
                  ) : (
                    <span>{row[column.accessor]}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
