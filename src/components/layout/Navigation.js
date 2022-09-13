import React from "react";
import { BottomNavigation, Box, Container, BottomNavigationAction } from '@mui/material';
import { Login, Favorite, Sell, ShoppingBasket } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";



function Navigation() {
    const [value, setValue] = React.useState('Explore');
    const navigate = useNavigate();

    const handleChange = (event, value) => {
        setValue(value)
    }

    return (
        <Box sx={{ padding: "2em 1em" }} className="menuBottom" >
            <Container >
                <BottomNavigation sx={{ width: 600, margin: "0 auto" }} value={value} onChange={handleChange} showLabels >
                    <BottomNavigationAction label="Explore" value="explore" icon={<ShoppingBasket className="menuIcons" />} onClick={() => navigate("/explore")} />
                    <BottomNavigationAction label="Sell" value="sell" icon={<Sell className="menuIcons" />} onClick={() => navigate("/sell")} />
                    <BottomNavigationAction label="Favorite" value="favorite" icon={<Favorite className="menuIcons" />} onClick={() => navigate("/favorite")} />
                    <BottomNavigationAction label="Login" value="login" icon={<Login className="menuIcons" />} onClick={() => navigate("/login")} />
                </BottomNavigation>
            </Container >
        </Box >
    )
}

export default Navigation;