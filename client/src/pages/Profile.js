// client/src/pages/Profile.js
import React from 'react';

export default function Profile({ user, setAuthState, setUser }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setAuthState('login');
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="page-wrapper animate-fade flex-center">
      <div className="ui-card profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {getInitials(user?.name)}
          </div>
          <h2>{user?.name || "Guest User"}</h2>
          <span className="profile-tag">{user?.gender || "N/A"}</span>
        </div>

        <div className="profile-details mt-2">
          <div className="detail-row">
            <div className="detail-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div className="detail-text">
              <span>Name</span>
              <p>{user?.name || "N/A"}</p>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
            </div>
            <div className="detail-text">
              <span>Email</span>
              <p>{user?.email || "N/A"}</p>
            </div>
          </div>
        </div>

        <button className="ui-btn ui-btn-danger mt-2 w-full" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
