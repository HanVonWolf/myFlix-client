import { useState } from "react";

import { MovieCard } from "../movie-card/movie-card";

import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Wallace and Gromit: Vengeance most fowl",
      description: "Gromit's concern that Wallace has become over-dependent on his inventions proves justified, when Wallace invents a smart gnome that seems to develop a mind of its own.",
      genre: "Animated",
      director: "Nick Park",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoH1XUOFke37Igzq9MYgFJtpxHJUZau4Shgo9CHCfuE5oTlMC9",
    },
    {
      id: 2,
      title: "Chicken Run",
      description: "An American rooster gets smitten with a hen on a British chicken farm. They wish to run away. But the farm's devious owner desires to control them and turn them into chicken pot pies.",
      genre: "Animated",
      director: "Nick Park",
      image:
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRSZRCCbJ8KD8m-cGr5iUbvLGZTEkRIYBToImKnWwl_aBiusAAh",

    },
    {
      id: 3,
      title: "Forgetting Sarah Marshall",
      description: "After his break-up with Sarah, Peter Bretter decides to go for a Hawaiian vacation. However, he is in for a rude shock when he finds out that Sarah has checked in at the same resort as his.",
      genre: "Comedy",
      director: "Judd Apatow",
      image:
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ7n5mRfbRAOVGObteheRxQp1v-d0TB4c_TE1CONeZjLI6xjvHY",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
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