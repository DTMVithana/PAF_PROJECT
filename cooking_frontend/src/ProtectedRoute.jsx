import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Very small gatekeeper.
 * • We stored the logged‑in user’s ID in localStorage under "userId".
 * • If it isn’t there, kick the visitor to /login.
 */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("userId");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
