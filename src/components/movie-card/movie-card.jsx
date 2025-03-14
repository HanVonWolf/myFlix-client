import React from "react";
import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";

import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <Card className="h-100">
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.director}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">
            Open
            </Button>
        </Card.Body>
      </Card>
    );
  };


  MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
      }),
      director: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio:  PropTypes.string,
        birth:  PropTypes.string,
      })
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };