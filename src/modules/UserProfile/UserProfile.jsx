import React, { useEffect, useState, useContext } from 'react';
import './UserProfile.css';
import AuthContext from '../../context/AuthContext';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    avatar: '',
    name: '',
    email: '',
    bio: ''
  });


  /* 
  useEffect(() => {
    if (user) {
      console.log(user);
      fetch('http://localhost/GET/get_user_profile.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user.userId }),
      })
        .then((response) => response.text()) // Cambiar a text para depuración
        .then((data) => {
          try {
            const jsonData = JSON.parse(data);
            if (jsonData.message) {
              alert(jsonData.message);
            } else {
              setProfile(jsonData);
            }
          } catch (error) {
            console.error('Error parsing JSON:', error);
            console.error('Response data:', data);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [user]);
 */

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={profile.avatar || 'https://via.placeholder.com/100'} alt="User Avatar" className="profile-avatar" />
        <h2 className="profile-title">User Profile</h2>
        <input
          type="text"
          value={profile.name}
          className="profile-input"
          readOnly
        />
        <input
          type="email"
          value={profile.email}
          className="profile-input"
          readOnly
        />
        <textarea
          value={profile.bio}
          className="profile-input profile-bio"
          readOnly
        />
        <button className="profile-edit-button">Edit Profile</button>
      </div>
    </div>
  );
};

export default UserProfile;
