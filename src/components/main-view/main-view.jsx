import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
    fetch("https://hannahs-myflix-03787a843e96.herokuapp.com")
    .then((response) => response.json())
        .then((data) => {
          const moviesFromApi = data.docs.map((movie) => {
            return {
              id: movie._id,
              title: movie.title,
              description: movie.description,
              genre: movie.genre,
              director: doc.director,
            };
          });
  
          setMovies(moviesFromApi);
        });
    }, []);

    return (
      <Row>
        {!user ? (
          <>
          <LoginView onLoggedIn={(user) => setUser(user)} />
            or
            <SignupView />
            </>
        ) : selectedMovie ? (
          <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
          />
        ) : movies.length === 0 ? (
          <div>The list is empty! </div>
        ) : (
          <>
          {movies.map((movie) => (
            <MovieCard
            key={movie.id}
            movie={movie}
            onBookClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
            />
          ))}
          </>
        )}
        </Row>
        );
      };