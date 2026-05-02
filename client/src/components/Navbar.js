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

          {/* Left — hamburger AND back arrow (Wardrobe style) */}
          <div className="flex items-center gap-2">
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
            {!isHome && (
              <button
                className="topbar-icon-btn"
                onClick={() => setActiveTab('home')}
                aria-label="Back to home"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
            )}
          </div>

          {/* Center — logo (Always show logo in Wardrobe as per image) */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="w-8 h-8 bg-[#4B3621] rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="white"></polygon>
              </svg>
            </div>
            <span className="font-serif font-bold text-xl text-[#2D241C]">DripCheck</span>
          </div>

          {/* Right — Sparkles (Avatar button styled as sparkles) */}
          <div className="flex items-center">
            <button
              className="w-10 h-10 bg-[#EFE9E2] rounded-full flex items-center justify-center shadow-sm text-[#D4B499]"
              onClick={() => setActiveTab('profile')}
              aria-label="Go to profile"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707m0-12.728.707.707m11.314 11.314.707.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
              </svg>
            </button>
          </div>
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
