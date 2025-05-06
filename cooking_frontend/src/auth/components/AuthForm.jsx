import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../auth.css";

const AuthForm = ({ mode }) => {
  const isLogin = mode === "login";
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    profilePhotoUrl: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ——— endpoint & body ———
    const url = isLogin ? "/api/auth/login" : "/api/auth/register";
    const payload = isLogin
      ? { username: form.username, password: form.password }
      : form;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      // ---------- error handling ----------
      if (!res.ok) {
        const msg = await res.text();          // backend sends plain text on 4xx
        throw new Error(msg || "Request failed");
      }

      // backend returns JSON on success
      const data = await res.json();           // { message, userId }

      if (isLogin) {
        // 👉 you can store userId or keep it stateless for now
        localStorage.setItem("userId", data.userId);
        alert("Login successful!");
        navigate("/home");                     // change to "/" if that’s your route
      } else {
        alert("Signup successful — please log in.");
        navigate("/login");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <>
            <label>
              Name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Profile Photo URL
              <input
                name="profilePhotoUrl"
                value={form.profilePhotoUrl}
                onChange={handleChange}
              />
            </label>
          </>
        )}

        <label>
          Username
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </label>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>
      </form>
    </div>
  );
};

AuthForm.propTypes = {
  mode: PropTypes.oneOf(["login", "signup"]).isRequired
};

export default AuthForm;
