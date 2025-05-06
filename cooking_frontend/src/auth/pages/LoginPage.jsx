import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import '../../App.css';

const LoginPage = () => (
  <div className="page-wrapper">
    <AuthForm mode="login" />
    <p className="auth-footer">
      Don’t have an account?{' '}
      <Link to="/signup" className="auth-link">
        Sign Up
      </Link>
    </p>
  </div>
);

export default LoginPage;