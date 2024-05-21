import React from 'react';
import SignUp from './modules/SignUp/SignUp';
import Login from './modules/Login/Login';
import UserProfile from './modules/UserProfile/UserProfile';
import Header from './modules/Header/Header';

const App = () => {

  const user = {
    avatar: 'https://via.placeholder.com/100', // Reemplaza con la URL de la imagen del avatar del usuario
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success.'
  };

  const handleLogout = () => {
    // Aquí puedes manejar el cierre de sesión del usuario
    console.log('User logged out');
  };

  return (
    <div className="App">
      <Header user={user} onLogout={handleLogout} />
      <UserProfile user={user} />
    </div>
  );
};

export default App;
