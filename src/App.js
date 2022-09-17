import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/layout/Footer';
import Explore from "./components/pages/Explore";
import Sell from "./components/pages/Sell";
import Favorite from "./components/pages/Favorite";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import ForgotPassword from "./components/pages/ForgotPassword";
import Nav from "./components/layout/Nav"

function App() {
  return (
    <Router>
      {/* <Navigation /> */}
      <Nav />
      <main>
        <Routes>
          <Route exact path="/" element={<Explore />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </main>
      <Footer />
    </Router >
  );
}

export default App;
