// client/src/pages/AddClothes.js
import React, { useState } from 'react';
import axios from 'axios';

export default function AddClothes({ setActiveTab }) {
  const [form, setForm] = useState({ name: '', type: 'Top', color: '', imageUrl: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post("http://localhost:4000/api/clothes", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("Item effectively added to vault.");
      setForm({ name: '', type: 'Top', color: '', imageUrl: '' });
      setTimeout(() => setActiveTab('wardrobe'), 1500);
    } catch (err) {
      console.error(err);
      setError("Failed to add item to vault.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper animate-fade flex-center">
      <div className="ui-card full-form-card">
        <div className="form-header text-center">
          <h2>Add to Vault</h2>
          <p>Expand your personal collection.</p>
        </div>

        {message && <div className="alert-success">{message}</div>}
        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form mt-2">
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              name="name"
              className="ui-input"
              placeholder="Oversized Denim Jacket"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>Type</label>
              <select name="type" className="ui-input pl-3" value={form.type} onChange={handleChange}>
                <option value="Top">Top</option>
                <option value="Bottom">Bottom</option>
                <option value="Shoes">Shoes</option>
                <option value="Accessory">Accessory</option>
              </select>
            </div>

            <div className="form-group flex-1">
              <label>Color</label>
              <input
                type="text"
                name="color"
                className="ui-input"
                placeholder="Beige"
                value={form.color}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              name="imageUrl"
              className="ui-input"
              placeholder="https://images.unsplash.com/..."
              value={form.imageUrl}
              onChange={handleChange}
              required
            />
          </div>

          {form.imageUrl && (
            <div className="img-preview mb-1">
              <img src={form.imageUrl} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
            </div>
          )}

          <button type="submit" className="ui-btn ui-btn-primary mt-1" disabled={loading}>
            {loading ? 'Adding item...' : 'Add to Wardrobe'}
          </button>
        </form>
      </div>
    </div>
  );
}
