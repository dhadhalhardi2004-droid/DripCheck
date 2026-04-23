import React from 'react';

const Card = ({ item }) => {
  return (
    <div className="clothing-card animate-fade">
      <div className="card-image-wrap">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="card-image"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }}
        />
      </div>
      <div className="card-content">
        <h3 className="card-title">{item.name}</h3>
        <div className="card-meta">
          <span className="card-type">{item.type}</span>
          <div className="card-color">
            <span 
              className="color-dot" 
              style={{ backgroundColor: item.color, border: item.color.toLowerCase() === 'white' ? '1px solid #ccc' : 'none' }}
            ></span>
            <span style={{ fontSize: '0.8rem', textTransform: 'capitalize' }}>{item.color}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
