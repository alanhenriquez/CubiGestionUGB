import React, { useEffect, useState, useContext } from 'react';
import './Profile.css';
import AuthContext from '../../../../context/AuthContext';
import { Backup } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

const Profile = () => {
  const { user, profile } = useContext(AuthContext);
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [biography, setBiography] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    
    // Guardar los cambios en el backend
    if (user && user.uniqueId) {
      fetch('https://localdbs.com/VERYFIER/saveProfile.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          unique_id: user.uniqueId,
          avatar,
          name,
          biography
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.code === 1) {
          alert('Perfil actualizado exitosamente');
        } else {
          alert('Error al actualizar el perfil');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  };

  const handleChange = (e, setter) => {
    const { value } = e.target;
    setter(value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('unique_id', user.uniqueId);
    formData.append('file', file);

    fetch('https://localdbs.com/VERYFIER/uploadProfileImage.php', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.code === 1) {
        setAvatar(data.imageUrl);
        alert('Imagen de perfil actualizada');
      } else {
        alert('Error al subir la imagen');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  


  // Recuperar la información del perfil desde el backend
  useEffect(() => {

    if (user && user.uniqueId && profile) {
      setAvatar(profile.avatar);
      setName(profile.name || '');
      setEmail(profile.email || '');
      setBiography(profile.biography || '');
    }

  }, [user, profile]);



  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="c-avatar">
          <img src={avatar || 'https://via.placeholder.com/100'} alt="User Avatar" className="profile-avatar" />
          {isEditing && (
            <>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="profile-image-upload"
              />
              <Tooltip title="Cargar nueva imagen">
                <label htmlFor="file-input" className="file-label">
                  <Backup />
                </label>
              </Tooltip>
            </>
          )}
        </div>
        <div className="c-title">
          <h2 className="profile-title">{email || 'Correo electrónico no disponible'}</h2>
        </div>
        <div className="c-form">
          <label htmlFor="name-input">Nombre</label>
          <input
            id="name-input"
            type="text"
            value={name}
            className="profile-input"
            readOnly={!isEditing}
            placeholder="Nombre"
            onChange={(e) => handleChange(e, setName)}
          />
          <label htmlFor="bio-input">Biografía</label>
          <textarea
            id="bio-input"
            name="bio"
            value={biography}
            className="profile-input profile-bio"
            readOnly={!isEditing}
            placeholder="Biografía"
            onChange={(e) => handleChange(e, setBiography)}
          />
        </div>
        {isEditing ? (
          <Tooltip title="Guardar cambios">
            <button className="profile-save-button" onClick={handleSave}>
              Guardar
            </button>
          </Tooltip>
        ) : (
          <Tooltip title="Cambiar a modo de edición">
            <button className="profile-edit-button" onClick={handleEdit}>
              Editar
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default Profile;
