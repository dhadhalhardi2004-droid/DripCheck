import React, { useState } from 'react';

const Login = ({ setAuthState, setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock API validation: POST /api/auth/login
    setTimeout(() => {
      if (formData.email === 'test@dripcheck.com' && formData.password === 'password') {
        setUser({
          name: 'Jane Fashion',
          email: 'test@dripcheck.com',
          gender: 'Female' // Providing a gender as per the new feature for mock tests
        });
        setIsLoading(false);
        setAuthState('app');
      } else if (formData.email === '' || formData.password === '') {
        setError('Please fill in all fields.');
        setIsLoading(false);
      } else {
        setError('Invalid credentials. (Hint: test@dripcheck.com / password)');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="auth-page animate-fade">
      <div className="auth-left">
        <img 
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80" 
          alt="Fashion Wardrobe" 
          className="auth-image" 
        />
        <div className="auth-left-overlay">
          <h1 className="auth-title">DripCheck</h1>
          <p className="auth-subtitle">Elevate your daily rotation.</p>
        </div>
      </div>
      
      <div className="auth-right">
        <div className="auth-form-container">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Enter your details to access your wardrobe.</p>
          </div>

          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleSubmit}>
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
                placeholder="••••••••" 
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Login'}
            </button>
          </form>

          <a href="#!" className="auth-link" onClick={(e) => { e.preventDefault(); setAuthState('signup'); }}>
            Don't have an account? <span>Sign up</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
