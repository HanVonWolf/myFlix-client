import React from 'react';

import { createRoot } from 'react-dom/client';

import { MainView } from "./components/main-view/main-view";

import './index.scss';
import Container from 'react-bootstrap/Container';

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
/*const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <div>Good morning</div>
    </div>
  );
};*/

const App = () => {
  return (
  <Container>
<MainView />
  </Container>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);


