import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './modules/Header/Header';
import Login from './modules/Login/Login';
import SignUp from './modules/SignUp/SignUp';
import UserProfile from './modules/UserProfile/UserProfile';
import Dashboard from './modules/AdminPanel/Dashboard/Dashboard';
import ReservationForm from './modules/ReservationForm/ReservationForm';
import AdminPanel from './modules/AdminPanel/AdminPanel';
import UserPanel from './modules/UserPanel/UserPanel';
import './App.css';
import AuthContext from './context/AuthContext';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  const shouldShowHeader = !['/login', '/signup'].includes(location.pathname);

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
        navigate('/profile');
      } else {
        navigate('/login');
      }
    }
  }, [user, loading, navigate]);



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
          <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/reservations" element={user ? <ReservationForm /> : <Navigate to="/login" />} />
          <Route path="/admin" element={user ? <AdminPanel /> : <Navigate to="/login" />} />
          <Route path="/user" element={user ? <UserPanel /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
