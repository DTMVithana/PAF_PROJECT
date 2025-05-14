import React from 'react';
import '../auth.css';

const AuthForm = ({ children }) => {
  return (
    <div className="auth-container flex justify-center items-center min-h-screen w-full">
      <div className="auth-card grid grid-cols-1 md:grid-cols-2 shadow-lg rounded-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default AuthForm;
