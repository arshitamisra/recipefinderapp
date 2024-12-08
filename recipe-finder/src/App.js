import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import Auth from './pages/Auth';
import Favorites from './pages/Favorites'; // Correct the path
import RecipeCard from './components/RecipeCard'; // Correct the path
import { auth } from './firebaseConfig';

const RequireAuth = ({ children }) => {
  return auth.currentUser ? children : <Navigate to="/auth" />;
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <RequireAuth>
                <RecipeDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/favorites"
            element={
              <RequireAuth>
                <Favorites />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
