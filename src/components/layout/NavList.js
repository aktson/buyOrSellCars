import React from 'react'
import { Typography } from "@material-tailwind/react";
import { MdOutlineFavorite, MdExplore, MdLogin, MdOutlineLoyalty } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";



function NavList() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    return (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-dark">
            <Typography
                as="li"
                variant="small"
                className={pathname === "/" ? "text-primary-medium nav-link" : "nav-link"}
                onClick={() => navigate("/")}
            >  <MdExplore size={28} />Explore
            </Typography>
            <Typography
                as="li"
                variant="small"
                className={pathname === "/sell" ? "text-primary-medium  nav-link" : "nav-link"}
                onClick={() => navigate("/sell")}
            >
                <MdOutlineLoyalty size={28} />Sell
            </Typography>
            <Typography
                as="li"
                variant="small"
                className={pathname === "/favorite" ? "text-primary-medium  nav-link" : "nav-link "}
                onClick={() => navigate("/favorite")}
            >
                <MdOutlineFavorite size={28} />Favourite
            </Typography>
            {/* <Typography
                as="li"
                variant="small"
                className={pathname === "/sign-in" ? "text-primary-medium  nav-link" : "nav-link"}
                onClick={() => navigate("/sign-in")}
            >
                <MdLogin size={28} />Sign In
            </Typography> */}
        </ul>
    )
}

export default NavList