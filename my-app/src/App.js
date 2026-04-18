import React, { useState, useEffect, useCallback } from "react";
import LoginSignup from "./LoginSignup";
import Dashboard from "./Dashboard";
import "./App.css";
import { SESSION_EMAIL_KEY, SESSION_ROLE_KEY, normalizeEmail } from "./userStorage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(SESSION_EMAIL_KEY);
    if (saved) {
      const savedRole = localStorage.getItem(SESSION_ROLE_KEY) || "user";
      setUserEmail(saved);
      setUserRole(savedRole);
      setLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = useCallback((email, role = "user") => {
    const normalized = normalizeEmail(email);
    localStorage.setItem(SESSION_EMAIL_KEY, normalized);
    localStorage.setItem(SESSION_ROLE_KEY, role);
    setUserEmail(normalized);
    setUserRole(role);
    setLoggedIn(true);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(SESSION_EMAIL_KEY);
    localStorage.removeItem(SESSION_ROLE_KEY);
    setUserEmail(null);
    setUserRole(null);
    setLoggedIn(false);
  }, []);

  return (
    <div>
      {loggedIn && userEmail ? (
        <Dashboard 
          userEmail={userEmail} 
          userRole={userEmail.includes("admin") ? "admin" : userRole} 
          onLogout={handleLogout} 
        />
      ) : (
        <div className="login-page">
          <LoginSignup onLoginSuccess={handleLoginSuccess} />
        </div>
      )}
    </div>
  );
}

export default App;
