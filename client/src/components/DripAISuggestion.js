/* client/src/components/DripAISuggestion.js */
import React, { useState } from 'react';
import { Sparkles, X, Heart, RefreshCw } from 'lucide-react';
import './DripAISuggestion.css';

const suggestions = [
  {
    title: "Quiet Luxury",
    text: "Minimalist, sophisticated, and effortlessly chic. Focus on neutral tones and clean silhouettes.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
    tags: ["Beige", "Cream", "Linen"]
  },
  {
    title: "Street Vibe",
    text: "Brave the city streets with oversized layers and a touch of attitude. Perfect for coffee runs or gallery hops.",
    image: "https://images.unsplash.com/photo-1529139513402-5adbc1b2c98b?auto=format&fit=crop&q=80&w=800",
    tags: ["Denim", "Graphic", "Sneakers"]
  },
  {
    title: "Midnight Noir",
    text: "Sleek, dark, and mysterious. A sophisticated choice for after-dark adventures and rooftop cocktails.",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=800",
    tags: ["Black", "Leather", "Silk"]
  },
  {
    title: "Earthy Nomad",
    text: "Grounded and natural. Deep greens and warm browns that feel as good as they look.",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800",
    tags: ["Olive", "Oat", "Cotton"]
  }
];

export default function DripAISuggestion({ isOpen, onClose }) {
  const [index, setIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  if (!isOpen) return null;

  const current = suggestions[index];

  const handleRefresh = () => {
    setIndex((index + 1) % suggestions.length);
    setIsLiked(false);
  };

  return (
    <div className="suggestion-modal-overlay" onClick={onClose}>
      <div className="suggestion-card" onClick={e => e.stopPropagation()}>
        <div className="suggestion-visual">
          <img src={current.image} alt={current.title} className="suggestion-image-main" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        <div className="suggestion-content">
          <button className="close-suggestion-btn" onClick={onClose}>
            <X size={20} />
          </button>

          <div className="suggestion-label">
            <Sparkles size={14} className="text-[#D4B499]" />
            AI Stylist Suggestion
          </div>

          <h2 className="suggestion-title">{current.title}</h2>
          <p className="suggestion-text">"{current.text}"</p>

          <div className="suggestion-items">
            {current.tags.map(tag => (
              <span key={tag} className="mini-item-tag">{tag}</span>
            ))}
          </div>

          <div className="suggestion-actions">
            <button 
              className={`btn-like-suggestion ${isLiked ? 'liked' : ''}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart size={20} fill={isLiked ? "white" : "none"} />
              {isLiked ? 'Saved to Favorites' : 'Love this look'}
            </button>
            <button className="btn-refresh-suggestion" onClick={handleRefresh}>
              <RefreshCw size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
