import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './Tharinda_components/Home'; 
import ProgressRecipeList from './Tharinda_pages/ProgressRecipeList';
import RecipeProgressForm from './Tharinda_pages/RecipeProgressForm';
import SharePost from './Tharinda_components/SharePost';
import PublicPlatform from './Tharinda_components/PublicPlatform';
import ProgressPostView from './Tharinda_pages/ProgressPostView';
import UpdateProgressRecipe from './Tharinda_pages/UpdateProgressRecipe';
import OnGoing from './Tharinda_components/OnGoing'; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} /> {/* ✅ Show Home by default */}
        <Route path="/recipe" element={<ProgressRecipeList />} />
        <Route path="/create" element={<RecipeProgressForm />} />
        <Route path="/edit/:id" element={<UpdateProgressRecipe />} />
        <Route path="/public" element={<PublicPlatform />} />
        <Route path="/share" element={<SharePost />} />
        <Route path="/ongoing" element={<OnGoing />} />
        <Route path="/post/:id" element={<ProgressPostView />} />
        <Route path="/update/:id" element={<UpdateProgressRecipe />} />

      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
