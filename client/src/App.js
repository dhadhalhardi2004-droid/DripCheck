// client/src/App.js
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Wardrobe from "./pages/Wardrobe";
import AddClothes from "./pages/AddClothes";
import Profile from "./pages/Profile";
import "./index.css";

export default function App() {
  const [authState, setAuthState] = useState("login");
  const [activeTab, setActiveTab] = useState("home");
  const [user, setUser] = useState(null);

  // Restore session on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (
        savedUser &&
        savedUser !== "undefined" &&
        savedUser !== "null" &&
        token &&
        token !== "undefined"
      ) {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed._id) {
          setUser(parsed);
          setAuthState("app");
        }
      }
    } catch (error) {
      console.error("Session restore failed:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  const handleSetAuthState = (state) => {
    if (state === "app") setActiveTab("home");
    setAuthState(state);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setActiveTab("home");
    setAuthState("login");
  };

  if (authState === "login") {
    return <Login setAuthState={handleSetAuthState} setUser={setUser} />;
  }

  if (authState === "signup") {
    return <Signup setAuthState={handleSetAuthState} />;
  }

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
      />

      <main className="main-content">
        <div className="content-wrapper">
          {activeTab === "home" && (
            <Home setActiveTab={setActiveTab} user={user} />
          )}
          {activeTab === "wardrobe" && <Wardrobe />}
          {activeTab === "add" && (
            <AddClothes setActiveTab={setActiveTab} />
          )}
          {activeTab === "profile" && (
            <Profile
              user={user}
              setAuthState={handleSetAuthState}
              setUser={setUser}
            />
          )}
        </div>
      </main>
    </div>
  );
}
