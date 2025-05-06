import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../auth.css';

const AuthForm = ({ mode }) => {
  const isLogin = mode === 'login';
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    name: '',
    profilePhotoUrl: ''
  });
  const [error, setError] = useState('');

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const url = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const payload = isLogin
      ? { username: form.username, password: form.password }
      : form;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        let msg = 'Request failed';
        try {
          const errBody = await res.json();
          msg = errBody.message || msg;
        } catch {}
        throw new Error(msg);
      }

      // read body safely even if empty
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (isLogin) {
        if (!data.token) throw new Error('No token received');
        localStorage.setItem('authToken', data.token);
        alert('Login successful! Redirecting…');
        navigate('/');  // or wherever your protected home is
      } else {
        alert('Signup successful! Please log in.');
        navigate('/login');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
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
                required
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
        <button type="submit">
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

AuthForm.propTypes = {
  mode: PropTypes.oneOf(['login', 'signup']).isRequired
};

export default AuthForm;
