import * as React from 'react';
import Navigation from "./components/layout/Navigation";
import Main from "./components/layout/Main";
import { BrowserRouter as Router } from "react-router-dom";




function App() {
  return (
    <Router>
      <Main />
      <Navigation />
    </Router >
  );
}

export default App;
