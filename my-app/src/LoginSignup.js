import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { normalizeEmail } from "./userStorage";

function LoginSignup({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await axios.post("http://127.0.0.1:5000/login", {
          email: email,
          password: password,
        });

        if (res.data.success) {
          onLoginSuccess(normalizeEmail(email), res.data.role);
        } else {
          alert(res.data.message || "Invalid credentials");
        }
      } else {
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }

        const res = await axios.post("http://127.0.0.1:5000/signup", {
          name: name,
          email: email,
          password: password,
        });

        alert(res.data.message || "Signup attempt finished");

        if (res.data.success) {
          setIsLogin(true);
        }
      }
    } catch (error) {
      console.log("FULL ERROR:", error);
      alert(error.response?.data?.message || "Server error: check console");
    }
  };

  return (
    <div className="container">
      <div className="header-section">
        <h2 className="title">{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <p className="subtitle">
          {isLogin ? "Login to access your dashboard" : "Sign up to get started"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <div className="input-box">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="input-box">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {!isLogin && (
          <div className="input-box">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit" className="btn">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? " Create One" : " Login Here"}
        </span>
      </p>
    </div>
  );
}

export default LoginSignup;
