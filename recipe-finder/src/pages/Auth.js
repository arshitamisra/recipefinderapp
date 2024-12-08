import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        setIsSignUp(false); // Switch to login after sign-up
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/'); // Redirect to home after login
      }
    } catch (error) {
      alert(error.message); // Handle errors with an alert
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
        <form onSubmit={handleAuth}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <p className="auth-toggle">
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <span onClick={() => setIsSignUp(false)}>Log in here</span>.
            </>
          ) : (
            <>
              New user?{' '}
              <span onClick={() => setIsSignUp(true)}>Sign up here</span>.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Auth;
