import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Sell from '../pages/Sell';
import Explore from '../pages/Explore';
import Favorite from '../pages/Favorite';

function Main() {
    return (
        <main>
            <Routes>
                <Route path="/explore" element={<Explore />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </main>
    )
}

export default Main