import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './RecipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams(); // Extract the recipe ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        );
        setRecipe(response.data);
      } catch (error) {
        setError('Failed to fetch recipe details.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <p>Loading recipe details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="recipe-details">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Home
      </button>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <h2>Ingredients</h2>
      <ul>
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      {recipe.instructions ? (
        <div
          dangerouslySetInnerHTML={{ __html: recipe.instructions }} // Render HTML safely
        />
      ) : (
        <p>No instructions available.</p>
      )}
    </div>
  );
};

export default RecipeDetails;
