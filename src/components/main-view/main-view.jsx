import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter movies based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  /*const [selectedMovie, setSelectedMovie] = useState(null);*/

  /*useEffect(() => {
    if (!token) return;
 
    fetch("https://hannahs-myflix-03787a843e96.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
 
      });
  }, [token]);*/
 

  useEffect(() => {
    // Only fetch movies if a token exists (user is logged in)
    if (token) {
      fetch("https://hannahs-myflix-03787a843e96.herokuapp.com/movies", { // <-- Correct URL
        headers: { Authorization: `Bearer ${token}` }, // <-- Add Authorization header
      })
        .then((response) => {
          if (!response.ok) {
            // Handle non-200 responses, e.g., 401 Unauthorized
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // The /movies endpoint returns an array directly, not data.docs
          const moviesFromApi = data.map((movie) => {
            return {
              id: movie._id,
              title: movie.Title, // <-- Use uppercase 'Title'
              description: movie.Description, // <-- Use uppercase 'Description'
              genre: movie.Genre, // <-- Use uppercase 'Genre'
              director: movie.Director, // <-- Use uppercase 'Director'
              // Add other properties you need, e.g., ImagePath, Featured
              imagePath: movie.ImagePath,
              featured: movie.Featured,
            };
          });

          setMovies(moviesFromApi);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
          // Optionally handle the error in the UI, e.g., set an error state
        });
    }
  }, [token]);

  return (
    <BrowserRouter>
          <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null); // Also clear the token on logout
          localStorage.clear(); // Clear local storage
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  // You might want a loading state here instead of "empty" immediately
                  <Col>Loading movies or list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                   // You might want a loading state here instead of "empty" immediately
                  <Col>Loading movies or list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => ( // <-- Corrected 'movies'
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};