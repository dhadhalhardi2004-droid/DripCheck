import React from 'react';

const Home = ({ setActiveTab }) => {
  return (
    <div className="animate-fade">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Upgrade Your Style</h1>
          <p className="hero-subtitle">
            AI-powered outfit suggestions straight from your wardrobe. Curate, organize, and elevate your daily aesthetic.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => setActiveTab('wardrobe')}
              style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
            >
              Explore Wardrobe
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => setActiveTab('add')}
              style={{ padding: '1rem 2rem', fontSize: '1.1rem', backgroundColor: 'var(--bg-card)' }}
            >
              + Add Item
            </button>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section>
        <div className="feature-grid">
          <div className="feature-card" onClick={() => setActiveTab('wardrobe')}>
            <div className="feature-icon">👕</div>
            <h3 className="feature-title">My Wardrobe</h3>
            <p className="feature-desc">View and manage your entire clothing collection in one unified space.</p>
          </div>

          <div className="feature-card" onClick={() => setActiveTab('add')}>
            <div className="feature-icon">➕</div>
            <h3 className="feature-title">Add Clothes</h3>
            <p className="feature-desc">Upload new items to continually refine and build your personal dynamic aesthetic.</p>
          </div>

          <div className="feature-card" onClick={() => setActiveTab('wardrobe')}>
            <div className="feature-icon">✨</div>
            <h3 className="feature-title">AI Suggestion</h3>
            <p className="feature-desc">Get smart outfit block recommendations generated tailored exclusively for you.</p>
          </div>

          <div className="feature-card" onClick={() => setActiveTab('profile')}>
            <div className="feature-icon">👤</div>
            <h3 className="feature-title">Profile Account</h3>
            <p className="feature-desc">Manage your account preferences, handle data, and customize your layout.</p>
          </div>
        </div>
      </section>

      {/* Quick Action Button below grid if needed (Also placed in Hero for UX) */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
         <button 
            className="btn btn-primary" 
            onClick={() => setActiveTab('wardrobe')}
            style={{ padding: '1rem 3rem', borderRadius: '30px' }}
          >
            ✨ Suggest Fit Now
          </button>
      </div>

    </div>
  );
};

export default Home;
