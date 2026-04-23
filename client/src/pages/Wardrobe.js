import React, { useState } from 'react';
import Card from '../components/Card';

const MOCK_CLOTHES = [
  { id: 1, name: "Oversized Vintage Tee", type: "Top", color: "Black", imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Cargo Parachute Pants", type: "Bottom", color: "Beige", imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Chunky White Sneakers", type: "Shoes", color: "White", imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Knit Sweater", type: "Top", color: "Grey", imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80" },
  { id: 5, name: "Washed Denim Jeans", type: "Bottom", color: "Blue", imageUrl: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&w=800&q=80" },
  { id: 6, name: "Tech Fleece Hoodie", type: "Top", color: "Grey", imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80" },
];

const Wardrobe = () => {
  const [filter, setFilter] = useState('All');
  const [suggestedFit, setSuggestedFit] = useState(null);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const filters = ['All', 'Top', 'Bottom', 'Shoes'];

  const filteredClothes = filter === 'All' 
    ? MOCK_CLOTHES 
    : MOCK_CLOTHES.filter(item => item.type.toLowerCase() === filter.toLowerCase());

  const handleSuggestOutfit = () => {
    setIsSuggesting(true);
    // Simulate AI loading via mockup API call (GET /api/ai/suggest)
    setTimeout(() => {
      const top = MOCK_CLOTHES.find(c => c.type === 'Top');
      const bottom = MOCK_CLOTHES.find(c => c.type === 'Bottom');
      const shoes = MOCK_CLOTHES.find(c => c.type === 'Shoes');
      setSuggestedFit([top, bottom, shoes].filter(Boolean));
      setIsSuggesting(false);
    }, 800);
  };

  return (
    <div className="animate-fade">
      {/* AI Suggestion Section */}
      <section className="ai-section">
        <div className="ai-header">
          <h2>AI Outfit Suggestion</h2>
          <p>Let DripCheck compute your next perfect fit.</p>
        </div>
        
        {suggestedFit ? (
          <div className="ai-grid animate-fade">
            {suggestedFit.map((item, index) => (
              <Card key={`ai-${item.id}-${index}`} item={item} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>"No suggestion yet"</p>
          </div>
        )}
        
        <button 
          className="btn btn-primary" 
          style={{ marginTop: '2rem' }}
          onClick={handleSuggestOutfit}
          disabled={isSuggesting}
        >
          {isSuggesting ? 'Computing...' : '✨ Suggest Outfit'}
        </button>
      </section>

      {/* Wardrobe Section */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>My Wardrobe</h2>
        </div>

        <div className="filter-bar">
          {filters.map(f => (
            <button 
              key={f}
              className={`btn ${filter === f ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter(f)}
              style={{ borderRadius: '20px', padding: '0.4rem 1.2rem', fontSize: '0.9rem' }}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="card-grid">
          {filteredClothes.length > 0 ? (
            filteredClothes.map(item => (
              <Card key={item.id} item={item} />
            ))
          ) : (
            <div className="empty-state" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
              <p>No {filter.toLowerCase()} found in your wardrobe.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Wardrobe;
