import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes }) => {
  return (
    <div>
      {recipes.length > 0 ? (
        recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)
      ) : (
        <p>No recipes found. Try different ingredients!</p>
      )}
    </div>
  );
};

export default RecipeList;
