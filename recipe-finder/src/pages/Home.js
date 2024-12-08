import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import './Home.css';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ingredients, setIngredients] = useState(''); // For ingredient search

  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

  const fetchRecipesByIngredients = async () => {
    if (!ingredients) {
      alert('Please enter some ingredients to search!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeIngredients=${ingredients}&number=12`
      );
      setRecipes(response.data.results);
    } catch (error) {
      setError('Failed to fetch recipes. Please try again later.');
      console.error('Error fetching recipes:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Page Title */}
      <h1 className="home-title">Explore Recipes</h1>

      {/* Ingredient Search Bar */}
      <div className="ingredient-search">
        <input
          type="text"
          placeholder="Enter ingredients (e.g., tomato, cheese)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button onClick={fetchRecipesByIngredients}>Search</button>
      </div>

      {/* Loading State */}
      {loading && <p>Loading recipes...</p>}

      {/* Error Message */}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {/* Recipes Grid */}
      <div className="recipes-grid">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          !loading && !error && (
            <p style={{ textAlign: 'center', color: '#555' }}>
              No recipes found. Try searching with different ingredients!
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
