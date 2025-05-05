import React from "react";
import Col from 'react-bootstrap/Col';
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  // Assuming movie objects have an 'id' property (often mapped from '_id' by Mongoose)
  const movie = movies.find((m) => m.id === movieId);

  // Handle case where movie is not found (e.g., invalid URL)
  if (!movie) {
    return <div>Movie not found.</div>; // Or redirect, show error message, etc.
  }

    return (
      <div>
        {/* Assuming 'ImagePath' is PascalCase from backend */}
        {movie.ImagePath && <img className="w-100" src={movie.ImagePath} alt={movie.Title} />} {/* Added alt text */}
        <div>
          <span>Title: </span>
          {/* Assuming 'Title' is PascalCase from backend */}
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Description: </span>
          {/* Assuming 'Description' is PascalCase from backend */}
          <span>{movie.Description}</span>
        </div>
        <div>
          <span>Director: </span>
          {/* Accessing the 'Name' property of the 'Director' object */}
          {/* Add checks */}
          {movie.Director && movie.Director.Name && <span>{movie.Director.Name}</span>}
        </div>
        <div>
          <span>Genre: </span>
          {/* Accessing the 'Name' property of the 'Genre' object */}
          {/* Add checks */}
          {movie.Genre && movie.Genre.Name && <span>{movie.Genre.Name}</span>}
        </div>
       <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
      </div>
    );
  };

  // PropTypes are not typically defined directly on the MovieView component itself
  // as it's usually rendered within another component that passes the 'movies' prop.
  // The validation for the 'movies' array and its contents should ideally be done
  // in the parent component (like MainView) that fetches the data and passes it down.
  // However, if you want to add them here for clarity:
  /*
  MovieView.propTypes = {
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired, // Assuming id is a string
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string,
        ImagePath: PropTypes.string, // Assuming ImagePath exists
        Genre: PropTypes.shape({
          Name: PropTypes.string.isRequired,
          Description: PropTypes.string,
        }),
        Director: PropTypes.shape({
          Name: PropTypes.string.isRequired,
          Bio:  PropTypes.string,
          Birth:  PropTypes.string,
        })
      })
    ).isRequired,
  };
  */