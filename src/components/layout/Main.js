import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Sell from '../pages/Sell';
import Explore from '../pages/Explore';
import Favorite from '../pages/Favorite';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';

function Main() {
    return (
        <main>
            <Routes>
                <Route path="/explore" element={<Explore />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
        </main>
    )
}

export default Main