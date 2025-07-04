import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // **MODIFICATION HERE: Use capitalized keys**
    const data = {
      Username: username, // Changed from username to Username
      Password: password  // Changed from password to Password
    };

    fetch("https://hannahs-myflix-03787a843e96.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(async (response) => { // Added async here to properly await response.json() before checking response.ok
      const responseData = await response.json();
      console.log("Login response status:", response.status);
      console.log("Login response data: ", responseData);
      if (response.ok && responseData.user) { // Check response.ok for success (status 200-299)
        localStorage.setItem("user", JSON.stringify(responseData.user));
        localStorage.setItem("token", responseData.token);
        onLoggedIn(responseData.user, responseData.token);
      } else {
        // Use the message from the backend if available
        const errorMessage = responseData.message || "Login failed. Please check your credentials or server response.";
        alert(errorMessage);
      }
    })
    .catch((e) => {
      console.error("Login API error:", e);
      alert("Something went wrong with the login request.");
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
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};