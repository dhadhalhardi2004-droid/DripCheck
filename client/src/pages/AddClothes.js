import React, { useState } from 'react';

const AddClothes = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Top',
    color: '',
    imageUrl: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call: POST /api/clothes
    setTimeout(() => {
      console.log('Submitted New Cloth:', formData);
      setIsSubmitting(false);
      alert('Added successfully!');
      setActiveTab('wardrobe');
    }, 800);
  };

  return (
    <div className="animate-fade">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2>Add New Drip</h2>
        <p>Expand your wardrobe collection.</p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Item Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className="form-control" 
              placeholder="e.g., Oversized Vintage Tee" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="type">Type</label>
            <select 
              id="type" 
              name="type" 
              className="form-control form-select" 
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="Top">Top</option>
              <option value="Bottom">Bottom</option>
              <option value="Shoes">Shoes</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="color">Color</label>
            <input 
              type="text" 
              id="color" 
              name="color" 
              className="form-control" 
              placeholder="e.g., Black, Beige, White" 
              value={formData.color}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="imageUrl">Image URL</label>
            <input 
              type="url" 
              id="imageUrl" 
              name="imageUrl" 
              className="form-control" 
              placeholder="https://example.com/image.jpg" 
              value={formData.imageUrl}
              onChange={handleChange}
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add to Collection'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClothes;
