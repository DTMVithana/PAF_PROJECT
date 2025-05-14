import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  
const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('/api/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      alert('Failed to fetch recipes. Make sure the backend is running on http://localhost:9090 and the proxy is set.');
    }
  };

  const deleteRecipe = async (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await axios.delete(`/api/recipes/${id}`);
        fetchRecipes(); 
      } catch (error) {
        console.error('Error deleting recipe:', error);
        alert('Failed to delete recipe.');
      }
    }
  };

  const shareThisPost = async (id) => {
    try {
      await axios.put(`/api/recipes/${id}/share`);
      alert('Post shared to public platform!');
    } catch (error) {
      console.error('Share failed:', error.response || error.message);
      alert('Failed to share post.');
    }
  };
  
  

  return (
    <div style={{ padding: '20px' }}>
      <h2>🍽️ Recipes</h2>
<div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
  <Link to="/create">
    <button style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 14px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
      ➕ Create New Recipe
    </button>
  </Link>

  
</div>


      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {recipes.map((recipe) => (
            <li key={recipe.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px' }}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {(recipe.mediaUrls || []).map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`${recipe.title} media ${index + 1}`}
                    style={{ width: '200px', height: 'auto', margin: '5px' }}
                  />
                ))}
              </div>
             <div style={{ marginTop: '10px' }}>
  {currentUser && recipe.author === currentUser.username ? (
    <>
      <Link to={`/edit/${recipe.id}`}>
        <button style={{ marginRight: '10px' }}>Edit</button>
      </Link>
      <button onClick={() => deleteRecipe(recipe.id)} style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }}>
        Delete
      </button>
    </>
  ) : null}
  
  <button
    onClick={() => shareThisPost(recipe.id)}
    style={{ backgroundColor: '#17a2b8', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
  >
    📤 Share This Post
  </button>
   <button
    onClick={() => navigate(`/post/${recipe.id}`)}
    style={{ backgroundColor: '#6c757d', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
  >
    👁️ View
  </button>
</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
