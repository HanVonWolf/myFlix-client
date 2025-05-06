import React from "react";
import Col from 'react-bootstrap/Col';
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  // Find the movie using id if that's what the mapped data uses
  const movie = movies.find((m) => m.id === movieId);

  // console.log("MovieView received movies:", movies); // Keep or remove logs
  // console.log("MovieView found movie:", movie); // Keep or remove logs

  // Handle case where movie is not found
  if (!movie) {
    // console.log("Movie not found in MovieView"); // Keep or remove logs
    return <div>Movie not found.</div>;
  }

  // console.log("MovieView director:", movie.director); // Keep or remove logs
  // console.log("MovieView genre:", movie.genre); // Keep or remove logs


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
          {/* Access lowercase director.name */}
          {movie.director && movie.director.name && <span>{movie.director.name}</span>}
        </div>
        <div>
          <span>Genre: </span>
          {/* Access lowercase genre.name */}
          {movie.genre && movie.genre.name && <span>{movie.genre.name}</span>}
        </div>
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
        id: PropTypes.string.isRequired, // Use id
        title: PropTypes.string.isRequired, // Use title
        description: PropTypes.string, // Use description
        imagePath: PropTypes.string, // Use imagePath
        genre: PropTypes.shape({ // Use genre
          name: PropTypes.string.isRequired, // Use name
          description: PropTypes.string, // Use description
        }),
        director: PropTypes.shape({ // Use director
          name: PropTypes.string.isRequired, // Use name
          bio:  PropTypes.string, // Use bio
          birth:  PropTypes.string, // Use birth
        })
      })
    ).isRequired,
  };
  */