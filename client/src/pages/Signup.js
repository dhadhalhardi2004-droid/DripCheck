import React, { useState } from 'react';

const Signup = ({ setAuthState, setUser }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    gender: 'Male' // Default gender
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const setGender = (gender) => {
    setFormData(prev => ({ ...prev, gender }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setTimeout(() => {
        setError('Please fill in all required fields.');
        setIsLoading(false);
      }, 500);
      return;
    }

    // Mock API registration: POST /api/auth/register
    setTimeout(() => {
      console.log('Registered User Payload:', formData);
      setUser({
        name: formData.name,
        email: formData.email,
        gender: formData.gender
      });
      setIsLoading(false);
      setAuthState('app');
    }, 1200);
  };

  return (
    <div className="auth-page animate-fade">
      <div className="auth-left">
        <img 
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80" 
          alt="Minimalist Fashion" 
          className="auth-image" 
        />
        <div className="auth-left-overlay">
          <h1 className="auth-title">DripCheck</h1>
          <p className="auth-subtitle">Join the minimal aesthetic movement.</p>
        </div>
      </div>
      
      <div className="auth-right">
        <div className="auth-form-container">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Start managing your outfits today.</p>
          </div>

          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="form-control" 
                placeholder="e.g. Alex Doe" 
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="form-control" 
                placeholder="you@example.com" 
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                className="form-control" 
                placeholder="Create a password" 
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <div className="gender-toggle">
                <button
                  type="button"
                  className={`gender-btn ${formData.gender === 'Male' ? 'active' : ''}`}
                  onClick={() => setGender('Male')}
                >
                  Male
                </button>
                <button
                  type="button"
                  className={`gender-btn ${formData.gender === 'Female' ? 'active' : ''}`}
                  onClick={() => setGender('Female')}
                >
                  Female
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          <a href="#!" className="auth-link" onClick={(e) => { e.preventDefault(); setAuthState('login'); }}>
            Already have an account? <span>Login</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
