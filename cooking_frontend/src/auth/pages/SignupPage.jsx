import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signup } from '../services/auth';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheckCircle } from 'react-icons/fi';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
   
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field]
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const submissionData = {
        username: formData.username,
        email: formData.email,
        password: formData.password
      };
     

      await signup(submissionData);

      toast.success('Registration successful! Please login.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* Brand Section */}
        <div className="brand-section">
          <div className="hotel-logo">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7V22H22V7L12 2Z" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 22V12H7V22" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 2V12" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="hotel-name">Cooking Skills Sharing</h1>
                    <h2 className="hotel-tagline"></h2>
                    
                    <div className="separator"></div>
                    
                    <p className="brand-description">Sharing Your Cooking Skills</p>
                    
                    <div className="feature-list">
                      <div className="feature-item">
                        <FiCheckCircle className="feature-icon" />
                        <span>Completed Recipes</span>
                      </div>
                      <div className="feature-item">
                        <FiCheckCircle className="feature-icon" />
                        <span>Ongoing Recipes</span>
                      </div>
                      <div className="feature-item">
                        <FiCheckCircle className="feature-icon" />
                        <span>Meal Plans</span>
                      </div>
                      <div className="feature-item">
                        <FiCheckCircle className="feature-icon" />
                        <span>Post Sharing</span>
                      </div>
          </div>
          
          <div className="brand-background"></div>
        </div>
        
        {/* Form Section */}
        <div className="form-section">
          <div className="form-header">
            <h2>Create Account</h2>
            <p>Join our skills sharing platform</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="input-group">
              <label htmlFor="username">
                Username
              </label>
              <div className="input-container">
                <FiUser className="input-icon" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="input-group">
              <label htmlFor="email">
                Email Address
              </label>
              <div className="input-container">
                <FiMail className="input-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div className="input-group">
              <label htmlFor="password">
                Password
              </label>
              <div className="input-container">
                <FiLock className="input-icon" />
                <input
                  id="password"
                  name="password"
                  type={showPassword.password ? 'text' : 'password'}
                  required
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('password')}
                >
                  {showPassword.password ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="input-container">
                <FiLock className="input-icon" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  required
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                >
                  {showPassword.confirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Admin Toggle */}
           

            

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`submit-button ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="form-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login">Sign in to your account</Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* CSS Styles */}
      <style jsx>{`
        /* Global Styles */
        :root {
          --primary-color: #1e3a8a;
          --primary-light: #2563eb;
          --secondary-color: #f59e0b;
          --text-dark: #1f2937;
          --text-light: #6b7280;
          --text-lighter: #9ca3af;
          --bg-light: #f3f4f6;
          --bg-white: #ffffff;
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          --radius-sm: 0.25rem;
          --radius-md: 0.5rem;
          --radius-lg: 1rem;
          --transition: all 0.3s ease;
        }

        /* Layout Styles */
        .signup-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 2rem;
          background-color: #f0f4f8;
          background-image: 
            radial-gradient(at 90% 10%, rgba(37, 99, 235, 0.1) 0px, transparent 50%),
            radial-gradient(at 10% 90%, rgba(245, 158, 11, 0.1) 0px, transparent 50%);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .signup-card {
          display: flex;
          width: 100%;
          max-width: 1200px;
          min-height: 700px;
          background-color: var(--bg-white);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        /* Brand Section Styles */
        .brand-section {
          position: relative;
          flex: 1;
          padding: 3rem;
          color: white;
          background-color: var(--primary-color);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          overflow: hidden;
        }

        .brand-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E"),
            linear-gradient(135deg, rgba(30, 58, 138, 1) 0%, rgba(29, 78, 216, 1) 100%);
          z-index: 0;
        }

        .hotel-logo {
          position: relative;
          z-index: 1;
          margin-bottom: 1rem;
        }

        .hotel-name {
          position: relative;
          z-index: 1;
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0;
          line-height: 1.2;
        }

        .hotel-tagline {
          position: relative;
          z-index: 1;
          font-size: 1.5rem;
          font-weight: 300;
          margin: 0;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .separator {
          position: relative;
          z-index: 1;
          width: 100px;
          height: 3px;
          background-color: var(--secondary-color);
          margin-bottom: 2rem;
        }

        .brand-description {
          position: relative;
          z-index: 1;
          font-size: 1.125rem;
          margin-bottom: 2.5rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.9);
        }

        .feature-list {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: auto;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1rem;
        }

        .feature-icon {
          color: var(--secondary-color);
          flex-shrink: 0;
        }

        /* Form Section Styles */
        .form-section {
          flex: 1;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-white);
          overflow-y: auto;
        }

        .form-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .form-header h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--text-dark);
          margin: 0;
          margin-bottom: 0.5rem;
        }

        .form-header p {
          font-size: 1.125rem;
          color: var(--text-light);
          margin: 0;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .input-group label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-dark);
        }

        .input-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-lighter);
        }

        .input-container input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          font-size: 1rem;
          border: 1px solid #e5e7eb;
          border-radius: var(--radius-md);
          transition: var(--transition);
          box-shadow: var(--shadow-sm);
        }

        .input-container input:focus {
          outline: none;
          border-color: var(--primary-light);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .input-container input::placeholder {
          color: var(--text-lighter);
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-lighter);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .password-toggle:hover {
          color: var(--text-light);
        }

        .admin-toggle-container {
          margin-top: 0.5rem;
        }

        .admin-toggle {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .admin-slider {
          position: relative;
          width: 36px;
          height: 20px;
          background-color: #e5e7eb;
          border-radius: 20px;
          margin-right: 10px;
          transition: var(--transition);
        }

        .admin-toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .admin-dot {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          border-radius: 50%;
          transition: var(--transition);
        }

        .admin-toggle input:checked + .admin-slider {
          background-color: var(--primary-light);
        }

        .admin-toggle input:checked + .admin-slider .admin-dot {
          transform: translateX(16px);
        }

        .admin-text {
          font-size: 0.875rem;
          color: var(--text-light);
        }

        .admin-code-group {
          animation: fadeIn 0.3s ease-in-out;
        }

        .submit-button {
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 500;
          color: white;
          background-color: var(--primary-color);
          border: none;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 48px;
        }

        .submit-button:hover:not(:disabled) {
          background-color: var(--primary-light);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          margin-right: 0.5rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }

        .form-footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.875rem;
          color: var(--text-light);
        }

        .form-footer a {
          color: var(--primary-light);
          text-decoration: none;
          font-weight: 500;
          transition: var(--transition);
        }

        .form-footer a:hover {
          text-decoration: underline;
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          .signup-card {
            flex-direction: column;
            max-width: 600px;
          }

          .brand-section {
            padding: 2rem;
          }

          .feature-list {
            margin-top: 2rem;
            margin-bottom: 1rem;
          }
        }

        @media (max-width: 640px) {
          .signup-container {
            padding: 1rem;
          }

          .signup-card {
            border-radius: var(--radius-md);
            min-height: 0;
          }

          .brand-section, .form-section {
            padding: 1.5rem;
          }

          .hotel-name {
            font-size: 2rem;
          }

          .hotel-tagline {
            font-size: 1.25rem;
          }

          .form-header h2 {
            font-size: 1.5rem;
          }

          .form-header p {
            font-size: 1rem;
          }
        }
      `}</style>
      
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Signup;