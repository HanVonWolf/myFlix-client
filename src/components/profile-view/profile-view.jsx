import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ movies }) => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  
  if (!localUser) {
    return <p>Please log in to view and edit your profile.</p>;
  }

  // Use the misspelled field name from localStorage
  const favoriteMovieIds = localUser.FavouriteMovie || []; // Changed from FavoriteMovies

  const safeMovies = Array.isArray(movies) ? movies : [];

  const favMovies = safeMovies.filter((movie) => {
    return movie && movie._id && favoriteMovieIds.includes(movie._id);
  });

  // Use the misspelled field name for initial state
  const [username, setUsername] = useState(localUser.Username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(localUser.eamil || ""); // Changed from localUser.Email
  const [birthday, setBirthday] = useState(localUser.Birthday || "01/01/0001");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send data with the misspelled field names that the backend expects
    const data = {
      Username: username,
      ...(password && { Password: password }),
      eamil: email, // Changed from Email
      Birthday: birthday
      // If your backend expects FavouriteMovie for updates, you'd handle that here too,
      // though typically favorite movies are updated via separate endpoints.
    };

    fetch(`https://hannahs-myflix-03787a843e96.herokuapp.com/users/${localUser.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Profile updated successfully");
        response.json().then((updatedUser) => {
          // Assume the backend returns the user object with the same (misspelled) field names
          localStorage.setItem("user", JSON.stringify(updatedUser));
          window.location.reload();
        });
      } else {
        alert("Profile update failed");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="4"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password (leave blank to keep unchanged):</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      {/* The form label can still be "Email" for user-friendliness */}
      <Form.Group controlId="formEmail"> 
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email} // This state variable now holds data from localUser.eamil
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBdate">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday ? new Date(birthday).toISOString().split('T')[0] : ""}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">Edit Profile</Button>

      <h3>Your Favorite Movies</h3>
      <div className="favorite-movies">
        {favMovies.length > 0 ? (
          favMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))
        ) : (
          <p>You have no favorite movies.</p>
        )}
      </div>
    </Form>
  );
};