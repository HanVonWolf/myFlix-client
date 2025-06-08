import React from "react";
import Col from 'react-bootstrap/Col';
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const [ Favorite, setFavorite] = useState(false);

  useEffect(()=> {
      const isFavorited = user.FavoriteMovies.includes(movieId)
      setFavorite(isFavorited);
  }, [])

  const addToFavorite = () => {
      fetch(`https://marvelflix1nekev.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
      }).then((response) => {
          if (response.ok) {
              return response.json()
          }
      }).then((data) => {
          setFavorite(true);
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
      })
  };

  const removeFavorite = () => {
      fetch(`https://marvelflix1nekev.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
      }).then((response) => {
          if (response.ok) {
              return response.json()
          }
      }).then((data) => {
          setFavorite(false);
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
      })
  }

  // Find the movie using id if that's what the mapped data uses
  const movie = movies.find((m) => m.id === movieId);

  // console.log("MovieView movie:", movie); // Keep or remove logs
  // console.log("MovieView movie.director:", movie?.director);
  // console.log("MovieView movie.director?.Name:", movie?.director?.Name); // Check PascalCase Name
  // console.log("MovieView movie.genre:", movie?.genre);
  // console.log("MovieView movie.genre?.Name:", movie?.genre?.Name); // Check PascalCase Name


  if (!movie) {
    return <div>Movie not found.</div>;
  }

    return (
      <div>
        {/* Use lowercase imagePath */}
        {movie.imagePath && <img className="w-100" src={movie.imagePath} alt={movie.title} />}
        <div>
          <span>Title: </span>
          {/* Use lowercase title */}
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Description: </span>
          {/* Use lowercase description */}
          <span>{movie.description}</span>
        </div>
        <div>
          <span>Director: </span>
          {/* Access lowercase director, but PascalCase Name */}
          {/* Check if director object exists AND if director.Name exists */}
          {movie.director && movie.director.Name && <span>{movie.director.Name}</span>}
        </div>
        <div>
          <span>Genre: </span>
          {/* Access lowercase genre, but PascalCase Name */}
          {/* Check if genre object exists AND if genre.Name exists */}
          {movie.genre && movie.genre.Name && <span>{movie.genre.Name}</span>}
        </div>
        {/* Add Bio and Birth if you want to display them in MovieView */}
        {movie.director && movie.director.Bio && (
            <div>
                <span>Bio: </span>
                <span>{movie.director.Bio}</span>
            </div>
        )}
         {movie.director && movie.director.Birth && (
            <div>
                <span>Birth: </span>
                <span>{movie.director.Birth}</span>
            </div>
        )}
        {/* Add Genre Description if you want to display it */}
         {movie.genre && movie.genre.Description && (
            <div>
                <span>Genre Description: </span>
                <span>{movie.genre.Description}</span>
            </div>
        )}

       <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
      </div>
    );
  };

  // PropTypes for MovieView (optional, but good practice)
  /*
  MovieView.propTypes = {
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired, // Use id (lowercase)
        title: PropTypes.string.isRequired, // Use title (lowercase)
        description: PropTypes.string, // Use description (lowercase)
        imagePath: PropTypes.string, // Use imagePath (lowercase)
        genre: PropTypes.shape({ // Use genre (lowercase)
          Name: PropTypes.string.isRequired, // Use Name (PascalCase)
          Description: PropTypes.string, // Use Description (PascalCase)
        }),
        director: PropTypes.shape({ // Use director (lowercase)
          Name: PropTypes.string.isRequired, // Use Name (PascalCase)
          Bio:  PropTypes.string, // Use Bio (PascalCase)
          Birth:  PropTypes.string, // Use Birth (PascalCase)
        })
      })
    ).isRequired,
  };
  */