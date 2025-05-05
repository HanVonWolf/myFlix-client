import React from "react";
import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


export const MovieCard = ({ movie }) => {
    return (
      <Card className="h-100">
        <Card.Body>
          {/* Assuming 'Title' is PascalCase from backend */}
          <Card.Title>{movie.Title}</Card.Title>
          {/* Accessing the 'Name' property of the 'Director' object */}
          {/* Add checks to prevent errors if Director or Director.Name is missing */}
          {movie.Director && movie.Director.Name && <Card.Text>Director: {movie.Director.Name}</Card.Text>}
            {/* Assuming 'id' is available or mapped from '_id' */}
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="link">Open</Button>
        </Link>
        </Card.Body>
      </Card>
    );
  };


  // Update PropTypes to match the expected PascalCase structure from the backend
  MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired, // Changed to Title
      Description: PropTypes.string,
      Genre: PropTypes.shape({ // Changed to Genre
        Name: PropTypes.string.isRequired, // Changed to Name
        Description: PropTypes.string,
      }),
      Director: PropTypes.shape({ // Changed to Director
        Name: PropTypes.string.isRequired, // Changed to Name
        Bio:  PropTypes.string,
        Birth:  PropTypes.string,
      })
    }).isRequired,
    // onMovieClick: PropTypes.func.isRequired // This prop is not used in the component, you can remove it
  };