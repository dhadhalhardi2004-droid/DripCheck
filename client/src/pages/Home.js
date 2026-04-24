// client/src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home({ setActiveTab, user }) {
  const [totalClothes, setTotalClothes] = useState(0);
  const firstName = user?.name ? user.name.split(' ')[0] : 'Guest';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get("http://localhost:4000/api/clothes", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data) setTotalClothes(res.data.length);
      } catch (err) {
        console.error("Failed to load statistics", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="page-wrapper animate-fade">
      <div className="ui-card hero-section">
        <h1>What's up, <br />{firstName} 👋</h1>
        <p>Ready to curate your aesthetic?</p>
        <div className="stats-box">
          <span className="stats-number">{totalClothes}</span>
          <span className="stats-label">Items in Vault</span>
        </div>
      </div>

      <div className="action-row">
        <div className="ui-card action-card" onClick={() => setActiveTab('add')}>
          <div className="action-icon circle-beige">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </div>
          <h3>Add Fit</h3>
          <p>Upload new clothes</p>
        </div>

        <div className="ui-card action-card" onClick={() => setActiveTab('wardrobe')}>
          <div className="action-icon circle-brown">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </div>
          <h3>Wardrobe</h3>
          <p>View collection</p>
        </div>
      </div>

      <div className="ui-card helper-banner" onClick={() => setActiveTab('wardrobe')}>
        <div className="helper-text">
          <h4>AI Suggestions</h4>
          <p>Don't know what to wear? Let AI decide.</p>
        </div>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="helper-icon"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>
    </div>
  );
}
