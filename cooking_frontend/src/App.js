import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Bawantha_components/Home'; 
import RecipeList from './Bawantha_pages/RecipeList';
import RecipeForm from './Bawantha_pages/RecipeForm';
import SharePost from './User_platform/SharePost';
import PublicPlatform from './User_platform/PublicPlatform';

import PostView from './Bawantha_pages/PostView';
import UpdateRecipe from './Bawantha_pages/UpdateRecipe';
import Login from './auth/Login';
import Register from './auth/Register';

function App() {
  const isAuthenticated = () => !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Redirect root to /login or /home based on auth */}
        <Route
          path="/"
          element={
            isAuthenticated() ? <Navigate to="/login" /> : <Navigate to="/home" />
          }
        />

       
        {/* ✅ Protected Home Route */}
        <Route
          path="/home"
          element={
            isAuthenticated() ? <Home /> : <Navigate to="/login" />
          }
        />

        {/* Optional: Protect more routes */}
        <Route path="/recipe" element={<RecipeList />} />
        <Route path="/create" element={<RecipeForm />} />
        <Route path="/edit/:id" element={<UpdateRecipe />} />
        <Route path="/public" element={<PublicPlatform />} />
        <Route path="/share" element={<SharePost />} />
        <Route path="/post/:id" element={<PostView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
