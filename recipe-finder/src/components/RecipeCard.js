import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, query, where, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const user = auth.currentUser;

        if (!user) return;

        const favoritesRef = collection(db, 'Favorites');
        const q = query(favoritesRef, where('recipeId', '==', recipe.id), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);

        setIsFavorite(!querySnapshot.empty); // If querySnapshot is not empty, the recipe is a favorite
      } catch (error) {
        console.error('Error checking if recipe is favorite:', error);
      }
    };

    checkIfFavorite();
  }, [recipe.id]); // Run the check when the component mounts or recipe changes

  const handleFavoritesToggle = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert('Please log in to save recipes to favorites!');
        return;
      }

      const favoritesRef = collection(db, 'Favorites');
      const q = query(favoritesRef, where('recipeId', '==', recipe.id), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Add to Favorites
        await addDoc(favoritesRef, {
          recipeId: recipe.id,
          title: recipe.title,
          image: recipe.image,
          userId: user.uid,
        });
        setIsFavorite(true);
      } else {
        // Remove from Favorites
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        setIsFavorite(false);
      }
    } catch (error) {
      console.error('Error toggling favorites:', error);
    }
  };

  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <div className="card-actions">
        {/* Use Link for View Details */}
        <Link to={`/recipe/${recipe.id}`} className="details-link">
          View Details
        </Link>
        <button className="favorites-btn" onClick={handleFavoritesToggle}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
