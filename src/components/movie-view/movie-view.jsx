// movie-view.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'; // For the favorite button
// Col was imported but not used. If you need it for layout, uncomment.
// import Col from 'react-bootstrap/Col';

import './movie-view.scss';

// It's good practice to define API URLs in one place,
// e.g., a config file or environment variables, but for now, this is fine.
const API_BASE_URL = "https://hannahs-myflix-03787a843e96.herokuapp.com";

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams();
  // Renamed state variable for clarity (convention: booleans often start with 'is' or 'has')
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // To manage loading state for API calls

  useEffect(() => {
    // Ensure user object and movieId are available before checking favorites
    if (user && user.Username && movieId) {
      // IMPORTANT: Check the actual structure of your 'user' object.
      // If your MongoDB field is 'FavouriteMovie' (with a 'u'),
      // your API should ideally return it with that name in the user object.
      // console.log("User object for favorite check:", user); // Uncomment to inspect user object

      const favoriteMoviesList = user.FavouriteMovie || user.FavoriteMovies || []; // Try 'FavouriteMovie' first

      if (Array.isArray(favoriteMoviesList)) {
        const favorited = favoriteMoviesList.includes(movieId);
        setIsFavorite(favorited);
      } else {
        console.warn("User's favorite movies list is not an array or is missing:", favoriteMoviesList);
        setIsFavorite(false); // Default to not favorite if the list is problematic
      }
    } else {
      // If no user or movieId, it can't be a favorite
      setIsFavorite(false);
    }
  }, [user, movieId]); // Dependencies: re-run if user or movieId changes

  const handleToggleFavorite = () => {
    if (!user || !token) {
      alert("Please log in to manage your favorites.");
      // Optionally, you could redirect to a login page here
      return;
    }

    setIsLoading(true);
    const url = `${API_BASE_URL}/users/${user.Username}/movies/${movieId}`;
    const method = isFavorite ? "DELETE" : "POST"; // Determine action based on current state

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          // Try to parse error from API if possible
          return response.json().then(errData => {
            throw new Error(errData.message || `Failed to ${isFavorite ? 'remove from' : 'add to'} favorites`);
          }).catch(() => { // Fallback if response.json() itself fails
            throw new Error(`Failed to ${isFavorite ? 'remove from' : 'add to'} favorites. Status: ${response.status}`);
          });
        }
        return response.json(); // Expecting updated user object from API
      })
      .then((updatedUser) => {
        setIsFavorite(!isFavorite); // Toggle the favorite state
        localStorage.setItem("user", JSON.stringify(updatedUser)); // Update localStorage
        setUser(updatedUser); // Update user state in parent component
        // console.log("Favorite status updated. New user data:", updatedUser);
      })
      .catch((error) => {
        console.error("Error toggling favorite status:", error);
        alert(`Error: ${error.message}`);
        // Optionally, revert UI state if API call failed, though this can get complex
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  // Defensive rendering for nested properties
  const directorName = movie.director?.Name || "N/A";
  const directorBio = movie.director?.Bio || "Not available";
  const directorBirth = movie.director?.Birth || "Not available";
  const genreName = movie.genre?.Name || "N/A";
  const genreDescription = movie.genre?.Description || "Not available";

  return (
    <div className="movie-view-container">
      {movie.imagePath && (
        <img className="w-100 movie-view-image" src={movie.imagePath} alt={movie.title} />
      )}
      <div className="movie-details p-3">
        <h2>{movie.title}</h2>

        {/* Favorite Button - only show if user is logged in */}
        {user && (
          <Button
            variant={isFavorite ? "danger" : "success"}
            onClick={handleToggleFavorite}
            disabled={isLoading}
            className="mb-3 favorite-button"
          >
            {isLoading
              ? "Processing..."
              : isFavorite
              ? "Remove from Favorites"
              : "Add to Favorites"}
          </Button>
        )}

        <div>
          <strong>Description: </strong>
          <span>{movie.description || "No description available."}</span>
        </div>
        <hr />
        <div>
          <strong>Director: </strong>
          <span>{directorName}</span>
        </div>
        {movie.director?.Bio && (
          <div>
            <strong>Director's Bio: </strong>
            <span>{directorBio}</span>
          </div>
        )}
        {movie.director?.Birth && (
          <div>
            <strong>Director's Birth Year: </strong>
            <span>{directorBirth}</span>
          </div>
        )}
        <hr />
        <div>
          <strong>Genre: </strong>
          <span>{genreName}</span>
        </div>
        {movie.genre?.Description && (
          <div>
            <strong>Genre Description: </strong>
            <span>{genreDescription}</span>
          </div>
        )}
        <hr />
        <Link to={`/`}>
          <Button variant="outline-secondary" className="back-button mt-3">
            Back to List
          </Button>
        </Link>
      </div>
    </div>
  );
};

// If you use PropTypes, you'd update them like this:
// import PropTypes from 'prop-types';
/*
MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      imagePath: PropTypes.string,
      genre: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string,
      }),
      director: PropTypes.shape({
        Name: PropTypes.string,
        Bio: PropTypes.string,
        Birth: PropTypes.string,
      }),
    })
  ).isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    // Adjust this based on your actual user object structure from the API
    FavouriteMovie: PropTypes.arrayOf(PropTypes.string),
    // or FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
  }), // user can be null if not logged in
  token: PropTypes.string, // token can be null
  setUser: PropTypes.func, // setUser can be null if not passed
};
*/