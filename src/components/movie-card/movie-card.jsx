import React from "react";
import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


export const MovieCard = ({ movie }) => {
    // console.log("MovieCard movie:", movie); // Keep or remove logs as needed
    // console.log("MovieCard movie.director:", movie.director);
    // console.log("MovieCard movie.director?.Name:", movie.director?.Name); // Check PascalCase Name
    // console.log("MovieCard movie.genre:", movie.genre);
    // console.log("MovieCard movie.genre?.Name:", movie.genre?.Name); // Check PascalCase Name

    return (
      <Card className="h-100">
        {/* Use lowercase imagePath */}
        {movie.imagePath && <Card.Img variant="top" src={movie.imagePath} alt={movie.title} />}
        <Card.Body>
          {/* Use lowercase title */}
          <Card.Title>{movie.title}</Card.Title>
          {/* Access lowercase director, but PascalCase Name */}
          {/* Check if director object exists AND if director.Name exists */}
          {movie.director && movie.director.Name && <Card.Text>Director: {movie.director.Name}</Card.Text>}
            {/* Use id if that's what the mapped data uses */}
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="link">Open</Button>
        </Link>
        </Card.Body>
      </Card>
    );
  };

  // Update PropTypes to match the expected mixed casing structure from the mapped data
  MovieCard.propTypes = {
    movie: PropTypes.shape({
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
    }).isRequired,
    // onMovieClick: PropTypes.func.isRequired // Still not used here
  };