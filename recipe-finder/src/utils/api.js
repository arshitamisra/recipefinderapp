import axios from 'axios';

// Base URL for the Spoonacular API
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

// Your API key from Spoonacular (stored securely in .env file)
const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

/**
 * Fetch recipes based on ingredients.
 * @param {string} ingredients - Comma-separated list of ingredients.
 * @param {string} sort - Sorting method (e.g., 'max-used-ingredients' or 'min-missing-ingredients').
 * @returns {Promise<Object[]>} - List of recipes.
 */
export const fetchRecipes = async (ingredients, sort = 'max-used-ingredients') => {
    try {
      const url = `${BASE_URL}?apiKey=${API_KEY}`;
      console.log('Request URL:', url); // Log the URL for debugging
  
      const response = await axios.get(url, {
        params: {
          includeIngredients: ingredients,
          sort,
          number: 10,
        },
      });
      console.log('API Response:', response.data); // Log the API response
      return response.data.results;
    } catch (error) {
      console.error('Error fetching recipes:', error.response?.data || error.message); // Log the error
      throw error;
    }
  };
  