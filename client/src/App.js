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

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (savedUser && savedUser !== "undefined" && token) {
        setUser(JSON.parse(savedUser));
        setAuthState("app");
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  if (authState === "login") {
    return <Login setAuthState={setAuthState} setUser={setUser} />;
  }

  if (authState === "signup") {
    return <Signup setAuthState={setAuthState} />;
  }

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="content-wrapper">
          {activeTab === "home" && <Home setActiveTab={setActiveTab} user={user} />}
          {activeTab === "wardrobe" && <Wardrobe />}
          {activeTab === "add" && <AddClothes setActiveTab={setActiveTab} />}
          {activeTab === "profile" && <Profile user={user} setAuthState={setAuthState} setUser={setUser} />}
        </div>
      </main>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
