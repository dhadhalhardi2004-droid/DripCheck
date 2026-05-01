// client/src/pages/Home.js
import React, { useState } from 'react';
import './Home.css';

/* ── Icons ─────────────────────────────────────── */
const IconWeatherSun = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2"></path>
    <path d="M12 20v2"></path>
    <path d="M4.93 4.93l1.41 1.41"></path>
    <path d="M17.66 17.66l1.41 1.41"></path>
    <path d="M2 12h2"></path>
    <path d="M20 12h2"></path>
    <path d="M4.93 19.07l1.41-1.41"></path>
    <path d="M17.66 6.34l1.41-1.41"></path>
  </svg>
);

const IconArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const IconTShirt = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.38 3.46L16 2a8.5 8.5 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
  </svg>
);

const IconHeart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const ChatBubble = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

export default function Home({ setActiveTab, user }) {
  // Adding small state for heart toggle simulation
  const [liked, setLiked] = useState({});

  const toggleLike = (id) => setLiked(prev => ({ ...prev, [id]: !prev[id] }));

  const summerOutfits = [
    { id: 's1', img: '/images/summer_1.jpg', tag: 'Sun-kissed · 32°C · Sunny', name: 'Yellow Linen Chic' },
    { id: 's2', img: '/images/summer_2.jpg', tag: 'Breezy · 28°C · Clear', name: 'Olive & White' },
    { id: 's3', img: '/images/summer_3.jpg', tag: 'City Walk · 30°C · Sunny', name: 'Minimalist Crop' },
    { id: 's4', img: '/images/summer_4.jpg', tag: 'Casual Day · 26°C · Cloudy', name: 'Classic Denim' },
    { id: 's5', img: '/images/summer_5.jpg', tag: 'Summer Stroll · 29°C · Sunny', name: 'Denim Corset' },
  ];

  const winterOutfits = [
    { id: 'w1', img: '/images/winter_1.jpg', tag: 'Cozy · 12°C · Chilly', name: 'Cream Knit Dress' },
    { id: 'w2', img: '/images/winter_2.jpg', tag: 'Casual · 10°C · Overcast', name: 'Grey Cardigan' },
    { id: 'w3', img: '/images/winter_3.jpg', tag: 'Minimal · 14°C · Windy', name: 'White Button Knit' },
    { id: 'w4', img: '/images/winter_4.jpg', tag: 'Sleek · 8°C · Cold', name: 'Navy Layered Look' },
    { id: 'w5', img: '/images/winter_5.jpg', tag: 'Chic · 11°C · Sunny', name: 'Mauve Crop Sweater' },
  ];

  return (
    <div className="home-new-container animate-fade">
      {/* --- Intro Section --- */}
      <div className="intro-section">
        <div className="weather-pill">
          <IconWeatherSun />
          <span>32°C · Sunny in your city</span>
        </div>
        
        <h1 className="greeting-title">
          Hey {user?.name || 'there'} <span className="wave-emoji" role="img" aria-label="wave">👋</span>
        </h1>
        <h2 className="greeting-subtitle">
          Here's your drip for today.
        </h2>
        
        <p className="intro-desc">
          We pulled three fits from your wardrobe — tuned to today's weather and your usual vibe. Tap any look to break it down.
        </p>
        
        <div className="action-buttons">
          <button className="btn-dark" onClick={() => {
             document.getElementById('looks-section').scrollIntoView({ behavior: 'smooth' });
          }}>
            See today's looks <IconArrowRight />
          </button>
          <button className="btn-light" onClick={() => setActiveTab('wardrobe')}>
            <IconTShirt /> My wardrobe
          </button>
        </div>
      </div>

      {/* --- Large Outfit Cards Section (Summer) --- */}
      <div id="looks-section" className="section-header-row">
        <h2 className="section-title-serif">Summer Collection</h2>
      </div>
      <div className="large-cards-container">
        {summerOutfits.map((outfit) => (
          <div key={outfit.id} className="large-outfit-card">
            <img src={outfit.img} alt={outfit.name} className="card-bg-img" />
            <div className="card-top-tags">
              <div className="weather-tag-white">{outfit.tag}</div>
              <button className={`heart-btn ${liked[outfit.id] ? 'liked' : ''}`} onClick={() => toggleLike(outfit.id)}>
                <IconHeart />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- Large Outfit Cards Section (Winter) --- */}
      <div className="section-header-row">
        <h2 className="section-title-serif">Winter Aesthetics</h2>
      </div>
      <div className="large-cards-container">
        {winterOutfits.map((outfit) => (
          <div key={outfit.id} className="large-outfit-card">
            <img src={outfit.img} alt={outfit.name} className="card-bg-img" />
            <div className="card-top-tags">
              <div className="weather-tag-white">{outfit.tag}</div>
              <button className={`heart-btn ${liked[outfit.id] ? 'liked' : ''}`} onClick={() => toggleLike(outfit.id)}>
                <IconHeart />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- Small Cards Grid --- */}
      <div className="small-cards-grid">
        <div className="small-outfit-card">
          <h3 className="card-title-serif">Sunny Chic</h3>
          <div className="clothing-list">
            <div className="clothing-item">
              <div className="item-thumbnail"><img src="/images/summer_1.jpg" alt="Top" /></div>
              <div className="item-details">
                <span className="item-type">Top:</span> Yellow Button-down
              </div>
            </div>
            <div className="clothing-item">
              <div className="item-thumbnail"><img src="/images/summer_1.jpg" alt="Bottom" /></div>
              <div className="item-details">
                <span className="item-type">Bottom:</span> Khaki Mini Skirt
              </div>
            </div>
            <div className="clothing-item">
              <div className="item-thumbnail"><img src="/images/summer_1.jpg" alt="Accessory" /></div>
              <div className="item-details">
                <span className="item-type">Accessory:</span> Beige Cap
              </div>
            </div>
          </div>
        </div>

        <div className="small-outfit-card">
          <h3 className="card-title-serif">Winter Layers</h3>
          <div className="clothing-list">
            <div className="clothing-item">
              <div className="item-thumbnail"><img src="/images/winter_1.jpg" alt="Dress" /></div>
              <div className="item-details">
                <span className="item-type">Dress:</span> Ribbed Knit Mini
              </div>
            </div>
            <div className="clothing-item">
              <div className="item-thumbnail"><img src="/images/winter_1.jpg" alt="Leggings" /></div>
              <div className="item-details">
                <span className="item-type">Layer:</span> Sheer Black Tights
              </div>
            </div>
            <div className="clothing-item">
              <div className="item-thumbnail"><img src="/images/winter_1.jpg" alt="Boots" /></div>
              <div className="item-details">
                <span className="item-type">Boots:</span> Knee-high Leather
              </div>
            </div>
          </div>
        </div>

        <div className="small-outfit-card">
          <h3 className="card-title-serif">Grey Cardigan</h3>
          <div className="clothing-list">
            <div className="clothing-item">
              <div className="item-thumbnail"><img src="/images/winter_2.jpg" alt="Top" /></div>
              <div className="item-details">
                <span className="item-type">Top:</span> Oversized Grey Knit
              </div>
            </div>
            <div className="clothing-item">
              <div className="item-thumbnail"><img src="/images/winter_2.jpg" alt="Bottom" /></div>
              <div className="item-details">
                <span className="item-type">Bottom:</span> Light Wash Denim
              </div>
            </div>
            <div className="clothing-item">
              <div className="item-thumbnail"><img src="/images/winter_2.jpg" alt="Bag" /></div>
              <div className="item-details">
                <span className="item-type">Bag:</span> Cream Top-handle
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Night Out Card --- */}
      <div className="large-outfit-card night-card">
        <img src="/images/night_outfit_1777462781829.png" alt="Night Outfit" className="card-bg-img" />
        <div className="card-top-tags">
          <div className="weather-tag-dark">Night out · 24°C · Clear</div>
          <button className={`heart-btn ${liked['night'] ? 'liked' : ''}`} onClick={() => toggleLike('night')}>
            <IconHeart />
          </button>
        </div>
      </div>

      <button className="chat-fab-new">
         <ChatBubble />
      </button>
    </div>
  );
}
