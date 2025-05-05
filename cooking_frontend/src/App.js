
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Bawantha_components/Home'; 
import RecipeList from './Bawantha_pages/RecipeList';
import RecipeForm from './Bawantha_pages/RecipeForm';
import SharePost from './User_platform/SharePost';
import PublicPlatform from './User_platform/PublicPlatform';
import PostView from './Bawantha_pages/PostView';
import UpdateRecipe from './Bawantha_pages/UpdateRecipe';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} /> {/* ✅ Show Home by default */}
        <Route path="/recipe" element={<RecipeList />} />
        <Route path="/create" element={<RecipeForm />} />
        <Route path="/edit/:id" element={<UpdateRecipe />} />
        <Route path="/public" element={<PublicPlatform />} />
        <Route path="/share" element={<SharePost />} />
        <Route path="/post/:id" element={<PostView />} />

      
      </Routes>
    </BrowserRouter>
  );
}

export default App;

