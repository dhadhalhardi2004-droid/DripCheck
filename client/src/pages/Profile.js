import React from 'react';

const Profile = ({ user, setAuthState, setUser }) => {
  const handleLogout = () => {
    setUser(null);
    setAuthState('login');
  };

  // Fallback if user is null for some reason
  const currentUser = user || {
    name: 'Guest User',
    email: 'guest@example.com',
    gender: 'N/A'
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="animate-fade">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2>My Profile</h2>
      </div>

      <div className="profile-container">
        <div className="profile-avatar">
          {getInitials(currentUser.name)}
        </div>
        
        <div className="profile-info">
          <h3>{currentUser.name}</h3>
          <div className="profile-meta">
            <span className="profile-meta-item">
              ✉️ {currentUser.email}
            </span>
            <span className="profile-meta-item">
              {currentUser.gender === 'Female' ? '👩' : currentUser.gender === 'Male' ? '👨' : '👤'} {currentUser.gender}
            </span>
          </div>
        </div>

        <button className="btn btn-outline" style={{ color: '#e53e3e', borderColor: '#fed7d7' }} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
