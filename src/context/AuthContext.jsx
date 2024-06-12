import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  

  const login = (token, uniqueId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('unique_id', uniqueId);
    setUser({ token, uniqueId });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('unique_id');
    setUser(null);
    setProfile(null);
  };

  const verifyUserRole = async (uniqueId) => {
    try {
      const response = await fetch('https://localdbs.com/VERYFIER/verifyRole.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ unique_id: uniqueId }),
      });
      const data = await response.json();
      if (data.code === 1) {
        return data.role;
      } else {
        console.warn(data.message);
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const fetchUserProfile = async (uniqueId) => {
    try {
      const response = await fetch('https://localdbs.com/VERYFIER/getProfile.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ unique_id: uniqueId }),
      });
      const data = await response.json();
      if (data.code === 1) {
        setProfile(data.profile);
      } else {
        console.warn(data.message);
        setProfile(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setProfile(null);
    }
  };

  

  //Obtener datos iniciales
  useEffect(() => {
    // Recuperar la sesión del localStorage al cargar la aplicación
    const token = localStorage.getItem('token');
    const uniqueId = localStorage.getItem('unique_id');
    if (token && uniqueId) {
      setUser({ token, uniqueId });
      fetchUserProfile(uniqueId);  // Obtener el perfil del usuario
    }
    setLoading(false);
  }, []);

  //Obtener tras cada cambio de credenciales los datos del perfil
  useEffect(() => {
    const uniqueId = localStorage.getItem('unique_id');
    if (user) {
      fetchUserProfile(uniqueId);  // Obtener el perfil del usuario
    }
  }, [user]);



  return (
    <AuthContext.Provider value={{ user, login, logout, loading, verifyUserRole, profile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
