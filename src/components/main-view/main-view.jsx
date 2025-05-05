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
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Assuming you'll add a search input later

  // Filter movies based on search query
  // Make sure movie objects have a 'title' property (based on your mapping)
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) // Use movie.title
  );

  useEffect(() => {
    if (token) {
      fetch("https://hannahs-myflix-03787a843e96.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 401) {
                console.error("Unauthorized: Token might be invalid or expired.");
                // Optional: Log out the user automatically
                // setUser(null);
                // setToken(null);
                // localStorage.clear();
            }
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Raw movies API data:", data); // <-- Add this log
  
          // Check if data is an array before mapping
          if (!Array.isArray(data)) {
              console.error("API did not return an array:", data);
              setMovies([]); // Set to empty array if unexpected format
              return; // Stop processing
          }
  
          const moviesFromApi = data.map((movie) => {
            // Add logs here to check individual movie objects before mapping
            // console.log("Processing movie:", movie);
            return {
              id: movie._id,
              title: movie.Title, // Check if 'Title' exists
              description: movie.Description, // Check if 'Description' exists
              genre: movie.Genre, // Check if 'Genre' exists
              director: movie.Director, // Check if 'Director' exists
            };
          });
  
          console.log("Mapped movies data:", moviesFromApi); // <-- Add this log
          setMovies(moviesFromApi);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
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
        // You might pass setSearchQuery down to NavigationBar if it has a search input
        // setSearchQuery={setSearchQuery}
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
                    {/* CORRECTED: Pass both user and token to onLoggedIn */}
                    <LoginView onLoggedIn={(loggedInUser, authToken) => {
                        setUser(loggedInUser);
                        setToken(authToken);
                    }} />
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
                   // Consider adding a separate loading state here
                  <Col>Loading movies or list is empty!</Col>
                ) : (
                  <Col md={8}>
                    {/* Pass the full movies list to MovieView */}
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
                   // Consider adding a separate loading state here
                  <Col>Loading movies or list is empty!</Col>
                ) : (
                  <>
                    {/* CORRECTED: Use filteredMovies for rendering */}
                    {filteredMovies.map((movie) => (
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