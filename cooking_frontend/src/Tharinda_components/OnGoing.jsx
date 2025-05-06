import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OnGoing = () => {
  const [ongoingRecipes, setOngoingRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/progress-recipes/ongoing')
      .then(response => setOngoingRecipes(response.data))
      .catch(error => console.error('Error fetching ongoing recipes:', error));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-6">Ongoing Recipes ({ongoingRecipes.length})</h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {ongoingRecipes.map((recipe, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-200"
          >
            <img
              src={recipe.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{recipe.title}</h3>
              <div className="text-yellow-500 text-sm mt-1">⭐⭐⭐⭐☆</div>
              <div className="text-gray-600 text-sm flex justify-between mt-2">
                <span>🕒 {recipe.estimatedtime || '--'} Min</span>
                <span>🍴 {recipe.difficulty || 'Intermediate'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnGoing;
