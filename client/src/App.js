import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Wardrobe from './pages/Wardrobe';
import AddClothes from './pages/AddClothes';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  // 'login', 'signup', or 'app'
  const [authState, setAuthState] = useState('login'); 
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'wardrobe', 'add', 'profile'
  const [user, setUser] = useState(null); // stores { name, email, gender }

  if (authState === 'login') {
    return <Login setAuthState={setAuthState} setUser={setUser} />;
  }

  if (authState === 'signup') {
    return <Signup setAuthState={setAuthState} setUser={setUser} />;
  }

  // Main App View
  return (
    <div className="app-container animate-fade">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
        {activeTab === 'wardrobe' && <Wardrobe />}
        {activeTab === 'add' && <AddClothes setActiveTab={setActiveTab} />}
        {activeTab === 'profile' && <Profile user={user} setAuthState={setAuthState} setUser={setUser} />}
      </main>
    </div>
  );
}

export default App;