
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './User_platform/Home'; 
import RecipeList from './Bawantha_pages/RecipeList';
import RecipeForm from './Bawantha_pages/RecipeForm';
import SharePost from './User_platform/SharePost';
import PublicPlatform from './User_platform/PublicPlatform';
import PostView from './Bawantha_pages/PostView';
import UpdateRecipe from './Bawantha_pages/UpdateRecipe';
import QuestionPage from './Uvindu_pages/QuestionPage';

import LoginPage from './auth/pages/LoginPage';
import SignupPage from './auth/pages/SignupPage';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/login">Login</Link> |{' '}
        <Link to="/signup">Sign Up</Link>
      </nav>

      <main>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Home />} /> 
        <Route path="/recipe" element={<RecipeList />} />
        <Route path="/create" element={<RecipeForm />} />
        <Route path="/edit/:id" element={<UpdateRecipe />} />
        <Route path="/public" element={<PublicPlatform />} />
        <Route path="/share" element={<SharePost />} />
        <Route path="/post/:id" element={<PostView />} />
        <Route path="/recipe/:recipeId/questions" element={<QuestionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
          {/* protected routes go here */}
        </Routes>
      </main>
    </div>


    
  );
}

export default App;

