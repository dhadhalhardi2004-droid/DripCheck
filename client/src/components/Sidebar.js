// client/src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';

const NAV_ITEMS = [
  {
    tab: 'home',
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    tab: 'wardrobe',
    label: 'Wardrobe',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    ),
  },
  {
    tab: 'add',
    label: 'Add Clothes',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
  },
  {
    tab: 'profile',
    label: 'Profile',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function Sidebar({ isOpen, onClose, activeTab, setActiveTab, user, onLogout }) {
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
    : '?';

  const handleNav = (tab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside className={`sidebar-drawer ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-brand">Drip<span>Check</span></div>
          <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* User preview */}
        <div className="sidebar-user">
          <div className="sidebar-avatar">{initials}</div>
          <div className="sidebar-user-info">
            <strong>{user?.name || 'Guest'}</strong>
            <span>{user?.email || ''}</span>
          </div>
        </div>

        {/* Nav links */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.tab}
              className={`sidebar-nav-item ${activeTab === item.tab ? 'active' : ''}`}
              onClick={() => handleNav(item.tab)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={onLogout}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
