import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom'; // Import Link for routing
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          setError('Please log in to view your favorite recipes.');
          setLoading(false);
          return;
        }

        const favoritesRef = collection(db, 'Favorites');
        const q = query(favoritesRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);

        const favoriteRecipes = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Firestore document ID
          ...doc.data(), // Recipe details
        }));

        setFavorites(favoriteRecipes);
      } catch (error) {
        setError('Failed to load favorites. Please try again later.');
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFromFavorites = async (favoriteId) => {
    try {
      const favoritesRef = collection(db, 'Favorites');
      const q = query(favoritesRef, where('recipeId', '==', favoriteId), where('userId', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      // Remove from the local state
      setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.recipeId !== favoriteId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="favorites">
      <h1>Your Favorite Recipes</h1>
      <div className="favorites-grid">
        {favorites.map((favorite) => (
          <div className="recipe-card" key={favorite.recipeId}>
            <img src={favorite.image} alt={favorite.title} />
            <h3>{favorite.title}</h3>
            <div className="card-actions">
              {/* Use Link to navigate to the recipe details page */}
              <Link to={`/recipe/${favorite.recipeId}`} className="details-link">
                View Details
              </Link>
              <button
                className="favorites-btn"
                onClick={() => handleRemoveFromFavorites(favorite.recipeId)}
              >
                Remove from Favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
