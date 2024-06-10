import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import AuthContext from './context/AuthContext';
import Login from './modules/Login/Login';
import SignUp from './modules/SignUp/SignUp';
import Panel from './modules/Panel/Panel';
import Header from './modules/Header/Header';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  const shouldShowHeader = /* !['/login', '/signup'].includes(location.pathname) */ false;
  const appModulesStyle = (
    shouldShowHeader
      ? {
        marginTop: '4rem',
        height: 'calc(100vh - 4rem)',
        background: '#e9ecef',
      }
      : {
        height: '100vh',
        background: '#e9ecef',
      }
  );



  useEffect(() => {
    if (!loading) {
      if (user) {
        // Redirigir al perfil solo si se está en la página de inicio o de login
        if (['/', '/login', '/signup'].includes(location.pathname)) {
          navigate('/profile');
        }
      } else {
        if (!['/login', '/signup'].includes(location.pathname)) {
          navigate('/login');
        }
      }
    }
  }, [user, loading, navigate, location.pathname]);



  if (loading) {
    return <div>Loading...</div>; // Mostrar un mensaje de carga mientras se recupera el estado del usuario
  }

  return (
    <div className="App">
      {shouldShowHeader && <Header />}
      <div className="appModules" style={appModulesStyle}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/panel" element={user ? <Panel /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;