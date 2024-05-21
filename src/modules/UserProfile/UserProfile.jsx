import React from 'react';
import './UserProfile.css';

const UserProfile = ({ user }) => {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={user.avatar} alt="User Avatar" className="profile-avatar" />
        <h2 className="profile-title">User Profile</h2>
        <input
          type="text"
          value={user.name}
          className="profile-input"
          readOnly
        />
        <input
          type="email"
          value={user.email}
          className="profile-input"
          readOnly
        />
        <textarea
          value={user.bio}
          className="profile-input profile-bio"
          readOnly
        />
        <button className="profile-edit-button">Edit Profile</button>
      </div>
    </div>
  );
};

export default UserProfile;
