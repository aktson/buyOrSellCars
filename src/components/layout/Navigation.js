import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineFavorite, MdExplore, MdLogin, MdOutlineLoyalty } from "react-icons/md";


function Navigation() {
    const { pathname } = useLocation();

    const navigate = useNavigate();

    return (
        <header className="p-2 flex justify-center ">
            <nav className="shadow-xl p-1 px-6 max-w-md  ">
                <ul className="flex gap-10 justify-center items-center p-4">
                    <li onClick={() => navigate("/")} className={pathname === "/" ? "text-primary nav-link" : "nav-link"}>
                        <MdExplore size={32} />Explore
                    </li>
                    <li onClick={() => navigate("/sell")} className={pathname === "/sell" ? "text-primary  nav-link" : "nav-link"} >
                        <MdOutlineLoyalty size={32} />Sell
                    </li>
                    <li onClick={() => navigate("/favorite")} className={pathname === "/favorite" ? "text-primary  nav-link" : "nav-link"} >
                        <MdOutlineFavorite size={32} />Favourite
                    </li>
                    <li onClick={() => navigate("/login")} className={pathname === "/login" ? "text-primary  nav-link" : "nav-link"} >
                        <MdLogin size={32} />Login
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navigation;