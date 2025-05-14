// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './Bawantha_components/Home'; 
// import RecipeList from './Bawantha_pages/RecipeList';
// import RecipeForm from './Bawantha_pages/RecipeForm';
// import SharePost from './Bawantha_components/SharePost';
// import PublicPlatform from './Bawantha_components/PublicPlatform';
// import PostView from './Bawantha_pages/PostView';
// import UpdateRecipe from './Bawantha_pages/UpdateRecipe';

// // 👇 Your meal-plan pages
// import MealPlanList from './Dineth_pages/MealPlanList';
// import MealPlanForm from './Dineth_pages/MealPlanForm';
// import UpdateMealPlan from './Dineth_pages/UpdateMealPlan';
// import MealPlanDetails from './Dineth_pages/MealPlanDetails';


// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//       <Route path="/" element={<Home />} /> {/* ✅ Show Home by default */}
//         <Route path="/recipe" element={<RecipeList />} />
//         <Route path="/create" element={<RecipeForm />} />
//         <Route path="/edit/:id" element={<UpdateRecipe />} />
//         <Route path="/public" element={<PublicPlatform />} />
//         <Route path="/share" element={<SharePost />} />
//         <Route path="/post/:id" element={<PostView />} />


//                 {/* Dineth (MealPlan) routes */}
//                 <Route path="/mealplan" element={<MealPlanList />} />
//         <Route path="/mealplan/create" element={<MealPlanForm />} />
//         <Route path="/mealplan/edit/:id" element={<UpdateMealPlan />} />
//         <Route path="/mealplan/view/:id" element={<MealPlanDetails />} />
        

      
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;




import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './User_platform/Home'; 
import RecipeList from './Bawantha_pages/RecipeList';
import RecipeForm from './Bawantha_pages/RecipeForm';
import SharePost from './User_platform/SharePost';
import PublicPlatform from './User_platform/PublicPlatform';
import PostView from './Bawantha_pages/PostView';
import UpdateRecipe from './Bawantha_pages/UpdateRecipe';
import LoginPage from './auth/pages/LoginPage';
import SignupPage from './auth/pages/SignupPage';
import UserProfile from './User_platform/UserProfile';


import MealPlanList from './Dineth_pages/MealPlanList';
import MealPlanForm from './Dineth_pages/MealPlanForm';
import UpdateMealPlan from './Dineth_pages/UpdateMealPlan';
import MealPlanDetails from './Dineth_pages/MealPlanDetails';





const PrivateRoute = ({ children }) =>
  localStorage.getItem("user")
    ? children
    : <Navigate to="/login" replace />;

function App() {
  return (
    <div className="App">
      

      <main>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
     
     
     
     
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
         
         
         
          <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
        <Route path="/recipe" element={<RecipeList />} />
        <Route path="/create" element={<RecipeForm />} />
        <Route path="/edit/:id" element={<UpdateRecipe />} />
        <Route path="/public" element={<PublicPlatform />} />
        <Route path="/share" element={<SharePost />} />
        <Route path="/post/:id" element={<PostView />} />
        <Route path="/profile" element={<UserProfile />} />
        
        <Route path="/signup" element={<SignupPage />} />
          {/* protected routes go here */}

                 <Route path="/mealplan" element={<MealPlanList />} />
        <Route path="/mealplan/create" element={<MealPlanForm />} />
        <Route path="/mealplan/edit/:id" element={<UpdateMealPlan />} />
        <Route path="/mealplan/view/:id" element={<MealPlanDetails />} />
        </Routes>
      </main>
    </div>


    
  );
}

export default App;