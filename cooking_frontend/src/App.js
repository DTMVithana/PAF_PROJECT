import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Bawantha_components/Home'; 
import RecipeList from './Bawantha_pages/RecipeList';
import RecipeForm from './Bawantha_pages/RecipeForm';
import SharePost from './Bawantha_components/SharePost';
import PublicPlatform from './Bawantha_components/PublicPlatform';
import PostView from './Bawantha_pages/PostView';
import UpdateRecipe from './Bawantha_pages/UpdateRecipe';

// 👇 Your meal-plan pages
import MealPlanList from './Dineth_pages/MealPlanList';
import MealPlanForm from './Dineth_pages/MealPlanForm';
import UpdateMealPlan from './Dineth_pages/UpdateMealPlan';
import MealPlanDetails from './Dineth_pages/MealPlanDetails';


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


                {/* Dineth (MealPlan) routes */}
                <Route path="/mealplan" element={<MealPlanList />} />
        <Route path="/mealplan/create" element={<MealPlanForm />} />
        <Route path="/mealplan/edit/:id" element={<UpdateMealPlan />} />
        <Route path="/mealplan/view/:id" element={<MealPlanDetails />} />
        

      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
