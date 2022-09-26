import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/layout/Footer';
import Explore from "./components/pages/Explore";
import Sell from "./components/pages/Sell";
import Favorite from "./components/pages/Favorite";
import SignIn from "./components/pages/SignIn";
import Signup from "./components/pages/Signup";
import ForgotPassword from "./components/pages/ForgotPassword";
import Nav from "./components/layout/Nav"
import Profile from './components/pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import ListingSpecific from './components/ListingSpecific';

function App() {
  return (
    <Router>
      <Nav />
      <main>
        <Routes>
          <Route exact path="/" element={<Explore />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/sell' element={<PrivateRoute />}>
            <Route path='/sell' element={<Sell />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/listing-specific/:id" element={<ListingSpecific />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer autoClose={3000} />
    </Router >

  );
}

export default App;
