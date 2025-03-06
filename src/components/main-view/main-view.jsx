import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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

    if (!user) {
      return (
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
      );
    }

    useEffect(() => {
      if (!token) {
        return;
      }
  
      fetch("https://hannahs-myflix-03787a843e96.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }, [token]);

  if (selectedMovie) {
    return (
        <>
<button onClick={() => { setUser(null); setToken(null); }}>Logout</button>
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}
      />
      </>
    );
  }
  if (movies.length === 0) {
    return (
      <>
<button onClick={() => { setUser(null); setToken(null); }}>Logout</button>
        <div>The list is empty!</div>
      </>
    );
  }

  return (
    <div>
<button onClick={() => { setUser(null); setToken(null); }}>Logout</button>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};