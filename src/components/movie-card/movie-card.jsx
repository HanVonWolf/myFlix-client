import React from "react";
import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


export const MovieCard = ({ movie }) => {
    // console.log("MovieCard received movie:", movie); // Keep or remove logs as needed
    return (
      <Card className="h-100">
        {/* Assuming imagePath exists and you want to show it on the card */}
        {/* Use lowercase imagePath */}
        {movie.imagePath && <Card.Img variant="top" src={movie.imagePath} alt={movie.title} />}
        <Card.Body>
          {/* Use lowercase title */}
          <Card.Title>{movie.title}</Card.Title>
          {/* Access lowercase director.name */}
          {/* Add checks */}
          {movie.director && movie.director.name && <Card.Text>Director: {movie.director.name}</Card.Text>}
            {/* Use id if that's what the mapped data uses */}
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="link">Open</Button>
        </Link>
        </Card.Body>
      </Card>
    );
  };

  // Update PropTypes to match the expected lowercase structure from the mapped data
  MovieCard.propTypes = {
    movie: PropTypes.shape({
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
    }).isRequired,
    // onMovieClick: PropTypes.func.isRequired // Still not used here
  };