import React, { useState, useEffect } from 'react';
import './UserManagement.css';
import Table from '../../../../components/Table/Table';
import { Delete } from '@mui/icons-material';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [userClicked, setUserClicked] = useState({});

  const fetchUsers = () => {
    fetch('https://localdbs.com/GET/getAllUsers.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.code === 1) {
          setUsers(data.users);
        } else {
          console.warn(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (rowData) => {
    console.log(rowData)
    if (rowData.unique_id) {

      if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario con ID único ${rowData.unique_id}?`)) {
        try {
          const response = await fetch('https://localdbs.com/DELETE/deleteUser.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ unique_id: rowData.unique_id }),
          });

          const data = await response.json();
          if (data.code === 1) {
            alert('Usuario eliminado exitosamente');
            fetchUsers(); // Volver a hacer fetch de todos los usuarios después de eliminar un usuario
          } else {
            alert('Error al eliminar el usuario');
            console.error('Error:', data.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }

    } else {
      alert('Primero elige un usuario');
    }
    
    setUserClicked({});

  };

  const conditionalActionButtons = [
    {
      label: 'Guardar Cambios',
      onClick: async (modifiedData) => {
        try {
          const response = await fetch('https://localdbs.com/POST/updateUsers.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(modifiedData),
          });
          const result = await response.json();
          if (result.code === 1) {
            console.log('Cambios guardados:', modifiedData);
            alert('Cambios guardados exitosamente');
            fetchUsers(); // Volver a hacer fetch de todos los usuarios después de guardar los cambios
            return true; // Indicar que los cambios fueron guardados exitosamente
          } else {
            console.error('Error al guardar cambios:', result.message);
            alert('Error al guardar cambios');
            return false;
          }
        } catch (error) {
          console.error('Error al realizar la petición:', error);
          alert('Error al realizar la petición');
          return false;
        }
      },
    },
    {
      label: 'Descartar Cambios',
      onClick: (modifiedData) => {
        console.log('Descartar Cambios:', modifiedData);
        return true;
      },
    },
  ];

  const handleBlurOutside = (modifiedRows) => {
    setUserClicked({});
  };

  const handleRowClick = (rowData) => {
    setUserClicked(rowData);
  };

  const actionButtons = [
    { label: 'Eliminar Usuario', onClick: () => handleDeleteUser(userClicked) },
  ];

  return (
    <div className="user-management">
      <h2>Usuarios registrados</h2>
      <Table
        data={users}
        editable
        autoDetectHeaders={true}
        onRowClick={handleRowClick}
        onBlurOutside={handleBlurOutside}
        conditionalActionButtons={conditionalActionButtons}
        actionButtons={actionButtons}
        resizableColumns
      />
    </div>
  );
};

export default UserManagement;
