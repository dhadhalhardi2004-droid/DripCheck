// client/src/pages/Wardrobe.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Wardrobe() {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetchClothes();
  }, []);

  const fetchClothes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get("http://localhost:4000/api/clothes", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClothes(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggest = async () => {
    setAiLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get("http://localhost:4000/api/ai/suggest", {
        headers: { Authorization: `Bearer ${token}` }
      });

      let suggestedArray = [];
      if (res.data) {
        if (Array.isArray(res.data)) suggestedArray = res.data;
        else if (res.data.outfit) suggestedArray = res.data.outfit;
        else suggestedArray = [res.data];
      }
      setAiSuggestions(suggestedArray);
    } catch (err) {
      console.error("Failed to fetch AI suggestions:", err);
    } finally {
      setAiLoading(false);
    }
  };

  const filters = ['All', 'Top', 'Bottom', 'Shoes', 'Accessory'];
  const filteredClothes = filter === 'All'
    ? clothes
    : clothes.filter(item => item.type?.toLowerCase() === filter.toLowerCase());

  return (
    <div className="page-wrapper animate-fade">
      <div className="ui-card ai-card">
        <div className="ai-layout">
          <div className="ai-text">
            <h2>AI Outfit Finder</h2>
            <p>Compute your perfect fit today.</p>
          </div>
          <button className="ui-btn ui-btn-primary ai-btn" onClick={handleSuggest} disabled={aiLoading}>
            {aiLoading ? "Thinking..." : "Suggest"}
          </button>
        </div>

        {aiSuggestions && aiSuggestions.length > 0 && (
          <div className="ai-results animate-fade">
            <h4>Suggested Fit:</h4>
            <div className="grid-layout mt-1">
              {aiSuggestions.map((item, idx) => item && (
                <div key={idx} className="ui-card item-card">
                  <div className="item-img-container">
                    {item.imageUrl ? <img src={item.imageUrl} alt={item.name} /> : <div className="img-placeholder">No Img</div>}
                    <span className="item-badge">{item.type}</span>
                  </div>
                  <div className="item-info">
                    <h5>{item.name}</h5>
                    <p>{item.color}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="section-title">
        <h2>My Vault</h2>
      </div>

      <div className="chips-container">
        {filters.map(f => (
          <button
            key={f}
            className={`chip ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="placeholder-text">Loading styling vault...</div>
      ) : filteredClothes.length > 0 ? (
        <div className="grid-layout">
          {filteredClothes.map(item => (
            <div key={item._id || item.id} className="ui-card item-card animate-fade">
              <div className="item-img-container">
                {item.imageUrl ? <img src={item.imageUrl} alt={item.name} /> : <div className="img-placeholder">No Img</div>}
                <span className="item-badge">{item.type}</span>
              </div>
              <div className="item-info">
                <h5>{item.name}</h5>
                <p>{item.color}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-box ui-card">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="empty-icon"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>
          <h3>Nothing Found</h3>
          <p>No items added for this category.</p>
        </div>
      )}
    </div>
  );
}
