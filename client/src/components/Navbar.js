// client/src/components/Navbar.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';

export default function Navbar({ activeTab, setActiveTab, user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const PAGE_TITLES = {
    home: 'DripCheck',
    wardrobe: 'My Wardrobe',
    add: 'Add Clothes',
    profile: 'Profile',
  };

  const title = PAGE_TITLES[activeTab] || 'DripCheck';
  const isHome = activeTab === 'home';

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
    : '?';

  return (
    <>
      <header className="app-topbar">
        <div className="topbar-inner">

          {/* Left — hamburger OR back arrow */}
          {isHome ? (
            <button
              className="topbar-icon-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          ) : (
            <button
              className="topbar-icon-btn"
              onClick={() => setActiveTab('home')}
              aria-label="Back to home"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Center — title */}
          <span className="topbar-title">
            {isHome
              ? <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4B3621" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px', verticalAlign: 'middle', fill: '#4B3621'}}>
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                  <span className="topbar-brand-drip">Drip</span><span className="topbar-brand-check">Check</span>
                </>
              : title}
          </span>

          {/* Right — avatar */}
          <button
            className="topbar-avatar-btn"
            onClick={() => setActiveTab('profile')}
            aria-label="Go to profile"
            style={{ backgroundColor: '#EFE9E2', color: '#E2A93A' }}
          >
            ✨
          </button>
        </div>
      </header>

      {/* Bottom tab bar */}
      <nav className="mobile-navbar">
        <div className="nav-container">
          <button
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Home</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'wardrobe' ? 'active' : ''}`}
            onClick={() => setActiveTab('wardrobe')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
            <span>Wardrobe</span>
          </button>

          <button
            className={`nav-item nav-add ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            <div className="nav-add-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" className="add-icon">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
          </button>

          <button
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Profile</span>
          </button>
        </div>
      </nav>

      {/* Sidebar drawer */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={onLogout}
      />
    </>
  );
}
