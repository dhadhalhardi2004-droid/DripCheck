import React from 'react';

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="navbar">
      <div className="logo cursor-pointer" onClick={() => setActiveTab('home')} style={{ cursor: 'pointer' }}>
        Drip<span>Check</span>
      </div>
      <div className="nav-links">
        <button 
          className={`btn ${activeTab === 'home' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button 
          className={`btn ${activeTab === 'wardrobe' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('wardrobe')}
        >
          Wardrobe
        </button>
        <button 
          className={`btn ${activeTab === 'add' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('add')}
        >
          + Add Fit
        </button>
        <button 
          className={`btn ${activeTab === 'profile' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
